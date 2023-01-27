---
title: "[Tiếng Việt] Tôi đã fake hơn 250k giấy đi đường như thế nào — “Weak Key Cryptography in real world”"
date: "2021-09-17"
categories: 
  - "security-research"
---

### I. TÓM TẮT

Hệ thống cấp giấy đi đường mà Công An Thành Phố Hà Nội đang sử dụng tồn tại lỗ hổng nghiêm trọng về cách triển khai mã hóa, dẫn đến nguy cơ bị giả mạo giấy đi đường tùy ý hay cũng có khả năng rất cao (không phải tuyệt đối) tạo điều kiện cho Fx đi muôn nơi.

### II. PHÂN TÍCH

**1.** **DỮ LIỆU QR** Thông qua báo chí và mạng xã hội, anh em chúng tôi tìm được một bản mẫu của mã QR giấy đi đường như hình dưới đây:

![](images/1.jpg) Trích xuất tại: [https://thanhtra.com.vn/xa-hoi/doi-song/ghi-nhan-trong-ngay-dau-ha-noi-thuc-hien-gian-cach-xa-hoi-phan-vung-187326.html](https://thanhtra.com.vn/xa-hoi/doi-song/ghi-nhan-trong-ngay-dau-ha-noi-thuc-hien-gian-cach-xa-hoi-phan-vung-187326.html)

Qua khảo sát ứng dụng này, mặc dù đã che chắn rất kỹ thông tin nhưng mã QR lại không bị che, sau khi decode ta có được những thông tin trong mã QR như sau:

**D9LOgcTFAS1MeC3kD4J+5PmAW5C4mOrPcbwbynsY6GEuGNkpe/dwIM5cr0MS/a+LT1y9z+8sKJA9UaPZTmYJwQ==|**10505|3|06/09;07/09;08/09;09/09;10/09;11/09;12/09;13/09;14/09;15/09;16/09;17/09;18/09;19/09;20/09|4\_PHÒNG CẢNH SÁT GIAO THÔNG|02439424451|29G1–391.89| |Vùng 1|Nguyễn Ánh Ngọc||09:00–20:00

Trong cụm thông tin đã được decoded bao gồm các thông tin về người dân, cũng như mã phường của đơn vị cấp (ví dụ: **10505**). Ở phía đầu của mỗi mã QR đều có một chuỗi chữ ký điện tử, sử dụng thuật toán RSA — SHA256 để ký.

**2.** **PHƯƠNG THỨC XÁC THỰC** Không khó lắm để tìm được ứng dụng xác thực mã đi đường trên Google Play Store. Tuy nhiên, do bị hạn chế quốc gia, nên cần phải VPN về Việt Nam để tải ứng dụng “**Kiểm soát đi đường**”.

> **_Link tải về (đã bị gỡ bỏ)_**: [https://play.google.com/store/apps/details?id=com.qrca](https://play.google.com/store/apps/details?id=com.qrca)

Trước khi đi vào phân tích luồng hoạt động của ứng dụng thì chúng mình nói sơ qua chút về cách hoạt động của mô hình xác thực này.

![](images/2.png)

Mô hình hoạt động này thuộc dạng server-less, nghĩa là không cần dùng bất cứ Server nào trong suốt quá trình vận hành, hoạt động của app. Như vậy có một ưu điểm có thể nhìn ra ngay, đó là không sợ hệ thống bị quá tải, không sợ bị dân tình chửi nếu server sập ( ͡° ͜ʖ ͡°). Tuy nhiên việc đặt niềm tin 100% vào client chưa bao giờ đem lại kết quả tốt cả! Việc không xác thực lại ở phía server như vậy, có nghĩa là chỉ cần có Private Key của một phường, hoặc là cán bộ của Phường này tham nhũng, sẽ có thể cấp bừa bãi giấy đi đường cho bất cứ ai. Trong thời đại này niềm tin giữa con người với con người nó mong manh lắm.

**3.** **LUỒNG HOẠT ĐỘNG CỦA ỨNG DỤNG** Dữ liệu ban đầu được scan qua mã QR là:

**D9LOgcTFAS1MeC3kD4J+5PmAW5C4mOrPcbwbynsY6GEuGNkpe/dwIM5cr0MS/a+LT1y9z+8sKJA9UaPZTmYJwQ==|**10505|3|06/09;07/09;08/09;09/09;10/09;11/09;12/09;13/09;14/09;15/09;16/09;17/09;18/09;19/09;20/09|4\_PHÒNG CẢNH SÁT GIAO THÔNG|02439424451|29G1–391.89| |Vùng 1|Nguyễn Ánh Ngọc||09:00–20:00

Trong đó, “**10505**” là mã của đơn vị cấp, ở đây là “**Phòng cảnh sát giao thông**”. Sau khi nhận được dữ liệu từ mã QR, chương trình sẽ lấy dữ liệu tiếp tục từ mã phường trở về cuối, sau đó sẽ thực hiện các bước kế tiếp theo thứ tự như sau:

- Thực hiện xóa bỏ tất cả các ký tự “|”,
- Xóa bỏ các ký tự đặc biệt
- Bỏ dấu tiếng Việt
- Chuyển các ký tự về dạng chữ cái thường

![](images/3.jpg)

Code xử lý input string

Dữ liệu khi đó trở thành:

**10505**3060907090809090910091109120913091409150916091709180919092009**4\_phongcanhsatgiaothong**02439424451**29g139189**vung1**nguyenanhngoc**09002000

Tiếp tục, dữ liệu được chuyển sang một dạng hash code mà **lachongtech** tự phát triển, thuật toán hoạt động đơn giản như sau:

**Hashcode** = 0
Count = 0
For char in String:
Count += 1
**Hashcode** += char \* Count
**Hashcode** = (1988 \* **Hashcode** — 1910) / 2

Qua bước hashcode, dữ liệu có được dạng như sau: “**682673275**”

- Đây chính là điểm yếu đầu tiên của cách triển khai, việc tính ra Hashcode quá đơn giản, dẫn đến trường hợp Collision có thể xảy ra, nghĩa là có thể một chuỗi có nội dung hoàn toàn khác cũng có trùng hashcode.

![](images/4.jpg)

Dữ liệu sau khi qua bước Hashcode được đưa vào kiểm tra xác thực chữ ký bằng khóa công khai trong ứng dụng. Tuy nhiên, sau khi kiểm tra, có thể thấy ứng dụng đang sử dụng RSA public key với chiều dài key là 512 bits. Ở thời điểm hiện tại, chiều dài key 512 bits là rất yếu, hoàn toàn có thể bị crack trong vài tiếng. Về lý thuyết thì ai cũng biết key 512-bits có thể bị crack, nhưng crack bằng cách nào thì ít thấy chỗ nào đề cập đến (cũng có thể bọn mình tìm chưa kỹ) qua Google search. Các kết quả tìm kiếm đa phần đều là các CTF challenges. Search trên factordb cũng ra, và đương nhiên là trong trường hợp này, factordb không có kết quả của key mình đang tìm. Trong tất cả kết quả tìm kiếm thì chỉ duy nhất có một paper là đáng chú ý:

![](images/5.jpg)

> Reference: [https://seclab.upenn.edu/projects/faas/faas.pdf](https://seclab.upenn.edu/projects/faas/faas.pdf)

Đại khái là thay vì sử dụng một máy để crack key, tác giả đã tận dụng sức mạnh của cloud để crack 1 key 512bits trong vòng thời gian vài giờ đồng hồ, giải pháp này gần như là khả thi để crack mọi key có độ dài 512 bits. Và cũng rất may, tác giả cũng có public repo bao gồm tất cả các công cụ cần thiết để “ăn liền” luôn.

> Link: [https://github.com/eniac/faas](https://github.com/eniac/faas)

Mặc dù mang tiếng là ăn liền nhưng trên thực tế, quá trình setup mấy cái công cụ này cũng khá là đau đầu, bởi nó sử dụng các công nghệ từ năm 2015 để chạy, nhưng tới giờ là 2021 rồi, các công nghệ đó đều đã cũ, những công cụ đó không còn được support, hoặc là đã thay đổi rất nhiều từ đó tới giờ. Mấy anh em đã phải mất tới 2 ngày để nghiên cứu và sửa lại cho nó chạy được, và cũng may mắn thay, tới phút cuối mọi thứ vẫn chạy mượt mà như ý muốn.

### III. STATE OF THE ART

Phần đau đầu và hấp dẫn nhất có lẽ không phải là ở những lỗi nêu trên mà là setup môi trường để crack.

### 1\. Cài đặt môi trường

\- Như bọn mình đã đề cập ở trên, công nghệ crack này được tạo ra từ 2015 bởi 1 nhóm các giáo sư và kỹ sư đến từ University of Pennsylvania. Một công cụ gần 7 năm tuổi về cơ bản không còn tương thích với các phiên bản hiện đại hơn ngày nay. Vì vậy, việc setup và chạy thử đã tốn khá nhiều thời gian. Phần lớn thời gian dành cho việc debug lỗi trong quá trình setup, tìm kiếm phiên bản thư viện và dependencies tương thích. Và sau gần 2 ngày hì hục cùng với chút kinh nghiệm ít ỏi của một đứa con địa chủ AWS VPS thì bọn mình đã chạy thử thành công với một đoạn RSA với độ dài 100 chars.

![](images/6.jpg) Quá trình spin-up EC2 instances

### 2\. Cracking the real key

Các public keys được cung cấp bởi ứng dụng “Kiểm soát đi đường” đều có độ dài 155 ký tự tương ứng với RSA 512-bits. Vì vậy, thời gian crack và số lượng instances cũng tăng lên. Bọn mình triển khai tổng cộng 16 instances EC2 x 36 CPUs x 60 GiB Memory cho mỗi key cần crack. Sau khi script được run, việc của mấy anh em mình là ngồi đợi và hy vọng sẽ không có FATAL errors gì. Cuối cùng, sau gần 9 tiếng đồng hồ, bọn mình đã thu được kết quả.

![](images/7.jpg)

### 3\. Chi phí triển khai

Vì mình là con ruột của địa chủ, cho nên các chi phí đối với mình không đáng kể. Tuy nhiên, mình cũng sẽ show cho các bạn xem chi tiết số tiền các bạn phải bỏ ra để crack RSA-512 bits trong vòng 9 tiếng (+ test crack) là khoảng $250 USD cho 2 keys (per region)

![](images/8-scaled.jpg) Bọn mình sau đó đã tìm cách để optimize quá trình này bằng cách sử dụng lại các sieves cho các key khác nhưng không thành công. Liên hệ với tác giả của công cụ này, cách tốt nhất có lẽ là lưu lại trong database. Nhưng vì lý do thời gian, bọn mình đã không thực hiện theo cách này.

![](images/9.jpg)

### 4\. Sử dụng Private Key

Sau khi sử dụng một số công cụ hỗ trợ, việc crack đã thành công và khôi phục được Private Key ban đầu. Sử dụng Private Key này tương ứng với khu vực phường Láng Hạ, có thể sinh ra được các chữ ký hợp lệ cho giấy đi đường mà phần mềm không hề phát hiện ra sai sót gì. Ngoài ra, do ứng dụng không hề check phường có khớp với khóa công khai hay không, nên có thể sử dụng một khóa duy nhất để giả mạo giấy đi đường cho toàn Hà Nội mà không bị phát hiện.

### IV. DEMO

### ![](images/10.png)

Tạo QR Code

 

![](images/11.png)

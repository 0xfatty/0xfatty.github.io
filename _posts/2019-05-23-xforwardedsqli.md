---
title: "X Forwarded for SQL injection"
date: "2019-05-23"
categories: 
  - "cases-study"
---

Author: Nikos Danopoulos, Ghost Labs

 

Last year, on May, I was assigned a Web Application test of a regular customer. As the test was [blackbox](https://resources.infosecinstitute.com/what-are-black-box-grey-box-and-white-box-penetration-testing/) one of the few entry points - if not the only - was a login page. The tight scoping range and the staticity of the Application did not provide many options.

After spending some time on the enumeration phase by trying to find hidden files/directories, leaked credentials online, common credentials, looking for vulnerable application components and more I was driven to a dead end.

No useful information were received, the enumeration phase had finished and no process had been made. Moreover, every fuzzing attempt on the login parameters didn’t not trigger any interesting responses.

## **Identifying the entry point**

A very useful Burp Suite Extension is Bypass WAF. To find out how this extension works, have a quick look [here](https://portswigger.net/bappstore/ae2611da3bbc4687953a1f4ba6a4e04c). Briefly, this extension is used to bypass a Web Application firewall by inserting specific headers on our HTTP Requests. **[X-Forwarded-For](https://en.wikipedia.org/wiki/X-Forwarded-For)** is one of the them. What this header is also known for though is for the frequent use by the developers to store the IP Data of the client.

The following backend SQL statement is a vulnerable example of this:

mysql\_query("SELECT username, password FROM users-data WHERE username='".sanitize($\_POST\['username'\])."' AND password='".md5($\_POST\['password'\])."' AND ip\_adr='".ipadr()."'");

_More info here: [SQL Injection through HTTP Headers](https://resources.infosecinstitute.com/sql-injection-http-headers/#gref)_

Where **ipadr()** is a function that reads the $\_SERVER\['HTTP\_X\_FORWARDED\_FOR'\] value (X-Forwarded-For header) and by applying some regular expression decides whether to store the value or not.

For the web application I was testing, it turned out to have a similar vulnerability. The provided X-Forwarded-For header was not properly validated, it was parsed as a SQL statement and there was the entry point.

Moreover, it was not mandatory to send a POST request to the login page and inject the payload through the header. The header was read and evaluated on the index page, by just requesting the “/” directory.

Due to the application’s structure, I was not able to trigger any visible responses from the payloads. That made the Injection a Blind, Time Based one. Out of several and more complex payloads - mainly for debugging purposes - the final, initial, payload was:

"XOR(if(now()=sysdate(),sleep(6),0))OR"

![sql injection picture](images/sql-injection-blog-post-1.png)

And it was triggered by a similar request:

GET / HTTP/1.1
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.21 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.21
X-Forwarded-For: "XOR(if(now()=sysdate(),sleep(6),0))OR”
X-Requested-With: XMLHttpRequest
Referer: http://internal.customer.info/
Host: internal.customer.info
Connection: close
Accept-Encoding: gzip,deflate
Accept: /

The response was delayed, the sleep value was incremented to validate the finding and indeed, the injection point was ready.

As sqlmap couldn’t properly insert the injection point inside the XOR payload, an initial manual enumeration was done. The next information extracted was the Database Length. That would allow me to later identify the Database Name too. Here is the payload used:

"XOR(if(now()=sysdate(),sleep(6),0))OR"

![​​SQL injection picture](images/sql-injection-blog-post-2.png)

Of course, Burp Intruder was used to gradually increment the database length value. It turned out that the Database Length is 30. To find the Database Name Burp Intruder was used again with the following payload:

"XOR(if(MID(database(),1,1)='§position§',sleep(9),0))OR"

![​​SQL injection picture](images/sql-injection-blog-post-3.png)

To automate this in an attack the following payload was used:

"XOR(if(MID(database(),1,§number§)='§character§',sleep(2),0))OR"

During the attack I noticed that the first 3 characters are the same with the first character of the domain name I am testing. The domain were 20 character long. I paused the intruder attack, went back to repeater and verified like this:

"XOR(if(MID(database(),1,20)='',sleep(4),0))OR"

Indeed, the server delayed to respond indicating that the 15 first characters of the Database Name are the same as the domain name. The database name was 30 characters long. I had to continue the attack but this time with a different payload, starting the attack from character 21, in order to find the full database name. After a few minutes, the full database name was extracted. Format: “**<domain-name>\_<subdomain-name>\_493** ” With the database name I then attempted to enumerate table names.

Similarly, a char-by-char bruteforce attacks is required to find the valid names.

To do this I loaded the information\_schema.tables table that provides information about all the databases’ tables.  I filtered only the current’s database related tables by using the WHERE clause:

"XOR(if(Ascii(substring((​ Select​ table\_name ​from information\_schema.tables ​where​ table\_schema=​database​() limit 0​,1),​1,1))=​ '100'​, sleep​(5​),​0))​OR​"\*/

![​​SQL injection picture](images/sql-injection-blog-post-4.png)

As the previous payload was the initial one, I simplified it to this:

"XOR(if((substring((​ Select​ table\_name ​ from​ information\_schema.tables
where​ table\_schema=​database​() ​limit​ ​0,1),​1,1))=​'a'​, sleep​(3),​0))​ OR​ "\*/

Again, the payload was parsed to Burp Intruder to automate the process. After a few minutes the first tables were discovered:

![​​SQL injection picture](images/sql-injection-blog-post-5.png)

![​​SQL injection picture](images/sql-injection-blog-post-6.png)

After enumerating about 20 Tables Names I decided to try again my luck with SQLmap. As several tables where discovered, one of them was used to help sqlmap understand the injection point and continue the attack. Payload used in sqlmap: `XOR(select 1 from cache where 1=1 and 1=1*)OR` By that time I managed to properly set the injection point and I forced sqlmap to just extract the column names and data from the interesting tables.

![​​SQL injection picture](images/sql-injection-blog-post-7.png)

![​​SQL injection picture](images/sql-injection-blog-post-8.png)

**Notes and Conclusion**

At the end of the injection the whole database along with the valuable column information was received. The customer was notified immediately and the attack was reproduced as a proof of concept.

Sometimes manual exploitation - especially blind, time based attacks - may seem tedious. As shown, it is also sometimes difficult to automate a detected injection attack. The best thing that can be done on such cases is to manually attack until all the missing information for the automation of the attack are collected.

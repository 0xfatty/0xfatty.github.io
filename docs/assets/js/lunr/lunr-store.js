var store = [{
        "title": "Web Application Pentesting (Vietnamese)",
        "excerpt":"Re-made by: @felix   [embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/03/Presentation1.pdf” download=”none”]  ","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/03/06/web-application-pentesting-vietnamese.html",
        "teaser": null
      },{
        "title": "Discovery & Probing",
        "excerpt":"Default Port Lists - Windows - *nix Enumeration tools and techniques - The vast majority can be used generically, however, certain bespoke application require there own specific toolsets to be used. Default passwords are platform and vendor specific General Enumeration Tools nmap nmap -n -A -PN -p- -T Agressive -iL...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/discovery-probing.html",
        "teaser": null
      },{
        "title": "Enumeration",
        "excerpt":"  FTP port 21 open Fingerprint server telnet ip_address 21 (Banner grab) Run command ftp ip_address ftp@example.com Check for anonymous access ftp ip_addressUsername: anonymous OR anonPassword: any@email.com Password guessing Hydra brute force medusa Brutus Examine configuration files ftpusers ftp.conf proftpd.conf MiTM pasvagg.pl SSH port 22 open Fingerprint server telnet ip_address...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/enumeration.html",
        "teaser": null
      },{
        "title": "John The Ripper Hash Formats",
        "excerpt":"John the Ripper is a favourite password cracking tool of many pentesters.  There is plenty of documentation about its command line options. I’ve encountered the following problems using John the Ripper.  These are not problems with the tool itself, but inherent problems with pentesting and password cracking in general. Sometimes I...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/john-the-ripper-hash-formats.html",
        "teaser": null
      },{
        "title": "Penetration",
        "excerpt":"Penetration - An exploit usually relates to the existence of some flaw or vulnerability in an application or operating system that if used could lead to privilege escalation or denial of service against the computer system that is being attacked. Exploits can be compiled and used manually or various engines...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/penetration.html",
        "teaser": null
      },{
        "title": "Reverse Shell",
        "excerpt":"If you’re lucky enough to find a command execution vulnerability during a penetration test, pretty soon afterwards you’ll probably want an interactive shell. If it’s not possible to add a new account / SSH key / .rhosts file and just log in, your next step is likely to be either...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/reverse-shell.html",
        "teaser": null
      },{
        "title": "SSH",
        "excerpt":"SSH has several features that are useful during pentesting and auditing.  This page aims to remind us of the syntax for the most useful features. NB: This page does not attempt to replace the man page for pentesters, only to supplement it with some pertinent examples. SOCKS Proxy Set up a SOCKS...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/ssh.html",
        "teaser": null
      },{
        "title": "Vulnerability Assessment",
        "excerpt":"Manual - Patch Levels - Confirmed Vulnerabilities - Severe - High - Medium - Low Automated Reports Vulnerabilities Severe High Medium Low Tools GFI Nessus (Linux) Nessus (Windows) NGS Typhon NGS Squirrel for Oracle NGS Squirrel for SQL SARA MatriXay BiDiBlah SSA Oval Interpreter Xscan Security Manager + Inguma Resources...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/vulnerability-assessment.html",
        "teaser": null
      },{
        "title": "Wireless Penetration",
        "excerpt":"Wireless Assessment. The following information should ideally be obtained/enumerated when carrying out your wireless assessment. All this information is needed to give the tester, (and hence, the customer), a clear and concise picture of the network you are assessing. A brief overview of the network during a pre-site meeting weith...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/wireless-penetration.html",
        "teaser": null
      },{
        "title": "[PWN] ELF-MIPS-Stack-buffer-overflow-No-NX",
        "excerpt":"Author: PhieuLang1993 Challenge: Here Overview: We have: NX is disabled, ASLR off Determining Vulnerabilities: - By fuzzing, we see that the programs call _ftext method, this method then calls function, and executes sys_exit after. - Analyzing function: - This function uses sys_write to print “Hello World\\nWhat is your name: “....","categories": ["root-me"],
        "tags": [],
        "url": "/root-me/2019/03/13/pwn-elf-mips-stack-buffer-overflow-no-nx.html",
        "teaser": null
      },{
        "title": "Bug Bounty Tips (2)",
        "excerpt":"Author: Shankar R How to make a good report !! We can find ton of write-ups for this section but one of my favorite is https://youtu.be/XAjpilWbSSQ The importance of Impact: Many researchers are looking for a bug on the target if they found a small vulnerabilities then they have reported to...","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/03/20/bug-bounty-tips-2.html",
        "teaser": null
      },{
        "title": "CVE-2019-10017: CMS Made Simple 2.2.10 XSS via File Picker Extension",
        "excerpt":"I. OVERVIEW Author: Chi Tran of Southern Methodist University Vendor: CMS Made Simple™ Product: CMS Made Simple™ 2.2.10 “Spuzzum” CVE Reference: CVE-2019-10017 Original Entry Date: March 24, 2019 Affected Version(s): 2.2.10   II. VULNERABILITY DETAILS Cause: The ‘moduleinterface.php’ uploader class script does not properly filter HTML code from user-supplied input...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/03/25/cmsmadesimple-xss-filepicker.html",
        "teaser": null
      },{
        "title": "CVE-2019-10016: GForge Advanced Server Input validation error in 'commonsearch.php'",
        "excerpt":"I. OVERVIEW Author: Chi Tran of Southern Methodist University Vendor: GForge Group Product: GForge Advanced Server CVE Reference: CVE-2019-10016 Original Entry Date: March 20, 2019 Affected Version(s): 6.4.4   II. VULNERABILITY DETAILS GForge Advanced Server 6.4.4 allows XSS via the commonsearch.php words parameter, as demonstrated by a snippet/search/?words= substring Cause:...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/03/25/gforge-advanced-server-xss-commonsearch-php.html",
        "teaser": null
      },{
        "title": "Subdomain Enumeraton Tools,Wordlists and Online DNS tools",
        "excerpt":"Subdomain Enumeraton Tools,Wordlists and Online DNS tools. https://github.com/aboul3la/Sublist3r https://github.com/jhaddix/domain https://github.com/guelfoweb/knock https://github.com/TheRook/subbrute https://github.com/blechschmidt/massdns https://bitbucket.org/LaNMaSteR53/recon-ng https://github.com/caffix/amass https://github.com/cakinney/domained https://github.com/rbsec/dnscan https://github.com/michenriksen/aquatone https://tools.kali.org/information-gathering/dnsrecon https://www.aldeid.com/wiki/Fierce https://github.com/OJ/gobuster https://github.com/fwaeytens/dnsenum https://github.com/infosec-au/altdns https://github.com/sensepost/BiLE-suite https://github.com/tomsteele/blacksheepwall https://github.com/RandomStorm/Bluto https://github.com/anshumanbh/brutesubs https://github.com/mandatoryprogrammer/cloudflare_enum https://github.com/UnaPibaGeek/ctfr https://github.com/m0nad/DNS-Discovery https://github.com/lorenzog/dns-parallel-prober https://github.com/evilsocket/dnssearch https://github.com/mschwager/fierce https://github.com/mhmdiaa/second-order https://github.com/jrozner/sonar https://github.com/laramies/theHarvester https://github.com/gwen001/vhost-brute https://github.com/codingo/VHostScan https://github.com/jobertabma/virtual-host-discovery https://github.com/ChrisTruncer/EyeWitness https://github.com/sharsi1/sublazerwlst https://github.com/appsecco/the-art-of-subdomain-enumeration https://github.com/evilsocket/xray https://www.nlnetlabs.nl/projects/ldns/ https://dnscurve.org/nsec3walker.html https://github.com/eldraco/domain_analyzer https://github.com/christophetd/censys-subdomain-finder https://github.com/n4xh4ck5/N4xD0rk https://github.com/n4xh4ck5/V1D0m Online DNS...","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/05/23/subdomain-enumeraton-toolswordlists-and-online-dns-tools.html",
        "teaser": null
      },{
        "title": "Vulnerabilities List",
        "excerpt":"SQL injection aka SQLi Cross-site scriptting aka XSS Subdomain takeover Relative path overwrite / Path-relative style sheet import Cross-site request forgery aka CSRF Clickjacking Cross-origin resource sharing aka CORS Cookies SSL cookie without secure flag set Cookie scoped to parent domain Duplicate cookies set Cookie without HttpOnly flag set Cookie...","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/05/23/vulnerabilities-list.html",
        "teaser": null
      },{
        "title": "Web Application Penetration Testing",
        "excerpt":"Web Application Penetration Testing Phase 1 – History History of Internet - https://www.youtube.com/watch?v=9hIQjrMHTv4 Phase 2 – Web and Server Technology Basic concepts of web applications, how they work and the HTTP protocol - https://www.youtube.com/watch?v=RsQ1tFLwldY&amp;t=7s HTML basics part 1 - https://www.youtube.com/watch?v=p6fRBGI_BY0 HTML basics part 2 - https://www.youtube.com/watch?v=Zs6lzuBVK2w Difference between static and...","categories": ["cases-study"],
        "tags": [],
        "url": "/cases-study/2019/05/23/web-application-penetration-testing.html",
        "teaser": null
      },{
        "title": "X Forwarded for SQL injection",
        "excerpt":"Author: Nikos Danopoulos, Ghost Labs   Last year, on May, I was assigned a Web Application test of a regular customer. As the test was blackbox one of the few entry points - if not the only - was a login page. The tight scoping range and the staticity of...","categories": ["cases-study"],
        "tags": [],
        "url": "/cases-study/2019/05/23/xforwardedsqli.html",
        "teaser": null
      },{
        "title": "CVE-2019-[12584-12585] : Command Injection Vulnerability on pfSense 2.4.4-RELEASE-p3",
        "excerpt":"I. OVERVIEW Author: Chi Tran Vendor: NetGate Product: NetGate PfSense Version: 2.4.4-RELEASE-p3 CVE Reference: CVE-2019-12584 &amp; CVE-2019-12585   II. ABOUT PFSENSE pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/05/29/cve-2019-12584-12585-command-injection-vulnerability-on-pfsense-2-4-4-release-p3.html",
        "teaser": null
      },{
        "title": "CVE-2019-12347: Stored Cross-site Scripting on pfSense 2.4.4-RELEASE-p3",
        "excerpt":"I. OVERVIEW Author: Chi Tran Vendor: NetGate Product: NetGate PfSense Version: 2.4.4-RELEASE-p3 CVE Reference: CVE-2019-12347 II. ABOUT PFSENSE pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being a...","categories": ["research"],
        "tags": [],
        "url": "/research/2019/05/29/stored-xss-acme-pfsense-2-4-4-p3.html",
        "teaser": null
      },{
        "title": "Arbitrary Command Execution in latest OrangeHRM platform",
        "excerpt":"I. OVERVIEW Author Credits: Hoang Le, Hoang Doan, Phi Le, Huy Ngo, Chi Tran Reproduced By: Chi Tran Vendor &amp; Product: **OrangeHRM Open Source Human Resource Management System** Version: 4.3.1 and before CVE Reference: CVE-2019-12839 II. ABOUT ORANGEHRM OrangeHRM Inc. is a HR software company based in Secaucus, New Jersey....","categories": ["research"],
        "tags": [],
        "url": "/research/2019/06/12/ace-orangehrm.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - bnv",
        "excerpt":"  ","categories": ["ctf"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-bnv.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - gphotos",
        "excerpt":"  ","categories": ["ctf"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-gphotos.html",
        "teaser": null
      },{
        "title": "[CVE-2020-7237] Remote Code Execution in Cacti RRDTool",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran Vendor &amp; Product: **Cacti Network Monitoring Tool** Version: 1.2.8 and prior CVE Reference: CVE-2020-7237 II. ABOUT CACTI Cacti is a complete front-end to RRDTool, it stores all of the necessary information to create graphs and populate them with data in a MySQL database. The frontend...","categories": ["research"],
        "tags": [],
        "url": "/research/2020/01/26/cve-2020-7237-remote-code-execution-in-cacti-rrdtool.html",
        "teaser": null
      },{
        "title": "[CVE-2020-8962] D-LINK DIR-842 Stack-based Buffer-overflow",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran Vendor &amp; Product: D-Link Version: DIR-842_REVC_RELEASE_NOTES_v3.13B09_HOTFIX CVE Reference: CVE-2020-8962 II. ABOUT D-LINK D-Link’s products are geared towards the networking and communications market. Its business products include switches, surveillance network cameras, firewalls, iSCSI SANs and business wireless, while consumer products cover consumer wireless devices, broadband devices,...","categories": ["research"],
        "tags": [],
        "url": "/research/2020/02/13/cve-2020-8962-d-link-dir-842-stack-based-buffer-overflow.html",
        "teaser": null
      },{
        "title": "[ZDI-21-203] D-Link DAP-2020 webproc getpage Stack-based BOF RCE",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran &amp; phieulang93 &amp; chung96vn Vendor &amp; Product: D-Link Version: DAP-2020 A1 Zero Day Initiative: ZDI-21-203 CVE Reference: CVE-2021-27248 II. VULNERABILITY DETAILS This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 Wi-Fi access points. Authentication is not required to exploit...","categories": ["research"],
        "tags": [],
        "url": "/research/2021/02/27/zdi-21-203-d-link-dap-2020-webproc-getpage-stack-based-bof-rce.html",
        "teaser": null
      },{
        "title": "[ZDI-21-977] D-Link DAP-2020 webproc Stack-based BOF RCE",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran &amp; phieulang93 &amp; chung96vn Vendor &amp; Product: D-Link Version: DAP-2020 A1 Zero Day Initiative: ZDI-21-977 CVE Reference: CVE-2021-34861 II. VULNERABILITY DETAILS This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 routers. Authentication is not required to exploit this vulnerability....","categories": ["esearch"],
        "tags": [],
        "url": "/esearch/2021/08/21/zdi-21-977-d-link-dap-2020-webproc-stack-based-bof-rce.html",
        "teaser": null
      },{
        "title": "[Tiếng Việt] Tôi đã fake hơn 250k giấy đi đường như thế nào",
        "excerpt":"I. TÓM TẮT Hệ thống cấp giấy đi đường mà Công An Thành Phố Hà Nội đang sử dụng tồn tại lỗ hổng nghiêm trọng về cách triển khai mã hóa, dẫn đến nguy cơ bị giả mạo giấy đi đường tùy ý hay cũng có khả năng rất cao...","categories": ["research"],
        "tags": [],
        "url": "/research/2021/09/17/weak-rsa-in-realworld-vietnamese.html",
        "teaser": null
      },{
        "title": "[English] How I faked tons of COVID passes — Weak Key Cryptography in real world",
        "excerpt":"I. SUMMARY Hanoi Police Department was using a QR generation system to provide COVID passes for its citizens to go out. The system was vulnerable to a weak key cryptography attack which may allow COVID patients to self-generate passes. II. ANALYSIS 1. QR DATA Through news channels and social medias,...","categories": ["research"],
        "tags": [],
        "url": "/research/2021/09/29/weak-key-cryptography-in-real-world-english.html",
        "teaser": null
      },{
        "title": "Pwning the Facebook Portal",
        "excerpt":"Overview Back in November, 2021, my friend and I were trying to make an attempt to participate Pwn2Own. Unfortunately, due to some rules of exploitation. Our submission was not accepted. Today, as the vulnerability has now been fixed by the vendor, we decide to publish this blog post regarding a...","categories": ["research"],
        "tags": [],
        "url": "/research/2022/01/21/pwning-facebook-portal.html",
        "teaser": null
      },{
        "title": "Pwning the Samsung TV",
        "excerpt":"Overview Next, following up on the “failed” Pwn2Own 2021 series, this blog post will be talking about the vulnerability found on Samsung TV - a Pwn2Own 2021 target. Vulnerability Summary The default browser of Samsung Smart TV is chromium-based with obsolete version. So we use 1-day CVE-2020-6383 to exploit this...","categories": ["research"],
        "tags": [],
        "url": "/research/2022/01/28/pwning-the-samsung-tv.html",
        "teaser": null
      },{
        "title": "Welcome to Jekyll!",
        "excerpt":"You’ll find this post in your _posts directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run jekyll serve, which launches a web server and auto-regenerates your site when...","categories": ["jekyll","update"],
        "tags": [],
        "url": "/jekyll/update/2023/01/26/welcome-to-jekyll.html",
        "teaser": null
      }]

var store = [{
        "title": "[HTB Writeups] - Chaos",
        "excerpt":"Overview To kick-off this blog, I am publishing my write-up for Chaos - a newest machine on Hack The Box as of today. The machine was a little tough, but its concepts require just medium level of enumeration and UNIX system skills. Total time spent: ~ 15 hours Nmap Scanning...","categories": ["hackthebox"],
        "tags": [],
        "url": "/hackthebox/2018/12/23/htb-chaos.html",
        "teaser": null
      },{
        "title": "Bug Hunting Tips",
        "excerpt":"Author: Shankar Pre-requisites Skills: Linux basics Basic idea about the HTTP protocols and its headers(Request and Response) (Burpsuite) How to choose our target ? We can choose our targets from bug bounty platforms like Bugcrowd, Hackerone, Zerocopter, etc, Or we can find targets from the google by searching for responsible disclosure policy...","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/02/07/bug-hunting-tips.html",
        "teaser": null
      },{
        "title": "Web Application Pentesting (Vietnamese)",
        "excerpt":"Re-made by: @felix   [embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/03/Presentation1.pdf” download=”none”]  ","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/03/06/web-application-pentesting-vietnamese.html",
        "teaser": null
      },{
        "title": "Bug Bounty Programs",
        "excerpt":"[embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/03/Bug-Bounties.xlsx” viewer=”google”]  ","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2019/03/12/bug-bounty-programs.html",
        "teaser": null
      },{
        "title": "DB2 SQL Injection",
        "excerpt":"Finding a SQL injection vulnerability in a web application backed by DB2 isn’t too common in my experience.  When you do find one, though it pays to be prepared… Below are some tabulated notes on how to do many of thing you’d normally do via SQL injection.  All tests were...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/db2-sql-injection.html",
        "teaser": null
      },{
        "title": "DFIR",
        "excerpt":"Volatility   https://github.com/volatilityfoundation/volatility/wiki/Command-Reference   https://github.com/volatilityfoundation/volatility/wiki/Command-Reference-Mal   Bulk Extractor   https://github.com/simsong/bulk_extractor   Lib PFF   https://github.com/libyal/libpff  ","categories": ["tools"],
        "tags": [],
        "url": "/tools/2019/03/12/dfir.html",
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
        "title": "Informix SQL Injection",
        "excerpt":"Some useful syntax reminders for SQL Injection into Informix databases… Below are some tabulated notes on how to do many of thing you’d normally do via SQL injection.  All tests were performed on Informix Dynamic Server Express Edition 11.5 for Windows.  The Informix download page is here. I’m not planning...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/informix-sql-injection.html",
        "teaser": null
      },{
        "title": "Ingres SQL Injection",
        "excerpt":"Ingres seems to be one of the less common database backends for web applications, so I thought it would be worth installing it and making some notes to make my next Ingres-based web app test a little easier. Below are some tabulated notes on how to do many of thing...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/ingres-sql-injection.html",
        "teaser": null
      },{
        "title": "John The Ripper Hash Formats",
        "excerpt":"John the Ripper is a favourite password cracking tool of many pentesters.  There is plenty of documentation about its command line options. I’ve encountered the following problems using John the Ripper.  These are not problems with the tool itself, but inherent problems with pentesting and password cracking in general. Sometimes I...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/john-the-ripper-hash-formats.html",
        "teaser": null
      },{
        "title": "MSSQL Injection",
        "excerpt":"Some useful syntax reminders for SQL Injection into MSSQL databases… I’m not planning to write one for MS Access, but there’s a great MS Access Cheat Sheet here. Some of the queries in the table below can only be run by an admin. These are marked with “– priv” at...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/mssql-injection.html",
        "teaser": null
      },{
        "title": "MySQL SQL Injection",
        "excerpt":"Some useful syntax reminders for SQL Injection into MySQL databases… I’m not planning to write one for MS Access, but there’s a great MS Access Cheat Sheet here. Some of the queries in the table below can only be run by an admin. These are marked with “– priv” at...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/mysql-sql-injection.html",
        "teaser": null
      },{
        "title": "Network Foot-printing",
        "excerpt":"Whois is widely used for querying authoritative registries/ databases to discover the owner of a domain name, an IP address, or an autonomous system number of the system you are targeting. - Authoratitive Bodies - IANA - Internet Assigned Numbers Authority - ICANN - Internet Corporation for Assigned Names and...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/network-foot-printing.html",
        "teaser": null
      },{
        "title": "Oracle SQL Injection",
        "excerpt":"Some of the queries in the table below can only be run by an admin.  These are marked with “– priv” at the end of the query. VersionSELECT banner FROM v$version WHERE banner LIKE ‘Oracle%’; SELECT banner FROM v$version WHERE banner LIKE ‘TNS%’; SELECT version FROM v$instance;CommentsSELECT 1 FROM dual...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/oracle-sql-injection.html",
        "teaser": null
      },{
        "title": "Penetration",
        "excerpt":"Penetration - An exploit usually relates to the existence of some flaw or vulnerability in an application or operating system that if used could lead to privilege escalation or denial of service against the computer system that is being attacked. Exploits can be compiled and used manually or various engines...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/penetration.html",
        "teaser": null
      },{
        "title": "Postgre SQL Injection",
        "excerpt":"Some useful syntax reminders for SQL Injection into PostgreSQL databases… I’m not planning to write one for MS Access, but there’s a great MS Access Cheat Sheet here. Some of the queries in the table below can only be run by an admin. These are marked with “– priv” at...","categories": ["security-cheat-sheets"],
        "tags": [],
        "url": "/security-cheat-sheets/2019/03/12/postgre-sql-injection.html",
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
        "title": "VoIP Security",
        "excerpt":"  Sniffing Tools AuthTool Cain &amp; Abel Etherpeek NetDude Oreka PSIPDump SIPomatic SIPv6 Analyzer UCSniff VoiPong VOMIT Wireshark WIST - Web Interface for SIP Trace Scanning and Enumeration Tools enumIAX fping IAX Enumerator iWar Nessus Nmap SIP Forum Test Framework (SFTF) SIPcrack sipflanker python sipflanker.py 192.168.1-254 SIP-Scan SIP.Tastic SIPVicious SiVuS...","categories": ["penetration-testing-guides"],
        "tags": [],
        "url": "/penetration-testing-guides/2019/03/12/voip-security.html",
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
        "title": "OSCP Reviews Collection",
        "excerpt":"This post contains OSCP reviews from those who have taken OSCP sharing their thoughts and tips. https://scriptdotsh.com/index.php/2018/04/17/31-days-of-oscp-experience/ https://netsec.ws/?p=398 https://jhalon.github.io/OSCP-Review/ https://hakin9.org/try-harder-my-penetration-testing-with-kali-linux-oscp-review-and-courselab-experience-my-oscp-review-by-jason-bernier/ https://h4ck.co/oscp-journey-pwk-course-review/ https://awansec.com/oscp-review.html http://jameelnabbo.com/oscp-preparation-guide-and-exam-review/ https://www.linkedin.com/pulse/oscp-review-nick-frichette https://www.secjuice.com/oscp-prep-guidance/ https://www.jimwilbur.com/2017/07/oscp-review/ https://www.hackingtutorials.org/hacking-courses/offensive-security-certified-professional-oscp/ https://clintonmetu.com/2018/06/how-i-prepared-for-the-pwk-course-and-oscp-exam-oscp-exam-review/ http://dsolstad.com/PWK-OSCP-Review/ https://medium.com/@forwardsecrecy/oscp-post-exam-and-final-review-448e51bf7dae https://medium.com/@LearnerPentest/oscp-i-did-it-af9ee3335a1c http://dann.com.br/oscp-offensive-security-certification-pwk-course-review/ http://niiconsulting.com/checkmate/2017/06/a-detail-guide-on-oscp-preparation-from-newbie-to-oscp/ http://ly0n.me/2018/04/30/offensive-security-certs-oscp-and-osce-review/ https://www.netsecfocus.com/oscp/review/2019/01/29/An_Adventure_to_Try_Harder_Tjnulls_OSCP_Journey.html https://dubell.io/my-oscp-review/ https://m4cybersolutions.com/oscp-review/ https://dejandayoff.com/oscp-review—felt-the-pain-and-suffered-through-it/ https://stormctf.ninja/ctf/blog/c0ax/review/oscp-review https://github.com/D3cl4n/OSCP-Review https://community.infosecinstitute.com/discussion/132306/oscp-review https://ethicalhackers.club/oscp-penetration-testing-kali-linux-experience-review/ https://limbenjamin.com/articles/oscp-review.html http://www.exumbraops.com/blog/2018/4/6/7-things-you-didnt-know-about-passing-the-oscp http://www.websecgeeks.com/2017/04/penetration-testing-with-kali-linux.html https://blog.fadyothman.com/pwk-and-oscp-my-experience/ https://wiki.securityweekly.com/Hack_Naked_TV_OSCP_Review https://dilsec.com/2017/04/06/oscp-certification-the-review/ https://infosecuritygeek.com/my-oscp-journey/ https://kongwenbin.wordpress.com/2017/02/23/officially-oscp-certified/...","categories": ["oscp"],
        "tags": [],
        "url": "/oscp/2019/03/22/oscp-reviews-collection.html",
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
        "excerpt":"I. OVERVIEW Author: Chi Tran Vendor: NetGate Product: NetGate PfSense Version: 2.4.4-RELEASE-p3 CVE Reference: CVE-2019-12347   II. ABOUT PFSENSE pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/05/29/stored-xss-acme-pfsense-2-4-4-p3.html",
        "teaser": null
      },{
        "title": "A Debugging Primer with CVE-2019– 0708 (Author: Bruce Lee)",
        "excerpt":"This post was originally from https://www.exploit-db.com/exploits/46944 (Author: Bruce Lee)   [embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/05/46944-a-debugging-primer-with-cve-2019-0708.pdf” download=”none”]  ","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/05/30/a-debugging-primer-with-cve-2019-0708-author-bruce-lee.html",
        "teaser": null
      },{
        "title": "Arbitrary Command Execution in latest OrangeHRM platform",
        "excerpt":"I. OVERVIEW Author Credits: VietSunshine Penetration Testing Team (Hoang Le, Hoang Doan, Phi Le, Huy Ngo, Chi Tran)  Reproduced By: Chi Tran Vendor &amp; Product: **OrangeHRM Open Source Human Resource Management System** Version: 4.3.1 and before CVE Reference: CVE-2019-12839   II. ABOUT ORANGEHRM OrangeHRM Inc. is a HR software company...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2019/06/12/ace-orangehrm.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - bnv",
        "excerpt":"[embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/06/Google-CTF-2019-Writeups-Web-BNV.pdf” download=”none”]  ","categories": ["ctf"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-bnv.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - gphotos",
        "excerpt":"[embeddoc url=”https://ctrsec.io/wp-content/uploads/2019/06/Google-CTF-2019-Writeups-Web-gphotos.pptx.pdf” download=”none”]  ","categories": ["ctf"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-gphotos.html",
        "teaser": null
      },{
        "title": "[Facebook CTF] Secret Note Keeper - Author: ducnt",
        "excerpt":"XS-Search - Secret Note Keeper, Facebook CTF 2019 The 0ld-day of facebook ctf Hi guys, long time no write. Last week, I played Facebook CTF 2019 with PwnPHOfun CTF team. This CTF really cool, nice web challs. I solved secret note keeper chall, below are the details. Overview: This chall...","categories": ["ctf"],
        "tags": ["ducnt"],
        "url": "/ctf/2020/01/03/facebook-ctf-secret-note-keeper-author-ducnt.html",
        "teaser": null
      },{
        "title": "[CVE-2020-7237] Remote Code Execution in Cacti RRDTool",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran Vendor &amp; Product: **Cacti Network Monitoring Tool** Version: 1.2.8 and prior CVE Reference: CVE-2020-7237   II. ABOUT CACTI Cacti is a complete front-end to RRDTool, it stores all of the necessary information to create graphs and populate them with data in a MySQL database. The...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2020/01/26/cve-2020-7237-remote-code-execution-in-cacti-rrdtool.html",
        "teaser": null
      },{
        "title": "PortSwigger - Top 10 web hacking techniques of 2019 - nominations open",
        "excerpt":"Author: James Kettle - @albinowax Update: Nominations are now closed - cast your vote here Nominations for the top 10 new web hacking techniques of 2019 are now open! Every year, professional researchers, seasoned pentesters, bug bounty hunters and academics release a flood of blog posts, presentations, videos and whitepapers. Whether they’re...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2020/01/27/portswigger-top-10-web-hacking-techniques-of-2019-nominations-open.html",
        "teaser": null
      },{
        "title": "[CVE-2020-8962] D-LINK DIR-842 Stack-based Buffer-overflow",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran Vendor &amp; Product: D-Link Version: DIR-842_REVC_RELEASE_NOTES_v3.13B09_HOTFIX CVE Reference: CVE-2020-8962 II. ABOUT D-LINK D-Link’s products are geared towards the networking and communications market. Its business products include switches, surveillance network cameras, firewalls, iSCSI SANs and business wireless, while consumer products cover consumer wireless devices, broadband devices,...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2020/02/13/cve-2020-8962-d-link-dir-842-stack-based-buffer-overflow.html",
        "teaser": null
      },{
        "title": "[ZDI-21-203] D-Link DAP-2020 webproc getpage Stack-based BOF RCE",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran &amp; phieulang93 &amp; chung96vn Vendor &amp; Product: D-Link Version: DAP-2020 A1 Zero Day Initiative: ZDI-21-203 CVE Reference: CVE-2021-27248 II. VULNERABILITY DETAILS This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 Wi-Fi access points. Authentication is not required to exploit...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2021/02/27/zdi-21-203-d-link-dap-2020-webproc-getpage-stack-based-bof-rce.html",
        "teaser": null
      },{
        "title": "[ZDI-21-977] D-Link DAP-2020 webproc Stack-based BOF RCE",
        "excerpt":"I. OVERVIEW Discoverer: Chi Tran &amp; phieulang93 &amp; chung96vn Vendor &amp; Product: D-Link Version: DAP-2020 A1 Zero Day Initiative: ZDI-21-977 CVE Reference: CVE-2021-34861 II. VULNERABILITY DETAILS This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 routers. Authentication is not required to exploit this vulnerability....","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2021/08/21/zdi-21-977-d-link-dap-2020-webproc-stack-based-bof-rce.html",
        "teaser": null
      },{
        "title": "",
        "excerpt":"Given network scan results { ‘192.168.0.1’: “80, 443, 53”. ‘.0.2’ … { ‘80’: “.0.1, .0..2”, ‘443’:   }     security question coding problem solving breakdown demo technical dialog interview ctf walkthrough be detailed be ideally web app academic approach Coding questions: Solving CEASAR: https://www.tutorialspoint.com/cryptography_with_python/cryptography_with_python_caesar_cipher.htm Find prime: https://www.geeksforgeeks.org/python-program-to-check-whether-a-number-is-prime-or-not/ Power of...","categories": ["hackthebox"],
        "tags": [],
        "url": "/hackthebox/2021/09/17/544.html",
        "teaser": null
      },{
        "title": "[Tiếng Việt] Tôi đã fake hơn 250k giấy đi đường như thế nào — “Weak Key Cryptography in real world”",
        "excerpt":"I. TÓM TẮT Hệ thống cấp giấy đi đường mà Công An Thành Phố Hà Nội đang sử dụng tồn tại lỗ hổng nghiêm trọng về cách triển khai mã hóa, dẫn đến nguy cơ bị giả mạo giấy đi đường tùy ý hay cũng có khả năng rất cao...","categories": ["security-research"],
        "tags": [],
        "url": "/security-research/2021/09/17/weak-rsa-in-realworld-vietnamese.html",
        "teaser": null
      },{
        "title": "[English] How I faked tons of COVID passes — “Weak Key Cryptography in real world”",
        "excerpt":"I. SUMMARY Hanoi Police Department was using a QR generation system to provide COVID passes for its citizens to go out. The system was vulnerable to a weak key cryptography attack which may allow COVID patients to self-generate passes. II. ANALYSIS 1. QR DATA Through news channels and social medias,...","categories": ["research"],
        "tags": [],
        "url": "/research/2021/09/29/weak-key-cryptography-in-real-world-english.html",
        "teaser": null
      },{
        "title": "Python Deserialization on Integrated AWS DDB Flask App",
        "excerpt":"Cách đây vài hôm mình có gặp một challenge hay ho khi làm Bug Bounty ở nền Cloud &amp;&amp; Web. Tuy flow xử lý data không có gì là mới, nhưng việc application sử dụng AWS DynamoDB để lưu trữ serialized data làm bug này trở nên thú vị hơn...","categories": ["bug-hunting"],
        "tags": [],
        "url": "/bug-hunting/2021/12/19/python-deserialization-on-integrated-aws-ddb-flask-app.html",
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

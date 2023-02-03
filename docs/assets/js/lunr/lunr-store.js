var store = [{
        "title": "CVE-2019-10017: CMS Made Simple 2.2.10 XSS via File Picker Extension",
        "excerpt":"Overview Author: Chi Tran Vendor: CMS Made Simple Product: CMS Made Simple™ 2.2.10 “Spuzzum” CVE Reference: CVE-2019-10017 Original Entry Date: March 24, 2019 Affected Version(s): 2.2.10 Vulnerability Details Cause: The moduleinterface.php uploader class script does not properly filter HTML code from user-supplied input in the Name field before listing the...","categories": ["Research"],
        "tags": [],
        "url": "/research/2019/03/25/cmsmadesimple-xss-filepicker.html",
        "teaser": null
      },{
        "title": "CVE-2019-10016: GForge Advanced Server Input validation error in 'commonsearch.php'",
        "excerpt":"Overview Author: Chi Tran Vendor: GForge Group Product: GForge Advanced Server CVE Reference: CVE-2019-10016 Original Entry Date: March 20, 2019 Affected Version(s): 6.4.4 Vulnerability Details GForge Advanced Server 6.4.4 allows XSS via the commonsearch.php words parameter, as demonstrated by a snippet/search/?words= substring Cause: The commonsearch.php script does not properly filter...","categories": ["Research"],
        "tags": [],
        "url": "/research/2019/03/25/gforge-advanced-server-xss-commonsearch-php.html",
        "teaser": null
      },{
        "title": "CVE-2019-[12584-12585] : Command Injection Vulnerability on pfSense 2.4.4-RELEASE-p3",
        "excerpt":"Overview Author: Chi Tran Vendor: NetGate Product: NetGate PfSense Version: 2.4.4-RELEASE-p3 CVE Reference: CVE-2019-12584 &amp; CVE-2019-12585 Vulnerability Details What is APCUPSD? Apcupsd is a UPS control system that permits orderly shutdown of your computer in the event of a power failure. An input validation error on HOST field via apcupsd_status.php...","categories": ["Research"],
        "tags": [],
        "url": "/research/2019/05/29/cve-2019-12584-12585-command-injection-vulnerability-on-pfsense-2-4-4-release-p3.html",
        "teaser": null
      },{
        "title": "CVE-2019-12347: Stored Cross-site Scripting on pfSense 2.4.4-RELEASE-p3",
        "excerpt":"Overview Author: Chi Tran Vendor: NetGate Product: NetGate PfSense Version: 2.4.4-RELEASE-p3 CVE Reference: CVE-2019-12347 About PfSense pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being a powerful, flexible...","categories": ["Research"],
        "tags": [],
        "url": "/research/2019/05/29/stored-xss-acme-pfsense-2-4-4-p3.html",
        "teaser": null
      },{
        "title": "Arbitrary Command Execution in latest OrangeHRM platform",
        "excerpt":"Overview Authors: Chi Tran, Hoang Le, Hoang Doan, Phi Le, Huy Ngo Vendor &amp; Product: OrangeHRM - Open Source Human Resource Management System Version: 4.3.1 and before CVE Reference: CVE-2019-12839 About OrangeHRM OrangeHRM Inc. is a HR software company based in Secaucus, New Jersey. The company has developed a human...","categories": ["Research"],
        "tags": [],
        "url": "/research/2019/06/12/ace-orangehrm.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - bnv",
        "excerpt":"  ","categories": ["CTF"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-bnv.html",
        "teaser": null
      },{
        "title": "[Google CTF 2019] Web Challenge - gphotos",
        "excerpt":"  ","categories": ["CTF"],
        "tags": [],
        "url": "/ctf/2019/06/25/google-ctf-2019-web-challenge-gphotos.html",
        "teaser": null
      },{
        "title": "[CVE-2020-7237] Remote Code Execution in Cacti RRDTool",
        "excerpt":"Overview Author: Chi Tran Vendor &amp; Product: Cacti - Network Monitoring Tool Version: 1.2.8 and prior CVE Reference: CVE-2020-7237 Vulnerability Detail Cacti allows authenticated users to set up On-deman RRD Update Settings and uses Boost Debug Log as a path for poller process output. My approach was trying to supply...","categories": ["Research"],
        "tags": [],
        "url": "/research/2020/01/26/cve-2020-7237-remote-code-execution-in-cacti-rrdtool.html",
        "teaser": null
      },{
        "title": "[CVE-2020-8962] D-LINK DIR-842 Stack-based Buffer-overflow",
        "excerpt":"Overview Author: Chi Tran Vendor &amp; Product: D-Link Version: DIR-842_REVC_RELEASE_NOTES_v3.13B09_HOTFIX CVE Reference: CVE-2020-8962 Vulnerability Detail On December 31, 2019, D-Link released DIR-842_REVC_RELEASE_NOTES_v3.13B09_HOTFIX to fix the hard-coded credential issue (CVE-2019-18852). By analyzing the firmware using QEMU, I observed that requests to /MTFWU are configured to be handled by /usr/sbin/mtfwu in HTTPD...","categories": ["Research"],
        "tags": [],
        "url": "/research/2020/02/13/cve-2020-8962-d-link-dir-842-stack-based-buffer-overflow.html",
        "teaser": null
      },{
        "title": "[ZDI-21-977] D-Link DAP-2020 webproc Stack-based BOF RCE",
        "excerpt":"Overview Discoverer: Chi Tran &amp; phieulang93 &amp; chung96vn Vendor &amp; Product: D-Link Version: DAP-2020 A1 Zero Day Initiative: ZDI-21-977 CVE Reference: CVE-2021-34861 Vulnerability Detail This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 routers. Authentication is not required to exploit this vulnerability. The specific...","categories": ["Research"],
        "tags": [],
        "url": "/research/2021/08/21/zdi-21-977-d-link-dap-2020-webproc-stack-based-bof-rce.html",
        "teaser": null
      },{
        "title": "How I faked tons of COVID passes — Weak Key Cryptography in real world",
        "excerpt":"Vulnerability Summary A Non-US Goverment agency was using a QR generation system to provide COVID passes for its citizens to go out. The system was vulnerable to a weak key cryptography attack which may allow COVID patients to self-generate passes. Vulnerability Analysis 1. QR Data: Through news channels and social...","categories": ["Research"],
        "tags": [],
        "url": "/research/2021/09/29/weak-key-cryptography-in-real-world.html",
        "teaser": null
      },{
        "title": "Pwning the Facebook Portal",
        "excerpt":"Overview Back in November, 2021, my friend and I were trying to make an attempt to participate Pwn2Own. Unfortunately, due to some rules of exploitation. Our submission was not accepted. Today, as the vulnerability has now been fixed by the vendor, we decide to publish this blog post regarding a...","categories": ["Research"],
        "tags": [],
        "url": "/research/2022/01/21/pwning-facebook-portal.html",
        "teaser": null
      },{
        "title": "Pwning the Samsung TV",
        "excerpt":"Overview Next, following up on the failed Pwn2Own 2021 series, this blog post will be talking about the vulnerability found on Samsung TV - a Pwn2Own 2021 target. Vulnerability Summary The default browser of Samsung Smart TV is chromium-based with obsolete version. So we use 1-day CVE-2020-6383 to exploit this...","categories": ["Research"],
        "tags": [],
        "url": "/research/2022/01/28/pwning-the-samsung-tv.html",
        "teaser": null
      }]

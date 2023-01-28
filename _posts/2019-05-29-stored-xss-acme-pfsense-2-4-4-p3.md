---
title: "CVE-2019-12347: Stored Cross-site Scripting on pfSense 2.4.4-RELEASE-p3"
date: "2019-05-29"
categories: 
  - "research"
---

### _**I. OVERVIEW**_

**Author**: **Chi Tran**

**Vendor**: **NetGate**

**Product**: **NetGate PfSense**

**Version: 2.4.4-RELEASE-p3**

**CVE Reference**: [**CVE-2019-12347**](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-12347)


### _**II. ABOUT PFSENSE**_

- pfSense® software is a free, open source customized distribution of FreeBSD specifically tailored for use as a firewall and router that is entirely managed via web interface. In addition to being a powerful, flexible firewalling and routing platform, it includes a long list of related features and a package system allowing further expandability without adding bloat and potential security vulnerabilities to the base distribution.

### _**III. VULNERABILITY DETAILS**_

- What is ACME? The ACME Package for pfSense interfaces with Let’s Encrypt to handle the certificate generation, validation, and renewal processes. ([https://docs.netgate.com/pfsense/en/latest/certificates/acme-package.html](https://docs.netgate.com/pfsense/en/latest/certificates/acme-package.html))
- **Stored-XSS Vulnerability** occurs due to an input validation error which allows attackers inject payload into **"Name"** and **"Description"** field via **acme\_accountkeys\_edit.php** action
- **MISC**: [https://redmine.pfsense.org/issues/9554](https://redmine.pfsense.org/issues/9554)
- **Cause:** The **'****acme\_accountkey.php'** script does not properly filter HTML code from user-supplied input in the **"Name" and "Description"** parameters before displaying the input. A remote user can create a specially crafted URL that, when loaded by a target user, will cause arbitrary scripting code to be executed by the target user's browser. The code will originate from the site running the Acme v0.5.7\_1 . As a result, the code will be able to access the target user's cookies (including authentication cookies), if any, associated with the site, access data recently submitted by the target user via web form to the site, or take actions on the site acting as the target user.
- **Code audit**:

![](/images/codeaudit.png)


- **Proof of Concepts:**

1 - Navigate to https://192.168.1.1/acme/acme\_accountkeys.php

![](/images/ACME1.png)

2 - Input the following payload into "Name" or "Description" field:
```
"><svg/onload=alert(1)>
```
![](/images/Stored-XSS.png)


### _**IV. IMPACT**_

- Stored-XSS attack could be used to perform several attack purposes such as session hijacking, client browser corruption, etc. Victim retrieves the malicious script from the server when it requests the stored information.

### _**V. REMEDIATION**_

- [https://github.com/pfsense/FreeBSD-ports/commit/504909564079e540689dbdbed3a579483c614275](https://github.com/pfsense/FreeBSD-ports/commit/504909564079e540689dbdbed3a579483c614275)


### _**VI. REPORT TIMELINE**_

- 05.26.2019 - Bug reported & Vendor confirmed
- 05.27.2019 - CVE ID Assigned
- 05.28.2019 - Vendor released a fix

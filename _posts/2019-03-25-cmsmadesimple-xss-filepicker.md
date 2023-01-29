---
title: "CVE-2019-10017: CMS Made Simple 2.2.10 XSS via File Picker Extension"
date: "2019-03-25"
categories: 
  - "Research"
---
## Overview

- Author: Chi Tran  
- Vendor: CMS Made Simple  
- Product: CMS Made Simple™ 2.2.10 "Spuzzum"
- CVE Reference: [CVE-2019-10017](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-10017)  
- Original Entry Date: March 24, 2019  
- Affected Version(s): 2.2.10

## Vulnerability Details

**Cause:** The `moduleinterface.php` uploader class script does not properly filter HTML code from user-supplied input in the `Name` field before listing the Profile. A remote authenticated user can create a specially crafted an malicious entry that, when loaded by a target users, will cause arbitrary scripting code to be executed by the target user's browser. The code will originate from the site running the CMS Made Simple software and will run in the security context of that site. As a result, the code will be able to access the target user's cookies (including authentication cookies), if any.

**Proof of Concepts:**

1 - Navigate to Admin Dashboard -> Click on Extension -> File Picker

`http://site.com/web/admin/moduleinterface.php?mact=FilePicker,m1_,defaultadmin,0`

![](/images/CVE1.png)

2 - Click on "Add a new Profile" -> In `Name` field, input the following payload:

`<svg/onload=alert("XSS")>`

![](/images/CVE2.png)

3 - After clicking Submit, malicious scripts will be executed every time we refresh `File Picker` page:

![](/images/CVE3.png)

## Impact

An attacker will be able to take over an account as well as cookies hijacking.

## Remediation

Not yet available. The fixes should be available on the next releases.

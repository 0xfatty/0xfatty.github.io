---
title: "[ZDI-21-977] D-Link DAP-2020 webproc Stack-based BOF RCE"
date: "2021-08-21"
categories: 
  - "security-research"
---

### _**I. OVERVIEW**_

- **Discoverer: Chi Tran & phieulang93 & chung96vn**
- **Vendor & Product: D-Link**
- **Version: DAP-2020 A1**
- **Zero Day Initiative: [ZDI-21-977](https://www.zerodayinitiative.com/advisories/ZDI-21-977/)**
- **CVE Reference: [CVE-2021-34861](https://supportannouncement.us.dlink.com/announcement/publication.aspx?name=SAP10201)**

### _**II. VULNERABILITY DETAILS**_

**This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 routers. Authentication is not required to exploit this vulnerability. The specific flaw exists within the webproc endpoint, which listens on TCP port 80 by default. The issue results from the lack of proper validation of the length of user-supplied data prior to copying it to a fixed-length stack-based buffer. An attacker can leverage this vulnerability to execute code in the context of root.**

- After analyzing the DAP-2020 A1 Router, a Stack Buffer-overflow vulnerability was discovered on _**mini\_httpd**_ service via post data, which exist in **_main()_** function in _**/usr/www/cgi-bin/webproc**_ binary.
- The following is part of decompiled code of _**/usr/www/cgi-bin/webproc**_ binary, the buffer overflow vulnerability was discovered in _**main()**_ function (See below)

// 00401e20 main - /usr/www/cgi-bin/webproc
int main(void)
{
    ...\[TRUNCATED\]...
    puVar6 = g\_pstNetVars;
    while (ppcVar7 = g\_pstWebVars, puVar6 != (undefined4 \*)0x0) {
        if (iVar5 == 0) {
            \_\_haystack = "?";
        }
        else {
            \_\_haystack = "&";
        }
      **  iVar2 = sprintf(\_\_s1,"%s%s=%s",\_\_haystack,\*puVar6,puVar6\[1\]); //BOF ==> 004024a8**
        puVar6 = (undefined4 \*)puVar6\[2\];
        \_\_s1 = \_\_s1 + iVar2;
        iVar5 = iVar5 + 1;
    }
    ...\[TRUNCATED\]...
    while (\_\_haystack = g\_stPostInfo.\_16\_4\_, ppcVar7 != (char \*\*)0x0) {
        \_\_haystack = \*ppcVar7;
        iVar2 = strncmp(\_\_haystack,"var:",4);
        if ((((iVar2 == 0) && (iVar2 = strcmp(\_\_haystack,"var:CacheLastData"), iVar2 != 0)) &&
                (iVar2 = strncmp(\_\_haystack,"var:mod\_",8), iVar2 != 0)) &&
            ((iVar2 = strncmp(\_\_haystack,"var:sys\_",8), iVar2 != 0 &&
                (iVar2 = strcmp(\_\_haystack,"var:sessionid"), iVar2 != 0)))) {
            if (iVar5 == 0) {
                pcVar4 = "?";
            }
            else {
                pcVar4 = "&";
            }
            **iVar2 = sprintf(\_\_s1,"%s%s=%s",pcVar4,\_\_haystack,ppcVar7\[1\]); //BOF ===> 004025c0**
            \_\_s1 = \_\_s1 + iVar2;
            iVar5 = iVar5 + 1;
        }
        ppcVar7 = (char \*\*)ppcVar7\[2\];
    }
    ...\[TRUNCATED\]...
}

- We were able to build a test environment for this vulnerability (See below). Additionally, many parameters can be used to trigger the Buffer Overflow vulnerability.

![](images/bof.png)

 

- The application crashed after an attack data was sent where we were able to control **$PC, $S4**, some registers as well as content on the **heap and stack** (See below)

![](images/bof1.png)

 

- More importantly, ASLR is not enabled on physical devices and the stack is executable (See below). We were able to control the memory where it is pointed by the **“$SP”** register which is executable in the context of the stack segment. 
- In fact, if we can control the **“$PC”** register to point to the shell-code in memory, we will be able to achieve Remote Code Execution on the affected device.

![](images/bof2.png)

 

- We managed to use 2 gadgets: “_**addiu $a3, $sp, 0x28 ; jalr $t9**_” and “_**move $t9, $a3 ; jalr $t9**_” in **/lib/libuClibc-0.9.30.so** (ASLR is disabled) to control **$A3** point to stack (part of post data), then control **$PC** point to **$A3** register (See below)

![](images/bof3.png)

 

### _**III. IMPACT**_

- When a memory buffer overflow occurs and data is written outside the buffer, the running program may become unstable, crash or return corrupt information. The overwritten parts of memory may have contained other important data for the running application which is now overwritten and not available to the program anymore. Buffer overflows can even run other (malicious) programs or commands and result in arbitrary code execution
- Proof of Concept:

![](images/poc.png)

### _**VI. DISCLOSURE TIMELINE**_

- 2021-03-12 - Vulnerability reported to vendor (through Zero Day Initiative)
- 2021-08-18 - Coordinated public release of advisory

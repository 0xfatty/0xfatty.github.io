---
title: "[ZDI-21-977] D-Link DAP-2020 webproc Stack-based BOF RCE"
date: "2021-08-21"
categories: 
  - "Research"
---
## Overview

- Discoverer: Chi Tran & phieulang93 & chung96vn
- Vendor & Product: D-Link
- Version: DAP-2020 A1
- Zero Day Initiative: [ZDI-21-977](https://www.zerodayinitiative.com/advisories/ZDI-21-977/)
- CVE Reference: [CVE-2021-34861](https://supportannouncement.us.dlink.com/announcement/publication.aspx?name=SAP10201)

## Vulnerability Detail

This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 routers. Authentication is not required to exploit this vulnerability. The specific flaw exists within the webproc endpoint, which listens on TCP port 80 by default. The issue results from the lack of proper validation of the length of user-supplied data prior to copying it to a fixed-length stack-based buffer. An attacker can leverage this vulnerability to execute code in the context of root.

After analyzing the DAP-2020 A1 Router, a Stack Buffer-overflow vulnerability was discovered on `mini_httpd` service via post data, which exist in `main()` function in `/usr/www/cgi-bin/webproc` binary.

The following is part of decompiled code of `/usr/www/cgi-bin/webproc` binary, the buffer overflow vulnerability was discovered in `main()` function (See below)

{% highlight c %}
// 00401e20 main - /usr/www/cgi-bin/webproc
// 00401e20 main - /usr/www/cgi-bin/webproc
int main(void)
{
    ...[TRUNCATED]...
    puVar6 = g_pstNetVars;
    while (ppcVar7 = g_pstWebVars, puVar6 != (undefined4 *)0x0) {
        if (iVar5 == 0) {
            __haystack = "?";
        }
        else {
            __haystack = "&";
        }
        iVar2 = sprintf(__s1,"%s%s=%s",__haystack,*puVar6,puVar6[1]); //BOF ==> 004024a8
        puVar6 = (undefined4 *)puVar6[2];
        __s1 = __s1 + iVar2;
        iVar5 = iVar5 + 1;
    }
    ...[TRUNCATED]...
    while (__haystack = g_stPostInfo._16_4_, ppcVar7 != (char **)0x0) {
        __haystack = *ppcVar7;
        iVar2 = strncmp(__haystack,"var:",4);
        if ((((iVar2 == 0) && (iVar2 = strcmp(__haystack,"var:CacheLastData"), iVar2 != 0)) &&
                (iVar2 = strncmp(__haystack,"var:mod_",8), iVar2 != 0)) &&
            ((iVar2 = strncmp(__haystack,"var:sys_",8), iVar2 != 0 &&
                (iVar2 = strcmp(__haystack,"var:sessionid"), iVar2 != 0)))) {
            if (iVar5 == 0) {
                pcVar4 = "?";
            }
            else {
                pcVar4 = "&";
            }
            iVar2 = sprintf(__s1,"%s%s=%s",pcVar4,__haystack,ppcVar7[1]); //BOF ===> 004025c0
            __s1 = __s1 + iVar2;
            iVar5 = iVar5 + 1;
        }
        ppcVar7 = (char **)ppcVar7[2];
    }
    ...[TRUNCATED]...
}
{% endhighlight %}

We were able to build a test environment for this vulnerability (See below). Additionally, many parameters can be used to trigger the Buffer Overflow vulnerability.

![](/images/bof.png)

The application crashed after an attack data was sent where we were able to control `$PC, $S4`, some registers as well as content on the `heap and stack` (See below)

![](/images/bof1.png)

More importantly, ASLR is not enabled on physical devices and the stack is executable (See below). We were able to control the memory where it is pointed by the `$SP` register which is executable in the context of the stack segment.

In fact, if we can control the `$PC` register to point to the shell-code in memory, we will be able to achieve Remote Code Execution on the affected device.

![](/images/bof2.png)

We managed to use 2 gadgets: `addiu $a3, $sp, 0x28 ; jalr $t9` and `move $t9, $a3 ; jalr $t9` in `/lib/libuClibc-0.9.30.so` (ASLR is disabled) to control `$A3` point to stack (part of post data), then control `$PC` point to `$A3` register (See below)

![](/images/bof3.png)

## Impact

- When a memory buffer overflow occurs and data is written outside the buffer, the running program may become unstable, crash or return corrupt information. The overwritten parts of memory may have contained other important data for the running application which is now overwritten and not available to the program anymore. Buffer overflows can even run other (malicious) programs or commands and result in arbitrary code execution
- Proof of Concept:

![](/images/poc.png)

## Report Timeline

2021-03-12 - Vulnerability reported to vendor (through Zero Day Initiative)  
2021-08-18 - Coordinated public release of advisory

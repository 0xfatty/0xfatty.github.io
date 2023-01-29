---
title: "[ZDI-21-203] D-Link DAP-2020 webproc getpage Stack-based BOF RCE"
date: "2021-02-27"
categories: 
  - "research"
---
## Overview

- Discoverer: Chi Tran & phieulang93 & chung96vn
- Vendor & Product: D-Link
- Version: DAP-2020 A1
- Zero Day Initiative: [ZDI-21-203](https://www.zerodayinitiative.com/advisories/ZDI-21-203/)
- CVE Reference: [CVE-2021-27248](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-27248)

## Vulnerability Detail

This vulnerability allows network-adjacent attackers to execute arbitrary code on affected installations of D-Link DAP-2020 Wi-Fi access points. Authentication is not required to exploit this vulnerability. The specific flaw exists within the processing of CGI scripts. When parsing the getpage parameter, the process does not properly validate the length of user-supplied data prior to copying it to a fixed-length stack-based buffer. An attacker can leverage this vulnerability to execute code in the context of root.

After analyzing the DAP-2020 A1 Router, a Stack Buffer-overflow vulnerability was found on `mini_httpd` service via `var:menu` or `var:page` parameter, which exist in `WEB_GetCgiVars()` function in `/usr/www/cgi-bin/webproc` binary.

The following is part of decompiled code of `/usr/www/cgi-bin/webproc` binary, the buffer overflow vulnerability was discovered in `WEB_GetCgiVars()`` function (See below)

{% highlight c %}
// 00402cf0 WEB_GetCgiVars - /usr/www/cgi-bin/webproc
int WEB_GetCgiVars(ST_NAME_VAL **ppstCgiVal)
{
    ...[TRUNCATED]...
    iVar3 = 0;
    if (0 < iVar1) {
        do {
            kv = local_30;
            if (local_30 != (char **)0x0) {
                __s = *local_30;
                __s1 = strchr(__s,0x3d);
                value = __s1 + 1;
                if (__s1 == (char *)0x0) {
                    OM_ValAppend((char **)ppstCgiVal,__s,(char *)0x0);
                }
                else {
                    *__s1 = '\0';
                    OM_ValSet(ppstCgiVal,*kv,value);
                    c = strcmp(*kv,"var:menu");
                    if (c == 0) {
                        strcpy(szMenu,value); // Stack BOF
                        WEB_Trace("[zym]szMenu=%s\n",szMenu);
                    }
                    c = strcmp(*kv,"var:page");
                    if (c == 0) {
                        strcpy(page,value); // Stack BOF
                        WEB_Trace("[zym]szPage=%s\n",page);
                    }
                }
                OM_ValDel(&local_30,kv);
            }
            iVar3 = iVar3 + 1;
        } while (iVar3 < iVar1);
    }
    free(__s_00);
    free(__delim);
    __s1 = My_getenv("HTTP_COOKIE");
    if (__s1 != (char *)0x0) {
        __s_00 = strstr(__s1,"
{% endhighlight %}

We were able to build a test environment for this vulnerability (See below). Additionally, either `var:menu` or `var:page` parameter can be used to trigger the Buffer Overflow vulnerability.

![](/images/Screen-Shot-2021-02-26-at-8.29.02-PM.png)

The application crashed after an attack data was sent where we were able to control `$PC, $A2`, some registers as well as content on the stack (See below)

![](/images/Screen-Shot-2021-02-26-at-8.30.06-PM.png)

More importantly, ASLR is not enabled on physical devices and the stack is executable (See below). We were able to control the memory where it is pointed by the `$a2` register which is executable in the context of the stack segment.

In fact, if we can control the `$PC` register to point to the shell-code in memory, we will be able to achieve Remote Code Execution on the affected device.

![](/images/Screen-Shot-2021-02-26-at-8.31.26-PM.png)

We managed to use gadget `move $t9, $a2 ; jalr $t9` in `/lib/libuClibc-0.9.30.so` (ASLR is disabled) to control `$PC` register to point to `$a2` register (part of cookie value)(See below)

![](/images/Screen-Shot-2021-02-26-at-8.32.33-PM.png)

## Impact

When a memory buffer overflow occurs and data is written outside the buffer, the running program may become unstable, crash or return corrupt information. The overwritten parts of memory may have contained other important data for the running application which is now overwritten and not available to the program anymore. Buffer overflows can even run other (malicious) programs or commands and result in arbitrary code execution

Proof of Concept:

![](/images/Screen-Shot-2021-02-26-at-8.34.40-PM.png)

## Report Timeline

2020-08-21 - Vulnerability reported to vendor (through Zero Day Initiative)  
2021-02-24 - Coordinated public release of advisory

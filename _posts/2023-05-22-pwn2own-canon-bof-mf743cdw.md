---
title: "[Pwn2Own 2022] CVE-2023-0855: Canon imageClass MF743CDW IPP BOF"
date: "2023-05-22"
categories: 
  - "Research"
---
## Overview

In December 2022, I participated and got a success in Pwn2Own Toronto 2022 targeting Canon Printer category. 

[Check it out here](https://twitter.com/thezdi/status/1601243187393298435)

![](/images/BunBo.jpg)

The Canon imageClass MF743Cdw's IPP service is vulnerable to a stack-based buffer overflow using the `number-up` attribute. This allows an unauthenticated attacker to execute arbitrary code on the device. 

## Analysis
There is a function at address `0x41BD138C` named `sub_41BD138C`. This function is called when printer handles IPP request packet that has an attribute named `number-up`.  

{% highlight javascript %}
int __fastcall sub_41BD138C(int a1, int a2, int a3, int a4)
{
  int v4; // r4
  int v5; // r6
  int v6; // r5
  int v7; // r2
  bool v8; // zf
  bool v9; // zf
  unsigned int v10; // r4
  unsigned __int16 v11; // r7
  unsigned int v12; // r1
  char dest[4]; // [sp+8h] [bp-18h] BYREF

  *(_DWORD *)dest = a4;
  v4 = 1;
  v5 = a2 + 32828;
  
...

LABEL_8:
    *(_DWORD *)dest = 0;
    v10 = 0;
    v11 = __rev16(*(unsigned __int8 *)(a1 + 1) | (*(unsigned __int8 *)(a1 + 2) << 8));
    memcpy_(
      dest,
      (char *)(a1 + v11 + 5),
      __rev16(*(unsigned __int8 *)(a1 + v11 + 3) | (*(unsigned __int8 *)(a1 + v11 + 4) << 8)));
    
  v12 = (*(int *)dest >> 8) & 0xFF00 | (__rev16(*(unsigned int *)dest) << 16) | dest[3];
    while ( v10 < dword_45CF9DC0 && dword_45CF9F5C[v10] != v12 )
      ++v10;

{% endhighlight %}

As we can see, this function takes a word from IPP request packet. This word is used as a length parameter without checking to copy data to stack-based variable `dest`. This variable `dest`'s size is just 4 bytes. This leads to stack buffer overflow and we can redirect the PC register to our code. 

## Exploitation
Based on [Synacktiv's past research](https://www.synacktiv.com/en/publications/the-printer-goes-brrrrr.html), we know that on real device, stack and heap region memory has read, write and executable right. So we can alloc a region at a fixed address, push our shellcode to this region and redirect PC register to this to get our shellcode run. 

The complete attack scenario will include these steps:
+ Send a BNJP request containing shellcode which will download an image and display it on the printer
+ Exploit the overflow and redirect the program register to shellcode buffer
+ Printer will display our image on monitor

## References

ZDI: https://www.zerodayinitiative.com/advisories/ZDI-23-555


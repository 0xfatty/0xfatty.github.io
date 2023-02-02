---
title: "How I faked tons of COVID passes — Weak Key Cryptography in real world"
date: "2021-09-29"
categories: 
  - "Research"
---
## Vulnerability Summary

A Non-US Goverment agency was using a QR generation system to provide COVID passes for its citizens to go out. The system was vulnerable to a weak key cryptography attack which may allow COVID patients to self-generate passes.

## Vulnerability Analysis
***1. QR Data:***

Through news channels and social medias, we were able to find a sample COVID pass as below:

1 - Vehicle type  
2 - License plate  
3 - Seat #  
4 - Vehicle operator  
5 - Citizen ID  
6 - Authorized zone  
7 - Valid from/to (date)  
8 - Valid from/to (time)

![](/images/1.jpg)  

As the QR code was not hidden, we were able to decode its information:
```
**D9LOgcTFAS1MeC3kD4J+5PmAW5C4mOrPcbwbynsY6GEuGNkpe/dwIM5cr0MS/a+LT1y9z+8sKJA9UaPZTmYJwQ==|**10505|3|06/09;07/09;08/09;09/09;10/09;11/09;12/09;13/09;14/09;15/09;16/09;17/09;18/09;19/09;20/09|4_[LOCAL_NON_US_GOVENMENT_AGENCY_NAME_]]|02439424451|29G1–391.89| |Vùng 1|Nguyễn Ánh Ngọc||09:00–20:00
```
The decoded string above contains information about the requester, zone ID/passes provider (i.e. `10505`). Additionally, there is a signature string at the beginning of this decoded QR - signed by RSA - SHA 256.

***2. Validation***

It was not hard for us to find out the application on Google Play Store (now removed). However, due to countries restriction, we had to use VPN to download the application named `Vehicle Operating Control` which had been removed after the research.

Let's go through the application workflow:

![](/images/12.png)

The above workflow is server-less, meaning it does not need any servers during the application process. Hence, there would be an obvious pros: the system would never be overloaded. However, the huge cons here is: the application trusts its clients 100% which is not ideal.

Not validating the data on server side means one thing: If the Private Key from one (1) zone was leaked, anyone would be able to generate valid passes.

***3. Deep dive into the workflow*** 

The original data was retrieved from the QR:
```
**D9LOgcTFAS1MeC3kD4J+5PmAW5C4mOrPcbwbynsY6GEuGNkpe/dwIM5cr0MS/a+LT1y9z+8sKJA9UaPZTmYJwQ==|**10505|3|06/09;07/09;08/09;09/09;10/09;11/09;12/09;13/09;14/09;15/09;16/09;17/09;18/09;19/09;20/09|4_[LOCAL_NON_US_GOVENMENT_AGENCY_NAME_]]|02439424451|29G1–391.89| |Vùng 1|Nguyễn Ánh Ngọc||09:00–20:00
```
This contains: `10505` - zone ID/passes provider, named `Local Authority Department`.

Once the application received the QR data, it would take the data string from zone ID to the end, then do the following steps:

- Removing `|`
- Removing special characters
- English Alphabetized all chars (i.e.: ê -> e)
- Lowercase transformation

![](/images/3.jpg)

***4. Processing string input***

The data became:
```
**10505**3060907090809090910091109120913091409150916091709180919092009**4_localauthority**02439424451**29g139189**vung1**nguyenanhngoc**09002000
```
Next, the data was hashed using a custom hashing algorithm. The algorithm pseudocode is below:
```
Hashcode = 0
Count = 0
For char in String:
Count += 1
Hashcode += char * Count
Hashcode = (1988 * Hashcode — 1910) / 2
```
Once the data went through above hashing process, it then became a new format: `682673275`

This is the first cons in the application workflow. The fact that the above hashcode was quite easy to reproduce led to possible Collision attacks, meaning there could be other strings having the same hashcode.

![](/images/4.jpg)

The data, after getting through hashcode process, will then be validated using hard-coded Public key in the application. However, we found all hard-coded Public keys were using RSA 512. Obviously, RSA 512-bits key was proven breakable years ago.

After spending few hours doing research, we found an interesting research paper: **Factoring as a Service**

![](/images/5.jpg)

> Reference: [https://seclab.upenn.edu/projects/faas/faas.pdf](https://seclab.upenn.edu/projects/faas/faas.pdf)

The authors utilized the "cloud power" to crack one (1) RSA 512-bit key within a few hours instead of using a single machine. And looks like it's doable. Luckily, the authors also published their research as well as code repo.

> Link: [https://github.com/eniac/faas](https://github.com/eniac/faas)

Although the code was provided, we took around 2 days to get this running since the code was written back in 2015. Some libraries are not currently supported forced us to make several changes on the code. The project was then running smoothly.

## State of the Art

The most interesting thing, I believe, not about the bug, but about setting up cracking environment.

### 1. Setting up the environment

As I mentioned above, the code was written back in 2015 by a group of Professors and Researchers from the University of Pennsylvania. A 7 years old tool, in fact, is no longer compatible with current libraries and software versions. Hence, it took time to setup and dry-run. Most of the time we spent on debugging, finding compatible libraries versions.

The result came back great as we were able to crack a sample 100 chars length RSA.

![](/images/6.jpg)  
Setting up EC2 instances

### 2. Cracking the real key

Jumping back to the application, hard-coded public keys have 155 chars in length (RSA 512-bits). This means, cracking them would need more than 1 cloud instance and super time consuming.

We used a total of 16 EC2 instances x 36 CPUs x 60 GiB Memory for each key. Once the script is run, the only thing we would do is waiting and hoping it will not return any FATAL errors.

Surprisingly, roughly 9 hours later, we were able to get the result

![](/images/7.jpg)

### 3. Cost

We spent ~$250 USD to crack 2 RSA 512-bits keys in 9 hours (+ sample key - 100 chars)

![](/images/8-scaled.jpg)We then tried to optimize the entire process by re-using generated sieves for other keys but unsuccessful. I also reached out to one of the authors and was told to store these sieves in a database. However, due to several reasons, we did not try further.

![](/images/9.jpg)

### 4. Generating QR code using found Private Key

Once we got the key factors, we were able to calculate the original Private Key and generate several valid COVID passes.

## Demo

![](/images/10.png)    
Generating QR Code
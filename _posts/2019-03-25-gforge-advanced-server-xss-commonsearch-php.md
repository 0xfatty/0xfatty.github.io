---
title: "CVE-2019-10016: GForge Advanced Server Input validation error in 'commonsearch.php'"
date: "2019-03-25"
categories: 
  - "security-research"
---

### _**I. OVERVIEW**_

**Author**: **Chi Tran of Southern Methodist University**

**Vendor**: GForge Group

**Product**: GForge Advanced Server

**CVE Reference**: **[CVE-2019-10016](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-10016)**

**Original Entry Date**: March 20, 2019

**Affected Version(s): 6.4.4**

 

### _**II. VULNERABILITY DETAILS**_

- GForge Advanced Server 6.4.4 allows XSS via the **commonsearch.php** words parameter, as demonstrated by a **snippet/search/?words= substring**
- **Cause:** The **'commonsearch.php'** script does not properly filter HTML code from user-supplied input in the **'words'** parameter before displaying the input. A remote user can create a specially crafted URL that, when loaded by a target user, will cause arbitrary scripting code to be executed by the target user's browser. The code will originate from the site running the GForge Advanced Server software and will run in the security context of that site. As a result, the code will be able to access the target user's cookies (including authentication cookies), if any, associated with the site, access data recently submitted by the target user via web form to the site, or take actions on the site acting as the target user.

 

- **Proof of Concepts:**

1 - Navigate to http://site.com/gf/snippet/

2 - Input the following payload into "Search for snippets in all categories" search box:

<svg/onload=alert(String.fromCharCode(88,83,83))>

3 - Click GO then XSS Box will pop-up

 

- **NOTE: The payload can also be triggered by clicking the url:**

http://site.com/gf/snippet/search/?search=snippet\_0&type=snippet&words=%3Csvg%2Fonload%3Dalert(String.fromCharCode(88%2C83%2C83))%3E&Search=Submit+Query

 

### _**III. IMPACT**_

- Reflected-XSS attack could be used to perform several attack purposes such as session hijacking, client browser corruption, etc. Victim retrieves the malicious script from the server when it requests the stored information.

 

### _**IV. REMEDIATION**_

- File path: **/opt/gforge/plugins/snippet/wwwlib/search/commonsearch.php**
- Code review:

function searchSnippets(GFSearch $search) {
if (GFConf::get('system.dbtype') == 'postgres') {
$con = Propel::getConnection(UserPeer::DATABASE\_NAME);
$words = $search->getWordsForQuery();

if(empty($words)){
return false;
}
if(!ini\_get('magic\_quotes\_gpc')){
$words = addslashes($words);
}

- The input was not sanitized at this point, which payload will be then triggered. I have added a single line of PHP code to convert any "HTML special characters" into their HTML encodings, meaning they will then not be processed as standard HTML.

function searchSnippets(GFSearch $search) {
if (GFConf::get('system.dbtype') == 'postgres') {
$con = Propel::getConnection(UserPeer::DATABASE\_NAME);
$words = $search->getWordsForQuery();
$words = htmlspecialchars($words, ENT\_QUOTES | ENT\_HTML401, 'UTF-8');
if(empty($words)){
return false;
}
if(!ini\_get('magic\_quotes\_gpc')){
$words = addslashes($words);
}

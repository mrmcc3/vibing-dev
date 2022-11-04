---
layout: "@site/Note.astro"
title: "Early Hints"
description: "Thoughts on early hints"
draft: true
---

## What are early hints? 

Here's one defenition:

> Early Hints is an HTTP status code (103 Early Hints) used to send a preliminary HTTP response ahead of a final response. This allows a server to send hints to the browser about critical sub-resources (for example, stylesheet for the page, critical JavaScript) or origins that will be likely used by the page, while the server is busy generating the main resource. 
>
> The browser can use those hints to warm up connections, and request sub-resources, while waiting for the main resource. In other words, Early Hints helps the browser take advantage of such "server think-time" by doing some work in advance, thereby speeding up page loads.
>
> **from the [chrome developer blog][1]**


### Cached sub-resources

We're talking about speeding up page loads by kicking-off requests to critical sub-resources sooner.
This has no effect if the resources are already cached client side. So in the case of
site-wide, immutable resources only the cache misses benefit from early hints. This occurs

   - on initial visit
   - after deploys

On the other hand, dynamic sub-resources are good EH candidates on every request.

### Server think time
   
The hint mechanism is a preliminary response that is sent before the main response. 
If the main response can be sent immediately then there's no need for early hints.
On the other hand if the main response can't be sent 
(in whole or initiated via streaming) without a delay then early hints
can be effective. In practice when does this happen?

  - The server has to wait for data fetching and html rendering to complete before
    initiaing the response (not the case for streaming).
  - In particular this isn't the case for static, public pages which are often 
    cached on a CDN

### Automatic Early Hints with Cloudflare
   
Cloudflare implements EH using a cache/invalidate mechanism on the
response `Link` headers of the main responses.

This means it will only send 103 on the second request to a resource
the first time it hasn't yet seen the Link headers.

### Previous Notes


Also due to the caching nature of the CF EH implementation if the 
EH response is always invalidated by the real response then it's not much 
use. 

This implies the number of requests where the resource is constant should
be large. 

Also if the resource is immutable then EH for subsequent requests by the same
client are also irrelevant.

It's about providing a faster load experience of relatively static resources 
to new clients.

For example if the CSS changes on every deploy, the first request will have an
EH mismatch but subsequent requests by new clients will benefit.

Resources to consider.
- font resources (will def be required) same both app and site. doesn't change.
- tailwind css (will def be required). split app and site?. often changes on build.
- static js lib (htmx fits the bill, although do you need it with defer?)

- what about per page? hero images, a video above the fold? how to indicate.
  - makes sense why CFP transforms `<link rel="">` into link headers automatically.

- EH doesn't make sense for things that might not be required (islands)

idea: could we look at the build manifest from astro (astro integration)
and generate link headers for `_headers`.

THIS NEEDS MORE THOUGHT

[1]: https://developer.chrome.com/blog/early-hints/
[2]: https://developers.cloudflare.com/cache/about/early-hints/
[3]: https://blog.cloudflare.com/early-hints/

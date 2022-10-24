---
layout: "@site/Note.astro"
title: "Early Hints"
description: "Thoughts on early hints"
draft: true
---

Chrome info

https://developer.chrome.com/blog/early-hints/

Cloudflare info

https://developers.cloudflare.com/cache/about/early-hints/
https://blog.cloudflare.com/early-hints/

Cloudflare implements EH using a cache/invalidate mechanism on the
response `Link` headers of normal responses.

This means it will only send 103 on the second request to a resource
the first time it hasn't yet seen the Link headers.

Note that if the response is at hand (no async loading) or streamed
such that the document head is returned immediately then EHs provide 
next to no benefit (over `<link rel="preload">` in the document head)

Why pre-emptively send resources to load in an early response when you 
can just send them right away in the normal response.
  - (EH for tailwind css doesn't really matter for SSG)
  - (it does matter for font resource embeded in the CSS, secondary res)

DA: If you use a SWR strategy for public content, so that responses are always
at hand then what benefit does EH give you at all vs `<link rel="preload">` in the
html? Probably best answered by an experiment.

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


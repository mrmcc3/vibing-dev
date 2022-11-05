---
layout: "@site/Note.astro"
title: "Early Hints"
description: "Thoughts on early hints"
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
Some typical sub-resources are:

  - stylesheets
  - fonts
  - above the fold images

It's often the case that these are static build assets that are served with immutable cache headers.
Preemptively fetching these resources when they are already cached by the client has virtually no
effect on page loads. In this case it's the **cache misses** that benefit from early hints which occurs:

  - on initial visit
  - after deploys (new assets)

On the other hand, dynamic sub-resources are good EH candidates on every request.

### Server think time
   
The hint mechanism is a preliminary response that is sent before the main response. 
If the main response can be sent immediately then there's **no need for early hints**.
On the other hand if the main response can't be sent 
(in whole or initiated via streaming) without a delay then early hints
can be effective. In practice when does this happen?

  - The server has to wait for data fetching and html rendering to complete before
    initiaing the response (not the case for streaming).
  - In particular this isn't the case for static, public pages which are often 
    cached on a CDN

### Implementation

Ideally critical sub-resources are known at build time for each route and a early
hint can be sent as soon as a request arives. If that's not possible a more generic approach
is to

  1. generate a normal response and cache the `Link` headers which indicate the 
     resources to preload.
  2. on subsequent requests assume the `Link` headers will be the same and send them
     as an early hint. If they aren't, update the cache for future requests.

> The generic approach is used by cloudflare and does have some downsides. If the sub-resources
are different on every request then the early hints will always be a mismatch. The benefit as 
a developer is that you can just add `Link` headers to normal responses and the platform will
handle the rest (actually sending the preliminary responses).
>
> See [Early Hints: How Cloudflare Can Improve Website Load Times by 30%][3]

Of course you need to actually check that your server is capable of sending early hints. I'm unsure
if platforms like Cloudflare Workers have this capability.

#### Early hints on cloudflare pages

How do you specify `Link` preload headers for all the routes? Developers typically use
`<link rel="preload" ...>` in the document head for preloading. When early hints are enabled
Cloudflare will attempt to strip out (rewrite) the `<link>` tags in the html
and instead send `Link` headers to support early hints. 
However I've observed cases where it won't do this (fonts with crossorigin for example).

> **Idea:** a better aproach might be to have the build tool spit out a _headers file that sets the
Link headers directly or alternatively handle it using a worker

### Where do early hints make sense

- Public, static website?
  - Responses are sent right away from a CDN so benefits of EH are very small
- Public, dynamic websites? (ecommerce comes to mind)
  - Pages loads for new customers is objectively important
  - Dynamic banners
  - In these cases I wonder if [SWR][5] is an alternate to EHs
- Private, dynamic apps?
  - Small improvements to initial page load performance for new users isn't big enough of a concern
    to justify EHs IMO

For more information Cloudflare has an [article][4] with measurments on real sites.

[1]: https://developer.chrome.com/blog/early-hints/
[2]: https://developers.cloudflare.com/cache/about/early-hints/
[3]: https://blog.cloudflare.com/early-hints/
[4]: https://blog.cloudflare.com/early-hints-performance/
[5]: https://web.dev/stale-while-revalidate/

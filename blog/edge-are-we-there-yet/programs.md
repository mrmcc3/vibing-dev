---
{
  title: "Programs on the edge... Are we there yet?",
  description: "What kinds of programs can we build on the edge? Should we just move everything there?",
  pub_date: "2023-02-11T20:56:08.945Z"
}
---

> This is the first of two articles about software on the edge. It looks at the
> kind of programs that you might run on edge networks. The
> [second article](/edge-are-we-there-yet/information) is all about information
> on the edge.

So if you've been building for the web lately no doubt you've heard about edge
platforms. Two popular offerings are [Cloudflare Workers][workers] and
[Deno Deploy][deno-deploy] which are also used to power other edge products from
companies like [Vercel][vercel-edge] and [Netlify][netlify-edge].

These platforms will make copies of your code (javascript/webassembly) and
distribute it all over their global network. When a request is made they'll
execute it at the data center closest to the user. Cloudflare and Deno are
clearly betting on this model

- [The Future of the Web is on the Edge][fotw-edge] (Deno Deploy)
- [The Edge Computing Opportunity][edge-opp] (Cloudflare Workers)

But what does it mean for us developers when our code is running everywhere.

[deno-deploy]: https://deno.com/deploy
[workers]: https://workers.cloudflare.com/
[vercel-edge]: https://vercel.com/features/edge-functions
[netlify-edge]: https://www.netlify.com/products/edge/
[fotw-edge]: https://deno.com/blog/the-future-of-web-is-on-the-edge
[edge-opp]: https://blog.cloudflare.com/cloudflare-workers-serverless-week/

> The edge really is just the same code running on a large network. Content
> delivery networks (CDNs) have been doing this for a while now with **their own
> code** that serves customer content. The novel shift has been new runtimes
> that allow customers (us developers) to run code in the same manner.

## Content sites don't apply

Consider static, content focused websites. You can build all the HTML and
associated assets ahead of time and publish it to a CDN. Done! Your code runs at
build time (locally or on a build server).

Alternatively if you're building sites with public, dynamic content (perhaps a
news site) then it's often acceptable to serve stale content for a small window
of time. In this case you could use a caching strategy (stale-while-revalidate)
or something like incremental static regeneration (ISR) to get the performance
of edge, while still generating HTML on an origin server.

In these scenarios there really is no need to run your own code on the edge.
Just let the CDNs handle it.

## Global middleware

So when does it make sense to use the edge? Here are a few examples I found from
the Cloudflare & Vercel docs.

- A/B testing
- Feature Flags
- Modify incoming requests
- Set security headers
- Hot-link protection
- CORS header proxy
- Rewrite links
- Bulk/dynamic redirects
- Perform bot protection
- Validation
- Rate Limiting
- Authentication & cookie parsing
- Collect logging, metrics, analytics
- Initiate and handle scheduled tasks (cron jobs)
- Localization
  - i18n
  - Country Code redirects
  - Make requests to local apis
  - Rewrite content based on location.

In all these examples you can think about your code on the edge as server
middleware that happens to run close to your users. It often makes sense to
offload a whole range of tasks to the edge (which is scalable and inexpensive).

While edge runtimes certainly have limitations (code size, cpu, memory, request
lifecycle) they're more than capable for most tasks. It begs the question, why
stop at offloading only a subset of functionality from origin servers to the
edge? Why not offload it all? Remove the origin entirely!

## Move it all to the edge?

The ecosystem around Javascript web frameworks definitely isn't standing still.
Next.js, Remix, SvelteKit, Solid, Qwik, Vue/Nuxt, Marko even HTMX & Astro
they're all pushing their own takes on what it means to build for the web. The
new breeds of meta-frameworks take care of an incredible amount of stuff...
Routing, bundling, rendering and much, much more.

Interestingly a lot of these projects are advertising first class support for
edge runtimes. My personal experience is they're often "first class" in theory,
but they're definitely getting better.

So, Programs on the edge... Are we there yet? I think so! Edge runtimes are
already good enough and frameworks are catching up quickly and won't be slowing
down anytime soon.
[Examples](https://blog.cloudflare.com/welcome-to-wildebeest-the-fediverse-on-cloudflare/)
are starting to pop up to support this.

## The information elephant

However, there's an elephant in the room. The elephant is always there for any
non-trivial software project... The **database**. The system of record that
manages all the information that you and your users derive value from when they
use your software.

You may have noticed the emphasis of **programs** on the edge. That's
intentional because it's only half the story. Programs are just the machinery
around the **information** our systems manage. If we really want to build good
software entirely on the edge we better have a good way of dealing with
information. The [second article](/edge-are-we-there-yet/information) in this
series explores information on the edge.

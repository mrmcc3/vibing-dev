---
{
  title: "Deno's Decline (a response)",
  description: "Why all the negativity? It's a good thing we have choices and new ideas.",
  pub_date: "2025-05-04T02:00:15.027Z"
}
---

I recently read an article titled
[Deno's Decline](https://dbushell.com/2025/04/28/denos-decline/). I shouldn't
have. I've never really understood the negative atmosphere around the Deno
project.

In my opinion the only claim in the article that holds any weight is that their
marketing on "edge" doesn't match their current region offering. The article
spends 10 paragraphs on this trivial concept, concluding with:

> This downward trajectory is obviously not a good look

I can't wait for a matching article on Vercel's inevitable doom for
[Fluid Compute](https://vercel.com/blog/introducing-fluid-compute#dense-global-compute-and-multi-region-failover)
where they move from "Edge" to "Regional". Look, Deno Deploy may be struggling,
it might not? But come on, do we really need to pile on? How is this productive
in any way?

It's comical the author mentions alternatives. Viral articles like this run
completely counter to alternatives existing. Seriously, if you don't like their
product, just use something else. It's a **good** thing that we have choices and
new ideas.

> Deno KV looks like nothing short of abandonware.

It's a minimal data API. Does it work or not? How does it perform in production?
No, none of that. Instead, let's talk about the most important thing in
software - is there a recently tagged version number?

Maybe instead we could talk about how they're offering a unique API to
FoundationDB with at-least-once semantic queues where message handlers
automatically scale using v8 isolates. Or how you can atomically enqueue
messages and interact with KV state in the same transaction.

The article then goes on a tirade against [JSR](https://jsr.io). Let's have a
look:

- Is JSR open source? YES
- JSR is designed to be a public good for the JavaScript community, and will
  thus always be free to use.

🤦‍♂️ It's time for the
[OSINAY](https://gist.github.com/richhickey/1563cddea1002958f96e7ba9519972d9)
link.

---
{
  title: "Information on the edge... Are we there yet?",
  description: "Why not databases on the edge? Information itself isn't holding us back from running serious applications on the edge.",
  pub_date: "2023-02-23T07:31:36.689Z"
}
---

> This is the second of two articles about software on the edge. The
> [first article](/edge-are-we-there-yet/programs) looks at running **programs**
> on the edge. This article argues that information itself isn't holding us back
> from running serious applications on the edge because it's fundamentally
> location independent.

An often heard criticism of deploying programs to the edge goes something like
this:

> Yeah but you have to go to the database anyway so any benefit of running at
> the edge disappears

The argument is presented well in this video
[Is _edge_ computing really faster](https://youtu.be/yOP5-3_WFus). As an example
say you're building a web app and decide to deploy to the edge. Perhaps with
SvelteKit, maybe it's Remix.

- A request comes in & you look up a user session to validate it. That's one
  trip to the DB
- Now for a specific route you have to load some data or handle an action.
  That's another trip

Yes there are other approaches to sessions, and maybe you could find a way to
jam all your data requirements into a single request, but that's beside the
point. If you have to make a request to the other side of the world then there's
essentially no benefit to constructing the user response at the edge compared to
an origin server near the data. The more requests to the database, the slower
the edge application is.

I guess that leads to recommendations like this
[tweet](https://twitter.com/leeerob/status/1618005723421769735)

> You (probably) don't want global data.

> Edge came off as replicating data to every region. Most of the time, that's
> probably not what you want for general transactional data.

> You want regional compute, close to your data, with _specialized data APIs_
> for truly global data.

On one hand it's practical advice given the current tech landscape, on the other
I think it's a step in the entirely wrong direction. If you think about it that
argument is essentially saying: deploying applications to the edge is slow
because of the non-edge stuff.

> You (probably) don't want global data.

That seems a bit presumptuous. Sure many systems exhibit, or require a large
degree of locality. The edge by definition seems like a bad fit here. Yet plenty
of applications serve users all over the globe. Besides, it's not about what I
want, it's what my users want. To quote
[Cloudflare](https://blog.cloudflare.com/early-hints-performance/)

> Cloudflare sits within 50 milliseconds of 95% of the Internet-connected
> population globally.

Maybe I'm too optimistic, but that seems like a big opportunity to give the
users fast leverage over information wherever they may be.

> Edge came off as replicating data to every region. Most of the time, that's
> probably not what you want for general transactional data.

So because information enters in a transaction we're not allowed to move it
close to users? 🤔 why is that?

> You want regional compute, close to your data, with specialized data APIs for
> truly global data.

What makes data truly global?
[config data?](https://vercel.com/blog/edge-config-public-beta) why does config
data get a ticket to the edge but nothing else? It's unfortunate that we're
forced into this tradeoff. Some data lives here because of... well, that's just
how it's done. But this other data it's the "global" stuff, it goes into
_specialized data APIs_.

## We're all information merchants.

Let's face it the overwhelming majority of software we build exists primarily to
give users leverage over information. Think about pretty much any bit of
software you've worked on or an online service you use and ask yourself, at a
high level, what does it do? Why am I using it? Or why do people use it? Do your
answers include any of the following? People find the software/service useful
because...

- it presents information
- it provides leverage over information
- it allows searching/locating/finding bits of information
- it can run calculations on information
- it can record and manage new information
- it can enforce constraints and guarantees on new information

Google, Twitter, News Sites, Excel Spreadsheets, Text Editors, Gmail, Facebook,
Netflix, Git and Github they're all information merchants! Even e-commerce
companies like Amazon or services like Uber/AirBnB have significant information
components. Would any of these applications work at all if you took away the
parts that deal with information?

You might not be building the next Twitter but information handling is just as
vital in internal business apps and enterprise software. It might seem obvious,
we work in "information technology" after all, but It's funny we seem to spend
very little time talking about information compared to everything else involved
in making software.

## So information... What is it?

What is this stuff? Let's start with **data**. We've all got some understanding
of what data is. I like to think of it as any old collection of values.

- including but not limited to any combination of strings, numbers, booleans,
  raw bytes, dates, arrays, maps, sets.
- you could think of data in it's encoded format like JSON or CSV.
- there's no required structure or shape to data.

As an example here's some data: `["michael", 21]` a string and a number. Does
that data convey any information? I'd argue no, not anything useful. It could
mean anything? At best, you could say it's partial or incomplete information.

What about `["michael", 21, "years_old"]`? Michael is 21 years old. Is that a
complete piece of information? Is it useful? If I gave it to someone else could
they use it? Not really, because we don't know **when** Michael was 21 years
old.

`["michael", 21, "years_old", "2012-01-01"]`. Okay now we've got a concrete
piece of information. Turns out adding that extra timestamp to the data is a big
deal. There's a lot to say about this example compared to the first two
examples.

- It's **useful**. It conveys some meaning
  - I can figure out a time frame when michael was born!
  - Or roughly how many years old michael is at any other time.
  - I can compare it to other information. Is michael older than me?
- It's **complete**. I don't need something else to use it.
  - Sure I might need other information to understand more but this piece of
    information by itself is enough to be useful.
- I can remember it.
- I can simply share it to convey the information.
- Others can remember it and see the same thing. It's the same information.
  - Information is **location independent**
- Others could reproduce the same results from it that I can.
- Sharing does not involve coordination or locking, just send it.
- It **can not change**. If it could change, what exactly are you conveying?
  - In other words information is timeless. It's immutable.
- But what if it's wrong? Information has nothing to do with truth or veracity,
  that's a higher level concept.
  - Was michael actually 21 years old in 2012? That's a judgement you can make
    using information, not a property of the information itself.
  - It's okay to decide information is wrong or bad at a later time or to add
    better information.
- A piece of information can be about the future (a prediction).
  - Whether it turns out to be true isn't a property of the information.
- Not all data is information (like the first two examples above).
- If you can craft data that meets the above characteristics then it's
  information!
  - Irrespective of its use case, topic, or how it was collected.
  - The information that results from a transaction isn't _special_ it has the
    same properties as any other information.
- When collecting pieces of information the aggregate information exhibits all
  the same properties as the individual pieces.

## Is information on the edge a good fit?

When you deploy programs to the edge you distribute and run them all over the
globe. Can we also distribute information? Absolutely... It's location
independent. It's the same everywhere.

Edge runtimes provide [access][cache-api] to local [caches][cf-cache]. Are there
any concerns with putting information in caches? Information doesn't change...
Go nuts. Same story for durable storage like [Cloudflare KV][cf-kv].

It's not the information itself holding us back from having applications run
entirely on the edge. In fact, I'd argue the opposite. Information as defined
here is a great fit for edge computing.

## Databases on the edge... Are we there yet?

I'd say no, not really. There's a lot of innovation and marketing going on in
the database space, However when evaluating backend solutions for the edge we
should be asking the very specific questions. Does solution `X` give my program
running on the edge direct (data-center local) access to information? Is the
stuff going in and out of the backend actually information? Or is it just data.

There's a lot more to databases than just information. Transaction processing,
indexing and query engines come to mind. Perhaps not all of these are a fit for
edge computing, but given how crucial information is to our systems and the
novel capabilities of the edge, it's definitely worth exploring.

[d1]: https://blog.cloudflare.com/introducing-d1/
[lite-fs]: https://fly.io/blog/introducing-litefs/
[cf-cache]: https://developers.cloudflare.com/workers/learning/how-the-cache-works/
[cache-api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[cf-kv]: https://developers.cloudflare.com/workers/learning/how-kv-works/

---
{
  title: "Chronicle",
  description: "A global information archive",
}
---

Chronicle is a global information archive. It models information as a set of
immutable records where every record has the same five-part structure. As
information accumulates, Chronicle organizes it into globally replicated
indexes, enabling low-latency queries from any location.

> Chronicle is **not** a transaction processing system, a key part of many
> applications. Databases serve this need and isolate the state of system
> entities. However, the reality is these systems routinely discard information
> or relegate it to logs.
>
> There's no reason this valuable information can't be globally replicated like
> website assets on a CDN and become a first-class primitive for application
> developers.

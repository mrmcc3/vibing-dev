---
{
  title: "We should celebrate compatibility",
  description: "Thoughts on the Go blog post about compatibility and revisiting Rich Hickeys talk on the topic",
  pub_date: "2023-08-15T04:11:22.837Z"
}
---

This is from [Backward Compatibility, Go 1.21, and Go 2][go-compat]

> when should we expect the Go 2 specification that breaks old Go 1 programs?
>
> The answer is never. Go 2, in the sense of breaking with the past and no
> longer compiling old programs, is never going to happen. Go 2 in the sense of
> being the major revision of Go 1 we started toward in 2017 has already
> happened.
>
> There will not be a Go 2 that breaks Go 1 programs. Instead, we are going to
> double down on compatibility, which is far more valuable than any possible
> break with the past.

This is wonderful and something we should all aspire to when we write software
that others rely on. Here are some quotes from Rich Hickeys talk on this topic
[Spec-ulation][spec-ulation].

> - Breaking changes are broken. Full Stop. Don't Do it.
> - Semver is broken. We should abandon it. It is fundamentally, in the biggest
>   semantic it has (the major version), a recipe for how to break software.
> - Don't try and figure out the best way to do it.
> - Alphas are OK.
> - Whatever makes things successful is somewhat unknown, but I really believe
>   compatibility is a prerequisite for success. You cannot ignore this.

If you must use something that resembles semver

1. iterate in alpha as `0.x`
2. make a commitment to users and improve on it as `1.x`
3. there is no step 3

[go-compat]: https://go.dev/blog/compat#go2
[spec-ulation]: https://www.youtube.com/watch?v=oyLBGkS5ICk&t=2839s

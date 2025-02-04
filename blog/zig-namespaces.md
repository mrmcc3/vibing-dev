---
{
  title: "How Zig does namespaces",
  description: "One part of the Zig programming language that I like is its approach to namespaces. It's just a big tree of structs!",
  pub_date: "2024-07-06T06:50:37.155Z"
}
---

I've been writing some [Zig](https://ziglang.org/) lately and one part of the
language that I like is the namespace approach. It's just a big tree of structs.

What is a struct? The internet tells me it's a composite data type. The type
definition declares the component fields (names + types). At runtime a struct is
the aggregate memory of its fields.

Structs in Zig do this but they also provide a space to put non-field
declarations. This means within a zig struct you can provide names for
constants, functions and other language constructs. In particular, within a
struct, you can provide names for other structs!

To focus on namespacing lets declare some structs with **zero** fields.

```zig
// structs.zig

pub const A = struct {
  pub const B = struct {
    pub fn run() void {}
  };
  pub fn run() void {
    B.run();
  }
};

pub fn run() void {
  A.run();
  A.B.run();
}
```

Notice that the 3 functions have the same name but in practice there's no
conflict... That's namespaces in action! If we dig deeper there's some
mechanisms at play

1. The definition of the (anonymous) structs themselves `struct{}`
2. Assigning each struct a name `const A = struct{}`
3. Allow access from another struct `pub fn run()`
4. An access mechanism (dot operator) `A.run()`

Another observation is that there are 3 `run` functions but only 2 explicit
struct definitions! What namespace does the top level `run` function belong to?
🤔

The answer is that each zig source file is secretly a struct! In fancy words
every zig source file is an implicit, anonymous struct.

We know that within structs you can give a name to other structs and that zig
source files are also structs... The logical next step is to allow declaring
structs where the definition _is_ another zig file and this is exactly what
`@import` does.

```zig
// main.zig

const C = @import("structs.zig");

pub fn main() !void {
  C.run();
}
```

To recap:

- Source files are implicit namespaces
- There's a mechanism to refer to the namespace of another source file `@import`
- There's explicit syntax for defining namespaces _within_ in a source file
  `struct{}`
- Namespaces in isolation are anonymous (nameless)
- A nested namespace declaration is realized by assigning a name to an anonymous
  namespace (using `=`)
- If you have a name for a nested namespace (`A`) and the name of something in
  that namespace (`B`) then you can _refer_ to it (using `A.B`)
  - It only works if (`B`) is marked with `pub`

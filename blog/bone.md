---
{
  title: "BONE",
  description: "(B)inary, (O)rdered, (N)otation with (E)xtension",
}
---

I don't know why, but I really enjoy creating data formats. This time I wanted

1. Total lexicographic ordering
2. A binary encoding scheme
3. Extensibility
4. Space efficient
5. Schemaless

Resulting in (B)inary, (O)rdered, (N)otation with (E)xtension. These kind of
encoding schemes are useful in index/databases where ordering is the goal.
[FoundationDB Tuples](https://github.com/apple/foundationdb/blob/main/design/tuple.md)
are a good example.

### Interpretation

- The binary payload is a sequence of complete values.
- Value processing is initiated with a typecode (first byte of the value)
- Each typecode (0-255) defines the type of value being read and the **method**
  used to read the value to completion.
- There are 4 value processing methods
  - **Fixed** number of bytes. For example
    - `F0` no extra bytes. The value is the typecode.
    - `F2` read two more bytes.
  - **String** of bytes. `S`
    - a single low sentinel `0x00` terminates the byte string.
    - consecutive low sentinels `0x0000` escapes the null byte.
  - **List** of nested values. `L`
    - the typecode initiates the nested interpretation of values.
    - a high sentinal `0x1F` terminates the list.
  - **Invalid** value. `I`
    - Processing should stop with an error.

### Typecodes

```
CORE PRIMITIVES
  0x00    | I      | low sentinel
  0x01    | F0     | false
  0x02    | F0     | true
  0x03... | F0-F8  | packed 64bit signed integers
  0x14    | F8     | 64bit floating point numbers
  0x15    | S      | arbitrary bytes
  0x16... | I      | unused
  0x1F    | I      | high sentinel
BUILTIN EXTENSIONS
  0x20... | F0     |
  0x30... | F1     |
  0x40... | F2     |
  0x50... | F4     |
  0x60... | F8     |
  0x70... | S      |
    0x71  | S      | UTF-8 unicode string
  0x80... | L      |
USER EXTENSIONS
  0x90... | F0     |
  0xA0... | F1     |
  0xB0... | F2     |
  0xC0... | F4     |
  0xD0... | F8     |
  0xE0... | S      |
  0xF0... | L      |
```

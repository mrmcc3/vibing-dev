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
  - **(F)ixed** number of bytes. For example
    - `F0` no extra bytes. The value is the typecode.
    - `F2` read two more bytes.
  - **(S)tring** of bytes.
    - non-terminal null bytes (those within the byte string) are replaced with
      the escape pattern `0x0001`
    - `0x00` followed by any other byte terminates the string.
    - this works well for natural text encodings.
    - the size increase for escaping should be taken into consideration when
      using this method for extension
  - **(L)ist** of nested values.
    - the typecode initiates the nested interpretation of values.
    - a null sentinel `0x00` terminates the list.
  - **(I)nvalid** value.
    - Processing should stop with an error.

### Typecodes

```
CORE PRIMITIVES
  0x00    | I      | null sentinal
  0x01    | I      | null escape
  0x02    | F0     | false
  0x03    | F0     | true
  0x04... | F0-F8  | packed 64bit signed integers
  0x15    | F8     | 64bit floating point numbers
  0x16... | I      | unused
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

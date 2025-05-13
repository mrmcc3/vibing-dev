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
- There are 6 value processing methods
  - **(B)lock** a fixed number of bytes. for example
    - `B0` no extra bytes. The value is the typecode.
    - `B2` read two more bytes.
  - **(S)tring** a variable number of bytes.
    - non-terminal null bytes (those within the byte string) are replaced with
      the escape pattern `0x0001`
    - `0x00` followed by any other byte terminates the string.
    - this works well for natural text encodings.
    - the size increase for escaping should be taken into consideration when
      using this method for extension
  - **(T)uple** a fixed number of nested values.
  - **(L)ist** a variable number of nested values.
    - a null sentinel `0x00` terminates the list.
  - **(I)nvalid** value.
    - Processing should stop with an error.
  - **(E)xtend**. The next byte must be another extension typecode.
    - creates another level/page/space of extensions

### Typecodes

```
CORE PRIMITIVES
  0x00    | I      | null sentinal
  0x01    | I      | null escape
  0x02    | B0     | false
  0x03    | B0     | true
  0x04... | B0-B8  | packed 64bit signed integers
  0x15    | B8     | 64bit floating point numbers
  0x16... | I      | unused
BYTE EXTENSIONS (0-9 are builtin, A-F are avail. to user)
  0x30... | B0     |
  0x40... | B1     |
  0x50... | B2     |
  0x60... | B3     |
  0x70... | B4     |
  0x80... | B8     |
  0x90... | S      |
    0x90  | S      | UTF-8 unicode string
VALUE EXTENSIONS (0-9 are builtin, A-F are avail. to user)
  0xA0... | T1     |
  0xB0... | T2     |
  0xC0... | T3     |
  0xD0... | T4     |
  0xE0... | T8     |
    0xEE  | E      | new page of extensions
  0xF0... | L      |
```

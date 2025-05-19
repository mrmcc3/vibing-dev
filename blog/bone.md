---
{
  title: "BONE",
  description: "(B)inary, (O)rdered, (N)otation with (E)xtension",
}
---

I don't know why, but I really enjoy creating data formats. This time I wanted
to create a format with:

1. Total lexicographic ordering.
2. A binary encoding scheme.
3. Forward-compatible extensibility.
4. Self-describing notation.
5. Hierarchical support for nested structures.
6. Space efficient encodings.

Resulting in (B)inary, (O)rdered, (N)otation with (E)xtension. These kind of
encoding schemes are useful in indexing/databases where ordering is the goal.
[FoundationDB tuple encoding](https://github.com/apple/foundationdb/blob/main/design/tuple.md)
is a production-grade example.

### Interpretation

- The binary payload is a sequence of complete encoded values.
- Value processing is initiated with a typecode (first byte of the value).
- Each typecode defines both the **type** of value being read and the **method**
  used to read the value to completion.
- There are 6 value processing methods:
  - **(B)lock**: Read a **fixed** number of **bytes**. For example:
    - `B0`: No extra bytes. The value is the typecode itself.
    - `B2`: Read two more bytes after the typecode.
  - **(S)tring**: Read a **variable** number of **bytes**.
    - `0x00` followed by any byte other than `0x01` terminates the string.
    - `0x0001` is interpretted as the null byte within the string.
  - **(T)uple**: Read a **fixed** number of nested **values**. For Example:
    - `T2`: A pair of values follow this typecode.
  - **(L)ist**: Read a **variable** number of nested **values**.
    - `0x00` terminates the list.
  - **(E)xtend**: Read another byte to form an extended typecode.
    - Creates another level of typecodes available for extension.
  - **(I)nvalid**: An invalid typecode. Stop with an error.

### Typecodes

```
CODE      METHOD   INTERPRETATION
0x00    | I      | null
0x01    | I      | escape
0x02... | I      | unused
0x08    | B8     | - 8 byte ints
0x09    | B7     | - 7 byte ints
0x0A    | B6     | - 6 byte ints
0x0B    | B5     | - 5 byte ints
0x0C    | B4     | - 4 byte ints
0x0D    | B3     | - 3 byte ints
0x0E    | B2     | - 2 byte ints
0x0F    | B1     | - 1 byte ints
0x10... | B0     | 0-7
0x18    | B1     | + 1 byte ints
0x19    | B2     | + 2 byte ints
0x1A    | B3     | + 3 byte ints
0x1B    | B4     | + 4 byte ints
0x1C    | B5     | + 5 byte ints
0x1D    | B6     | + 6 byte ints
0x1E    | B7     | + 7 byte ints
0x1F    | B8     | + 8 byte ints
0x20... | B0     |
  0x20  | B0     | boolean false
  0x21  | B0     | boolean true
0x30... | B1     |
0x40... | B2     |
0x50... | B3     |
0x60... | B4     |
0x70... | B8     |
  0x70  | B8     | float64 - IEEE 754 double
0x80... | B16    |
0x90... | S      |
  0x90  | S      | UTF-8 encoded unicode text
0xA0... | T1     |
0xB0... | T2     |
0xC0... | T3     |
0xD0... | T4     |
0xE0... | T5     |
0xF0... | L      |
0xFF    | E      | level
```

### Extension Groups

- The majority of the typecode space is dedicated to extensions `0x20...0xFF`.
- Each group of 16 extension codes defines a processing method.
  - The first 8 groups `0x20...0x9F` are **byte** extensions (scalars).
    - The first 7 are fixed-length **blocks**.
    - The last is for variable-length **strings**.
  - The remaining 6 groups `0xA0...0xFF` are **value** extensions (containers).
    - The first 5 are fixed-length **tuples**.
    - The last is for variable-length **lists**.
  - The first 10 codes of each group `0-9` are builtin (reserved for BONE).
  - The remaining 6 codes of each group `A-F` are available for user extension.
- The level typecode `0xFF` creates an new level of the extension space. For
  example `0xFFFFDB` can be interpreted as a typecode:
  - `FFFF` - level 2 extension.
  - `D` - length 4 tuple.
  - `B` - A user extension.

### Non Values

BONE is designed to encode **values** with well-defined ordering. `null`,
`undefined`, and `NaN` are deliberately omitted. If you must, BONE is
extensible.

### Implementations

- https://github.com/mrmcc3/bone-js
- https://github.com/mrmcc3/bone-go

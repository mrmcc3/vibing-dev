---
{
  title: "Merkle Search Trees",
  description: "What are they? Why use them?",
  pub_date: "2025-12-11T00:21:48.196Z",
}
---

## Merkle Trees

Every node in a Merkle tree is labelled by the hash of its content.

1. Hash the leaf nodes.
2. Hash the parent nodes by computing a hash of the child hashes.
3. Repeat until you have a single root hash.

It's hashes all the way down! Even hash functions themselves can be
[Merkle trees on the inside](https://github.com/BLAKE3-team/BLAKE3?tab=readme-ov-file#blake3).
If the hash function is cryptographic (e.g. `SHA-256`) you get a unique root
hash for **every** tree. Alter the structure in any way and it's a different
tree, a different hash.

Merkle trees can be constructed and verified independently without any
coordination or central authority. In this sense they're true immutable values
like strings or numbers.

They also support efficient diffing algorithms where the complexity depends on
the differences not the size of the inputs. Whenever hashes are the same the
subtrees must be identical. Structural sharing is trivial.

## B Trees

Most of us have heard of B-trees (or B+trees), the venerable datastructure used
by databases to index keys! They provide efficient lookup and scan operations
(point & range queries) for large amounts of data.

Right, let's just make Merkle B-trees and see what happens! Unfortunately
there's an issue -- the structure of a B-tree depends on the order keys were
inserted. B-trees are history dependent. You can have different B-tree
structures (different merkle hashes) that represent the same logical value
(ordered set of keys)!

## Merkle Search Trees

When values are inserted into a B-tree, nodes split when they're too big. That
operation depends on the state of the tree, it's history-dependent. It also
creates the structure by selecting a key to go up a level. So what if we just
set the level of every key instead? For example let's take the keys 1-9 and
allocate levels.

```
level 2: 5
level 1: 3, 7
level 0: 1, 2, 4, 6, 8, 9

           [5------+]
            |      |
    [3------5]    [7------+]
     |      |      |      |
[1-2-3]  [4-5]  [6-7]  [8-9]
```

There's only one possible structure[^variant], completely defined by the levels
of the keys.

The key insight (presented in the
[Merkle Search Trees](https://inria.hal.science/hal-02303490/document) paper) is
to compute the level of a key using only the key itself! Hash the key, the
number of leading zeros[^base] is its level.

## What are they good for?

B-trees are well known for their indexing power. Merkle trees are suited to

- content-addressed storage. A merkle hash _is_ a content derived address.
- distribution and caching (immutability).
- sync systems and CRDTs (efficient diffing algorithms).

Putting it all together is an exciting mix. Let's say we store each node by hash
on a global CDN and consider what the root hash represents?

You can load the node, verify it and if you find more hashes repeat until you
have the entire tree. Conveying the root hash conveys the entire tree on the
CDN! That's actually a big deal. A globally accessible, verifiable basis for
reproducible analysis all packaged in a single hash. Here's the value of my
database[^read-only] 🤯

```
222c8dd88498ed934322afece81fa5476299fa7878f0192f0742013fd12dd4d6
```

[^variant]: This is actually a B+tree. The specific variant/construction isn't
    important here.

[^base]: The base of the representation controls the branching factor. Byte
    `B=256`, Hex `B=16`, etc.

[^read-only]: This completely disregards transactions which are arguably the
    defining feature of a database. I'm refering to the query/read aspect here.

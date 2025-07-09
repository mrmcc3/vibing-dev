The software we create manipulates data to solve problems. Yet data is an overly
broad term - an opaque sequence of ones and zeros. Saying our software deals
with data is really saying very little. So what more can we say?

## Entity, State and Transactions

Our problems often demand solutions that manage entities and constrain how their
state evolves given outside input. To achieve this requires varying degrees of
coordination. OLTP databases do exactly that! They provide transactions that
allow us to express "business rules" to atomically transition the state of
entities (state machines).

Transactions are fundamentally about coordination and locality plays a big role.
Having decision makers in the same room (or nearby) is important.

> The degree of coordination is problem dependent. <br> Transactions perform the
> coordination and state evolution. <br> It's better if everything involved is
> in the same place.

## Information is built different

Information is created the moment the state of an entity is observed. It has a
reference to the entity, the state being observed and the time.

It's not an entity with evolving state. It's the same everywhere, to everyone,
whenever they see it. It's an immutable record! Consistent by definition. No
coordination required. Replicate it, distribute it, cache it forever.

It's data yes, but with completely different characteristics to the state
managed by OLTP databases. Just saying "data" conflates entities, state and
information.

## OLTP for everything?

Let's look at some outcomes if we decide to use an OLTP database for all our
"data" requirements.

### Forget by default

A common pitfall is not identifying when the problem has information
requirements in the first place.

You can get the database to correctly model entities and enforce the "business
rules" that govern their state transitions, but it won't automatically record
how it came to be. Oops, what if we have to answer questions about that stuff?
😬

Remembering is on you. Hoping there's backup that can answer your question, or
sifting through logs is all accidental information capture.

> Forgetting isn't really an option for most applications. Whether we realize it
> or not we need records.

### More questions

Okay, I need records, now what?

- Do we store complete state snapshots (row copies) on every change?
- Or maybe just the diff? Event sourcing? Change data capture?
- Is it any state change or do we just add `created_at`, `updated_at` columns
  and call it a day?
- What if we can't anticipate the information requirements of our problem yet?
- What's the schema? Will it evolve with the state?
- How do we index the records?
- Will record queries be harder? (narrator: yes, much harder)
- Will all this extra work affect my read performance? write performance? the
  end user?

> This seems harder than it should be. None of this is about transactions.
> Perhaps it's a clue - wrong tool for the job.

### Leaving value on the table

The OLTP database has ownership of its entities to provide transactions that
change their state. But immutable records can't change! They are not bound to
the databases transaction scope.

Information is the perfect candidate for being close to where it's needed. We
take something that could be everywhere and constrain it to be somewhere.
Creating artificial scarcity in a landscape of abundant global storage and
content delivery networks.

> We're under-utilizing one of the most distribution-friendly types of data.

### Transaction/Query friction

Many problems exhibit natural transaction boundaries - coordination is only
needed within specific groups of entities. Shared-nothing architectures leverage
this well, especially when these groups align with geographic regions. Local
transactions stay local.

But this makes querying the aggregate more complex. You need distributed
queries, data pipelines, or other mechanisms to recreate the whole picture.

## OLAP for everything?

Trying to enforce "business rules" on inconsistent or eventually consistent
state is a recipe for disaster. When you need the guarantees transactions
provides there's no substitute.

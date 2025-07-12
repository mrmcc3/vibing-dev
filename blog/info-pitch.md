The software we create manipulates data to solve problems. Yet data is an overly
broad term - an opaque sequence of ones and zeros. Saying our software deals
with data is really saying very little. So what more can we say?

## Entity, State and Transactions

Our problems often demand solutions that create entities and constrain how their
state evolves given outside input. To achieve this requires varying degrees of
coordination. OLTP databases do exactly that! They provide transactions that let
us atomically transition the state of entities while maintaining invariants
("business rules"). In essence, they're fancy state machines.

Coordination requires observing state and communicating changes - both easier
when co-located. If orchestrating state across distance was easy, it would be
trivial to run all our OLTP systems on the edge. That's not the reality.

> The degree of coordination is problem dependent. <br> Transactions perform the
> coordination and state evolution. <br> It's better if everything involved is
> in the same place (locality).

## Information is built different

Information is created the moment the state of any entity is observed. It has a
reference to the entity, the state being observed and the time.

It's not an entity with evolving state - it's an immutable record that's the
same everywhere, to everyone, whenever they see it. This makes it consistent by
definition, requiring no coordination to replicate, distribute, or cache
forever.

> Information really is nothing like entities that change state. Conflating them
> is a mistake.

## OLTP for everything?

Let's look at some outcomes if we decide to use an OLTP database for all our
"data" requirements.

### Remembering is on you

OLTP is great at orchestrating entities and state but it won't store past states
or how entities change for you. If you're lucky you might be able to completely
solve your problem by only tracking the current state of everything. But more
than likely that's not the case and failing to proactively collect records will
lead to the unpleasant discovery that it's impossible to answer questions about
the past. 😬

The situation becomes worse when the questions about the past aren't even known
when you first build the application. Hoping there's a backup that can answer
your question, or sifting through logs is all accidental record-keeping.

> Forgetting past states isn't really an option for most applications. In those
> cases whether we realize it or not we **must** record information.

### Into the Tar Pit

Okay, so we need records in the database.

Which entities need record-keeping? What if we don't know what historical
questions might be asked? Do we store complete state snapshots or just diffs?
Event sourcing? Change data capture? What's the schema and will it conflict as
the rest of the system evolves? Oh no, more complex migrations? How do we index
temporal data? Will queries be more challenging? What about read performance?
Write performance? Storage costs? User experience?

Maybe the biggest red flag: these questions have nothing to do with your actual
problem. It's pure accidental complexity.

> When a tool makes simple things complex, it's usually the wrong tool for the
> job.

### Leaving value on the table

The OLTP database has ownership of its entities to provide transactions that
change their state. But immutable records can't change! They are not bound to
the databases transaction scope.

Information is the perfect candidate for being close to where it's needed. We
take something that could be everywhere and constrain it to be somewhere.
Creating artificial scarcity in a landscape of abundant global storage and
content delivery networks.

> We're under-utilizing one of the most distribution-friendly types of data.

## OLAP for everything?

State transitions are either coordinated or they're not. If your problem demands
strict constraints there's no middle ground for "mostly transactional" where
it's fine to break the rules. Lost writes and ambiguous states often manifest as
severe outcomes with unacceptable consequences. Fortunately, we've mostly agreed
this is a bad idea.

Contrast this with using OLTP for information: Some extra complexity for record
keeping and underutilized distribution potential. Those problems seem tolerable
by comparison.

## Release the Records!

![database and archive vs database only](images/db-arc.png)

It's clear information needs to be extracted from OLTP databases (left) and put
somewhere else (right). The shift is simple. OLTP database revert back to what
they do best - transaction processing. The archive can focus on storing records
and distributing to wherever the questions may be.

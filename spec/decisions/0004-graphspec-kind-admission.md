---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: GraphSpec Kind Admission — Five Core Kinds

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, language-design, kinds, value-object, enum
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The GraphSpec bootstrap proposed seven specification kinds: ModuleSpec, EntitySpec,
RelationshipSpec, CommandSpec, EventSpec, ValueObjectSpec, and EnumSpec. With
decision 0003 making ModelSpec the single structural language, ValueObjectSpec and
EnumSpec — whose content is purely structural — needed a home decision. Two options
were on the table: remove them from GraphSpec entirely, or retain them as thin
graph-level kinds whose instances reference ModelSpec definitions (mirroring how
EntitySpec references a ModelSpec model).

The question generalises: what earns a concept a GraphSpec kind at all? Without an
admission rule, every domain notion (policy, workflow, projection, availability,
permission) becomes a candidate kind, and the language grows by accretion.

## Decision

GraphSpec v0.2 defines exactly five kinds: **module**, **entity**, **relationship**,
**command**, and **event**.

The admission rule for any current or future kind:

> A concept earns a GraphSpec kind if and only if it can participate in at least one
> graph-native semantic — being an identity-bearing relationship endpoint, a command
> or event subject, an ownership/boundary declaration, or a lifecycle carrier — that
> is not derivable from ModelSpec.

ValueObjectSpec and EnumSpec are removed from GraphSpec:

- Value objects are ModelSpec **components** (reusable field groups without identity).
- Enumerations are ModelSpec **named enums** (added to ModelSpec by its decision on
  named enums). Lifecycle *states* are the exception: they are domain semantics and
  are declared in the GraphSpec entity's `lifecycle:` block, not as ModelSpec enums.

Graph tooling (diagrams, `graph refs`, navigation) MAY still surface value objects and
enums as *derived* nodes by reading ModelSpec — presentation-level nodes do not
require language-level kinds.

## Rationale

Applying the admission rule: value objects and enums have no identity, so they cannot
be relationship endpoints; they cannot be command or event subjects; they carry no
lifecycle; and their only connection to other concepts is structural usage (embedding,
typing), which ModelSpec already records. A graph-level kind for them would add nodes
to the graph but no new edge type — only duplicated ones.

The retained-wrapper alternative was rejected on five grounds:

1. **A wrapper carries no semantics of its own.** An entity's graph artifact adds real
   content beyond its model: identity semantics, ownership, lifecycle, relationship
   endpoints, command/event subject-hood. A value-object wrapper would carry only
   `id`, `model:`, and `summary` — a pure pointer. A kind whose instances answer no
   question that nothing else answers is ceremony.
2. **It reopens the drift channel decision 0003 closed.** Two files per concept means
   two names and two statuses, and the wrapper is a standing attractor for structure
   ("just add the shape here for convenience") — exactly how the bootstrap's
   TimeWindow value object grew a `properties:` block.
3. **It conflates the rendered graph with the authored language.** Consumers' needs —
   "who uses TimeWindow?", value objects in diagrams — are met by deriving nodes and
   edges from ModelSpec, because GraphSpec depends on ModelSpec (decision 0003).
4. **Standards cost and asymmetric regret.** Each kind obliges every implementer to
   support shape, IDs, lint rules, CLI tokens, and docs forever. Adding a kind later
   is backward-compatible; removing one is a breaking change. Under uncertainty,
   omit.
5. **Precedent.** In DDD terms GraphSpec is the strategic layer (contexts, maps) and
   ModelSpec the tactical layer (entities, value objects); strategic-design artifacts
   do not enumerate value objects. Comparable stacks behave the same way: OpenAPI does
   not define a wrapper document per JSON Schema.

The escape valve: if a value object accumulates identity, lifecycle, or audit needs,
that is the association-object signal — it *becomes an entity*, which is already a
kind. If real usage later demonstrates a graph-native semantic unique to value
objects, v0.3 can add the kind back compatibly.

## Declined Alternatives

### Retain ValueObjectSpec and EnumSpec as graph-level references to ModelSpec

The strongest variant of the alternative. Rejected for the five grounds above. The
best argument for it — a value object shared across modules is an inter-module
contract, which is boundary (graph) territory — is answered at the right altitude:
the module-level dependency (`reservations` depends on `scheduling`) is the graph-level
fact and lives on ModuleSpec; the specific shared types are evidence, derivable from
ModelSpec references, and tooling can list them on demand.

### Retain EnumSpec only (for lifecycle enums)

Rejected: lifecycle states are declared in the entity's `lifecycle:` block, so the
one genuinely semantic use of enums is covered without a kind; the remaining uses
(currency codes, country codes) are plain data vocabularies, squarely ModelSpec.

### Admit kinds case-by-case with no rule

Rejected: without an admission test, WorkflowSpec, PolicySpec, ProjectionSpec, and
future notions get litigated from scratch each time and the language grows by
accretion — the most common failure mode of open standards.

## Consequences at Decision Time

- The GraphSpec bootstrap's `value-object/` and `enum/` kind directories are removed;
  their rationale is preserved in the bootstrap's alternatives-considered record.
- ModelSpec gains a named `enum` concept (its decision 0013).
- The GraphSpec entity envelope gains an optional `lifecycle:` block with inline
  states.
- CLI `graph` specifications shrink their kind vocabulary to the five kinds.
- The first consumer bootstrap graph (maintained in that consumer's own repository)
  is intentionally NOT migrated yet; it will be rewritten against v0.2 as its own
  phase.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

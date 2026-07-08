---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: Role-Labeled Relationship Endpoints and Event Participants

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, relationships, events, roles, semantics
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The Phase 5A Family Identity pilot (finding FA4) hit the same wall three times in
one slice: the moment both sides of an association are the **same entity**, the
language can no longer say *as what* they relate. `parent-of` joins
`contactius.contact` to `contactius.contact` — "from is the parent" lived only in
prose and the artifact id. The `consent-granted` event has a guardian and a ward,
both Contacts — a participants list is an unlabeled set of references, so the two
roles collapsed into one entry (and a duplicated reference was silently
meaningless). Bookius and OpenVaultDB never met this: their associations joined
*different* kinds whose names did the labeling.

## Decision

Relationship endpoints and event participants MAY carry a **role label**. Both
positions accept either the existing scalar form (a qualified reference, unchanged)
or a map form:

```yaml
# RelationshipSpec
from: { ref: contactius.contact, role: parent }
to:   { ref: contactius.contact, role: child }

# EventSpec
participants:
  - familycard.family-card                       # unlabeled scalar — unchanged
  - { ref: contactius.contact, role: guardian }
  - { ref: contactius.contact, role: ward }
```

Rules:

- **A role is a single bare kebab-case token.** It names the *side of the
  relationship type* (or the *participation in the event type*) — a schema-level
  label, like an id.
- **Roles are labels, not data.** They do not reference ModelSpec enums.
  Instance-level role data (which `HouseholdRole` a given member has) keeps its
  existing home: relationship `metadata` typed by a ModelSpec enum. One
  relationship may carry both — labeled endpoints naming its sides, enum-typed
  metadata typing its instances.
- **One role per endpoint or participant.** A party holding several relations at
  once ("she is both spouse and emergency contact") is several relationship
  *instances* of several *types*, which the graph already expresses; it is never
  one endpoint with a role list.
- **Map form**: `ref` is required, `role` is required (a map without a role says
  nothing the scalar doesn't), and no other keys are allowed.
- **Same-reference participants MUST be distinguished by roles.** Two participants
  with the same reference and no distinguishing role labels are a lint warning —
  they are either copy-paste noise or an author reaching for exactly this feature.
- **Self-referential relationships SHOULD be labeled.** A relationship whose two
  endpoints are the same qualified reference and carry no roles is a lint warning:
  direction alone is doing semantic work only prose can explain.
- **Actors and command inputs are unchanged.** Qualifying an actor ("the
  guardianship's guardian", not "a User") is authorization semantics — the policy
  layer question (pilot findings FA5/FA6), deliberately not this decision.

## Rationale

Role labels put the answer to "as what do these relate?" where the relationship is
declared, cost nothing when endpoints are unambiguous (both forms stay valid), and
change no resolution or ownership rule — a labeled endpoint resolves, lints, and
counts against `dependsOn` exactly as its scalar form does.

## Declined Alternatives

### Role lists per endpoint (`roles: [spouse, emergency-contact]`)

The motivating example — one person who is both spouse and emergency contact —
decomposes into two relationship instances of two types, each independently
queryable and revocable. A role list on one endpoint would fuse relationship types
into one artifact and take that independence away. If a *generic* connection type
with multi-valued instance roles is ever wanted, that is enum-typed metadata, not
endpoint schema.

### Roles as ModelSpec enum references

Endpoint labels are schema names (like ids and property names), not value
domains; requiring an enum would invert the layering (GraphSpec frontmatter
depending on ModelSpec for its own vocabulary) and re-import the pilot's FA2
virality — a module would need a `models/` directory just to label a
relationship side. Where roles ARE data — per-instance member roles — ModelSpec
enums remain exactly right, via `metadata`.

### Role-keyed endpoint maps replacing `from`/`to` (`endpoints: {parent: …, child: …}`)

More general (opens n-ary relationships) but breaks every existing artifact,
erases the from/to direction that most relationships still want, and buys nothing
binary relationships need. Revisit only if a real n-ary case arrives.

## Consequences at Decision Time

- RelationshipSpec and EventSpec kind specifications document the map form.
- The CLI parses both forms; `graph lint` gains role validation (kebab-case
  tokens, map shape) plus the duplicate-participant and unlabeled-self-reference
  warnings; navigation and dependency rules treat labeled endpoints identically
  to scalar ones.
- The Family Identity pilot adopts labels on `parent-of`, `consent-granted`, and
  `identity-shared`, retiring finding FA4.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

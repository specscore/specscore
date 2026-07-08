---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: Rules and Policies — A Machine-Checkable Home for Domain Constraints

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, policy, rules, lifecycle, permissions, fragments
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The third consumer pilot (findings FA5/FA6) produced six domain rules that all
landed in prose: conditional requirements across entities ("a ward's share needs a
granted consent"), cross-entity lifecycle dependencies ("consent is void when its
guardianship is revoked"), actor qualification ("only the guardianship's
guardian"), and value constraints. Prose rules have no identity (untestable, no
`Verifies:` traceability), no inventory, and dangle silently when the entities and
lifecycle states they mention are renamed. The design space was worked through in
[policy-layer.md](../features/graphspec/policy-layer.md); the owner approved the
two-tier shape, the naming (`rule`/`policy`, avoiding "invariant"), downstream
ownership, pulling the policy kind forward rather than deferring to v0.3, and the
enum-value addressability prerequisite.

## Decision

### Tier 1 — `rules:` blocks on artifacts

Entity, relationship, and command artifacts MAY carry a `rules:` list. Each rule
is `{id, text, refs?}`: `id` a bare kebab-case token unique within the artifact,
`text` the rule sentence, `refs` an optional list of qualified graph references
and/or `modelspec://` references the rule depends on. Lint validates shape, id
uniqueness, and that every ref resolves and respects dependency direction — and
nothing more. Tier-1 rules never pretend the machine understands the sentence.

### Tier 3 — the `policy` kind

GraphSpec gains a sixth kind, `policy` (collection directory `policies/`),
**amending decision 0004's five-kind list**. A policy expresses a constraint
through a small typed clause vocabulary whose operands are only things the graph
already knows. The v1 vocabulary — grown bottom-up from the pilot corpus, to be
extended only when a further pilot needs more:

```yaml
kind: policy
id: guardian-consent-required
applies:                      # REQUIRED: exactly one of command|entity|relationship
  command: sharing.share-identity
when:                         # OPTIONAL: condition clauses (list)
  - input: subject            #   an input of the applies command
  - is-role: {relationship: family.household-member, role: child}
requires:                     # OPTIONAL: requirement clauses (list)
  - entity: sharing.consent
    in-state: granted
  - actor-is: {entity: family.guardianship, model-role: guardian}
invariant:                    # OPTIONAL: only when applies names an entity
  - when-referenced: {entity: family.guardianship, in-state: revoked}
    then: {self-state: revoked}
summary: Sharing a ward's identity requires the guardian's granted consent.
```

Lint validates every operand against the graph: the `applies` target exists and
matches its key's kind; `input` names an input of that command; `in-state` values
are members of the target entity's `lifecycle.states`; `actor-is.model-role` is a
property of the target entity's ModelSpec model; `then.self-state` is a state of
the `applies` entity. Policies are owned by modules (placed in `policies/`) under
the same downstream-ownership rule as relationships: the owner's `dependsOn`
closure must cover every referenced module.

### Promotion rule

Small, single-artifact rules stay Tier-1 `rules:` entries; a rule that crosses
artifacts, qualifies actors, or ties lifecycles together is a policy candidate —
the same judgement line as relationship → association-object promotion.

### No expression language

Spec-level expressions (`consent.status == 'granted' && …`) are declined: with no
instance data at spec time they can only be parsed, never evaluated — precision
theatre with a grammar to own. Revisit only when a runtime consumer exists, and
then by adopting an existing language (e.g. CEL), never inventing one.

### Enum-value fragments (amends decision 0010)

`modelspec:///<module>[.<kind>].<Name>#<value>` now addresses a named enum value —
the first occupant of the fragment space 0010 reserved. A fragment is valid ONLY
when the resolved concept is an enum and `<value>` is one of its values; any other
fragment remains an error. This makes data vocabulary addressable wherever
modelspec references are accepted (rule `refs`, feature specs, future clauses).
Lifecycle-state fragments on *graph* references are deliberately deferred: policy
clauses reference states structurally (`in-state:`), which lint already validates.

## Rationale

Rules get identity, inventory, and loud failure on rename for one optional key;
policies make the permission/consent layer queryable without an expression
language, because every clause operand is independently resolvable against the
graph. The honest limit stays visible: orderings between enum values ("`school`
fits within `full`") are not graph knowledge — such rules remain Tier-1 text.

## Declined Alternatives

### An expression/constraint language (Tier 2)

See above — unevaluatable at spec time, high ownership cost, OCL's fate.

### "Invariant" as a kind or key name

Reads as jargon to non-native speakers; `rule` (local) and `policy` (cross-
cutting) carry the same distinction in plain words.

### Deferring the policy kind to v0.3

The only argument was single-pilot vocabulary risk; a four-clause v1 grown
bottom-up bounds that risk better than waiting does, and the addressability
prerequisite was approved anyway.

## Consequences at Decision Time

- Decision 0004's kind list is amended: module, entity, relationship, command,
  event, **policy**.
- The CLI parses `rules:` and the policy kind, validates clause operands
  (`graph-rules-shape`, `graph-policy-shape` + existing resolution rules),
  accepts enum-value fragments on modelspec references, and scaffolds
  `graph new policy`.
- The third consumer pilot migrates its six prose rules into `rules:` blocks
  and two policy artifacts, retiring findings FA5/FA6 as OPEN items.
- GraphSpec kind documentation gains a PolicySpec page; the "five kinds"
  phrasing is updated across the family.

## Observed Consequences

- 2026-07-08: examples pseudonymized to the neutral domain (errata — the public
  standard names no private consumer; no semantic change to the decision).

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

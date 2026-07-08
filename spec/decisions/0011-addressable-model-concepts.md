---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: Addressable Model Concepts and Kind Segments

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** modelspec, references, namespaces, collections, recordsets
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

Decision [0007](0007-modelspec-reference-resolution.md) scoped `<Name>` in model
references to entities, components, and enums. That was scope, not principle:
graph artifacts only needed domain concepts, so collections and recordsets got no
address. The gap surfaced when feature specifications needed to say,
machine-checkably, "this feature reads the `vault_summary` recordset" — a concept
a spec document can talk about should be referenceable.

Two related ambiguities surfaced with it. First, ModelSpec's "names are unique
within their scopes" did not say whether entity, component, and enum names share
one scope; the first lint implementation took the strict reading (one flat
namespace per module) as otherwise references would need kind selectors. Second,
casing conventions (`entity "Vault"` vs `collection "vaults"`) were the only
thing keeping kinds apart — unacceptable as a namespace mechanism.

The second consumer pilot also exposed a related implementation defect: the
duplicate-ID checker gave module nodes a qualified address (`<m>.<m>`), colliding
with a same-named entity. The language never assigned modules qualified IDs —
modules are bare-ID citizens everywhere (`dependsOn: [identity]`).

## Decision

### Two disjoint graph namespaces

- **Modules** live in the bare-ID namespace: `vault` addresses the module.
- **Owned artifacts** live in the per-module qualified namespace: `vault.vault`
  addresses the entity. A module node never occupies a qualified-ID slot, so a
  module and its same-named entity cannot collide.

### The addressable trio and the kind segment

The two-segment reference form resolves against **one flat namespace per module**
formed by entities, components, and enums — now normative, not validator
folklore. An optional **kind segment** extends the form
([decision 0010](0010-references-are-urls.md) URL syntax):

```text
modelspec:///<module>.<Name>                     # two-segment: entity | component | enum
modelspec:///<module>.<kind>.<Name>              # three-segment, explicit
modelspec:///vault.collections.vaults            # collections: three-segment ONLY
modelspec:///vault.recordsets.vault_summary      # recordsets:  three-segment ONLY
```

- `<kind>` ∈ `entities` | `components` | `enums` | `collections` | `recordsets`
  (plural tokens, mirroring consumer-tree collection directories).
- These five tokens are **reserved — forbidden as concept names** (lint error).
- Collections and recordsets get their own name scopes (separate from the trio
  and from each other) and are addressable only in the three-segment form. The
  two-segment form stays safe precisely because it resolves only in the trio.

### Where the kind segment does not go

- **Graph-to-graph references stay two-segment** (`from: vault.vault`). Graph
  kinds are semantic and change — a relationship promoted to an
  association-object entity must not invalidate references. Kind-free references
  surviving promotion is the feature.
- **HCL is untouched.** `entity = "identity.Team"` — the attribute name is the
  kind selector; ModelSpec decision 0014's one-dot rule and consumer-neutrality
  stand.

## Rationale

The kind segment lives exactly where kinds are structural facts (ModelSpec — a
collection never becomes an entity) and is absent exactly where kinds are
semantic judgments (GraphSpec — promotion is expected). Reserved tokens cost five
words and make the grammar unambiguous without casing cleverness. Making the trio
namespace normative is what keeps the ergonomic two-segment form sound.

## Declined Alternatives

### Casing conventions as the namespace mechanism

PascalCase concepts vs lowercase collections *happens* to disambiguate, but a
grammar whose correctness depends on naming style is not a grammar.

### Kind-qualified twins in the trio

Allowing `entity "Vault"` and `enum "Vault"` to coexist would force a kind
selector into every reference — triple-encoding, again.

### Path-style references

Already recorded as a rejected alternative in the GraphSpec decision log:
references point at concepts, not files, and must survive kind promotion and
layout changes.

### A module node with a qualified self-address

`<m>.<m>` was an implementation accident, not a language rule; it manufactured
collisions for every domain whose core entity names its context (`vault`,
`wallet`, `chat`).

## Consequences at Decision Time

- The lint duplicate-ID check excludes module nodes from the qualified-ID index;
  module-ID uniqueness remains separately enforced on bare IDs.
- The resolver parses the optional kind segment, indexes collections and
  recordsets, and rejects reserved tokens as concept names.
- ModelSpec documents the trio namespace, the separate collection/recordset
  scopes, and the five reserved names (its authoring and core-model texts).
- The second consumer pilot may rename its plural-forced module back to its
  domain-true singular name.
- Feature specifications gain a machine-checkable way to reference collections
  and recordsets; the FeatureSpec-side lint for such references is future work.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

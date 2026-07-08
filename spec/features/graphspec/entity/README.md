---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: EntitySpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

EntitySpec describes a domain concept with identity.

Examples: User, Team, Contact, Booking, Asset.

An entity artifact declares identity, ownership (derived from placement), lifecycle, and semantics. Its structure — properties, types, constraints — lives in a referenced [ModelSpec](https://github.com/specscore/modelspec) model, never inline ([decision 0003](../../../decisions/0003-one-structural-language.md)).

## Problem

GraphSpec needs a durable way to describe things that can be referred to over time as the same thing, even as their properties or relationships change — without becoming a second structural language.

## Behavior

An entity artifact is the graph node for a domain concept with identity. It may be a relationship endpoint and the subject of commands and events.

Shape (per [decision 0005](../../../decisions/0005-graphspec-id-and-reference-syntax.md): bare kebab-case `id` equal to the filename stem, no `owner:` field, no module prefix):

```yaml
---
kind: entity
id: booking
name: Booking
status: draft
model: modelspec:///reservations.Booking
lifecycle:
  states: [requested, confirmed, cancelled]
summary: A reservation for a bookable target during a time window.
---
```

Rules:

- `model:` is OPTIONAL. Domain modelling legitimately precedes structural modelling; an entity may exist before its ModelSpec model does. Lint SHOULD warn when a non-draft entity has no `model:` reference. **Model-less is a module-local luxury**: the moment another module's ModelSpec needs to reference the entity's concept (`entity = "contactius.Contact"`), the model must exist — HCL references resolve against concepts, not graph artifacts, so a semantics-first entity blocks structural modelling in every dependent module (Family Identity pilot, finding FA2).
- `model:` references resolve per [decision 0007](../../../decisions/0007-modelspec-reference-resolution.md): local graph root (placement, [decision 0006](../../../decisions/0006-graphspec-model-source-location.md)), then configured projects, then the explicit cross-repo authority form `modelspec://{host}/{org}/{repo}/…` ([decision 0010](../../../decisions/0010-references-are-urls.md)).
- An entity MUST NOT embed structural definitions (`fields:`, `properties:`, checks). Structure belongs to the referenced ModelSpec model.
- `lifecycle.states` is OPTIONAL and declares the domain lifecycle inline. Lifecycle is GraphSpec semantics; ModelSpec named enums are for data vocabularies.
- The owning module is derived from the artifact's placement under a module root (`<module-root>/entities/<id>.md`).

## Acceptance Criteria

- EntitySpec is documented as a GraphSpec kind for concepts with identity.
- The envelope references ModelSpec for structure and permits no inline field or property lists.
- `model:` is optional with a lint warning for non-draft entities.
- Lifecycle states may be declared inline on the entity.

## Open Questions

- How should lifecycle transitions (not just states) be represented, and when do they become normative?
- Should entities be able to declare invariants that span the referenced model and the graph (e.g., "a confirmed booking has a resolved resource")?
- When exactly is a relationship with metadata promoted to an association-object entity?

---
*This document follows the https://specscore.md/feature-specification*

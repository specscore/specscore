---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: ModuleSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

ModuleSpec describes an architectural module or bounded context.

Examples: identity, directory, catalog, scheduling, reservations.

A module is the ownership root for graph artifacts and the unit of dependency declaration.

## Problem

GraphSpec needs a reusable module concept that is not tied to any consumer's extension naming, that owns artifacts without hand-maintained lists, and that makes dependency direction explicit and lintable.

## Behavior

A module is declared by a `README.md` at its module root (`spec/graph/modules/<module-id>/README.md`).

Shape:

```yaml
---
kind: module
id: reservations
name: Reservations
status: draft
dependsOn:
  - identity
  - scheduling
  - catalog
summary: Booking domain module.
---
```

Rules:

- **Ownership is derived, not declared.** A module owns every artifact placed under its root. Artifacts carry no `owner:` field. Any `Owns` listing in the module README body is a generated managed section (canonical managed-by markers), never hand-written.
- **`dependsOn` declares allowed outbound dependencies.** Any qualified reference from this module's artifacts to another module's artifacts requires that module in `dependsOn`. A reference to an undeclared module is a lint error.
- **Relationship ownership follows dependencies.** A module may own a relationship only if its `dependsOn` closure covers both endpoint modules (see [RelationshipSpec](../relationship/README.md)).
- Modules are defined in the repository's single graph root in v0.2; distributed and cross-repo module roots are deferred per [decision 0005](../../../decisions/0005-graphspec-id-and-reference-syntax.md).

## Acceptance Criteria

- ModuleSpec is documented as the reusable name for architectural modules; product-specific extensions are one possible implementation.
- Ownership is documented as derived from placement, with generated `Owns` listings.
- `dependsOn` is documented as the lintable dependency declaration.

## Open Questions

- Should ModuleSpec describe runtime instances or only architectural modules?
- How should shared modules and core modules avoid becoming dependency sinks?
- Should `dependsOn` support qualifiers (e.g., `weak`/`contract-only`) once real graphs need them?
- How should multiple graph roots be indexed across repositories when cross-repo support lands?

---
*This document follows the https://specscore.md/feature-specification*

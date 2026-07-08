---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: GraphSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

GraphSpec is a bootstrap specification language for describing connected domain models.

It is part of the SpecScore family. GraphSpec is intended to own the domain vocabulary that other specifications reference.

## Contents

Each first-level directory below this feature is a provisional specification kind.

```text
graphspec/
    entity/
    relationship/
    command/
    event/
    module/
    value-object/
    enum/
```

| Directory | Description |
|---|---|
| [entity/](entity/README.md) | EntitySpec: domain concepts with identity. |
| [relationship/](relationship/README.md) | RelationshipSpec: reusable relationship definitions. |
| [command/](command/README.md) | CommandSpec: requested intentions. |
| [event/](event/README.md) | EventSpec: facts that happened. |
| [module/](module/README.md) | ModuleSpec: architectural modules or bounded contexts. |
| [value-object/](value-object/README.md) | ValueObjectSpec: immutable concepts without identity. |
| [enum/](enum/README.md) | EnumSpec: reusable enumerations. |
| [glossary/](glossary/README.md) | Working definitions for GraphSpec terminology. |

## Problem

SpecScore needs a canonical domain modelling layer below features, APIs, UI, and tests. Today domain vocabulary can appear in multiple downstream specs without one durable place for identity, ownership, lifecycle, relationships, commands, events, permissions, invariants, constraints, examples, and rationale.

This bootstrap is intentionally not a finished language definition. It preserves the current design intent, decisions, alternatives, and open questions for deeper architecture review.

## Behavior

GraphSpec describes domain concepts and the relationships between them. The graph provides structure; metadata provides semantics.

GraphSpec defines kind directories using singular names. Consumer projects should prefer plural directories such as `entities/`, `relationships/`, `commands/`, `events/`, and `modules/`.

GraphSpec consumer trees may be centralised or distributed. A system may keep one shared `spec/graph/`, one `graph/` tree per module, or dedicated module spec repositories next to code. Cross-repo references should use SpecScore's unified cross-repo linking system rather than a GraphSpec-specific link format.

GraphSpec artifacts are expected to be Markdown files with YAML frontmatter. This envelope is illustrative, not yet normative:

```yaml
---
kind: entity
id: booking
name: Booking
status: draft
owner: bookius
summary: A reservation for a resource during a time window.
---
```

GraphSpec is intended to be independent. FeatureSpec, ApiSpec, UiSpec, and TestSpec may reference GraphSpec; GraphSpec should not depend on FeatureSpec.

During bootstrap, GraphSpec is hosted under `spec/features/graphspec/` because SpecScore already uses FeatureSpec as its organizing mechanism. This is a repository bootstrapping choice, not a permanent conceptual dependency.

Supporting review documents:

- [Bootstrap rationale](BOOTSTRAP.md)
- [Design principles](principles.md)
- [Current decisions](current-decisions.md)
- [Alternatives considered](alternatives-considered.md)
- [Open questions](open-questions.md)
- [Glossary](glossary/README.md)
- [TODO](TODO.md)

## Acceptance Criteria

- GraphSpec bootstrap material is Markdown-first and YAML-backed where structure is useful.
- Specification kinds are documented as provisional, reviewable starting points.
- Rationale, alternatives, and open questions are preserved alongside the scaffold.
- GraphSpec's intended independence from FeatureSpec is documented.
- Consumer project naming conventions are documented separately from language kind names.

## Open Questions

See [open questions](open-questions.md).

---
*This document follows the https://specscore.md/feature-specification*

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

It is part of the SpecScore family. GraphSpec owns the domain vocabulary that other specifications reference: modules, entities, relationships, commands, events, ownership, and lifecycle. Structure — properties, types, constraints, value objects, enums — is owned by [ModelSpec](https://github.com/specscore/modelspec); GraphSpec references ModelSpec models instead of redefining them ([decision 0003](../../decisions/0003-one-structural-language.md)).

## Contents

Each first-level directory below this feature is a specification kind. GraphSpec v0.2 defines exactly five kinds, admitted under the rule in [decision 0004](../../decisions/0004-graphspec-kind-admission.md).

```text
graphspec/
    module/
    entity/
    relationship/
    command/
    event/
```

| Directory | Description |
|---|---|
| [module/](module/README.md) | ModuleSpec: architectural modules or bounded contexts, with declared dependencies. |
| [entity/](entity/README.md) | EntitySpec: domain concepts with identity, referencing ModelSpec models for structure. |
| [relationship/](relationship/README.md) | RelationshipSpec: semantic relationships between domain concepts. |
| [command/](command/README.md) | CommandSpec: requested intentions. |
| [event/](event/README.md) | EventSpec: facts that happened. |
| [glossary/](glossary/README.md) | Working definitions for GraphSpec terminology. |
| [reviews/](reviews/README.md) | Long-term architecture review reports (the design-history "why"). |
| [continuations/](continuations/README.md) | Phase hand-off documents for future sessions. |

ValueObjectSpec and EnumSpec were removed in v0.2: value objects are ModelSpec components and enumerations are ModelSpec named enums. See [decision 0004](../../decisions/0004-graphspec-kind-admission.md) and [alternatives considered](alternatives-considered.md).

## Problem

SpecScore needs a canonical domain modelling layer below features, APIs, UI, and tests. Today domain vocabulary can appear in multiple downstream specs without one durable place for identity, ownership, lifecycle, relationships, commands, events, permissions, invariants, constraints, examples, and rationale.

This bootstrap is intentionally not a finished language definition. It preserves the current design intent, decisions, alternatives, and open questions for deeper architecture review.

## Behavior

GraphSpec describes domain concepts and the relationships between them. The graph provides structure; metadata provides semantics.

GraphSpec defines kind directories using singular names. Consumer projects use plural directories — `modules/`, `entities/`, `relationships/`, `commands/`, `events/` — with unsuffixed `<id>.md` filenames per [decision 0005](../../decisions/0005-graphspec-id-and-reference-syntax.md).

GraphSpec v0.2 supports one graph root per repository (default `spec/graph/`). Cross-repo graph references are deferred; when they land they extend the qualified-ID form with the `@{host}/{org}/{repo}` suffix convention established by the Stable `source-references` feature, rather than a GraphSpec-specific mechanism.

GraphSpec artifacts are Markdown files with YAML frontmatter. Local IDs are bare lowercase kebab-case; the qualified form `<module-id>.<local-id>` is computed from directory placement, never stored. Structure is referenced from ModelSpec, not embedded:

```yaml
---
kind: entity
id: booking
name: Booking
status: draft
model: modelspec://reservations.Booking
lifecycle:
  states: [requested, confirmed, cancelled]
summary: A reservation for a bookable target during a time window.
---
```

Dependency directions:

- GraphSpec depends on ModelSpec (one-directionally; ModelSpec never references GraphSpec).
- FeatureSpec, ApiSpec, UiSpec, and TestSpec may reference GraphSpec; GraphSpec does not depend on them.

During bootstrap, GraphSpec is hosted under `spec/features/graphspec/` because SpecScore already uses FeatureSpec as its organizing mechanism. This is a repository bootstrapping choice, not a permanent conceptual dependency.

Design-history documents:

- [Roadmap](roadmap.md) — phase sequence with completed/current/next/deferred status
- [Decisions](decisions.md) — accepted decisions with rationale, plus notable rejected alternatives
- [Alternatives considered](alternatives-considered.md) — full catalogue of rejected options
- [Open questions](open-questions.md) — unresolved questions by priority
- [Lessons learned](lessons-learned.md) — architectural learning from Phase 1
- [Reviews](reviews/README.md) — review reports (Phase 1: [architecture review 2026-07](reviews/architecture-review-2026-07.md))
- [Continuations](continuations/README.md) — hand-offs ([Phase 2 handoff](continuations/phase-2-handoff.md))
- [Bootstrap rationale](BOOTSTRAP.md), [design principles](principles.md), [glossary](glossary/README.md), [TODO](TODO.md)

## Acceptance Criteria

- GraphSpec bootstrap material is Markdown-first and YAML-backed where structure is useful.
- GraphSpec defines exactly five specification kinds, each admitted under the decision 0004 rule.
- GraphSpec artifacts reference ModelSpec for structure and embed no `fields:`/`properties:` blocks.
- Identifier, reference, and file-naming rules follow decision 0005.
- Rationale, alternatives, and open questions are preserved alongside the scaffold.
- GraphSpec's intended independence from FeatureSpec is documented.
- Consumer project naming conventions are documented separately from language kind names.

## Open Questions

See [open questions](open-questions.md).

---
*This document follows the https://specscore.md/feature-specification*

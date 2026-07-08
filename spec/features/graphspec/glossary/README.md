---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: GraphSpec Glossary

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/glossary?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/glossary?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/glossary?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/glossary?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

The GraphSpec glossary records working definitions for terms used by the bootstrap.

## Problem

GraphSpec has overlapping terminology: graph, domain graph, knowledge graph, module, bounded context, relationship, association object, membership, command, event, trigger, policy, and projection.

Without a glossary, early examples may appear cleaner than the underlying modelling choices really are.

## Behavior

Current working definitions:

| Term | Definition |
|---|---|
| GraphSpec | A specification language for describing connected domain models. |
| Domain Graph | The canonical set of domain concepts, relationships, and semantic metadata. |
| Module | An architectural boundary or bounded context that owns domain concepts and declares its dependencies (`dependsOn`). |
| Entity | A domain concept with identity. Its structure lives in a referenced ModelSpec model. |
| Model Reference | A `modelspec:///<module>.<Name>` URL from a graph artifact to a ModelSpec entity, component, or named enum — optionally `modelspec:///<module>.<kind>.<Name>` for collections and recordsets, or `modelspec://{host}/{org}/{repo}/…` cross-repo (decisions 0010/0011). |
| Value Object | An immutable domain concept without identity — a ModelSpec component, referenced by graph artifacts, not a GraphSpec kind. |
| Enum | A named controlled vocabulary — a ModelSpec named enum, referenced by graph artifacts, not a GraphSpec kind. Lifecycle states are the exception and live on the entity. |
| Relationship | A named semantic connection between domain concepts; first-class only when it carries semantics beyond a typed reference. |
| Association Object | A relationship that carries enough state, lifecycle, or audit history that it may need identity — a promotion candidate to entity. |
| Command | An intention that can be requested. |
| Event | A fact that happened. |
| Subject | The primary domain concept an event, command, relationship, or policy is about. |
| Participant | A secondary domain concept involved in a command, event, or relationship. |
| Source | A non-command origin of an event, such as a timer, integration, automation, external system, or manual correction. Command triggers are derived from CommandSpec `possibleEvents`. |
| Lifecycle | The domain states of an entity (`lifecycle.states`) and, eventually, their transitions. |
| Invariant | A rule that must remain true for a domain concept or graph fragment. |
| Constraint | A structural or validation rule, such as cardinality, uniqueness, required fields, or allowed transitions. |
| Projection | A derived view over graph concepts. |

## Acceptance Criteria

- The glossary captures terms that are likely to cause architectural confusion.
- Definitions are marked as working definitions, not final normative language.

## Open Questions

- Should this glossary remain a child FeatureSpec artifact during bootstrap or move to a GraphSpec-native documentation kind later?
- Is Module equivalent to bounded context, or is it a looser grouping?
- Does ProjectionSpec belong in GraphSpec or a downstream spec?

---
*This document follows the https://specscore.md/feature-specification*

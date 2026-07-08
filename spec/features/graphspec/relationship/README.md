---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: RelationshipSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

RelationshipSpec describes a semantic relationship between domain concepts.

Examples: team membership (with a role), a booking reserving a resource.

RelationshipSpec is first-class, but required only when the relationship carries semantics beyond a typed reference. Plain structural references live in ModelSpec entity properties, and graph tooling may derive edges from them.

## Problem

GraphSpec needs relationships that can carry cross-module endpoints, metadata (such as roles), cardinality constraints, and lifecycle — without forcing every reference between two concepts into a ceremony artifact, and without letting a core module acquire dependencies on extension modules through relationship definitions.

## Behavior

Shape (bare kebab-case `id` per [decision 0005](../../../decisions/0005-graphspec-id-and-reference-syntax.md); endpoints use computed qualified IDs):

```yaml
---
kind: relationship
id: team-member
name: teamMember
status: draft
from: identity.team
to: directory.contact
cardinality: many-to-many
metadata:
  role: modelspec:///identity.TeamRole
summary: A Contact participates in a Team with a role such as member.
---
```

Rules:

- **When required.** A RelationshipSpec artifact is required only when the relationship carries semantics beyond a typed reference: cross-module endpoints, metadata, cardinality constraints, or lifecycle. Intra-module structural references stay in the ModelSpec model.
- **Ownership follows dependencies.** The owning module (derived from placement) MUST have both endpoint modules in its `dependsOn` closure. In practice the downstream module owns the relationship; a core module can never own a relationship targeting an extension-owned entity.
- **Endpoints must resolve.** `from` and `to` reference existing entities by qualified ID. Speculative or union targets belong in prose and open questions, not in frontmatter fields.
- **Endpoints MAY carry role labels** ([decision 0012](../../../decisions/0012-role-labeled-endpoints-and-participants.md)). Each endpoint is either the scalar qualified reference or a map `{ ref: <qualified-id>, role: <kebab-token> }`. The role names the *side of the relationship type* (`from: { ref: contactius.contact, role: parent }`); it is a schema-level label — a single bare kebab-case token, never a list and never a ModelSpec enum reference (instance-level role *data* stays in `metadata` typed by an enum). A self-referential relationship (both endpoints the same qualified ID) without role labels SHOULD be a lint warning: direction alone is doing semantic work only prose can explain.
- **`metadata:` is an OPTIONAL flat map.** Keys are kebab-case or camelCase strings; each value is exactly one of: a scalar (string/number/boolean), a qualified graph reference (`core.space-role`-style), or a `modelspec://` reference. Nested maps and lists are not allowed in v0.2 — a relationship needing structured metadata is an association-object candidate. *(Shape fixed after the first consumer pilot used a `modelspec://` enum reference as role metadata.)*
- **Association objects.** A relationship that accumulates identity, lifecycle, or audit history is a candidate for promotion to an entity (association object). The promotion rule is not yet normative.

## Acceptance Criteria

- RelationshipSpec is documented as first-class and required only when semantic.
- The ownership rule (owner's `dependsOn` closure covers both endpoints) is documented.
- Endpoint references are documented as must-resolve, with speculation excluded from frontmatter.

## Open Questions

- Can relationships carry lifecycle or permissions before the association-object promotion rule is settled?
- Should cardinality be normative (linted) or descriptive in v0.2?
- When exactly does a relationship with metadata become an association object?

---
*This document follows the https://specscore.md/feature-specification*

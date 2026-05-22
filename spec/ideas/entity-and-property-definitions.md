# Idea: Entity and Property Definitions

**Status:** Implementing
**Date:** 2026-05-18
**Owner:** alexander.trakhimenok
**Promotes To:** document-types-registry, entity, property
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we let SpecScore specs declare the business data they consume and produce — entities and reusable properties, with cross-references, machine-readable shape, and CLI-queryable graph — so specs become strongly typed and downstream tooling (datatug, code generation, lint) can rely on a single source of truth?

## Context

SpecScore today has no first-class way to describe the business data a feature touches. Feature READMEs reference 'users', 'emails', and 'orders' in prose; nothing links those mentions, validates them, or lets a reviewer ask 'which features touch User?'. Without structured data definitions, specs cannot be strongly typed, AI agents and human reviewers cannot trace data flow across the feature graph, and downstream tooling (datatug.io, generators, validators) has no canonical shape to consume. The existing document-types-registry, adherence-footer, and CLI subcommands (feature, code, spec) give us the substrate to introduce new Document-Kind features without inventing new infrastructure — only the data-definition Doc-Kinds themselves are missing.

## Recommended Direction

Introduce two new Document-Kind features — `entity` and `property` — that slot into the existing [document-types-registry](../features/document-types-registry/README.md) taxonomy as top-level Document Kinds and follow the [adherence-footer](../features/adherence-footer/README.md) contract.

**`entity`** (file pattern `<slug>.entity.md`, URL `https://specscore.md/entity-specification`) defines a business object. The YAML frontmatter is the **source of truth** and carries `singular`, `plural`, optional `description`, optional `inherits` (for additive extension), and the full structured `properties` list — including nested checks and embedded JSON Schemas. The body has three sections: `## Description` (hand-written prose), `## Properties` (a human-readable table rendered from frontmatter by `specscore lint --fix`; the table is a managed view, never a second source of truth), and `## Referenced by` (machine-maintained back-references to Features and to descendant Entities, in the same managed-section style as `promotes_to` on Ideas — never hand-edited).

**`property`** (file pattern `<slug>.property.md`, URL `https://specscore.md/property-specification`) is a standalone reusable property definition. Frontmatter carries `data_type`, structured `checks`, and `description`. Body has `## Description` and the same managed `## Referenced by` section. Entities reference a Property by URL or relative path from inside their frontmatter `properties` list, enabling a single `email` definition to be reused across `User`, `Customer`, and `Contact` entities.

**Instances live anywhere under `spec/features/**`** — typically next to the owning feature or module. No central `spec/entities/` directory is mandated; module-level ownership in multi-team projects is preserved. Registry `Consumer Path` becomes a list of two globs (`spec/features/**/*.entity.md` and `spec/features/**/*.property.md`) — a one-time relaxation of the registry's current single-glob rule. Discoverability comes from new CLI subcommands: `specscore entity list`, `specscore entity refs <id>`, `specscore entity tree`, `specscore property list`, `specscore property refs <id>`. The existing `specscore feature refs` is taught to surface entity links.

**Inheritance in MVP is additive only**: an entity with `inherits: <id-or-path>` carries every parent property and may append new ones; redefining or removing a parent property is a lint error. Override semantics, recordset/field Doc-Kinds, cross-repo `@import` / `@from`, feature-level `consumes` / `produces` declarations, and i18n for `singular` / `plural` are explicitly out of MVP — named in Not Doing and Open Questions for follow-on Ideas.

**Frontmatter-as-source-of-truth is a deliberate departure** from the prose-heavy style of existing Doc-Kinds: entity files will have substantially longer frontmatter than any current feature README. The win is that every YAML parser in every language can consume the definition directly, no Markdown-table grammar required — which is what makes downstream tooling (validators, generators, third-party UI surfaces over the spec graph) viable on top of SpecScore.

## Alternatives Considered

**Unified `schema` Doc-Kind with `kind: business | record` flag** — collapse the future entity-vs-recordset distinction into one shape from day one. Rejected as premature collapse: we have no recordset usage yet, and the two concepts (business object vs physical record shape) diverge once concrete checks, lifecycle, and storage concerns enter the picture. Shipping `entity` alone keeps the door open to either separate `recordset` later or a deliberate merge informed by real usage — premature unification closes both options.

**Inline-only properties (no separate Property Doc-Kind)** — properties live only inside their owning entity, with no standalone reusable form. Rejected because real cross-entity reuse (`email` across `User`, `Customer`, `Contact`; `id` across every entity in the system) is the stated MVP requirement, and inline-only would force copy-paste duplication that drifts. Property as a Doc-Kind costs one extra README in the meta-spec; the payoff is reuse with a single point of update.

**YAML sidecar files (`<slug>.entity.yaml`)** — the original sketch. Rejected because (a) it introduces a parallel doc-and-lint pipeline alongside SpecScore's Markdown story, (b) it breaks the adherence-footer contract that every existing SpecScore document carries, (c) it doesn't render inline in GitHub or in any Markdown viewer that treats the spec repo as a readable artifact. Markdown-with-YAML-frontmatter captures every parsing benefit of YAML without any of the dual-pipeline cost.

## MVP Scope

One cycle. Two new top-level Document-Kind features in spec/features/ (entity and property), each with full README per existing Feature schema and a worked example. The specscore CLI gains entity and property subcommands (list, refs, tree as applicable) and feature refs learns to surface entity references. specscore lint --fix renders the ## Properties body table from frontmatter and maintains the ## Referenced by section in every entity and property file. The document-types-registry feature is amended to allow multiple consumer-path globs per Kind (one-time relaxation to support both <slug>.entity.md and <slug>.property.md naming under spec/features/**). One real entity (e.g. a User entity used by an existing SpecScore feature) is authored and committed as a smoke test for the full pipeline. No work on recordset, override semantics, cross-repo imports, code generation, or datatug integration in this cycle.

## Not Doing (and Why)

- Recordset and field Doc-Kinds — separate follow-on Idea; recordsets are physical-shape (CSV, SQL tables, query results) and conflate with entities (business-shape) only superficially. Ship entity first; recordset's exact shape gets clearer once real entities are in use.
- Override semantics for inherited properties — child entities cannot redefine, tighten, or remove parent properties in MVP. Override rules (which checks compose, which replace, transitive override behavior) are a tar pit; defer until real reuse patterns demand it.
- Cross-repo @import / @from for property reuse — supply-chain, freshness, and versioning concerns are out of scope. v1 supports only same-repo references by URL or relative path.
- Feature-level consumes / produces declarations — letting a feature declare its input/output entities in frontmatter is the natural next step but a separate Idea. Need entities to exist before declaring what consumes them.
- i18n for singular / plural / description — every other SpecScore Doc-Kind is English-only. Adding multilingual metadata here forces the question for the whole spec system. Defer until a real consumer needs it.
- Central spec/entities/ directory — entities are owned by features and modules, not by a global namespace. A central dir creates ownership ambiguity in multi-team projects.
- Code generation, datatug.io UI integration, validation runtime — downstream consumers of the definition format. MVP delivers the spec and the lint contract; downstream tooling is out of scope and can iterate independently.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Long YAML frontmatter (entity definitions may reach 50–200+ lines for rich entities) remains readable and editable for spec authors — i.e., the source-of-truth-in-frontmatter choice doesn't degrade the authoring experience below an acceptable bar. | Hand-author 3 entities of varying complexity (a 3-property `City`, a 12-property `User`, a 25-property `Order` with nested checks). Acceptance: a reviewer can locate any property and its checks in under 10 seconds; no author reports the frontmatter is "unworkable" during the spike. |
| Must-be-true | Additive-only inheritance covers the realistic reuse patterns we will hit in year one — i.e., the override scenarios deferred to a follow-on Idea are genuinely rare, not a daily blocker. | Classify the first 5 inheritance use-cases that appear in real spec work after MVP ships. Acceptance: ≥4 of 5 are pure-additive; if 2+ require override, override gets pulled into MVP scope or a fast-follow Idea. |
| Must-be-true | The `document-types-registry` `Consumer Path` column can be relaxed from a single glob to a list of globs without cascading effects on other lint rules or registry consumers. | Trace every consumer of the registry's `Consumer Path` column (lint walkers, CLI commands, any docs that parse it) and confirm each handles a list. Acceptance: a draft amendment to `document-types-registry/README.md` covers all consumers, no schema-breaking change for already-shipped Document Kinds. |
| Should-be-true | The "anywhere under `spec/features/**`" placement convention scales to multi-team / multi-module projects without devolving into "where do I put this?" debate every time a new entity is introduced. | Interview 2–3 prospective multi-team users (or simulate via the 3 location options outlined in Open Questions for cross-cutting entities). Acceptance: a clear documented convention emerges from real usage within the first quarter, or a follow-on Idea formalizes one. |
| Should-be-true | A managed `## Properties` body table is worth the lint complexity over the alternative of rendering tables only at display time (e.g., on `specscore.md` or in SpecStudio). | Implement the managed table; measure whether reviewers consult it during code review. Acceptance: if the table is consulted in ≥30% of entity-related reviews, it earns its keep; otherwise the next iteration moves to render-only. |
| Might-be-true | Property-as-standalone-Doc-Kind earns its weight versus the simpler inline-only model — i.e., real users do define reusable Property files rather than always inlining. | Count Property files vs entities in real consumer repos at the 6-month mark. Acceptance: if Property file count is non-trivial (say, ≥0.3× entity count), the Doc-Kind earned it; if near zero, fold property definitions back inline and remove the Doc-Kind in a deprecation Idea. |
| Might-be-true | The CLI surface (`entity list/refs/tree`, `property list/refs`) is the right minimum — no additional verbs (`validate`, `diff`, `graph`) are blocking for v1. | Ship MVP and collect verb requests from the first 3 months of usage. Acceptance: any verb requested by ≥2 independent users is added; otherwise the minimum surface holds. |


## SpecScore Integration

- **New Features this would create:** `entity` (Document Kind, top-level under `spec/features/`), `property` (Document Kind, top-level under `spec/features/`).
- **Existing Features affected:**
  - `document-types-registry` — `Consumer Path` column relaxed from a single glob to a list of globs; two new rows added (`entity`, `property`); `Kind` and `URL` cross-checks extended to cover the new Kinds.
  - `feature` — `specscore feature refs` learns to surface entity references; no schema change to the Feature README itself in MVP (feature-level `consumes` / `produces` declarations are a follow-on Idea, not part of this one).
  - `adherence-footer` — two new canonical URLs registered (`entity-specification`, `property-specification`); no mechanism change.
  - `pkg/lint/` in the [`specscore-cli`](https://github.com/specscore/specscore-cli) — new lint passes for entity / property file validation, inheritance integrity (additive-only), managed `## Properties` table rendering, and `## Referenced by` maintenance.
- **Dependencies:** Builds on the [`adherence-footer-and-doc-type-registry`](adherence-footer-and-doc-type-registry.md) Idea (Implementing). MVP can begin once the Document Kind taxonomy and adherence-footer mechanism are stable.

## Open Questions

- **Where do cross-cutting entities (`Money`, `Address`, `Currency`) live when no single feature owns them?** Three plausible conventions, none picked for MVP — convention will emerge from real usage:
  - At the root `spec/` or `spec/features/` level (closest to "global namespace").
  - In a designated shared feature directory like `spec/features/shared/` or `spec/features/common/`.
  - In a domain-namespacing feature like `spec/features/finance/money.entity.md` — treating the cross-cutting domain as a first-class top-level feature.
- **Final naming for the Doc-Kind.** `entity` is the working term and reads cleanly, but is overloaded (DDD, ORM, ER-modeling). Alternatives to evaluate at spec time: `model`, `domain-object`, `business-object`. Lock in before authoring the Feature READMEs.
- **Is the `## Properties` body table committed to the file (managed by `specscore lint --fix`, round-tripped on every write) or rendered only at display time (by `specscore.md`, SpecStudio, or other surfaces)?** Committed-and-managed is symmetric with `## Referenced by` and keeps the rendered file self-contained on GitHub; render-only is simpler and avoids lint complexity. Decide before MVP implementation.
- **Should there be a soft lint warning when entity frontmatter exceeds N lines** (e.g., 150 or 200)? A readability guard against entities that have outgrown the single-file shape and should be split. Open to keep, drop, or defer.
- **Property reference syntax inside an entity's frontmatter `properties` list — relative path (`../shared/email.property.md`), URL (`https://...`), or both?** Both is the user's stated preference; lock in the exact YAML key (`ref`, `$ref`, `import`?) at spec time.
- **Behavior when an inherited entity's parent is modified** — does the child auto-inherit additions, or pin to a snapshot? MVP position: live inheritance (child always reflects current parent). Confirm at spec time.

---
*This document follows the https://specscore.md/idea-specification*

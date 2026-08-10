---
format: https://specscore.md/decisions-index-specification
---

# SpecScore Decisions

Decisions are durable, lintable records of choices made between two or more options — what was chosen, why, what was declined, and what was predicted. See the [Decision feature](../features/decision/README.md) for the full artifact schema, lifecycle, and validation rules.

## Decisions

| # | Decision | Status | Date | Tags | Affected |
|---|----------|--------|------|------|----------|
| [0001](0001-studio-url-scheme.md) | SpecScore Studio Deep-Link URL Scheme | Approved | 2026-05-22 | url, studio, contract, branding, security | `specscore-studio-app/spec/features/studio-url-scheme` — implements this Decision. Must be amended to match the new shape: drop `/project/` prefix, swap `:git_host/:org/:repo` route mount from child of `project` to top-level of `/app/`, fold ProjectSpecPage into ProjectPage with `#page=` view switching, retain handle parser but as dead code until a future handle Feature. Existing path-validation, allow-list, IDNA, ref/op, Referrer-Policy, and Referer-inference work carries forward without change., `specscore-cli` — URL emitter must move from `/app/p/...` (current short form) and `/app/project/...` (the just-implemented form) to `/app/{git_host}/...`. Existing emitted URLs in committed spec files (this repo, studio-app repo) become stale; a `specscore url rewrite` subcommand would be a natural follow-up. |
| [0002](0002-recap-storage-surfacing-and-producer-gate-boundary.md) | Recap/Verify Storage, Surfacing, and the Producer/Gate Boundary | Approved | 2026-06-02 | recap, verify, storage, hub, ci, agent-session, portfolio | `recap-artifacts-drift-and-session` (Idea) — amended: drift recap storage relocates from `spec/features/<slug>/_recap/<sha>.md` to the hub repo; session recap loses its `Draft → Final → Archived` lifecycle and `status:`, becomes an automatic journal rollup with optional notes., `specstudio-skills` `verify` / `recap` Features — `report-path` REQ changes from the in-repo `spec/features/<slug>/_verify\|_recap/<sha>.md` to a hub-repo path resolved via config (always the hub repo; a configured location, default dedicated, may equal the current repo); add the provenance metadata block; verify/recap remain agent-session skills, not CI., `session-recap` Feature (specscore) — revise per §4., `journal-and-summary` (Idea) — promote to Feature; `recap.completed` / `verify.completed` events carry `report_path` + counts and are the rollup source., `specscore-hub` (Idea) — consumes journal + detail; writes the hub repo on event ingest; optionally posts the PR deeplink on PR-open., `repo-config` Feature — `recaps:` / `journal:` blocks plus a storage-target setting; depends on `layered-config`. |
| [0003](0003-one-structural-language.md) | One Structural Language — ModelSpec Owns Structure | Approved | 2026-07-08 | architecture, modelspec, graphspec, entity, property, boundaries | graphspec, entity, property, modelspec-validation |
| [0004](0004-graphspec-kind-admission.md) | GraphSpec Kind Admission — Five Core Kinds | Approved | 2026-07-08 | graphspec, language-design, kinds, value-object, enum | graphspec |
| [0005](0005-graphspec-id-and-reference-syntax.md) | GraphSpec Identifier, Reference, and File-Naming Syntax | Approved | 2026-07-08 | graphspec, identifiers, references, naming, cross-repo | graphspec |
| [0006](0006-graphspec-model-source-location.md) | GraphSpec Model-Source Location and Module Identity by Placement | Approved | 2026-07-08 | graphspec, modelspec, models, discovery, identity | graphspec |
| [0007](0007-modelspec-reference-resolution.md) | ModelSpec Reference Resolution In SpecScore Trees | Approved | 2026-07-08 | graphspec, modelspec, references, resolution, cross-repo | graphspec, modelspec-validation |
| [0008](0008-graphspec-is-a-specscore-component.md) | GraphSpec Is A SpecScore Component, Not A Standalone Standard | Approved | 2026-07-08 | graphspec, positioning, configuration, reuse, scope | graphspec |
| [0009](0009-per-module-graph-roots.md) | Per-Module Graph Roots | Approved | 2026-07-08 | graphspec, discovery, modules, configuration, multi-root | graphspec |
| [0010](0010-references-are-urls.md) | References Are URLs | Approved | 2026-07-08 | references, linkage, modelspec, source-references, syntax | graphspec, source-references, modelspec-validation |
| [0011](0011-addressable-model-concepts.md) | Addressable Model Concepts and Kind Segments | Approved | 2026-07-08 | modelspec, references, namespaces, collections, recordsets | graphspec, modelspec-validation |
| [0012](0012-role-labeled-endpoints-and-participants.md) | Role-Labeled Relationship Endpoints and Event Participants | Approved | 2026-07-08 | graphspec, relationships, events, roles, semantics | graphspec |
| [0013](0013-rules-and-policies.md) | Rules and Policies — A Machine-Checkable Home for Domain Constraints | Approved | 2026-07-08 | graphspec, policy, rules, lifecycle, permissions, fragments | graphspec |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/decisions-index-specification*

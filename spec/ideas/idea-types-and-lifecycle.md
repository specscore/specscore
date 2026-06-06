---
format: https://specscore.md/idea-specification
status: Draft
---

# Idea: Idea Types and Lifecycle

**Status:** Draft
**Date:** 2026-05-19
**Owner:** alex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we make the "change request" concept discoverable and trackable within the existing Idea entity — without inventing a separate artifact type — and codify the multi-phase Feature delivery pattern that uses change-request ideas as the mechanism?

## Context

The proposal primitive is forward-referenced from two existing canonical Features — `spec/features/feature/README.md` describes proposals as "change requests attached to a feature" living at `{feature}/proposals/<slug>.md` with lifecycle `draft → submitted → approved → implemented`, and `spec/features/plan/README.md` accepts `change-request` as a valid `Source type` value with the proposal as the trigger object. But the canonical `proposal` Feature itself does not yet exist at `spec/features/proposal/`. The directory `spec/features/proposals/` is not present anywhere in the spec tree, so newcomers reading either of the forward references hit a dead link.

Terminology drifts across the same concept: prose mentions "proposal", the SpecScore.Studio toolbar's URL grammar exposes the action as `?op=request-change` and labels the link "Request change" (per `spec/ideas/studio-toolbar.md` and the rendered Feature READMEs), the `plan` Feature uses the value `change-request` in its `Source type` field, and informal team talk uses "change request". A newcomer cannot easily tell that all four labels point at the same object.

The pattern of phased Feature delivery surfaced concretely in `spec/ideas/journal-and-summary.md`: Phase 1 ships as a Feature (defines the new capability), Phase 2 ships as a proposal attached to that Feature (mutates the capability once a prerequisite Feature lands). The pattern is reusable across SpecScore — any time a capability has a "ships now" core and a "lights up later" extension blocked on a separate Feature, the same shape applies — but the convention lives nowhere canonical.

Crucially, the existing `idea` Feature spec (`spec/features/idea/README.md`) explicitly forbids ideas under features via **REQ: idea-location**: "Ideas in `spec/features/*/ideas/`, or any other location are rejected by validation." This requirement must be relaxed to allow change-request ideas to live under their target feature.

The existing idea lifecycle (`Draft → Under Review → Approved → Implementing → Specified`) uses `Specified` as a terminal state meaning "all downstream Features are Stable." This is counterintuitive — "specified" naturally reads as "has been turned into a specification," not "is completely finished." Additionally, there is no positive terminal state meaning "done and stays visible" distinct from `Archived` (which means "abandoned/superseded and hidden from listings").

## Recommended Direction

**Proposals are ideas, not a separate entity.** A proposal (also called a change request) is an idea with `**Type:** change-request` and a `**Targets:**` field pointing at an existing Feature. This eliminates the need for a new artifact type, reuses the existing idea schema and tooling, and ensures all ideas — whether greenfield or targeted — appear in one unified list.

Land three coordinated changes:

**(1) Extend the `idea` entity with `Type:` and `Targets:` fields.** Add two optional header fields to the idea schema:

- `**Type:**` — `feature-request` (default; can be omitted) | `change-request`. Determines whether the idea is greenfield or a mutation of an existing Feature.
- `**Targets:**` — optional feature slug. Required when Type is `change-request`. Absent for feature-request ideas.

Relax **REQ: idea-location** to allow ideas with Type `change-request` to reside at `spec/features/<feature-slug>/proposals/<slug>.md`. The `proposals/` directory name signals intent (these ideas propose changes to the parent feature) while the entity type remains `idea`. The title prefix for change-request ideas is `# Proposal: <Title>` — lint accepts this alongside `# Idea: <Title>` as a valid dispatch key for idea validation.

**(2) Unify and extend the idea lifecycle with `Specified` (redefined) and `Implemented`.** Replace the current terminal meaning of `Specified` and add `Implemented`:

```
Draft → Under Review → Approved → Specifying → Specified → Implementing → Implemented
                                                                          → Archived (from any state)
```

| Status | Meaning | Visible in default listing? |
|---|---|---|
| `Draft` | First write, author iterating | Yes |
| `Under Review` | Feedback requested from stakeholders | Yes |
| `Approved` | Direction accepted, ready for detailed specification | Yes |
| `Specifying` | Detailed spec/Feature/plan being written — WIP | Yes |
| `Specified` | Detailed AC / plan exists, work hasn't started | Yes |
| `Implementing` | Work in progress | Yes |
| `Implemented` | Done — the change landed or the promoted Feature shipped | Yes |
| `Archived` | Abandoned, superseded, or no longer relevant | **No** — requires `--include-archived` |

For **feature-request ideas**, statuses from `Specifying` onward are derived automatically from the downstream Feature's status:

| Idea status | Auto-trigger |
|---|---|
| `Specifying` | Feature created with `Source Ideas:` referencing this idea (Feature at `Draft` or `Under Review`) |
| `Specified` | Referenced Feature reaches `Approved` |
| `Implementing` | Referenced Feature reaches `Implementing` |
| `Implemented` | Referenced Feature reaches `Stable` |

For **change-request ideas**, `Specifying` / `Specified` / `Implementing` / `Implemented` are author-managed (or tooling-assisted when signals like plan creation or `Verifies:` commit trailers are available), since they don't promote to new Features — they mutate existing ones.

`Archived` ideas are hidden from `specscore idea list` by default and require `--include-archived` to surface. All other statuses (including `Implemented`) remain visible — implemented ideas are recent history that readers should see without opt-in.

**(3) Codify the phased-delivery pattern and surface change-request ideas on Feature READMEs.** Add prose to `feature/README.md` explaining: "If a Feature's implementation is naturally split into ordered phases where later phases depend on prerequisites not yet ready, Phase 1 ships as the Feature itself and subsequent phases ship as change-request ideas (proposals) attached to it. Each phased proposal SHOULD carry an optional `**Phase:**` metadata field (free-form string — e.g. `2`, `post-launch`, `foundation`)." Add a new `## Proposals` index section to the Feature README convention, auto-generated by lint from filesystem state at `{feature}/proposals/`, listing each change-request idea with status, optional phase label, and title. The section is auto-omitted when the directory is empty.

**CLI surface:**

- `specscore idea new --type change-request --targets <feature-slug>` — scaffolds a change-request idea under the target feature's `proposals/` directory.
- `specscore proposal new <feature-slug>` — sugar alias for the above.
- `specscore idea list` — scans both `spec/ideas/` and `spec/features/*/proposals/` by default. Excludes `Archived` by default.
- `specscore idea list --include-archived` — includes archived ideas.
- `specscore idea list --scope ideas-only` — scans only `spec/ideas/` (narrowing filter).
- `specscore idea list --scope features-only` — scans only `spec/features/*/proposals/`.
- `specscore idea list --type change-request` — filters to change-request ideas only.
- `specscore idea list --targets <feature-slug>` — filters to ideas targeting a specific feature.

**Index generation:** `spec/ideas/README.md` includes all ideas (both feature-request and change-request) with type-grouped sections. Change-request ideas living under features are included in the index via their `Targets:` metadata and filesystem location. One index file — no separate `CHANGE-REQUESTS.md`.

**Terminology convention:** "Proposal (also called a change request)" on first prose mention per document. "Proposal" is canonical in filesystem paths (`proposals/`), CLI commands, and title prefixes. "Change request" is the alias for discoverability. The studio toolbar's `?op=request-change` verb is documented as the user-facing entry point that creates a change-request idea.

## Alternatives Considered

1. **Create a separate `proposal` artifact type with its own schema, lifecycle, and CLI commands.** This was the original direction of this Idea. Lost because: a proposal is conceptually an idea with a target. Creating a separate entity doubles the schema surface, lint rules, CLI commands, and index generation — all for something that can be expressed with two optional fields (`Type:`, `Targets:`) on the existing idea schema. The triage-issue skill's 4-way classification also simplifies when proposals and feature-request ideas are the same entity type with different metadata.
2. **Rename the `proposals/` directory to `ideas/` under features.** Lost because `proposals/` communicates the *role* — "these are ideas that propose changes to this feature." A directory named `ideas/` under a feature could be confused with "random brainstorming about this feature." The directory name signals intent.
3. **Keep all ideas in `spec/ideas/` only (no feature-scoped location).** Lost because co-location matters — when working on a feature, seeing its pending change-request ideas physically next to it in the filesystem is more intuitive than "go search global ideas with a Targets filter." The `## Proposals` section on Feature READMEs mitigates this somewhat, but physical co-location is stronger.
4. **Require `--include features` flag to see change-request ideas in `specscore idea list`.** Lost because this contradicts the core goal of "see all ideas in one list." Hiding change-request ideas by default recreates the discoverability problem that motivated collapsing proposals into ideas. The default should show everything; narrowing filters (`--scope ideas-only`) are available for when you want less.
5. **Create separate index files per type (`CHANGE-REQUESTS.md`, `FEATURE-REQUESTS.md`).** Lost because most projects will have 5–20 total ideas — more index files than useful content. Type-grouped sections within one `README.md` scale to hundreds before needing segmentation.
6. **Drop the proposal concept entirely and use sibling Features for every phase.** Lost because a Phase-2-style change is structurally a *mutation* of an existing capability, not a new capability. Sibling Features double up the spec surface and weaken the spec-vs-mutation distinction.
7. **Make phases a first-class metadata concept on Features without going through change-request ideas.** Lost because phases are exactly when a Feature gets mutated over time; the idea lifecycle already encodes the state machine a phase needs. Inventing a parallel `Phase Status` concept duplicates state.

## MVP Scope

A focused release that extends the `idea` entity and surfaces change-request ideas on Feature READMEs:

1. **Schema extension:** Add `**Type:**` and `**Targets:**` optional header fields to the idea entity. Relax REQ: idea-location to allow `spec/features/<feature>/proposals/<slug>.md` for change-request ideas.
2. **Lifecycle extension:** Add `Specifying` (WIP spec being written) and `Implemented` (positive terminal). Redefine `Specified` to mean "detailed spec exists, work hasn't started" (breaking change to current derived-status semantics — see Key Assumptions). `Specifying` auto-derived for feature-request ideas when a Feature is created referencing the idea. Add `Archived` visibility rule: hidden from default `specscore idea list`, requires `--include-archived`.
3. **CLI:** `specscore idea new --type change-request --targets <feature>` scaffolds under the feature. `specscore proposal new` as alias. `specscore idea list` scans both paths by default with `--scope`, `--type`, `--targets`, and `--include-archived` filters.
4. **Index:** `spec/ideas/README.md` includes type-grouped sections covering all ideas regardless of filesystem location.
5. **Feature README convention:** `## Proposals` auto-generated index section from `{feature}/proposals/` filesystem state when non-empty.
6. **Phased-delivery convention:** Prose in `feature/README.md` explaining when and how to use change-request ideas for phased delivery, with the optional `**Phase:**` string field.
7. **Terminology pass:** Introduce "proposal (also called a change request)" on first use across `feature/README.md`, `plan/README.md`, and CLI help text. Update forward references to point at the `idea` Feature (extended) rather than a non-existent `proposal` Feature.

The release ships no studio UI changes (the toolbar verb `?op=request-change` is already locked), no rename of the `proposals/` directory convention, and no backfill of `## Proposals` sections on Features that have never had a change-request idea. Success: a reader of a Feature README can see at a glance "what proposals are open against this capability?" and `specscore idea list` surfaces all ideas — greenfield and targeted — in one unified view.

## Not Doing (and Why)

- Creating a separate `proposal` artifact type — proposals are ideas with `Type: change-request`; a separate entity doubles surface area without adding semantic value
- Renaming the `proposals/` directory to `ideas/` or `change-requests/` — `proposals/` communicates role and matches existing forward references
- Auto-scaffolding placeholder proposals for planned future phases — proposals should be drafted when their acceptance criteria are knowable, not stubbed as forward declarations
- Cross-Feature proposals (a single idea that mutates multiple Features simultaneously) — out of scope; if the use case becomes real it deserves a different mechanism
- Forcing the `## Proposals` index section onto Features with zero proposals — lint emits the section only when filesystem state has content
- Separate index files per type (`CHANGE-REQUESTS.md`) — type-grouped sections in `README.md` suffice until scale demands segmentation
- Changing the studio toolbar verb spelling from `?op=request-change` — already locked; this Idea documents the verb but does not touch its wire format
- Backfilling Phase metadata on existing Features — the convention is forward-looking
- Specifying the exact `Specified` derivation rules for feature-request ideas in this Idea — the redefinition of `Specified` and the derivation mechanics belong in the `idea` Feature spec update, not here; this Idea establishes the intent and rationale

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Relaxing REQ: idea-location to allow `spec/features/<feature>/proposals/<slug>.md` does not break existing lint rules or create ambiguous file-type resolution (the `# Proposal:` title prefix is sufficient for lint to identify the file as an idea and apply idea validation rules). | Sketch the updated lint dispatch: `# Idea:` → idea rules, `# Proposal:` → idea rules (with change-request-specific checks for `Type` and `Targets`). Confirm no collision with Feature or Plan title prefixes. |
| Must-be-true | Redefining `Specified` from "all downstream Features are Stable" to "detailed spec exists, work hasn't started" is a manageable breaking change — no existing repos have ideas at `Status: Specified` that would break, or the migration path is trivial. | Scan all known SpecScore-managed repos for ideas with `Status: Specified`. If any exist, define the migration: they would move to `Implemented` under the new semantics (since `Specified` in the old sense = "done"). |
| Must-be-true | `specscore idea list` scanning both `spec/ideas/` and `spec/features/*/proposals/` is fast enough to be the default (no perceptible latency penalty for typical repos with ≤50 features). | Benchmark the glob on a repo with 50 feature directories. If latency exceeds 100ms, the scan is still the default but the implementation needs optimization (cached file listing, parallel reads). |
| Must-be-true | The `idea` Feature spec can be updated to support two valid title prefixes (`# Idea:` and `# Proposal:`) without creating a lint dispatch ambiguity or requiring a separate "proposal" rule set. Both dispatch to the same validation with `# Proposal:` additionally requiring `Type: change-request` and `Targets:` to be present. | Prototype the lint rule change; confirm single rule set with conditional requirements based on title prefix. |
| Should-be-true | The optional `**Phase:**` string field (free-form label, UI-sorted by definition order) is sufficient for phased delivery — no structured phase-graph (DAG with explicit `depends_on`) is needed in v1. | Confirm with the journal-and-summary Idea: does Phase 2 depend on anything other than "a foundational layered-config Feature shipped"? If real phases need a graph, expand the field to a structured block later; if they remain a labeled sequence, a bare string suffices. |
| Should-be-true | Authors of change-request ideas will find the `Specified → Implementing → Implemented` progression natural even though these statuses are not automatically derived (unlike feature-request ideas where tooling manages the transitions). | Dogfood on 5 change-request ideas. If manual status management feels like busywork, add tooling hooks (e.g., detect linked plan creation → auto-advance to `Specified`; detect commit with `Verifies:` trailer → offer `Implemented` transition). |
| Should-be-true | The "proposal (also called a change request)" terminology pattern does not confuse readers — i.e., introducing the alias reads as helpful clarification rather than ambiguity about which is canonical. | Read sample copy aloud to 2–3 SpecScore users. If the alias creates confusion, fall back to "proposal" as the sole term with "change request" only in a glossary entry. |
| Might-be-true | Future tooling will benefit from a `**Proposals:**` managed-state line in Feature README frontmatter (listing change-request idea slugs) in addition to the `## Proposals` index section. | Defer; the auto-generated section is sufficient. If cross-Feature queries need structured back-references, add as a follow-on. |

## SpecScore Integration

- **New Features this would create:** None. This Idea extends the existing `idea` Feature rather than creating a new artifact type.
- **Existing Features affected:**
  - `idea` — gains `Type:` and `Targets:` optional header fields; gains `Implemented` status; `Specified` is redefined; REQ: idea-location is relaxed to allow `spec/features/<feature>/proposals/`; title format accepts `# Proposal:` as equivalent dispatch key; index generation extended to scan feature-scoped proposals.
  - `feature` — gains the phased-delivery convention prose, the `## Proposals` auto-generated index section, and updates the forward reference from "proposals (a separate Feature TBD)" to "change-request ideas (defined in the `idea` Feature)".
  - `plan` — updates the forward reference; the `Source type: change-request` enum value stays unchanged, now pointing at a change-request idea as the source object.
  - `ideas-index` — extended to include type-grouped sections and scan `spec/features/*/proposals/`.
- **Dependencies:** None hard-blocking. Sequencing-wise, this ideally lands before any concrete change-request idea is authored — notably `journal-and-summary` Phase 2.

## Resolved Decisions

- **Entity model:** Proposals are ideas with `Type: change-request`, not a separate artifact type. This eliminates a full entity (schema, lint, CLI, index) in favor of two optional fields on an existing entity.
- **Terminology:** "Proposal" is the canonical name — filesystem (`proposals/`), CLI (`specscore proposal new`), title prefix (`# Proposal: <Title>`), section headings (`## Proposals`). "Change request" is the alias, introduced as "proposal (also called a change request)" on first prose mention. Rationale: one word, broader semantics (covers removals/restructuring), consistent with single-word artifact naming.
- **File location:** Change-request ideas live at `spec/features/<feature>/proposals/<slug>.md`. Co-location with the target feature. `specscore idea list` scans both locations by default.
- **CLI default:** `specscore idea list` shows everything (both paths, excludes only `Archived`). Narrowing via `--scope`, `--type`, `--targets` filters. `--include-archived` for hidden ideas.
- **Index strategy:** One `spec/ideas/README.md` with type-grouped sections. No separate per-type index files.
- **Section heading on Feature READMEs:** `## Proposals` — matches filesystem, terse.
- **Title prefix:** `# Proposal: <Title>` for change-request ideas. Lint accepts both `# Idea:` and `# Proposal:` as valid dispatch keys for idea validation.
- **CLI command:** `specscore proposal new <feature-slug>` as sugar for `specscore idea new --type change-request --targets <feature-slug>`.
- **Lifecycle:** Unified across both types. `Specifying` added (WIP spec being written — auto-set when a non-approved Feature artifact is created for feature-request ideas). `Specified` redefined to mean "detailed spec/AC exists, work not started." `Implemented` added as positive terminal (visible). `Archived` is negative terminal (hidden from default listings).
- **Directory name under features:** `proposals/` — communicates role ("these propose changes") better than `ideas/` which could mean "random brainstorming."
- **Phase field:** Optional string (`**Phase:** 2`, `**Phase:** post-launch`, `**Phase:** 2a`). Most change-request ideas won't use it — only relevant for phased delivery. String rather than integer because: semantic labels (`foundation`, `post-launch`) communicate intent better than arbitrary numbers; sub-phases (`2a`) are possible; UI sorts phases in document-definition order (the order proposals appear in the `## Proposals` index), which adds value to the Studio product without requiring numeric parsing. No structured block or `depends_on` in v1.
- **Proposals index ordering:** Status-first (active before implemented), then phase in definition order when present, then date as tiebreaker. Primary question is "what's pending?" — so non-terminal statuses sort above `Implemented`.
- **Retention of Implemented proposals:** Keep in place at `{feature}/proposals/<slug>.md`. No move to `implemented/` subdirectory. Lint filters the `## Proposals` index to show active vs implemented grouping. Parallels how `Implemented` ideas in `spec/ideas/` stay in place (only `Archived` moves).
- **Specified derivation (feature-request ideas):** Derived automatically — `Specified` fires when the referenced Feature reaches `Approved`. For change-request ideas, author-managed. Exact derivation rules belong in the `idea` Feature spec update.
- **Title prefixes:** Two only — `# Idea:` and `# Proposal:`. No `# Change Request:` prefix. Conservative — extend later if user demand exists. "Change request" lives in prose and CLI aliases, not in title dispatch.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/idea-specification*

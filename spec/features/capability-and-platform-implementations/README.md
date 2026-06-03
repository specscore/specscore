# Feature: Capability and Platform Implementations

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-and-platform-implementations?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-and-platform-implementations?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-and-platform-implementations?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-and-platform-implementations?op=request-change) |
**Status:** Implementing
**Date:** 2026-06-03
**Owner:** alexander.trakhimenok
**Source Ideas:** capability-and-platform-implementations
**Supersedes:** —
**Grade:** A

## Summary

Defines two roles on the existing SpecScore Feature: a **Capability** (a platform-agnostic feature definition) and an **Implementation** (one platform's realization of it). An Implementation links upward with an `**Implements:**` reference reusing the [source-references](../source-references/README.md) notation, so the link works across repositories. The Capability owns a single author-declared **Implementation Matrix** that records each platform's parity level and a one-line brief — making cross-surface feature drift visible at the spec layer instead of silent.

## Problem

A product that ships the same feature on multiple surfaces (the motivating case: datatug, with a CLI and a Web UI, often in separate repositories like `datatug-cli` and `datatug-web`) drifts: one surface gets a feature first, or a richer version, because of technical limits or uneven dev resources. SpecScore today has no first-class way to say "Dashboards is *one* feature; Web ships the rich-graph version, CLI ships a data-only subset, here is the status of each." A reader of the CLI spec gets no structured pointer to the Web equivalent, and nothing flags that the two diverged. The drift is real but invisible at the spec layer, and any naive fix (a parity table copied into each platform's README) re-creates the same drift across N repos.

## Behavior

### Roles

A Capability and an Implementation are both ordinary Features distinguished by structural markers — no new Document Kind is introduced.

#### REQ: capability-role

A Feature is a **Capability** when it contains an `## Implementation Matrix` section. A Capability's acceptance criteria MUST describe behavior that holds on every platform and MUST NOT specify platform-specific UX (e.g. "renders an interactive graph"); platform-specific behavior belongs in an Implementation.

#### REQ: implementation-role

A Feature is an **Implementation** when its body metadata contains an `**Implements:**` reference. An Implementation MUST specify only its platform-specific behavior and its deltas from the Capability — including criteria the platform tightens, relaxes, or cannot meet (e.g. "data-only, no graph") as explicit, documented limitations rather than undocumented gaps.

### The Implements reference

#### REQ: implements-field

An Implementation MUST declare exactly one `**Implements:** <reference>` line in its body metadata, where `<reference>` uses the [source-references](../source-references/README.md) `specscore:` notation pointing at the Capability Feature (e.g. `specscore:feature/dashboards`).

#### REQ: implements-cross-repo

When the Capability lives in a different repository, the `**Implements:**` reference MUST append the `@{host}/{org}/{repo}` suffix defined by source-references (e.g. `specscore:feature/dashboards@github.com/datatug/datatug`). When the Capability is in the same repository, the suffix MUST be omitted.

#### REQ: implements-resolution

`specscore spec lint` MUST validate the `**Implements:**` reference: a same-repo reference is an error if it does not resolve to an existing Capability Feature; a cross-repo reference is an error only if its notation is malformed (cross-repo *liveness* is not checked at lint time — see Open Questions).

### The Implementation Matrix

#### REQ: matrix-section

A Capability MUST own exactly one `## Implementation Matrix` section: a Markdown table with the columns `Platform`, `Status`, `Brief`, and `Link`, with one row per platform Implementation. The `Link` cell uses the source-references notation pointing at that Implementation.

#### REQ: matrix-status-vocabulary

Each matrix row's `Status` cell MUST be one of `Full`, `Partial`, `Planned`, or `Absent` — the platform's *parity level* against the Capability. Any other value is a lint error.

#### REQ: matrix-index-only

The `Brief` cell MUST be a single line summarizing the platform's variance (e.g. "Data-only, no graphs"). The matrix MUST NOT restate the Implementation's behavior; authoritative platform behavior lives only in the Implementation Feature.

#### REQ: matrix-author-declared

In this version the Implementation Matrix is author-maintained: `specscore spec lint` validates the table's shape (required columns, allowed status vocabulary, one-line brief, resolvable links) but performs NO cross-repo status rollup and does not auto-populate or auto-correct status cells. Drift between a declared status and the real Implementation is therefore possible but visible to any reader of the Capability.

### Cross-references and tree organization

#### REQ: other-platforms-section

An Implementation MAY include an `## Other Platforms` section listing sibling Implementations by source-references link. This section carries links only; it MUST NOT duplicate parity status, which is authoritative solely in the Capability's Implementation Matrix.

#### REQ: parallel-and-colocated-trees

Implementations MAY live in separate per-platform spec trees, including separate repositories from the Capability. Co-locating the Capability and its Implementations under a single feature folder in one repository is permitted as the single-repository special case; neither layout changes the `**Implements:**` and Implementation Matrix contract.

## Acceptance Criteria

### AC: capability-marker (verifies REQ:capability-role)

**Given** a Feature README that contains an `## Implementation Matrix` section
**When** `specscore` classifies the Feature's role
**Then** the Feature is recognized as a Capability.

### AC: implementation-marker (verifies REQ:implementation-role)

**Given** a Feature README whose body metadata contains an `**Implements:**` line
**When** `specscore` classifies the Feature's role
**Then** the Feature is recognized as an Implementation.

### AC: implements-single-same-repo (verifies REQ:implements-field)

**Given** an Implementation in the same repository as its Capability `dashboards`
**When** its body metadata declares `**Implements:** specscore:feature/dashboards`
**Then** `specscore spec lint` accepts the reference and reports no violation for it.

### AC: implements-cross-repo-suffix (verifies REQ:implements-cross-repo)

**Given** an Implementation in `datatug-cli` whose Capability lives in `github.com/datatug/datatug`
**When** its body metadata declares `**Implements:** specscore:feature/dashboards@github.com/datatug/datatug`
**Then** `specscore spec lint` accepts the cross-repo reference as well-formed.

### AC: implements-unresolved-same-repo (verifies REQ:implements-resolution)

**Given** an Implementation declaring `**Implements:** specscore:feature/no-such-capability` in the same repository
**When** `specscore spec lint` runs
**Then** lint reports an error that the Implements reference does not resolve.

### AC: implements-non-capability (verifies REQ:implements-resolution)

**Given** an Implementation declaring `**Implements:** specscore:feature/source-references` that resolves to an existing Feature lacking an `## Implementation Matrix` section
**When** `specscore spec lint` runs
**Then** lint reports an error that the Implements target is not a Capability.

### AC: matrix-shape (verifies REQ:matrix-section)

**Given** a Capability whose `## Implementation Matrix` table is missing the `Status` column
**When** `specscore spec lint` runs
**Then** lint reports an error that the Implementation Matrix is missing a required column.

### AC: matrix-bad-status (verifies REQ:matrix-status-vocabulary)

**Given** a Capability whose Implementation Matrix has a row with `Status` value `Done`
**When** `specscore spec lint` runs
**Then** lint reports an error that `Done` is not one of `Full`, `Partial`, `Planned`, `Absent`.

### AC: matrix-brief-single-line (verifies REQ:matrix-index-only)

**Given** a Capability whose Implementation Matrix `Brief` cell contains multiple lines of platform behavior
**When** `specscore spec lint` runs
**Then** lint reports an error that the Brief must be a single line.

### AC: matrix-no-rollup (verifies REQ:matrix-author-declared)

**Given** a Capability with a hand-authored Implementation Matrix and a same-repo Implementation whose lifecycle differs from the declared parity status
**When** `specscore spec lint --fix` runs
**Then** the matrix status cells are left unchanged (no auto-rollup is performed).

### AC: other-platforms-links-only (verifies REQ:other-platforms-section)

**Given** an Implementation whose `## Other Platforms` section restates a parity status (e.g. "Web: Full")
**When** `specscore spec lint` runs
**Then** lint reports an error that parity status must not be duplicated outside the Capability's Implementation Matrix.

### AC: colocated-layout-valid (verifies REQ:parallel-and-colocated-trees)

**Given** a Capability and its CLI and Web Implementations co-located in one repository under a single feature folder
**When** `specscore spec lint` runs
**Then** `specscore spec lint` reports no violations, and each Implementation's `**Implements:**` reference resolves to the co-located Capability as a same-repo reference.

## Rehearse Integration

Rehearse decision: every AC has a concrete `specscore spec lint` / `lint --fix` CLI surface, so all twelve are testable (none skipped as subjective). Stub scaffolding under `_tests/` is deferred to the Plan/Implement phase so the stub set tracks the final lint-rule task breakdown rather than being authored twice.

## Not Doing / Out of Scope

- Verifying actual feature parity from source code — SpecScore tracks *declared* parity and limitations, not whether the CLI's code truly matches the Web's.
- Mandatory cross-repo status fetch/reconciliation at lint time — the matrix is author-declared in this version; automated cross-repo liveness is deferred (Open Questions).
- New `capability` / `implementation` Document Kinds — modeled as roles on the existing Feature Kind.
- A dedicated `specscore capability` CLI command group — `specscore feature` navigation suffices once `Implements:` is a known reference type.
- An enumerated platform registry or per-platform schema — the matrix is an open list of platforms by name.
- Auto-generating Implementation stubs from a Capability.

## Assumption Carryover

From the source Idea, this Feature commits to validating:

- **Cross-repo `Implements:` references are workable and validatable** — addressed by reusing source-references notation (REQ:implements-cross-repo, REQ:implements-resolution); the cross-repo *liveness* assumption remains open.
- **An author-declared matrix beats invisible drift** — encoded directly in REQ:matrix-author-declared and AC:matrix-no-rollup. **Deliberate narrowing of the Idea:** the Idea's Recommended Direction proposed a `lint --fix` status rollup for *same-repo* implementations (the `## Referenced by` idiom). This Feature intentionally drops that, making the matrix uniformly author-declared in every layout — so authors learn one rule, and same-repo behavior never silently diverges from the cross-repo case. The rollup remains a candidate for a future iteration.
- **The Capability/Implementation split maps onto the Feature graph without a new Kind** — encoded in REQ:capability-role / REQ:implementation-role.
- **The matrix-as-index boundary holds** — encoded in REQ:matrix-index-only and AC:matrix-brief-single-line.

The Idea's "might-be-true" assumptions (CI reconciliation demand; whether `## Other Platforms` earns its keep) are not yet validated by this Feature and remain in Open Questions / future iterations.

## Open Questions

- How should cross-repo status reconciliation work when lint cannot read sibling repos — author-declared only (this version), CI-fetched, or a published capability registry that Implementations register against?
- When surfaces live in separate repos, which repo owns the Capability — a dedicated shared spec repo, or one platform repo designated canonical — and how is that ownership discoverable from the Implementations?
- Should `**Implements:**` references be version-pinned (a CLI Implementation tracking v1 while Web moves to v2), or always track the Capability's head?

---
*This document follows the https://specscore.md/feature-specification*

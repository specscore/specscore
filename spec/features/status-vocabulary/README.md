---
format: https://specscore.md/feature-specification
status: Approved
---
# Feature: Status Vocabulary

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/status-vocabulary?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/status-vocabulary?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/status-vocabulary?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/status-vocabulary?op=request-change) |
**Status:** Approved
**Source Ideas:** —

## Summary

A single canonical definition of the lifecycle status values used by every status-bearing SpecScore artifact (Idea, Feature, Plan, Decision, sidekick Seed). Status values are organized by **lifecycle role**; each role has **one shared term** reused across artifacts, and every deviation from the shared term is an **explicitly documented conscious divergence** with a rationale (not silent drift). This Feature also establishes that **archival is orthogonal to status** — an axis of storage/visibility, never a status value. It is the source of truth the per-artifact Features ([idea](../idea/README.md), [feature](../feature/README.md), [plan](../plan/README.md), [decision](../decision/README.md)) conform to, complementing [artifact-frontmatter-convention](../artifact-frontmatter-convention/README.md), which governs *where* status is carried (body-canonical + frontmatter mirror) while this Feature governs *which values are legal*.

## Problem

Each artifact type historically defined its own status enum, with no shared reference. The predictable result was cross-artifact drift in words that mean the same thing:

- The **review** role was `Under Review` for Idea and Feature but `In Review` for Plan.
- The **in-progress** role was `Implementing` for Idea and Feature but `Executing` for Plan.
- Plans in the wild carried `Completed`, a value no spec defined (the intended `Implemented`).
- `Archived` was used as a *status* for Idea and Seed, conflating two orthogonal axes — *why the lifecycle ended* (rejected? shipped? abandoned?) with *whether the artifact is filed away*. An `Archived` artifact had lost its real terminal outcome.

The [plan](../plan/README.md) Feature already gestured at "the SpecScore-wide status vocabulary used by Features and Ideas," but no such shared definition existed — each spec was its own authority, so the vocabularies diverged silently. This Feature creates the missing shared authority so divergence becomes a deliberate, documented choice rather than an accident.

## Behavior

### Scope and conventions

#### REQ: status-bearing-scope

This vocabulary governs the **document artifacts** that carry a lifecycle `**Status:**`: Idea, Feature, Plan, Decision, and sidekick Seed. The **execution-layer** artifacts — [Task](../task/README.md) (`planning`, `queued`, `in_progress`, `blocked`, `complete`, `failed`, `aborted`) and Issue (`open`, `investigating`, `resolved`, `rejected`) — are deliberately **out of scope**: they use lowercase/snake_case vocabularies owned by their own Features because they model fast-moving execution/tracker state, not document lifecycle. This Feature MUST NOT be read to constrain those two.

#### REQ: title-case-convention

Every status value governed by this Feature MUST be **Title Case**, and multi-word values MUST use a single ASCII space (e.g., `In Review`, never `in-review`, `Under_Review`, or `inreview`). This matches the existing document-artifact convention and distinguishes governed statuses from the out-of-scope execution-layer lowercase vocabularies.

### Lifecycle roles and shared terms

A **lifecycle role** is a semantic phase an artifact can be in. Each role has exactly one canonical shared term; an artifact that has that role MUST use the shared term unless this Feature documents a divergence for it (see [Documented divergences](#documented-divergences)).

#### REQ: lifecycle-roles

The canonical lifecycle roles and their shared terms are:

| Role | Shared term | Typically set by |
|---|---|---|
| Initial | `Draft` | Human author |
| Review | `In Review` | Human author |
| Approved | `Approved` | Human author |
| In-progress | `Implementing` | Human author (or derived) |
| Change-in-flight | `Amending` | Human author |
| Blocked | `Blocked` | Derived |
| Done | `Implemented` | Human author (or derived) |
| Failed | `Failed` | Derived |
| Rejected | `Rejected` | Human author |
| Parked | `Stale` | Human author |
| Replaced | `Superseded` | Human author |
| Retired | `Deprecated` | Human author |

An artifact need not have every role; it MUST, for each role it does have, use the shared term unless a divergence is documented.

#### REQ: shared-prep-band

Every reviewable document artifact (Idea, Feature, Plan, Decision) MUST use the shared human-authored prep band `Draft` → `In Review` → `Approved`. In particular the review role MUST be spelled `In Review` (not `Under Review`), and the approved role MUST be `Approved` (not `Accepted` or any other word).

### Documented divergences

Each REQ below records a **conscious** deviation from a shared term. These are the *only* permitted divergences; any other deviation is non-conformant drift.

#### REQ: seed-queued-initial

A sidekick Seed uses `Queued` for its initial role instead of `Draft`, and has **no** review or approved band. Rationale: a seed is a lightweight capture parked for later triage, not a document drafted and reviewed; it goes directly from `Queued` to a terminal outcome.

#### REQ: plan-executing-derived

A Plan uses `Executing` for the in-progress role instead of `Implementing`. Rationale: a Plan's in-progress state is **derived by `specscore spec lint --fix`** from the rollup of its task statuses (per [plan#req:execution-status-derived](../plan/README.md#req-execution-status-derived)) — it reflects "tasks are executing," a machine-derived rollup distinct from a human-set "being built." The derivation mechanism is owned by the plan Feature; this Feature only fixes the word.

#### REQ: feature-stable-done

A Feature uses `Stable` for the done role instead of `Implemented`. Rationale: a Feature is a living specification that *matures* — `Stable` signals a proven, API-frozen spec in production, a stronger and distinct claim from "code was written." `Implemented` (Idea, Plan, Seed) means the work was carried out; `Stable` means the resulting capability is mature.

#### REQ: feature-amending

A Feature has an additional `Amending` state, entered from `Stable` when an approved change to an already-stable Feature is being implemented (`Stable` → `Amending` → `Stable`). Rationale: a stable Feature undergoing revision still *has* a working implementation, so it must not read as first-build `Implementing` (which implies no working version yet) nor as plain `Stable` (which hides the in-flight change). No other artifact has this role.

#### REQ: parked-stale-vs-withdrawn

The Parked role (an artifact that ended without being shipped or rejected) has two terms by artifact kind:

- **`Stale`** for lightweight captures (Idea, Seed) — the artifact passively *decayed* or lost relevance; nobody decided against it, it simply was never carried forward.
- **`Withdrawn`** for Plans — the artifact was *deliberately pulled back* (a decision to abandon planned work), not left to rot.

`Stale` and `Withdrawn` are not interchangeable: `Stale` is passive decay, `Withdrawn` is an active decision.

### Disposition vocabulary

Terminal outcomes are drawn from one **shared disposition vocabulary**; each artifact uses the applicable subset (enumerated in [Per-artifact status sets](#per-artifact-status-sets)). Artifacts MUST NOT invent bespoke terminal words outside this set.

#### REQ: disposition-vocabulary

The shared disposition terms and their distinct meanings are:

| Term | Meaning |
|---|---|
| `Rejected` | Turned down at review — an explicit decision against the artifact. |
| `Withdrawn` | Deliberately abandoned before/during work, with no replacement. **Plan-only** (lightweight captures use `Stale` instead — see [parked-stale-vs-withdrawn](#req-parked-stale-vs-withdrawn)). |
| `Stale` | Passively decayed / lost relevance; never carried forward. |
| `Superseded` | Replaced by a **named successor** artifact (the successor MUST be referenced). |
| `Deprecated` | Retired / no longer recommended, with **no** named successor. |

`Rejected` is universal: every reviewable artifact (Idea, Feature, Plan, Decision, Seed) MUST permit `Rejected` from its review (or queued, for Seed) state. `Superseded` and `Deprecated` are distinguished solely by whether a successor is named.

### Archival is orthogonal

#### REQ: archival-not-a-status

`Archived` MUST NOT be a status value of any artifact. Archival is an **orthogonal axis** — whether an artifact is filed out of active view — represented by storage/location or a dedicated flag, never by overwriting the lifecycle status. An archived artifact MUST retain its real terminal status (e.g., a rejected idea that is filed away stays `Rejected`, archived). The mechanism for representing archival (a frontmatter flag versus relocation to an `archived/` location) is owned by the per-artifact Features and is out of scope here; this Feature only forbids `Archived` as a *status*.

### Per-artifact status sets

#### REQ: per-artifact-status-sets

The complete, authoritative set of legal status values per artifact is:

| Artifact | Legal statuses |
|---|---|
| **Idea** | `Draft`, `In Review`, `Approved`, `Specifying`, `Specified`, `Implementing`, `Implemented`, `Rejected`, `Stale` |
| **Feature** | `Draft`, `In Review`, `Approved`, `Implementing`, `Stable`, `Amending`, `Rejected`, `Deprecated` |
| **Plan** | `Draft`, `In Review`, `Approved`, `Executing`, `Blocked`, `Implemented`, `Failed`, `Rejected`, `Withdrawn`, `Superseded`, `Deprecated` |
| **Decision** | `Draft`, `In Review`, `Approved`, `Rejected`, `Superseded`, `Deprecated` |
| **sidekick Seed** | `Queued`, `Implemented`, `Rejected`, `Stale` |

No artifact may carry a status outside its row. (The Idea sub-phases `Specifying`/`Specified` and the Plan execution band `Executing`/`Blocked`/`Implemented`/`Failed` are governed for *spelling* by this Feature; their *derivation/transition* rules remain owned by the [idea](../idea/README.md) and [plan](../plan/README.md) Features respectively.)

### Conformance

#### REQ: single-source-of-truth

Each per-artifact Feature ([idea](../idea/README.md), [feature](../feature/README.md), [plan](../plan/README.md), [decision](../decision/README.md)) MUST reference this Feature as the source of truth for its status values and MUST NOT redefine a value that contradicts the [per-artifact status sets](#req-per-artifact-status-sets). Any future divergence from a shared term MUST be added here as a documented-divergence REQ first; an undocumented deviation is non-conformant drift, not a local choice.

#### REQ: name-not-mechanism

This Feature governs status **names and legal sets** only. Whether a status is human-authored or machine-derived, and the transition rules between statuses, remain owned by each artifact's own Feature (e.g., the plan Feature owns that `Executing` is lint-derived and that `lint --fix` only transitions from `Approved` onward). A conformance check against this Feature validates *which values are legal*, never *how an artifact moves between them*.

## Acceptance Criteria

### AC: review-role-is-in-review (verifies REQ:shared-prep-band, REQ:lifecycle-roles)

**Given** any reviewable document artifact (Idea, Feature, Plan, or Decision)
**When** its status set is checked against this Feature
**Then** its review-role value is `In Review`, and `Under Review` appears in no artifact's legal set.

### AC: plan-keeps-executing (verifies REQ:plan-executing-derived)

**Given** the Plan artifact
**When** its in-progress-role value is checked
**Then** it is `Executing` (the documented divergence), while Idea and Feature use `Implementing` for the same role.

### AC: feature-stable-and-amending (verifies REQ:feature-stable-done, REQ:feature-amending)

**Given** the Feature artifact
**When** its done-role and change-in-flight values are checked
**Then** the done role is `Stable` (not `Implemented`) and `Amending` is a legal value reachable from `Stable`.

### AC: rejected-is-universal (verifies REQ:disposition-vocabulary)

**Given** the five governed artifacts
**When** their legal sets are checked for the review turn-down terminal
**Then** `Rejected` is in the legal set of Idea, Feature, Plan, Decision, and Seed.

### AC: parked-split-by-kind (verifies REQ:parked-stale-vs-withdrawn)

**Given** the Idea/Seed artifacts and the Plan artifact
**When** their parked-role values are checked
**Then** Idea and Seed use `Stale` and Plan uses `Withdrawn`, and neither word appears in the other's role.

### AC: archived-is-not-a-status (verifies REQ:archival-not-a-status)

**Given** the per-artifact status sets defined here
**When** every legal set is scanned for the token `Archived`
**Then** `Archived` appears in none of them, and the spec states archival is an orthogonal storage axis under which a terminal status (e.g., `Rejected`) is retained.

### AC: governed-values-title-case (verifies REQ:title-case-convention, REQ:status-bearing-scope)

**Given** the five governed artifacts and the two excluded execution-layer artifacts (Task, Issue)
**When** the governed legal sets are scanned for casing and the excluded vocabularies are checked
**Then** every governed value is Title Case with a single space between words (e.g. `In Review`), and the lowercase/snake_case Task and Issue vocabularies are not governed by this Feature (out of scope).

### AC: seed-has-no-prep-band (verifies REQ:seed-queued-initial)

**Given** the sidekick Seed artifact
**When** its legal set is checked
**Then** its initial value is `Queued` (not `Draft`), and neither `In Review` nor `Approved` appears in the Seed set.

### AC: decision-uses-shared-band (verifies REQ:shared-prep-band, REQ:per-artifact-status-sets)

**Given** the Decision artifact
**When** its legal set is checked
**Then** it is exactly `Draft`, `In Review`, `Approved`, `Rejected`, `Superseded`, `Deprecated` — and the legacy ADR words `Proposed` and `Accepted` appear nowhere in it.

### AC: superseded-requires-successor (verifies REQ:disposition-vocabulary)

**Given** an artifact whose status is `Superseded`
**When** the disposition meaning is applied
**Then** a named successor is required, distinguishing `Superseded` from `Deprecated` (retired with no successor).

### AC: artifact-specs-conform (verifies REQ:single-source-of-truth, REQ:name-not-mechanism)

**Given** a per-artifact Feature (e.g., `idea`) whose own status enum lists a value outside its row in [per-artifact status sets](#req-per-artifact-status-sets)
**When** that Feature is checked for conformance to this one
**Then** it is flagged as non-conformant drift, and the only remedy is to align the value here (documenting any intended divergence as a new REQ) — not to redefine it locally.

## Open Questions

- **Idea `Superseded`.** An Idea replaced by a better Idea currently has no `Superseded` terminal (it would be `Stale` or `Rejected`). Whether to add `Superseded` to the Idea set is deferred until a concrete need appears.
- **Archival mechanism unification.** This Feature forbids `Archived` as a status but leaves the *representation* of archival (frontmatter flag vs `archived/` relocation) to each artifact Feature. A future Feature may unify that mechanism (today seeds relocate; ideas do not).
- **Self-referential bootstrap.** This Feature defines `In Review`, but its own `**Status:**` must use the currently-CLI-enforced Feature vocabulary (`Under Review` during its own review) until the CLI enum migration (program Phase 2) lands; the document's status field follows the old vocabulary until then even though its content defines the new one.

---
*This document follows the https://specscore.md/feature-specification*

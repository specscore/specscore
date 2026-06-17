# Idea: Plan Status Lifecycle — Prep, Execution, and Disposition in One Field

**Status:** Stale
**Archived:** true
**Date:** 2026-06-04
**Owner:** alexander.trakhimenok
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —
**Archive Note:** Realized (not abandoned) — specified in place by amending the canonical `plan` Feature; the idea-lifecycle has no terminal status for an amendment-only idea (Specifying+ requires a `Promotes To` target), so it is archived as done. Remaining CLI work is tracked in the `plan` Feature's Open Questions.

## Problem Statement

How might we model a Plan's full lifecycle in one status field — authored preparation, derived execution, and author disposition — so plans are queryable by where they actually are (pending, executing, blocked, failed, implemented, retired) instead of being locked to draft/in_review/approved?

## Context

The canonical Plan status enum is draft/in_review/approved, locked by REQ:valid-statuses, REQ:no-execution-status, an AC:status-lifecycle, and a valid-status-values test. That blocks the operational queries an operator actually needs — show pending plans, plans executing, plans blocked, plans that failed to complete. This Idea overturns the no-execution-status principle. The states are sequential phases of ONE lifecycle, not two concurrent ones: reaching executing already implies the approval gate passed (or was deliberately bypassed), so approved carries no additional current-state information during a run — a single field suffices, with a clean authority handoff at approved (humans own draft to approved; lint --fix owns the derived execution rollup; authors own disposition). This Idea MERGES and supersedes the earlier plan-disposition-statuses draft. Two existing realities it reconciles: the REQ:status-rollup that currently rolls completed children up to approved (reinterpreted here to produce execution states), and the specstudio-skills plans already using non-canonical Implementing/Completed/Deprecated/Archived (a drift this canonicalizes). Note: a test currently REJECTS superseded — this reverses it.

**Realized & archived (2026-06-05, not abandoned):** specified in place by amending the canonical `plan` Feature (flat single-file model + the full prep/execution/disposition status lifecycle) rather than promoting to a new Feature. Because the idea-lifecycle's `Specifying`/`Specified` statuses require a `Promotes To:` target and this Idea amends an existing Feature instead, it is archived as *done*. The remaining CLI enforcement of the expanded enum + `lint --fix` execution-band derivation is tracked in the `plan` Feature's Open Questions, not here.

## Recommended Direction

One status field, one lifecycle, in three bands. PREP (human-authored): draft, in_review, approved — where approved means ready/pending execution, covering the pending-plans query. EXECUTION (derived by lint --fix from task rollup, never hand-authored): executing (at least one task in progress), blocked (tasks blocked, none progressing and none failed), implemented (all tasks complete), failed (a task failed or aborted and the plan cannot complete). DISPOSITION (author-set, reachable from various points): withdrawn (abandoned), superseded (replaced, carries a successor ref). One field rather than two because the bands are sequential, not concurrent — executing subsumes approved — so a second field would be redundant and create which-field-do-I-query ambiguity. The authority handoff sits at approved: lint --fix only ever transitions from approved onward and must never overwrite a human prep state. The approved-vs-super-approved provenance is deliberately NOT in status; it lives in the snapshot/audit table. Alongside the enum, add a derived tasks_count and mirror status plus tasks_count into frontmatter for cheap third-party queries (coordinating with artifact-frontmatter-convention); all derived fields are lint --fix-managed. This amends REQ:no-execution-status and REQ:valid-statuses, reinterprets REQ:status-rollup to yield execution states, and reverses the superseded-rejection test.

## Alternatives Considered

- **Keep canonical `draft/in_review/approved`; derive execution by rolling up tasks at query time.** Rejected per the operational need: it forces every "which plans are pending/executing/failed" query to load and roll up task statuses — the heavy single-field-lookup contract the frontmatter convention exists to remove.
- **Two orthogonal fields (`status` for prep, `execution` for run).** Rejected: prep and execution are *sequential*, not overlapping — `executing` subsumes `approved` — so a second field is redundant and introduces "which field do I query" ambiguity. (Provenance like approved-vs-bypassed, the one thing a second field could carry, belongs in the snapshot/audit table.)
- **Keep disposition (`withdrawn`/`superseded`) and execution (`executing`/…) as two separate Ideas.** Rejected: both expand the *same* single status enum and state machine; one Idea avoids fragmentation. (This Idea absorbs the earlier `plan-disposition-statuses` draft.)

## MVP Scope

Replace the plan status enum with the full lifecycle (draft, in_review, approved, executing, blocked, implemented, failed, withdrawn, superseded). lint --fix derives the execution band from task-status rollup and maintains tasks_count; both are mirrored into frontmatter. Amend REQ:no-execution-status, REQ:valid-statuses, and REQ:status-rollup, and reverse the valid-status-values test. Prove: a plan whose tasks are all complete auto-shows implemented; a blocked task yields blocked; a failed task yields failed; querying frontmatter status returns the right bucket; and a superseded plan with no successor ref fails lint.

## Not Doing (and Why)

- Two separate status fields (prep vs execution) — rejected: the bands are sequential phases of one lifecycle, not concurrent, so one field suffices and a second is redundant
- Distinguishing approved vs super-approved/bypassed in the status field — that provenance lives in the snapshot/audit table, not status
- Hand-authored execution states — executing/blocked/implemented/failed are derived by lint --fix from task rollup, never set by hand
- Resurrection from a disposition status (withdrawn/superseded back to active) — re-pursuing the work means authoring a new plan
- Cascading plan status onto child tasks — the rollup reads task status, it never writes it
- A `deprecated` plan status — rejected: deprecation (ongoing-use-now-discouraged) is a Feature-level concept, a poor fit for one-shot execution Plans; `withdrawn` (abandoned) + `superseded` (replaced by a named successor) cover plan retirement crisply

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Overturning REQ:no-execution-status is acceptable, and the only changes needed are those REQs/AC/test — no hidden consumer hard-asserts the 3-value enum. | Grep tests/code for the enum cardinality, `no-execution-status`, the `superseded` rejection, and `status-rollup → approved`. |
| Must-be-true | Execution states are unambiguously derivable from a task-status rollup (in_progress → executing; blocked → blocked; all complete → implemented; failed/aborted → failed). | Define the rollup precedence and test it against mixed task-status fixtures. |
| Should-be-true | A single field that is part-authored, part-derived with a clean handoff at `approved` is workable for `lint --fix` (it must transition only from `approved` onward, never overwrite a human prep state). | Prototype `lint --fix` that only manages `approved → execution` and leaves draft/in_review/approved alone. |
| Should-be-true | Mirroring `status` + `tasks_count` into frontmatter fits `artifact-frontmatter-convention` without conflict. | Reconcile against that Idea's frontmatter shape (body canonical + frontmatter mirror). |
| Might-be-true | `blocked` and `failed` are coarse enough; no finer sub-states (e.g. partially-implemented-then-failed) are needed in MVP. | Revisit at specify against real implement runs. |


## SpecScore Integration

- **New Features this would create:** likely none — an amendment to the existing `plan` Feature (status enum, state machine, rollup). It **supersedes the `plan-disposition-statuses` Idea** (merged in).
- **Existing Features affected:** `plan` (status enum in `plan.entity.md`; `REQ:valid-statuses`, `REQ:no-execution-status`, `REQ:status-rollup`, `AC:status-lifecycle`; the `valid-status-values` test; the state machine); `task` (read-only source of the rollup — unaffected); `artifact-frontmatter-convention` (mirrors `status` + new `tasks_count`); `property`/`source-references` (typing the `superseded` successor ref).
- **Dependencies:** absorbs `plan-disposition-statuses`. Unblocks the grandfathering rule in `plan-granularity-improvement` (an `implemented` plan is the "legacy, exempt" case). Coordinates with `artifact-frontmatter-convention` (Specifying). Cross-repo (specstudio-skills): the `implement` skill drives execution and must emit the task statuses the rollup reads; the `plan` skill authors the prep band.

## Open Questions

- Exact rollup precedence when task statuses are mixed (some complete, some failed, some blocked) — which band wins?
- What triggers `lint --fix` to recompute the execution band — every lint run, a git hook, or the `implement` skill at its checkpoints?
- Does `failed` require a human acknowledgement to leave (`failed → withdrawn`), or can re-running tasks move it back to `executing`? (Tension with the no-resurrection rule, which targets *disposition*, not execution.)
- Frontmatter shape: per `artifact-frontmatter-convention`, body `status` stays canonical with a frontmatter mirror — is `tasks_count` frontmatter-only (purely derived), or also surfaced in the body?

---
*This document follows the https://specscore.md/idea-specification*

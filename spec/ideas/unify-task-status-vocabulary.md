---
format: https://specscore.md/idea-specification
status: Specified
---

# Idea: Unify Task Status Vocabulary

**Status:** Specified
**Date:** 2026-06-26
**Owner:** alex
**Promotes To:** unify-task-status-vocabulary
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we make one task-status vocabulary authoritative across the Task entity, plan-inline tasks, the plan-execution rollup, the plan-new scaffold, and the implement skill — so plan progress, the Implemented rollup, and task change-status all agree?

## Context

Discovered while implementing the implementation-commit-provenance plan: SpecScore has two divergent task-status vocabularies. The canonical 7-value enum (planning, queued, in_progress, blocked, complete, failed, aborted) is defined by the Task entity AND the status-vocabulary feature (which explicitly lists it as the execution-layer Task set), and the plan execution-band rollup reads it (a task in_progress -> plan Executing; all tasks complete -> plan Implemented). But the specscore plan new CLI scaffold and the specstudio implement skill instead write a 4-token set (pending, in-progress, done, blocked) onto plan-inline ### Task N: blocks. So done != complete: plan-inline task status and the Implemented rollup are silently misaligned today, independent of any one feature. A task change-status verb operating on the canonical enum cannot coherently target plan-inline tasks. This blocks the plan-inline path of the cli/task/change-status feature (its provenance capture rolls up to plan Implemented).

## Recommended Direction

Adopt the existing 7-value Task status enum (planning, queued, in_progress, blocked, complete, failed, aborted) as the single authoritative task-status vocabulary on every surface — it is already canonical per the Task entity, the status-vocabulary feature, and the rollup; the divergence is the scaffold and the implement skill, which are what change. Concretely: (1) specscore — clarify in the plan feature that plan-inline ### Task N: blocks carry a **Status:** drawn from the Task entity enum (not a separate set), and confirm the rollup and status-vocabulary already agree; (2) specscore-cli — fix the plan new scaffold to emit **Status:** planning (not pending); the task change-status verb already uses the enum; the lint --fix rollup reads the enum; add a migration so existing plans' pending->planning and done->complete tokens are reconciled; (3) specstudio implement skill — replace its 4-token writes with the canonical enum (map pending->planning, in-progress->in_progress, done->complete, blocked->blocked; queued/failed/aborted become available), so the progress it writes is exactly what the rollup reads. One vocabulary, written and read identically everywhere.

## Alternatives Considered

- **Make the 4-token set (`pending`/`in-progress`/`done`/`blocked`) authoritative.** Match what the implement skill writes today. Lost because it contradicts three canonical sources at once — the Task entity's status enum, the `status-vocabulary` feature (which explicitly enumerates the 7-value Task set), and the plan rollup (which keys on `in_progress`/`complete`) — and it throws away `queued`/`failed`/`aborted`, which the execution layer genuinely needs. It's a large rewrite of the canon to bless the divergence.
- **Two formal axes — an execution-lifecycle status and a separate plan-task progress marker.** Keep both vocabularies but make them distinct, declared fields. Lost because it adds concepts rather than removing them, and the rollup still has to pick one axis to read — so the "which status means done?" ambiguity survives. The goal is one vocabulary, not two well-labeled ones.

## MVP Scope

The canonical 7-value enum documented as the sole task-status vocabulary (plan feature clarified; status-vocabulary cross-checked), the plan-new scaffold emitting planning, a migration reconciling existing plans (pending->planning, done->complete), and the implement skill's status writes aligned to the enum. After this lands, the implementation-commit-provenance plan-inline path is unblocked and resumes.

## Not Doing (and Why)

- Changing the 7-value enum itself — it is already canonical; this Idea adopts it, it does not redesign it
- Adding task states beyond the seven — no new states; the gap is alignment, not expressiveness
- Touching the Issue status vocabulary — a separate execution-layer set, explicitly out of scope of the status-vocabulary governance and of this effort
- A separate plan-task progress field distinct from execution status (the two-axes option) — rejected; it adds concepts instead of unifying

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The 7-value enum fully expresses plan-task progress with no gaps — every state the implement skill needs maps to one enum value (`pending`→`planning`, dispatched→`in_progress`, `done`→`complete`, `blocked`→`blocked`, with `queued`/`failed`/`aborted` available). | Enumerate every status the implement skill writes and the plan-new scaffold emits; map each to an enum value; confirm no implement-skill state lacks a target and no needed enum value is unreachable. |
| Must-be-true | The specstudio `implement` skill's status-write convention can actually be edited (its source is reachable, not just a read-only plugin cache). | Locate the skill's source repo/file for the `{pending,in-progress,done,blocked}` state machine and confirm it is editable and shippable. |
| Should-be-true | Migrating existing plans (`pending`→`planning`, `done`→`complete`, `in-progress`→`in_progress`) is mechanical and safe — no plan relies on the literal old tokens elsewhere. | `grep` the corpus for `**Status:** pending`/`done` in plan tasks; write a `lint --fix` migration or one-time script; dry-run against existing plans (including the three from the provenance effort) and diff. |
| Should-be-true | No other consumer (tooling, dashboards, the What's-Next report) depends on the literal `pending`/`done` tokens. | `grep` specscore-cli and specstudio for `"pending"`/`"done"` task-status string literals; confirm each is either updated or vocabulary-agnostic. |
| Might-be-true | The implement skill benefits from adopting `queued` (deps-met-but-not-started) as a distinct state rather than collapsing it into `planning`. | Decide during specify whether the skill's batch-eligibility maps cleanly onto `queued`; defer if it adds churn without value. |


## SpecScore Integration

- **New Features this would create:** likely none — revisions to existing Features plus a CLI/scaffold fix and a skill alignment. Settled at specify time.
- **Existing Features affected:** [plan](../features/plan/README.md) (clarify plan-inline task `**Status:**` uses the Task enum; the rollup already does); [task](../features/task/README.md) (the canonical enum source — confirm/anchor); [status-vocabulary](../features/status-vocabulary/README.md) (cross-check the Task set is the single source); in `specscore-cli`, the `plan new` scaffold (emit `planning`), the rollup (`lint --fix`), and the in-flight `cli/task/change-status` verb; in `ai-plugin-specscore`/specstudio, the `implement` skill's status-write state machine.
- **Blocks / unblocks:** this Idea **blocks** the plan-inline path of the `implementation-commit-provenance` effort (the paused `cli-task-change-status` plan Tasks 2/3/5 targeting `--plan`); board-mode provenance (already shipped as Batch 1) is unaffected.
- **Dependencies:** access to the specstudio `implement` skill source (see Must-be-true assumption); a migration mechanism for existing plan-task tokens.

## Open Questions

- Migration mechanism: should `lint --fix` auto-migrate legacy `pending`/`done` plan-task tokens, or is it a one-time scripted rewrite (less magic, but manual)?
- Does the implement skill adopt `queued` as a real state, or collapse it into `planning` for the MVP?
- Where exactly does the specstudio `implement` skill's status vocabulary live, and is it shipped from a repo we control end-to-end?

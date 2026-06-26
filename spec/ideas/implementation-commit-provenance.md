---
format: https://specscore.md/idea-specification
status: Specified
---

# Idea: Implementation Commit Provenance

**Status:** Specified
**Date:** 2026-06-25
**Owner:** alex
**Promotes To:** implementation-commit-provenance
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we record durable, trustworthy provenance linking each implemented task (and, by rollup, each plan) to the actual implementing code commit(s) — so that when code is lost to a merge/rebase, there is evidence of what was done and a path to restore it?

## Context

Triggered by a real incident: a plan showed as Implemented but the corresponding code changes were lost (merge/rebase/something), with no recorded evidence of the work or pointer to restore it. Today, Plans have a `## Snapshots` table that records a git hash, but per REQ:snapshot-git-hash that hash is the *spec-repo* state of the plan document — not the implementing code commit, which the spec itself notes lives in *code repos on branches* (often a separate repo). Commit→work linkage exists only via `Verifies:` commit trailers, which live in commit messages and are destroyed by the very rebase/merge that causes the loss. Tasks carry a `status` (`complete`/`failed`/…) but no field to record an implementing commit. So there is no durable, artifact-level record pointing from an implemented task/plan to the code commit that did the work.

## Recommended Direction

Add optional implementation-commit provenance to the Task model, captured through the automated status-change path — the `specscore:change-status` skill wrapping a `specscore task change-status` CLI verb. When an agent (or human) transitions a task to `complete`, it MAY pass `--repo`, `--commit`, and `--branch`; the CLI records a cross-repo commit reference on that task (e.g. `**Implemented-by:** <repo>@<sha> (branch)`). All three flags are **optional** — a transition with no provenance is still valid (so the field is additive and non-blocking). The caller supplies them because only it knows which worktree/branch the work landed in — tooling cannot reliably auto-detect HEAD across multiple branches/worktrees. **Dependency to surface:** `specscore:change-status` and its CLI today support only `Feature`/`Idea` kinds; a `task change-status` verb does not yet exist (see [lifecycle-status-skill](../../../ai-plugin-specscore/spec/features/lifecycle-status-skill/README.md), which lists Task/Plan coverage as out of scope). This Idea therefore co-requires that verb as the capture vehicle. Plan-level evidence is a derived rollup of its tasks' implementation commits (no new plan transition — plan→Implemented is already derived by `lint --fix`). MVP is evidence-only: the recorded `<repo>@<sha>` is enough to manually `git checkout`/`cherry-pick` and recover or prove the work. The cross-repo ref is validated syntactically only, mirroring the existing `P-005` cross-repo precedent — the linter never scans sibling repos to confirm the sha exists. This stays distinct from Snapshots, which remain spec-document state provenance.

## Alternatives Considered

- **Overload existing plan Snapshots** — add an "implementation commit" column or a new snapshot action to the `## Snapshots` table. Lost because the snapshot Git Hash is defined (`REQ:snapshot-git-hash`) as the *spec-repo state of the plan document*; reusing it for a *code* commit conflates two different axes, and Snapshots are plan-level only so tasks would still have no record.
- **Rely on the status quo: `Verifies:` commit trailers + the verify skill** — the commit→AC linkage already exists in commit messages. Lost because that linkage lives *inside the commits*, so the same rebase/merge that loses the work also loses the trailers; there is no durable artifact-side record, which is precisely the failure that triggered this Idea.
- **Automatic HEAD capture by tooling on status change** — have the CLI read the current `git HEAD` when a task completes. Lost because real work spans multiple branches/worktrees and often a separate code repo; tooling cannot reliably know which worktree the implementation landed in. The caller (implementing agent or human) is the only party that knows, so it must supply the ref.

## MVP Scope

A new optional Task field holding one cross-repo implementation-commit reference (`<repo>@<sha>`, optional branch), plus the task status-change path (CLI verb) gaining `--repo`/`--commit`/`--branch` flags that write it when a task → `complete`. Plan-level rollup that surfaces the union of its tasks' implementation commits as the plan's implementation evidence. Syntactic-only lint of the ref format. No reachability checks, no restore tooling, no auto-capture.

## Not Doing (and Why)

- Reachability detection / lost-commit warnings — deferred ambition; MVP is evidence-only, restoration is manual via the recorded sha
- Assisted restore (auto cherry-pick / recover) — largest scope, out of a first cut
- Automatic HEAD capture by tooling — rejected: multi-branch/worktree work means tooling cannot know which commit/worktree; the caller must supply it
- Verifying the sha exists in the named repo — cross-repo, syntactic-only validation per the P-005 precedent; the linter never scans sibling repos
- Recording full multi-commit lists per task — MVP records one primary commit (squash-merge friendly); multiple commits is a later refinement
- Overloading or changing Snapshot semantics — Snapshots stay as spec-document state provenance; this is a separate, code-commit axis

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | A `task change-status` CLI verb exists to carry the optional `--repo/--commit/--branch` flags. **Resolved → dependency:** the `specscore:change-status` skill is the intended automated capture path, but it currently supports only `Feature`/`Idea`; the Task verb does not exist yet (lifecycle-status-skill lists Task/Plan as out of scope). This Idea co-requires building that verb. | Confirm the `task change-status` verb is in scope for the same release, or sequence this Idea behind it. |
| Must-be-true | The implementing agent/human knows and will pass the correct `<repo>@<sha>` at completion time. Garbage-in makes the evidence worthless. | Prototype the `implement` flow passing the commit it just made; check the recorded ref resolves with `git cat-file -e` in the named repo on a real run. |
| Should-be-true | A `<repo>@<sha>` cross-repo ref (with optional branch), validated syntactically only, is acceptable evidence — mirroring the `P-005` cross-repo precedent. | Confirm with one recovery rehearsal: given only `<repo>@<sha>`, can you `git checkout`/`cherry-pick` to restore or prove the lost work? |
| Should-be-true | One primary commit per task is enough for MVP (squash-merge friendly); most tasks land as a single logical commit. | Sample recent `implement` runs: how many produce a single squashed commit vs. several that would each need recording? |
| Might-be-true | Users also want the branch recorded, not just repo+sha. | Ask after first use whether branch added recovery value or was noise once the sha was known. |


## SpecScore Integration

- **New Features this would create:** possibly none — likely realized as additions to existing Features rather than a standalone Feature. To be settled at specify time.
- **Existing Features affected:** [task](../features/task/README.md) (new optional implementation-commit field on the Task entity); [plan](../features/plan/README.md) (derived plan-level rollup of task implementation commits; relationship to `## Snapshots`); the `change-status` flow (new optional `--repo`/`--commit`/`--branch` flags); potentially [cross-repo-plan-composition](cross-repo-plan-composition.md) for the `<repo>@<sha>` cross-repo ref convention and `P-005`-style syntactic validation.
- **Three-repo change — all must be updated in lockstep:**
  - **`specscore`** (this repo) — spec changes: the optional implementation-commit field on the Task entity, the plan-level rollup, lint of the `<repo>@<sha>` ref format, and the relationship to `## Snapshots`.
  - **`specscore-cli`** — the CLI implementation: a `task change-status` verb that accepts the optional `--repo/--commit/--branch` flags and writes the provenance ref into the task; lint support for the new field.
  - **`ai-plugin-specscore`** — the [lifecycle-status-skill](../../../ai-plugin-specscore/spec/features/lifecycle-status-skill/README.md) skill: extend `specscore:change-status` to dispatch the `Task` kind (today only `Feature`/`Idea`), routing to the new CLI verb and relaying its provenance-aware output.
- **Dependencies:** the `task change-status` verb (the capture vehicle); the existing cross-repo soft-reference syntax precedent.

## Open Questions

- What is the exact field name and on-disk format for the task implementation-commit reference (`**Implemented-by:** <repo>@<sha> (branch)` line vs. a typed entity property vs. a per-task mini-table)?
- How should the plan-level rollup surface its tasks' implementation commits — a derived list in the plan body, frontmatter, or only on demand?
- Should `<repo>` be a repo slug (matching the cross-repo `<repo-slug>:` convention) or a full clone URL, and how does that interact with same-repo (spec == code) projects where `<repo>` is implicit?
- Should this Idea ship together with the `task change-status` verb in one effort, or strictly sequence behind it (the verb gates the capture mechanism)?

---
format: https://specscore.md/idea-specification
status: Approved
---

# Idea: Cross-Repo Plan Composition: Master and Sub-Plans Spanning Repos

**Status:** Approved
**Date:** 2026-06-07
**Owner:** alexander.trakhimenok
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** depends_on:plan-granularity-improvement, extends:artifact-frontmatter-convention

## Problem Statement

How might we let a single Idea fan out into a master plan whose tasks delegate to sub-plans that may live in other repos, so one concept can be implemented across repos in parallel and then converge on integration and tests, without losing spec-to-code traceability or the gate discipline the flat plan skill already enforces?

## Context

Most of the idea↔feature↔plan many-to-many graph the user originally wanted **already exists in the entity model** — re-proposing it would violate surgical-change discipline. Today: `Plan.features` is a 0-N array ("Features this Plan affects"); `Feature.source_ideas` is explicitly "Many-to-many"; the recursive plan/task model is canonical (`Plan.tasks` empty = leaf Task; the Task entity states *"A Task with subtasks is, by structure, a Plan"*); plans may be idea-sourced (bind to an Idea via a `Source` line) or feature-sourced; and `Task.depends_on` (required, acyclic, per the approved `plan-granularity-improvement`) already gives the parallel-batch substrate.

One small gap in that existing graph is also worth closing here: `Feature.source_ideas` is currently *optional*, so a Feature authored without an upstream Idea is indistinguishable from one whose source was simply omitted. The single missing *structural* edge is **plan→plan composition** — a *master* plan that delegates a task to a *separate* sub-plan artifact (not just nested Task entities inside one plan dir), and a sub-plan that names its parent — especially when those plans live in **different repos**. No SpecScore entity ref crosses a repo boundary today. The `relocate-idea` / `idea-skills-destination-resolution` work established a `<repo-slug>:<slug>` convention for cross-repo references and surfaced how costly cross-repo reference integrity is (manual rewriting, stale links).

Execution machinery already exists, but only **single-repo**: `implement-execution-topology` (branch roles + gated transitions for parallel agents on one plan branch), `implement-workflow-execution-engine` (per-batch fan-out as a deterministic Workflow), and `implement-per-task-execution-mode` (inline/subagent/auto per task). What is missing is the **outer coordinator** that fans a master plan out to per-repo sub-plans, honors cross-repo ordering, and converges on an integration-and-tests phase.

This Idea is also a live dogfood of itself: its own implementation is a master plan whose sub-plans land in `specscore-cli`, `specscore`, and `specstudio-skills` — a direct demonstration of "one Idea → many Features across repos." Because the **current CLI lint will reject the new frontmatter** (new delegation/parent refs, `<repo-slug>:` cross-repo refs) until it is taught to accept them, the CLI-lint sub-plan must run **first** in the master's task order, or every later artifact fails `specscore spec lint` during the transition.

## Recommended Direction

Add the one missing graph edge and the outer coordinator that consumes it, in four coupled facets across the spec model, lint, and the skills — reusing everything that already exists.

**FACET A — Plan→plan delegation primitive.** A leaf Task may carry an optional **delegation ref** to a sub-plan ("execute this sub-plan"), and a sub-plan declares a **`parent`** ref in its frontmatter. This reuses the existing "a task is the unit of delegable work, and a task-with-subtasks is a Plan" shape rather than inventing a parallel `subplans` array. A master plan is then just a plan whose tasks delegate to other plan artifacts; its `Depends-On` graph (already required and acyclic) expresses cross-plan ordering. Child→parent is **single-parent (a tree)** for the MVP; multi-parent DAGs are deferred. The sub-plan's `parent` is set at scaffold time by extending the existing dedicated `specscore plan new` verb (the `cli/plan/new` Feature in `specscore-cli`, already Approved) with a **`--parent <plan-ref>`** flag — keeping artifact creation required-CLI and **per-type** (`cli/plan/new`, `cli/idea/new`, …), never a revived generic `specscore new` root. The `--parent` value may be a soft cross-repo `<repo-slug>:<slug>` ref. (The current `cli/plan/new` spec asserts "plan slugs are flat — plans have no hierarchy"; `--parent` overturns that, so that Feature must be revised, not merely extended.)

**FACET B — Soft cross-repo references.** Delegation and `parent` refs use the established `<repo-slug>:<slug>` form when they cross a repo boundary. **Same-repo refs stay fully lint-validated; cross-repo refs are syntactic-only** (best-effort, like external links) — `specscore spec lint` does not scan sibling repos to resolve them. This keeps lint decoupled from workspace layout and avoids a new "sibling repo missing" failure mode; sibling-resolving validation is an explicit follow-on. No automatic cross-repo back-link (`Referenced by`) maintenance in the MVP, since single-repo `lint --fix` cannot sync across repos.

**FACET C — Outer cross-repo execution coordinator.** The implement skill gains a master-plan execution mode that resolves the sub-plan tree, dispatches each sub-plan to the **existing single-repo engine** (`implement-execution-topology` + `implement-workflow-execution-engine` + `implement-per-task-execution-mode`) within its own repo, honors cross-repo task `Depends-On` (so a sub-plan blocks until its cross-repo dependency completes), and then runs a final **integration-and-tests** phase that exercises the repos together. This Idea adds only the outer layer — it does not reimplement intra-repo execution.

**FACET D — Bootstrapping order (self-demo).** The master plan that builds this feature orders its sub-plans so the **`specscore-cli` lint update lands first** (teaching lint to accept the new frontmatter and soft cross-repo refs), then the **`specscore` spec-model update** (Plan/Task entity: delegation ref + `parent` + `<repo-slug>:` convention), then the **`specstudio-skills`** update (plan skill authors master/sub-plans; implement skill orchestrates), with a possible `ai-plugin-specscore` surface sub-plan. The order is encoded as cross-repo `Depends-On` on the master's tasks — making the feature's own rollout the first proof that the mechanism works.

**FACET E — Model hygiene: explicit `none` for `Feature.source_ideas`.** While completing the idea↔feature↔plan graph, flip `Feature.source_ideas` from optional to **required-with-explicit-`none`**, mirroring how `Task.depends_on` works: a Feature written without ideating sets `source_ideas: none` rather than omitting the field, so "specified without an upstream Idea" is an explicit, lint-checkable choice instead of an implicit absence. This is a small entity + lint change on the same `specscore` / `specscore-cli` surface as the rest, and — like every new required field — it would trip the old lint, so it rides the same CLI-first bootstrapping order (FACET D). (Folded in by user direction rather than split to a separate Idea.)

## Alternatives Considered

- **Explicit `subplans` array on the Plan entity** instead of a task-level delegation ref. Rejected: it duplicates the existing recursive model. The Task/Plan entities already say a task-with-subtasks *is* a plan; a task delegating to a sub-plan artifact is the natural extension of that shape, so a parallel `subplans` field would be a second way to say the same thing.
- **Lint-resolved cross-repo refs** (scan `../` siblings, fail if a `<repo-slug>:<slug>` target is missing). Rejected for the MVP per user direction: it couples lint to workspace layout and adds a "sibling repo missing/moved" failure mode. Soft refs are cheaper and match how external links already behave; sibling-resolving lint is a worthwhile follow-on once the convention is proven.
- **One mega-plan with cross-repo tasks nested in a single file** (no separate sub-plan artifacts). Rejected: a plan artifact lives in one repo's `spec/plans/`, and work that changes repo X must live in repo X for per-repo lint, commit, and spec↔code traceability. Separate per-repo sub-plan artifacts are the point, not an accident.
- **Fold execution into the existing single-repo topology only** (model the relationship but stop short of cross-repo orchestration). Rejected per user direction: the whole value is "one Idea → a coordinated cross-repo run that converges on integration and tests." Without the outer coordinator the relationship is inert.
- **Two separate Ideas (model vs. execution).** Considered, but rejected by user direction and cohesion: the model is the substrate the execution layer consumes, and the dogfood demo requires both at once. Splitting them would duplicate the same cross-repo integration work twice.

## MVP Scope

Build the four facets just far enough to **implement this Idea with its own mechanism**:

1. **`specscore-cli` (first sub-plan):** teach `specscore spec lint` to accept the new frontmatter — task delegation ref, plan `parent` ref, and the `<repo-slug>:<slug>` cross-repo form — validating same-repo refs and treating cross-repo refs as syntactic-only. This unblocks every later artifact.
2. **`specscore` spec model:** extend the Plan and Task entities with the delegation ref, the `parent` ref (single-parent), and the cross-repo ref convention; document the master/sub-plan composition in the Plan spec's recursive model; and flip `Feature.source_ideas` to required-with-explicit-`none`.
3. **`specstudio-skills`:** the `plan` skill can author a master plan with cross-repo sub-plans; the `implement` skill gains the outer coordinator (fan out to sub-plans via the existing engine, honor cross-repo `Depends-On`, run an integration-and-tests phase).

Prove it by executing this Idea's own master plan: CLI-lint sub-plan first, then model, then skills — run cross-repo, lint-clean at each step, converging on a passing integration check. Stop there. No DAG parents, no sibling-resolving lint, no cross-repo back-link automation, no remote/multi-machine transport.

## Not Doing (and Why)

- Cross-repo lint resolution (sibling scanning) — soft refs only for MVP; sibling-resolving lint is a follow-on
- Automatic cross-repo back-link maintenance — single-repo lint --fix cannot sync Referenced-by across repos; manual/deferred
- Multi-parent sub-plans (DAG) — tree only for MVP
- A new intra-repo execution engine — reuse implement-execution-topology and implement-workflow-execution-engine; this adds only the outer cross-repo coordination plus integration phase
- Multi-machine / remote transport for cross-repo agents — local sibling-repo workspace only for MVP
- A revived generic `specscore new` root command or `cli/new` Feature — both are absent today and stay that way; scaffolding remains per-type (`cli/plan/new`, `cli/idea/new`, …), and `plan new` gains `--parent` rather than any generic verb growing a type switch

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The current CLI lint rejects the new frontmatter, so the CLI-lint sub-plan must run first for a clean bootstrap. | Add a `parent` ref and a `<repo-slug>:` ref to a throwaway plan and run today's `specscore spec lint`; confirm it fails. |
| Must-be-true | Soft (unvalidated) cross-repo refs are tolerable for the MVP — a stale cross-repo link will not cause silent, costly misroutes the way an unvalidated *idea* destination did. | Dogfood the master plan; check whether any stale cross-repo ref would have slipped past review and the integration-and-tests phase undetected. |
| Should-be-true | The existing single-repo execution engine can be driven per-sub-plan by an outer coordinator with no changes to the engine itself. | Run two sub-plans in two repos through the existing topology/workflow engine under a thin coordinator; confirm no engine modification was required. |
| Should-be-true | Single-parent (tree) sub-plans are sufficient; no real case in the dogfood needs a sub-plan shared by multiple masters. | Review the dogfood decomposition for any sub-plan that two masters would want to share. |
| Might-be-true | Integration-and-tests deserves a first-class phase in the master plan rather than just being the last delegated task. | Defer — decide after the first cross-repo run shows whether a plain final task suffices. |


## SpecScore Integration

- **New Features this would create (the cross-repo fan-out, and a live demo of one Idea → many Features across repos):**
  - `specscore-cli` — lint acceptance + validation rules for delegation refs, plan `parent` refs, and the `<repo-slug>:<slug>` cross-repo form (built **first**); plus extending the existing `cli/plan/new` Feature with a `--parent <plan-ref>` flag (and revising its "plans are flat" assertion).
  - `specscore` — Plan/Task entity extensions (delegation ref, `parent`, cross-repo ref convention), the Plan-spec recursive-model docs, and the `Feature.source_ideas` required-with-explicit-`none` change.
  - `specstudio-skills` — `plan` skill authors master/sub-plans; `implement` skill gains the outer cross-repo coordinator + integration phase.
  - `ai-plugin-specscore` — **conditional, not on the critical path.** It is the CLI-wrapper plugin (skills mirror CLI resource groups 1:1); it changes only if the *CLI contract* changes. MVP-minimal (lint-rule changes only) means at most small doc touch-ups in its `spec` (lint) and `feature` wrapper skills. If `specscore plan` queries are enriched (parent/children/cross-repo), it gains its currently-missing `plan` wrapper skill. Decide at specify.
- **Existing Features affected:** Plan, Task, and Feature entities (`specscore`); the `plan` and `implement` skills (`specstudio-skills`); spec-lint (`specscore-cli`). The three single-repo execution Ideas are *extended, not replaced*.
- **Dependencies:** `plan-granularity-improvement` (required, acyclic `Depends-On` is the cross-plan ordering substrate); `implement-execution-topology`, `implement-workflow-execution-engine`, `implement-per-task-execution-mode` (the intra-repo engine the coordinator delegates to); `idea-skills-destination-resolution` (the `<repo-slug>:` cross-repo ref convention + sibling-repo detection precedent).

## Open Questions

- Exact syntax for the delegation ref and the cross-repo prefix (`<repo-slug>:<plan-slug>` vs. a `https://specscore.md/...` URL form) — resolve at specify.
- How a master plan's status rolls up from cross-repo sub-plan statuses when single-repo `lint --fix` cannot read sibling repos (status rollup is single-repo today).
- Whether integration-and-tests is a dedicated terminal sub-plan or a phase in the master coordinator.
- **CLI scope:** MVP needs new lint *behavior* (rules) **and** one new flag — `--parent <plan-ref>` on the existing `specscore plan new` (`cli/plan/new`), so sub-plans are scaffolded with their parent set via the required-CLI per-type path. Open: whether the FACET C coordinator also needs `specscore plan info`/`list` enriched to surface `parent`/children/cross-repo refs for tree traversal (dovetails with `specscore-cli-should-expose-a-plan-verb`), or can walk files directly and defer that.
- **`ai-plugin-specscore` is conditional, not core:** it only changes if the CLI contract changes (see SpecScore Integration). Resolve at specify whether MVP touches it at all.

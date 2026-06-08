---
format: https://specscore.md/plan-specification
status: draft
---

# Plan: Cross-Repo Plan Composition (master)

**Status:** draft
**Features:**
  - [plan](../../features/plan/README.md)
  - [task](../../features/task/README.md)
  - [feature](../../features/feature/README.md)
**Source type:** idea
**Source:** [cross-repo-plan-composition](../../ideas/cross-repo-plan-composition.md)
**Author:** alexander.trakhimenok
**Created:** 2026-06-07

## Context

This is the **master plan** for the [cross-repo-plan-composition](../../ideas/cross-repo-plan-composition.md) Idea. It is a directory-form composite plan whose tasks each delegate to a **sub-plan** in the repo that does the work, ordered so the bootstrapping CLI sub-plan lands first.

The Idea fans out into five Features across three repos (all now specified and Approved, on `feat/cross-repo-plan-composition` branches with draft PRs):

| Feature | Repo | Artifact | PR |
|---|---|---|---|
| 1. `plan new --parent` + lint `P-005` | `specscore-cli` | `cli/plan/new`, `cli/spec/lint/plan-rules` | [specscore-cli#65](https://github.com/specscore/specscore-cli/pull/65) |
| 2. `parent`/`sub_plan` entity model | `specscore` | `plan`/`task` entities + plan README | [specscore#22](https://github.com/specscore/specscore/pull/22) |
| 3. `source_ideas` required-with-`none` | `specscore` + `specscore-cli` | `feature` entity + `cli/spec/lint/feature-rules` | [specscore#22](https://github.com/specscore/specscore/pull/22), [specscore-cli#65](https://github.com/specscore/specscore-cli/pull/65) |
| 4. `plan` skill authors master/sub-plans | `specstudio-skills` | `skills/plan` | [specstudio-skills#25](https://github.com/specscore/specstudio-skills/pull/25) |
| 5. `implement` skill cross-repo coordinator | `specstudio-skills` | `skills/implement` | [specstudio-skills#25](https://github.com/specscore/specstudio-skills/pull/25) |

**Bootstrapping order is load-bearing.** Feature 1 (the `specscore-cli` lint + `plan new --parent`) MUST be implemented first: until it ships, the new `**Parent:**` frontmatter is unvalidated and `--parent` does not exist. Once Feature 1 lands, the cross-repo `**Parent:**` references this very plan relies on become first-class. This master plan is therefore the dogfood — its own sub-plans are composed with the mechanism it builds.

Per [AGENTS.md], no CLI code lives in this repo: tasks that produce CLI code are executed in `specscore-cli`; tasks that change skill behavior are executed in `specstudio-skills`. Each task below names the sub-plan and repo that own the work.

## Acceptance criteria

- Each of the five Features is implemented in its repo, with its Feature ACs verified by tests, behind its sub-plan.
- `specscore plan new --parent <ref>` exists and emits a `**Parent:**` line; lint rule `P-005` validates same-repo parents (resolve + acyclic) and accepts cross-repo `<repo-slug>:<slug>` refs syntactically.
- `feature-source-ideas-required` enforces the `**Source Ideas:**` line and `--fix` backfills the `—`/`none` sentinel across existing features.
- The `plan` skill can author a master plan + cross-repo sub-plans; the `implement` skill executes a master plan by dispatching sub-plans through the single-repo engine, honoring cross-repo ordering, and gating on an integration-and-tests phase.
- The integration phase re-creates this master plan's sub-plans using the shipped tooling (`plan new --parent`) and the result lints clean with `P-005` enforced — proving the dogfood end to end.

## Tasks

### 1. Bootstrap — `plan new --parent` + plan lint `P-005`

Implement Feature 1 in `specscore-cli`: add the `--parent <plan-ref>` flag to `specscore plan new` (emit a verbatim `**Parent:**` line) and the `P-005` parent-reference-validity lint rule (same-repo resolve + acyclic + no self-parent; cross-repo `<repo-slug>:<slug>` syntactic-only). This is the bootstrap — nothing else can be lint-clean with `**Parent:**` until it lands.

**Sub-Plan:** `specscore-cli:feature-1-plan-composition-cli`
**Depends on:** (none)
**Produces:** `--parent` flag + `**Parent:**` emission in `cli/plan/new`; rule `P-005` registered in the default suite; Go tests covering the new ACs.
**Acceptance criteria:** the `cli/plan/new#ac:parent-recorded-verbatim` and `cli/spec/lint/plan-rules#ac:*` (P-005) ACs pass; `specscore spec lint` stays green in `specscore-cli`.

### 2. `source_ideas` required-with-`none` — lint + migration

Implement Feature 3's CLI side in `specscore-cli`: the `feature-source-ideas-required` rule and the `--fix` backfill, then run the migration that backfills `**Source Ideas:** —` across the existing feature READMEs.

**Sub-Plan:** `specscore-cli:feature-3-source-ideas-required`
**Depends on:** Task 1
**Produces:** `feature-source-ideas-required` rule + `--fix` backfill; migration commit backfilling existing features.
**Acceptance criteria:** the `cli/spec/lint/feature-rules#ac:*` ACs pass; a full-tree `specscore spec lint` is green after the migration.

### 3. Entity model conformance — `parent` / `sub_plan` / `source_ideas`

Implement Feature 2 (and Feature 3's entity side) in `specscore`: ensure the `plan.parent`, `task.sub_plan`, and `feature.source_ideas` entity changes are consistent with the shipped lint and that the recursive-model docs match the enforced behavior.

**Sub-Plan:** `specscore:feature-2-entity-model`
**Depends on:** Task 1
**Produces:** entity docs reconciled with `P-005` behavior; any spec-repo scenarios for the composition model.
**Acceptance criteria:** `specscore spec lint` green with the new rules running; entity tables and the Cross-repo plan composition section match enforced behavior.

### 4. `plan` skill authors master/sub-plans

Implement Feature 4 in `specstudio-skills`: the `plan` skill authors a master plan (idea-sourced, `**Sub-Plan:**` tasks) and scaffolds sub-plans via `specscore plan new --parent`, encoding cross-repo ordering in the master's `**Depends-On:**`.

**Sub-Plan:** `specstudio-skills:feature-4-plan-skill-composition`
**Depends on:** Tasks 1, 3
**Produces:** updated `plan` skill that emits master/sub-plan structures using the shipped CLI flag.
**Acceptance criteria:** the `skills/plan#ac:master-plan-coordinates-subplans`, `#ac:subplan-scaffolded-with-parent`, and `#ac:composition-cross-repo-soft` ACs pass.

### 5. `implement` skill cross-repo coordinator

Implement Feature 5 in `specstudio-skills`: the `implement` skill detects a master plan, dispatches each sub-plan through the existing single-repo engine, honors cross-repo ordering, resolves cross-repo refs at execution time, and gates completion on the integration-and-tests phase.

**Sub-Plan:** `specstudio-skills:feature-5-implement-coordinator`
**Depends on:** Tasks 1, 4
**Produces:** updated `implement` skill with the outer coordinator.
**Acceptance criteria:** the `skills/implement#ac:master-plan-detected-and-delegated`, `#ac:cross-repo-ordering-enforced`, `#ac:unresolved-cross-repo-ref-halts`, and `#ac:integration-phase-gates-completion` ACs pass.

### 6. Integration & tests — dogfood the composition

With all five Features shipped, re-create this master plan's sub-plans using the shipped tooling (`specscore plan new --parent specscore:cross-repo-plan-composition`) and run the cross-repo build/test. This is the integration-and-tests phase that proves the mechanism end to end.

**Sub-Plan:** (this task is the integration phase; it has no delegated sub-plan)
**Depends on:** Tasks 1, 2, 3, 4, 5
**Produces:** regenerated, lint-clean sub-plans carrying real `**Parent:**` refs validated by `P-005`; a passing cross-repo integration run.
**Acceptance criteria:** the regenerated sub-plans lint clean with `P-005` enforced; `plan` + `implement` skills drive the composition without manual frontmatter authoring.

## Dependency graph

```text
Task 1 (bootstrap: --parent + P-005)
  ├── Task 2 (source_ideas lint + migration)
  ├── Task 3 (entity model conformance)
  │     └── Task 4 (plan skill)
  │           └── Task 5 (implement coordinator)
  └────────────────────────────────────────────── Task 6 (integration & tests)
                         (depends on Tasks 1–5)
```

Task 1 is the bootstrap and gates everything. Tasks 2 and 3 parallelise after it. Tasks 4 and 5 are the skill layer (4 → 5). Task 6 is the integration phase and depends on all of 1–5.

## Risks and open decisions

- **`plan new --idea` lint gap (discovered while authoring this plan).** Today's `P-002` unconditionally demands `**Source Feature:**`, so single-file *idea-sourced* plans fail lint — which is why this master plan is directory-form. The `plan-rules` revision (Task 1) should also make `P-001`/`P-002` skip idea-sourced single-file plans, or this gap persists for future master plans authored as single files.
- **Cross-repo back-link maintenance is out of scope.** A sub-plan names its master via `**Parent:**`, but nothing keeps the master's view of cross-repo children in sync — single-repo `lint --fix` cannot. Deferred per the Idea.
- **Sub-plan AC coverage vs. entity-revision features.** Features 2/3's entity edits don't add formal `### AC:` entries, so their sub-plans are framed around the shipped lint behavior rather than feature ACs. Acceptable for the dogfood; a future revision may add explicit entity-conformance scenarios.

## Open Questions

- Whether the integration phase (Task 6) should itself be a delegated sub-plan or remain an in-master coordination task once the `implement` coordinator exists.

## Snapshots

| Date | Git Hash | Action | Comment |
|---|---|---|---|
| 2026-06-07 | — | drafted | Initial master plan: 6 tasks coordinating five cross-repo sub-plans, CLI-bootstrap first. Authored directory-form because today's P-002 rejects idea-sourced single-file plans. |
| 2026-06-08 | — | implemented | All five Features implemented in code. specscore-cli: `plan new --parent`, lint `P-005`, `feature-source-ideas-required` + 27-file migration (100% coverage). specscore: `parent`/`sub_plan`/`source_ideas` entity model. specstudio-skills: `plan` + `implement` skills carry master/sub-plan authoring and the cross-repo coordinator. Dogfood verified: `P-005` validates the real cross-repo `**Parent:**` sub-plan. |

---
*This document follows the https://specscore.md/plan-specification*

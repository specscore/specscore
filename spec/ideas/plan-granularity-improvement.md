# Idea: Plan Granularity Improvement — Per-Task Dependencies and Model Tier

**Status:** Approved
**Date:** 2026-06-04
**Owner:** alexander.trakhimenok
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we enrich each Plan task with explicit dependencies and an execution model tier — so SpecScore plans express a real dependency graph and a per-task compute level, enabling parallel, cost-aware execution instead of a strictly-linear, one-size-fits-all run?

## Context

The Task entity (spec/features/task/task.entity.md) already defines depends_on (array of task refs) but as optional, and no SpecScore producer emits it: the specstudio-skills plan skill is strictly-linear and explicitly defers DAG ordering, so today every plan is a linear chain. Downstream execution work in specstudio-skills (implement-workflow-execution-engine, implement-per-task-execution-mode) needs a real dependency graph to compute parallel batches — without required depends_on, parallel execution cannot exist. Separately, every task is implicitly run at one model level; there is no way for a plan to say that a mechanical edit is fine on a small model while a design task needs a large one. The only model concept in the ecosystem is reviewer-gates opaque model string identifier (in specstudio-skills); there is no model-tier taxonomy, and consilium explicitly defers per-role model selection. This Idea adds both per-task properties at the entity and lint level so plans become parallelizable and cost-aware. Cross-repo neighbors (specstudio-skills): implement-workflow-execution-engine (consumes depends_on to batch) and implement-per-task-execution-mode (model required only when a task runs as a subagent or workflow, not inline).

## Recommended Direction

Ship two per-task properties that share one surface (the Task entity, the plan markdown format, plan lint, and the plan skill). FACET A — depends_on becomes required at the entity level: flip the Task entity depends_on check to required, with an empty array (rendered as none) as the explicit no-dependencies value, so a task always states its dependencies rather than omitting them. The plan markdown task block gains a Depends-On line; the plan skill emits it and retires its strictly-linear-only restriction so it may author a DAG; plan lint validates that refs resolve and the graph is acyclic. FACET B — add a model property to the Task entity: a required abstract tier (small / medium / large — vendor-neutral and durable across model renames) that the implement runtime maps to a concrete model, plus an OPTIONAL opaque override string (same shape as reviewer-gates model field) for when a plan must pin an exact model for reproducibility or evaluation. Because model only matters when a task runs in isolation, the tier enum also includes an inherit value meaning run at the session or inline default — inline-executed tasks use inherit, which satisfies a global required check without forcing a meaningless choice. Together the two facets turn a SpecScore plan from a flat linear list into a typed dependency graph with per-node compute intent — the substrate the specstudio-skills execution Ideas need.

## Alternatives Considered

- **Keep `depends_on` optional; enforce required only in the plan skill (plan-authoring level).** Narrower blast radius, but rejected per decision: a single entity-level `required` is one source of truth, whereas skill-only enforcement lets non-skill producers emit dependency-less tasks and drift apart from the schema.
- **Model as an opaque identifier only (the reviewer-gates precedent).** Rejected as the primary type — it pins plans to vendor model names that age and are vendor-specific. The opaque string survives, but demoted to the *optional override* rather than the required field.
- **Model as an abstract tier only (no override).** Rejected: some plans genuinely must pin an exact model (reproducibility, evals, A/B). The optional override covers that without making model-name pinning the default.
- **Two separate Ideas, one per facet.** Rejected by user direction and by cohesion: both are per-task plan-granularity properties sharing the same Task-entity / plan-lint / plan-skill surface; splitting them would duplicate the same integration work twice.

## MVP Scope

Update the Task entity: depends_on becomes required (empty equals explicit none); add a required model tier property (enum small, medium, large, inherit) plus an optional model override string. Add plan-lint rules: every task declares depends_on (refs resolve, graph acyclic) and a model tier. Update the specstudio-skills plan skill to emit both fields per task and to author non-linear DAG ordering. Prove on one real plan with a 2-wide parallel branch and mixed model tiers that it lints clean and that implement can read the graph. The new required fields apply only to non-terminal plans; plans in a terminal status (`implemented`, `withdrawn`, `superseded` — see `plan-status-lifecycle`) are exempt and remain valid as-is.

## Not Doing (and Why)

- Concrete model-name taxonomy or vendor model list — the tier enum is abstract; mapping a tier to a real model is an implement-runtime concern, not a schema concern
- Auto-inferring depends_on from AC or file analysis — dependencies are author-declared in MVP; inference is a later enhancement
- Per-task cost budgets or token caps — model tier expresses compute level, not a budget; budgets are out of scope
- Specifying how implement consumes the graph (batching, parallel dispatch) — owned by the specstudio-skills execution Ideas, not this schema change
- Cross-plan or cross-feature dependency refs — depends_on stays within a single plan tasks in MVP

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Flipping `depends_on` to required at the entity level does not break existing Task/Plan consumers that omit it. | Grep existing plans/tasks for `depends_on` usage; count how many need backfill; confirm `lint --fix` can insert an explicit empty/`none`. |
| Must-be-true | An abstract model tier (small/medium/large/inherit) can be deterministically mapped to a concrete model by the implement runtime. | Sketch the tier→model map for the current Claude lineup; confirm each tier has a sensible, unambiguous target. |
| Should-be-true | "Required only for subagent/workflow tasks" is expressible cleanly — either an `inherit` sentinel inside a globally-required tier, or an optional property plus a conditional plan-lint rule keyed on execution mode. | Prototype both against a plan with one inline and one subagent task; pick the lower-friction option. |
| Should-be-true | A DAG plan format (Depends-On refs) can be lint-checked for acyclicity and ref-resolution without major lint-engine work. | Spike a cycle-detection + ref-resolution lint rule over a sample DAG plan. |
| Might-be-true | The two facets are cohesive enough to specify and ship as one Feature rather than two sub-features. | At specify time, check whether the AC sets are entangled or cleanly separable. |


## SpecScore Integration

- **New Features this would create:** one `plan-granularity` Feature (or two sub-features under it — `task-dependencies` and `task-model-tier`) defining the entity changes, the plan markdown fields, and the new lint rules.
- **Existing Features affected:** `task` (`spec/features/task` — `depends_on` flips to required; new `model` tier + optional override properties); `plan` (`spec/features/plan` — task-block markdown gains `Depends-On` and `Model` lines; ordering discipline relaxes from strictly-linear to DAG); `entity`/`property` (if the model enum + override need new property-type support); `reviewer-gates` (its opaque `model:` string is the precedent the override mirrors — keep them consistent). Cross-repo (specstudio-skills): the `plan` skill (emit both fields, author DAGs), the `implement` skill, and the two execution Ideas below that consume this.
- **Dependencies:** depends on `plan-status-lifecycle` (specscore) for the grandfathering rule — terminal-status plans (`implemented`/`withdrawn`/`superseded`) are exempt from the new required fields. Unblocks the specstudio-skills `implement-workflow-execution-engine` Idea (parallel batching needs the dependency graph) and pairs with `implement-per-task-execution-mode` (model is required only for subagent/workflow execution, not inline). No other upstream blockers within specscore.

## Open Questions

- How is "model required only for subagent/workflow tasks" expressed — an `inherit` sentinel inside a globally-required tier, or an optional property plus a conditional plan-lint rule keyed on the task's execution mode (which lives in a different repo's skill)?
- What is the exact tier vocabulary — `small/medium/large`, `fast/balanced/deep`, or numeric levels? What is the canonical tier→concrete-model mapping, and where does it live (specscore config vs the implement runtime)?
- Sentinel naming (resolved for MVP): the non-dispatched value is `inherit` — "use the ambient/session model" — chosen over `default` because `default` would mean "use the project's configured default tier," a baseline-tier mechanism that does not exist yet. If such a mechanism is later introduced, add `default` then as a genuinely distinct value (baseline *tier* vs ambient *model*); do not alias the two. Note this sentinel disappears entirely if requiredness becomes conditional (tier absent on inline tasks) per the first Open Question.
- Migration: do existing plans/tasks get a one-time backfill to add `depends_on: none` and a model tier, or does `lint --fix` add them on next touch?
- Grandfathering exemption keys off terminal status (`implemented`/`withdrawn`/`superseded`) per `plan-status-lifecycle`, which makes `implemented` first-class and resolves the earlier "completion is not a plan status" gap. Confirm the exemption set at specify (is `failed` exempt too, or only the clean-terminal three?).
- Does `depends_on` stay intra-plan only, or eventually allow cross-plan/cross-feature task refs (the entity `ref` type technically permits any task)?
- How does an empty `depends_on` render in the plan markdown (literal `none`?) and round-trip through the CLI parser?

---
*This document follows the https://specscore.md/idea-specification*

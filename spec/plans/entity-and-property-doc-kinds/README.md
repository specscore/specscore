# Plan: Entity and Property Doc-Kinds

**Status:** approved
**Features:**
  - [entity](../../features/entity/README.md)
  - [property](../../features/property/README.md)
  - [document-types-registry](../../features/document-types-registry/README.md)
**Source type:** feature
**Source:** [entity](../../features/entity/README.md), [property](../../features/property/README.md), [document-types-registry](../../features/document-types-registry/README.md)
**Author:** alexander.trakhimenok
**Approver:** alexander.trakhimenok
**Created:** 2026-05-18
**Approved:** 2026-05-18

## Context

The [entity-and-property-definitions](../../ideas/entity-and-property-definitions.md) Idea introduces two new Document-Kind Features (`entity`, `property`) and amends `document-types-registry` to allow comma-separated `Consumer Path` globs. The Feature READMEs are written and `Approved`. This plan delivers the rest of the MVP across two repositories:

- **`synchestra-io/specscore`** (this repo) — the worked-example smoke-test (one real `*.entity.md` plus one shared `*.property.md`), the SpecScore documentation surface that explains the new Doc-Kinds, and any blog/site copy. These artifacts dogfood the format and give the CLI implementer concrete fixtures.
- **`synchestra-io/specscore-cli`** — the lint passes, the new `specscore entity`/`specscore property` subcommands, the managed-section renderers, and the `feature refs` extension. The CLI changes are gated by this plan but live in that repo; per [AGENTS.md](../../../AGENTS.md), no CLI code lives here.

The smoke-test fixtures intentionally land before the CLI catches up: they will not auto-render their managed `## Properties` / `## Referenced by` sections until the CLI ships, but their hand-authored forms must equal what `specscore lint --fix` will eventually emit. The fixtures are the contract.

## Acceptance criteria

- One real `*.entity.md` and one real `*.property.md` exist under `spec/features/**` in this repo, hand-authored to exactly match what `specscore lint --fix` will eventually produce. Reviewing them gives any implementer a target shape.
- `specscore spec lint` (current `0.17.0` build, which does not yet know about entity/property) MUST remain `0 violations found` after the fixtures land. The fixtures do not regress the existing tree.
- The smoke-test entity is referenced by at least one existing SpecScore Feature's narrative prose (not a structured `Consumes:`/`Produces:` field — that mechanism is a separate Idea) so a reader can see the entity in context.
- A new `docs/for/spec-authors/entities-and-properties.md` (or similar role-guide entry) explains how to write entity and property files end-to-end. Site build (`pnpm build` in `tools/site-generator/`) succeeds and the new page renders.
- A scenario file under `spec/features/entity/_tests/` and one under `spec/features/property/_tests/` exists for each non-trivial AC, scaffolded with `status: pending` per the [Rehearse heuristic](../../features/scenario/README.md), so the CLI implementer can drive their work from concrete examples.
- The `specscore-cli` Issue (or set of Issues) tracking the CLI implementation is filed against `synchestra-io/specscore-cli` with links back to the three Features and to this plan.

## Tasks

### 1. Author the worked-example Property file

Hand-author the `email` Property file at `spec/features/idea/email.property.md`, co-located with the [idea Feature](../../features/idea/README.md) — whose `**Owner:**` body-metadata field is semantically a user's email address, making `idea/` the most defensible smoke-test host. The frontmatter declares `kind: property`, `id: email`, `data_type: string`, and the same `checks` shape the [property Feature](../../features/property/README.md) specifies. The body has `## Description` (hand-written prose), and a `## Referenced by` managed section seeded with the canonical `<!-- managed-by: specscore lint --fix -->` / `<!-- end-managed -->` markers and the (single) initial entity consumer once Task 2 lands.

Co-location is the simplest viable smoke-test placement: it avoids inventing a new `spec/features/shared/` convention prematurely, sidesteps the cross-cutting placement question (which the property Feature deliberately defers), and matches the entity Feature's "co-locate with the feature or module that owns them" recommendation.

**Depends on:** (none)

**Produces:**
- `spec/features/idea/email.property.md` — the smoke-test Property.

**Acceptance criteria:**
- File path is `spec/features/idea/email.property.md` (matches the `spec/features/**/*.property.md` glob).
- Frontmatter is the first block; `kind: property`; `id: email`; `data_type: string`; non-empty `checks` mapping; valid against every REQ in [property Feature](../../features/property/README.md).
- Body has `# Property: email`, `## Description` (non-placeholder prose), `## Referenced by` with managed-section markers, adherence footer pointing to `https://specscore.md/property-specification`.
- `specscore spec lint` returns `0 violations found` (the file is invisible to the current lint build, which is acceptable — the file's authority is the Feature spec, not the linter's current knowledge).

### 2. Author the worked-example Entity file

Hand-author the `user` Entity file at `spec/features/idea/user.entity.md`, co-located with the [idea Feature](../../features/idea/README.md) for the same reason as Task 1 — the Idea's `**Owner:**` field is semantically a User. Frontmatter declares `kind: entity`, `id: user`, `singular: User`, `plural: Users`, and a `properties` list that mixes inline definitions and a `ref:` to `./email.property.md` (sibling file). Body has `## Description`, the managed `## Properties` table (hand-rendered to match what `specscore lint --fix` will produce), and the managed `## Referenced by` section seeded with `- _No references yet._`.

**Depends on:** Task 1

**Produces:**
- `spec/features/idea/user.entity.md` — the smoke-test Entity.
- Cross-reference: `## Referenced by` in `spec/features/idea/email.property.md` updated by hand to list the new `user` entity (this is what `specscore lint --fix` will eventually do — we are pre-authoring the contract).

**Acceptance criteria:**
- File path matches the `spec/features/**/*.entity.md` glob.
- Frontmatter is the first block; `kind: entity`; `id: user`; valid `singular`/`plural`/`properties` list; at least one `ref:` and at least one inline property; valid against every REQ in [entity Feature](../../features/entity/README.md).
- `## Properties` table is wrapped in managed-section markers and renders the frontmatter faithfully (rows in frontmatter order, `ref:`-referenced properties cite the target Property file).
- `## Referenced by` is wrapped in managed-section markers and reads `- _No references yet._` (no consumers yet).
- Adherence footer points to `https://specscore.md/entity-specification`.
- `specscore spec lint` remains `0 violations found`.

### 3. Scaffold Rehearse scenario stubs

Per the [scenario Feature](../../features/scenario/README.md), scaffold Given/When/Then scenario stubs in `spec/features/entity/_tests/` and `spec/features/property/_tests/` — one per non-trivial AC. Every stub carries `**Validates:** <feature-path>#ac:<slug>` and a placeholder `## Steps` section with `status: pending` (or this repo's equivalent marker). The stubs are intentionally NOT executable yet; they exist as forcing functions for the CLI implementer.

**Depends on:** Tasks 1, 2 (so the fixtures the scenarios cite already exist).

**Produces:**
- `spec/features/entity/_tests/README.md` plus one stub per AC in `entity/README.md`.
- `spec/features/property/_tests/README.md` plus one stub per AC in `property/README.md`.

**Acceptance criteria:**
- Every AC in `entity/README.md` and `property/README.md` has at least one scenario stub; ACs deferred from MVP have a stub explicitly marked deferred-pending-CLI.
- `_tests/README.md` indexes its directory per [scenario#req:tests-readme](../../features/scenario/README.md#req-tests-readme).
- `specscore spec lint` remains `0 violations found`.

### 4. Author the spec-authors documentation page

Write `docs/for/spec-authors/entities-and-properties.md` (or the closest path matching this repo's existing `docs/for/` taxonomy — confirm at execution time). The page explains: when to use Entity vs Property, the frontmatter-as-source-of-truth philosophy, how `ref:` works between an entity and a property, the additive-only inheritance rule, the managed-sections contract, and links into the two Feature READMEs as the authoritative specs.

**Depends on:** Tasks 1, 2 (so the page can show real worked examples by linking to the smoke-test fixtures).

**Produces:**
- `docs/for/spec-authors/entities-and-properties.md` (or equivalent).
- Any necessary nav/index updates in the surrounding `docs/for/` README.

**Acceptance criteria:**
- The page renders cleanly via `pnpm build` in `tools/site-generator/`.
- The page links to (a) the entity Feature, (b) the property Feature, (c) the smoke-test entity, (d) the smoke-test property — all four with relative links the site generator resolves.
- Existing site nav (if a nav index exists for `docs/for/spec-authors/`) is updated to surface the page.

### 5. File the `specscore-cli` implementation Issues

Open an Issue (or a small set of Issues, depending on the CLI repo's convention) against `synchestra-io/specscore-cli` capturing the CLI work scoped by this plan. Each Issue links back to the relevant Feature and to this plan, and carries enough detail for the CLI maintainer to start without re-reading three Feature READMEs from scratch.

The CLI surface to scope (per the [entity Feature](../../features/entity/README.md#tooling-support)):

1. **Lint passes** for `*.entity.md` and `*.property.md` files — frontmatter schema, `id == slug`, `data_type` vocabulary, `checks` applicability, inheritance integrity (additive-only, acyclic, target-exists), `ref:` target-exists, managed-section rewrites for `## Properties` and `## Referenced by`, comma-separated `Consumer Path` resolution in `document-types-registry`.
2. **`specscore entity`** subcommands: `list`, `refs <id>`, `tree`.
3. **`specscore property`** subcommands: `list`, `refs <id>`.
4. **`specscore feature refs`** extension to surface entity links (gated behind the forthcoming `Consumes:`/`Produces:` mechanism — file as a follow-up issue, not blocking).

**Depends on:** Tasks 1, 2 (so the CLI maintainer has fixtures to test against).

**Produces:**
- One or more open Issues on `synchestra-io/specscore-cli`, linked from this plan's Snapshots/Outstanding Questions section.

**Acceptance criteria:**
- At least one Issue is filed against `synchestra-io/specscore-cli` and linked from this plan.
- Each Issue references the three Features and this plan by URL.

### 6. Snapshot and submit for approval

Add an `approved` row to the Snapshots section with the git hash at which this plan reached `approved` status. Flip status `draft → in_review → approved`. Update `spec/plans/README.md` (the plans-index) to reflect the final status.

**Depends on:** Tasks 1–5.

**Produces:**
- Plan `Status: approved` with `Approver` and `Approved` header fields populated.
- Snapshot row in `## Snapshots`.
- Plans-index row updated.

**Acceptance criteria:**
- `specscore spec lint` returns `0 violations found`.
- `spec/plans/README.md` lists this plan with `Status: approved`.
- This plan's `Approver` and `Approved` fields are populated.

## Dependency graph

```text
Task 1 (Property fixture)
  └── Task 2 (Entity fixture)
       ├── Task 3 (scenario stubs)
       ├── Task 4 (docs page)
       └── Task 5 (CLI repo issues)
            └── Task 6 (snapshot + approve)
```

Tasks 3, 4, and 5 are parallelisable once Task 2 lands.

## Risks and open decisions

- **The CLI build doesn't yet validate entity/property files.** Smoke-test fixtures land hand-authored; correctness is reviewer-checked, not lint-checked. Risk: silent drift between the hand-authored shape and what `specscore lint --fix` eventually produces. Mitigation: keep the fixtures small, link them explicitly from this plan, and re-validate them as the first user-visible test once the CLI ships.
- **Host feature for the smoke-test fixtures is `idea/`.** Locked in because the Idea's `**Owner:**` field is semantically a user's email — clean smoke-test rationale. If a real consumer later adopts a `shared/` or `common/` convention for cross-cutting Properties, the smoke-test fixtures can be moved as part of that separate decision; they are not load-bearing.
- **Documentation page taxonomy** (`docs/for/spec-authors/` vs another category) — confirm at execution. The plan does not pin a specific path because the existing `docs/for/` structure is the authority.
- **Site generator path resolution.** The new docs page links into `spec/features/**` and `spec/features/shared/email.property.md`. If `tools/site-generator/` rewrites URLs in a way that breaks these links, Task 4 needs a small site-generator fix as a sub-task. Verify at Task 4 start.

## Outstanding Questions

- Should this plan also amend the [Idea](../../features/idea/README.md) Feature to add a `Consumes:` / `Produces:` header so the smoke-test entity can be referenced structurally rather than only in prose? Decision: NO for this plan — that mechanism is a separate Idea per the source Idea's Not Doing list, and adding it here would inflate scope past one cycle.
- Should the smoke-test `email` Property also have an inline JSON Schema (`checks.json_schema`) demonstrating the embedded-schema feature, or is the pattern/length pair sufficient for MVP? Lean: pattern/length only; defer JSON Schema demo until a real consumer needs it.
- Once `specscore-cli` ships the lint rules, should this plan be reopened as a `checkpoint` snapshot to record the moment the fixtures became lint-validated? Lean: yes — capture it as a `checkpoint` action.

## Snapshots

| Date | Git Hash | Action | Comment |
|---|---|---|---|
| 2026-05-18 | `9e65e75` | drafted | Initial plan write following Feature approval |
| 2026-05-18 | `9e65e75` | checkpoint | Tasks 1–4 implemented in same session as draft. Property fixture (`spec/features/idea/email.property.md`), entity fixture (`spec/features/idea/user.entity.md`), Rehearse scenario stubs for all 12 ACs (6 each in `spec/features/{entity,property}/_tests/`), author guide (`docs/entities-and-properties.md`) with site-config entry and successful `pnpm build`. Task 5 (file CLI Issues on `synchestra-io/specscore-cli`) deferred to user direction. `specscore spec lint`: 0 violations. |
| 2026-05-18 | `9e65e75` | approved | Plan approved by alexander.trakhimenok in same session as draft + checkpoint. CLI implementation work (Task 5) still deferred and tracked as outstanding. |

---
*This document follows the https://specscore.md/plan-specification*

---
type: sidekick-seed
slug: implement-artifact-frontmatter-convention-in-specscore-cli
captured_at: 2026-06-05T21:08:42Z
captured_by: specstudio:verify
captured_during: spec/features/new-artefact-template-gallery/README.md
trigger: explicit
status: queued
synchestra_task: null
---
# Land the artifact-frontmatter-convention CLI impl — it already exists on a branch; push, review, merge, migrate

## Where this came up

Captured while revising `new-artefact-template-gallery` to bring `/new/*` templates into the Approved [`artifact-frontmatter-convention`](../../features/artifact-frontmatter-convention/README.md) shape. Originally framed as "implement from scratch" — but a follow-up check found the work **already substantially exists**.

## Status correction (2026-06-05)

The implementation lives on a **local, unpushed** `specscore-cli` branch: **`feat/frontmatter-convention-impl`** (Plan-driven, "Task 3–6", ~2,500 lines, 24 files). It covers nearly the whole convention:

- ✅ `lint-format-required` — `pkg/lint/format_field.go` (+ grace period)
- ✅ `lint-status-mirror` — `pkg/lint/status_mirror.go` (missing/extra/drift)
- ✅ `footer-format-mirror` + `--fix` — `pkg/lint/footer_format_mirror.go`
- ✅ scaffolders `idea/feature/plan new` emit `format:`/`status:`
- ✅ `change-status` dual-write — `pkg/lifecycle/rewrite.go`
- ➖ `task new` absent — correct; `task` is board-managed (matches the `format:`-only gallery template)

## Real next steps (land, don't re-implement)

1. **Coordinate** with the branch owner — it is live/unpushed.
2. **Verify** build + tests clean (one early commit was `[WIP — tests pending]`; later commits claim 100% coverage — confirm).
3. **Push → PR → review → merge** to `specscore-cli` main.
4. **Run the cross-repo migration** (one-shot per repo: specscore, specscore-cli, ai-plugin-specscore, specstudio-skills), then flip the grace-period rules to error.
5. Confirm the related bug seed `idea change-status silently reverts yet reports success` is closed by the dual-write work.

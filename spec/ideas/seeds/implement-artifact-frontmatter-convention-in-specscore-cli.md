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
# Implement the artifact-frontmatter-convention in specscore-cli — lint rules + scaffolder/change-status emission

## Where this came up

While revising `new-artefact-template-gallery`, the `/new/*` templates were brought into the Approved [`artifact-frontmatter-convention`](../../features/artifact-frontmatter-convention/README.md) shape (`format:` on all; `status:` mirror on status-bearing types). But the convention is **Approved-but-unimplemented** in the CLI, so the templates now *lead* the scaffolders.

## CLI obligations (all currently unimplemented)

- **`lint-format-required`** — flag missing `format:` or wrong-URL `format:`.
- **`lint-status-mirror`** — flag missing/extra/drifted `status:`; `--fix` rewrites frontmatter from body.
- **`footer-format-mirror`** lint — footer URL must equal frontmatter `format:`; `--fix` derives footer from `format:`.
- **Scaffolder emission** — `feature/idea/task/plan new` + sidekick-capture emit `format:` (+ `status:`).
- **`change-status` dual-write** — rewrite body `**Status:**` and frontmatter `status:` atomically.
- **Migration sequencing** — ship rules grace/warning-only, migrate repos, then flip to error.

## Why it matters now

Until this lands, a *bare* CLI fetch (`cli-template-runtime-fetch`) yields a frontmatter'd artefact while an *embedded* scaffold does not. `task` is convention-classified status-bearing but the gallery template is `format:`-only (board-managed), so the grace period must cover `task` until the task-lifecycle status model is resolved.

## Pushback

Cross-repo (specscore-cli + coordinated migrations in specscore / ai-plugin-specscore / specstudio-skills). Another agent was implementing `plan new` — coordinate so its frontmatter emission isn't duplicated.

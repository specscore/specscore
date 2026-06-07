---
type: sidekick-seed
captured_by: user
status: queued
---
# Remove all "Synchestra" references from the SpecScore code repos (specscore + specscore-cli)

Strategy decision: do not surface "Synchestra" in `specscore/` or `specscore-cli/` until SpecScore has its own momentum. "Synchestra" stays only in marketing repos. Going-forward rule: **no new Synchestra mentions in the code repos**; this seed tracks removing the existing ones. It is NOT a doc-scrub — the name is baked into functional plumbing, so treat as its own scoped Idea/Feature with a migration plan (some changes are breaking).

Audit at capture time (~47 tracked files in `specscore`, ~32 in `specscore-cli`). Entangled surfaces, not just prose:

- **Event transport:** `specscore` tracks `.synchestra/events.jsonl` as the event stream; `specscore-cli` uses `.specscore/events.jsonl`. Inconsistent — pick one neutral path (`.specscore/`) and migrate.
- **Artifact schema:** sidekick-seed (and likely other) frontmatter carries a `synchestra_task:` field; parsed in `specscore-cli/pkg/lint/sidekick_seed.go`. Renaming the field is a schema change touching lint + every seed.
- **Source annotations / code:** `specscore-cli/pkg/sourceref/*` (annotation prefix), `pkg/idearelocate/rewrite.go`, `pkg/plan/parse.go`, `pkg/task/task.go`.
- **Install scripts:** `specscore-cli/scripts/install.sh`, `install.ps1`, and `.gitignore`.
- **Docs / ideas:** many under `specscore/docs/`, `docs/superpowers/*`, and several `spec/ideas/*` (e.g. `journal-and-summary.md` says "the Synchestra event stream") + seeds.

Design questions: what neutral name replaces `synchestra_task` (e.g. `task_ref`/`dispatch_task`)? Single canonical event-transport path? Back-compat/migration for already-written `.synchestra/events.jsonl` and existing seed frontmatter? Sequence relative to SpecScore Hub work (Hub is authored Synchestra-free regardless). Coordinate with `specstudio-skills` (skills also write `synchestra_task` + emit events).

---
type: sidekick-seed
captured_by: user
status: queued
---

# Define recap artifacts in SpecScore — a code↔spec "drift recap" and a "session recap" type, with storage conventions

SpecStudio's recap skill(s) produce recaps, but SpecScore should define how/where recaps live as artifacts. Two distinct kinds:

- **Drift recap** (exists): per-AC spec↔code conformance at a SHA, already stored at `spec/features/<slug>/_recap/<sha>.md`.
- **Session recap** (new): a curated narrative of a working session (goal, decisions, scope changes, what shipped, commits, verification, follow-ups) — no artifact home today.

Design questions for SpecScore:

- Is a session recap a **new artifact type** (own `type:` frontmatter + lifecycle), a curated **summary/rollup over the event journal** (see `journal-and-summary`), or both?
- Storage: standalone (`spec/recaps/<date>-<slug>.md`), under a Feature/Plan, or generated content under `_specscore/`?
- Should a session recap attach to a Plan/Feature, or stand alone (a session may span many features or none)?
- Cross-repo: sessions can span repos that aren't SpecScore-managed — input/output may not map to one spec tree.
- Align with `artifact-frontmatter-convention` and `idea-types-and-lifecycle`.

Decide alongside `journal-and-summary` (overlapping storage). The skill-side counterpart (two distinctly-named recap skills) is seeded in specstudio-skills as `two-recap-kinds-drift-recap-and-session-recap-as-artifacts`.

> **Drained** (2026-06-01) into [`../recap-artifacts-drift-and-session.md`](../recap-artifacts-drift-and-session.md), which owns the **artifact definitions** this seed asks for — frontmatter, storage, lifecycle for both the existing **drift recap** and the new **session recap**. The cross-project aggregator that *renders/consumes* those artifacts is [`../specscore-hub.md`](../specscore-hub.md) (`depends_on` recap-artifacts). Defining the artifacts → recap-artifacts; aggregating them → SpecScore Hub.

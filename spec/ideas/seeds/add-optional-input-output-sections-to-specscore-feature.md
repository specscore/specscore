---
type: sidekick-seed
slug: add-optional-input-output-sections-to-specscore-feature
captured_at: 2026-05-22T20:35:38Z
captured_by: specstudio:ideate
captured_during: spec/ideas/retrofit-skill.md
trigger: explicit
status: queued
synchestra_task: null
---
# Add optional Input/Output sections to SpecScore Feature schema — prose or YAML — to force explicit thinking about Feature contracts and give retrofit an interface-mapping target

## Where this came up

Surfaced during `specstudio:ideate` work on the `retrofit-skill` family (in `specstudio-skills` repo). Researchers literally read function signatures, route handlers, and schemas to derive ACs — capturing inputs and outputs explicitly in the Feature artifact would preserve that signal as a first-class spec field rather than implicit-only inside Given/When/Then.

## Sketch

- Two new optional H2 sections in the Feature schema: `## Input` and `## Output`.
- Content may be **prose** (e.g. "Accepts a user email and password") or a **fenced code block** in YAML/JSON describing structured shape — author's choice.
- Lint suggests (does not require) the sections when the Feature has ACs mentioning request/response/param/return/payload/input/output. Mandatory would over-formalize; SpecScore is meant to stay lightweight.
- Connects to retrofit: researchers' `derived-from: [interface]` provenance naturally populates these sections.
- Connects to `verify` (future): can check that runtime I/O matches declared shape.
- Connects to parent/child Feature composition: child Feature's I/O must be consistent with parent's.

## Pushback worth recording

- Not all Features have clean I/O (UX polish, performance, refactoring) — optional, not mandatory.
- Risks redundancy with Given/When/Then ACs which already express inputs and outputs implicitly.
- Risk of drift toward IDL-style API specs, which is a different (heavier) genre than what SpecScore is for.

## Decision deferred to consilium

Whether to ship as part of SpecScore core schema (lint-aware) vs. as a documented author convention only.

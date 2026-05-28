---
type: sidekick-seed
slug: allow-plans-to-attach-to-ideas-not-only-features
captured_at: 2026-05-28T16:54:31Z
captured_by: user
captured_during: null
trigger: explicit
status: queued
synchestra_task: null
---

# Allow Plans to attach to Ideas, not only Features

## Why

Rework-style work (e.g. "rewrite homepage", "tidy up X") often has no
enumerable AC and doesn't warrant a Feature spec, but still needs
execution tracking. Today the only path is Idea → Feature → Plan →
Tasks, which adds ceremony that's load-bearing only for spec-worthy
work.

## Proposal

Relax Plan's parent constraint so a Plan can attach directly to an
Idea. Preserves artifact identities: Idea = pre-spec one-pager, Plan
= execution container, Task = work unit. No new artifact type.

## Alternatives considered

- Add tasks directly to Idea — drifts Idea into mini-tracker; two
  identities in one artifact.
- Introduce Chore/Rework artifact — adds vocabulary.
- Do nothing — keeps identity sharp but leaves a real gap.

## Open questions

- How often does this come up inside spec-managed repos vs flat-file
  marketing-style repos?
- Does the bypass erode the Feature discipline that differentiates
  SpecScore from Linear/Jira?
- Should Idea get a terminal "executed" status when its Plan
  completes, distinct from "promoted-to-Feature"?

## Context

Captured during a chat about pre-Habr content fixes in the
`marketing/` repo, where "rewrite the homepage" didn't fit
Idea-as-one-pager OR Feature-with-AC cleanly.

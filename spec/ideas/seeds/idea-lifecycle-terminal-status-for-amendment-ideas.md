---
type: sidekick-seed
captured_by: user
status: queued
---

# Idea lifecycle has no terminal status for amendment-only Ideas (those that revise an existing Feature instead of promoting to a new one)

## Why

The idea-lifecycle assumes an Idea graduates into a *new* Feature: the
`Specifying`/`Specified`/`Implementing` statuses all require a non-empty
`**Promotes To:**` target (enforced by `idea-specified-requires-promotion`).
But some Ideas are realized by **amending an existing Feature** in place —
they create no new Feature, so they have no `Promotes To` target and cannot
move past `Approved` without either (a) pointing `Promotes To` at the
pre-existing Feature, which falsely claims that Feature originated from the
Idea and corrupts provenance via the back-reference sync, or (b) being
`Archived`, which connotes abandoned/superseded rather than done.

## Proposal

Add a terminal "realized via amendment" status (or relax the
`Promotes To`-required rule for an amendment class of Idea), so an Idea that
revises an existing Feature can be closed as *done* without abusing
`Promotes To` or `Archived`. Consider an `**Amends:**` header field (parallel
to `Promotes To`) that names the existing Feature(s) the Idea revised.

## Alternatives considered

- Point `Promotes To` at the amended Feature — corrupts provenance (claims
  the Feature was created by the Idea); the back-reference sync would add a
  false Source-Idea row.
- Archive as done (current workaround) — works, but `Archived` reads as
  abandoned/superseded; relies on an `Archive Reason` note to disambiguate.
- Leave at `Approved` forever — misrepresents that the Idea is fully realized.

## Context

Surfaced while transitioning the `plan-status-lifecycle` Idea, which was
realized by amending the canonical `plan` Feature (flat-file model + full
status lifecycle) rather than promoting to a new Feature. It was ultimately
archived with an explicit "realized, not abandoned" Archive Reason as the
least-wrong available move.

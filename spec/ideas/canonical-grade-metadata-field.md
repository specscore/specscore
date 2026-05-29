# Idea: Canonical Grade body-metadata field

**Status:** Implementing
**Date:** 2026-05-29
**Owner:** alex
**Promotes To:** canonical-grade-metadata-field
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we make a quality grade a uniform, schema-blessed signal across all SpecScore repos instead of a repo-local convention only specstudio-skills understands?

## Context

Arose in specstudio-skills while implementing reviewer-gates grade work: producers record a gate grade as a '**Grade:** <letter>' body-metadata line on the approved artifact (REQ grade-recording). That line is currently only lint-tolerated locally and is not part of the canonical SpecScore schema (https://specscore.md/feature-specification). Seed: spec/ideas/seeds/promote-the-grade-feature-meta-field-into-the-canonical.md. Note: the seed proposed placement 'after Supersedes', but Features have no Supersedes line; the real precedent is the optional '**Source Ideas:**' body-metadata line placed after Status.

## Recommended Direction

Promote `**Grade:**` into the canonical SpecScore schema, but define it *generically* — "an optional, single-letter quality grade" — explicitly decoupled from the reviewer-gate workflow that motivated it. A repo that never runs reviewer gates can ignore the field entirely; a repo that does (like specstudio-skills) keeps its existing `**Grade:** <letter>` convention, now blessed rather than merely tolerated. This avoids smuggling a workflow-specific concept into the universal schema while still delivering the uniformity the seed asks for.

Mechanically, `**Grade:**` is an optional body-metadata line in the artifact header block, placed after `**Status:**` — mirroring the established `**Source Ideas:**` precedent (and correcting the seed, which referenced a `**Supersedes:**` line that Features do not have). The field holds exactly one value, overwritten on each re-grade; there is no history and no per-gate breakdown. It applies to all gradeable artifact types (Features, Plans, …) so the rule is defined once rather than per-type.

`specscore spec lint` validates the *value* against a configurable set declared in `specscore.yaml` (default `A, B, C, D, F`; a repo may instead declare a numeric scale such as `1, 2, 3, 4, 5`). Lint rejects values outside that set but does not couple Grade to `Status` — the field may appear at any lifecycle stage. This keeps the guarantee meaningful (no typos, no rogue scales) while keeping friction low.

## Alternatives Considered

- **Bless it Feature-only, gate-coupled, fixed A–F (the literal seed).** Rejected: it bakes a reviewer-gate concept into the canonical schema, confuses non-gate repos, and hard-codes a scale that some teams won't want. The seed's placement guidance was also based on a non-existent Feature `**Supersedes:**` line.
- **Keep it repo-local (don't promote).** Rejected: the recurring cost is that every repo re-invents grade recording and lint stays blind to typos/rogue values. The seed's core motivation — cross-repo uniformity — goes unmet.
- **Rich graded history / per-gate map.** Rejected for MVP: turns a one-line body-metadata field into a structured sub-document, far more spec and lint surface than the "latest letter" signal anyone actually consumes today.

## MVP Scope

A one-week change to the canonical spec + lint: define '**Grade:**' as an optional body-metadata line (after Status) on gradeable artifacts, validated by 'specscore spec lint' against a configurable value set in specscore.yaml (default A-F). No reviewer-gate coupling, no history, no Status coupling.

## Not Doing (and Why)

- Reviewer-gate coupling — Grade is defined generically as a quality letter; who assigns it and when is left to each repo's workflow
- Graded history or per-gate breakdown — the field holds one latest value, overwritten on re-grade
- Per-artifact-type grade scales — MVP uses a single repo-wide value set; per-type scales are a later refinement
- Status coupling (e.g. require Approved before a Grade) — lint validates the value only, not when it may appear

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | A generic, value-only `**Grade:**` field is useful to repos beyond specstudio-skills (otherwise canonical promotion is unjustified vs. keeping it repo-local). | Survey the current SpecScore artifact consumers / ask whether any non-gate repo would set or read a grade; check that the generic definition still satisfies specstudio-skills' `grade-recording` REQ. |
| Should-be-true | A single repo-wide value set in `specscore.yaml` is enough; teams won't immediately need different scales per artifact type. | Confirm no current repo grades different artifact types on different scales; ship single-scale and watch for requests. |
| Might-be-true | Decoupling Grade from `Status` (any stage may carry a grade) won't produce confusing states (e.g. a Draft with a Grade). | Dogfood in this repo; revisit if graded Drafts cause confusion in review. |


## SpecScore Integration

- **New Features this would create:** a `grade-metadata-field` Feature (canonical schema definition + lint rule + `specscore.yaml` config key) — exact split decided at spec time.
- **Existing Features affected:** the canonical Feature specification (`spec/features/feature/`), `repo-config` (new `grade:` / value-set config key), and the lint contract; published doc at `public/feature-specification.md` and the broader specification docs.
- **Dependencies:** specstudio-skills' existing `grade-recording` REQ (consumer that must keep working under the generic definition).

## Open Questions

None at this time. All three pre-spec questions were resolved by the [Grade body-metadata field Feature](../features/canonical-grade-metadata-field/README.md):

- **Config key shape / no-config behavior:** a nested `grade.values` list; when no `grade:` block is declared, the built-in default `A, B, C, D, F` applies (a Grade is always validated against some set).
- **Gradeable artifact types:** any artifact kind with a body-metadata header block — no per-kind allow-list.
- **Placement:** `**Grade:**` is the last header-block line, after `**Status:**` and any `**Source Ideas:**` / `**Supersedes:**`.

---
*This document follows the https://specscore.md/idea-specification*

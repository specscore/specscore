---
format: https://specscore.md/idea-specification
status: Approved
---

# Idea: Rename Outstanding Questions to Open Questions

**Status:** Approved
**Date:** 2026-05-22
**Owner:** alexandertrakhimenok
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we name the spec section for unresolved questions so it's both ergonomic to type and aligned with how LLMs naturally phrase it?

## Context

The SpecScore convention currently mandates the heading `## Outstanding Questions` in every README. Two real-world frictions have emerged from daily use: (1) typing cost — 'Outstanding' is 11 characters versus 4 for 'Open', and the author types this heading multiple times per spec session; (2) LLM-default — AI coding agents naturally emit 'Open Questions' in non-SpecScore contexts, so SpecScore work requires constant correction back to 'Outstanding'. The OQ abbreviation, which appears in lint-rule IDs and tooling, works equally well for either expansion. We are pre-launch with a single user; rename cost is near-zero today but will compound rapidly after external adoption.

## Recommended Direction

Rename the canonical heading from `## Outstanding Questions` to `## Open Questions` across all SpecScore convention sources. Update the CLI lint rule (`oq-section`) to require the new form and hard-reject the old form with an autofix hint. Implement `specscore spec lint --fix` to rewrite the heading line. Keep the `oq` abbreviation unchanged — it expands naturally to 'Open Questions'.

## Alternatives Considered

- **Keep `## Outstanding Questions` (status quo).** Lost because the cumulative cost of correcting LLM defaults plus the per-keystroke typing cost compounds with adoption. The migration is cheap today and increasingly expensive later.
- **`## Unresolved Questions`.** Semantically precise (debt-like, just like "Outstanding") but worse on both axes that matter: still longer than "Open" (10 chars vs 4) and still not the LLM default. Lost on ergonomics.
- **`## Questions` (drop the qualifier).** Lost because specs commonly contain other question-shaped content (rhetorical, illustrative, FAQ-style) and the qualifier disambiguates intent. The OQ abbreviation would also lose its semantic anchor.

## MVP Scope

Convention spec changes in the specscore meta-repo (`AGENTS.md`, `spec/features/feature/`, `spec/features/idea/`, indexes, lint-rule spec). CLI changes in specscore-cli: lint rule pattern + error message + autofix transform, `init` scaffold templates, Go test fixtures, spec-internal docs. Out of scope this MVP: content migration across specstudio-skills, ai-plugin-specscore, marketing, and specscore-studio-app — tracked as follow-on tasks once the convention and CLI ship.

## Not Doing (and Why)

- Backward-compatible acceptance of `## Outstanding Questions` in the linter — hard-fail with autofix is cleaner pre-launch and avoids carrying legacy support forever
- Renaming the `oq` abbreviation in lint-rule IDs, CLI flags, or tree-field names — it expands cleanly to 'Open Questions' and changing it would multiply the blast radius
- Bulk content migration across sibling repos (skills, plugin, marketing, studio-app) — separate follow-on tasks once the canonical convention and CLI ship
- Prose-references autofix in the CLI — `--fix` rewrites heading lines only; prose references in spec narratives are migrated via a one-shot script, not bundled into the linter forever

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | LLM coding agents default to "Open Questions" in non-SpecScore contexts. | Sample 5–10 LLM-generated specs without SpecScore prompting and confirm the phrase used. (Author's direct observation in daily use is the current evidence.) |
| Must-be-true | The autofix can rewrite the heading line safely without touching adjacent content. | Run `specscore spec lint --fix` against the full spec tree and review `git diff` — every change MUST be a heading-line rewrite and nothing else. |
| Must-be-true | No external tooling depends on the literal string `## Outstanding Questions`. | Repo-wide grep across all sibling repos. Done in this session: ~450 hits, all internal (specscore, specscore-cli, specstudio-skills, ai-plugin-specscore, marketing, specscore-studio-app). |
| Should-be-true | "Open" is unambiguous as a heading in context (not confused with "open-source" or "openness"). | Render a handful of converted specs in the website builder and review. Low-risk; the heading is structural and section-scoped. |
| Might-be-true | The `oq` abbreviation reads naturally as "Open Questions" without explanation. | No formal validation; revisit if any documentation or tool surface conflates the abbreviation with the long form. |


## SpecScore Integration

- **New Features this would create:**
  - One in this repo: the convention rename across the meta-spec (canonical heading, `AGENTS.md` rule, feature/idea/index entity specs, lint-rule spec).
  - One in `specscore-cli`: the `oq-section` lint-rule pattern + error message + `--fix` autofix, plus `init` scaffold templates and Go test fixtures.
- **Existing Features affected:** every spec, plan, idea, and skill that currently uses the `## Outstanding Questions` heading or references it by name in prose — ~227 heading occurrences and ~223 prose/anchor/source-code references across six repos (this repo, `specscore-cli`, `specstudio-skills`, `ai-plugin-specscore`, `marketing`, `specscore-studio-app`).
- **Dependencies:** none. The two Features can land in parallel; sibling-repo content migration is a follow-on once both ship.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/idea-specification*

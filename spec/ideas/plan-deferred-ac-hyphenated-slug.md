---
format: https://specscore.md/idea-specification
status: Draft
---

# Idea: Plan Lint Accepts Hyphenated AC Slugs in `## Deferred AC Coverage`

**Status:** Draft
**Date:** 2026-05-22
**Owner:** alexander.trakhimenok@gmail.com
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

`specscore spec lint` (v0.1.0) truncates hyphenated AC slugs at the first hyphen when parsing entries in a Plan's `## Deferred AC Coverage` section. The same hyphenated slugs parse correctly in `**Verifies:**` lines. The defect prevents authors from using the documented Deferred-AC mechanism for the most common AC-slug shape — hyphenated lowercase — which is the conventional form throughout SpecScore.

**How might we** make `specscore spec lint` parse hyphenated AC slugs in `## Deferred AC Coverage` entries the same way it parses them in `**Verifies:**` lines, so the documented deferral mechanism works for the conventional slug shape?

Concretely: a Plan that contains

```
## Deferred AC Coverage

- studio-url-scheme#ac:artifact-url-emits-without-ref — <reason>
```

fails lint with two violations:

```
P-001: AC coverage gap: studio-url-scheme#ac:artifact-url-emits-without-ref
       is neither covered by any task's **Verifies:** nor listed under
       ## Deferred AC Coverage
P-002: stale AC reference studio-url-scheme#ac:artifact in
       ## Deferred AC Coverage
       (no such AC in source Feature studio-url-scheme)
```

The lint reads the AC slug as `artifact` (truncated at the first hyphen). Different separators between the slug and the reason — em-dash, hyphen, colon, backticks, period — all produce the same truncation. The bug is in the slug-extraction regex for the Deferred section, not in the separator handling.

## Context

Encountered on 2026-05-22 while authoring `spec/plans/studio-url-scheme.md` in the `specscore-studio-app` repo. The Plan had a single AC (`artifact-url-emits-without-ref`) that the studio-app cannot enforce because the URL is emitted upstream by the `specscore` CLI. The documented mechanism for this case is `## Deferred AC Coverage` with a one-sentence reason — exactly the case the lint defect blocks.

CLI version: `0.1.0`. Implementation lives in [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli).

### Workaround in use today

The studio-url-scheme Plan ships with a tenth task whose `**Verifies:**` line carries the producer-side AC, and whose description is a cross-repo handoff record rather than implementation work. This unblocks lint because `**Verifies:**` parsing handles hyphenated slugs correctly, but it conflates two concerns:

1. **Implementation tasks** the team will execute.
2. **Coordination / tracking records** that no one implements in this repo.

A reader cannot distinguish the two without reading each task body. Over a portfolio of Plans, this erodes the Plan artifact's signal — "ten tasks" no longer means "ten units of implementation work."

## Recommended Direction

Patch the slug-extraction regex inside the `P-002` rule (or whichever shared parser is consumed by both `P-001` and `P-002` in `specscore-cli`) so the `<ac-slug>` token in `## Deferred AC Coverage` accepts the same character class as `**Verifies:**` parsing — lowercase ASCII letters, digits, and hyphens, terminated by whitespace or punctuation. The fix is small, well-scoped, and ships entirely in `specscore-cli`. No spec schema change is required: the existing schema example already shows hyphenated slugs as the convention:

```
- <feature-slug>#ac:<ac-slug> — <one-sentence reason>
```

After the fix, the original Deferred entry passes lint. Plans authored under the workaround can be normalized by moving the producer-side AC from a tenth task back to `## Deferred AC Coverage` in a subsequent revision.

## Alternatives Considered

### Schema change: forbid hyphens in AC slugs

Constrain AC slugs to a single contiguous token (no hyphens). Sidesteps the parser bug by making the input always parseable under the narrow regex. Rejected because (a) every existing AC slug in the corpus uses hyphens, matching the directory-slug pattern used across SpecScore for Features, Ideas, and Decisions; (b) renaming AC slugs is the most expensive kind of churn the linter inflicts (every cross-reference in every Plan must be rewritten); (c) the fix would solve the parser symptom by punishing the convention rather than fixing the parser.

### Different separator in `Deferred AC Coverage` entries

Mandate `::`, `→`, a forced newline, or some other separator that "obviously" terminates the slug. Rejected because empirical testing showed the parser bug is in the slug regex itself, not the separator handler — em-dash, hyphen, colon, backticks all reproduce the truncation. A new separator would not fix the parse.

### Lint mode that accepts coordination tasks as first-class

Add a `**Kind:** tracking` field to tasks and let the linter treat tracking tasks differently. Solves the conflation problem inside Plans but is a much larger surface — new schema, new lint rule, new reviewer behavior — for what is fundamentally a regex fix. Rejected as over-correction.

### Drop the `## Deferred AC Coverage` section entirely

Require every AC to be covered by a task; remove the deferral affordance. Rejected because deferred coverage is the linter's most useful honesty signal — it lets authors document "this AC's enforcement does not live in this repo" without smuggling it inside an implementation task. Removing the section would push every cross-repo handoff into the workaround shape.

### Keep the workaround indefinitely; do not fix the CLI

Accept that hyphenated ACs cannot use the Deferred section and codify the coordination-task pattern as the cross-repo handoff mechanism. Rejected because the workaround conflates implementation and tracking, erodes signal across the Plan portfolio, and the underlying CLI fix is small.

## MVP Scope

- Patch the AC-slug-extraction regex used by Plan-related lint rules (at minimum `P-002`, plus any rule sharing the same parser) so the slug accepts `[a-z0-9-]+` until whitespace or non-slug punctuation.
- Add a regression test fixture: a Plan with a `## Deferred AC Coverage` entry whose AC slug contains two or more hyphens, paired with a Feature exposing the matching hyphenated AC. The fixture passes lint after the fix.
- Verify the same regex is used (or its behavior is equivalent) in the `**Verifies:**` parser, so the two paths cannot drift apart again.

That is the entire MVP. No new schema, no new lint rules, no new artifacts.

## Not Doing (and Why)

- **No new `**Kind:** tracking` task type.** A larger schema change is not justified by a regex bug. Solving the conflation problem properly is a separate Idea if it ever becomes worth solving.
- **No retroactive Plan normalization.** Existing Plans using the workaround stay as-is until their owners revise them. The fix does not break the workaround — coordination tasks with `**Verifies:**` entries continue to pass lint.
- **No backport of the fix to older CLI releases.** Users on `0.1.0` upgrade to the patched version; we do not maintain a parallel release line.
- **No SpecScore format-documentation overhaul.** A tiny clarification stating "AC slugs MAY contain hyphens" is optional and listed under Open Questions; it is not required for the CLI fix.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The slug-extraction regex in the Deferred parser is independent of the `**Verifies:**` parser. (If they already share code, the fix is even smaller.) | Inspect `specscore-cli` source to confirm. If shared, fix once. If not, ensure the patch produces identical behavior in both paths. |
| Must-be-true | No other lint rule depends on the current truncating behavior. | `grep` the CLI source for the regex; check rule fixtures and integration tests. |
| Should-be-true | The convention "AC slugs are hyphenated lowercase" is universal across the existing corpus. | Survey existing Feature READMEs in `specscore`, `specscore-studio-app`, and any consumer repo with `spec/features/`. If any AC slug uses a different convention, the regex character class needs to accommodate it. |
| Might-be-true | The CLI fix unblocks Plan authors enough that the coordination-task workaround stops appearing in new Plans. | Track future Plans authored after the fix lands. If coordination tasks recur, the underlying need is broader than this Idea models, and the `**Kind:** tracking` Alternative deserves a fresh look. |

## SpecScore Integration

- **New Features:** none — this is a pure CLI implementation fix.
- **Existing Features touched:** none in the `specscore` spec repo. The fix lives entirely in [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli).
- **Existing artifacts that benefit immediately:**
  - `specscore-studio-app/spec/plans/studio-url-scheme.md` — Task 10 (the coordination workaround) can be removed and the AC moved to `## Deferred AC Coverage` in a follow-up revision.
- **Dependencies:** none. The fix is self-contained.

## Open Questions

- Should the SpecScore format documentation explicitly state that AC slugs MAY contain hyphens (mirroring the directory-slug convention), closing the door on a future implementation re-introducing a similar narrowness? This is a small documentation patch in the `specscore` repo independent of the CLI fix.
- Are there other lint rules that share the same Deferred-section parser and would benefit from the same regex fix? Worth a sweep at fix time rather than a follow-up issue.

---
*This document follows the https://specscore.md/idea-specification*

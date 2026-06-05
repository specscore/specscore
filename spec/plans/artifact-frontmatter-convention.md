# Plan: Artifact Frontmatter Convention

**Status:** Draft
**Source Feature:** artifact-frontmatter-convention
**Date:** 2026-06-05
**Owner:** alexander.trakhimenok
**Supersedes:** —

## Summary

Implements the `artifact-frontmatter-convention` Feature: every SpecScore artifact carries a frontmatter `format:` field (the canonical spec URL for its type) and, for status-bearing types, a `status:` field mirroring the body `**Status:**` line. Lint enforces both, `--fix` reconciles the derivatives (frontmatter `status:` from the body; the footer URL from frontmatter `format:`), the create/change-status verbs emit and dual-write the fields, and a graced migration flips the rules to error once repos are converted. Work lands entirely in `specscore-cli`; the convention contract is already published by the source Feature.

## Approach

Grouped by implementation layer in dependency order. The foundation lands first: frontmatter parsing plus a single source of truth mapping each type to its canonical `format:` URL and its Status-concept flag — every downstream rule and verb consumes it. The three lint rules build on that foundation: `format:` required/match, the `status:` body-mirror (presence + drift + `--fix`), the status-less rejection, and the footer↔`format:` mirror (`--fix` derives the footer from frontmatter, never the reverse). The two verb-side tasks follow — scaffold emission and the atomic change-status dual-write — because they reuse the same type-resolution and mirror semantics. The migration sequencing task lands last: it depends on every enforcing rule existing so it can ship them graced and then flip to error after the one-shot per-repo conversion. No ACs are deferred.

## Tasks

### Task 1: Frontmatter parsing + per-type `format:` URL and Status-concept resolution

**Verifies:** artifact-frontmatter-convention#ac:format-required-enforced

In `specscore-cli`, parse YAML frontmatter on every artifact and add a single source of truth (the document-types registry / per-type spec) mapping each type to (a) its canonical `format:` URL and (b) its Status-concept flag. Add the `lint-format-required` rule: flag an artifact missing `format:` or carrying a `format:` whose URL does not match its type; an artifact with the correct bare URL passes. This task establishes the type resolution every later task consumes.

### Task 2: `status:` body-mirror lint — presence, drift, and `--fix`

**Verifies:** artifact-frontmatter-convention#ac:status-mirror-enforced, artifact-frontmatter-convention#ac:body-frontmatter-drift-flagged

Add the `lint-status-mirror` rule for status-bearing types (per Task 1's Status-concept flag): flag a missing frontmatter `status:` and flag frontmatter `status:` that differs from the body `**Status:**` (case-insensitive, whitespace-trimmed). `specscore spec lint --fix` MUST write/rewrite the frontmatter `status:` from the body value — the body stays canonical, the frontmatter is the derived mirror.

### Task 3: Status-less types reject `status:`

**Verifies:** artifact-frontmatter-convention#ac:status-less-rejects-status

Extend the `lint-status-mirror` rule so a status-less type (e.g. drift-recap, session-recap, Index/README) carrying a `status:` frontmatter field is flagged; the same artifacts with no `status:` pass. Classification keys off the type (Task 1), not file location.

### Task 4: Footer ↔ `format:` mirror lint + `--fix` derives the footer

**Verifies:** artifact-frontmatter-convention#ac:format-footer-mirror-enforced

Add the rule that an artifact's adherence-footer URL and its frontmatter `format:` MUST carry the same URL (trailing slash optional). A mismatch is an error; a match passes. `specscore spec lint --fix` MUST derive the footer URL from `format:` (frontmatter is canonical), never the reverse. Coordinate with the existing adherence-footer `fix-inserts-only` behavior so the two rules do not conflict.

### Task 5: Create verbs emit `format:` and `status:`

**Verifies:** artifact-frontmatter-convention#ac:scaffold-emits-fields

Make `specscore feature new`, `idea new`, `task new`, and the sidekick-capture path emit `format:` (the type's spec URL from Task 1) — and `status:` for status-bearing types — in the scaffolded frontmatter. A status-less type's scaffold carries `format:` only.

### Task 6: `change-status` atomic body + frontmatter dual-write

**Verifies:** artifact-frontmatter-convention#ac:change-status-dual-write

Make `specscore feature change-status` and `specscore idea change-status` rewrite both the body `**Status:**` line and the frontmatter `status:` mirror atomically: a failure mid-flight leaves both at the prior value. Reuse the mirror semantics from Task 2.

### Task 7: Migration sequencing — grace period then enforce

**Verifies:** artifact-frontmatter-convention#ac:migration-grace-then-enforce

Ship the enforcing rules (Tasks 1–4) behind a grace period (disabled or warning-only) so existing repos do not break on landing. Provide the one-shot, deterministic per-repo migration (read body Status → write frontmatter `status:`; derive `format:` from type; keep the footer and align its URL to `format:`), one commit per repo. After the target repos are migrated, flip the rules to error by default. Pre-migration runs must not error on missing frontmatter; post-migration runs enforce both rules.

## Open Questions

- **`tasks_count` / plan frontmatter coupling.** This Plan's own frontmatter (and the `tasks_count` field defined by `plan#req:tasks-count`) is itself surfaced "per the artifact-frontmatter-convention feature." Once Tasks 1–2 ship, `specscore spec lint --fix` will backfill frontmatter into existing plans (including this one) — until then plans intentionally remain body-metadata only and lint clean.
- **Plan scaffolding.** The `scaffold-emits-fields` AC names `feature new`, `idea new`, `task new`, and sidekick-capture — not `plan new` (no such verb exists). Whether plans acquire frontmatter via a new `plan new` verb or solely via `lint --fix` backfill is a Feature-level question carried out of this Plan's scope.
- **Status-concept source of truth.** Whether the per-type Status-concept flag lives in the document-types registry, each type's spec page, or a static loader list (carried from the Feature) is settled in Task 1's design.

---
*This document follows the https://specscore.md/plan-specification*

# Feature: Artifact Frontmatter Convention

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/artifact-frontmatter-convention?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/artifact-frontmatter-convention?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/artifact-frontmatter-convention?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/artifact-frontmatter-convention?op=request-change) |

**Status:** Approved
**Source Ideas:** artifact-frontmatter-convention

## Summary

Every SpecScore artifact carries two YAML-frontmatter fields: **`format:`** — the spec URL for its type (machine-readable, mirrored by the human-visible footer line `*This document follows the …*`, which is **retained**, not replaced) — and, for status-bearing types, **`status:`** — a mirror of the body `**Status:**` token. The body `**Status:**` stays canonical; frontmatter `status:` is a derived mirror kept in lockstep by the CLI and validated by lint. The footer keeps a human-visible format surface for renderers that hide frontmatter; lint keeps the footer URL and frontmatter `format:` in sync. This reconciliation follows the Approved [Format Declaration — Footer + Frontmatter Mirror](../../ideas/format-declaration-footer-and-frontmatter.md) Idea, which supersedes the earlier footer-removal stance. This is the generic convention the [drift-recap](../drift-recap/README.md) and [session-recap](../session-recap/README.md) Features name as a forward dependency: it defines the `format:` requirement and the **Status-concept classification** that determines which types carry `status:` and which (the status-less ones) must not.

## Problem

Today an artifact's conformance and lifecycle are split across two unstructured places: the `format` link is free-text prose in the footer, and `status` is a body-Markdown line (`**Status:** Approved`) — except sidekick-seeds, which already carry `status:` in frontmatter. Any third-party reader (an external dashboard, an inGitDB job, an index/filter pipeline) that wants one field — "what spec does this follow?" or "what's its status?" — must fetch and Markdown-parse the whole body. That is a heavy contract for a single-field lookup and scales badly across a multi-thousand-document corpus. A mirrored frontmatter copy serves that audience at near-zero cost while keeping the body canonical for humans and tooling.

## Behavior

### The two frontmatter fields

#### REQ: format-field

Every SpecScore artifact MUST carry a `format:` key in YAML frontmatter whose value is the canonical spec URL for its type (e.g. `https://specscore.md/feature-specification`, `https://specscore.md/idea-specification`, `https://specscore.md/drift-recap-specification`). The value is a **bare URL** for v1 — no registry indirection — but the grammar is forward-compatible: a future non-URL token MAY be interpreted as a registry key without breaking existing bare-URL artifacts. The `format:` value is essentially static per type, set at create time and never edited thereafter.

#### REQ: status-field

An artifact whose type **has a Status concept** (see `status-concept-by-type`) MUST carry a `status:` key in frontmatter whose value mirrors the body `**Status:**` token in the same vocabulary (`Draft`, `Approved`, `Implementing`, `Stable`, `Deprecated`, `Archived`, `Queued`, `Completed`, …). A status-less type MUST NOT carry `status:` — its presence is a violation.

### Status-concept classification

#### REQ: status-concept-by-type

Whether an artifact carries `status:` MUST be determined by its **type** (keyed by the `format:` value), not by file location. The classification:

- **Status-bearing** (MUST carry `status:`): Idea, Feature, Plan, Task, Decision, sidekick-seed.
- **Status-less** (MUST NOT carry `status:`): **drift-recap** and **session-recap** (both status-less per [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md)), and Index / README pages.

The lint rules below consume this classification, so a single source of truth (the document-types registry / per-type spec) MUST declare each type's Status-concept flag.

### Source of truth

#### REQ: body-canonical

For status-bearing types, the body `**Status:**` line is the **canonical truth**; frontmatter `status:` is a derived mirror. Any frontmatter↔body Status drift MUST be a lint error, and `specscore spec lint --fix` MUST resolve it by rewriting the frontmatter from the body value. (Sidekick-seeds, which historically carried only frontmatter `status:`, gain a body `**Status:**` line so this rule has no exception — implementation gated on the seed-lifecycle CLI, tracked as a follow-on.)

### Footer mirror

#### REQ: footer-format-mirror

The `format:` frontmatter field and the footer line `*This document follows the <url>*` are **both retained** and carry the **same** canonical spec URL for the type. The footer-line convention (owned by [adherence-footer](../adherence-footer/README.md)) is **not** retired — it stays as the human-visible format surface for renderers that hide frontmatter. `specscore spec lint` MUST flag any artifact whose footer URL and frontmatter `format:` disagree (trailing slash optional, per adherence-footer `REQ: trailing-slash`). The frontmatter `format:` is **canonical** for the pair — it is static and type-derived — so `--fix` derives the footer URL from `format:`, never the reverse. (This mirrors the `status` model in spirit, where one surface is canonical and the other is a lint-synced derivative; the canonical surface differs per field — body for `status`, frontmatter for `format`.)

### Lint contract

#### REQ: lint-format-required

`specscore spec lint` MUST flag any artifact missing a `format:` frontmatter field, or carrying a `format:` value that does not match the canonical spec URL for its type.

#### REQ: lint-status-mirror

`specscore spec lint` MUST flag: (a) a status-bearing artifact missing `status:` frontmatter; (b) a status-less artifact carrying `status:`; and (c) a status-bearing artifact whose frontmatter `status:` differs from its body `**Status:**` (case-insensitive, whitespace-trimmed). `--fix` MUST rewrite the frontmatter from the body for cases (a) and (c).

### Lifecycle integration

#### REQ: scaffold-and-change-status

Create verbs (`specscore feature new`, `idea new`, `task new`, `plan new`, and the sidekick-capture path) MUST emit `format:` — and `status:` for status-bearing types — in the scaffold. (`plan new` is a status-bearing type and emits both fields; its full subcommand contract lives in the `cli/plan/new` Feature in `specscore-cli`.) `specscore feature change-status` and `specscore idea change-status` MUST rewrite the body `**Status:**` line and the frontmatter `status:` mirror **atomically**, rolling back both on any mid-flight failure. (These verbs live in `specscore-cli`; this Feature owns the contract they implement.)

### Migration

#### REQ: migration-sequencing

To avoid a flag day across SpecScore-managed repos, the enforcing lint rules MUST ship behind a grace period (rule disabled or warning-only) so existing repos do not break on landing. Each repo is migrated by a one-shot, deterministic script (read body Status → write frontmatter `status:`; derive `format:` from type; keep the footer line and align its URL to `format:`), one commit per repo. After all target repos are migrated, the rules flip to error by default.

## Acceptance Criteria

### AC: format-required-enforced

**Requirements:** artifact-frontmatter-convention#req:format-field, artifact-frontmatter-convention#req:lint-format-required

**Given** an artifact missing a `format:` frontmatter field, and a second whose `format:` URL does not match its type
**When** `specscore spec lint` runs (rules enforced)
**Then** both are flagged — one for the missing field, one for the mismatched URL — and an artifact carrying the correct `format:` passes.

### AC: status-mirror-enforced

**Requirements:** artifact-frontmatter-convention#req:status-field, artifact-frontmatter-convention#req:lint-status-mirror

**Given** a status-bearing artifact (e.g. a Feature) with body `**Status:** Approved`
**When** `specscore spec lint` runs
**Then** a missing frontmatter `status:` is flagged, a frontmatter `status: Approved` passes, and `--fix` writes `status: Approved` from the body when absent.

### AC: status-less-rejects-status

**Requirements:** artifact-frontmatter-convention#req:status-concept-by-type, artifact-frontmatter-convention#req:lint-status-mirror

**Given** a drift-recap and a session-recap (both status-less per D-0002) each carrying a `status:` frontmatter field
**When** `specscore spec lint` runs
**Then** each is flagged for carrying `status:` on a status-less type; the same artifacts with no `status:` pass.

### AC: body-frontmatter-drift-flagged

**Requirements:** artifact-frontmatter-convention#req:body-canonical

**Given** a Feature with body `**Status:** Implementing` but frontmatter `status: Approved`
**When** `specscore spec lint` runs
**Then** the drift is reported as an error, and `--fix` rewrites the frontmatter to `status: Implementing` (the body wins).

### AC: format-footer-mirror-enforced

**Requirements:** artifact-frontmatter-convention#req:format-field, artifact-frontmatter-convention#req:footer-format-mirror

**Given** a migrated artifact carrying `format:` frontmatter and a footer line with a **different** URL
**When** `specscore spec lint` runs
**Then** the footer↔`format:` mismatch is flagged; an artifact whose footer URL matches its `format:` passes; and `--fix` rewrites the footer URL from `format:` (frontmatter canonical), never the reverse.

### AC: scaffold-emits-fields

**Requirements:** artifact-frontmatter-convention#req:scaffold-and-change-status

**Given** a SpecScore repo
**When** the user runs `specscore feature new <slug>` or `specscore plan new <slug>` (both status-bearing types)
**Then** each scaffold contains both `format:` (the type's spec URL) and `status:` (the initial status); a status-less type's scaffold contains `format:` only.

### AC: change-status-dual-write

**Requirements:** artifact-frontmatter-convention#req:scaffold-and-change-status, artifact-frontmatter-convention#req:body-canonical

**Given** a Feature at `**Status:** Draft` with a matching frontmatter mirror
**When** `specscore feature change-status <slug> Approved` runs
**Then** both the body `**Status:**` line and the frontmatter `status:` are rewritten to `Approved` atomically; a failure mid-flight leaves both at `Draft`.

### AC: migration-grace-then-enforce

**Requirements:** artifact-frontmatter-convention#req:migration-sequencing

**Given** an un-migrated repo (footer line present, no frontmatter fields) and the lint rules shipped in grace mode
**When** `specscore spec lint` runs before migration and again after the one-shot migration + rule cutover
**Then** the pre-migration run does not error on the missing frontmatter, and the post-migration run enforces both rules (frontmatter required, footer URL matching `format:`).

## Rehearse Integration

Every AC above is testable through fixture artifacts (frontmatter / body / footer combinations across status-bearing and status-less types) plus `specscore spec lint` and `--fix` output inspection, and the `specscore … new` / `change-status` CLI surface. Rehearse scenario stubs are deferred to the Plan phase to match the current repo convention.

## Not Doing

Inherited from the source Idea and pinned here:

- **Frontmatter fields beyond `format:` and `status:`** — only what third-party tooling genuinely needs cheap access to.
- **A typed-key + registry layer for `format:`** (e.g. `format: feature` resolved via `specscore.yaml`) — bare URLs only for v1; the grammar stays forward-compatible for a future registry token.
- **Frontmatter-only status (dropping the body line)** — body Status stays human-visible and canonical; frontmatter mirrors it.
- **Reworking the sidekick-seed format** beyond adding `format:` and (follow-on) a body `**Status:**` line.
- **The CLI lint-rule and verb implementations themselves** — they live in `specscore-cli`; this Feature owns the convention contract they implement.

## Open Questions

- **Format visibility — resolved.** The footer is **retained** alongside frontmatter `format:` (per the Approved [Format Declaration — Footer + Frontmatter Mirror](../../ideas/format-declaration-footer-and-frontmatter.md) Idea), so human-visible format provenance is preserved for renderers that hide frontmatter while frontmatter serves machine readers. Lint keeps the two in sync; frontmatter `format:` is canonical.
- **Cross-repo migration ordering** — recommended: ship rules grace/flag-gated, migrate all target repos (`specscore`, `specscore-cli`, `ai-plugin-specscore`, `specstudio-skills`), then flip to error by default.
- **Status-concept source of truth** — whether the per-type Status-concept flag lives in the document-types registry, each type's spec page, or a static loader list; decide at plan time.

---
*This document follows the https://specscore.md/feature-specification*

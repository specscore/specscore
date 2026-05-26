# Plan: Decision and Decisions-Index CLI Implementation

**Status:** draft
**Features:**
  - [decision](../../features/decision/README.md)
  - [decisions-index](../../features/decisions-index/README.md)
**Source type:** feature
**Source:** [decision](../../features/decision/README.md), [decisions-index](../../features/decisions-index/README.md)
**Author:** alexander.trakhimenok
**Approver:** —
**Created:** 2026-05-26
**Approved:** —

## Context

The [decision-and-decisions-index](../../ideas/decision-and-decisions-index.md) Idea introduced two Features — `decision` and `decisions-index` — both now Approved with all open questions resolved. One real Decision (D-0001 — Studio Deep-Link URL Scheme) is already dogfooded and Accepted. The spec tree already has `spec/decisions/README.md` (the active index) and `spec/decisions/archived/README.md` (empty archived index).

What's missing is CLI support in [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli): lint rules that enforce the Feature REQs, the `specscore decision new` scaffold command, and index-completeness checks. This plan delivers that CLI surface.

Per [AGENTS.md](../../../AGENTS.md), no CLI code lives in this repo. Tasks that produce CLI code are filed as Issues against `specscore/specscore-cli`; tasks that produce spec-repo artifacts (scenarios, documentation) land here.

## Acceptance criteria

- `specscore decision new <slug>` scaffolds a lint-clean Decision file with auto-assigned number, all required sections, and placeholder content.
- `specscore spec lint` validates Decision files against all REQs: title format, header fields, filename format, number assignment, status values, required sections, declined-alternatives non-empty, observed-consequences placeholder, adherence footer, source-idea target exists, supersedes target exists, supersedes-bidirectional consistency, archived-location correctness, and immutability-once-accepted.
- `specscore spec lint` validates the decisions index against all REQs: list-section heading, required columns, status-excludes-archived, numeric ordering, archived-index chronological ordering, adherence footer, and completeness.
- `specscore spec lint --fix` auto-reorders decisions-index rows to numeric ascending order.
- Rehearse scenario stubs exist for every non-trivial AC in both Features.
- The existing D-0001 and `spec/decisions/README.md` pass all new lint rules without modification.

## Tasks

### 1. Validate existing Decision artifacts against Feature REQs

Hand-audit D-0001 (`spec/decisions/0001-studio-url-scheme.md`), `spec/decisions/README.md`, and `spec/decisions/archived/README.md` against every REQ in the `decision` and `decisions-index` Feature specs. Fix any drift so the existing artifacts are the contract the CLI validates against.

**Depends on:** (none)

**Produces:**
- Any fixes to `spec/decisions/0001-studio-url-scheme.md`, `spec/decisions/README.md`, or `spec/decisions/archived/README.md`.
- A list of any REQs that the existing D-0001 does not yet satisfy (input for Task 2).

**Acceptance criteria:**
- All existing Decision artifacts comply with every applicable REQ.
- `specscore spec lint` remains `0 violations found` (existing rules still pass).

### 2. Scaffold Rehearse scenario stubs for `decision`

Create `spec/features/decision/_tests/` with scenario stubs for every AC in the `decision` Feature: `decision-structure`, `decision-header`, `filename-and-numbering`, `lifecycle`, `immutability`, `affected-features`, `adherence-footer`, `scaffold-behavior`. Each stub carries `**Validates:** decision#ac:<slug>` and `status: pending`.

**Depends on:** Task 1

**Produces:**
- `spec/features/decision/_tests/README.md` plus one stub per AC.

**Acceptance criteria:**
- Every AC in `decision/README.md` has at least one scenario stub.
- `_tests/README.md` indexes its directory per scenario conventions.
- `specscore spec lint` remains `0 violations found`.

### 3. Scaffold Rehearse scenario stubs for `decisions-index`

Create `spec/features/decisions-index/_tests/` with scenario stubs for every AC: `list-section-heading`, `index-table`, `archived-index`, `adherence-footer`.

**Depends on:** Task 1

**Produces:**
- `spec/features/decisions-index/_tests/README.md` plus one stub per AC.

**Acceptance criteria:**
- Every AC in `decisions-index/README.md` has at least one scenario stub.
- `_tests/README.md` indexes its directory per scenario conventions.
- `specscore spec lint` remains `0 violations found`.

### 4. Publish Decision and Decisions-Index specification pages

Add `decision-specification` and `decisions-index-specification` pages to the public site (`public/`) via the site generator. These are the targets of the adherence-footer URLs.

**Depends on:** (none)

**Produces:**
- `public/decision-specification.md` (or `.html` per site-generator convention).
- `public/decisions-index-specification.md` (or `.html`).
- Site build (`pnpm build` in `tools/site-generator/`) succeeds.

**Acceptance criteria:**
- Both specification pages render via `pnpm build`.
- Adherence-footer URLs (`https://specscore.md/decision-specification`, `https://specscore.md/decisions-index-specification`) resolve to the new pages.

### 5. File CLI implementation Issues against `specscore-cli`

Open Issues on `specscore/specscore-cli` covering the full CLI surface, organized by concern:

**Issue A — Decision lint rules.** Validate Decision files against all REQs: title format (`Decision:` prefix), header fields (presence, order, values), filename format (`NNNN-<slug>.md`), status values, required sections in order, declined-alternatives non-empty, observed-consequences placeholder, adherence footer URL, source-idea target exists, supersedes target exists, supersedes-bidirectional consistency, archived-location correctness. Each rule maps to a specific REQ with a link.

**Issue B — Immutability enforcement.** Lint check for Accepted Decisions: body-hash or section-diff approach to detect edits to frozen sections. `Observed Consequences` append-only check. Editorial carve-out (whitespace/punctuation) as a future follow-up per the resolved OQ.

**Issue C — `specscore decision new <slug>`.** Scaffold command: auto-assign next number, emit all required sections with HTML-comment prompts, accept flags (`--title`, `--owner`, `--source-idea`, `--supersedes`, `--tags`), guarantee lint-clean output.

**Issue D — Decisions-index lint rules.** Validate `spec/decisions/README.md` against decisions-index REQs: list-section heading, required columns, status-excludes-archived, numeric ordering, completeness. Validate `spec/decisions/archived/README.md` against archived-index-chronological. `lint --fix` auto-reorders rows.

**Depends on:** Tasks 2, 3 (so Issues can link to scenario stubs as test contracts).

**Produces:**
- 4 Issues on `specscore/specscore-cli`, linked from this plan.

**Acceptance criteria:**
- Each Issue references the relevant Feature, REQs, and this plan by URL.
- Each Issue links to the scenario stubs as the executable contract.

### 6. Update decisions-index columns to match Feature spec

The current `spec/decisions/README.md` has columns `Decision | Status | Date | Owner` but the `decisions-index` Feature REQ: index-columns requires `# | Decision | Status | Date | Tags | Affected`. Update the active index to match the specified column set.

**Depends on:** Task 1

**Produces:**
- Updated `spec/decisions/README.md` with the correct column set.

**Acceptance criteria:**
- The active index has columns: #, Decision, Status, Date, Tags, Affected — in that order.
- D-0001's row is updated to include Tags and Affected values.
- `specscore spec lint` remains `0 violations found`.

### 7. Snapshot and submit for approval

Add a `drafted` snapshot row. Flip status `draft → in_review → approved`. Update `spec/plans/README.md` to list this plan.

**Depends on:** Tasks 1–6.

**Produces:**
- Plan `Status: approved` with `Approver` and `Approved` fields populated.
- Snapshot row in `## Snapshots`.
- Plans-index row updated.

**Acceptance criteria:**
- `specscore spec lint` returns `0 violations found`.
- `spec/plans/README.md` lists this plan with `Status: approved`.

## Dependency graph

```text
Task 1 (audit existing artifacts)
  ├── Task 2 (decision scenario stubs)
  ├── Task 3 (decisions-index scenario stubs)
  └── Task 6 (fix index columns)
       └── Task 5 (file CLI issues)
            └── Task 7 (snapshot + approve)

Task 4 (spec pages) — independent, parallelisable
```

Tasks 2, 3, 4, and 6 are parallelisable once Task 1 lands. Task 5 waits for 2 and 3 so Issues can reference scenario stubs.

## Risks and open decisions

- **Immutability enforcement mechanism is unspecified.** The `decision` Feature says "Lint MAY enforce this via a body-hash check stored out-of-band." The CLI team needs to decide: git-based section-diff, out-of-band hash file, or something else. This plan defers that design to the CLI Issue.
- **D-0001 was amended in place.** The Decision Feature says immutability is strict once Accepted, but D-0001 was amended same-day. The existing D-0001 pre-dates the Feature spec and is grandfathered. The CLI lint rule should not retroactively flag it. Approach: immutability check starts from the commit where the lint rule ships, not from the file's creation.
- **Editorial carve-out deferred.** The resolved OQ says yes to allowing whitespace/punctuation fixes, but this plan does NOT implement it. It's a follow-up after the base immutability check ships.

## Open Questions

None at this time.

## Snapshots

| Date | Git Hash | Action | Comment |
|---|---|---|---|
| 2026-05-26 | — | drafted | Initial plan draft |

---
*This document follows the https://specscore.md/plan-specification*

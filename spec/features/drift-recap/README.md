---
format: https://specscore.md/feature-specification
status: Under Review
---

# Feature: Drift Recap

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=request-change) |

**Status:** Under Review
**Source Ideas:** recap-artifacts-drift-and-session

## Summary

A **drift recap** is a machine-generated, per-acceptance-criterion record of how a Feature's specification compares to the code that claims to satisfy it, captured at a specific commit. It already exists in practice — produced by the `specstudio:recap` skill — but SpecScore has never *defined* it. This Feature formalizes it as a first-class, **status-less** SpecScore document type: a registry row, a `format:` frontmatter contract, a descriptive provenance metadata block, and a lint rule that validates the YAML summary block the producing tooling already emits. Per [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md), a drift recap is always written to the user's **hub repo** (a configured location; default a dedicated repo; may be configured to equal the current code repo) rather than co-located in `spec/`.

## Problem

The drift recap is a real artifact with no formal home in the standard. Its shape — a YAML summary block plus per-AC sections — lives only inside the tool that writes it, so nothing validates it, no registry row describes it, and third-party tooling cannot discover it by `format:`. Historically it was also written *inside* `spec/`, which contradicts the "machine-generated content lives outside `spec/`" principle. [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md) resolves that tension by relocating the drift recap (and the upstream verify report) out of the code repo into the user's hub repo, establishing the invariant that code repos hold only hand-authored artifacts (spec + code) while the hub repo holds everything machine-generated. Formalizing the drift recap pins its contract.

## Behavior

### Document type and storage

The drift recap is a registered document type whose storage target is always the hub repo (per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md)): a configured location, default a dedicated repo, that may be configured to equal the current code repo.

#### REQ: registry-row

The drift recap MUST be registered in [`document-types-registry`](../document-types-registry/README.md) as Kind `Document`. Its Consumer Path is the hub-repo target `**/features/**/recap/*.md` (namespaced by source repo under `<hub-repo>/<repo-key>/`).

#### REQ: storage-target

A drift recap MUST be written to the user's **hub repo** — always the hub repo (a configured location; default a dedicated repo; may be configured to equal the current code repo) — namespaced by source repo at `<hub-repo>/<repo-key>/features/<feature-slug>/recap/<sha>.md`, where `<repo-key>` derives from the git origin (the same resolution the journal's `stream` uses). There is no separate local fallback: writing into the current repo is simply the degenerate case where the hub repo points at it, so resolution stays uniform — one storage target, one read path. This keeps verify/recap usable before a Hub backend exists (point the hub repo at a local/dedicated repo, which the skill writes directly) and gives non-SpecScore-managed repos a home (a dedicated hub repo). The recap is keyed by the producing commit `<sha>`. The hub repo is written by the **Hub backend reacting to the `recap.completed` event**, not by the agent or CI pushing cross-repo (per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md)). The prior `_recap`-inside-`spec/` "named exception" is eliminated.

### Frontmatter

The drift recap carries the universal `format:` contract but, unlike most artifacts, has no Status.

#### REQ: format-frontmatter

A drift recap MUST carry a `format:` frontmatter line whose value is the drift-recap specification URL, aligned with the [`artifact-frontmatter-convention`](../artifact-frontmatter-convention/README.md) Feature (Under Review; a **forward dependency** — the generic `format:` lint and the "types with a Status concept" classification these REQs build on land when it is **implemented**). This Feature owns the drift-recap-specific rules regardless.

#### REQ: status-less

A drift recap is **status-less**: it is an immutable point-in-time record, not a lifecycle object. It MUST NOT carry a `status:` field, and the frontmatter-convention lint MUST classify `drift-recap` as a type with no Status concept, so that the absence of `status:` is not a violation and the *presence* of `status:` is.

### Summary-block contract

The grep-friendly YAML summary block is the machine-readable surface downstream tools consume; its shape is pinned.

#### REQ: yaml-summary-block

A drift recap MUST open with a fenced ` ```yaml ` block carrying top-level `feature`, `revision`, and `verify_revision`, plus a `drift` list with one entry per AC. Each entry MUST carry `ac`, `verdict`, and `narrative`, where `verdict` is one of the recognized drift verdicts (`no-drift`, `spec-tighter-than-code`, `code-tighter-than-spec`, `contradiction`, `unmapped`, `error`). A lint rule MUST validate this block's presence and shape.

#### REQ: provenance-metadata

The YAML summary block MUST carry a `provenance` mapping describing the commit the recap was produced against: `author`, commit `timestamp`, commit `message`, and `origin`. This block is **descriptive only** — a human-readable fingerprint and audit aid — and is **NOT** a key for re-matching a commit after history rewrite (per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md): provenance survives plain rebase but breaks on squash/reword/amend; the SHA remains the primary key). A lint rule MUST validate the presence and shape of the `provenance` block. Because the hub repo is separate from the code repo and squash-merge orphans the SHA, a drift recap SHOULD additionally embed enough cited evidence (the diff hunks, or a content hash plus the file paths it already records) to be self-contained — interpretable without re-fetching the commit.

#### REQ: per-ac-body

After the summary block, a drift recap MUST contain one `## AC: <ac-slug>` section per AC carrying that AC's verdict and narrative. The summary block is the machine surface; the per-AC sections are the human surface.

## Acceptance Criteria

### AC: registered-in-registry

**Requirements:** drift-recap#req:registry-row

**Given** a SpecScore repo with the document-types registry
**When** `specscore spec lint` resolves document types
**Then** `drift-recap` is present with Kind `Document` and a Consumer Path covering the hub-repo target (`**/features/**/recap/*.md`).

### AC: storage-target

**Requirements:** drift-recap#req:storage-target

**Given** a drift recap written to the hub repo at `<hub-repo>/<repo-key>/features/<slug>/recap/<sha>.md` (whether the hub repo is a dedicated repo or configured to equal the current code repo)
**When** lint applies the "generated content lives outside `spec/`" check
**Then** it is recognized as a valid drift-recap location and is not flagged as a misplaced generated artifact.

### AC: provenance-present

**Requirements:** drift-recap#req:provenance-metadata

**Given** a drift recap whose YAML summary block omits the `provenance` mapping (or whose `provenance` lacks `author`, `timestamp`, `message`, or `origin`)
**When** `specscore spec lint` runs
**Then** lint reports a violation identifying the missing provenance field; a recap carrying a complete `provenance` block passes.

### AC: format-required

**Requirements:** drift-recap#req:format-frontmatter

**Given** a drift recap missing the `format:` frontmatter line
**When** `specscore spec lint` runs
**Then** lint reports a violation naming the missing `format:`.

### AC: status-less-enforced

**Requirements:** drift-recap#req:status-less

**Given** two drift recaps — one with no `status:` and one carrying a `status:` field
**When** `specscore spec lint` runs
**Then** the one without `status:` passes (drift-recap has no Status concept) and the one carrying `status:` is flagged.

### AC: summary-block-validated

**Requirements:** drift-recap#req:yaml-summary-block

**Given** a drift recap whose YAML summary block omits `verify_revision` (or whose `drift` entries lack a `verdict`)
**When** `specscore spec lint` runs
**Then** lint reports a violation identifying the missing field; a well-formed block (valid `feature`/`revision`/`verify_revision` + `drift` entries with `ac`/`verdict`/`narrative`) passes.

### AC: per-ac-sections-present

**Requirements:** drift-recap#req:per-ac-body

**Given** a drift recap whose summary block lists N ACs but whose body has fewer than N `## AC:` sections
**When** `specscore spec lint` runs
**Then** lint reports the mismatch between the summary block and the per-AC body sections.

## Rehearse Integration

Every AC above is testable through `specscore spec lint` against fixture drift-recap files. Rehearse scenario stubs are deferred to the Plan phase to match the current repo convention (sibling doc-type Features carry no `_tests/` tree). Recorded scope decision, not a claim of untestability.

## Open Questions

- Should the drift-recap `format:` URL be `https://specscore.md/drift-recap-specification` (parallel to other type spec URLs), and who publishes that page?
- The producing skill (external) must begin emitting the `format:` line; that emit-side change is coordinated but out of scope for this Feature — does lint warn (grace period) or error immediately on legacy drift recaps lacking `format:`?
- **Forward dependency:** [`artifact-frontmatter-convention`](../artifact-frontmatter-convention/README.md) is now a Feature (Under Review; not yet implemented). The generic `format:` lint rule and the Status-concept classification this Feature's `format-frontmatter`/`status-less` REQs rely on land when that convention is **implemented**. Sequence accordingly at plan time.

---
*This document follows the https://specscore.md/feature-specification*

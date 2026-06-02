# Feature: Drift Recap

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/drift-recap?op=request-change) |

**Status:** Under Review
**Source Ideas:** recap-artifacts-drift-and-session

## Summary

A **drift recap** is a machine-generated, per-acceptance-criterion record of how a Feature's specification compares to the code that claims to satisfy it, captured at a specific commit. It already exists in practice — produced at `spec/features/<feature-slug>/_recap/<sha>.md` — but SpecScore has never *defined* it. This Feature formalizes it as a first-class, **status-less** SpecScore document type: a registry row, a `format:` frontmatter contract, and a lint rule that validates the YAML summary block the producing tooling already emits.

## Problem

The drift recap is a real artifact with no formal home in the standard. Its shape — a YAML summary block plus per-AC sections — lives only inside the tool that writes it, so nothing validates it, no registry row describes it, and third-party tooling cannot discover it by `format:`. It also sits *inside* `spec/`, which superficially contradicts the "machine-generated content lives outside `spec/`" principle; without an explicit definition, that placement is accidental precedent rather than a deliberate, named exception. Formalizing the drift recap pins its contract and resolves the storage-philosophy tension on purpose.

## Behavior

### Document type and storage

The drift recap is a registered document type with a deliberately co-located storage rule.

#### REQ: registry-row

The drift recap MUST be registered in [`document-types-registry`](../document-types-registry/README.md) as Kind `Document` with Consumer Path `spec/features/**/_recap/*.md`.

#### REQ: storage-and-exception

A drift recap MUST be stored at `spec/features/<feature-slug>/_recap/<sha>.md`, co-located with the Feature it audits and keyed by the producing commit `<sha>`. This `_recap/` location is a **named exception** to the convention that machine-generated content lives outside `spec/`: the co-location with the audited Feature, versioned at a SHA, is the intended value, so lint MUST NOT flag a drift recap under `_recap/` as a misplaced generated artifact.

### Frontmatter

The drift recap carries the universal `format:` contract but, unlike most artifacts, has no Status.

#### REQ: format-frontmatter

A drift recap MUST carry a `format:` frontmatter line whose value is the drift-recap specification URL, aligned with the [`artifact-frontmatter-convention`](../../ideas/artifact-frontmatter-convention.md) Idea (a **forward dependency** — currently an Idea, not yet a Feature; the generic `format:` lint and the "types with a Status concept" classification these REQs build on land when it is specified). This Feature owns the drift-recap-specific rules regardless.

#### REQ: status-less

A drift recap is **status-less**: it is an immutable point-in-time record, not a lifecycle object. It MUST NOT carry a `status:` field, and the frontmatter-convention lint MUST classify `drift-recap` as a type with no Status concept, so that the absence of `status:` is not a violation and the *presence* of `status:` is.

### Summary-block contract

The grep-friendly YAML summary block is the machine-readable surface downstream tools consume; its shape is pinned.

#### REQ: yaml-summary-block

A drift recap MUST open with a fenced ` ```yaml ` block carrying top-level `feature`, `revision`, and `verify_revision`, plus a `drift` list with one entry per AC. Each entry MUST carry `ac`, `verdict`, and `narrative`, where `verdict` is one of the recognized drift verdicts (`no-drift`, `spec-tighter-than-code`, `code-tighter-than-spec`, `contradiction`, `unmapped`, `error`). A lint rule MUST validate this block's presence and shape.

#### REQ: per-ac-body

After the summary block, a drift recap MUST contain one `## AC: <ac-slug>` section per AC carrying that AC's verdict and narrative. The summary block is the machine surface; the per-AC sections are the human surface.

## Acceptance Criteria

### AC: registered-in-registry

**Requirements:** drift-recap#req:registry-row

**Given** a SpecScore repo with the document-types registry
**When** `specscore spec lint` resolves document types
**Then** `drift-recap` is present with Kind `Document` and Consumer Path `spec/features/**/_recap/*.md`.

### AC: storage-exception-not-flagged

**Requirements:** drift-recap#req:storage-and-exception

**Given** a drift recap at `spec/features/<slug>/_recap/<sha>.md`
**When** lint applies the "generated content lives outside `spec/`" check
**Then** the `_recap/` drift recap is allowed as a named exception and is not flagged as a misplaced generated artifact.

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
- **Forward dependency:** `artifact-frontmatter-convention` is currently an Idea, not a Feature. The generic `format:` lint rule and the Status-concept classification this Feature's `format-frontmatter`/`status-less` REQs rely on require that convention to be specified first (or concurrently). Sequence accordingly at plan time.

---
*This document follows the https://specscore.md/feature-specification*

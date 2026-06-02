# Idea: Format Declaration — Footer + Frontmatter Mirror

**Status:** Approved
**Date:** 2026-06-02
**Owner:** alex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we let every SpecScore artifact declare its conformance format so it is both human-visible in rendered views and cheap for AI agents and tools to read, with no drift between the two surfaces?

## Context

Triggered by a rethink of the artifact-frontmatter-convention Feature decision to REMOVE the footer line in favor of a frontmatter format: field. The adherence-footer Feature already lint-matches the footer by its exact bare URL (the URL is the schema), so the footer is not unstructured prose — it is merely at the end of the body rather than the head. The convention also keeps status human-visible (body line) plus a lint-synced frontmatter mirror, yet proposed to make format frontmatter-only — an inconsistency for two structurally similar fields. The footer is additionally a branding surface that can associate spec-driven development (SDD) with SpecScore.

## Recommended Direction

Keep BOTH surfaces. A frontmatter format: field (primary audience: AI agents and tools; also above-the-fold for humans in viewers that render frontmatter) AND the footer line (primary audience: humans reading rendered docs; also reinforces format to AI). Both carry the same canonical spec URL; lint enforces they match and --fix derives one side from the other — a footer-and-frontmatter mirror, exactly the model already used for status (one canonical surface plus a synced mirror). The footer prose is reworded to associate spec-driven development with SpecScore. This supersedes the remove-the-footer stance in artifact-frontmatter-convention and preserves adherence-footer (amended, not retired).

## Alternatives Considered

- **Frontmatter `format:` only, footer removed** (the artifact-frontmatter-convention Feature's original direction). Lost: it hides format provenance in viewers that don't render frontmatter (GitHub Markdown, many IDE previews), discards the footer as an SDD-branding surface, and treats `format` inconsistently with `status` (which keeps a human-visible surface plus a mirror). The "footer is unstructured prose" premise is also weak — adherence-footer already lint-matches it by exact URL.
- **Footer only, status quo.** Lost: AI agents and indexing/ingitdb tooling must parse the whole Markdown body to read one field, and the declaration is not above the fold for frontmatter-aware viewers. Cheap machine access is a real requirement this leaves unmet.
- **Single source only (pick exactly one place).** Lost: the two surfaces serve genuinely different readers (humans in rendered views vs. agents/tools reading structured head). Forcing one drops a real audience. Redundancy is acceptable precisely because it is mechanically lint-synced — the same justification already accepted for `status`.
- **Build-time-derived footer** (author frontmatter; a CLI/build step generates the footer). Viable and a close runner-up, but it adds a generation step and a build dependency; the lint-synced mirror reaches the same no-drift guarantee with the mechanism that already exists for `status`. Kept as a fallback if hand-maintaining both surfaces proves error-prone in practice.

## MVP Scope

A focused change that makes every artifact carry both a frontmatter format: field and a reworded SDD-associating footer, both bearing the same spec URL, with one lint rule enforcing they match and --fix deriving the missing or mismatched side. No new artifact types; reconcile the two existing Features.

## Not Doing (and Why)

- Removing the footer — reversed; the footer is retained and reworded
- Versioning the format URL — the unversioned-URL policy from adherence-footer stays
- Changing status handling — this Idea concerns the format surfaces only
- Registry indirection for the format token — bare spec URLs only, matching artifact-frontmatter-convention
- Mandating exact footer prose — authors MAY reword; only the URL and the SDD association are required

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Lint can keep the footer URL and the frontmatter `format:` in sync with no drift, using the same mirror mechanism already specified for `status` (canonical + mirror, `--fix` derives). | Extend the status body↔frontmatter mirror rule to a footer↔frontmatter `format:` rule; run a transition/edit stress loop; confirm no drift survives `lint --fix`. |
| Should-be-true | Rewording the footer prose to mention spec-driven development does NOT break lint, because adherence-footer matches by the bare URL, not the surrounding prose. | Confirm against adherence-footer `REQ: lint-matches-url`; draft the SDD-associating wording and lint a sample artifact. |
| Should-be-true | The viewers SpecScore users actually read in (GitHub, common IDEs, specscore.studio) split cleanly enough that frontmatter serves above-the-fold viewers and the footer serves the rest, so both audiences are covered. | Inventory which target viewers render YAML frontmatter vs. hide it; confirm the union of (frontmatter-rendering ∪ footer-visible) covers all of them. |
| Might-be-true | The SDD-in-the-footer wording measurably builds association between spec-driven development and SpecScore. | A marketing/brand signal, not a build gate; do not validate up front. Revisit if brand positioning becomes a tracked goal. |


## SpecScore Integration

- **New Features this would create:** None required — this reconciles two existing Features. (At spec time, decide whether the footer↔frontmatter mirror rule lives in one of them or in a thin shared note; do not add a new artifact type.)
- **Existing Features affected:**
  - `artifact-frontmatter-convention` — amend: drop the "footer removed / replaced by `format:`" stance (`REQ: footer-replaced-by-format`); the `format:` frontmatter field is retained as the machine surface and gains a lint mirror against the footer.
  - `adherence-footer` — amend (NOT retired): the footer stays; reword the recommended template to associate spec-driven development with SpecScore; add the footer↔frontmatter `format:` mirror relationship.
  - `document-types-registry` — the per-type spec URL remains the single shared key both surfaces carry.
- **Dependencies:** `artifact-frontmatter-convention` Feature (frontmatter side, Under Review) and `adherence-footer` Feature (footer side, Draft). Both are reconciled by this Idea rather than blocked on it.

## Open Questions

- Which surface is canonical for `--fix` derivation — the frontmatter `format:` (structured, set at create, type-derived) or the footer (human-visible, mirroring the `status` body-canonical model)? Recommendation leans frontmatter-canonical for `format` since it is static and type-derived, but consistency with `status` (body/visible-canonical) is an argument the other way. Decide at Feature-spec time.
- The exact reworded footer prose that associates spec-driven development with SpecScore while keeping the bare URL intact for lint matching.
- Whether the SDD-association wording varies by artifact type or is a single shared template.

---
*This document follows the https://specscore.md/idea-specification*

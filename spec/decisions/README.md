---
format: https://specscore.md/decisions-index-specification
---

# SpecScore Decisions

Decisions are durable, lintable records of choices made between two or more options — what was chosen, why, what was declined, and what was predicted. See the [Decision feature](../features/decision/README.md) for the full artifact schema, lifecycle, and validation rules.

## Decisions

| # | Decision | Status | Date | Tags | Affected |
|---|----------|--------|------|------|----------|
| [0001](0001-studio-url-scheme.md) | SpecScore Studio Deep-Link URL Scheme | Accepted | 2026-05-22 | url, studio, contract, branding, security | — |
| [0002](0002-recap-storage-surfacing-and-producer-gate-boundary.md) | Recap/Verify Storage, Surfacing, and the Producer/Gate Boundary | Accepted | 2026-06-02 | recap, verify, storage, hub, ci, agent-session, portfolio | recap-artifacts-drift-and-session, session-recap, journal-and-summary, specscore-hub, repo-config |
| [0003](0003-one-structural-language.md) | One Structural Language — ModelSpec Owns Structure | Approved | 2026-07-08 | architecture, modelspec, graphspec, entity, property, boundaries | graphspec, entity, property, modelspec-validation |
| [0004](0004-graphspec-kind-admission.md) | GraphSpec Kind Admission — Five Core Kinds | Approved | 2026-07-08 | graphspec, language-design, kinds, value-object, enum | graphspec |
| [0005](0005-graphspec-id-and-reference-syntax.md) | GraphSpec Identifier, Reference, and File-Naming Syntax | Approved | 2026-07-08 | graphspec, identifiers, references, naming, cross-repo | graphspec |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/decisions-index-specification*

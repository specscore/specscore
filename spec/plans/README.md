---
format: https://specscore.md/plans-index-specification
---

# SpecScore Plans

Canonical index of all plans in this repository. Each plan lives in its own
directory under `spec/plans/` and is governed by the
[plan Feature](../features/plan/README.md). This index follows the
[plans-index Feature](../features-index/README.md).

## Contents

| Plan | Status | Features | Effort | Impact | Author | Approved |
|---|---|---|---|---|---|---|
| [entity-and-property-doc-kinds](entity-and-property-doc-kinds/README.md) | approved | entity, property, document-types-registry | M | high | alexander.trakhimenok | 2026-05-18 |
| [decision](decision/README.md) | approved | decision, decisions-index | M | high | alexander.trakhimenok | 2026-05-26 |
| [canonical-grade-metadata-field](canonical-grade-metadata-field.md) | approved | canonical-grade-metadata-field | S | medium | alexander.trakhimenok | 2026-05-29 |

### entity-and-property-doc-kinds

Delivers the MVP for the `entity` and `property` Document Kinds: hand-authored
smoke-test fixtures in this repo, Rehearse scenario stubs, a spec-author
documentation page, and CLI implementation Issues filed against
[`specscore/specscore-cli`](https://github.com/specscore/specscore-cli).
Implements the [entity-and-property-definitions Idea](../ideas/entity-and-property-definitions.md).

### decision

Delivers CLI support for the `decision` and `decisions-index` Features:
lint rules for all Decision REQs, `specscore decision new` scaffold command,
immutability enforcement, decisions-index completeness and ordering checks,
Rehearse scenario stubs, and specification pages for the public site.
Implements the [decision-and-decisions-index Idea](../ideas/decision-and-decisions-index.md).

### canonical-grade-metadata-field

Implements the `canonical-grade-metadata-field` Feature: `grade.values` config
parsing, the canonical `**Grade:**` schema definition, header-block parsing
(optionality, single-value, placement with `--fix` normalization), value
validation against the effective set, and kind-agnostic / Status-decoupled
rule application — across [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli)
and the published specification docs in this repo.
Implements the [canonical-grade-metadata-field Idea](../ideas/canonical-grade-metadata-field.md).

## Recently Closed

None at this time.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/plans-index-specification*

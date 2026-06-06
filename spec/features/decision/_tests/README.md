---
format: https://specscore.md/scenarios-index-specification
---

# Scenarios: Decision

Test scenarios for the [Decision](../README.md) specification.

| Scenario | Validates |
|---|---|
| [missing-required-section-rejected](missing-required-section-rejected.md) | [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:required-sections](../README.md#req-required-sections) |
| [no-declined-alternatives-rejected](no-declined-alternatives-rejected.md) | [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:declined-alternatives-non-empty](../README.md#req-declined-alternatives-non-empty) |
| [observed-consequences-placeholder-required](observed-consequences-placeholder-required.md) | [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:observed-consequences-placeholder](../README.md#req-observed-consequences-placeholder) |
| [invalid-title-format-rejected](invalid-title-format-rejected.md) | [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:title-format](../README.md#req-title-format) |
| [missing-header-fields-rejected](missing-header-fields-rejected.md) | [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:header-fields](../README.md#req-header-fields) |
| [invalid-status-value-rejected](invalid-status-value-rejected.md) | [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:status-values](../README.md#req-status-values) |
| [source-idea-target-must-exist](source-idea-target-must-exist.md) | [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:source-idea-optional](../README.md#req-source-idea-optional) |
| [invalid-filename-format-rejected](invalid-filename-format-rejected.md) | [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:filename-format](../README.md#req-filename-format) |
| [number-backfill-rejected](number-backfill-rejected.md) | [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:number-assignment](../README.md#req-number-assignment) |
| [decision-directory-rejected](decision-directory-rejected.md) | [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:single-file](../README.md#req-single-file) |
| [superseded-not-in-archived-rejected](superseded-not-in-archived-rejected.md) | [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:archived-location](../README.md#req-archived-location) |
| [superseded-without-successor-rejected](superseded-without-successor-rejected.md) | [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:superseded-requires-successor](../README.md#req-superseded-requires-successor) |
| [supersedes-bidirectional-drift-rejected](supersedes-bidirectional-drift-rejected.md) | [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:supersedes-bidirectional](../README.md#req-supersedes-bidirectional) |
| [accepted-body-edit-rejected](accepted-body-edit-rejected.md) | [decision#ac:immutability](../README.md#ac-immutability), [decision#req:immutability-once-accepted](../README.md#req-immutability-once-accepted) |
| [observed-consequences-modification-rejected](observed-consequences-modification-rejected.md) | [decision#ac:immutability](../README.md#ac-immutability), [decision#req:observed-consequences-append-only](../README.md#req-observed-consequences-append-only) |
| [affected-feature-target-must-exist](affected-feature-target-must-exist.md) | [decision#ac:affected-features](../README.md#ac-affected-features), [decision#req:affected-features-target-exists](../README.md#req-affected-features-target-exists) |
| [missing-adherence-footer-rejected](missing-adherence-footer-rejected.md) | [decision#ac:adherence-footer](../README.md#ac-adherence-footer), [decision#req:adherence-footer](../README.md#req-adherence-footer) |
| [scaffold-produces-lint-clean-file](scaffold-produces-lint-clean-file.md) | [decision#ac:scaffold-behavior](../README.md#ac-scaffold-behavior), [decision#req:scaffold-command](../README.md#req-scaffold-command) |
| [hand-authored-matches-scaffold-lint](hand-authored-matches-scaffold-lint.md) | [decision#ac:scaffold-behavior](../README.md#ac-scaffold-behavior), [decision#req:authoring-agnostic](../README.md#req-authoring-agnostic) |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/scenarios-index-specification*

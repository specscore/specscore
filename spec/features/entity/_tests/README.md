# Scenarios: Entity

Test scenarios for the [Entity](../README.md) specification.

| Scenario | Validates |
|---|---|
| [entity-in-wrong-location-rejected](entity-in-wrong-location-rejected.md) | [entity#ac:location-and-naming](../README.md#ac-location-and-naming), [entity#req:entity-location](../README.md#req-entity-location) |
| [missing-frontmatter-rejected](missing-frontmatter-rejected.md) | [entity#ac:frontmatter-shape](../README.md#ac-frontmatter-shape), [entity#req:frontmatter-required](../README.md#req-frontmatter-required) |
| [duplicate-property-name-rejected](duplicate-property-name-rejected.md) | [entity#ac:frontmatter-shape](../README.md#ac-frontmatter-shape), [entity#req:properties-list-shape](../README.md#req-properties-list-shape) |
| [inherits-redefines-parent-rejected](inherits-redefines-parent-rejected.md) | [entity#ac:inheritance-additive-only](../README.md#ac-inheritance-additive-only), [entity#req:inherits-additive-only](../README.md#req-inherits-additive-only) |
| [inherits-cycle-rejected](inherits-cycle-rejected.md) | [entity#ac:inheritance-additive-only](../README.md#ac-inheritance-additive-only), [entity#req:inherits-acyclic](../README.md#req-inherits-acyclic) |
| [body-extra-section-rejected](body-extra-section-rejected.md) | [entity#ac:body-shape](../README.md#ac-body-shape), [entity#req:required-sections](../README.md#req-required-sections) |
| [properties-table-rendered-from-frontmatter](properties-table-rendered-from-frontmatter.md) | [entity#ac:managed-sections-rendered](../README.md#ac-managed-sections-rendered), [entity#req:properties-table-managed](../README.md#req-properties-table-managed) |
| [missing-adherence-footer-rejected](missing-adherence-footer-rejected.md) | [entity#ac:adherence-footer-present](../README.md#ac-adherence-footer-present), [entity#req:adherence-footer](../README.md#req-adherence-footer) |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/scenarios-index-specification*

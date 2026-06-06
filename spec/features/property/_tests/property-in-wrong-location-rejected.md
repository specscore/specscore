---
format: https://specscore.md/scenario-specification
---

# Scenario: Property file outside `spec/features/**` is rejected

**Validates:** [property#ac:location-and-naming](../README.md#ac-location-and-naming), [property#req:property-location](../README.md#req-property-location)

## Steps

GIVEN a property file at `spec/properties/email.property.md` with valid frontmatter and body
WHEN the spec linter validates the tree
THEN the linter reports an error: property file at `spec/properties/email.property.md` does not match the required glob `spec/features/**/*.property.md`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

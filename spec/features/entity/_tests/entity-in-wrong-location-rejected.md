---
format: https://specscore.md/scenario-specification
---

# Scenario: Entity file outside `spec/features/**` is rejected

**Validates:** [entity#ac:location-and-naming](../README.md#ac-location-and-naming), [entity#req:entity-location](../README.md#req-entity-location)

## Steps

GIVEN an entity file at `spec/entities/user.entity.md` with valid frontmatter and body
WHEN the spec linter validates the tree
THEN the linter reports an error: entity file at `spec/entities/user.entity.md` does not match the required glob `spec/features/**/*.entity.md`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Entity file without an adherence footer is rejected

**Validates:** [entity#ac:adherence-footer-present](../README.md#ac-adherence-footer-present), [entity#req:adherence-footer](../README.md#req-adherence-footer)

## Steps

GIVEN an entity file with valid frontmatter, title, and all three required body sections
AND the file has no adherence-footer line at the bottom
WHEN the spec linter validates the entity file
THEN the linter reports an error: entity file `user.entity.md` is missing the adherence footer for `https://specscore.md/entity-specification`
AND the validation fails

GIVEN an entity file whose final line is `*This document follows the https://specscore.md/property-specification*` (wrong URL)
WHEN the spec linter validates the entity file
THEN the linter reports an error: adherence-footer URL does not match the entity document type's expected URL
AND `specscore lint --fix` does NOT auto-rewrite the wrong URL (per [adherence-footer#req:fix-inserts-only](../../adherence-footer/README.md#req-fix-inserts-only))

---
*This document follows the https://specscore.md/scenario-specification*

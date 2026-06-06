---
format: https://specscore.md/scenario-specification
---

# Scenario: Property file without an adherence footer is rejected

**Validates:** [property#ac:adherence-footer-present](../README.md#ac-adherence-footer-present), [property#req:adherence-footer](../README.md#req-adherence-footer)

## Steps

GIVEN a property file with valid frontmatter, title, `## Description`, and `## Referenced by`
AND the file has no adherence-footer line at the bottom
WHEN the spec linter validates the property file
THEN the linter reports an error: property file `email.property.md` is missing the adherence footer for `https://specscore.md/property-specification`
AND the validation fails

GIVEN a property file whose final line is `*This document follows the https://specscore.md/feature-specification*` (wrong URL)
WHEN the spec linter validates the property file
THEN the linter reports an error: adherence-footer URL does not match the property document type's expected URL
AND `specscore lint --fix` does NOT auto-rewrite the wrong URL (per [adherence-footer#req:fix-inserts-only](../../adherence-footer/README.md#req-fix-inserts-only))

---
*This document follows the https://specscore.md/scenario-specification*

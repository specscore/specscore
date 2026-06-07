---
format: https://specscore.md/scenario-specification
---

# Scenario: Property file with an extra body section beyond the allowed three is rejected

**Validates:** [property#ac:body-shape](../README.md#ac-body-shape), [property#req:required-sections](../README.md#req-required-sections)

## Steps

GIVEN a property file with valid frontmatter and the `# Property: email` title
AND the body contains `## Description`, `## Referenced by`, AND an additional `## Examples` section
WHEN the spec linter validates the property file
THEN the linter reports an error: property file contains a body section `## Examples` that is not in the allowed set (`## Description`, `## Referenced by`)
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

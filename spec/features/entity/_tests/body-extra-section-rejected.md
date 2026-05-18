# Scenario: Entity file with an extra body section beyond the allowed three is rejected

**Validates:** [entity#ac:body-shape](../README.md#ac-body-shape), [entity#req:required-sections](../README.md#req-required-sections)

## Steps

GIVEN an entity file with valid frontmatter and the `# Entity: User` title
AND the body contains `## Description`, `## Properties`, `## Referenced by`, AND an additional `## Lifecycle` section
WHEN the spec linter validates the entity file
THEN the linter reports an error: entity file contains a body section `## Lifecycle` that is not in the allowed set (`## Description`, `## Properties`, `## Referenced by`)
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

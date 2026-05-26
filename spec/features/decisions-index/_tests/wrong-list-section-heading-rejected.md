# Scenario: Decisions index with wrong list-section heading is rejected

**Validates:** [decisions-index#ac:list-section-heading](../README.md#ac-list-section-heading), [decisions-index#req:list-section-heading](../README.md#req-list-section-heading)

## Steps

GIVEN a decisions index file at `spec/decisions/README.md`
AND the list-holding section uses the heading `## Index` instead of `## Decisions`
WHEN the spec linter validates the tree
THEN the linter reports an error: decisions index list section must use the heading `## Decisions`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

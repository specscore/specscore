# Scenario: Decisions index rows out of numeric order are rejected

**Validates:** [decisions-index#ac:index-table](../README.md#ac-index-table), [decisions-index#req:numeric-ordering](../README.md#req-numeric-ordering)

## Steps

GIVEN a decisions index file at `spec/decisions/README.md`
AND the `## Decisions` table lists Decision `0003` before Decision `0001`
WHEN the spec linter validates the tree
THEN the linter reports an error: decisions index rows must be in ascending numeric order
AND the validation fails
AND `specscore spec lint --fix` reorders the rows to ascending numeric order

---
*This document follows the https://specscore.md/scenario-specification*

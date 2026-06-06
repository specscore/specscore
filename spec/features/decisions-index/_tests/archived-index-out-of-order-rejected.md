---
format: https://specscore.md/scenario-specification
---

# Scenario: Archived decisions index out of chronological order is rejected

**Validates:** [decisions-index#ac:archived-index](../README.md#ac-archived-index), [decisions-index#req:archived-index-chronological](../README.md#req-archived-index-chronological)

## Steps

GIVEN an archived decisions index at `spec/decisions/archived/README.md`
AND it lists a Decision dated `2026-06-01` before a Decision dated `2026-03-15`
WHEN the spec linter validates the tree
THEN the linter reports an error: archived decisions index entries must be in chronological order (oldest first)
AND the validation fails
AND `specscore spec lint --fix` reorders the entries to chronological order

---
*This document follows the https://specscore.md/scenario-specification*

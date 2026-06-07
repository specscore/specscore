---
format: https://specscore.md/scenario-specification
---

# Scenario: Decisions index missing required columns is rejected

**Validates:** [decisions-index#ac:index-table](../README.md#ac-index-table), [decisions-index#req:index-columns](../README.md#req-index-columns)

## Steps

GIVEN a decisions index file at `spec/decisions/README.md`
AND the `## Decisions` table has columns `Decision | Status | Date` (missing `#`, `Tags`, `Affected`)
WHEN the spec linter validates the tree
THEN the linter reports an error: decisions index table must include columns #, Decision, Status, Date, Tags, Affected in that order
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

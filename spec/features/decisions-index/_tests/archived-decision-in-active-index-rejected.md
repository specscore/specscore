# Scenario: Superseded Decision listed in active index is rejected

**Validates:** [decisions-index#ac:index-table](../README.md#ac-index-table), [decisions-index#req:status-excludes-archived](../README.md#req-status-excludes-archived)

## Steps

GIVEN a decisions index file at `spec/decisions/README.md`
AND the `## Decisions` table includes a row for Decision `0001-old-choice` with Status `Superseded`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-old-choice` has status `Superseded` and must not appear in the active decisions index
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

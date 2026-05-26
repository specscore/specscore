# Scenario: Superseded Decision not in archived directory is rejected

**Validates:** [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:archived-location](../README.md#req-archived-location)

## Steps

GIVEN a Decision file at `spec/decisions/0001-old-choice.md` with `**Status:** Superseded`
AND the file is NOT in `spec/decisions/archived/`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-old-choice` has status `Superseded` but is not in `spec/decisions/archived/`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

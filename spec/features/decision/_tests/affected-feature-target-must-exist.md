# Scenario: Decision referencing non-existent affected Feature is rejected

**Validates:** [decision#ac:affected-features](../README.md#ac-affected-features), [decision#req:affected-features-target-exists](../README.md#req-affected-features-target-exists)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md`
AND the `## Affected Features` section lists `nonexistent-feature`
AND no directory exists at `spec/features/nonexistent-feature/`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` references affected Feature `nonexistent-feature` which does not exist
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

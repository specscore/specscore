# Scenario: Decision missing a required section is rejected

**Validates:** [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:required-sections](../README.md#req-required-sections)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md` with valid header fields and filename
AND the `## Rationale` section is missing from the body
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` is missing required section `Rationale`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

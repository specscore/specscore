---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision with invalid status value is rejected

**Validates:** [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:status-values](../README.md#req-status-values)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md`
AND the `**Status:**` field is set to `Accepted`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision status must be one of `Draft`, `In Review`, `Approved`, `Rejected`, `Superseded`, `Deprecated`; got `Accepted`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision missing required header fields is rejected

**Validates:** [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:header-fields](../README.md#req-header-fields)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md`
AND the `**Tags:**` header field is absent
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` is missing required header field `Tags`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

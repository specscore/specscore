---
format: https://specscore.md/scenario-specification
---

# Scenario: New Decision must have Observed Consequences placeholder

**Validates:** [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:observed-consequences-placeholder](../README.md#req-observed-consequences-placeholder)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md` with `**Status:** Proposed`
AND the `## Observed Consequences` section is empty (no placeholder text)
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` Observed Consequences section must contain `None observed yet.` or observation entries
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

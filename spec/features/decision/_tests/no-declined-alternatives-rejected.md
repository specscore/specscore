---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision with empty Declined Alternatives is rejected

**Validates:** [decision#ac:decision-structure](../README.md#ac-decision-structure), [decision#req:declined-alternatives-non-empty](../README.md#req-declined-alternatives-non-empty)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md` with all required sections
AND the `## Declined Alternatives` section contains no third-level headings
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` must have at least one declined alternative
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

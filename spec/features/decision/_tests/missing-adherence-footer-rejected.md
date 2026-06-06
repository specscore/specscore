---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision without adherence footer is rejected

**Validates:** [decision#ac:adherence-footer](../README.md#ac-adherence-footer), [decision#req:adherence-footer](../README.md#req-adherence-footer)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md` with all required sections
AND the file does not end with the adherence footer containing `https://specscore.md/decision-specification`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` is missing the adherence footer
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

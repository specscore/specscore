---
format: https://specscore.md/scenario-specification
---

# Scenario: Decisions index without adherence footer is rejected

**Validates:** [decisions-index#ac:adherence-footer](../README.md#ac-adherence-footer), [decisions-index#req:adherence-footer](../README.md#req-adherence-footer)

## Steps

GIVEN a decisions index file at `spec/decisions/README.md`
AND the file does not end with the adherence footer containing `https://specscore.md/decisions-index-specification`
WHEN the spec linter validates the tree
THEN the linter reports an error: decisions index is missing the adherence footer
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

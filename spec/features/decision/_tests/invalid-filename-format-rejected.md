---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision with invalid filename format is rejected

**Validates:** [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:filename-format](../README.md#req-filename-format)

## Steps

GIVEN a Decision file at `spec/decisions/test-decision.md` (missing the `NNNN-` number prefix)
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision filename must match `<NNNN>-<slug>.md`; got `test-decision.md`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Superseded Decision without successor reference is rejected

**Validates:** [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:superseded-requires-successor](../README.md#req-superseded-requires-successor)

## Steps

GIVEN a Decision file at `spec/decisions/archived/0001-old-choice.md` with `**Status:** Superseded`
AND the `**Superseded By:**` field is `—`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-old-choice` has status `Superseded` but `Superseded By` is empty
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

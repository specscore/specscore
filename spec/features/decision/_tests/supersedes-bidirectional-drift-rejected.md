---
format: https://specscore.md/scenario-specification
---

# Scenario: Supersedes/Superseded By bidirectional drift is rejected

**Validates:** [decision#ac:lifecycle](../README.md#ac-lifecycle), [decision#req:supersedes-bidirectional](../README.md#req-supersedes-bidirectional)

## Steps

GIVEN Decision B at `spec/decisions/0002-new-choice.md` with `**Supersedes:** 0001-old-choice`
AND Decision A at `spec/decisions/archived/0001-old-choice.md` with `**Superseded By:** —` (not updated)
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0002-new-choice` supersedes `0001-old-choice` but `0001-old-choice` does not reference `0002-new-choice` in `Superseded By`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

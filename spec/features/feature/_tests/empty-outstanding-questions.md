---
format: https://specscore.md/scenario-specification
---

# Scenario: Open Questions with no items uses placeholder text

**Validates:** [feature#ac:empty-state-text](../README.md#ac-empty-state-text), [feature#req:open-questions](../README.md#req-open-questions)

## Steps

GIVEN a feature README with all required sections
AND the feature has no open questions
WHEN the author writes the Open Questions section
THEN the section contains the text "None at this time."
AND the spec linter accepts the feature as valid

---
*This document follows the https://specscore.md/scenario-specification*

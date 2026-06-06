---
format: https://specscore.md/scenario-specification
---

# Scenario: Grade must carry exactly one token

**Validates:** [canonical-grade-metadata-field#req:grade-single-value](../README.md#req-grade-single-value)

## Steps

GIVEN an artifact whose `**Grade:**` line is empty
WHEN `specscore spec lint` runs
THEN lint fails with a hard error stating `**Grade:**` must carry exactly one value

---

GIVEN an artifact whose `**Grade:**` line carries more than one token (e.g. `**Grade:** A, B`)
WHEN `specscore spec lint` runs
THEN lint fails with the same single-value hard error

---
*This document follows the https://specscore.md/scenario-specification*

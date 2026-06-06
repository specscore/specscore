---
format: https://specscore.md/scenario-specification
---

# Scenario: Malformed grade.values is a hard error

**Validates:** [canonical-grade-metadata-field#req:grade-values-shape](../README.md#req-grade-values-shape)

## Steps

GIVEN a `specscore.yaml` whose `grade.values` is an empty list (`values: []`)
WHEN `specscore spec lint` runs
THEN the load fails with a hard error identifying the violated `grade-values-shape` rule
AND no implicit value set is substituted

---

GIVEN a `specscore.yaml` whose `grade.values` is a scalar (`values: A`) or a list with an empty entry
WHEN `specscore spec lint` runs
THEN the load fails with the same `grade-values-shape` hard error

---
*This document follows the https://specscore.md/scenario-specification*

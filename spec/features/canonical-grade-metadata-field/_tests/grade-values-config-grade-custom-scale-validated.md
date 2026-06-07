---
format: https://specscore.md/scenario-specification
---

# Scenario: Grade validated against a repo-configured value set

**Validates:** [canonical-grade-metadata-field#req:grade-values-config](../README.md#req-grade-values-config), [canonical-grade-metadata-field#req:grade-value-validated](../README.md#req-grade-value-validated)

## Steps

GIVEN a repository whose `specscore.yaml` declares `grade.values: [1, 2, 3, 4, 5]`
AND one artifact graded `**Grade:** 3` and another graded `**Grade:** A`
WHEN `specscore spec lint` runs
THEN the `3` grade passes against the configured set
AND the `A` grade fails with a hard error naming the value and the configured set

---
*This document follows the https://specscore.md/scenario-specification*

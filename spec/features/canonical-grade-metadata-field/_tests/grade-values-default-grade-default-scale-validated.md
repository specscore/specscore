---
format: https://specscore.md/scenario-specification
---

# Scenario: Grade validated against the default A–F scale when no config

**Validates:** [canonical-grade-metadata-field#req:grade-values-default](../README.md#req-grade-values-default), [canonical-grade-metadata-field#req:grade-value-validated](../README.md#req-grade-value-validated)

## Steps

GIVEN a repository whose `specscore.yaml` declares no `grade:` block
AND one artifact graded `**Grade:** A` and another graded `**Grade:** Z`
WHEN `specscore spec lint` runs
THEN the `A` grade passes against the default set `A, B, C, D, F`
AND the `Z` grade fails with a hard error naming the value and the effective default set

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: A gradeable artifact with no Grade line lints clean

**Validates:** [canonical-grade-metadata-field#req:grade-field-optional](../README.md#req-grade-field-optional)

## Steps

GIVEN a gradeable artifact whose header block contains no `**Grade:**` line
WHEN `specscore spec lint` runs
THEN lint passes
AND no warning or error references a missing Grade field

---
*This document follows the https://specscore.md/scenario-specification*

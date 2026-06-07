---
format: https://specscore.md/scenario-specification
---

# Scenario: Grade must be the last header-block line, after Status

**Validates:** [canonical-grade-metadata-field#req:grade-placement](../README.md#req-grade-placement)

## Steps

GIVEN an artifact whose header block is `**Status:**`, then `**Source Ideas:**`, then `**Grade:**` as the last metadata line
WHEN `specscore spec lint` runs
THEN lint passes

---

GIVEN the same artifact with `**Grade:**` moved above `**Status:**`, or placed outside the contiguous header block
WHEN `specscore spec lint` runs
THEN lint fails with a hard placement error

---
*This document follows the https://specscore.md/scenario-specification*

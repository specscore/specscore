# Scenario: Grade is decoupled from reviewer-gate workflow and from Status

**Validates:** [canonical-grade-metadata-field#req:grade-generic-definition](../README.md#req-grade-generic-definition), [canonical-grade-metadata-field#req:grade-no-status-coupling](../README.md#req-grade-no-status-coupling)

## Steps

GIVEN a repository that declares no reviewer gates
AND a `Draft` artifact carrying a valid `**Grade:**` value
WHEN `specscore spec lint` runs
THEN lint accepts the grade
AND neither the absence of a reviewer-gate workflow nor the `Draft` status causes a Grade-related error

---
*This document follows the https://specscore.md/scenario-specification*

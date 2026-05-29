# Scenario: Grade is validated on any artifact kind with a header block

**Validates:** [canonical-grade-metadata-field#req:grade-artifact-scope](../README.md#req-grade-artifact-scope)

## Steps

GIVEN a valid `**Grade:**` line on a non-Feature artifact that has a header block (e.g. a Plan)
WHEN `specscore spec lint` runs
THEN lint applies the same value validation and placement rule it applies to a Feature
AND there is no kind-specific exemption or rejection

---
*This document follows the https://specscore.md/scenario-specification*

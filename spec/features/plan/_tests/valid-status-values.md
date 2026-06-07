---
format: https://specscore.md/scenario-specification
---

# Scenario: Valid status values

**Validates:** [plan#req:valid-statuses](../README.md#req-valid-statuses), [plan#req:execution-status-derived](../README.md#req-execution-status-derived)

## Steps

GIVEN a plan document with status `Draft`
WHEN the status is validated
THEN validation passes

GIVEN a plan document with status `Approved`
WHEN the status is validated
THEN validation passes

GIVEN a plan document with status `Implemented`
WHEN the status is validated
THEN validation passes (execution-band statuses are valid plan statuses)

GIVEN a plan document with status `Superseded` that names a successor plan
WHEN the status is validated
THEN validation passes

GIVEN a plan document with status `Superseded` that names no successor plan
WHEN the document is validated
THEN validation rejects it with an error indicating a `Superseded` plan must reference its successor

GIVEN a plan document with status `done`
WHEN the status is validated
THEN validation rejects the status with an error indicating it is not one of the nine valid plan statuses

GIVEN a plan author hand-setting status `Executing` on a `Draft` plan
WHEN `specscore spec lint --fix` runs
THEN the execution band is never hand-honored; `lint --fix` derives execution status only from `Approved` onward and leaves prep states untouched

---
*This document follows the https://specscore.md/scenario-specification*

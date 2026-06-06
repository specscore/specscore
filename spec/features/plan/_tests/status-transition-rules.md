---
format: https://specscore.md/scenario-specification
---

# Scenario: Status transition rules

**Validates:** [plan#req:status-transitions](../README.md#req-status-transitions)

## Steps

GIVEN a plan with status `Draft`
WHEN the status is changed to `In Review`
THEN the transition is accepted

GIVEN a plan with status `In Review`
WHEN the status is changed to `Draft` (revisions requested)
THEN the transition is accepted

GIVEN a plan with status `In Review`
WHEN the status is changed to `Approved`
THEN the transition is accepted

GIVEN a plan with status `Draft`
WHEN the status is changed directly to `Approved` (skipping `In Review`)
THEN the transition is rejected with an error indicating the allowed transitions from `Draft`

GIVEN a plan with status `Approved`
WHEN `specscore spec lint --fix` derives the execution band from task rollup
THEN the plan MAY transition to an execution status (e.g. `Executing`), but only `lint --fix` performs this — a human MUST NOT hand-set it

GIVEN a plan with status `Withdrawn`
WHEN the status is changed back to `Approved` (resurrection)
THEN the transition is rejected — re-pursuing the work means authoring a new plan

---
*This document follows the https://specscore.md/scenario-specification*

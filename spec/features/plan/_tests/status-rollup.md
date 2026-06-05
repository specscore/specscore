# Scenario: Status rollup

**Validates:** [plan#req:status-rollup](../README.md#req-status-rollup)

## Steps

GIVEN an `Approved` plan whose tasks are all complete
WHEN `specscore spec lint --fix` computes the execution-band rollup
THEN the derived plan status is `Implemented`

GIVEN an `Approved` plan with at least one task `in_progress`
WHEN the rollup is computed
THEN the derived plan status is `Executing`

GIVEN an `Approved` plan whose tasks are blocked, with none in progress and none failed
WHEN the rollup is computed
THEN the derived plan status is `Blocked`

GIVEN an `Approved` plan with a failed/aborted task and an in-progress task
WHEN the rollup is computed
THEN the derived plan status is `Failed` (Failed wins over Executing per the documented precedence)

GIVEN a plan still in the `Draft` prep state
WHEN `specscore spec lint --fix` runs
THEN the rollup leaves the status untouched — `lint --fix` derives execution status only from `Approved` onward and never overwrites a human-authored prep state

---
*This document follows the https://specscore.md/scenario-specification*

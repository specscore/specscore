# Scenario: Task verifies feature AC

**Validates:** [plan#req:task-verifies-feature-ac](../README.md#req-task-verifies-feature-ac)

## Steps

GIVEN a feature-sourced plan whose Task 1 declares `**Verifies:** cli#ac:batch-flag-in-help`
WHEN the plan is validated by lint rule `P-001`
THEN validation passes because the task references at least one source-Feature acceptance criterion

GIVEN a task declaring `**Verifies:** cli#ac:one, cli#ac:two`
WHEN the plan is validated
THEN both referenced acceptance criteria are accepted as the task's traceability targets

GIVEN a feature-sourced plan with a task that has no `**Verifies:**` line
WHEN the plan is validated
THEN lint rule `P-001` rejects it, indicating every plan task must reference at least one feature AC

GIVEN an idea-sourced plan (no source Feature) whose tasks have no `**Verifies:**` line
WHEN the plan is validated
THEN `P-001` does not apply and the plan passes

---
*This document follows the https://specscore.md/scenario-specification*

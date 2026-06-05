# Scenario: Plan source binding

**Validates:** [plan#req:source-binding](../README.md#req-source-binding)

## Steps

GIVEN a plan whose header declares `**Source Feature:** cli`
WHEN the plan header is checked
THEN the single source binding is accepted as feature-sourced

GIVEN a plan whose header declares `**Source:** idea:add-batch-mode`
WHEN the plan header is checked
THEN the single source binding is accepted as idea-sourced

GIVEN a plan document declaring neither `**Source Feature:**` nor `**Source:** idea:<slug>`
WHEN the document is validated
THEN validation rejects it with an error indicating exactly one source must be declared

GIVEN a plan document declaring BOTH `**Source Feature:**` and `**Source:** idea:<slug>`
WHEN the document is validated
THEN validation rejects it with an error indicating the two source bindings are mutually exclusive

---
*This document follows the https://specscore.md/scenario-specification*

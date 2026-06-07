---
format: https://specscore.md/scenario-specification
---

# Scenario: Proposal forward reference

**Validates:** [plan#req:proposal-forward-reference](../README.md#req-proposal-forward-reference)

## Steps

GIVEN a plan whose `**Source:**` line links to proposal `spec/features/api/proposals/deprecate-v1/`
WHEN the proposal document is checked
THEN it contains a `Plan` field linking to the plan

GIVEN a feature-sourced plan (`**Source Feature:**`)
WHEN the plan is validated
THEN no forward reference from a proposal is required

---
*This document follows the https://specscore.md/scenario-specification*

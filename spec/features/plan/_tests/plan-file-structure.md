# Scenario: Plan file structure

**Validates:** [plan#req:plan-file](../README.md#req-plan-file), [plan#req:plan-slug-format](../README.md#req-plan-slug-format)

## Steps

GIVEN a spec repository with a `spec/plans/` directory
WHEN a new plan is created with slug `add-batch-mode`
THEN a single file `spec/plans/add-batch-mode.md` is created (not a directory)

GIVEN a plan authored as a directory tree `spec/plans/add-batch-mode/README.md`
WHEN the document is validated against the single-file contract (lint rule `P-003`)
THEN validation rejects it, indicating a plan MUST be a single flat file

GIVEN a plan slug containing uppercase letters or underscores (e.g., `Add_Batch`)
WHEN the slug is validated
THEN validation rejects the slug with an error indicating it must be lowercase, hyphen-separated, and URL-safe

---
*This document follows the https://specscore.md/scenario-specification*

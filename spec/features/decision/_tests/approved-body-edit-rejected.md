---
format: https://specscore.md/scenario-specification
---

# Scenario: Editing the body of an Approved Decision is rejected

**Validates:** [decision#ac:immutability](../README.md#ac-immutability), [decision#req:immutability-once-approved](../README.md#req-immutability-once-approved)

## Steps

GIVEN a Decision file at `spec/decisions/0001-approved.md` with `**Status:** Approved`
AND the `## Rationale` section content has been modified since the Decision was Approved
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-approved` is Approved; section `Rationale` must not be modified
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: Editing the body of an Accepted Decision is rejected

**Validates:** [decision#ac:immutability](../README.md#ac-immutability), [decision#req:immutability-once-accepted](../README.md#req-immutability-once-accepted)

## Steps

GIVEN a Decision file at `spec/decisions/0001-accepted.md` with `**Status:** Accepted`
AND the `## Rationale` section content has been modified since the Decision was Accepted
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-accepted` is Accepted; section `Rationale` must not be modified
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

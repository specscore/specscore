---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision backfilling a gap in the number sequence is rejected

**Validates:** [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:number-assignment](../README.md#req-number-assignment)

## Steps

GIVEN existing Decisions `0001-first.md` and `0003-third.md` under `spec/decisions/`
AND a new Decision file at `spec/decisions/0002-backfilled.md`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision number `0002` backfills a gap; new Decisions must use the next number above the highest existing (`0004`)
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

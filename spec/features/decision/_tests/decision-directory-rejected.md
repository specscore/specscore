---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision as a directory is rejected

**Validates:** [decision#ac:filename-and-numbering](../README.md#ac-filename-and-numbering), [decision#req:single-file](../README.md#req-single-file)

## Steps

GIVEN a directory at `spec/decisions/0099-test-decision/` containing a `README.md`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` must be a single file, not a directory
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

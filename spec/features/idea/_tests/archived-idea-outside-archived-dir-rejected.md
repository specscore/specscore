---
format: https://specscore.md/scenario-specification
---

# Scenario: Archived idea outside `archived/` subdirectory is rejected

**Validates:** [idea#ac:archival](../README.md#ac-archival), [idea#req:archive-location](../README.md#req-archive-location)

## Steps

GIVEN an idea file at `spec/ideas/offline-mode.md` with `**Archived:** true` (its `**Status:**` retained, not a status)
AND the file has not been moved into `spec/ideas/archived/`
WHEN the spec linter validates the idea tree
THEN the linter reports an error: archived idea "offline-mode" must reside at `spec/ideas/archived/offline-mode.md`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

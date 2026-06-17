---
format: https://specscore.md/scenario-specification
---

# Scenario: `Supersedes` target that is not archived is rejected

**Validates:** [idea#ac:archival](../README.md#ac-archival), [idea#req:supersedes-target-stale](../README.md#req-supersedes-target-stale)

## Steps

GIVEN an idea file at `spec/ideas/offline-sync.md` with `**Supersedes:** offline-mode`
AND `spec/ideas/offline-mode.md` exists with `**Status:** Approved` and `**Archived:** false` (not `Stale` + archived)
WHEN the spec linter validates the idea tree
THEN the linter reports an error: `Supersedes` target "offline-mode" must exist under `spec/ideas/archived/` with `Status: Stale` and `Archived: true`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

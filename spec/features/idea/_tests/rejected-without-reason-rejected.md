---
format: https://specscore.md/scenario-specification
---

# Scenario: Rejected idea without a disposition reason is rejected

**Validates:** [idea#ac:archival](../README.md#ac-archival), [idea#req:terminal-disposition-transitions](../README.md#req-terminal-disposition-transitions)

## Steps

GIVEN an idea at `spec/ideas/offline-mode.md` transitioned to `**Status:** Rejected` (an explicit decision against it at review)
AND the `Rejected` transition carries no disposition reason
WHEN the spec linter validates the idea
THEN the linter reports an error: rejecting idea "offline-mode" must carry a disposition reason for the `Rejected` transition
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

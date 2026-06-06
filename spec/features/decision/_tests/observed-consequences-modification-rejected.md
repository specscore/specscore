---
format: https://specscore.md/scenario-specification
---

# Scenario: Modifying existing Observed Consequences entries is rejected

**Validates:** [decision#ac:immutability](../README.md#ac-immutability), [decision#req:observed-consequences-append-only](../README.md#req-observed-consequences-append-only)

## Steps

GIVEN a Decision file at `spec/decisions/0001-accepted.md` with `**Status:** Accepted`
AND the `## Observed Consequences` section previously contained `2026-05-01 — Latency improved by 40ms.`
AND that entry has been modified to `2026-05-01 — Latency improved by 80ms.`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0001-accepted` Observed Consequences is append-only; existing entries must not be modified
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

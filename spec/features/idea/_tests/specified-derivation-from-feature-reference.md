---
format: https://specscore.md/scenario-specification
---

# Scenario: Creating a feature that references an idea transitions it to `Implementing` or `Specified`

**Validates:** [idea#ac:promotion-lifecycle](../README.md#ac-promotion-lifecycle), [idea#req:implementing-derivation](../README.md#req-implementing-derivation), [idea#req:specified-derivation](../README.md#req-specified-derivation)

## Steps

GIVEN an idea file at `spec/ideas/offline-mode.md` with `**Status:** Approved` and `**Promotes To:** —`
AND a feature at `spec/features/offline-sync/README.md` is created with `**Source Ideas:** offline-mode` and `**Status:** Draft`
WHEN `specscore lint --fix` runs over the spec tree
THEN the idea's `**Status:**` is updated to `Implementing` (because the referencing Feature is not yet Stable)
AND the idea's `**Promotes To:**` lists `offline-sync`
AND subsequent `specscore lint` invocations succeed without drift

GIVEN the same idea is at `**Status:** Implementing` with `**Promotes To:** offline-sync`
AND the referenced feature `spec/features/offline-sync/README.md` transitions to `**Status:** Stable`
AND no other Features reference this idea
WHEN `specscore lint --fix` runs over the spec tree
THEN the idea's `**Status:**` is updated to `Specified` (every referencing Feature is now Stable)
AND the idea's `**Promotes To:**` still lists `offline-sync`

---
*This document follows the https://specscore.md/scenario-specification*

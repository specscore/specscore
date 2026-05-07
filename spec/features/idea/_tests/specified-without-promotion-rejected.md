# Scenario: `Implementing` or `Specified` status without a `Promotes To` target is rejected

**Validates:** [idea#ac:promotion-lifecycle](../README.md#ac-promotion-lifecycle), [idea#req:implementing-requires-promotion](../README.md#req-implementing-requires-promotion), [idea#req:specified-requires-all-stable](../README.md#req-specified-requires-all-stable)

## Steps

GIVEN an idea file at `spec/ideas/offline-mode.md` with `**Status:** Implementing`
AND the `**Promotes To:**` field value is `—`
WHEN the spec linter validates the idea
THEN the linter reports an error: an idea with `Status: Implementing` must have a non-empty `Promotes To` list
AND the validation fails

GIVEN an idea file at `spec/ideas/offline-mode.md` with `**Status:** Specified`
AND the `**Promotes To:**` field value is `—`
WHEN the spec linter validates the idea
THEN the linter reports an error: an idea with `Status: Specified` must have a non-empty `Promotes To` list AND every referenced Feature must be at `Status: Stable`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

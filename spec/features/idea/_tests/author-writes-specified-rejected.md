---
format: https://specscore.md/scenario-specification
---

# Scenario: Author-written `Status: Implementing` or `Status: Specified` without matching features is rejected

**Validates:** [idea#ac:promotion-lifecycle](../README.md#ac-promotion-lifecycle), [idea#req:derived-status-not-author-set](../README.md#req-derived-status-not-author-set)

## Steps

GIVEN an idea file at `spec/ideas/offline-mode.md` manually edited to `**Status:** Implementing`
AND no feature in `spec/features/` lists `offline-mode` in its `**Source Ideas:**` field
WHEN the spec linter validates the idea tree
THEN the linter reports an error: `Status: Implementing` may only be set by tooling in response to a referencing feature
AND the validation fails

GIVEN an idea file at `spec/ideas/offline-mode.md` manually edited to `**Status:** Specified`
AND no feature in `spec/features/` lists `offline-mode` in its `**Source Ideas:**` field (or one is listed but not at `Status: Stable`)
WHEN the spec linter validates the idea tree
THEN the linter reports an error: `Status: Specified` may only be set by tooling when every referencing Feature has reached `Stable`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

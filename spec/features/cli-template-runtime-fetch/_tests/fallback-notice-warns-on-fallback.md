# Scenario: Falling back prints a one-line stderr warning and still succeeds

**Validates:** [cli-template-runtime-fetch#ac:warns-on-fallback](../README.md#ac-warns-on-fallback-verifies-reqfallback-notice), [cli-template-runtime-fetch#req:fallback-notice](../README.md#req-fallback-notice)

## Steps

GIVEN `SPECSCORE_TEMPLATE_BASE_URL` points at an unreachable host
WHEN the user runs `specscore idea new my-idea`
THEN a one-line warning is written to stderr indicating the built-in template was used
AND the command exits zero with `spec/ideas/my-idea.md` created

GIVEN the gallery is reachable and serves the template
WHEN the user runs `specscore idea new my-idea`
THEN no fallback warning is printed

---
*This document follows the https://specscore.md/scenario-specification*

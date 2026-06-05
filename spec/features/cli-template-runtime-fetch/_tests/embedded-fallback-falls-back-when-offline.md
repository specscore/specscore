# Scenario: `idea new` falls back to the embedded template when offline

**Validates:** [cli-template-runtime-fetch#ac:falls-back-when-offline](../README.md#ac-falls-back-when-offline-verifies-reqembedded-fallback), [cli-template-runtime-fetch#req:embedded-fallback](../README.md#req-embedded-fallback)

## Steps

GIVEN `SPECSCORE_TEMPLATE_BASE_URL` points at an unreachable host
WHEN the user runs `specscore idea new my-idea`
THEN the file `spec/ideas/my-idea.md` is created from the embedded template
AND the command exits zero

---
*This document follows the https://specscore.md/scenario-specification*

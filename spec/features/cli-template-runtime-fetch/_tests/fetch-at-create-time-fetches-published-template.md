---
format: https://specscore.md/scenario-specification
---

# Scenario: `idea new` fetches the published template before writing

**Validates:** [cli-template-runtime-fetch#ac:fetches-published-template](../README.md#ac-fetches-published-template-verifies-reqfetch-at-create-time), [cli-template-runtime-fetch#req:fetch-at-create-time](../README.md#req-fetch-at-create-time)

## Steps

GIVEN a local test HTTP server serving `/new/idea.md`
AND `SPECSCORE_TEMPLATE_BASE_URL` points at that server
WHEN the user runs `specscore idea new my-idea`
THEN the server records a GET request for `/new/idea.md`
AND the request occurs before the file `spec/ideas/my-idea.md` is written

---
*This document follows the https://specscore.md/scenario-specification*

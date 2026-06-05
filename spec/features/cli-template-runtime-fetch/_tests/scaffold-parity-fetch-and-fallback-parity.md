# Scenario: Fetch path and fallback path produce byte-identical files

**Validates:** [cli-template-runtime-fetch#ac:fetch-and-fallback-parity](../README.md#ac-fetch-and-fallback-parity-verifies-reqscaffold-parity), [cli-template-runtime-fetch#req:scaffold-parity](../README.md#req-scaffold-parity)

## Steps

GIVEN a test server serves an idea template identical to the CLI's embedded copy
WHEN the user runs `specscore idea new my-idea --owner alex` with the server reachable
AND the user runs the same command (fresh location) with the base URL unreachable
THEN the two created `my-idea.md` files are byte-identical

---
*This document follows the https://specscore.md/scenario-specification*

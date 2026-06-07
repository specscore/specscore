---
format: https://specscore.md/scenario-specification
---

# Scenario: absolute or escaping `ideas_path` is a hard error

**Validates:** [configurable-ideas-path#req:ideas-path-relative-to-module](../README.md#req-ideas-path-relative-to-module)

## Steps

GIVEN a `specscore.yaml` whose module sets `path_overrides.ideas_path: /ideas` (absolute)
WHEN a tool loads the config
THEN the load MUST fail with a hard error naming the offending module and the `ideas-path-relative-to-module` REQ
AND no default is applied and the file is not rewritten

---

GIVEN a `specscore.yaml` whose module sets `path_overrides.ideas_path: ../ideas` (escapes the module root)
WHEN a tool loads the config
THEN the load MUST fail with the same hard error

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: `ideas_path` override resolves relative to the module root

**Validates:** [configurable-ideas-path#req:ideas-path-override](../README.md#req-ideas-path-override), [configurable-ideas-path#req:ideas-path-relative-to-module](../README.md#req-ideas-path-relative-to-module)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - path: ""
    path_overrides:
      ideas_path: ideas
  - path: backend
    path_overrides:
      ideas_path: ideas
```
WHEN a tool resolves the ideas directory for each module
THEN the root module MUST resolve to `./ideas`
AND the `backend` module MUST resolve to `./backend/ideas`

---
*This document follows the https://specscore.md/scenario-specification*

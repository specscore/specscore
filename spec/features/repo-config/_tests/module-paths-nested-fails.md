---
format: https://specscore.md/scenario-specification
---

# Scenario: Nested explicit module paths are a hard error

**Validates:** [repo-config#req:module-paths-non-nested](../README.md#req-module-paths-non-nested)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Backend
    path: backend
  - name: BackendAPI
    path: backend/api
```
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that one explicit module path is an ancestor of another
AND the error MUST identify both module entries

---
*This document follows the https://specscore.md/scenario-specification*

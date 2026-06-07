---
format: https://specscore.md/scenario-specification
---

# Scenario: Implicit-root module coexists with explicit-path modules

**Validates:** [repo-config#req:module-paths-non-nested](../README.md#req-module-paths-non-nested)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Highlevel
  - name: Backend
    path: backend
  - path: frontend
```
(one implicit-root module without `path:`, two explicit-path modules)
WHEN SpecScore validates the project
THEN validation MUST succeed
AND no nested-paths error MUST be emitted
AND the implicit-root module's specs MUST resolve at `./specs/`
AND the `Backend` module's specs MUST resolve at `./backend/specs/`
AND the `frontend` module's specs MUST resolve at `./frontend/specs/`

---
*This document follows the https://specscore.md/scenario-specification*

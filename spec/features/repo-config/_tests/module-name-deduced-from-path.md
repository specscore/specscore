---
format: https://specscore.md/scenario-specification
---

# Scenario: Module name deduced from `path` basename, or `default` at root

**Validates:** [repo-config#req:module-name-deduction](../README.md#req-module-name-deduction)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - path: services/backend
```
WHEN SpecScore resolves module names
THEN the effective `name` for that module MUST be `backend` (the basename of `path`)

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - {}
```
(a module with neither `name` nor `path`)
WHEN SpecScore resolves module names
THEN the effective `name` MUST be `default`

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Highlevel
    path: services/backend
```
WHEN SpecScore resolves module names
THEN the explicit `name` MUST be used as-is (`Highlevel`)
AND the basename of `path` MUST NOT override it

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: Module specs, docs, and code paths resolve relative to `module.path`

**Validates:** [repo-config#req:module-path-resolution](../README.md#req-module-path-resolution)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Backend
    path: backend
    code:
      - pkg/
      - go.mod
      - go.sum
```
WHEN SpecScore resolves module paths
THEN the specs directory for `Backend` MUST resolve to `./backend/specs/`
AND the docs directory for `Backend` MUST resolve to `./backend/docs/`
AND each `code` entry MUST resolve relative to `./backend/`:
  - `pkg/` → `./backend/pkg/`
  - `go.mod` → `./backend/go.mod`
  - `go.sum` → `./backend/go.sum`

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Highlevel
```
(no `path:`)
WHEN SpecScore resolves module paths
THEN the specs directory MUST resolve to `./specs/`
AND the docs directory MUST resolve to `./docs/`

---
*This document follows the https://specscore.md/scenario-specification*

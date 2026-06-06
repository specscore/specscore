---
format: https://specscore.md/scenario-specification
---

# Scenario: Duplicate module paths are a hard error

**Validates:** [repo-config#req:module-paths-unique](../README.md#req-module-paths-unique)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Backend
    path: services
  - name: BackendV2
    path: services
```
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating duplicate module paths
AND the error MUST identify both module entries

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: A
  - name: B
```
(two modules, both with no `path:` — both effectively at the repository root)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating duplicate module paths

---
*This document follows the https://specscore.md/scenario-specification*

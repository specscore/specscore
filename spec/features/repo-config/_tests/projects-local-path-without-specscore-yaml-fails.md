# Scenario: `projects:` local path without nested `specscore.yaml` is a hard error

**Validates:** [repo-config#req:projects-local-path-must-resolve](../README.md#req-projects-local-path-must-resolve)

## Steps

GIVEN a `specscore.yaml` with:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
projects:
  - ./packages/missing
```
AND the directory `./packages/missing/` does not exist
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating the local-path entry does not resolve

---

GIVEN a `specscore.yaml` with:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
projects:
  - ./packages/no-config
```
AND the directory `./packages/no-config/` exists but contains no `specscore.yaml`
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating the directory has no nested SpecScore config

---
*This document follows the https://specscore.md/scenario-specification*

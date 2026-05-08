# Scenario: `specs_dir_name` defaults to `specs` when omitted

**Validates:** [repo-config#req:specs-dir-name-default](../README.md#req-specs-dir-name-default)

## Steps

GIVEN a `specscore.yaml` containing only the schema-header comment
WHEN SpecScore resolves the specs directory for the implicit-root module
THEN it MUST use `./specs/` as the path

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
specs_dir_name: specifications
modules:
  - path: backend
```
WHEN SpecScore resolves the specs directory for the `backend` module
THEN it MUST use `./backend/specifications/` as the path
AND the same `specs_dir_name` MUST apply to every module

---
*This document follows the https://specscore.md/scenario-specification*

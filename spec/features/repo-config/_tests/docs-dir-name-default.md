# Scenario: `docs_dir_name` defaults to `docs` when omitted

**Validates:** [repo-config#req:docs-dir-name-default](../README.md#req-docs-dir-name-default)

## Steps

GIVEN a `specscore.yaml` containing only the schema-header comment
WHEN SpecScore resolves the docs directory for the implicit-root module
THEN it MUST use `./docs/` as the path

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
docs_dir_name: documentation
modules:
  - path: frontend
```
WHEN SpecScore resolves the docs directory for the `frontend` module
THEN it MUST use `./frontend/documentation/` as the path
AND the same `docs_dir_name` MUST apply to every module

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: `projects:` local-path entry resolves to a nested SpecScore project

**Validates:** [repo-config#req:projects-list](../README.md#req-projects-list), [repo-config#req:projects-local-path-must-resolve](../README.md#req-projects-local-path-must-resolve)

## Steps

GIVEN a repository root contains a `specscore.yaml` with:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
projects:
  - ./packages/api
  - ./packages/web
```
AND `./packages/api/specscore.yaml` exists with a valid schema-header comment
AND `./packages/web/specscore.yaml` exists with a valid schema-header comment
WHEN SpecScore validates the root project
THEN validation MUST succeed
AND each local-path entry MUST be recognized as a nested SpecScore project

---
*This document follows the https://specscore.md/scenario-specification*

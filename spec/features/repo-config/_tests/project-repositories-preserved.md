# Scenario: `project.repositories` round-trips on read/write

**Validates:** [repo-config#req:project-repositories](../README.md#req-project-repositories)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
project:
  title: Acme Service
  repositories:
    - https://github.com/acme/service-api
    - https://github.com/acme/service-web
```
WHEN SpecScore reads the file and writes it back unchanged
THEN the `project.repositories` list MUST be preserved with the same entries in the same order
AND validation MUST succeed without warnings about `repositories`

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Unknown fields at any level are preserved

**Validates:** [repo-config#req:unknown-fields-preserved](../README.md#req-unknown-fields-preserved)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
project:
  title: My Project
  custom_orchestrator_field: value-A
state_repo: https://github.com/org/state
planning:
  auto_create: false
modules:
  - name: Backend
    path: backend
    custom_module_field: value-B
```
WHEN SpecScore reads the file
THEN validation MUST succeed without warnings
AND `state_repo`, `planning`, `project.custom_orchestrator_field`, and the module-level `custom_module_field` MUST round-trip unchanged on write

---
*This document follows the https://specscore.md/scenario-specification*

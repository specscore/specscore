# Scenario: Project publication event policy is valid

**Validates:** [publication-policy-config#req:project-config-location](../README.md#req-project-config-location), [publication-policy-config#req:action-list](../README.md#req-action-list)

## Steps

GIVEN a repo-root `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    idea.approved:
      actions: [stage, commit]
```
WHEN config validation runs
THEN validation succeeds
AND consumers can read `publication.events.idea.approved.actions` as `[stage, commit]`

---
*This document follows the https://specscore.md/scenario-specification*

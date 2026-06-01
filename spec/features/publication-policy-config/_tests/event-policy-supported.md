# Scenario: Event policies resolve independently

**Validates:** [publication-policy-config#req:event-policy](../README.md#req-event-policy)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    idea.drafted:
      actions: [stage]
    idea.approved:
      actions: [stage, commit, push]
```
WHEN a consumer resolves policy for `idea.drafted`
THEN the resolved action list is `[stage]`

---

GIVEN the same config
WHEN a consumer resolves policy for `idea.approved`
THEN the resolved action list is `[stage, commit, push]`

---
*This document follows the https://specscore.md/scenario-specification*

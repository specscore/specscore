# Scenario: Invalid publication action sequence is rejected

**Validates:** [publication-policy-config#req:action-list](../README.md#req-action-list)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    idea.approved:
      actions: [push]
```
WHEN config validation runs
THEN validation fails with a hard error identifying the invalid `actions` sequence
AND the error explains that `push` requires `stage` and `commit`

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: Branch deny policy wins over allow policy

**Validates:** [publication-policy-config#req:branch-policy](../README.md#req-branch-policy), [publication-policy-config#req:safety-constraints-monotonic](../README.md#req-safety-constraints-monotonic)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    idea.approved:
      actions: [stage, commit, push]
  push:
    allow_branches: ["feature/*", "main"]
    deny_branches: ["main"]
```
WHEN a consumer checks whether push is allowed on branch `main`
THEN push is refused because `main` matches `deny_branches`
AND the denial is not weakened by the matching allow rule or by the action policy including `push`

---
*This document follows the https://specscore.md/scenario-specification*

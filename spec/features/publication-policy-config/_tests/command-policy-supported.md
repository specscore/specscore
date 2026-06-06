---
format: https://specscore.md/scenario-specification
---

# Scenario: Command-scoped event policy is available

**Validates:** [publication-policy-config#req:command-policy](../README.md#req-command-policy)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    feature.approved:
      actions: [stage, commit, push]
  commands:
    implement:
      events:
        feature.approved:
          actions: [stage, commit]
```
WHEN a consumer resolves policy for `feature.approved` inside the `implement` command
THEN `publication.commands.implement.events.feature.approved.actions` is available as `[stage, commit]`
AND it can override the broader `publication.events.feature.approved.actions` policy

---
*This document follows the https://specscore.md/scenario-specification*

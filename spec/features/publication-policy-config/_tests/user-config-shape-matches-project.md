# Scenario: User publication config uses the project policy shape

**Validates:** [publication-policy-config#req:user-config-location](../README.md#req-user-config-location)

## Steps

GIVEN the canonical SpecScore user config file contains:
```yaml
publication:
  events:
    idea.approved:
      actions: [stage, commit]
  push:
    deny_branches: ["main"]
```
WHEN a consumer loads user-level publication preferences through the `specscore` CLI
THEN the `publication:` subtree validates with the same schema shape as project-level `specscore.yaml`
AND consumers treat the user config path as an implementation detail until the user-config contract defines it

---
*This document follows the https://specscore.md/scenario-specification*

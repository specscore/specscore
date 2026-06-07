---
format: https://specscore.md/scenario-specification
---

# Scenario: Unknown publication fields round-trip unchanged

**Validates:** [publication-policy-config#req:unknown-fields-preserved](../README.md#req-unknown-fields-preserved)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
project:
  title: Acme Service
publication:
  events:
    idea.approved:
      actions: [stage, commit]
      future_policy_field: value-A
  commands:
    implement:
      events:
        feature.approved:
          actions: [stage]
          future_command_event_field: value-B
  push:
    deny_branches: ["main"]
    future_push_field: value-C
  future_root_field:
    enabled: true
```
WHEN a SpecScore tool updates `project.title`
THEN `publication.events.idea.approved.future_policy_field` round-trips unchanged
AND `publication.commands.implement.events.feature.approved.future_command_event_field` round-trips unchanged
AND `publication.push.future_push_field` and `publication.future_root_field` round-trip unchanged

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Publication block is delegated to publication policy config

**Validates:** [repo-config#req:publication-block-optional](../README.md#req-publication-block-optional), [repo-config#req:publication-schema-delegated](../README.md#req-publication-schema-delegated)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
publication:
  events:
    idea.approved:
      actions: [stage, commit]
      future_event_field: value-A
  commands:
    implement:
      events:
        feature.approved:
          actions: [stage]
  push:
    allow_branches: ["feature/*"]
    deny_branches: ["main"]
```
WHEN SpecScore tooling reads and writes an unrelated config key
THEN `publication:` remains a top-level project config block
AND known publication fields are available to consumers under the Publication Policy Config schema
AND `publication.events.idea.approved.future_event_field` round-trips unchanged

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: Shorthand publication choices persist as canonical actions

**Validates:** [publication-policy-config#req:action-list](../README.md#req-action-list), [publication-policy-config#req:shorthand-normalization](../README.md#req-shorthand-normalization)

## Steps

GIVEN a user chooses the shorthand workflow `commit-and-push`
WHEN the CLI persists that preference to project or user config
THEN the durable config contains:
```yaml
actions: [stage, commit, push]
```
AND the durable config does not contain the scalar value `commit-and-push`

---
*This document follows the https://specscore.md/scenario-specification*

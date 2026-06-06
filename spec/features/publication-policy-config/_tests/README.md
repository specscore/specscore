---
format: https://specscore.md/scenarios-index-specification
---

# Publication Policy Config - Test Scenarios

Scenarios that verify the requirements defined in [Publication Policy Config](../README.md).

| Scenario | Validates |
|----------|-----------|
| [project-publication-block-valid](project-publication-block-valid.md) | [REQ: project-config-location](../README.md#req-project-config-location), [REQ: action-list](../README.md#req-action-list) |
| [user-config-shape-matches-project](user-config-shape-matches-project.md) | [REQ: user-config-location](../README.md#req-user-config-location) |
| [durable-config-uses-actions-list](durable-config-uses-actions-list.md) | [REQ: action-list](../README.md#req-action-list), [REQ: shorthand-normalization](../README.md#req-shorthand-normalization) |
| [invalid-sequence-rejected](invalid-sequence-rejected.md) | [REQ: action-list](../README.md#req-action-list) |
| [event-policy-supported](event-policy-supported.md) | [REQ: event-policy](../README.md#req-event-policy) |
| [command-policy-supported](command-policy-supported.md) | [REQ: command-policy](../README.md#req-command-policy) |
| [branch-deny-wins](branch-deny-wins.md) | [REQ: branch-policy](../README.md#req-branch-policy), [REQ: safety-constraints-monotonic](../README.md#req-safety-constraints-monotonic) |
| [unknown-publication-fields-preserved](unknown-publication-fields-preserved.md) | [REQ: unknown-fields-preserved](../README.md#req-unknown-fields-preserved) |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/scenarios-index-specification*

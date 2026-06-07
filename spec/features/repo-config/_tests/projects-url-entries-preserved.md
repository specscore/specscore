---
format: https://specscore.md/scenario-specification
---

# Scenario: `projects:` URL entries are preserved without dereferencing

**Validates:** [repo-config#req:projects-list](../README.md#req-projects-list)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
projects:
  - https://github.com/acme/platform
  - https://gitlab.com/widgets/library
```
WHEN SpecScore validates the project
THEN validation MUST succeed
AND the `projects` list MUST round-trip on read/write with both URL entries intact
AND SpecScore MUST NOT attempt to fetch or open the external URLs as part of validation

---
*This document follows the https://specscore.md/scenario-specification*

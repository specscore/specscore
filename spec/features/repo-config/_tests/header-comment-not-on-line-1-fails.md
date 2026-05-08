# Scenario: Schema-header comment must be on line 1

**Validates:** [repo-config#req:schema-header-comment](../README.md#req-schema-header-comment)

## Steps

GIVEN a `specscore.yaml` whose contents are:
```yaml

# SpecScore Repo Config Schema: https://specscore.md/repo-config
project:
  title: My Project
```
(the schema-header comment appears on line 2 after a blank line 1)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that the schema-header comment is missing on line 1
AND validation MUST NOT proceed

---
*This document follows the https://specscore.md/scenario-specification*

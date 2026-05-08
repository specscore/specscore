# Scenario: Missing schema-header comment is a hard error

**Validates:** [repo-config#req:schema-header-comment](../README.md#req-schema-header-comment)

## Steps

GIVEN a `specscore.yaml` whose first line is a blank line, a YAML document marker (`---`), or any content other than the exact schema-header comment
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that the schema-header comment is missing or malformed
AND validation MUST NOT proceed past schema identification

---

GIVEN a `specscore.yaml` whose first line is `# Some other comment`
WHEN SpecScore validates the project
THEN it MUST emit the same hard error

---
*This document follows the https://specscore.md/scenario-specification*

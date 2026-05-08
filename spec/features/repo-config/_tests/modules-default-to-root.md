# Scenario: Omitted `modules:` behaves as a single implicit-root module

**Validates:** [repo-config#req:modules-default](../README.md#req-modules-default)

## Steps

GIVEN a `specscore.yaml` containing only the schema-header comment
WHEN SpecScore enumerates modules
THEN it MUST behave as if a single module `{}` were declared
AND that module's effective `name` MUST be `default`
AND that module's effective `path` MUST be the repository root (`.`)
AND that module's `code` list MUST be empty
AND specs MUST resolve at `./specs/`
AND docs MUST resolve at `./docs/`

---
*This document follows the https://specscore.md/scenario-specification*

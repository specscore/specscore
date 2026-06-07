---
format: https://specscore.md/scenario-specification
---

# Scenario: sidekick seeds resolve under the overridden ideas path

**Validates:** [configurable-ideas-path#req:seeds-follow-ideas](../README.md#req-seeds-follow-ideas)

## Steps

GIVEN a module that sets `path_overrides.ideas_path: ideas`
WHEN a tool resolves the sidekick-seed directory for that module
THEN it MUST use `ideas/seeds` relative to the module root

---
*This document follows the https://specscore.md/scenario-specification*

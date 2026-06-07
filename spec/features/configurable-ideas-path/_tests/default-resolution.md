---
format: https://specscore.md/scenario-specification
---

# Scenario: ideas path defaults to `spec/ideas` when unset

**Validates:** [configurable-ideas-path#req:ideas-path-default](../README.md#req-ideas-path-default)

## Steps

GIVEN a `specscore.yaml` with no `path_overrides.ideas_path` on any module
WHEN a tool resolves the ideas directory for the implicit root module
THEN it MUST use `spec/ideas` relative to the module root, identical to current behavior

---
*This document follows the https://specscore.md/scenario-specification*

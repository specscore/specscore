---
format: https://specscore.md/scenario-specification
---

# Scenario: location validation uses the resolved path

**Validates:** [configurable-ideas-path#req:location-validation-resolved](../README.md#req-location-validation-resolved)

## Steps

GIVEN a repo whose root module sets `path_overrides.ideas_path: ideas`
WHEN lint validates an Idea file at `ideas/<slug>.md` and another at the now-stale `spec/ideas/<slug>.md`
THEN the file under `ideas/` MUST pass location validation
AND the file under `spec/ideas/` MUST be rejected as a wrong-location Idea

---
*This document follows the https://specscore.md/scenario-specification*

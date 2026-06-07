---
format: https://specscore.md/scenario-specification
---

# Scenario: every reader honors the override, none falls back to `spec/ideas`

**Validates:** [configurable-ideas-path#req:single-resolver](../README.md#req-single-resolver)

## Steps

GIVEN a repo whose root module sets `path_overrides.ideas_path: ideas`
WHEN `specscore idea new <slug>` creates an Idea, then lint runs, then the idea index is rendered
THEN the Idea MUST be created at `ideas/<slug>.md`
AND lint MUST report no location violation
AND the rendered index MUST link to `ideas/<slug>.md`
AND none of these readers fall back to `spec/ideas`

---
*This document follows the https://specscore.md/scenario-specification*

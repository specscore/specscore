# Scenario: `viewer: null` suppresses view links in artifact documents

**Validates:** [repo-config#req:viewer-null-opts-out](../README.md#req-viewer-null-opts-out)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
viewer: null
```
WHEN SpecScore resolves viewer settings
THEN the viewer MUST be reported as suppressed (no effective `name` or `url`)

---

GIVEN the same `specscore.yaml`
AND a feature README that would otherwise carry a "View in …" link
WHEN tooling renders or lints the artifact
THEN no view link MUST be emitted
AND tooling MUST NOT fall back to the SpecStudio defaults

---

GIVEN a `specscore.yaml` whose `viewer:` value is YAML `~` or an empty value (e.g., `viewer:` with nothing after the colon)
WHEN SpecScore resolves viewer settings
THEN the result MUST be identical to `viewer: null` — view links suppressed

---
*This document follows the https://specscore.md/scenario-specification*

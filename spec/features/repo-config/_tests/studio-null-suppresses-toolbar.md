# Scenario: `studio: null` suppresses the toolbar in artifact documents

**Validates:** [repo-config#req:studio-null-opts-out](../README.md#req-studio-null-opts-out)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
studio: null
```
WHEN SpecScore resolves studio settings
THEN the studio MUST be reported as suppressed (no effective `name` or `url`)

---

GIVEN the same `specscore.yaml`
AND a feature README that would otherwise carry the studio toolbar
WHEN tooling renders or lints the artifact
THEN no toolbar MUST be emitted at file position 3
AND tooling MUST NOT fall back to the SpecScore.Studio defaults

---

GIVEN a `specscore.yaml` whose `studio:` value is YAML `~` or an empty value (e.g., `studio:` with nothing after the colon)
WHEN SpecScore resolves studio settings
THEN the result MUST be identical to `studio: null` — the toolbar suppressed

---
*This document follows the https://specscore.md/scenario-specification*

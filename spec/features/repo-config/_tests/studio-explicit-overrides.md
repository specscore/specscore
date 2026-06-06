---
format: https://specscore.md/scenario-specification
---

# Scenario: Explicit `studio:` values are used as-is

**Validates:** [repo-config#req:studio-explicit-values](../README.md#req-studio-explicit-values)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
studio:
  name: AcmeDocs
  url: https://docs.acme.example/
```
WHEN SpecScore resolves studio settings
THEN the effective `studio.name` MUST be `AcmeDocs`
AND the effective `studio.url` MUST be `https://docs.acme.example/`

---

GIVEN the same `specscore.yaml`
AND a feature README that supports the studio toolbar
WHEN tooling renders the toolbar
THEN the toolbar URLs MUST be emitted under `https://docs.acme.example/app/p/` and the brand attribution MUST reference the studio as `AcmeDocs`
AND the SpecScore.Studio defaults MUST NOT be substituted in

---

GIVEN the same `specscore.yaml`
WHEN SpecScore reads the file and writes it back unchanged
THEN the `studio:` block MUST round-trip with both fields intact

---
*This document follows the https://specscore.md/scenario-specification*

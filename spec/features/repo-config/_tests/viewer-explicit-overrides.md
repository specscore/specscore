# Scenario: Explicit `viewer:` values are used as-is

**Validates:** [repo-config#req:viewer-explicit-values](../README.md#req-viewer-explicit-values)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
viewer:
  name: AcmeDocs
  url: https://docs.acme.example/
```
WHEN SpecScore resolves viewer settings
THEN the effective `viewer.name` MUST be `AcmeDocs`
AND the effective `viewer.url` MUST be `https://docs.acme.example/`

---

GIVEN the same `specscore.yaml`
AND a feature README that supports a "View in …" link
WHEN tooling renders the link
THEN the link MUST be emitted under `https://docs.acme.example/` and reference the viewer as `AcmeDocs`
AND the SpecStudio defaults MUST NOT be substituted in

---

GIVEN the same `specscore.yaml`
WHEN SpecScore reads the file and writes it back unchanged
THEN the `viewer:` block MUST round-trip with both fields intact

---
*This document follows the https://specscore.md/scenario-specification*

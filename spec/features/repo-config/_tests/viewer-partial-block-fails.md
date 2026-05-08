# Scenario: Partially-specified `viewer:` block is a hard error

**Validates:** [repo-config#req:viewer-explicit-values](../README.md#req-viewer-explicit-values)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
viewer:
  name: AcmeDocs
```
(`name` present, `url` missing)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that `viewer.url` is required when `viewer:` is present as a mapping
AND defaults MUST NOT be substituted for the missing field

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
viewer:
  url: https://docs.acme.example/
```
(`url` present, `name` missing)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that `viewer.name` is required when `viewer:` is present as a mapping

---
*This document follows the https://specscore.md/scenario-specification*

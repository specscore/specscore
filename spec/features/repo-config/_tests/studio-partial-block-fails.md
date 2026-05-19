# Scenario: Partially-specified `studio:` block is a hard error

**Validates:** [repo-config#req:studio-explicit-values](../README.md#req-studio-explicit-values)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
studio:
  name: AcmeDocs
```
(`name` present, `url` missing)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that `studio.url` is required when `studio:` is present as a mapping
AND defaults MUST NOT be substituted for the missing field

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
studio:
  url: https://docs.acme.example/
```
(`url` present, `name` missing)
WHEN SpecScore validates the project
THEN it MUST emit a hard error indicating that `studio.name` is required when `studio:` is present as a mapping

---
*This document follows the https://specscore.md/scenario-specification*

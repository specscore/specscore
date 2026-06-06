---
format: https://specscore.md/scenario-specification
---

# Scenario: Omitted `studio:` block applies SpecScore.Studio defaults

**Validates:** [repo-config#req:studio-default-when-omitted](../README.md#req-studio-default-when-omitted), [repo-config#req:studio-toolbar-mandatory-unless-opted-out](../README.md#req-studio-toolbar-mandatory-unless-opted-out)

## Steps

GIVEN a `specscore.yaml` that does not contain a `studio:` key at all
WHEN SpecScore resolves studio settings
THEN the effective `studio.name` MUST be `SpecScore.Studio`
AND the effective `studio.url` MUST be `https://specscore.studio/`

---

GIVEN the same `specscore.yaml`
AND a feature README at `spec/features/<slug>/README.md`
WHEN tooling renders the artifact's studio toolbar
THEN the toolbar MUST be emitted at file position 3 using the default `studio.name` and `studio.url`
AND the brand attribution prefix MUST render as `[SpecScore.**Studio**](https://specscore.studio):` with `Studio` bolded as the segment after the last `.`

---
*This document follows the https://specscore.md/scenario-specification*

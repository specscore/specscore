# Scenario: Omitted `viewer:` block applies SpecStudio defaults

**Validates:** [repo-config#req:viewer-default-when-omitted](../README.md#req-viewer-default-when-omitted), [repo-config#req:viewer-link-mandatory-unless-opted-out](../README.md#req-viewer-link-mandatory-unless-opted-out)

## Steps

GIVEN a `specscore.yaml` that does not contain a `viewer:` key at all
WHEN SpecScore resolves viewer settings
THEN the effective `viewer.name` MUST be `SpecStudio`
AND the effective `viewer.url` MUST be `https://specstudio.synchestra.io/`

---

GIVEN the same `specscore.yaml`
AND a feature README at `spec/features/<slug>/README.md`
WHEN tooling renders the artifact's "View in …" link
THEN the link MUST be emitted using the default `viewer.name` and `viewer.url`
AND the link text MUST reference `SpecStudio` as the viewer name

---
*This document follows the https://specscore.md/scenario-specification*

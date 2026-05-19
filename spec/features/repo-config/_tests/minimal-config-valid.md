# Scenario: Minimal config (header only) is valid

**Validates:** [repo-config#req:file-name](../README.md#req-file-name), [repo-config#req:empty-config-valid](../README.md#req-empty-config-valid)

## Steps

GIVEN a repository root contains a file named `specscore.yaml`
AND its full contents are exactly:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
```
WHEN SpecScore validates the project
THEN validation MUST succeed
AND every default defined by `repo-config` MUST apply (project title from working directory, `specs_dir_name: specs`, `docs_dir_name: docs`, single implicit-root module, default studio)

---

GIVEN the same repository but the config file is named `specscore-spec-repo.yaml`, `specscore-project.yaml`, or `.specscore.yaml`
WHEN SpecScore searches for the repo config
THEN it MUST NOT recognize the file
AND validation MUST report that no `specscore.yaml` is present at the repository root

---
*This document follows the https://specscore.md/scenario-specification*

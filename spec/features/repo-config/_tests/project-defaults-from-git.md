---
format: https://specscore.md/scenario-specification
---

# Scenario: Omitted `project:` block infers from git remote and working directory

**Validates:** [repo-config#req:project-block-optional](../README.md#req-project-block-optional), [repo-config#req:project-title-default](../README.md#req-project-title-default)

## Steps

GIVEN a `specscore.yaml` containing only the schema-header comment
AND the working-directory basename is `my-service`
AND the git remote `origin` URL is `git@github.com:acme/my-service.git`
WHEN SpecScore resolves project identity
THEN the effective `project.title` MUST be `my-service`
AND the effective `project.host` MUST be `github.com`
AND the effective `project.org` MUST be `acme`
AND the effective `project.repo` MUST be `my-service`

---
*This document follows the https://specscore.md/scenario-specification*

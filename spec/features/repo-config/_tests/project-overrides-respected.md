# Scenario: Explicit `project.host`/`org`/`repo` override git remote inference

**Validates:** [repo-config#req:source-reference-overrides](../README.md#req-source-reference-overrides)

## Steps

GIVEN the git remote `origin` URL is `git@github.com:dev-fork/my-service.git`
AND `specscore.yaml` contains:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
project:
  host: github.com
  org: acme
  repo: my-service
```
AND a source file contains `// specscore:feature/cli/task/claim`
WHEN the resolver expands the reference
THEN the expanded URL MUST use the config values, not the git remote
AND the expanded URL MUST be `https://specscore.org/github.com/acme/my-service/spec/features/cli/task/claim`

---
*This document follows the https://specscore.md/scenario-specification*

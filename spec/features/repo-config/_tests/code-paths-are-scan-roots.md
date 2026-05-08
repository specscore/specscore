# Scenario: Module `code:` paths are the lint scan roots for source references

**Validates:** [repo-config#req:module-code-list](../README.md#req-module-code-list)

## Steps

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: Backend
    path: backend
    code:
      - pkg/
```
AND `./backend/pkg/auth.go` contains a `// specscore:feature/auth` annotation
AND `./backend/internal/private.go` (outside `code:` paths) also contains a `// specscore:feature/auth` annotation
WHEN `specscore spec lint` scans the project for source references
THEN the annotation in `./backend/pkg/auth.go` MUST be detected and validated
AND the annotation in `./backend/internal/private.go` MUST NOT be scanned (outside the module's declared `code:` roots)

---

GIVEN a `specscore.yaml` containing:
```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
modules:
  - name: SpecOnly
```
(a module with no `code:` list)
WHEN `specscore spec lint` scans the project
THEN no code attribution MUST be assigned to the `SpecOnly` module
AND validation MUST succeed

---
*This document follows the https://specscore.md/scenario-specification*

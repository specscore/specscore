---
format: https://specscore.md/scenario-specification
---

# Scenario: A child entity that redefines a parent property is rejected

**Validates:** [entity#ac:inheritance-additive-only](../README.md#ac-inheritance-additive-only), [entity#req:inherits-additive-only](../README.md#req-inherits-additive-only)

## Steps

GIVEN a parent entity `user.entity.md` whose `properties` list includes `- name: email, ref: ../shared/email.property.md`
AND a child entity `admin-user.entity.md` whose frontmatter declares `inherits: ./user.entity.md`
AND the child's own `properties` list also includes a `- name: email, ...` item (inline redefinition)
WHEN the spec linter validates the child entity file
THEN the linter reports an error: child entity `admin-user` redefines property `email` already declared by parent `user`; inheritance is additive-only — append new properties only
AND the validation fails

GIVEN the same parent
AND a child entity `service-user.entity.md` whose frontmatter declares `inherits: ./user.entity.md`
AND the child's `properties` list contains ONLY new property names not present in the parent (e.g., `service_key`, `service_scope`)
WHEN the spec linter validates the child entity file
THEN the linter exits clean — pure-additive inheritance is permitted

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: Two property items with the same `name` in one entity are rejected

**Validates:** [entity#ac:frontmatter-shape](../README.md#ac-frontmatter-shape), [entity#req:properties-list-shape](../README.md#req-properties-list-shape)

## Steps

GIVEN an entity file `user.entity.md` whose frontmatter `properties` list contains two items both named `email` — one inline and one via `ref:`
WHEN the spec linter validates the entity file
THEN the linter reports an error: entity `user` declares duplicate property name `email`; every property in a single entity MUST have a unique `name`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

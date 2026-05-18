# Scenario: An entity's `ref:` to a non-existent property file is rejected

**Validates:** [property#ac:entity-references-resolve](../README.md#ac-entity-references-resolve), [property#req:ref-target-exists](../README.md#req-ref-target-exists)

## Steps

GIVEN an entity file at `spec/features/customer/customer.entity.md` whose `properties` list contains an item `- name: email, ref: ../shared/email.property.md`
AND the file `spec/features/shared/email.property.md` does NOT exist in the repository
WHEN the spec linter validates the tree
THEN the linter reports an error: property reference `../shared/email.property.md` in `customer.entity.md` (property `email`) does not resolve to an existing `*.property.md` file
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: A cycle in the `inherits` graph is rejected

**Validates:** [entity#ac:inheritance-additive-only](../README.md#ac-inheritance-additive-only), [entity#req:inherits-acyclic](../README.md#req-inherits-acyclic)

## Steps

GIVEN two entity files where `a.entity.md` declares `inherits: ./b.entity.md` and `b.entity.md` declares `inherits: ./a.entity.md`
WHEN the spec linter validates the tree
THEN the linter reports an error: cycle detected in `inherits` chain — `a` → `b` → `a`
AND the linter terminates safely rather than recursing infinitely
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: The managed `## Properties` table is rendered from frontmatter on every `--fix` run

**Validates:** [entity#ac:managed-sections-rendered](../README.md#ac-managed-sections-rendered), [entity#req:properties-table-managed](../README.md#req-properties-table-managed)

## Steps

GIVEN an entity file `user.entity.md` whose frontmatter `properties` list is `[id, email (ref), display_name, created_at]` in that order
AND the body's `## Properties` section is wrapped in `<!-- managed-by: specscore lint --fix -->` / `<!-- end-managed -->` markers but contains an outdated table (only `id` and `email` rows, in alphabetical order)
WHEN `specscore spec lint` runs (without `--fix`)
THEN the linter reports an error: managed `## Properties` table in `user.entity.md` is out of sync with the frontmatter `properties` list
AND the validation fails

GIVEN the same drift
WHEN `specscore spec lint --fix` runs
THEN the linter rewrites the managed body in place
AND the rendered table contains exactly four rows in frontmatter order — `id`, `email`, `display_name`, `created_at`
AND the `email` row's `Type` cell cites the referenced property file: `string *(via [email](../shared/email.property.md))*`
AND the linter exits clean

GIVEN an entity file with `inherits: ./user.entity.md` and three new properties
WHEN `specscore spec lint --fix` runs
THEN the rendered `## Properties` table lists the parent's four properties first (in the parent's order) followed by the child's three new properties (in the child's order)

---
*This document follows the https://specscore.md/scenario-specification*

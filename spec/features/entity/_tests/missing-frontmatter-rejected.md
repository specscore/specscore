# Scenario: Entity file without a YAML frontmatter block is rejected

**Validates:** [entity#ac:frontmatter-shape](../README.md#ac-frontmatter-shape), [entity#req:frontmatter-required](../README.md#req-frontmatter-required)

## Steps

GIVEN an entity file at `spec/features/user/user.entity.md`
AND the file begins with `# Entity: User` instead of a `---`-delimited YAML block
WHEN the spec linter validates the entity file
THEN the linter reports an error: entity file `user.entity.md` is missing its required YAML frontmatter block
AND the validation fails

GIVEN an entity file whose frontmatter omits the required `singular` key
WHEN the spec linter validates the entity file
THEN the linter reports an error: entity frontmatter is missing required field `singular`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

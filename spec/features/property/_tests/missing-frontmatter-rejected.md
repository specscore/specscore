# Scenario: Property file without a YAML frontmatter block is rejected

**Validates:** [property#ac:frontmatter-shape](../README.md#ac-frontmatter-shape), [property#req:frontmatter-required](../README.md#req-frontmatter-required)

## Steps

GIVEN a property file at `spec/features/shared/email.property.md`
AND the file begins with `# Property: email` instead of a `---`-delimited YAML block
WHEN the spec linter validates the property file
THEN the linter reports an error: property file `email.property.md` is missing its required YAML frontmatter block
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

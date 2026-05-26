# Scenario: Decision without `Decision:` title prefix is rejected

**Validates:** [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:title-format](../README.md#req-title-format)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md`
AND the title is `# Test Decision` (missing the `Decision:` prefix)
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision title must use the format `# Decision: <Title>`
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

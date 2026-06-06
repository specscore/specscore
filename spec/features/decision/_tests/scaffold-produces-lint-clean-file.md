---
format: https://specscore.md/scenario-specification
---

# Scenario: `specscore decision new` produces a lint-clean file

**Validates:** [decision#ac:scaffold-behavior](../README.md#ac-scaffold-behavior), [decision#req:scaffold-command](../README.md#req-scaffold-command)

## Steps

GIVEN a spec tree with one existing Decision `0001-first.md`
WHEN the user runs `specscore decision new test-scaffold`
THEN a file is created at `spec/decisions/0002-test-scaffold.md`
AND the file has `# Decision: ` title prefix
AND the file has all required header fields with placeholder values
AND the file has all required sections in order
AND the `## Observed Consequences` section contains `None observed yet.`
AND the file has the adherence footer with `https://specscore.md/decision-specification`
AND `specscore spec lint` reports `0 violations found`

---
*This document follows the https://specscore.md/scenario-specification*

---
format: https://specscore.md/scenario-specification
---

# Scenario: Decision referencing non-existent Source Idea is rejected

**Validates:** [decision#ac:decision-header](../README.md#ac-decision-header), [decision#req:source-idea-optional](../README.md#req-source-idea-optional)

## Steps

GIVEN a Decision file at `spec/decisions/0099-test-decision.md`
AND the `**Source Idea:**` field is set to `nonexistent-idea`
AND no file exists at `spec/ideas/nonexistent-idea.md` or `spec/ideas/archived/nonexistent-idea.md`
WHEN the spec linter validates the tree
THEN the linter reports an error: Decision `0099-test-decision` Source Idea `nonexistent-idea` does not resolve to an existing Idea
AND the validation fails

---
*This document follows the https://specscore.md/scenario-specification*

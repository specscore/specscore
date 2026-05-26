# Scenario: Hand-authored and scaffolded Decisions produce identical lint results

**Validates:** [decision#ac:scaffold-behavior](../README.md#ac-scaffold-behavior), [decision#req:authoring-agnostic](../README.md#req-authoring-agnostic)

## Steps

GIVEN a hand-authored Decision file at `spec/decisions/0002-hand-authored.md` with all required sections and valid content
AND a scaffolded Decision file at `spec/decisions/0003-scaffolded.md` produced by `specscore decision new scaffolded` with identical content filled into every section
WHEN the spec linter validates both files
THEN both files produce identical lint results (both pass or both fail with the same violations)
AND no lint rule distinguishes between hand-authored and scaffolded provenance

---
*This document follows the https://specscore.md/scenario-specification*

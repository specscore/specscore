# Scenario: Template sources do not pollute the spec lint tree

**Validates:** [new-artefact-template-gallery#ac:templates-outside-spec-tree](../README.md#ac-templates-outside-spec-tree-verifies-reqtemplate-source-location), [new-artefact-template-gallery#req:template-source-location](../README.md#req-template-source-location)

## Steps

GIVEN the template sources exist under `new/` at the repository root
AND `new/idea.md` is titled `# Idea: <Idea Name>` with placeholder prompts
WHEN `specscore spec lint` runs over the repository
THEN the lint passes with zero violations
AND no file under `new/` is reported as an artefact violation

---
*This document follows the https://specscore.md/scenario-specification*

# Scenario: A filled-in idea template passes lint

**Validates:** [new-artefact-template-gallery#ac:filled-template-lints-clean](../README.md#ac-filled-template-lints-clean-verifies-reqtemplate-yields-valid-artefact), [new-artefact-template-gallery#req:template-yields-valid-artefact](../README.md#req-template-yields-valid-artefact)

## Steps

GIVEN the `new/idea.md` template
AND its `<!-- … -->` prompts are replaced with valid content
AND the result is saved at `spec/ideas/<slug>.md` and added to the ideas index
WHEN `specscore spec lint` runs
THEN the lint passes with zero violations

---
*This document follows the https://specscore.md/scenario-specification*

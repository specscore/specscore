---
format: https://specscore.md/scenario-specification
---

# Scenario: The /new/ index lists and links every supported template

**Validates:** [new-artefact-template-gallery#ac:index-lists-types](../README.md#ac-index-lists-types-verifies-reqindex-page), [new-artefact-template-gallery#req:index-page](../README.md#req-index-page)

## Steps

GIVEN the site has been built from the `new/` sources
WHEN a client requests `/new/`
THEN the page renders one entry per supported artefact type
AND each entry links to its `/new/<type>.md` template

---
*This document follows the https://specscore.md/scenario-specification*

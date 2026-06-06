---
format: https://specscore.md/scenario-specification
---

# Scenario: The idea template is published verbatim at /new/idea.md

**Validates:** [new-artefact-template-gallery#ac:idea-template-published](../README.md#ac-idea-template-published-verifies-reqraw-template-url), [new-artefact-template-gallery#req:raw-template-url](../README.md#req-raw-template-url)

## Steps

GIVEN the repository contains the source file `new/idea.md`
AND the site has been built from the `new/` sources
WHEN a client requests `/new/idea.md`
THEN the response is served as Markdown
AND the response body is byte-identical to the `new/idea.md` source file

---
*This document follows the https://specscore.md/scenario-specification*

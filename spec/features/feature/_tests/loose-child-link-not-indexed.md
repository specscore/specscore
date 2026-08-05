---
format: https://specscore.md/scenario-specification
---

# Scenario: Loose child link does not satisfy the Contents index

**Validates:** [feature#req:contents-when-children](../README.md#req-contents-when-children)

## Steps

GIVEN a feature directory `spec/features/ui/` with a child Feature at `spec/features/ui/hub/`
AND `ui/README.md` contains a `## Contents` table that does not list `hub`
AND a link to `hub/README.md` appears later in the README outside that table
WHEN the spec linter validates the Feature
THEN the linter reports that `hub` is missing from the canonical Contents table
AND the loose link does not satisfy the child-index requirement

---
*This document follows the https://specscore.md/scenario-specification*

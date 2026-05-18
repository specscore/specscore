# Scenario: Hand-edit inside the managed `## Referenced by` section is rejected

**Validates:** [property#ac:referenced-by-maintenance](../README.md#ac-referenced-by-maintenance), [property#req:referenced-by-managed](../README.md#req-referenced-by-managed)

## Steps

GIVEN a property file whose `## Referenced by` section is wrapped in `<!-- managed-by: specscore lint --fix -->` / `<!-- end-managed -->` markers
AND a contributor manually adds the line `- Hand-added: cross-team-survey doc` inside the managed markers, with no corresponding entity or feature reference in the repo
WHEN `specscore spec lint` runs (without `--fix`)
THEN the linter reports an error: managed `## Referenced by` body in `email.property.md` contains an entry that does not match any discovered consumer; managed sections MUST NOT be hand-edited
AND the validation fails

GIVEN the same drift
WHEN `specscore spec lint --fix` runs
THEN the linter rewrites the managed body from a fresh scan, removing the hand-added line, and exits clean

---
*This document follows the https://specscore.md/scenario-specification*

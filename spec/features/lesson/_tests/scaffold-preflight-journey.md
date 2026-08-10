---
format: https://specscore.md/scenario-specification
---

# Scenario: Lesson scaffolding preflights configuration without mutation

**Validates:** [lesson#ac:lesson-scaffold-preflight-journey](../README.md#ac-lesson-scaffold-preflight-journey)

## Steps

GIVEN a repository without `specscore.yaml`
WHEN `specscore lesson new review-before-merge` runs
THEN it reports that repository configuration is required
AND it creates or rewrites no files

GIVEN a repository with `specscore.yaml` but no non-empty `lessons.classifications`
WHEN `specscore lesson new review-before-merge` runs
THEN it reports that the Lesson classification vocabulary is required
AND it creates or rewrites no files

GIVEN a repository with `lessons.classifications: [process]`
WHEN `specscore lesson new review-before-merge` runs
THEN it creates `spec/lessons/review-before-merge/README.md` and an empty `occurrences/` directory only

---
*This document follows the https://specscore.md/scenario-specification*

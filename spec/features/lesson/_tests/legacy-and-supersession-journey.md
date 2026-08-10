---
format: https://specscore.md/scenario-specification
---

# Scenario: Legacy lesson migration and supersession preserve history

**Validates:** [lesson#ac:legacy-migration-journey](../README.md#ac-legacy-migration-journey), [lesson#ac:duplicate-supersession-journey](../README.md#ac-duplicate-supersession-journey)

## Steps

GIVEN a legacy file `spec/lessons/review-before-merge.md` with one safely representable historical observation
WHEN the repository migrates it
THEN it creates `spec/lessons/review-before-merge/README.md`
AND it records the old path and revision in `Legacy Provenance`
AND it preserves the legacy bytes through an immutable commit reference or `legacy/<sha256>.md`
AND it creates at most one occurrence for the historical observation without inventing a recurrence count
AND it removes the legacy file so both paths do not coexist

GIVEN a later Lesson replaces `review-before-merge`
WHEN it declares `Supersedes: review-before-merge`
THEN the prior Lesson becomes `Superseded` with `Superseded By` pointing at the successor
AND both occurrence histories remain readable

WHEN a relation cycle is introduced or a duplicate Lesson claims `Enforced`
THEN lint rejects the tree

---
*This document follows the https://specscore.md/scenario-specification*

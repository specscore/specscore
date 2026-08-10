---
format: https://specscore.md/scenario-specification
---

# Scenario: Append-only recurrence becomes deterministic enforcement

**Validates:** [lesson#ac:canonical-lesson-and-index-journey](../README.md#ac-canonical-lesson-and-index-journey), [lesson#ac:append-only-recurrence-journey](../README.md#ac-append-only-recurrence-journey), [lesson#ac:enforcement-journey](../README.md#ac-enforcement-journey)

## Steps

GIVEN `specscore.yaml` declares `lessons.classifications: [process, validation]`
AND a canonical Lesson at `spec/lessons/review-before-merge/README.md` has status `Recorded` and classification `process`
WHEN an author adds `occurrences/018f5f4c-65ef-4c3f-a70c-571ed48e8cb0.json` with a valid bounded summary and generic Git, worktree, execution, and evidence context
THEN `specscore spec lint` accepts the tree
AND the Lesson README is unchanged
AND the Lessons Index reports recurrence metadata derived from the occurrence files

WHEN a second valid occurrence is added
THEN the first occurrence and README remain byte-identical
AND the derived count is two with first and last values computed from lexical occurrence paths

WHEN the Lesson changes to `Enforced` while `Verification` is `checked manually`
THEN lint rejects it

WHEN it declares a stable control, deterministic scenario or command, and immutable evidence reference
THEN lint accepts the Enforced Lesson

---
*This document follows the https://specscore.md/scenario-specification*

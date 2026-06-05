# Scenario: Header field validation

**Validates:** [plan#req:required-header-fields](../README.md#req-required-header-fields), [plan#req:source-binding](../README.md#req-source-binding)

## Steps

GIVEN a plan document with Status, a source line (`Source Feature: cli`), Date, Owner, and Supersedes fields all present
WHEN the document is validated
THEN validation passes for the header fields

GIVEN a plan document missing the `**Owner:**` field
WHEN the document is validated
THEN validation rejects the document with an error listing `Owner` as a missing required field

GIVEN a plan document missing the `**Supersedes:**` field
WHEN the document is validated
THEN validation rejects the document with an error listing `Supersedes` as a missing required field

GIVEN an idea-sourced plan whose header declares `**Source:** idea:add-batch-mode` and all other required fields
WHEN the document is validated
THEN validation passes (the source line satisfies the source-binding requirement without a `Source Feature` line)

---
*This document follows the https://specscore.md/scenario-specification*

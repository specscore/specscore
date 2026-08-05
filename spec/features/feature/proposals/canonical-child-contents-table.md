# Proposal: Require child links in the Contents table

**Status:** Implemented
**Type:** change-request
**Targets:** feature
**Date:** 2026-08-05
**Owner:** codex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we make child Feature indexing structurally unambiguous so scaffolders and linters cannot accept a detached link?

## Context

The Feature specification already requires an index table under ## Contents. A real scaffold placed a child row after H3 summaries, while lint accepted it because it scanned links anywhere in the README.

## Recommended Direction

Clarify that only the first contiguous Markdown table under ## Contents satisfies child completeness; loose links elsewhere do not.

## Alternatives Considered

- Continue accepting any child link anywhere in the parent README — rejected because malformed scaffolds and narrative references become indistinguishable from the canonical index.
- Add a separate child-index file — rejected because `## Contents` is already the specified source of child navigation.

## MVP Scope

Clarify the existing child-index contract so only the first contiguous Markdown table under `## Contents` satisfies completeness, then cover one detached-row negative scenario.

## Not Doing (and Why)

- Changing the Feature directory model — this only clarifies the existing Contents-table requirement

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Existing conforming Feature READMEs already place child rows in the Contents table | Run the tightened CLI lint across the SpecScore repositories and inspect any new violations |
| Should-be-true | A detached child link is always authoring drift rather than deliberate structure | Search current Feature parents for child links outside their Contents tables |
| Might-be-true | Explicit table-only wording makes third-party validators more consistent | Compare independent parser behavior after publication |


## SpecScore Integration

- **New Features this would create:** none
- **Existing Features affected:** feature
- **Dependencies:** none

## Open Questions

None at this time.

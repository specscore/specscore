---
format: https://specscore.md/idea-specification
status: Draft
---

# Idea: Spec-code traceability via a code-intelligence index (codegraph)

**Status:** Draft
**Date:** 2026-06-10
**Owner:** trakhimenok
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we link SpecScore REQs and ACs to the code symbols that implement them and the tests that verify them - automatically, and kept honest over time?

## Context

Surfaced while speccing cover100 (specscore/cover100), which already requires the codegraph CLI (github.com/colbymchenry/codegraph - MIT, tree-sitter-based, ~46k stars) as its agents' symbol index. The same index could power SpecScore-side traceability: today a Feature says WHAT and code says HOW, but nothing machine-checks the join. Tests-are-executable-specs is the family thesis; this is its tooling.

## Recommended Direction

A trace layer in the specscore CLI built on a codegraph index: (1) link capture - REQ/AC slugs referenced in code comments and test names (e.g. '// implements: feature-x#req:y', TestFooBar_feature_x_req_y) resolved against the symbol graph; (2) trace queries - 'specscore trace req:<slug>' lists implementing symbols + verifying tests with locations; 'specscore trace --orphans' lists REQs with no linked code/tests and code areas with no spec; (3) drift detection - when symbols linked to a REQ change after the spec revision that last touched it, lint flags the REQ for review (spec drift made visible, the inverse of doc drift); (4) AGENT-FIRST ORIENTATION (the headline use case): 'specscore feature <slug> --where' answers in ONE machine-readable call what currently takes an agent a grep-and-read exploration loop - spec summary + REQ list, bindings as CURRENT file:line entry points (resolved from the live code index at query time, never stale spec prose), and per-binding drift flags marking which entry points changed since the spec's last revision. One tool call orients an agent with a slim context: the brief, the map, and the trust signal. This is the spec-level analogue of codegraph's own fewer-tool-calls value proposition, and the natural context loader for specstudio:implement and cover100 engineers; (5) cover100 synergy - its documented-gap entries and generated tests can cite REQ slugs, closing the loop from spec to verified coverage.

## Alternatives Considered

<!-- 2–3 directions that lost, and why each lost. -->

## MVP Scope

A spike: pick one SpecScore-managed Go repo (e.g. specscore-cli itself), define the comment/test-name link convention, build 'specscore trace req:<slug>' reading a codegraph index, and produce one honest orphans report. No drift detection yet - prove the join is real and useful first.

## Not Doing (and Why)

- Inventing our own indexer - consume codegraph (or its index format) as-is
- IDE integrations - CLI + lint output only at this stage
- Enforcing links as a lint failure - orphans start as a report, not a gate; gates only after adoption proves the convention
- Cross-repo tracing - single repo first

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | placeholder dealbreaker assumption | describe how to validate |
| Should-be-true | … | … |
| Might-be-true | … | … |


## SpecScore Integration

- **New Features this would create:** TBD at design time
- **Existing Features affected:** none
- **Dependencies:** none

## Open Questions

None at this time.

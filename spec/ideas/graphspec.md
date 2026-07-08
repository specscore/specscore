---
format: https://specscore.md/idea-specification
status: Specifying
---

# Idea: GraphSpec

**Status:** Specifying
**Date:** 2026-07-08
**Owner:** codex
**Promotes To:** graphspec, graphspec/command, graphspec/continuations, graphspec/entity, graphspec/event, graphspec/glossary, graphspec/module, graphspec/relationship, graphspec/reviews
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we define a canonical domain modelling language for SpecScore that remains Markdown-first, AI-friendly, and independent from downstream feature, API, UI, and test specs?

## Context

SpecScore needs a reusable domain vocabulary layer. GraphSpec is intended to describe connected domain models, including identity, ownership, lifecycle, relationships, commands, events, constraints, examples, and rationale. The bootstrap should preserve architectural thinking rather than finalize the language too early.

## Recommended Direction

Create a provisional GraphSpec feature under spec/features/graphspec/ with one child feature per initial specification kind. Keep the language Markdown-first with YAML structure, document current decisions and alternatives, use SpecScore's unified cross-repo linking system for distributed graph roots, and use a small Sneat graph example as a modelling stress test.

## Alternatives Considered

- Extend FeatureSpec with domain modelling fields. This keeps one artifact type, but it makes FeatureSpec responsible for vocabulary it should reference rather than own.
- Reuse the existing Entity and Property features only. This is useful prior art, but GraphSpec needs relationships, modules, commands, events, lifecycle, ownership, and cross-module semantics.
- Design a complete DSL immediately. This may become useful later, but it would hide unresolved architecture under syntax too early.

## MVP Scope

Bootstrap GraphSpec with README files for ModuleSpec, EntitySpec, ValueObjectSpec, RelationshipSpec, CommandSpec, EventSpec, and EnumSpec. Add glossary, principles, current decisions, alternatives, open questions, TODOs, and BOOTSTRAP.md. Do not make GraphSpec self-hosting yet.

## Not Doing (and Why)

- Finalize the GraphSpec language — this bootstrap is for review, not standardization.
- Build code generation — generation should wait until the core vocabulary stabilizes.
- Make GraphSpec self-hosting — self-hosting should wait for explicit maturity milestones.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Markdown plus YAML can express the first useful version of GraphSpec clearly enough for humans and tools. | Bootstrap the language docs and at least one consumer example, then review readability and parseability. |
| Should-be-true | First-class relationships improve reviewability more than they increase authoring complexity. | Model Sneat membership and booking-resource relationships both ways during architecture review. |
| Might-be-true | GraphSpec can later generate TypeSpec, OpenAPI, diagrams, and migrations from the same vocabulary. | Defer generation experiments until the core vocabulary and reference model stabilize. |
| Must-be-true | GraphSpec can reuse SpecScore's unified cross-repo linking and versioning model. | Define distributed graph examples across module repos before adding any GraphSpec-specific link syntax. |


## SpecScore Integration

- **New Features this would create:** graphspec, graphspec/entity, graphspec/relationship, graphspec/command, graphspec/event, graphspec/module, graphspec/value-object, graphspec/enum, graphspec/glossary
- **Existing Features affected:** none
- **Dependencies:** none

## Open Questions

- Should GraphSpec remain under FeatureSpec until self-hosting is viable?
- Should PropertySpec be part of GraphSpec v0.1?
- Which GraphSpec concepts should become first-class specification kinds versus embedded metadata?
- How should multiple `graph/` roots be discovered and indexed across repositories?

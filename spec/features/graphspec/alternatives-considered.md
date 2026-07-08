# Alternatives Considered

## GraphSpec Replaces SpecScore

Current preference: no.

GraphSpec should remain a domain modelling specification within the SpecScore family.

## EntityGraphSpec

Current preference: `GraphSpec`.

The language is expected to model more than entities.

## ExtensionSpec

Current preference: `ModuleSpec`.

`ExtensionSpec` is too Sneat-specific. `ModuleSpec` keeps the language reusable.

## GraphSpec References FeatureSpec

Current preference: no.

FeatureSpec should reference GraphSpec. GraphSpec should own domain vocabulary independently.

## Single Markdown File Per Specification Kind

Current preference: directory per kind.

Directories leave room for future schemas, examples, rationale, validation, and migration notes.

## `knowledge-graph/`

Current preference: `graph/`.

`graph/` is shorter and better suited to canonical domain graph artifacts.

## First-Class RelationshipSpec

Current preference: unresolved.

Keeping RelationshipSpec first-class helps reuse, cross-module review, and graph analysis. Embedding relationships in EntitySpec may be simpler for authors.

## First-Class PropertySpec

Current preference: unresolved.

SpecScore already has Property artifacts. GraphSpec may either reuse that idea, replace it with intrinsic properties inside EntitySpec and ValueObjectSpec, or support both.


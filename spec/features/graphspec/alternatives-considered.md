# Alternatives Considered

## GraphSpec Replaces SpecScore

Decided: no.

GraphSpec remains a domain modelling specification within the SpecScore ecosystem.

## EntityGraphSpec

Decided: `GraphSpec`.

The language is expected to model more than entities.

## ExtensionSpec

Decided: `ModuleSpec`.

`ExtensionSpec` is tied to one consumer's extension naming. `ModuleSpec` keeps the language reusable.

## GraphSpec References FeatureSpec

Decided: no.

FeatureSpec should reference GraphSpec. GraphSpec should own domain vocabulary independently.

## GraphSpec Ignores ModelSpec (Mutual Independence)

Decided: no — GraphSpec depends on ModelSpec
([decision 0003](../../decisions/0003-one-structural-language.md)).

Mutual ignorance forced GraphSpec to redefine structure: the bootstrap's entity and
value-object examples had already grown `fields:` and `properties:` blocks. One
structural language, referenced one-directionally, removes the drift channel while
preserving ModelSpec's independence (the dependency arrow never points out of
ModelSpec).

## Graph-Level ValueObjectSpec And EnumSpec Wrappers Referencing ModelSpec

Decided: no — the kinds are removed entirely
([decision 0004](../../decisions/0004-graphspec-kind-admission.md)).

This was the strongest alternative to removal: keep ValueObjectSpec and EnumSpec as
thin graph artifacts whose instances reference ModelSpec definitions, mirroring how
EntitySpec references a ModelSpec model. It was rejected because:

- A wrapper would carry no semantics of its own. An entity's graph artifact adds
  identity, ownership, lifecycle, relationship endpoints, and command/event
  subject-hood on top of its model. A value-object wrapper would carry only `id`,
  `model:`, and `summary` — a pure pointer, answering no question nothing else
  answers.
- Value objects and enums fail the kind-admission test: without identity they cannot
  be relationship endpoints, command or event subjects, or lifecycle carriers. Their
  only connection to other concepts is structural usage, which ModelSpec already
  records. Wrapper kinds would add nodes to the graph but no new edge type.
- The wrapper is a standing attractor for structural drift — exactly how the
  bootstrap's TimeWindow value object grew a `properties:` block.
- Consumer needs ("who uses TimeWindow?", value objects in diagrams) are met by
  deriving nodes and edges from ModelSpec. Presentation-level nodes do not require
  language-level kinds.
- The strongest argument for wrappers — a value object shared across modules is an
  inter-module contract — is answered at module altitude: the `dependsOn`
  declaration is the graph-level fact; the shared types are derivable evidence.
- Standards cost is asymmetric: adding a kind later is backward-compatible; removing
  one is a breaking change. Under uncertainty, omit.

Escape valve: a value object that accumulates identity, lifecycle, or audit needs is
an association object — it becomes an entity, which is already a kind.

## Single Markdown File Per Specification Kind

Decided: directory per kind.

Directories leave room for future schemas, examples, rationale, validation, and migration notes.

## `knowledge-graph/`

Decided: `graph/`.

`graph/` is shorter and better suited to canonical domain graph artifacts.

## First-Class RelationshipSpec

Decided: first-class, required only when semantic.

RelationshipSpec stays first-class for cross-module relationships, role metadata, and
association objects (space membership). It is not required for plain structural
references, which live in ModelSpec entity properties and can be derived as edges.

## First-Class PropertySpec

Decided: no.

Structure — properties, types, checks — is ModelSpec's job
([decision 0003](../../decisions/0003-one-structural-language.md)). The legacy
SpecScore Property Doc-Kind is frozen; GraphSpec defines no property concept.

## Stored Qualified IDs And Kind-Suffixed Filenames

Decided: bare local IDs, computed qualification, unsuffixed filenames
([decision 0005](../../decisions/0005-graphspec-id-and-reference-syntax.md)).

Stored prefixes duplicated ownership and broke on module moves; kind suffixes
triple-encoded the artifact type already carried by the plural directory and the
`kind:` field.

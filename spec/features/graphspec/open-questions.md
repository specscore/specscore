# Open Questions

Unresolved architectural questions, organized by when they need answers. Questions
resolved by the Phase 1 review decisions
([0003](../../decisions/0003-one-structural-language.md),
[0004](../../decisions/0004-graphspec-kind-admission.md),
[0005](../../decisions/0005-graphspec-id-and-reference-syntax.md)) have been removed:
PropertySpec (no — structure is ModelSpec), enum vs value object (both ModelSpec),
RelationshipSpec first-class (yes, when semantic), ownership representation
(derived), ID and file naming (decided), command-event link direction (one-way).

## v0.2 Questions

Expected to be answered by the Phase 2 pilot and Phase 3 lint work.

All questions the first consumer pilot (2026-07-08) raised as Phase 3 blockers are
resolved: model-source location and identity by placement
([decision 0006](../../decisions/0006-graphspec-model-source-location.md)),
reference resolution including cross-repo
([decision 0007](../../decisions/0007-modelspec-reference-resolution.md)),
cross-module ModelSpec references (ModelSpec decision 0014), the relationship
`metadata:` shape, the command `inputs:` shape, zero-graph-artifact modules, and
absent-`sources` semantics (now in the kind READMEs). **No Phase 3 blockers remain.**

- How should command failures be represented — prose, structured failure cases, or references to policies?
- Should `possibleEvents` entries carry conditions (when does a create command emit its created event)?
- Should event `sources` values be an open set or a controlled vocabulary?
- Should relationship cardinality be normative (linted) or descriptive in v0.2?
- How should `graph lint` consume ModelSpec validation when resolving `modelspec://` references — embed a ModelSpec parser, shell out, or read the compiled JSON AST?
- Lifecycle states live inline on the entity, with ModelSpec named enums reserved for data vocabularies. Does the pilot confirm this split, or do states need reuse across entities / generator access as enums?
- ~~Should a module node occupy a qualified-ID slot at all?~~ Resolved by
  [decision 0011](../../decisions/0011-addressable-model-concepts.md): modules are
  bare-ID citizens; a module node never takes a `<m>.<m>` qualified slot (the
  collision a consumer pilot hit was a lint-implementation defect, not a language
  gap).

## Future Questions

Real, but safely deferred past v0.2.

- How should lifecycle transitions (not just states) be represented, and when do they become normative?
- When exactly is a relationship with metadata promoted to an association-object entity? A working signal exists — identity, lifecycle, or audit needs — but the promotion rule is not yet normative.
- How should invariants and constraints that span multiple concepts be expressed?
- How should deprecation of graph artifacts be represented?
- Should ModuleSpec describe runtime instances or only architectural modules?
- Should `dependsOn` support qualifiers (e.g. weak/contract-only) once real graphs need them?
- When cross-repo graph roots land, how are distributed roots indexed and discovered, and what do version constraints look like on top of the `@{host}/{org}/{repo}` suffix? (Intra-repo per-module roots are resolved — [decision 0009](../../decisions/0009-per-module-graph-roots.md); only cross-repo distribution remains deferred.)
- Should events reference dedicated payload models routinely, or is the subject entity's model usually sufficient?
- Should there be an authoring convention for linking command/event bodies to existing topical prose instead of restating it? Both consumer pilots found artifact bodies inviting duplication of rationale that already lives in feature/topic documents; linking worked, but nothing normative says to prefer it.
- How should event-to-event causation be represented, if at all?
- Should WorkflowSpec, PolicySpec, or ProjectionSpec exist? Each must pass the decision 0004 admission rule; none has yet demonstrated a graph-native semantic not derivable from ModelSpec.
- Consumer-derived modelling pressure points from the booking domain: is a bookable Resource an asset, a person, a union, or a reservations-module abstraction? Does Availability belong to scheduling, the resource-owning module, the reservations module, or a split?

## Research Topics

Open-ended; no phase currently depends on them.

- How should permissions integrate with GraphSpec (on commands, policies, or both), and how do they relate to roles-as-data in ModelSpec enums?
- Should GraphSpec eventually evolve into a DSL, and what would the migration from Markdown+YAML look like?
- Should GraphSpec generate TypeSpec, OpenAPI, or diagrams — and which derived views earn maintenance?
- How should shared/core modules avoid becoming dependency sinks as graphs grow?
- At what maturity should GraphSpec become self-hosting (milestones in [BOOTSTRAP.md](BOOTSTRAP.md))? This is now purely a documentation question — packaging is settled by [decision 0008](../../decisions/0008-graphspec-is-a-specscore-component.md) (GraphSpec stays in the SpecScore repository).

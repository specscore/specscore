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

Raised by the first consumer pilot (2026-07-08) — the first three **block Phase 3
(`graph lint`)** because reference resolution depends on them:

- How does a `modelspec://<module>.<Name>` reference resolve beyond the local graph root? Local resolution is decided ([decision 0006](../../decisions/0006-graphspec-model-source-location.md): short name = graph module ID by placement, sources discovered at `modules/<module>/models/*.hcl`); the remaining question is configured-project and cross-repo resolution, expected to reuse the `source-references` path-based model with the `@{host}/{org}/{repo}` suffix.
- Should ModelSpec support cross-module references (property → entity in another module; embedding another module's component)? The pilot needed both; component reuse argues for qualified names rather than forbid-with-typed-id-convention. Direction under review: ModelSpec defines neutral module-qualified name syntax; resolution is consumer-provided (SpecScore's resolver uses placement per decision 0006), so ModelSpec never depends on SpecScore.
- What may a relationship's `metadata:` map contain? The pilot used `modelspec://` enum references successfully; lint needs a defined value shape (proposal: flat map of string → scalar | qualified graph ref | `modelspec://` ref).
- May a module own zero graph artifacts (a pure structural provider whose surface is only ModelSpec)? The pilot says yes; ModuleSpec and lint rules should say so explicitly.
- The command `inputs` item shape (`name` + `ref:` | `model:`) is currently shown only by example and needs a normative sentence in CommandSpec.

- How should command failures be represented — prose, structured failure cases, or references to policies?
- Should `possibleEvents` entries carry conditions (when does a create command emit its created event)?
- Should event `sources` values be an open set or a controlled vocabulary?
- Should relationship cardinality be normative (linted) or descriptive in v0.2?
- How should `graph lint` consume ModelSpec validation when resolving `modelspec://` references — embed a ModelSpec parser, shell out, or read the compiled JSON AST?
- Lifecycle states live inline on the entity, with ModelSpec named enums reserved for data vocabularies. Does the pilot confirm this split, or do states need reuse across entities / generator access as enums?

## Future Questions

Real, but safely deferred past v0.2.

- How should lifecycle transitions (not just states) be represented, and when do they become normative?
- When exactly is a relationship with metadata promoted to an association-object entity? A working signal exists — identity, lifecycle, or audit needs — but the promotion rule is not yet normative.
- How should invariants and constraints that span multiple concepts be expressed?
- How should deprecation of graph artifacts be represented?
- Should ModuleSpec describe runtime instances or only architectural modules?
- Should `dependsOn` support qualifiers (e.g. weak/contract-only) once real graphs need them?
- When cross-repo graph roots land, how are distributed roots indexed and discovered, and what do version constraints look like on top of the `@{host}/{org}/{repo}` suffix?
- Should events reference dedicated payload models routinely, or is the subject entity's model usually sufficient?
- How should event-to-event causation be represented, if at all?
- Should WorkflowSpec, PolicySpec, or ProjectionSpec exist? Each must pass the decision 0004 admission rule; none has yet demonstrated a graph-native semantic not derivable from ModelSpec.
- Consumer-derived modelling pressure points from the booking domain: is a bookable Resource an asset, a person, a union, or a reservations-module abstraction? Does Availability belong to scheduling, the resource-owning module, the reservations module, or a split?

## Research Topics

Open-ended; no phase currently depends on them.

- How should permissions integrate with GraphSpec (on commands, policies, or both), and how do they relate to roles-as-data in ModelSpec enums?
- Should GraphSpec eventually evolve into a DSL, and what would the migration from Markdown+YAML look like?
- Should GraphSpec generate TypeSpec, OpenAPI, or diagrams — and which derived views earn maintenance?
- How should shared/core modules avoid becoming dependency sinks as graphs grow?
- At what maturity should GraphSpec become self-hosting (milestones in [BOOTSTRAP.md](BOOTSTRAP.md)), and when should it move to its own repository?

# GraphSpec Bootstrap

## Purpose

This bootstrap creates a high-quality starting point for GraphSpec.

It is not intended to finalize the language. It records current architectural intent, unresolved questions, and modelling pressure points so review can improve the design with context intact. The Phase 1 architecture review (2026-07-08) resolved the first wave of questions in decisions [0003](../../decisions/0003-one-structural-language.md), [0004](../../decisions/0004-graphspec-kind-admission.md), and [0005](../../decisions/0005-graphspec-id-and-reference-syntax.md); this document reflects the post-review (v0.2) state.

## Why GraphSpec Starts Inside SpecScore Features

SpecScore already has a feature-oriented specification tree. Placing GraphSpec under `spec/features/graphspec/` lets the language be developed using the existing repository conventions before GraphSpec has its own mature self-description format.

This does not mean GraphSpec conceptually depends on FeatureSpec.

The intended long-term dependency direction is:

```text
ModelSpec owns structure.
GraphSpec owns domain vocabulary and references ModelSpec.
FeatureSpec references GraphSpec.
ApiSpec references GraphSpec.
UiSpec references FeatureSpec.
TestSpec references everything.
```

## Why This Is Not Self-Hosting Yet

GraphSpec should not describe itself until its basic abstractions are stable enough to avoid circular confusion.

The bootstrap still lacks stable answers for several questions, including:

- how lifecycle transitions (beyond states) are represented
- when a relationship with metadata is promoted to an association object (entity)
- how permissions, policies, workflows, and projections fit
- how cross-repo graph roots are indexed and resolved
- how validation levels beyond the v0.2 lint rules are separated

Self-hosting before those questions mature would make the language harder to review and easier to overfit.

## Self-Hosting Milestones

GraphSpec should be considered for self-hosting only after these milestones:

1. The core vocabulary is stable enough to explain common domain models without excessive exceptions.
2. Artifact identity, references, namespaces, and ownership rules are defined. *(Reached in v0.2: decision 0005 defines IDs, references, file naming, and derived ownership.)*
3. ModuleSpec, EntitySpec, RelationshipSpec, CommandSpec, and EventSpec have accepted minimum shapes.
4. The relationships between GraphSpec and ModelSpec, and between GraphSpec and FeatureSpec, are documented with examples.
5. At least two consumer examples exist, from unrelated domains.
6. Validation levels are separated into syntax, reference, semantic, and architectural checks.
7. Cross-repo linking and optional version constraints extend the `source-references` convention rather than a GraphSpec-specific mechanism.
8. Migration and deprecation conventions exist.
9. A review confirms that self-hosting clarifies the language rather than making it more abstract.

## Bootstrap Constraints

The bootstrap should remain:

- Markdown-first
- YAML-backed
- Git-friendly
- AI-friendly
- reviewable in pull requests
- explicit about open questions

It should avoid:

- premature DSL design
- XML-like verbosity
- structural definitions (fields, properties, checks) — structure belongs to ModelSpec
- final code generation commitments
- hiding ambiguity to make examples look cleaner

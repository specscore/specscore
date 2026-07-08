# GraphSpec Bootstrap

## Purpose

This bootstrap creates a high-quality starting point for GraphSpec v0.1.

It is not intended to finalize the language. It records current architectural intent, unresolved questions, and modelling pressure points so a later deep review can improve the design with context intact.

## Why GraphSpec Starts Inside SpecScore Features

SpecScore already has a feature-oriented specification tree. Placing GraphSpec under `spec/features/graphspec/` lets the language be developed using the existing repository conventions before GraphSpec has its own mature self-description format.

This does not mean GraphSpec conceptually depends on FeatureSpec.

The intended long-term dependency direction is:

```text
GraphSpec owns domain vocabulary.
FeatureSpec references GraphSpec.
ApiSpec references GraphSpec.
UiSpec references FeatureSpec.
TestSpec references everything.
```

## Why This Is Not Self-Hosting Yet

GraphSpec should not describe itself until its basic abstractions are stable enough to avoid circular confusion.

The bootstrap currently lacks stable answers for several core questions, including:

- whether RelationshipSpec is first-class
- whether PropertySpec exists
- how modules own cross-module relationships
- how distributed module graph roots are indexed across repositories
- how commands and events reference each other
- how permissions, policies, workflows, and projections fit
- how validation levels should be separated

Self-hosting before those questions mature would make the language harder to review and easier to overfit.

## Self-Hosting Milestones

GraphSpec should be considered for self-hosting only after these milestones:

1. The core vocabulary is stable enough to explain common domain models without excessive exceptions.
2. Artifact identity, references, namespaces, and ownership rules are defined.
3. EntitySpec, ValueObjectSpec, RelationshipSpec, ModuleSpec, CommandSpec, EventSpec, and EnumSpec have accepted minimum shapes.
4. The relationship between GraphSpec and FeatureSpec is documented with examples.
5. At least two consumer examples exist, including one non-Sneat example.
6. Validation levels are separated into syntax, reference, semantic, and architectural checks.
7. Cross-repo linking and optional version constraints reuse the unified SpecScore linkage model.
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
- final code generation commitments
- hiding ambiguity to make examples look cleaner

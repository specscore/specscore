# Current Decisions

These decisions are provisional and intended for architecture review.

## GraphSpec Name

Use `GraphSpec`, not `EntityGraphSpec`.

Reason: the language is expected to model identity, relationships, commands, events, ownership, lifecycle, permissions, invariants, constraints, and examples, not only entities.

## GraphSpec Remains Part of SpecScore

GraphSpec should not replace SpecScore.

Reason: GraphSpec is one member of the SpecScore family and should focus on domain modelling.

## ModuleSpec Name

Use `ModuleSpec`, not `ExtensionSpec`.

Reason: GraphSpec should be reusable beyond Sneat. Sneat extensions are one implementation of architectural modules.

## Directory Per Specification Kind

Use one directory per specification kind in the language bootstrap.

Reason: each kind may later need schemas, examples, rationale, validation rules, migrations, and glossary entries.

## Consumer Projects Use `graph/`

Use `spec/graph/`, not `spec/knowledge-graph/`.

Reason: `graph/` is shorter and leaves room for knowledge artifacts that are not part of the canonical domain graph.

## GraphSpec Supports Distributed Graph Roots

GraphSpec specs may be spread across multiple repositories and modules.

A system may have one shared `spec/graph/` tree, one `graph/` tree per module, or dedicated module spec repositories next to code.

Cross-repo references should use the unified SpecScore cross-repo linking system used by features and other specs. GraphSpec should not invent a separate linking or versioning mechanism.

## GraphSpec Does Not Reference FeatureSpec

GraphSpec should own domain vocabulary. FeatureSpec may reference it.

Reason: domain vocabulary should be stable below feature, API, UI, and test layers.

## Commands Do Not Require Events

CommandSpec represents requested intent. EventSpec represents facts.

A command may commonly lead to events, but the language should not require a one-command-to-one-event contract.

## Events Are Facts

Avoid defining events as outcomes.

Use concepts such as subject, participants, possible triggers, and source systems instead of a single `raisedBy` field.

## Sneat Membership Interpretation

For the Sneat bootstrap, a member of a Space is a Contact that has a `member` role within that Space.

This suggests membership is currently better represented as a relationship or role assignment than as a standalone entity. The exact GraphSpec representation remains reviewable.

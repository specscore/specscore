---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: ModelSpec Validation

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/modelspec-validation?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/modelspec-validation?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/modelspec-validation?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/modelspec-validation?op=request-change) |
**Status:** Draft
**Source Ideas:** —

## Summary

SpecScore recognizes ModelSpec as a first-class independent specification and provides
linting, structural validation, and semantic checking without owning ModelSpec
semantics.

## Problem

ModelSpec is an independent specification language for application data models. It is
maintained at `github.com/specscore/modelspec`, but that repository location does not
make ModelSpec a sub-language of SpecScore or GraphSpec.

SpecScore needs a validation posture that is useful to ModelSpec adopters while
preserving ownership boundaries:

- ModelSpec defines entities, properties, relationships, components, named enums,
  constraints, indexes, projections, migration metadata, and storage-neutral schemas.
- SpecScore validates ModelSpec documents and reports diagnostics.
- OpenVaultDB consumes ModelSpec directly and does not depend on SpecScore ownership.
- GraphSpec is a consumer of ModelSpec: it references ModelSpec models for structure
  ([decision 0003](../../decisions/0003-one-structural-language.md)); ModelSpec never
  references GraphSpec.

## Behavior

### REQ: modelspec-first-class

SpecScore MUST treat ModelSpec as a first-class specification family that can be
linted, validated, and semantically checked.

### REQ: semantics-owned-by-modelspec

When a rule depends on ModelSpec concepts, the ModelSpec specification MUST be the
source of truth. SpecScore MUST NOT invent ModelSpec semantics.

### REQ: not-graphspec

SpecScore MUST NOT represent ModelSpec as a GraphSpec sub-language. GraphSpec and
ModelSpec solve different problems and are independently specified; GraphSpec
consumes ModelSpec one-directionally (graph artifacts reference ModelSpec models),
and ModelSpec never depends on GraphSpec.

### REQ: cli-conventions

Future CLI support MUST reuse existing SpecScore command conventions. Acceptable
directions include:

```text
specscore lint
specscore lint modelspec
specscore validate
```

Compatibility with existing repository lint workflows such as `specscore spec lint`
MUST be preserved during migration.

### REQ: openvaultdb-independence

SpecScore documentation MUST state that OpenVaultDB depends on ModelSpec, not
SpecScore. SpecScore validation may be used in development or CI, but it is not a
runtime ownership boundary.

### REQ: no-required-modelspec

SpecScore MUST NOT require every repository to define a non-empty ModelSpec. ModelSpec
validation should run only when ModelSpec files are present, when repository
configuration enables it, or when the caller explicitly targets ModelSpec validation.

### REQ: hcl-and-json-validation-targets

Initial validation planning SHOULD account for both HCL-authored ModelSpec source and
compiled JSON AST serialization. HCL is the authored source format; JSON is the first
machine-readable AST serialization.

## Acceptance Criteria

### AC: documentation-boundary

**Requirements:** modelspec-validation#req:semantics-owned-by-modelspec, modelspec-validation#req:not-graphspec

**Scenario:** Documentation states the ownership boundary.
**Given** a reader is evaluating ModelSpec support in SpecScore
**When** they read the ecosystem and feature documentation
**Then** they can see that SpecScore validates ModelSpec and does not own its semantics or make it part of GraphSpec.

### AC: future-cli-direction

**Requirements:** modelspec-validation#req:cli-conventions

**Scenario:** Future commands follow existing CLI conventions.
**Given** SpecScore adds ModelSpec CLI support
**When** command names are proposed
**Then** they reuse existing lint and validate conventions rather than introducing a separate architecture.

## Out Of Scope

- Defining ModelSpec language semantics.
- Implementing ModelSpec parsers in this repository.
- Making OpenVaultDB depend on SpecScore.
- Reworking GraphSpec.

## Open Questions

- What exact CLI spelling should explicitly target ModelSpec validation?
- Should the first implementation validate HCL source, compiled JSON AST serialization, or both in one release?

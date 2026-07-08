---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: One Structural Language — ModelSpec Owns Structure

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** architecture, modelspec, graphspec, entity, property, boundaries
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The SpecScore ecosystem accumulated three overlapping ways to describe data structure:

1. The legacy `entity` and `property` Document-Kinds (`spec/features/**/*.entity.md`,
   `*.property.md`) — Approved features with implemented CLI support — define business
   objects with typed properties and checks in YAML frontmatter.
2. ModelSpec (`github.com/specscore/modelspec`) — an independent, HCL-authored
   specification for application data models: entities, properties, components,
   collections, recordsets, constraints, projections, and migration metadata.
3. The GraphSpec bootstrap — intended to describe connected domain semantics — was
   already drifting into structure: its EntitySpec examples embedded `fields:` blocks,
   its ValueObjectSpec embedded `properties:` blocks, and EnumSpec carried `values:`.

At the same time, the written record specified mutual ignorance between GraphSpec and
ModelSpec: the ModelSpec repository stated in three places that "GraphSpec is
intentionally outside this architecture", and no GraphSpec document referenced
ModelSpec at all. Left unresolved, every populated graph would re-encode structural
truth in a language with no type system, no constraint vocabulary, and no validation
semantics behind it — and the three surfaces would drift apart.

## Decision

ModelSpec is the single structural specification language of the SpecScore family.

1. **ModelSpec owns structure.** Types, properties, constraints, validation, reusable
   components (value objects), named enumerations, collections, recordsets, and
   storage projections are ModelSpec concerns. No other family member may define a
   competing structural vocabulary.
2. **GraphSpec depends on ModelSpec, one-directionally.** GraphSpec artifacts
   reference ModelSpec models (for example `model: modelspec://reservations.Booking`)
   instead of embedding field or property lists. ModelSpec never references GraphSpec.
   ModelSpec's independence means the dependency arrow never points out of ModelSpec —
   it does not mean mutual ignorance.
3. **The legacy `entity` and `property` Document-Kinds are frozen.** Their contracts,
   lint rules, and CLI commands (`specscore entity`, `specscore property`) remain
   supported unchanged for existing repositories, but the Doc-Kinds accept no new
   capabilities. New structural modelling work uses ModelSpec. A migration path
   (legacy Doc-Kind → ModelSpec module) will be specified before the legacy kinds are
   formally deprecated.

The boundary test: if a concept changes when the shape of the data changes, it belongs
in ModelSpec; if it changes when responsibilities, boundaries, or behavior change, it
belongs in GraphSpec.

## Rationale

One structural source of truth is the entire value proposition of ModelSpec ("define
your application data model once"). Allowing GraphSpec or the legacy Doc-Kinds to
carry parallel structural definitions recreates the drift problem ModelSpec exists to
solve, inside the very family that ships it.

The one-directional dependency preserves everything ModelSpec's independence promises:
OpenVaultDB and other consumers can adopt ModelSpec without GraphSpec or SpecScore,
because ModelSpec itself references neither.

Freezing rather than immediately deprecating the legacy Doc-Kinds respects shipped,
Approved contracts and their users while stopping further investment in a surface
that duplicates ModelSpec.

## Declined Alternatives

### Mutual independence (status quo ante)

GraphSpec and ModelSpec each ignore the other. Rejected: it forces GraphSpec to
redefine structure (already observable in the bootstrap examples) and yields two
divergent structural vocabularies inside one family.

### GraphSpec owns a structural subset

GraphSpec keeps lightweight inline fields for "simple" cases. Rejected: the simple
subset always grows, and every field it gains is a field that drifts from ModelSpec.
Language design is incentive design — if the container exists, structure leaks into it.

### Evolve the legacy entity/property Doc-Kinds into the structural language

Rejected: they are Markdown-frontmatter-first with a small check vocabulary and no
component, collection, recordset, projection, or migration story. ModelSpec is
strictly more capable and already positioned as an independent open specification.

## Consequences at Decision Time

- The ModelSpec repository must replace its "GraphSpec is intentionally outside this
  architecture" framing with "GraphSpec is a consumer; ModelSpec does not depend on
  GraphSpec" (README, architecture docs, SpecScore-integration doc, and the
  `modelspec-validation` feature in this repository).
- GraphSpec's EntitySpec drops inline structure in favor of an optional `model:`
  reference; ValueObjectSpec and EnumSpec leave GraphSpec (see decision 0004).
- ModelSpec needs a named, id-addressable `enum` concept so enum vocabulary has a
  single home (previously `enum` existed only as an inline constraint check).
- GraphSpec tooling (`specscore graph lint`) must eventually resolve `model:`
  references, creating a tooling-level dependency on ModelSpec validation.
- The `entity` and `property` feature READMEs gain a freeze notice pointing here.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec
- entity
- property
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

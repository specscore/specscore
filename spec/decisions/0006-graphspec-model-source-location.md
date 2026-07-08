---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: GraphSpec Model-Source Location and Module Identity by Placement

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, modelspec, models, discovery, identity
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

Decision [0005](0005-graphspec-id-and-reference-syntax.md) defined GraphSpec file
naming and the `modelspec://` reference scheme, but not where ModelSpec sources live
inside a graph tree. The first consumer pilot (Phase 2) colocated HCL files under
each module by convention and found that without a canonical location, `graph lint`
has nothing to discover when resolving `model:` references (pilot friction F6), and
the short module name in `modelspec://<module>.<Name>` has no authoritative anchor
(part of friction F1).

SpecScore already resolves identity by placement everywhere else: a feature's slug
is its path under `spec/features/`, and a GraphSpec artifact's qualified ID is
computed from its directory placement. The `source-references` feature (Stable)
resolves references as repo-root-relative paths with an `@{host}/{org}/{repo}`
suffix for cross-repo targets.

## Decision

### Canonical location

A GraphSpec module's ModelSpec sources live in a `models/` directory directly under
the module root:

```text
spec/graph/modules/<module-id>/models/*.hcl
```

- One or more `.hcl` files; the split into files is the author's choice and carries
  no semantics.
- Together, all model sources under a module's `models/` directory constitute that
  module's **one** ModelSpec module.
- A module MAY have no `models/` directory (no structural surface), and MAY have a
  `models/` directory while owning zero graph artifacts (a pure structural
  provider) — both are legal.

### Module identity by placement

Within a SpecScore-managed graph tree, the ModelSpec module's short name **is** the
graph module ID, derived from placement — exactly as feature slugs and qualified
graph IDs are path-derived. No module-identity block is added to the HCL grammar;
identity is a packaging concern of the tree, not of the language.

When model sources are compiled to the ModelSpec JSON AST, the serialization's
globally-unique `module.id` is derived from repository identity plus module path
(for example `github.com/<org>/<repo>/spec/graph/modules/bookius`), with the short
name carried as `module.name`. Standalone ModelSpec consumers outside SpecScore
trees keep using `module.id` and their own packaging; nothing in ModelSpec itself
depends on this decision.

### Discovery rule for tooling

Given a graph root, tooling resolves the module part of
`modelspec://<module>.<Name>` by locating `modules/<module>/models/` in the same
graph root. Resolution beyond the local graph root (configured projects, cross-repo
suffixes) is specified with the `modelspec://` resolution rule (see decision 0005's
cross-repo stance and the pending resolution decision).

### Prose pairing: the graph module IS the model's documentation

Model sources stay pure HCL. The human-readable description of a module's structure
and relationships is not a paired document — it is the graph module itself:

- the ModuleSpec README describes the module's nature and boundaries;
- each EntitySpec artifact describes its concept and carries the `model:`
  back-reference;
- RelationshipSpec artifacts describe the relationships;
- the `models/README.md` (already required by the every-directory-has-a-README
  rule) orients readers across the module's model files;
- inline HCL comments cover local notes.

Authors MAY add optional documentation pages, but tooling MUST NOT require a paired
`.md` per `.hcl` file, and prose in such pages must not restate what graph artifacts
own.

## Rationale

Identity-by-placement keeps one rule across the whole SpecScore family — features,
graph artifacts, and now model sources — and gives the pilot's working convention
normative status. Colocating models with their module keeps ownership derivable by
the same placement rule as everything else, and keeps a module's full surface
(semantic + structural) reviewable in one directory.

Not adding an HCL identity block preserves ModelSpec's independence and answers its
open question ("module identity in HCL") with the least language: none. A file's
meaning inside a tree comes from the tree; a compiled module's identity comes from
`module.id`.

## Declined Alternatives

### A single shared `spec/graph/models/` directory

Rejected: breaks placement-derived ownership, and shared directories are where
cross-module structure would accumulate without an owner.

### A `module` identity block in ModelSpec HCL

Rejected for now: duplicates what placement already states, adds grammar for a
packaging concern, and would drift from the directory name. Revisit only if
standalone (non-SpecScore) HCL distribution demonstrates a real need.

### Kind-suffixed or per-entity model files (`booking.entity.hcl`)

Rejected: ModelSpec files are modules, not per-concept artifacts; the split into
files is presentation. Enforcing per-entity files would triple-encode structure the
AST already has.

### Markdown sources with embedded HCL blocks (legacy-entity style)

Model sources authored as Markdown documents with machine-readable code blocks —
the approach the frozen entity/property Doc-Kinds used with YAML frontmatter.
Rejected: it makes SpecScore-managed trees author a different container than
standalone ModelSpec adopters (an extraction step would sit between the file and
every ModelSpec parser, HCL editor, and formatter); it reopens the
source-of-truth-in-markup trade-off the family already paid for once (long
frontmatter readability, managed-section machinery); and a prose container wrapped
around structure is precisely the drift attractor decisions 0003/0004 closed.

### A required paired `.md` beside each `.hcl`

Rejected: the pairing already exists at the right altitude. The graph artifacts are
the prose half — `booking.md` (EntitySpec) is the human document for `Booking` in
`bookius.hcl`, the ModuleSpec README describes the module, RelationshipSpec
artifacts describe relationships, and `models/README.md` is already mandatory. A
required second prose home per HCL file would describe the same concepts in a third
place and drift. Concepts with no graph node by design (components, enums) are
covered by HCL comments and the module README; if real usage shows they need
per-concept prose pages, that is evidence for a docs convention, not for a required
pairing.

## Consequences at Decision Time

- `graph lint` gains discovery: `modules/<id>/models/*.hcl` is where `model:`
  references resolve locally (unblocks pilot friction F6 and the local half of F1).
- ModuleSpec documentation gains the `models/` location; the CLI `graph new module`
  spec should scaffold the directory (with its README, per repo conventions).
- The ModelSpec JSON `module.id` derivation for SpecScore-managed trees is defined
  here; ModelSpec's own spec remains unchanged.
- The cross-repo and cross-module *reference* rules remain a separate decision
  (pilot frictions F1/F2).

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

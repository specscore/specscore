# GraphSpec Decisions

Accepted architectural decisions for GraphSpec, with concise rationale. The system of
record for the foundational decisions is the repository Decision artifacts:

- [0003 — One Structural Language](../../decisions/0003-one-structural-language.md)
- [0004 — GraphSpec Kind Admission — Five Core Kinds](../../decisions/0004-graphspec-kind-admission.md)
- [0005 — Identifier, Reference, and File-Naming Syntax](../../decisions/0005-graphspec-id-and-reference-syntax.md)
- [0006 — Model-Source Location and Identity by Placement](../../decisions/0006-graphspec-model-source-location.md)
- [0007 — ModelSpec Reference Resolution](../../decisions/0007-modelspec-reference-resolution.md)
- [0008 — GraphSpec Is A SpecScore Component](../../decisions/0008-graphspec-is-a-specscore-component.md)
- [0009 — Per-Module Graph Roots](../../decisions/0009-per-module-graph-roots.md)
- [0010 — References Are URLs](../../decisions/0010-references-are-urls.md)
- [0011 — Addressable Model Concepts and Kind Segments](../../decisions/0011-addressable-model-concepts.md)

Fuller narrative reasoning lives in the
[Phase 1 architecture review report](reviews/architecture-review-2026-07.md);
rejected options are catalogued in [alternatives considered](alternatives-considered.md).

## Accepted Decisions

### GraphSpec is a SpecScore component, not a standalone standard

GraphSpec is not intended for use outside SpecScore and freely reuses SpecScore
machinery: `specscore.yaml` (`modules:` for graph-root discovery, `projects:` for
resolution), the `source-references` linkage model, artifact conventions, and shared
lint/CLI/Studio infrastructure. The formerly planned v1 extraction to its own
repository is dropped (plain-Markdown artifacts keep extraction *possible* if
external demand ever materializes). *Why:* every mechanism a standalone GraphSpec
would need already exists in SpecScore, and there is no adopter without SpecScore —
unlike ModelSpec, which has real non-SpecScore consumers and stays independent. The
layering rule is unaffected: GraphSpec never depends on FeatureSpec semantically.
([0008](../../decisions/0008-graphspec-is-a-specscore-component.md))

### ModelSpec is the single structural language

Properties, types, constraints, validation, value objects (components), named enums,
collections, recordsets, and projections are ModelSpec concerns. No other ecosystem
member defines a competing structural vocabulary. *Why:* three overlapping structural
languages existed (legacy entity/property Doc-Kinds, ModelSpec, GraphSpec's drifting
examples); one source of truth is ModelSpec's entire value proposition. ([0003](../../decisions/0003-one-structural-language.md))

### GraphSpec reuses ModelSpec, one-directionally

Graph entities reference ModelSpec models (`model: modelspec:///reservations.Booking`)
instead of embedding fields. ModelSpec never references GraphSpec. *Why:*
independence is about dependency direction, not mutual ignorance; the arrow never
points out of ModelSpec, so ModelSpec adopters lose nothing. ([0003](../../decisions/0003-one-structural-language.md), ModelSpec decision 0012)

### GraphSpec focuses on domain semantics

The boundary test: if a concept changes when the *shape* of data changes, it belongs
in ModelSpec; if it changes when *responsibilities, boundaries, or behavior* change,
it belongs in GraphSpec. In DDD terms, GraphSpec is the strategic layer and ModelSpec
the tactical layer.

### Five kinds, gated by an admission rule

GraphSpec defines module, entity, relationship, command, and event. A concept earns a
kind only if it participates in a graph-native semantic — identity-bearing
relationship endpoint, command/event subject-hood, ownership boundary, lifecycle —
not derivable from ModelSpec. ValueObjectSpec and EnumSpec were removed (they fail
the test; see rejected alternatives below). *Why:* without an admission rule, the
language grows by accretion — the most common failure mode of open standards. ([0004](../../decisions/0004-graphspec-kind-admission.md))

### Identifiers: bare local IDs, computed qualification

Local IDs are lowercase kebab-case, equal to the filename stem, never
module-prefixed. The qualified form `<module-id>.<local-id>` is computed from
directory placement and used in references. Display casing lives in `name:`. *Why:*
stored prefixes duplicated ownership, broke on module moves, and produced three
casing conventions in the first consumer example. ([0005](../../decisions/0005-graphspec-id-and-reference-syntax.md))

### File naming: plural typed directories, unsuffixed filenames

`entities/booking.md`, not `entities/booking.entity.md`. *Why:* the directory and the
`kind:` field already type the artifact twice; a suffix triple-encodes it. The old
entity-only suffix exception existed solely to dodge the legacy `*.entity.md` lint
glob, which decision 0003 made irrelevant. ([0005](../../decisions/0005-graphspec-id-and-reference-syntax.md))

### Ownership is derived, not declared

The owning module is derived from placement under the module root. Artifacts carry no
`owner:` field; module `Owns` listings are generated managed sections. *Why:*
ownership was previously stated three times (field, hand-written list, placement);
three sources of one fact drift, and derived ownership survives `git mv`.

### Modules declare dependencies

ModuleSpec carries `dependsOn:`. Any qualified reference to another module's artifact
requires that module in the referrer's `dependsOn`, making dependency direction
lintable. *Why:* dependency-direction validation was specified in tooling with
nothing in the language to validate against.

### Relationship ownership follows dependencies

A relationship must be owned by a module whose `dependsOn` closure covers both
endpoint modules — in practice the downstream module. A core module can never own a
relationship targeting an extension-owned entity. *Why:* the first consumer bootstrap
had a core module owning a membership relationship over an extension's contact — a
core-to-extension dependency inversion that this rule makes structurally impossible.

### Relationships are first-class, required only when semantic

A RelationshipSpec artifact is required only when the relationship carries semantics
beyond a typed reference: cross-module endpoints, metadata (roles), cardinality
constraints, or lifecycle. Plain intra-module references live in ModelSpec entity
properties, from which tooling may derive edges. *Why:* keeps first-class
relationships (needed for association objects like team membership) without making
them mandatory ceremony.

### Command→event links are authored in one direction

Commands declare `possibleEvents`; events declare only non-command `sources` (timer,
integration, external system, manual correction); tooling derives an event's command
triggers. *Why:* bidirectional hand-maintained links drift; one authored direction
plus derivation cannot. Commands still do not imply events as a language rule, and
events remain facts, not outcomes.

### Lifecycle states live on the entity

`lifecycle.states` is declared inline on the entity. ModelSpec named enums are for
data vocabularies (currency codes, roles-as-data). *Why:* lifecycle is domain
semantics — transitions and who may trigger them — and defining states in one
language while interpreting them in another would split a single concern. Flagged for
revisit after the first consumer graph is populated.

### Model sources: `models/*.hcl`, identity by placement, no paired prose

A module's ModelSpec sources live at `<module-root>/models/*.hcl` and together form
its one ModelSpec module, whose short name is the graph module ID (path-derived, like
every other SpecScore identity). Sources stay pure HCL: the graph module (ModuleSpec
README, EntitySpec/RelationshipSpec artifacts, the mandatory `models/README.md`) is
their documentation. Markdown-embedded models and required paired `.md` files were
both rejected as drift channels. *Why:* one identity rule ecosystem-wide; standalone
ModelSpec tooling keeps consuming plain HCL. ([0006](../../decisions/0006-graphspec-model-source-location.md))

### ModelSpec references resolve by placement, then configured projects, then explicit repository

`modelspec:///<module>.<Name>` (current repository) and HCL module-qualified names
resolve through one rule: local graph root (placement per 0006) → `specscore.yaml`
`projects:` local paths → explicit repository in the URL authority
(`modelspec://{host}/{org}/{repo}/<module>.<Name>`), with no implicit network
fetch. SpecScore is thereby ModelSpec's consumer-resolver (ModelSpec decision 0014
keeps the syntax consumer-neutral), and model-level cross-module references count
against the owning module's `dependsOn`. *Why:* one resolution rule ecosystem-wide; no
registry, no second linking convention.
([0007](../../decisions/0007-modelspec-reference-resolution.md), grammar amended by
[0010](../../decisions/0010-references-are-urls.md))

### References are URLs

Ecosystem-wide rule: a scheme written with `//` honors RFC 3986 authority semantics —
authority is the repository host, the path is `{org}/{repo}` plus the resource,
and an empty authority (`modelspec:///…`) means the current repository. The former
`@{host}/{org}/{repo}` suffix is removed from `modelspec://` references and from
the source-references cross-repo shorthand (now
`specscore://{host}/{org}/{repo}/{reference}` — a pure prefix swap away from its
canonical `https://specscore.org/…` expansion). `?ref=<git-ref>` pins a branch,
tag, or commit; the fragment is reserved for intra-resource addressing. Legacy
forms are lint errors carrying the exact rewrite, applied by `--fix` — the first
fixers with specified semantics. *Why:* the old grammar put case-sensitive concept
names in the case-insensitive authority component; a scheme that invokes URL
syntax must deliver URL semantics, and the break was free while both pilots used
only local references. ([0010](../../decisions/0010-references-are-urls.md))

### Modules are bare-ID citizens; the addressable trio gets kind segments

Modules live in the bare-ID namespace (`vault`); owned artifacts live in the
per-module qualified namespace (`vault.vault`) — a module node never occupies a
qualified-ID slot, so a domain whose core entity names its context cannot collide
with itself. The two-segment model reference resolves in one flat per-module
namespace formed by entities, components, and enums (now normative); an optional
kind segment (`modelspec:///vault.collections.vaults`, tokens
`entities|components|enums|collections|recordsets`, reserved as concept names)
makes collections and recordsets addressable — three-segment only, own scopes.
Graph-to-graph references stay two-segment (kind-free references survive
relationship→entity promotion); HCL is untouched (the attribute name is the kind
selector, ModelSpec decision 0014). *Why:* the kind segment lives exactly where
kinds are structural facts and is absent exactly where kinds are semantic
judgments. ([0011](../../decisions/0011-addressable-model-concepts.md))

### Graph roots: repo-level plus per-module, unified; cross-repo deferred

A repository's graph is the union of its graph roots: the repo-level root (default
`spec/graph/`) plus one per configured SpecScore module
(`<module.path>/<specs_dir>/graph/`, via the same repo-config machinery as all other
tooling — no GraphSpec-specific configuration). GraphSpec module IDs are unique
across the union; decision 0007's resolution step 1 searches the union; every root
carries the uniform `modules/<id>/…` layout. *(0005's original v0.2 single-root
stance was amended by [0009](../../decisions/0009-per-module-graph-roots.md) once
[0008](../../decisions/0008-graphspec-is-a-specscore-component.md) licensed direct
module-config reuse.)* Cross-repo distribution remains deferred: when it lands, it
extends qualified IDs with the `@{host}/{org}/{repo}` suffix convention of the
Stable `source-references` feature. *Why (unchanged):* honest scoping beats an
unspecified dependency in the language core, and GraphSpec invents no second linking
mechanism.

### Legacy entity/property Doc-Kinds are frozen

Contracts, lint rules, and `specscore entity`/`specscore property` CLI remain
supported unchanged, but the Doc-Kinds accept no new capabilities; new structural
work uses ModelSpec. A migration path will be specified before formal deprecation.
*Why:* respects shipped Approved contracts while stopping investment in a surface
ModelSpec supersedes. ([0003](../../decisions/0003-one-structural-language.md))

### Naming decisions

- `GraphSpec` (not EntityGraphSpec, not DomainSpec) — established in the ecosystem; the
  language models more than entities; a rename buys marginal precision for real churn.
- `ModuleSpec` (not ExtensionSpec) — consumer-neutral; product extensions are one
  implementation of modules.
- Consumer trees use `spec/graph/` (not `spec/knowledge-graph/`).
- Normative examples use a neutral domain (`reservations`, `catalog`, `directory`,
  `identity`, `scheduling`); the public standard never names private consumers.

## Notable Rejected Alternatives

Understanding *why* these lost is likely to stay valuable. Full catalogue:
[alternatives considered](alternatives-considered.md).

### Graph-level ValueObjectSpec/EnumSpec wrappers referencing ModelSpec

The strongest alternative to removing the two kinds. Rejected because a wrapper
carries no semantics of its own (a pure pointer: `id`, `model:`, `summary`), fails
the kind-admission test (no identity → no graph-native edges), is a standing
attractor for structural drift (the bootstrap's TimeWindow had already grown a
`properties:` block), and conflates the rendered graph with the authored language —
diagrams and "who uses X?" queries are served by nodes *derived* from ModelSpec.
The best pro-wrapper argument (shared value objects as inter-module contracts) is
answered at module altitude by `dependsOn`. Regret is asymmetric: re-adding a kind
later is compatible; removing one is breaking. Escape valve: a value object that
accumulates identity/lifecycle/audit needs is an association object and becomes an
entity. (Recorded in [decision 0004](../../decisions/0004-graphspec-kind-admission.md).)

### Mutual ignorance between GraphSpec and ModelSpec

The pre-review written record. Rejected because it demonstrably forced GraphSpec to
redefine structure and would have produced two divergent structural vocabularies in
one ecosystem.

### GraphSpec keeps a "lightweight" inline-fields subset

Rejected: the simple subset always grows, and every field it gains drifts from
ModelSpec. Language design is incentive design — if the container exists, structure
leaks into it.

### Stored qualified IDs and kind-suffixed filenames

Rejected: prefix duplicates derived ownership and breaks on `git mv`; suffixes
triple-encode the artifact type.

### PropertySpec as a GraphSpec kind

Rejected: structure is ModelSpec's job; the legacy Property Doc-Kind is frozen prior
art, not a GraphSpec concept.

### Path-based references (`modules/<m>/entities/<id>` instead of `<m>.<id>`)

Rejected in favour of the dot form. References point at *concepts*, not files: when
an artifact changes kind (a relationship promoted to an association-object entity)
or a consumer tree changes layout, `directory.team-member` stays valid while a path
reference breaks graph-wide. The dot form is also the one reference grammar shared
across the ecosystem (ModelSpec decision 0014 settled `<module>.<Name>`, and ModelSpec
is consumer-neutral — it cannot carry file locations in identity at all), and a path
would re-encode the kind a third time, the same triple-encoding argument that killed
kind-suffixed filenames. The trade is deliberate: path refs would disambiguate
`entities/x` from `commands/x` for free, but GraphSpec instead asserts that a
module's local IDs form one flat vocabulary — `reservations.booking` means exactly
one concept — which is what `graph-duplicate-id` enforces. Modules themselves are
bare-ID citizens outside that vocabulary. Paths remain the *human* layer: body
prose uses ordinary relative Markdown links; frontmatter uses semantic refs.

## Open Questions

See [open-questions.md](open-questions.md).

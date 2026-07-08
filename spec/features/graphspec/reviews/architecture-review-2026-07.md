# GraphSpec & ModelSpec Architecture Review — 2026-07

**Date:** 2026-07-08
**Scope:** GraphSpec bootstrap (this directory), ModelSpec
(`github.com/specscore/modelspec`), SpecScore CLI `graph` command specifications,
and the first consumer bootstrap graph (in that consumer's repository).
**Status:** Accepted in full; resulting changes applied the same day.
**Resulting decisions:**
[0003](../../../decisions/0003-one-structural-language.md),
[0004](../../../decisions/0004-graphspec-kind-admission.md),
[0005](../../../decisions/0005-graphspec-id-and-reference-syntax.md),
ModelSpec 0012 (GraphSpec is a consumer), ModelSpec 0013 (named enums).

The review was conducted as if evaluating a proposed open standard rather than an
internal project, preferring simplicity, longevity, and consistency over cleverness.

## Executive Summary

The intended layering — SpecScore as umbrella, ModelSpec for structure, GraphSpec for
connected domain semantics — is sound, and the bootstrap discipline (preserved
rationale, explicit open questions, deliberate refusal to self-host early) was
unusually good. However, at review time the ecosystem contained **three competing
structural-model languages** (the legacy entity/property Doc-Kinds, ModelSpec, and
GraphSpec's drifting examples), and the two language repositories **contradicted the
intended architecture in writing**: ModelSpec stated in three places that GraphSpec
was "intentionally outside this architecture," while no GraphSpec document referenced
ModelSpec at all. The corpus specified mutual ignorance, which was forcing GraphSpec
to redefine structure — its entity examples had grown `fields:` blocks and its value
objects `properties:` blocks.

The verdict: the architecture was right, but populating any consumer graph before
resolving the structural-language question, the identifier syntax, and the kind
inventory would have meant rewriting every artifact later. Those three questions were
resolved as decisions 0003–0005; the graph population was deferred to Phase 2.

## Strengths Found

- **The ModelSpec/GraphSpec question split is correct and durable.** "What does this
  object look like?" vs "How do domain concepts relate and interact?" mirrors
  long-lived boundaries elsewhere: JSON Schema vs OpenAPI, SQL DDL vs a context map,
  DDD tactical vs strategic design.
- **Bootstrap epistemics.** BOOTSTRAP.md's self-hosting milestones, the
  alternatives-considered record, and "examples may expose weaknesses" as a principle
  are exactly how an open standard should incubate. The consumer bootstrap honestly
  left Resource and Availability unresolved instead of faking answers.
- **Events-are-facts.** Subject/participants/sources instead of a single `raisedBy`,
  and commands not required to emit events, avoids the classic CQRS over-constraint.
- **ModelSpec was the most mature piece.** Property/field/column as distinct terms,
  collection-kind, the opaque query seam, and composition-over-inheritance are
  coherent and well-argued; components quietly double as the value-object mechanism.
- **CLI specs respected ownership boundaries** (language semantics owned by GraphSpec;
  no collision with legacy command groups; standalone `graph lint` before `spec lint`
  integration).
- **Markdown + YAML frontmatter, one concept per file** is genuinely Git- and
  AI-friendly.

## Weaknesses Found

- **Structural duplication in progress.** GraphSpec examples were becoming a second
  (third) structural language with no type system, constraint vocabulary, or
  validation semantics behind them.
- **Ownership stated three times** — artifact `owner:` field, hand-written module
  `Owns` list, directory placement — guaranteeing drift at scale.
- **Command↔event links declared on both sides** (`possibleEvents` on the command AND
  trigger lists on the event) — two authored copies of one fact.
- **Inconsistent identifier conventions.** Three casing styles across kinds; stored
  module prefixes duplicating ownership; an entity-only file-suffix exception that
  existed solely to dodge a legacy lint glob.
- **A load-bearing citation to a nonexistent spec.** Six documents relied on a
  "unified SpecScore cross-repo linking system" that was never specified; the closest
  prior art was the `source-references` code-annotation feature.
- **Speculation in normative fields** (`targetOptions` including a reference to a
  nonexistent module) that any reference validator must reject.
- **CLI surface specified far ahead of the language** — ~20 subcommands including
  four overlapping validation verbs, against a language with no stable ID syntax.
- **Module dependencies unrepresentable** — dependency-direction validation was
  specified in tooling with no `dependsOn` declaration in the language to check.
- **A dependency inversion in the first consumer bootstrap** — a core module owned a
  membership relationship targeting an extension-owned contact, giving core a
  dependency on an extension.

## Accepted Recommendations

All review recommendations were accepted. In summary, with rationale:

1. **One structural language (decision 0003).** ModelSpec owns structure; GraphSpec
   references ModelSpec models one-directionally; the legacy entity/property
   Doc-Kinds are frozen with a migration path. *Why:* one source of structural truth
   is ModelSpec's entire value proposition; independence is about dependency
   direction, not mutual ignorance.
2. **Five kinds gated by an admission rule (decision 0004).** module, entity,
   relationship, command, event; ValueObjectSpec and EnumSpec removed to ModelSpec
   (components; named enums). *Why:* see the wrapper discussion below — the rule, not
   the removal, is the durable asset.
3. **Identifier/reference/file-naming syntax (decision 0005).** Bare kebab-case local
   IDs; computed qualified IDs; `modelspec://` references; plural typed directories
   with unsuffixed filenames; single graph root in v0.2 with cross-repo deferred to
   the `source-references` `@{host}/{org}/{repo}` convention. *Why:* this was the
   single most load-bearing undefined thing; every artifact authored before it would
   have been rewritten.
4. **Derived ownership; `dependsOn` on modules; relationship ownership rule.**
   Ownership from placement; module dependencies declared and lintable; a
   relationship owned only by a module whose `dependsOn` closure covers both
   endpoints. *Why:* removes the triple-stated ownership fact and makes the observed
   core→extension inversion structurally impossible.
5. **One-directional command→event links.** Commands author `possibleEvents`; events
   declare only non-command sources; tooling derives the rest. *Why:* bidirectional
   hand-maintained links drift.
6. **Lifecycle states inline on the entity**, with ModelSpec enums reserved for data
   vocabularies. *Why:* lifecycle is domain semantics; flagged for revisit after
   Phase 2 with real lifecycles.
7. **CLI restaged.** v0.2 surface = `graph new`, `graph lint`, `graph list`,
   `graph refs`; `validate`/`check-refs` documented as lint rule-subsets; `doctor`,
   render/export, structural editing, and AI commands staged Later. *Why:* a wide
   contract surface over an unstable language multiplies churn.
8. **ModelSpec additions.** Named enums (decision 0013); components explicitly
   documented as the value-object mechanism; the consumer framing correction
   (decision 0012) applied across its README and docs.
9. **Consumer-neutral standard.** All normative examples use a neutral domain
   (`reservations`, `catalog`, `directory`, `identity`, `scheduling`); private
   consumers are never named or linked from the public repositories and are cited
   generically ("the first consumer bootstrap") where they served as evidence.

## Recommendations Considered and Not Adopted

- **Graph-level ValueObjectSpec/EnumSpec wrappers referencing ModelSpec.** The
  strongest alternative to removing the two kinds, examined in depth after the
  initial review. Rejected because: a wrapper carries no semantics of its own (a pure
  pointer — `id`, `model:`, `summary` — answering no question nothing else answers);
  value objects and enums fail the admission test (no identity → they cannot be
  relationship endpoints, command/event subjects, or lifecycle carriers, so wrapper
  kinds add nodes but no new edge type); the wrapper is a standing attractor for
  structural drift (the bootstrap's TimeWindow had already grown a `properties:`
  block); consumer needs — diagrams, "who uses X?" — are met by nodes *derived* from
  ModelSpec, i.e. the rendered graph does not require language-level kinds; the
  inter-module-contract argument is answered at module altitude by `dependsOn`; and
  regret is asymmetric (re-adding a kind is backward-compatible, removing one is
  breaking). Escape valve: a value object that accumulates identity, lifecycle, or
  audit needs is an association object and becomes an entity. The one genuine cost —
  wrappers would have given value objects a review lifecycle that HCL files lack —
  is an argument for ModelSpec review conventions, not for hosting structural
  artifacts in the semantic layer.
- **Renaming GraphSpec to DomainSpec.** Marginally more accurate ("how do domain
  concepts relate"), but GraphSpec is established across the family and the rename
  buys precision at the cost of real churn. Not adopted.
- **Kind-suffixed filenames everywhere** (`booking.entity.md`, …) as the uniformity
  fix. Rejected in favor of unsuffixed names: the plural directory and `kind:`
  frontmatter already encode the type twice; grep-ability is marginal.
- **Requiring `model:` on every entity.** Rejected: domain modelling legitimately
  precedes structural modelling; `model:` is optional with a lint warning for
  non-draft entities.
- **Immediate deprecation of the legacy entity/property Doc-Kinds.** Rejected in
  favor of freezing: the contracts are Approved and shipped; deprecation waits for a
  specified migration path.

## Rationale Threads Worth Preserving

- **The boundary test.** Shape change → ModelSpec; responsibility/boundary/behavior
  change → GraphSpec. One sentence, applied concept by concept, settled every
  membership question in the review.
- **The admission rule as accretion defense.** Open standards die by kind accretion;
  Workflow/Policy/Projection and future candidates now face a gate, not a debate.
- **Language design is incentive design.** Every structural drift observed was caused
  by a container existing, not by anyone deciding to duplicate. Remove the container.
- **Author once, derive the rest.** Applied to ownership, module `Owns` lists,
  command→event links, and qualified IDs.

## Future Work

Tracked in [roadmap.md](../roadmap.md) and [open-questions.md](../open-questions.md):
the Phase 2 booking-domain pilot as a falsification exercise; `specscore graph lint`
implementing the v0.2 rule set; OpenVaultDB validation of ModelSpec's independence; a
second consumer domain (person-centric, deliberately unlike booking); wider consumer
graph population; and eventually v1 with self-hosting evaluated against the
BOOTSTRAP.md milestones and extraction of GraphSpec to its own repository.

Lessons extracted from this review are maintained separately in
[lessons-learned.md](../lessons-learned.md).

## Open Questions

None at this time — open architectural questions live in
[open-questions.md](../open-questions.md).

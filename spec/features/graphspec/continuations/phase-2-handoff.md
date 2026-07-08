# Phase 2 Handoff — Bookius Pilot

**Prepared:** 2026-07-08, at the close of Phase 1 (architecture review).
**Audience:** a future AI session (or human contributor) with no access to prior chat
history. This document is optimized for preserving architectural intent, not for
brevity. Read it together with [decisions.md](../decisions.md),
[lessons-learned.md](../lessons-learned.md), and the
[Phase 1 review report](../reviews/architecture-review-2026-07.md) before writing
anything.

## Current Architecture

The SpecScore family after Phase 1:

```text
ModelSpec  — owns STRUCTURE: entities, properties, types, constraints,
             components (value objects), named enums, collections,
             recordsets, projections, migration metadata. HCL-authored,
             JSON AST serialization. Independent: never references
             GraphSpec, SpecScore, or any consumer.

GraphSpec  — owns DOMAIN SEMANTICS: modules, entities-as-graph-nodes,
             relationships, commands, events, ownership, lifecycle.
             Markdown + YAML frontmatter. Depends one-directionally on
             ModelSpec via `model: modelspec://<Module>.<Entity>` refs.
             Embeds NO structural definitions.

FeatureSpec / ApiSpec / UiSpec / TestSpec — reference GraphSpec; GraphSpec
             does not depend on them. GraphSpec is bootstrap-hosted under
             spec/features/graphspec/ for repository convenience only.
```

The boundary test: **if a concept changes when the shape of data changes, it belongs
in ModelSpec; if it changes when responsibilities, boundaries, or behavior change, it
belongs in GraphSpec.**

GraphSpec v0.2 has exactly **five kinds**: `module`, `entity`, `relationship`,
`command`, `event`. Kind admission rule (decision 0004): a concept earns a kind iff
it participates in a graph-native semantic (identity-bearing relationship endpoint,
command/event subject-hood, ownership boundary, lifecycle) not derivable from
ModelSpec. Value objects = ModelSpec components; enums = ModelSpec named enums;
lifecycle *states* are the exception and live inline on the entity.

Consumer graph tree shape (decision 0005):

```text
spec/graph/
  modules/<module-id>/README.md      # kind: module, dependsOn: [...]
  modules/<module-id>/entities/<id>.md
  modules/<module-id>/relationships/<id>.md
  modules/<module-id>/commands/<id>.md
  modules/<module-id>/events/<id>.md
```

Envelope example (entity):

```yaml
---
kind: entity
id: booking                       # bare kebab-case, = filename stem, no module prefix
name: Booking                     # display casing lives here
status: draft
model: modelspec://reservations.Booking   # OPTIONAL; lint-warn when non-draft and absent
lifecycle:
  states: [requested, confirmed, cancelled]
summary: A reservation for a bookable target during a time window.
---
```

## Final Decisions (Phase 1)

System of record: specscore repo decisions
[0003](../../../decisions/0003-one-structural-language.md) /
[0004](../../../decisions/0004-graphspec-kind-admission.md) /
[0005](../../../decisions/0005-graphspec-id-and-reference-syntax.md); ModelSpec repo
decisions 0012 / 0013. Condensed:

1. **One structural language.** ModelSpec owns all structure; the legacy
   `entity`/`property` Doc-Kinds (`*.entity.md` / `*.property.md`) are frozen; new
   structural work uses ModelSpec.
2. **GraphSpec consumes ModelSpec one-directionally.** ModelSpec never references
   GraphSpec. "Independence" = dependency direction, not mutual ignorance.
3. **Five kinds + admission rule.** ValueObjectSpec and EnumSpec removed; the
   wrapper alternative (thin graph kinds referencing ModelSpec) was explicitly
   examined and rejected — see decision 0004's Declined Alternatives.
4. **IDs:** bare kebab-case local IDs equal to the filename stem; qualified form
   `<module>.<local-id>` is computed from placement, never stored; `modelspec://`
   scheme for model references; speculative targets never go in frontmatter.
5. **Files:** plural typed directories, unsuffixed `<id>.md` filenames.
6. **Ownership derived from placement.** No `owner:` field anywhere; module `Owns`
   lists are generated managed sections.
7. **Modules declare `dependsOn`.** Every qualified cross-module reference must be
   covered; lintable.
8. **Relationship ownership:** owner's `dependsOn` closure must cover both endpoints
   (downstream module owns; core can never own a relationship into an extension).
   RelationshipSpec is required only when the relationship carries semantics beyond a
   typed reference; plain references live in ModelSpec properties and can be derived
   as edges.
9. **Command→event links authored on the command only** (`possibleEvents`); events
   declare only non-command `sources` (timer, integration, external-system,
   automation, manual-correction); tooling derives event triggers.
10. **Lifecycle states inline on the entity**; ModelSpec named enums are for data
    vocabularies. Marked for revisit with Phase 2 data.
11. **v0.2 is single-graph-root** (`spec/graph/`); cross-repo references deferred,
    and when they land they extend the `source-references`
    `@{host}/{org}/{repo}` convention.
12. **CLI staged:** v0.2 surface is `graph new`, `graph lint`, `graph list`,
    `graph refs`; everything else specified but staged Later.
13. **Public standard is consumer-neutral.** Normative examples use the neutral
    domain (`reservations`, `catalog`, `directory`, `identity`, `scheduling`);
    private consumers are never named or linked from the public repositories.

## Remaining Open Questions

Full list with priority buckets: [open-questions.md](../open-questions.md). The ones
Phase 2 is expected to feed:

- Command failure representation (prose vs structured vs policy refs).
- Conditions on `possibleEvents` entries.
- Open vs controlled vocabulary for event `sources`.
- Normative vs descriptive cardinality on relationships.
- Whether the lifecycle-states-on-entity split survives real lifecycles.
- The booking-domain pressure points: Resource (asset vs person vs union vs
  reservations-owned abstraction) and Availability ownership.
- The association-object promotion rule (when relationship metadata becomes an
  entity).

## Repository Locations

| Repository | Path (owner's machine) | Role |
|---|---|---|
| `specscore/specscore` | `~/projects/specscore/specscore/` | Public. SpecScore meta-spec + website. GraphSpec language bootstrap at `spec/features/graphspec/`; family decisions at `spec/decisions/` (0003–0005). |
| `specscore/modelspec` | `~/projects/specscore/modelspec/` | Public. ModelSpec language. Core spec at `spec/core-model.md`; decisions at `spec/decisions/` (0012 GraphSpec-as-consumer, 0013 named enums). |
| `specscore/specscore-cli` | `~/projects/specscore/specscore-cli/` | Public. Go CLI. `graph` command specs at `spec/features/cli/graph/` (v0.2 staged surface). |
| Consumer spec repo (private) | `~/projects/sneat-co/backstage/` | Private. First consumer's spec tree; the pre-review bootstrap graph at `spec/graph/` does NOT yet conform to v0.2 and is where the Phase 2 pilot is authored. |

Rules that follow from the split: language changes land in the public repos with
neutral examples only; the pilot graph and its product names stay in the private
repo; if a pilot finding must be cited publicly, genericize it ("the first consumer
bootstrap"). Every directory in the specscore repo needs a `README.md` with an
"Open Questions" section (see the repo's agent rules file); always run
`specscore spec lint` before committing.

## Important Terminology

Stable; do not rename casually:

| Term | Meaning |
|---|---|
| GraphSpec | The domain-semantics specification language (this feature). |
| ModelSpec | The independent structural specification language. |
| ModuleSpec | GraphSpec kind: architectural module / bounded context; ownership root; carries `dependsOn`. |
| EntitySpec | GraphSpec kind: domain concept with identity; optional `model:` ref; optional `lifecycle.states`. |
| RelationshipSpec | GraphSpec kind: semantic relationship; required only beyond typed references. |
| CommandSpec | GraphSpec kind: requested intent; authors `possibleEvents`. |
| EventSpec | GraphSpec kind: fact; declares non-command `sources` only. |
| Model reference | `modelspec://<Module>.<Name>` from a graph artifact to a ModelSpec model/component/enum. |
| Component | ModelSpec reusable field group; the value-object mechanism. |
| Named enum | ModelSpec named controlled vocabulary; data values, not lifecycle states. |
| Association object | A relationship that has accumulated identity/lifecycle/audit needs — promotion candidate to entity. |
| Qualified ID | `<module-id>.<local-id>`, computed from placement, used in references, never stored. |
| Admission rule | Decision 0004's gate for any new GraphSpec kind. |

## Next Objective — Phase 2

Validate the refined language using a focused Bookius pilot in the private consumer
repository:

- Rewrite/author one booking-domain slice strictly against v0.2 conventions (five
  kinds, bare IDs, unsuffixed filenames, derived ownership, `dependsOn`,
  one-directional command→event links).
- Create the corresponding ModelSpec module(s) — at minimum a Booking entity with a
  BookingStatus-style lifecycle on the graph side and a named-enum/data split done
  correctly, plus a TimeWindow component — and reference them via `modelspec://`.
- Do NOT expand the broader consumer graph until the language has been validated.
- Intentionally use the pilot to expose weaknesses in GraphSpec and ModelSpec: model
  the hard parts (Resource, Availability, membership), test both structure-first and
  semantics-first workflows around the optional `model:` field, and record every
  point of friction. The weaknesses list is the primary deliverable; graph size is
  not a success metric.

## Future Roadmap

Detail: [roadmap.md](../roadmap.md).

1. **Phase 2 — Bookius validation** (current)
2. Phase 3 — `specscore graph lint` (implement the v0.2 rule set; validate the pilot mechanically)
3. Phase 4 — OpenVaultDB validation (prove ModelSpec's independence end-to-end)
4. Phase 5 — Family Identity / Family Card validation (second, person-centric domain)
5. Phase 6 — Wider consumer graph (module by module, after the vocabulary stabilizes)
6. GraphSpec v1 (freeze vocabulary; evaluate self-hosting per BOOTSTRAP.md; extract to its own repository)

## Suggested Phase 2 Prompt

```text
# Phase 2 — Bookius Pilot: validate GraphSpec v0.2 + ModelSpec with one slice

You are continuing a multi-phase project. You have NO chat history; your context is:

1. Read, in this order:
   - ~/projects/specscore/specscore/spec/features/graphspec/continuations/phase-2-handoff.md
   - ~/projects/specscore/specscore/spec/features/graphspec/decisions.md
   - ~/projects/specscore/specscore/spec/features/graphspec/README.md and the five
     kind READMEs (module/, entity/, relationship/, command/, event/)
   - ~/projects/specscore/specscore/spec/decisions/0003, 0004, 0005
   - ~/projects/specscore/modelspec/spec/core-model.md and decisions 0012, 0013
   - ~/projects/specscore/specscore/spec/features/graphspec/lessons-learned.md
     (especially "Advice for future phases")

2. Objective: in the PRIVATE consumer repo (~/projects/sneat-co/backstage/), replace
   the pre-review bootstrap at spec/graph/ with a v0.2-conformant Bookius pilot:
   - modules with dependsOn; bare kebab-case IDs; unsuffixed <id>.md filenames in
     plural directories; NO owner: fields; no fields:/properties: blocks anywhere.
   - Author ModelSpec module(s) for the pilot (HCL): at least Booking (entity),
     TimeWindow (component), and one named enum used as a data vocabulary. Reference
     them from graph entities via modelspec:// — and deliberately leave one entity
     model-less (structure-first vs semantics-first are both supported workflows).
   - Model the HARD parts on purpose: the bookable Resource question, Availability
     ownership, and membership as a downstream-owned relationship. Where the language
     cannot express something cleanly, do NOT work around it silently.

3. Primary deliverable: a weaknesses report (spec/graph/ pilot notes or the repo's
   convention) listing every friction point, each mapped to either an existing open
   question in the public repo's open-questions.md or a newly discovered one.

4. Hard constraints:
   - Do not expand beyond the booking slice.
   - Do not modify the public repos' language definitions mid-pilot; collect language
     change proposals in the weaknesses report instead (they are Phase 2 output,
     applied after review).
   - Never add consumer/product names to the public specscore/modelspec/cli repos;
     if a finding must be cited there, genericize it.
   - Run `specscore spec lint` in any repo you touch before committing; commit only
     when asked.

5. When done: summarize (a) what validated cleanly, (b) the weaknesses list,
   (c) proposed language changes with the decision each would amend, and
   (d) whether Phase 3 (graph lint) can proceed or the language needs another pass.
```

## Open Questions

None at this time — open architectural questions live in
[open-questions.md](../open-questions.md).

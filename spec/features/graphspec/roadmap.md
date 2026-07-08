# GraphSpec Roadmap

Phase sequence for taking GraphSpec from bootstrap to v1. Phases validate the
language against real consumer domains before widening scope; each phase is expected
to expose weaknesses, not to showcase the language.

Later phases reference the first consumer's domains (Bookius, Family Identity /
Family Card, the wider Sneat graph). Those graphs live in the consumer's own
repositories; only the language changes they motivate land here.

## Completed

### Phase 1 — Architecture review (2026-07)

Deep review of GraphSpec, ModelSpec, and their integration before populating any
graph. Outcome: decisions
[0003](../../decisions/0003-one-structural-language.md)/[0004](../../decisions/0004-graphspec-kind-admission.md)/[0005](../../decisions/0005-graphspec-id-and-reference-syntax.md)
(one structural language; five kinds with an admission rule; ID/reference/file-naming
syntax), ModelSpec decisions 0012/0013 (GraphSpec-as-consumer; named enums), the v0.2
language tree in this directory, restaged CLI specs, and the
[review report](reviews/architecture-review-2026-07.md) /
[lessons learned](lessons-learned.md).

### Phase 2 — Bookius pilot (2026-07, completed)

Validated the refined language with one booking-domain slice in the consumer's
repository, authored strictly against v0.2 conventions and run as a falsification
exercise (see the [Phase 2 handoff](continuations/phase-2-handoff.md) for the
brief). Outcome: the five-kind model, derived ownership, downstream relationship
ownership, and one-directional command→event links all validated cleanly; the
pilot's friction report drove decisions
[0006](../../decisions/0006-graphspec-model-source-location.md) (model-source
location, identity by placement, prose pairing) and
[0007](../../decisions/0007-modelspec-reference-resolution.md) (reference
resolution), ModelSpec decision 0014 (module-qualified references), and normative
tightenings of the relationship `metadata:`, command `inputs:`, and event `sources`
rules. One known validation gap is deliberately deferred (lifecycle states vs the
model's status property — revisit before code generation).

## Next

### Phase 3 — `specscore graph lint` (unblocked, not started)

Implement the v0.2 tooling surface in `specscore-cli`, in this order: `graph lint`
(rules: id-equals-filename-stem, id-kebab-case, no-module-prefix-in-id,
reference-resolves, model-ref-resolution per decision 0007, ownership-derivable +
no-owner-field, dependency-direction including model-level references,
relationship-owner-depends-on-endpoints, metadata/inputs/sources shapes), then
`graph new` (with module scaffolding: collection dirs + READMEs + `models/`), then
`graph list` and `graph refs`. Acceptance target: the Phase 2 pilot graph lints
clean, and seeded violations of each rule are caught.

## Deferred

### Phase 4 — OpenVaultDB validation

Exercise ModelSpec end-to-end with its primary non-SpecScore consumer: publish a
pilot ModelSpec module and confirm OpenVaultDB can consume it (schema validation,
backend mapping) without any GraphSpec or SpecScore dependency. Guards the
independence promise of ModelSpec decision 0012.

### Phase 5 — Family Identity / Family Card validation

Second consumer domain, deliberately different in shape from booking
(person-centric identity and relationships rather than resource reservation). Also
serves self-hosting milestone 5 (a second example from an unrelated domain).

### Phase 6 — Wider consumer graph

Populate the consumer's remaining domains module by module, only after Phases 2–5
have stabilized the vocabulary. Expect cross-repo graph roots to become a real
requirement here (extending the `source-references` `@{host}/{org}/{repo}`
convention per decision 0005).

### GraphSpec v1

Freeze the core vocabulary; separate normative rules from rationale; evaluate
self-hosting against the milestones in [BOOTSTRAP.md](BOOTSTRAP.md). GraphSpec stays
in this repository permanently as a SpecScore component — the previously planned
extraction to its own repository was dropped by
[decision 0008](../../decisions/0008-graphspec-is-a-specscore-component.md).

## Open Questions

None at this time — phase-scoping questions live in
[open-questions.md](open-questions.md).

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

## Current

### Phase 2 — Bookius pilot

Validate the refined language with one focused booking-domain slice in the consumer's
repository, authored strictly against v0.2 conventions: five kinds, bare IDs,
unsuffixed filenames, derived ownership, `dependsOn`, one-directional command→event
links, and at least one real ModelSpec model referenced via `modelspec://`. The pilot
is a stress test — its job is to expose weaknesses in GraphSpec and ModelSpec, and
every weakness found feeds back into the language before scope widens. The broader
consumer graph is intentionally NOT expanded in this phase. See the
[Phase 2 handoff](continuations/phase-2-handoff.md).

## Next

### Phase 3 — `specscore graph lint`

Implement the v0.2 validation surface in `specscore-cli`: `graph new`, `graph lint`
(rules: id-equals-filename-stem, id-kebab-case, no-module-prefix-in-id,
reference-resolves, ownership-derivable, dependency-direction,
relationship-owner-depends-on-endpoints), `graph list`, `graph refs`. Validate the
Phase 2 pilot mechanically; wire `modelspec://` resolution to ModelSpec validation
where available.

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
self-hosting against the milestones in [BOOTSTRAP.md](BOOTSTRAP.md); extract
GraphSpec to its own repository (as ModelSpec was) with migrated decision records.

## Open Questions

None at this time — phase-scoping questions live in
[open-questions.md](open-questions.md).

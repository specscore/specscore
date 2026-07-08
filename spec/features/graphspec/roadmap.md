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

### Phase 3 — `specscore graph` tooling (2026-07, completed)

Implemented the v0.2 tooling surface in `specscore-cli`: `graph new` (module
scaffolding with collection dirs + READMEs, retired kinds rejected with a pointer
to ModelSpec), `graph lint` (18 `graph-*` rules covering IDs/kinds/ownership,
inline-structure rejection, reference and `modelspec://` resolution per decision
0007, dependency direction including HCL-level references,
relationship-owner-covers-endpoints, metadata/inputs/sources/lifecycle shapes, and
duplicate artifact/module/concept detection per decision 0009), `graph list`, and
`graph refs --transitive`. ModelSpec sources are parsed with `hashicorp/hcl/v2`;
graph-root discovery reuses the same repo-config module resolution as the
idea/feature walkers (no GraphSpec-specific configuration). Both acceptance
targets met: the Phase 2 pilot graph lints clean, and seeded violations are
caught. `--fix` is deliberately omitted until a rule specifies fix semantics.

### Phase 5 — Family Identity / Family Card validation (2026-07, completed)

Third consumer domain, deliberately different in shape from booking and storage
(person-centric identity and relationships). Outcome: zero language changes
needed, lint-clean on first pass under the released CLI — and the sharpest
findings yet, because this was the first domain to routinely put same-kind
artifacts on both relationship endpoints and to model consent. Findings recorded
as [v0.3 candidates](open-questions.md): role-labeled endpoints/participants (the
one candidate language change), a home for policy/invariants, and derived
model-property edges in tooling (association-object promotion hides endpoint
edges from `graph refs`). Verdict: ready for broader consumer adoption, with the
v0.3 questions to be settled before permission-heavy modules. Also served
self-hosting milestone 5. The full friction report (FA1–FA7, including a CLI
hardening list) lives in the consumer repository's pilot notes.

## Next

The next phase is not yet committed; the deferred items below are the candidates
— the v0.3 design questions and the phases gated on real consumer demand.

## Deferred

### Phase 4 — OpenVaultDB standalone-consumption validation

Exercise ModelSpec end-to-end with its primary non-SpecScore consumer: publish a
pilot ModelSpec module and confirm OpenVaultDB can consume it (schema validation,
backend mapping) without any GraphSpec or SpecScore dependency. Guards the
independence promise of ModelSpec decision 0012. *(Distinct from the OpenVaultDB
GraphSpec pilot shipped 2026-07-08, which validated GraphSpec reusability inside
a SpecScore-managed tree — this phase validates the opposite seam and remains
open.)*

### Phase 6 — Wider consumer graph

Populate the consumer's remaining domains module by module, only after the
completed pilots' vocabulary has stabilized and the v0.3 candidates are settled.
Expect cross-repo graph roots to become a real requirement here (following the
URL-based reference rules of decision 0010, per decision 0005's deferral).

### GraphSpec v1

Freeze the core vocabulary; separate normative rules from rationale; evaluate
self-hosting against the milestones in [BOOTSTRAP.md](BOOTSTRAP.md). GraphSpec stays
in this repository permanently as a SpecScore component — the previously planned
extraction to its own repository was dropped by
[decision 0008](../../decisions/0008-graphspec-is-a-specscore-component.md).

## Open Questions

None at this time — phase-scoping questions live in
[open-questions.md](open-questions.md).

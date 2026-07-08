---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: ModelSpec Reference Resolution In SpecScore Trees

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, modelspec, references, resolution, cross-repo
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

Two reference forms needed a resolution rule:

1. GraphSpec's `model:`/input references — `modelspec://<module>.<Name>`
   ([decision 0005](0005-graphspec-id-and-reference-syntax.md) defined the scheme;
   [decision 0006](0006-graphspec-model-source-location.md) defined local module
   identity by placement).
2. ModelSpec's own module-qualified names *inside* HCL sources
   (`entity = "core.Space"`, `component = "scheduling.TimeWindow"` — ModelSpec
   decision 0014), whose resolution is explicitly consumer-provided so that
   ModelSpec never depends on SpecScore.

SpecScore already has one cross-reference model: path-based identity with an
optional `@{host}/{org}/{repo}` suffix, resolved from git remote and
`specscore.yaml` (the Stable `source-references` feature; related-project navigation
via the repo-config `projects:` list). Decision 0005 committed GraphSpec to reusing
that model rather than inventing another.

## Decision

SpecScore acts as the ModelSpec **resolver** for both reference forms, using one
rule.

### Grammar

```text
modelspec://<module>.<Name>[@{host}/{org}/{repo}]
```

`<module>` is a module short name (per decision 0006, equal to a graph module
directory name); `<Name>` is a ModelSpec concept name (entity, component, or enum).
The optional suffix is byte-for-byte the `source-references` cross-repo suffix.
Qualified names inside HCL sources have the same `<module>.<Name>` shape without
scheme or suffix — cross-repo model composition is expressed at the graph layer,
not inside model sources.

### Resolution order

For a reference occurring in a repository's graph tree (or in a model file within
it):

1. **Local graph root.** Resolve `<module>` to `modules/<module>/models/` in the
   same graph root (decision 0006). This is the only step for suffix-less
   references in v0.2's single-root world.
2. **Configured related projects.** If not found locally, consult `specscore.yaml`
   `projects:` entries that are local paths: each names a SpecScore-managed
   directory whose graph root is searched by the same rule. First match wins;
   ambiguous matches across projects are an error, not a preference.
3. **Explicit cross-repo suffix.** A reference carrying `@{host}/{org}/{repo}`
   resolves against that repository's graph root. Tooling resolves it only when
   that repository is locally available (checked out or vendored at a configured
   path); v0.2 tooling MUST NOT fetch over the network implicitly. An unavailable
   suffixed target is reported as *unresolved (repository not available)* —
   distinct from *not found*.

A reference that exhausts the applicable steps is an unresolved-reference error.

### SpecScore as ModelSpec's consumer-resolver

When SpecScore tooling validates ModelSpec sources found in a graph tree, it
supplies the decision-0014 module resolver using steps 1–2 above. Two consequences
become lintable:

- an HCL qualified name whose module cannot be resolved is an unresolved reference;
- a model-level cross-module reference implies a module dependency, which MUST be
  covered by the owning graph module's `dependsOn` — the same rule that already
  governs graph-level qualified references.

### Diagnostics

Resolvers MUST distinguish three failures: unknown module, unknown concept within a
resolved module, and unavailable suffixed repository. All three carry the reference,
the referencing artifact path, and the resolution step reached.

## Rationale

One rule serves both reference forms because both bottom out in the same question —
"which directory holds module X's models?" — which decision 0006 already answers by
placement. Reusing the `source-references` suffix and the repo-config `projects:`
list means no new configuration surface, no registry, and no second linking
convention to keep consistent with the first. The no-implicit-network stance keeps
`graph lint` deterministic and CI-safe; explicit availability is a repo-management
concern, not a resolver concern.

Making model-level dependencies count against ModuleSpec `dependsOn` closes a
loophole: without it, a module could smuggle in a dependency through its model that
its graph declaration denies.

## Declined Alternatives

### A ModelSpec module registry or lockfile

Rejected for v0.2: heavy machinery ahead of need; placement + configured projects
cover the single-root and monorepo cases the roadmap actually has before Phase 6.
Revisit when cross-repo graphs become real (roadmap Phase 6).

### URL-based references (`modelspec://github.com/org/repo/...`)

Rejected: mixes location into identity; the suffix convention already separates the
two, consistently with `source-references`.

### Implicit network fetch during resolution

Rejected: non-deterministic lint, CI surprises, and a supply-chain surface — all for
a convenience that a checkout or vendored path provides explicitly.

### Qualified names in HCL carrying the `@` suffix

Rejected: model sources must stay consumer-neutral (ModelSpec decision 0014);
cross-repo composition is a tree-level concern expressed by graph references and
configuration, not inside the language.

## Consequences at Decision Time

- Phase 3 (`specscore graph lint`) is unblocked: pilot frictions F1 and F2 are now
  fully specified (F6 was closed by decision 0006).
- `graph lint` gains rules: `graph-model-ref-resolves` (three-way diagnostics) and
  the extension of dependency-direction checking to model-level qualified
  references.
- The CLI graph validation spec should reference this decision for resolution
  semantics; remaining pre-Phase-3 items are the small spec edits from the pilot
  list (metadata shape, zero-artifact modules, inputs shape, `graph new`
  scaffolding).
- ModelSpec itself is unchanged by this decision; it defines syntax and semantics
  (its decision 0014), SpecScore supplies this resolver.

## Observed Consequences

- 2026-07-08: examples pseudonymized to the neutral domain (errata — the public
  standard names no private consumer; no semantic change to the decision).

## Affected Features

- graphspec
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

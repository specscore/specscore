# GraphSpec TODO

Items resolved by the Phase 1 review (2026-07-08) are removed: metadata envelope,
ID/reference syntax, file naming, RelationshipSpec and PropertySpec first-class
status, ownership representation, and command-event link direction — see decisions
[0003](../../decisions/0003-one-structural-language.md),
[0004](../../decisions/0004-graphspec-kind-admission.md), and
[0005](../../decisions/0005-graphspec-id-and-reference-syntax.md).

## Before Phase 3 (`graph lint`) — from the first consumer pilot (2026-07-08)

All pilot blockers are resolved — Phase 3 is unblocked:

- ~~Canonicalize the model-source location and local module identity~~ — [decision 0006](../../decisions/0006-graphspec-model-source-location.md).
- ~~Define `modelspec://` resolution (local, configured projects, cross-repo suffix)~~ — [decision 0007](../../decisions/0007-modelspec-reference-resolution.md).
- ~~Decide cross-module ModelSpec references~~ — ModelSpec decision 0014 (module-qualified names, consumer-provided resolution; SpecScore is the resolver per 0007).

Remaining small spec edits before implementation starts:

- Define the relationship `metadata:` value shape; legalize zero-graph-artifact modules in lint rules; make the command `inputs` shape normative.
- Remove the obsolete alternate core-root location from the CLI `graph new` spec; `graph new` scaffolds `models/` and collection READMEs; CLI validation spec references decision 0007 for `graph-model-ref-resolves` diagnostics.

## Near Term (v0.2)

- Create one valid example for each of the five specification kinds, using bare IDs, unsuffixed filenames, and a `model:` reference to a real ModelSpec model.
- Rewrite the first consumer bootstrap graph against v0.2 conventions (separate phase, in that consumer's own repository; intentionally untouched until then).
- Separate normative rules from rationale and examples in each kind README.
- Define the minimal `graph lint` rule set: id-equals-filename-stem, id-kebab-case, reference-resolves, no-module-prefix-in-id, ownership-derivable, dependency-direction, relationship-owner-depends-on-endpoints.

## Review Preparation

- Use consumer examples as stress tests, not success demos.
- Capture weak spots revealed by cross-module references.
- Author a second consumer example from an unrelated domain (self-hosting milestone 5).

## Later

- Add JSON Schema validation for frontmatter.
- Specify how `graph lint` consumes ModelSpec validation when resolving `model:` references.
- Add diagram generation experiments (value objects and enums appear as derived nodes read from ModelSpec).
- Add TypeSpec and OpenAPI generation experiments only after the core vocabulary stabilizes.
- Define migration and deprecation conventions.
- Specify cross-repo graph roots on top of the `source-references` `@{host}/{org}/{repo}` convention.
- Plan extraction of GraphSpec to its own repository once v0.2 stabilizes.
- Revisit self-hosting milestones.

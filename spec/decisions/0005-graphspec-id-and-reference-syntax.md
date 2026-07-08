---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: GraphSpec Identifier, Reference, and File-Naming Syntax

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, identifiers, references, naming, cross-repo
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The GraphSpec bootstrap left ID and reference syntax undefined, and the first
consumer example immediately diverged: the language docs showed `id: booking` (bare,
kebab-case) while the consumer bootstrap stored module-qualified IDs with
inconsistent casing — PascalCase for entities and commands (`<module>.Booking`,
`<module>.CreateBooking`) but kebab-case for relationships
(`<module>.booking-reserves-resource`) — with the module prefix duplicating the
`owner:` field. File naming was equally split: entity files
carried no kind suffix while every other kind did (`.relationship.md`,
`.command.md`, …), an asymmetry that existed only to dodge the legacy
`*.entity.md` lint glob.

Several documents also cited a "unified SpecScore cross-repo linking system" as
load-bearing, but no such general spec exists; the closest prior art is the Stable
`source-references` feature (code-comment annotations with an
`@{host}/{org}/{repo}` cross-repo suffix).

## Decision

### Local IDs

Every GraphSpec artifact declares a **bare, file-local ID** in lowercase kebab-case:
`booking`, `create-booking`, `booking-created`, `team-member`. The `id` value never
contains a module prefix. Display casing lives in `name:` (`Booking`,
`CreateBooking`, `teamMember`), never in `id`.

### Qualified IDs are computed

The qualified form `<module-id>.<local-id>` (for example `reservations.booking`) is
**computed** from the owning module (derived from directory placement) plus the local
ID. It is the form used in references. It is never stored in the artifact's own `id`
field.

### References

- Graph-to-graph references use the qualified form: `from: reservations.booking`,
  `subject: reservations.booking`, `participants: [identity.team]`.
- Graph-to-ModelSpec references use the `modelspec://` scheme with ModelSpec's own
  naming: `model: modelspec://reservations.Booking`.
- References must resolve within the discovered graph roots; referencing a
  nonexistent module or artifact is a validation error. Speculative targets belong
  in prose, not in frontmatter fields.

### File naming

Consumer graph trees use **plural, kind-typed directories** with **unsuffixed
filenames**: `entities/booking.md`, `commands/create-booking.md`,
`relationships/team-member.md`, `modules/reservations/README.md`. The directory already
types the artifact; kind suffixes are redundant, and the frontmatter `kind:` field
remains the machine-readable type. The filename stem MUST equal the local `id`.

### Cross-repo stance for v0.2

v0.2 supports a **single graph root per repository** (default `spec/graph/`).
Cross-repo graph references are deferred. When they land, they MUST extend the
qualified-ID form with the `@{host}/{org}/{repo}` suffix convention already
established by the Stable `source-references` feature — GraphSpec will not invent a
separate linking scheme. Documents in the GraphSpec family must stop citing a
"unified cross-repo linking system" as if it were already specified.

## Rationale

Bare local IDs plus derived qualification eliminate the owner/prefix duplication and
survive an artifact moving between modules (one `git mv`, no frontmatter edits, no
reference rewrites inside the file itself). One casing rule per field (`id` kebab,
`name` display) removes the per-kind casing drift the bootstrap exhibited.

Unsuffixed filenames are chosen over suffix-everything because the plural directory
plus `kind:` frontmatter already carry the type twice; a third encoding adds typing
noise to every path with no disambiguation payoff. The previous entity-only exception
disappears with decision 0003 (the legacy `*.entity.md` glob no longer constrains
GraphSpec trees, which live outside `spec/features/**` in any case).

Deferring cross-repo resolution is honest scoping: the referenced "unified linking
system" did not exist, and pretending otherwise would have baked an unspecified
dependency into the language core.

## Declined Alternatives

### Stored qualified IDs (`id: reservations.booking`)

Rejected: duplicates ownership (already derived from placement), breaks on module
moves, and invites the casing inconsistencies observed in the bootstrap.

### Kind-suffixed filenames everywhere (`booking.entity.md`, …)

Rejected: grep-ability is real but marginal (`kind:` frontmatter and typed
directories are both greppable), and suffixes triple-encode the type. Uniformity was
the requirement; unsuffixed is the cheaper uniform option.

### A GraphSpec-specific cross-repo link syntax

Rejected: SpecScore already has one cross-repo convention (`source-references`);
a second scheme would fragment resolution logic across the family.

## Consequences at Decision Time

- The GraphSpec kind READMEs and envelope examples change to bare IDs and
  unsuffixed filenames.
- CLI `graph new` output-location and ID-derivation contracts change accordingly.
- The first consumer bootstrap graph does not yet conform; it will be rewritten
  against v0.2 in a later phase rather than patched now.
- `graph lint` needs rules: id-equals-filename-stem, id-kebab-case,
  reference-resolves, no-module-prefix-in-id.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

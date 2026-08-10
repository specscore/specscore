---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Capability Delivery Matrix

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-delivery-matrix?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-delivery-matrix?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-delivery-matrix?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/capability-delivery-matrix?op=request-change) |
**Status:** Draft
**Source Ideas:** —

## Summary

Defines a generated per-CLI matrix that traces every user-facing capability across runtime commands and flags, help, AI skills, and executable tests, so implemented and advertised behavior cannot drift silently.

## Problem

A CLI can implement a capability without teaching agents how to use it. A skill
can retain a command or flag the binary no longer accepts. Root help can
advertise a “global” flag that descendants parse but ignore. All three surfaces
look individually plausible, and ordinary unit tests rarely compare them.

The existing Capability `Implementation Matrix` answers a different question:
which platforms implement one platform-agnostic behavior. It is
author-maintained and intentionally does not prove runtime/help/skill delivery.
CLI delivery needs a complementary, executable traceability view rather than
more status prose in each product's documentation.

## End-to-End Journey

> “I open one view for a CLI and see every capability, its command and flags,
> whether help explains it, whether AI skills teach it, and which test proves
> it. If any surface drifts, CI names the exact missing or stale link.”

| Stage | Observable good result |
|---|---|
| Declare | A stable capability ID links product/spec intent to the CLI binary without duplicating the Feature body. |
| Discover runtime | The CLI exports its real command/flag tree and applicable scopes from the same registry used to execute commands. |
| Trace delivery | Help topics, AI skill markers/examples, and executable tests reference the same capability ID. |
| Generate | One deterministic matrix displays Runtime, Help, AI Skill and Tests as Full/Partial/Planned/Absent with limitations. |
| Enforce | CI rejects missing runtime/help/skill/test coverage, stale examples, ignored advertised flags, duplicate IDs, or a hand-edited generated view. |
| Aggregate | A tool such as WB combines compatible per-CLI manifests into a fleet view without becoming the source of capability truth. |

**Divergent epilogues.** A fully delivered capability has runtime, help, skill
and tests at Full. A deliberately incomplete capability remains Partial with a
machine-readable limitation. Planned/Absent capabilities are visible but MUST
NOT leak into runtime help or skills as usable commands.

## Behavior

### One manifest per CLI binary

A CLI repository publishes one machine-readable manifest per binary, by
default at `spec/capabilities/<binary>.json`. Repository configuration may
declare another path for monorepos. Every manifest MUST conform to the
published [CLI Capability Delivery JSON Schema](/new/cli-capability-delivery.schema.json).
The required top-level fields are `$schema`, `schema_version`, `binary`, and
`capabilities`; unknown fields are rejected. Each capability contains:

- binary/product identity and manifest schema version;
- stable capability ID and optional SpecScore Feature/AC references;
- runtime command paths, flags, applicability and support limitations;
- help topic/command anchors;
- AI skill package/path plus capability marker and example anchors;
- executable test file/name or conformance-scenario references; and
- nullable `since` and `notes`, plus optional `deprecated` and `replacement`.

The manifest contains no generated timestamps or local paths, so identical
inputs produce byte-identical output. Capability IDs are namespaced to the
binary, for example `wb.worktree.abort` or `specscore.lesson.occurrence.add`.
The `$schema` value is the exact published schema URL. Capability IDs MUST begin
with `<binary>.`; they are unique and sorted by ID. Every evidence path is
repository-relative and cannot contain `..`; every surface has an explicit
`Full`, `Partial`, `Planned`, or `Absent` status. `Full`/`Partial` surfaces
require evidence, non-Full surfaces require a limitation, and
`Planned`/`Absent` surfaces contain no usable command, help, skill, or test
evidence.

### Delivery surfaces and status

Each capability has four surface statuses using the existing SpecScore parity
vocabulary:

| Surface | Full means |
|---|---|
| Runtime | The declared command/flag behavior is implemented for every declared applicable command. |
| Help | Built-in help names syntax, effects, support scope and limitations. |
| AI Skill | An installed/source skill teaches the supported journey with parseable examples and lifecycle/safety rules. |
| Tests | Executable behavior/conformance tests prove runtime and drift checks, including negative/unsupported cases. |

`Partial` requires a non-empty limitation and exact supported scope. `Planned`
has a spec but no usable runtime/help/skill claim. `Absent` is an explicit
product decision. The displayed overall result is derived as the weakest
required surface; authors do not hand-promote it.

### Runtime and help discovery

The executable or its build-time command registry exports a normalized JSON
command tree containing command paths, flags, inheritance/applicability,
defaults, aliases, visibility/deprecation, and capability IDs. Built-in text
help is generated from or checked against that same registry.

A flag may be described as global only when it affects every applicable
descendant. If behavior is command-scoped, it lives on those commands or the
manifest/help names the exact scope. Merely accepting/parsing an ignored flag is
an error, not Partial support. Global-flag conformance exercises every
applicable descendant or a declared shared behavior hook plus negative
exceptions.

### AI skill traceability

Each source skill publishes its covered capability IDs in machine-readable
frontmatter or a companion manifest. Command examples are extracted and parsed
against the normalized command tree; supported examples may also execute in an
isolated fixture. A skill reference proves coverage only when the capability
marker and at least one relevant journey/example are present.

Skills document the current support state and limitations. They do not teach a
Planned/Absent command as usable, and they include terminal lifecycle/safety
behavior where the CLI mutates repositories, branches, worktrees, remote state,
or private archives.

### Generated matrix and checking

The generated human view has one row per capability and columns:

```text
Capability | Runtime | Commands/Flags | Help | AI Skill | Tests | Limitations
```

Generation sorts by capability ID and is a no-op on a second run. The checker
fails in both directions:

- a public runtime command/flag/capability is missing from the manifest;
- Full runtime lacks current help, skill or executable test evidence;
- help or a skill advertises a missing, renamed, unsupported, or ignored
  command/flag;
- a global flag lacks behavior coverage for an applicable descendant;
- an example does not parse or contradicts declared support scope;
- references are missing/ambiguous, statuses invalid, or generated output
  differs from the manifest and discovered command tree.

The checker reports capability, surface, command/flag and evidence path without
rewriting author-declared support. An explicit `--fix` may regenerate only the
derived matrix/snapshots; it never changes support status or invents skills.

### Fleet aggregation

Per-CLI manifests remain authoritative in their owning repositories. Fleet
tools MAY aggregate manifests into project/organization views, filter missing
surfaces, and link to repository evidence. Aggregation labels stale/unavailable
source revisions and never edits product manifests. SpecScore defines the
vendor-neutral schema/check; it knows nothing about WB, Synchestra, or a
particular AI harness.

## Acceptance Criteria

### AC: one-view-traces-all-delivery-surfaces

**Given** a CLI with several declared capabilities
**When** its matrix is generated
**Then** every capability has Runtime, Commands/Flags, Help, AI Skill, Tests and
Limitations cells linked to machine-readable evidence, sorted deterministically.

### AC: implemented-capability-missing-from-skill-fails

**Given** a Full runtime capability with built-in help and tests but no skill
marker/example
**When** capability delivery check runs
**Then** it fails the AI Skill surface and the derived overall status cannot be
Full.

### AC: stale-skill-command-fails

**Given** an AI skill example containing a removed command or flag
**When** the checker parses examples against the exported command tree
**Then** it reports the skill/example and stale token even if the prose names a
valid capability ID.

### AC: accepted-but-ignored-global-flag-fails

**Given** root help advertises a global `--filter` and a descendant accepts but
does not apply it
**When** global-flag conformance exercises that descendant
**Then** check fails rather than reporting Runtime/Help as Full; the product
must implement uniform behavior or scope the flag explicitly.

### AC: planned-capability-is-not-advertised-as-usable

**Given** a capability whose Runtime status is Planned or Absent
**When** help and skill inventories are checked
**Then** neither surface may present it as an executable supported journey; a
roadmap reference remains distinguishable from usage guidance.

### AC: generated-matrix-is-repeatable

**Given** unchanged manifest, command tree, skills and tests
**When** matrix generation runs twice
**Then** the second run changes no byte, and hand-edited drift is regenerated or
rejected without changing declared support.

### AC: fleet-view-does-not-own-product-truth

**Given** WB or another aggregator reads several CLI manifests
**When** it displays a combined matrix
**Then** each row identifies repository/revision/evidence and any staleness;
changes still occur only in the owning CLI repository.

## Open Questions

- Should every CLI be required to expose the normalized command tree at a
  common `capabilities --commands-json` path, or may build tooling emit the same
  schema without a public runtime command?
- Should a repository publish one manifest per binary (recommended) or allow a
  single monorepo manifest with binary-qualified capability rows?

---
*This document follows the https://specscore.md/feature-specification*

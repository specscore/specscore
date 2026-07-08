---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: Per-Module Graph Roots

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, discovery, modules, configuration, multi-root
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

Decision [0005](0005-graphspec-id-and-reference-syntax.md) scoped v0.2 to a single
graph root per repository, deferring distribution. The owner subsequently confirmed
the intended end state — a repository whose `specscore.yaml` `modules:` partition
file locations should carry graph roots per module, matching SpecScore's own rule
that "modules partition where files live, not the graph itself" — and asked that
multi-module graphs be covered by tests from the start. Decision
[0008](0008-graphspec-is-a-specscore-component.md) removed the last obstacle:
GraphSpec may reuse SpecScore module configuration directly.

Everything decided since Phase 1 is root-count-agnostic (bare IDs, computed
qualification, ownership by placement, `dependsOn`, the 0007 resolution ladder), so
lifting the constraint is a discovery extension, not a language change.

## Decision

This decision **amends the "single graph root per repository" stance of decision
0005**. Cross-repo distribution remains deferred exactly as 0005 states.

### Graph roots

A repository's graph is the **union of its graph roots**:

- the repository-level root (default `spec/graph/`), and
- one root per configured SpecScore module: the module's spec directory plus
  `/graph` (i.e. `<module.path>/<specs_dir>/graph/`), resolved through the same
  repo-config machinery (`specscore.yaml` `modules:`, `specs_dir_name`) that all
  other SpecScore tooling uses. No GraphSpec-specific configuration is introduced.

Any root may be absent. Every root carries the same uniform layout
(`modules/<graph-module-id>/…`, per decisions 0005/0006) — there is no "compact"
variant where a root is itself a graph module, because SpecScore modules (code
areas) and GraphSpec modules (bounded contexts) are not 1:1.

### Identity and resolution across roots

- GraphSpec module IDs MUST be unique across the union; a duplicate is a lint error
  reporting both paths.
- Qualified IDs and `modelspec://` references are unchanged in form; resolution
  step 1 of decision 0007 ("local graph root") now searches the union. Steps 2–3
  (configured projects, explicit cross-repo suffix) are unchanged.
- Ownership, `dependsOn`, and relationship rules are unchanged — they were already
  root-agnostic. Cross-root references within one repository are ordinary qualified
  references gated by `dependsOn`, requiring no suffix.

### Tooling

Graph tooling MUST discover and process all roots; a graph tree that exists under a
configured module but is not processed is a silent-ignore hazard and explicitly
forbidden. Multi-root behavior MUST be covered by tests from the first
implementation (union discovery, cross-root references, duplicate-module-ID
detection).

## Rationale

The constraint was sequencing, not architecture, and the cost of lifting it dropped
to near zero once 0008 licensed direct reuse of `specscore.yaml` module paths.
Doing it before the first lint implementation hardens is strictly cheaper than
retrofitting: discovery is being written now, and a 100%-coverage test suite built
around single-root assumptions would tax the later change. The feature-graph
precedent ("unified across modules") makes any other behavior surprising.

## Declined Alternatives

### Keep single-root until a monorepo consumer arrives

Rejected by the owner: at minimum, multi-module graphs must be tested now.
Implementing the minimal union (rather than testing unimplemented behavior or
pinning a silent-ignore) is the smallest honest way to satisfy that.

### A `graph_roots:` configuration key

Rejected: duplicates what `modules:` + `specs_dir_name` already express; decision
0008 makes reuse the default posture.

### Compact layout (a module's root is itself one graph module)

Rejected: layout variants breed discovery bugs and doc ambiguity; the code-area vs
bounded-context distinction means the mapping is not reliably 1:1.

## Consequences at Decision Time

- The in-flight Phase 3 implementation extends discovery to the union and adds
  multi-root fixtures/tests (union discovery, cross-root reference, duplicate
  module ID).
- GraphSpec docs drop the "single root per repository" phrasing in favor of "the
  repository's graph roots (repo-level plus per-module), unified".
- The intra-repo multi-root open question is resolved; only cross-repo
  distribution remains deferred.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

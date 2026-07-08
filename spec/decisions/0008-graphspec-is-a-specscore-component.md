---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: GraphSpec Is A SpecScore Component, Not A Standalone Standard

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** graphspec, positioning, configuration, reuse, scope
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

The GraphSpec bootstrap carried an ambiguity: it described GraphSpec both as "an
independent reusable specification language" and as "part of the SpecScore family".
ModelSpec resolved the same question in the opposite direction — it is deliberately
independent, adoptable without SpecScore (its decisions 0012/0014 protect that).
GraphSpec's roadmap even carried a v1 item to extract it to its own repository, as
ModelSpec was.

Independence has real costs: a standalone GraphSpec would need its own
configuration surface, its own root-discovery mechanism, its own linkage and
lifecycle conventions, its own distribution — all machinery SpecScore already has.
Decisions 0007 (resolution via `specscore.yaml` `projects:` and the
`source-references` suffix) and the planned per-module graph roots (discovery via
`specscore.yaml` `modules:`) already lean on SpecScore configuration; the owner has
confirmed there is no intended adopter of GraphSpec outside SpecScore.

## Decision

GraphSpec is a **component of SpecScore**, not a standalone standard.

1. **Free reuse of SpecScore machinery.** GraphSpec MAY depend on and reuse
   SpecScore concepts and configuration without abstraction layers: `specscore.yaml`
   (`modules:` paths for graph-root discovery, `projects:` for resolution), the
   `source-references` linkage model and cross-repo suffix, artifact conventions
   (statuses, adherence footers, managed sections), and the shared lint/CLI/Studio
   infrastructure. "GraphSpec requires SpecScore" is now a feature, not a smell.
2. **No extraction.** The roadmap item to move GraphSpec to its own repository is
   dropped. GraphSpec lives in this repository permanently; its specification may
   later move within the repo (e.g. out of `spec/features/graphspec/` if
   self-hosting ever happens), but not out of it.
3. **The layering rule is unchanged.** GraphSpec still sits below FeatureSpec:
   it owns domain vocabulary, FeatureSpec references it, and GraphSpec never
   depends on FeatureSpec *semantically*. Depending on SpecScore's infrastructure
   is not the same as depending on the feature layer's content.
4. **Consumer-neutrality is unchanged.** GraphSpec being SpecScore-bound does not
   make it consumer-specific: normative examples stay in the neutral domain and
   private consumers stay unnamed in this repository.
5. **ModelSpec is unchanged.** ModelSpec remains independent of SpecScore *and* of
   GraphSpec; nothing here weakens its decisions 0012/0014.

## Rationale

Every mechanism GraphSpec would need to be standalone already exists in SpecScore,
and the pilot showed the integrations falling out naturally when reuse is allowed
(0006 placement identity, 0007 resolution, multi-root discovery via `modules:`).
Standalone positioning would tax every future decision with "but what if someone
uses GraphSpec without SpecScore?" — a hypothetical with no user behind it. ModelSpec
is different in kind: it has a real non-SpecScore consumer (OpenVaultDB) and a
genuinely portable artifact (a data model); a domain graph, by contrast, is only
useful woven into the specification system that references it.

## Declined Alternatives

### Standalone GraphSpec (own repository, domain, distribution)

Rejected: costs (duplicate config, discovery, linkage, conventions) with no
identified adopter. Escape hatch preserved: GraphSpec artifacts are plain Markdown
with YAML frontmatter, so extraction remains *possible* later if real external
demand materializes — this decision spends nothing that cannot be recovered.

### Abstraction seams "just in case" (pluggable config/resolution interfaces)

Rejected: speculative indirection is the same failure mode as speculative kinds
(decision 0004's accretion argument, applied to architecture instead of vocabulary).

## Consequences at Decision Time

- Roadmap v1 loses the extraction item; TODO and open questions drop the
  "own repository" entries.
- Future features (per-module graph roots, cross-repo graphs) are specified
  directly against `specscore.yaml` semantics rather than a GraphSpec-owned
  configuration concept.
- The self-hosting question narrows to "should GraphSpec's definition be expressed
  in GraphSpec terms" (a documentation question), no longer entangled with
  packaging.
- The Phase 2 handoff and Phase 1 review report retain their original wording as
  historical records; this decision supersedes their forward-looking extraction
  notes.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec

---
*This document follows the https://specscore.md/decision-specification*

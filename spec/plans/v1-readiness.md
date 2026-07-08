---
format: https://specscore.md/plan-specification
status: Draft
---
# Plan: V1 Readiness

**Status:** Draft
**Source Feature:** graphspec
**Date:** 2026-07-09
**Owner:** alexander.trakhimenok
**Supersedes:** —

## Summary

Executes the accepted recommendations of the
[public readiness review 2026-07](../features/graphspec/reviews/readiness-review-2026-07.md)
across the ecosystem (SpecScore core, GraphSpec, the policy kind, ModelSpec, the
reference CLI). The review's verdict — *ready for public preview, not beta, not
v1* — defines two gates: Phase A (must-fix before announcing a public preview)
and Phase B (before declaring v1). Strategic sequencing and success criteria live
in the repository [ROADMAP](../../ROADMAP.md); this plan carries the work items.

## Approach

Phase A is hygiene and honesty: nothing in it changes language semantics, so it
can ship in days and unblocks the public preview announcement. Phase B is
evidence and governance: it makes the standard independently implementable
(conformance corpus), proves the value proposition (generator, standalone
consumer, independent author), and makes governance multi-party. Phase B tasks
are ordered so evidence-producing work (generator, pilots) starts early — it has
the longest feedback loops and the highest chance of forcing language errata.
Items the review deferred to v2 are listed at the end for the record and are
explicitly out of scope here.

## Tasks

### Task A1: Amendment visibility

**Depends-On:** —
**Status:** pending

Add first-class `Amends:` / `Amended By:` frontmatter fields to the Decision
Doc-Kind (spec + lint, bidirectional back-reference enforcement) and apply them:
0009→0005, 0010→0007 (and 0003/0005 reference-syntax examples), 0013→0004. Every
Approved decision whose effective meaning was later amended must carry a banner
pointing forward, so the readable state matches the latest state.

### Task A2: Formal errata process and durable immutability

**Depends-On:** —
**Status:** pending

Specify an errata process in the Decision feature: what qualifies (typos,
non-normative example text, broken links) vs what requires supersession or
amendment; who approves; a dated, append-only `## Errata` section distinct from
`Observed Consequences`. Strengthen enforcement from worktree-vs-HEAD to
content-addressable: record a body hash at first approval and verify against it,
so a committed rewrite of an Approved decision is detectable forever.

### Task A3: Decommission the PolyModel public footprint

**Depends-On:** —
**Status:** pending

Archive the public polymodel-org repositories with pointers to ModelSpec; record
the supersession in a ModelSpec decision ("ModelSpec supersedes PolyModel") and
in the archived repos' READMEs; redirect or park polymodel.org. No public
ModelSpec launch while a stale sibling standard by the same author is live.

### Task A4: CLI correctness gate

**Depends-On:** —
**Status:** pending

Fix `idea change-status` reporting success on a transition its own `--fix`
engine silently reverts (violates the Stable lifecycle-transitions contract).
Constrain `lint --fix` idea-status derivation to the target artifact's scope or
make tree-wide effects explicit and opt-in. Fix the lifecycle-transitions doc
drift (`Under Review`, `Archived`-as-status). Delete the duplicated committed
code-graph snapshot.

### Task A5: Honest public surfaces

**Depends-On:** —
**Status:** pending

Mark every aspirational claim as planned (ModelSpec generator targets, schema
publication, unbuilt ApiSpec/UiSpec/TestSpec consumers); verify which ecosystem
domains actually resolve and remove or clearly label dead ones; state on every
public GraphSpec surface that it is a component of SpecScore, not a standalone
standard; label the policy kind provisional (vocabulary subject to amendment
until a second domain exercises it); fix the decisions-index `Accepted` status
drift; align the GraphSpec host feature status with its shipped reality.

### Task A6: Licensing and contribution basics

**Depends-On:** —
**Status:** pending

Decide ModelSpec's normative-text license (align with CC-BY-4.0 or state why
not, with an explicit patent-posture statement for both languages); add
CONTRIBUTING to modelspec and specscore-cli; add a code of conduct and security
policy across all repositories.

### Task B1: Implementation-neutral conformance corpus

**Depends-On:** A1
**Status:** pending

Create a versioned conformance suite in the spec repos (fixtures + expected
verdicts) covering the graph-* rule set and ModelSpec validation, runnable
without the reference CLI's internals; add `_tests/` corpora to the GraphSpec
kinds; publish a normative rule catalog (each rule's semantics in MUST/SHOULD
language, not a one-line description). Exit criterion: a second implementation
could be written and self-verified from spec text plus corpus alone.

### Task B2: One real generator, end-to-end

**Depends-On:** —
**Status:** pending

Build one downstream consumer that generates a working artifact from ModelSpec
sources (candidate: SQL DDL or TypeScript types), exercised against a pilot
graph. This is the first executable proof of the ecosystem's value proposition and
the forcing function for the deferred lifecycle-vs-status seam (first pilot,
finding F3), which must be resolved as part of this task.

### Task B3: Standalone-consumption validation

**Depends-On:** B2
**Status:** pending

Execute the long-deferred independence validation: a consumer ingests a
published ModelSpec module with no SpecScore or GraphSpec dependency (schema
validation, backend mapping). Guards ModelSpec decision 0012's independence
promise with running code.

### Task B4: Independent-author pilot

**Depends-On:** A5
**Status:** pending

An author who did not design the language models a domain of their choosing from
the public docs alone, without designer assistance, and files a friction report.
Cheapest decision-relevant evidence in the whole plan; also the first real test
of onboarding. A second policy-domain pilot rides on this (exercises the clause
vocabulary outside the consent domain; gates any policy-kind freeze).

### Task B5: Governance for more than one person

**Depends-On:** A2
**Status:** pending

GOVERNANCE.md defining decision authority and the path to Approved; CODEOWNERS
gating `spec/decisions/**` and normative feature specs; a second named
maintainer; namespaced decision IDs across the two spec repos (or fully
qualified citation form); versioned `format:` URLs or a `spec-version:` field
with a compatibility policy, so consumers can pin.

### Task B6: Normative consolidation and spec hygiene

**Depends-On:** B1
**Status:** pending

Separate normative rules from rationale and pilot history in the kind READMEs;
publish the ModelSpec JSON Schema and admit the `index` block to the grammar
enumerations; decide cardinality (both languages) and event-`sources` closure;
state policy list conjunction/evaluation semantics and the `is-role` validation
rule; promote `repo-config` out of Draft; specify the legacy entity/property
Doc-Kind migration path with a deprecation date; plan GraphSpec's move out of
`spec/features/` (own top-level home) with URL redirects; replace the
100%-statement-coverage gate with a high threshold plus justified exclusions.

## Out of scope (v2 backlog, recorded by the review)

Cross-repo graph roots; `?ref=` honoring beyond syntax; lifecycle transitions;
union/polymorphic references; per-value enum metadata; multi-target `applies`
and policies as navigation edges; a self-hosting graph for the ecosystem's own
tooling; 50-module scale characterization; feature-side model-reference lint.

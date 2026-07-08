# SpecScore Family Roadmap — the road to v1 and beyond

The family: **SpecScore** (the spec format and process), **GraphSpec** (the
domain-semantics layer — a component of SpecScore), **ModelSpec** (the
independent structural language), and the **reference CLI**.

Where we are: the language design phase is over. Three consumer pilots (booking,
storage, person-centric identity) and an adversarial five-track readiness review
([2026-07](spec/features/graphspec/reviews/readiness-review-2026-07.md)) found no
structural redesign needs. The review's verdict — **ready for public preview, not
beta, not v1** — defines this roadmap. The gap to v1 is not more language design;
it is evidence, governance, and finish.

Work items for the next two milestones are tracked in the
[v1-readiness plan](spec/plans/v1-readiness.md).

---

## Milestone 1 — Public Preview *(next)*

Publish the family openly, labeled experimental, and invite feedback.

**Gate (must all hold before announcing):**

- Every Approved decision whose meaning was later amended carries a forward
  banner (`Amends`/`Amended By` modeled first-class) — the readable record
  matches the latest record.
- A formal errata process exists and immutability is content-addressed —
  normative history is durably auditable.
- The PolyModel public footprint is archived with supersession records.
- No public surface overclaims: aspirational features labeled planned; GraphSpec
  framed as a SpecScore component; the policy kind labeled provisional; only
  live domains referenced.
- The CLI's Stable contracts hold (the `change-status` false-success defect is
  fixed); licensing and CONTRIBUTING exist family-wide.

**Success looks like:** strangers can find, read, and evaluate the standards
without hitting a contradiction, a dead link, or an overclaim — and the first
outside issues/questions start arriving.

## Milestone 2 — v1

Declare the core stable. The review set four headline proofs, in one line:
**one working generator, one independent author, one conformance corpus, one
second maintainer.**

**Gate:**

- **Independently implementable.** A versioned, implementation-neutral
  conformance corpus (fixtures + expected verdicts) and a normative rule catalog
  exist; a second implementation could be built from spec text alone.
- **Value proven end-to-end.** At least one real generator produces a working
  artifact from ModelSpec sources (resolving the deferred lifecycle-vs-status
  seam); a consumer ingests ModelSpec with no SpecScore/GraphSpec dependency
  (the independence promise, executed).
- **Validated beyond the designer.** At least one independent author has modeled
  a domain from the public docs alone and filed a friction report; the policy
  clause vocabulary has survived a second, unrelated domain.
- **Governed for more than one person.** GOVERNANCE.md with defined decision
  authority; CODEOWNERS on normative paths; a second named maintainer;
  namespaced decision citations; pinnable spec versions.
- **Frozen, deliberately.** The v1 freeze set: SpecScore artifact kinds,
  requirement/AC grammar, status vocabulary; GraphSpec's ID/reference/ownership
  core and kind minimum shapes plus `rules:` blocks; ModelSpec's reference
  grammar, serialization boundary, and migration scoping. Explicitly *not*
  frozen at v1: lifecycle representation, cardinality semantics, event-`sources`
  vocabulary, the policy clause set, ModelSpec's primitive/constraint surface.
- The legacy entity/property Doc-Kinds have a specified migration path and a
  deprecation date.

**Success looks like:** an outside team adopts the family for a real project and
ships with it, filing issues against spec text rather than asking the author
what the language means.

## Milestone 3 — Adoption *(post-v1)*

v1 is a starting line. Success beyond it:

- **Ecosystem:** more generators (the advertised targets become real one by
  one); a second independent implementation validated by the conformance corpus;
  Studio as the graphical surface over the same artifacts.
- **Language, only where earned:** the v2 backlog (cross-repo graph roots,
  `?ref=` version honoring, lifecycle transitions, union/polymorphic references,
  multi-target policies, per-value enum metadata) admits items exactly as real
  consumers demonstrate need — the kind-admission discipline extends to every
  vocabulary.
- **Scale:** characterized behavior at 50+ modules; shared-module
  dependency-sink guidance grounded in a real large graph.
- **Self-hosting:** the family's own tooling described by its own graph — the
  standard eating its own cooking.
- **Community:** a contributor other than the founders lands a normative change
  end-to-end through the governance process.

**Success looks like:** the standards outgrow their author — decisions argued by
strangers, extensions proposed from domains the founders never modeled, and the
reference CLI no longer the only implementation that matters.

---

*History: the phase-by-phase design record (Phases 1–5: architecture review,
pilots, tooling, roles, rules & policies) lives in the
[GraphSpec roadmap](spec/features/graphspec/roadmap.md) and
[design-history documents](spec/features/graphspec/README.md). This document is
the forward-looking, family-level view.*

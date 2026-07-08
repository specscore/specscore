# SpecScore Ecosystem — Public Readiness Review — 2026-07

**Date:** 2026-07-09
**Scope:** the whole ecosystem — SpecScore core, GraphSpec (six kinds, including the
policy kind), ModelSpec, and the reference CLI — reviewed for public-adoption
readiness. Hosted here because `reviews/` is the established review
archive; the scope is wider than GraphSpec.
**Method:** five independent review tracks (architecture & layering; per-standard
language maturity; governance & publication; validation evidence; adoption
readiness & five-year maintenance), each conducted from a fresh
independent-maintainer stance with no prior involvement and no instruction to
defend existing decisions, then synthesized. Nothing was changed during the
review.
**Verdict:** **Ready for public preview — not beta, not v1.** (Rationale at the
end.)
**Follow-up:** the accepted work items are tracked in the
[v1-readiness plan](../../../plans/v1-readiness.md) and the repository
[ROADMAP](../../../../ROADMAP.md).

## Executive summary

The conceptual architecture is sound and needs no redesign — every review track
independently reached that conclusion. What stands between this ecosystem and public
standard-hood is not design but **evidence, governance, and finish**: the value
proposition has never been executed end-to-end, no one but the language's
designer has ever authored against it, the normative content is not independently
re-implementable, and the governance would not survive a second contributor. The
honest characterization: *a well-designed standard, brilliantly governed for a
single author, validated as a demonstration rather than as a standard.*

## Architecture

**Strengths.** The ModelSpec/GraphSpec boundary test ("shape changes → ModelSpec;
behavior/boundary changes → GraphSpec") is genuinely usable; the dependency arrow
never points out of ModelSpec; the kind-admission rule
([0004](../../../decisions/0004-graphspec-kind-admission.md)) is the strongest
single governance artifact in the ecosystem; the policy kind passed that rule
legitimately ([0013](../../../decisions/0013-rules-and-policies.md)); the refusal
to build a constraint expression language is design maturity most standards lack.

**Layering corrections.** The policy kind is **not a layer above GraphSpec** — it
is a kind inside it. The correct layering is
`ModelSpec ← GraphSpec (module/entity/relationship/command/event/policy) ←
{FeatureSpec, ApiSpec, UiSpec, TestSpec}` — and three of those four top-layer
consumers do not exist yet; the layer above GraphSpec has never consumed it.

**Weaknesses.** Two live structural surfaces (the frozen-but-undeprecated legacy
entity/property Doc-Kinds beside ModelSpec, with no migration bridge and the
legacy surface more expressive in spots); GraphSpec publicly framed as "a
specification language" while deliberately welded to SpecScore
([0008](../../../decisions/0008-graphspec-is-a-specscore-component.md) is the
right call — the framing must be blunt about it); the `spec/features/` tree
conflating the meta-model, product features, and an embedded language ("Feature:
Feature" and "Feature: GraphSpec" as peers); the PolyModel→ModelSpec absorption
left live public repositories and zero supersession records in either direction.

## Per-standard maturity

| Standard | Verdict | Freeze for v1 | Gate items |
|---|---|---|---|
| SpecScore core | Mature (beta-grade) | Artifact kinds, requirement/AC grammar, status vocabulary | `repo-config` out of Draft; decisions-index `Accepted` drift |
| GraphSpec | Experimental, well-governed | ID/reference/ownership core (after amendment banners), four kind minimum shapes, `rules:` blocks | Amendment banners on 0003/0005/0007; conformance corpus; cardinality + `sources` closure; lifecycle stays unfrozen |
| Policy kind | Experimental — do not freeze | Only `rules:` blocks + enum-value fragments | Second-domain pilot; conjunction/evaluation semantics (currently the one hand-waved deferral); `is-role` validation rule |
| ModelSpec | Mature skeleton, experimental typing | Reference grammar (0014/0015), serialization boundary, migration scoping | Publish the JSON Schema; admit `index` to the grammar; cardinality decision |
| CLI | Mature core, hot-spot engine | Read/scaffold/lifecycle verbs, rules registry | `idea change-status` false-success defect; tree-wide `--fix` mutations; graph verbs stay provisional |

Notable cross-cutting finding: **Approved decisions 0003/0005/0007 still present
reference syntax that decision 0010 made a lint error.** An adopter following the
Approved record authors artifacts the linter rejects. "Amends" is real practice
(0009→0005, 0010→0007, 0013→0004) but not a modeled relationship — the corpus's
*latest* state is coherent; its *readable* state is not.

## Governance

Two findings rated blocker for a multi-party public standard:

1. **The advertised "non-negotiable" immutability is neither enforced nor
   process-backed.** The check diffs worktree against HEAD, so a committed edit
   to an Approved decision goes green forever. This is not hypothetical: a
   pseudonymization errata commit edited five Approved decision bodies,
   self-sanctioned, direct to main, the night before this review. The content was
   benign; the precedent and the mechanism are the finding. Needed: a formal
   errata process (what qualifies, who approves, a dated append-only `## Errata`
   block) and content-addressable body hashes verified against the
   first-Approved commit.
2. **Nothing structural survives more than one person.** No GOVERNANCE.md,
   CODEOWNERS, code of conduct, security policy, or second maintainer; the
   decision lifecycle defines *how* a decision becomes Approved but never *who*
   may approve.

Majors: colliding decision-ID space across the two spec repos; unversioned
`format:` identity URLs (consumers cannot pin a spec version); ModelSpec's
normative text under a code license (Apache-2.0) while its sibling uses
CC-BY-4.0; domain liveness (`specscore.org`, `modelspec.org`) unverified while
load-bearing. The CLI's release discipline (semver, human gate, conventional
commits) is the one genuinely mature governance surface.

## Validation evidence

What the pilots legitimately prove: *a graph author working in this ontology,
with this linter, can express booking, storage, and person-centric identity
domains cleanly, and the lint layer is fast and accurate.* What they do not
prove: general-purposeness, independence, or end-to-end usefulness.

- All three pilot graphs share every confound that matters: one author (the
  language's designer), one ecosystem, one toolchain, one day.
- The storage-domain pilot produced no friction report — it is a demonstration,
  so the honest count is **two falsification exercises, not three**.
- **The consumption layer has never run.** No generator, mapper, or consumer of
  the HCL models exists in any repository; the advertised generator targets are
  aspirational; the known lifecycle-vs-status seam (first pilot, finding F3) is
  parked "before codegen" — behind something that does not exist.
- **The ModelSpec independence promise was never executed** (the roadmap's
  standalone-consumption phase remains open); the only named independent
  consumer is a code-free spec repository by the same author.
- The friction→decision loop (pilot findings → decisions
  0006/0007/0012/0013/0014) was genuine language-changing pushback, not
  confirmation theatre — but every resolution was author-closed, same-day, and
  never independently re-validated.

## Remaining risks, ranked

1. **The standard is whatever the Go code does** — no implementation-neutral
   conformance suite; ~150 lint rules' semantics live only in the reference
   implementation; a second implementation cannot be written from spec text.
2. **Unproven value proposition** — zero end-to-end consumption; independence
   claim unexecuted.
3. **Governance is single-human** — immutability breakable and broken; no errata
   process, no second authority.
4. **Readable-state incoherence** — Approved decisions teach rejected syntax.
5. **Evidence confounds** — one author/day/ecosystem; policy vocabulary from a
   single pilot.
6. **Public-surface debris** — PolyModel residue, dual structural surfaces,
   domain sprawl, license split.
7. **CLI defects** — false-success `change-status`; tree-wide `--fix` mutations.

## Recommendations

Tracked as work in the [v1-readiness plan](../../../plans/v1-readiness.md);
summarized:

- **Must resolve before public preview:** amendment visibility
  (Amends/Amended-By + banners on 0003/0004/0005/0007); formal errata process +
  content-addressed immutability; decommission the PolyModel public footprint
  with supersession records; fix the `change-status` false-success defect;
  resolve ModelSpec's license; mark aspirational claims as planned and verify
  domain liveness; frame GraphSpec as a SpecScore component and the policy kind
  as provisional on every public surface; CONTRIBUTING for modelspec and the CLI.
- **Should resolve before v1:** implementation-neutral conformance corpus and a
  normative rule catalog with MUST/SHOULD separation from rationale; execute the
  missing validations (one real generator end-to-end; the standalone ModelSpec
  consumer; one independent-author pilot; a second policy domain); publish the
  ModelSpec JSON Schema; decide cardinality and `sources` closure; state policy
  conjunction semantics and the `is-role` validation rule; GOVERNANCE.md +
  CODEOWNERS + a second maintainer + namespaced decision IDs + versioned format
  URLs; legacy Doc-Kind migration path with a date; promote `repo-config`;
  rehome GraphSpec outside `spec/features/`; soften the 100%-coverage gate;
  remove the duplicated committed code-graph snapshot.
- **Can wait until v2:** cross-repo graph roots; `?ref=` honoring; lifecycle
  transitions; union/polymorphic references; per-value enum metadata;
  multi-target `applies` and policies as navigation edges; a self-hosting graph;
  50-module scale characterization; feature-side model-reference lint.

## Verdict rationale

**Ready for public preview** because the design has survived three domains and an
adversarial five-track review without a single structural-redesign finding — that
clears the bar for publishing openly as an explicitly experimental preview once
the must-fix hygiene list is done. **Not beta**, because beta implies the value
proposition works, and no artifact has ever been generated or consumed by
anything but the author's own linter. **Not v1**, because v1 implies independent
implementability and multi-party governance, and today the standard is not
re-implementable from its text and its strongest invariant was overridden by its
only maintainer the night before this review. The path from preview to v1 is not
more language design — the review tracks were unanimous that the language is done
enough — it is: **one working generator, one independent author, one conformance
corpus, one second maintainer.**

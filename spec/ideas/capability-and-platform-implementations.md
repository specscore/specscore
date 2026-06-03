# Idea: Capability and Platform Implementations

**Status:** Specified
**Date:** 2026-06-03
**Owner:** alexander.trakhimenok
**Promotes To:** capability-and-platform-implementations
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we let one product feature be defined once as a platform-agnostic Capability and realized by several platform-specific Implementations that may live in separate repositories (e.g. datatug-cli, datatug-web) — each tracking its own status and limitations — so feature drift between surfaces is visible and managed instead of silently diverging?

## Context

Products that ship the same feature on multiple surfaces — the motivating case is datatug, with a CLI and a Web UI — try to keep those surfaces at parity but drift apart in practice, for two reasons: technical limitations (a TUI can render a data table but not an interactive graph) and uneven dev resources (one surface gets the feature first, or gets a richer version). Today SpecScore has no first-class way to say "Dashboards is *one* feature; the Web UI ships the rich graph version, the CLI ships a data-only subset, and here is the status of each." A reader of the CLI's spec has no structured pointer to the Web equivalent, and nothing flags that the two have diverged. The drift is real but invisible at the spec layer.

The complicating constraint, confirmed during ideation, is that the platform surfaces frequently live in **separate repositories** (e.g. `datatug-cli`, `datatug-web`), each with its own SpecScore spec tree. So the shared definition and its realizations are not co-located, and any cross-reference or status rollup has to work across repo boundaries — which SpecScore's intra-repo `lint --fix` machinery cannot do on its own. This is the same cross-repo reference problem already parked as out-of-scope in the [entity-and-property-definitions](entity-and-property-definitions.md) Idea (`@import` / `@from`); here it is not optional but central.

The author also resolved three naming/structure questions up front: the canonical thing is a **Capability**; platform-specific docs are **Implementations**; and the spec trees stay **parallel and per-platform** (one tree per surface, possibly per repo) rather than co-located under a single capability folder.

## Recommended Direction

Model the pattern as a **Capability → Implementations** relationship layered on the existing Feature graph, not as brand-new Document Kinds.

A **Capability** is a Feature that defines a surface-agnostic feature once: the job it does, the user value, and the acceptance criteria that must hold *on every platform*. It declares no platform-specific UX. A Capability owns one managed section — the **Implementation Matrix** — a table with one row per platform carrying `platform`, `status`, a one-line `brief`, and a `link` to that platform's Implementation. The matrix is an **index, not a mirror**: it never restates platform behavior, which lives only in the Implementation. This is the boundary that keeps the Capability from bloating and re-drifting.

An **Implementation** is a Feature in a platform's own spec tree (and, per the confirmed constraint, often its own repo: `datatug-cli`, `datatug-web`). It carries a single upward reference field, **`Implements: <capability-url>`**, and an `## Other Platforms` section listing sibling implementations by link. Its body specifies only the *delta* from the Capability — the platform-specific UX, and any criteria the platform tightens, relaxes, or cannot meet (the CLI's "data-only, no graph" limitation is a first-class, documented relaxation, not an undocumented gap).

**Cross-repo is the hard center of this Idea, and the honest MVP scopes around what lint can actually verify.** Within a single repo, `Implements:` is validated bidirectionally and the Implementation Matrix is a `lint --fix`-maintained rollup of implementation statuses — reusing the managed-section idiom proven by `## Referenced by`. Across repos, the canonical lint pass cannot see statuses it cannot read, so for MVP the Capability's matrix is **author-declared** (each cell hand-set or set from CI that fetches sibling repos), and per-repo lint validates only its own half: that an Implementation's `Implements:` URL is well-formed and resolvable, and that the local Capability matrix is internally consistent. Cross-repo *liveness* reconciliation (does the Web repo's declared status actually match what the canonical matrix claims?) is an optional CI check, explicitly deferred — see Open Questions. Choosing author-declared-with-optional-CI over a mandatory cross-repo fetch keeps the pattern usable in the resource-constrained, multi-repo reality that motivated it, and degrades honestly: the matrix can be stale, but staleness is visible and fixable, which is already strictly better than today's invisible drift.

This keeps the surface area small: no new Document Kinds, one new reference type (`Implements`), one new managed section (Implementation Matrix), and a documented convention for parallel per-platform/per-repo trees.

## Alternatives Considered

**Co-locate everything under one capability folder** (`spec/features/dashboards/` with `README.md` + `cli.md` + `web.md` as siblings). This minimizes drift — one folder, one matrix, trivial relative links — and was the recommended structure during ideation. Rejected for this Idea because the confirmed reality is that platform surfaces live in **separate repositories**; co-location is physically impossible across repo boundaries. Co-location remains the right answer when all surfaces *do* share a repo, and the convention should explicitly permit it as the single-repo special case rather than forbidding it.

**New `capability` / `implementation` Document Kinds** (parallel to the proposed `entity` / `property` Kinds). Rejected as premature weight. A Capability is just a Feature with platform-agnostic ACs and a matrix; an Implementation is just a Feature with an upward link. Modeling them as relationships/roles on the existing Feature Kind reuses the entire feature graph, lint, and CLI surface, and avoids a registry change. If real usage shows the roles need divergent schemas, promoting them to Kinds later is a clean follow-on.

**Duplicate the parity matrix in every platform doc** (the author's initial sketch had an "alternative platforms" section in each `cli/dashboards/README.md`). Rejected because it re-creates the exact drift the Idea exists to kill — now N copies of the status table to keep synced across N repos. The Implementation carries only an upward `Implements:` link and a sibling `## Other Platforms` link list; authoritative status lives in exactly one place, the Capability's matrix.

## MVP Scope

One cycle, documented and dogfooded on a single real capability. Define the **Capability** and **Implementation** roles as a SpecScore convention (a Feature with platform-agnostic ACs + an Implementation Matrix is a Capability; a Feature with `Implements: <url>` is an Implementation). Add the `Implements:` reference field and the managed `## Implementation Matrix` section to the spec, with `specscore lint` validating, within a single repo, that `Implements:` resolves bidirectionally and that the matrix rolls up local implementation statuses via `lint --fix`. Document the parallel per-platform / per-repo tree convention, including the single-repo co-location special case. Dogfood it on one real datatug capability (e.g. Dashboards) modeled as a Capability plus a CLI Implementation and a Web Implementation, at least one of which lives in a different repo, to exercise the cross-repo `Implements:` URL path end to end. Cross-repo status reconciliation is left as a manual/CI step in MVP; no new Document Kinds, no `specscore capability` verb beyond what `feature` already gives, no automated cross-repo fetch.

## Not Doing (and Why)

- Verifying actual feature parity from source code — SpecScore tracks *declared* status and limitations, not whether the CLI's dashboard code truly matches the Web's. Code-level parity verification is a product/test concern, out of scope for the spec layer.
- Mandatory cross-repo status fetch/reconciliation at lint time — requires network, auth, and a freshness model across repos. MVP keeps the matrix author-declared (optionally CI-reconciled); automated cross-repo liveness is a deferred follow-on, tracked in Open Questions.
- New `capability` / `implementation` Document Kinds — modeled as roles on the existing Feature Kind for MVP; promote to Kinds only if real usage demands divergent schemas.
- A dedicated `specscore capability` CLI command group — `specscore feature` (list, refs, tree) already covers navigation once `Implements:` is a known reference type; a bespoke verb is premature.
- More than two platforms / arbitrary surface taxonomy — the matrix is an open list of platforms by name; no enumerated platform registry, no per-platform schema. Defer until a third surface (e.g. a mobile app or API) creates real pressure.
- Auto-generating Implementation stubs from a Capability — scaffolding convenience, not core to making drift visible; revisit after the convention proves out.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Cross-repo `Implements:` references (a URL pointing from `datatug-cli`'s Implementation to a Capability in another repo) are workable for authors and stable enough to validate, given the URL can break when the target repo moves or renames. | Author one Capability and two Implementations split across two repos; confirm the URL resolves, survives a target-file rename with a clear lint error, and that authors can write it without copy-paste mistakes in a 2-repo spike. |
| Must-be-true | An author-declared (not auto-rolled-up) Implementation Matrix across repos is still a net win over today's invisible drift — i.e. a hand-maintained matrix that can go stale is acceptable because staleness is at least visible. | Dogfood on datatug Dashboards for one cycle; at cycle end, check whether the matrix reflects reality. Acceptance: drift, when present, is discoverable by reading the Capability alone — no need to open three repos to learn a surface fell behind. |
| Should-be-true | The Capability/Implementation split maps cleanly onto SpecScore's existing Feature graph without a new Document Kind — platform-agnostic ACs on the parent, deltas on the children. | Model 2–3 real capabilities (one simple, one with a documented CLI limitation, one near-parity). Acceptance: each expresses cleanly with `Implements:` + matrix and no field feels forced; if 2+ need schema the Feature Kind can't carry, reconsider Document Kinds. |
| Should-be-true | The matrix-as-index boundary (status + brief + link only, behavior lives in the Implementation) holds under authoring pressure and authors don't smuggle platform detail into the matrix. | Review the dogfooded matrices. Acceptance: no matrix cell exceeds a one-line brief; reviewers can find platform behavior only in the Implementation, never duplicated in the matrix. |
| Might-be-true | Optional CI-based cross-repo reconciliation will be wanted soon enough to design the matrix format for it now (machine-readable cells), rather than purely prose. | Track requests during the first quarter of use. Acceptance: if ≥2 independent users ask "can CI tell me my matrix is stale?", design the reconciliation step; otherwise prose cells suffice. |
| Might-be-true | The `## Other Platforms` sibling-link section on each Implementation earns its keep versus relying solely on the upward link to the Capability (readers can always go up then across). | Observe whether readers use sibling links or always route through the Capability. Acceptance: if the up-then-across path is universally taken, drop the sibling section as redundant in the next iteration. |


## SpecScore Integration

- **New Features this would create:** a `capability-and-implementation` convention Feature documenting the two roles, the `Implements:` reference type, the managed `## Implementation Matrix` section, and the parallel-tree (incl. single-repo co-location) convention.
- **Existing Features affected:** the Feature Document Kind (gains the `Implements:` reference type and Capability/Implementation roles); `specscore feature refs` (teaches it to surface `Implements:` links); `lint --fix` (maintains the Implementation Matrix as a managed rollup within a single repo).
- **Dependencies:** shares the cross-repo reference problem with [entity-and-property-definitions](entity-and-property-definitions.md) (`@import` / `@from`); a shared cross-repo URL-resolution mechanism would benefit both and may warrant its own Idea.

## Open Questions

- How should cross-repo status reconciliation work when the canonical lint pass cannot read sibling repos — author-declared only, CI-fetched, or a published capability registry that Implementations register against?
- When surfaces live in separate repos, which repo owns the Capability — a dedicated shared spec repo, or one platform repo designated canonical — and how is that ownership made discoverable from the Implementations?
- Should `Implements:` references be versioned/pinned (a CLI Implementation implementing v1 of a Capability while Web has moved to v2), or always track the Capability's head?

---
*This document follows the https://specscore.md/idea-specification*

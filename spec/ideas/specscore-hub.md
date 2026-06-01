# Idea: SpecScore Hub

**Status:** Approved
**Date:** 2026-06-01
**Owner:** alex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** depends_on:journal-and-summary

## Problem Statement

How might we give a developer running AI agents across many projects an always-current, cross-project view of what they have worked on, what shipped, and where each project stands — assembled automatically from the activity SpecScore already records, with no manual upkeep and no server?

## Context

A developer running AI agents accumulates dozens of features and hundreds of events across many SpecScore-managed repos — a single working session can produce a full idea → feature → plan → implement → verify → recap stream. The raw material that answers *"what have I been doing, and where does each project stand?"* already exists locally: the activity journal (defined by the [journal-and-summary](journal-and-summary.md) Idea — the date-sharded event store and its rollups) plus the per-feature `_recap/` and `_verify/` artifacts the lifecycle skills produce. What is missing is a curated, cross-project surface over that data. A private, hand-maintained "project hub" repo proved the job is real but the upkeep manual.

This Idea defines the **read/render layer** on top of the journal data layer, and it is deliberately the **free, basic tier** of a value gradient: a richer hosted/managed tier (cross-host live aggregation, team rollups, cost) is a separate future product. This Idea commits only to the free, local, open-source basics and to a stable data contract that makes later promotion possible. It absorbs the open question seeded as `define-recap-artifacts-drift-recap-and-session-recap-storage` (the new "session recap" artifact) and builds on `journal-and-summary` rather than replacing it.

## Recommended Direction

Define **SpecScore Hub** as a free, open-source, **local-only** aggregator that renders two views from data SpecScore already emits — **no new capture, no server**. (a) A cross-project **portfolio**: for each known project, its current status (counts of open / in-progress / done features and plans), recent milestones, open questions, and known spec↔code drift — rolled up from the journal, the spec tree, and the `_recap`/`_verify` artifacts. (b) **Session recaps**: a curated per-session narrative — goal, what shipped, decisions, commits, verification, follow-ups — which is the *new* artifact kind from the drained seed, distinct from the existing per-AC **drift** recap at `spec/features/<slug>/_recap/<sha>.md`.

Hub is a pure projection over existing artifacts: it reads the journal events and the recap/verify outputs and renders Markdown/terminal output. It **builds on** `journal-and-summary` — in particular it relies on that Idea's cross-repo journal aggregation for the multi-project view, and does not reimplement event capture or storage. Stats are strictly **activity and status** derived from event timestamps and lifecycle events (sessions, counts, what shipped, current status) — explicitly **not** token or monetary cost, which is not present in SpecScore's data and is deferred.

The free local Hub reads and writes a **stable data contract** — the session-recap artifact format plus a portfolio-projection schema — designed so a future hosted/managed tier can ingest the *same* artifacts across hosts without redefining them. That two-layer shape (free local basics now; a separate, future hosted server later) is the value gradient and the adoption funnel: the local tier delivers standalone value, and the contract is the seam that a paid tier promotes through. This Idea commits only to the free local layer and the contract; the hosted tier is explicitly out of scope here.

## Alternatives Considered

- **Fold the journal store into Hub (one mega-Idea).** Rejected: `journal-and-summary` is a developed foundation (event store, sharding, stream inference, on-demand rollups). Absorbing it would either discard that design or balloon Hub into an un-shippable mega-Idea spanning storage *and* portfolio *and* session recaps. Keeping Hub as a read layer over the journal preserves single-responsibility.
- **Session recap as a pure on-demand journal projection (no artifact).** Rejected as the default but kept as an open question: a recap that records decisions, scope changes, and follow-ups is curated narrative, not a deterministic rollup of events — it likely earns a durable artifact. The MVP defines the artifact; the projection-only option is revisited if the artifact does not earn its keep.
- **Add cost/$ tracking to the free tier.** Rejected: that data lives in the agent host, not in SpecScore's emissions. Sourcing it means a new host-side capture layer — scope creep, and exactly the kind of capability that differentiates the future paid tier. Free tier ships activity/status; cost is a premium concern.
- **Ship a web UI in the MVP.** Rejected: a hosted visual surface is the premium tier's job and a server commitment. Local Markdown/terminal output proves the value with zero infrastructure.

## MVP Scope

A ~1–2 week spike: a read-only `specscore hub` surface (e.g. `hub status` + `hub recap`) that, across the projects the journal already aggregates, renders (1) a **cross-project portfolio digest** — per project: status counts, last-activity time, open questions, drift flags — and (2) a **session recap** for the most recent working session, assembled from journal events plus that session's commits and `_recap`/`_verify` outputs. No server, no cost metering, no dispatch, no web UI. The spike also pins the **session-recap artifact format and the portfolio-projection schema** as the stable contract. Success = the founder's portfolio and "what I did this session" digest stay current automatically from real agent activity for two weeks with zero manual upkeep. If the first version is not slightly embarrassing, it waited too long.

## Not Doing (and Why)

- A server / hosted backend / SaaS — the free Hub is local-only; a hosted/managed tier is a separate future product
- New capture — Hub only reads the activity journal and the _recap/_verify artifacts that already exist; it never instruments a new data source
- Token/cost tracking — not present in SpecScore's data (it lives in the agent host); deferred to the future premium tier
- Task dispatch / scheduling — Hub is read-only observability; directing work is out of scope
- Cross-repo aggregation mechanics — owned by the journal data layer (journal-and-summary journal.repo); Hub consumes it, never reimplements it
- A web UI — local rendered output (markdown / terminal) for the MVP; visual surfaces are later or premium

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The data SpecScore already emits (journal events + `_recap`/`_verify` artifacts) is sufficient to render a useful, current portfolio + session recap with no new capture. | Dogfood the read layer across the founder's repos for two weeks; judge whether it answers "what did I do / where does each project stand" unaided. |
| Must-be-true | A stable session-recap + portfolio-projection contract can be defined now such that a future hosted tier ingests the same artifacts unchanged. | Sketch the hosted-tier ingestion against the proposed contract; confirm no field is shaped local-only (machine paths, per-repo absolutes) that would force a redefinition. |
| Should-be-true | Activity/status stats alone (timestamps + lifecycle events, no cost) are valuable enough that the free tier stands on its own. | Use the activity-only digest for two weeks; judge whether the absence of cost/$ guts its usefulness. |
| Should-be-true | A free local Hub is a strong enough habit-forming surface to pull users toward a future paid hosted tier. | Founder plus a few early users; observe whether the digest becomes a recurring daily/weekly check. |
| Might-be-true | The session recap warrants its own artifact type (frontmatter + lifecycle) rather than a pure journal projection. | Draft both shapes against a real session; see whether the standalone artifact earns its keep over an on-demand projection. |


## SpecScore Integration

- **New Features this would create:** SpecScore Hub portfolio projection (render cross-project status from the journal + spec tree + recap/verify artifacts); the session-recap artifact + its generator; the stable Hub data contract (session-recap format + portfolio-projection schema). Detailed at spec time.
- **Existing Features affected:** consumes the per-feature `_recap`/`_verify` artifacts produced by the lifecycle skills; should align with `artifact-frontmatter-convention` and the idea/feature lifecycle conventions.
- **Dependencies:** [journal-and-summary](journal-and-summary.md) — the journal data layer; its cross-repo `journal.repo` aggregation must land before Hub's multi-project view is fully usable. Also the recap/verify artifact conventions, and the session-recap-storage question drained from the `define-recap-artifacts-drift-recap-and-session-recap-storage` seed.

## Open Questions

- Is the session recap a standalone artifact (e.g. `spec/recaps/<date>-<slug>.md` or generated content under `_specscore/`) or a projection over the journal? (Drained from the session-recap seed; decide alongside `journal-and-summary` storage.)
- How is a session boundary defined for the recap — time gap, explicit start/stop, per-branch, or per-day? Sessions may span many features or none, and may touch repos that are not SpecScore-managed.
- What is the MVP output surface — terminal render, a generated Markdown digest file, or both?
- What is the minimal field set of the stable contract such that a future hosted tier ingests it unchanged (no machine-local-only fields)?

---
*This document follows the https://specscore.md/idea-specification*

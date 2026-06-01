# Idea: SpecScore Hub

**Status:** Approved
**Date:** 2026-06-01
**Owner:** alex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** depends_on:journal-and-summary, depends_on:recap-artifacts-drift-and-session

## Problem Statement

How might we give a developer running AI agents across many projects an always-current, cross-project view of what they have worked on, what shipped, and where each project stands — assembled automatically from the activity SpecScore already records, with no manual upkeep and no server?

## Context

A developer running AI agents accumulates dozens of features and hundreds of events across many SpecScore-managed repos — a single working session can produce a full idea → feature → plan → implement → verify → recap stream. The raw material that answers *"what have I been doing, and where does each project stand?"* already exists locally: the activity journal (defined by the [journal-and-summary](journal-and-summary.md) Idea — the date-sharded event store and its rollups) plus the per-feature `_recap/` and `_verify/` artifacts the lifecycle skills produce. What is missing is a curated, cross-project surface over that data. A private, hand-maintained "project hub" repo proved the job is real but the upkeep manual.

This Idea defines the **read/render layer** that sits on top of two foundations and is deliberately the **free, basic tier** of a value gradient (a richer hosted/managed tier — cross-host live aggregation, team rollups, cost — is a separate future product). It builds on, and does not replace, two sibling Ideas: [journal-and-summary](journal-and-summary.md) (the activity event-store + rollups — the *data* layer) and [recap-artifacts-drift-and-session](recap-artifacts-drift-and-session.md) (the *artifact* layer that defines the `drift-recap` and `session-recap` document types — frontmatter, storage, lifecycle). Hub **consumes** what those layers produce; it does not define artifacts or capture events. This Idea commits only to the free, local, open-source aggregation/render basics and to a stable *portfolio-projection* contract that makes later promotion possible.

## Recommended Direction

Define **SpecScore Hub** as a free, open-source, **local-only** aggregator that renders two views from data SpecScore already emits — **no new capture, no server, no new artifact definitions**. (a) A cross-project **portfolio**: for each known project, its current status (counts of open / in-progress / done features and plans), recent milestones, open questions, and known spec↔code drift — rolled up from the journal, the spec tree, and the `_recap`/`_verify` artifacts. (b) A **session digest** that surfaces and aggregates the **session-recap** artifacts (defined by [recap-artifacts-drift-and-session](recap-artifacts-drift-and-session.md), produced by a `specstudio:session-recap` skill) across projects, alongside the existing per-AC **drift** recaps at `spec/features/<slug>/_recap/<sha>.md` — Hub *renders and cross-links* those recaps into the portfolio; it does not author or define them.

Hub is a pure projection over existing artifacts: it reads the journal events and the recap/verify outputs and renders Markdown/terminal output. It **builds on** `journal-and-summary` — in particular it relies on that Idea's cross-repo journal aggregation for the multi-project view, and does not reimplement event capture or storage. Stats are strictly **activity and status** derived from event timestamps and lifecycle events (sessions, counts, what shipped, current status) — explicitly **not** token or monetary cost, which is not present in SpecScore's data and is deferred.

Hub owns exactly one new contract: a **stable portfolio-projection schema** (the normalized cross-project rollup it renders). The artifact formats it reads — the journal event format, the `drift-recap`, and the `session-recap` — are owned by `journal-and-summary` and `recap-artifacts-drift-and-session` respectively; Hub does not redefine them. The projection is designed so a future hosted/managed tier can ingest the *same* artifacts plus the projection across hosts without redefinition. That two-layer shape (free local basics now; a separate, future hosted server later) is the value gradient and the adoption funnel: the local tier delivers standalone value, and the projection contract is the seam a paid tier promotes through. This Idea commits only to the free local layer and that projection contract; the hosted tier is explicitly out of scope here.

## Alternatives Considered

- **Fold the journal store into Hub (one mega-Idea).** Rejected: `journal-and-summary` is a developed foundation (event store, sharding, stream inference, on-demand rollups). Absorbing it would either discard that design or balloon Hub into an un-shippable mega-Idea spanning storage *and* portfolio *and* session recaps. Keeping Hub as a read layer over the journal preserves single-responsibility.
- **Hub defines and produces the session-recap artifact itself.** Rejected: the artifact's frontmatter/storage/lifecycle is a *standard* concern owned by the sibling `recap-artifacts-drift-and-session` Idea, and production is a skill concern (`specstudio:session-recap`). Hub folding either in would re-create the journal-mega-Idea mistake at the recap layer. Hub stays a consumer: it renders and cross-links recaps it did not author.
- **Add cost/$ tracking to the free tier.** Rejected: that data lives in the agent host, not in SpecScore's emissions. Sourcing it means a new host-side capture layer — scope creep, and exactly the kind of capability that differentiates the future paid tier. Free tier ships activity/status; cost is a premium concern.
- **Ship a web UI in the MVP.** Rejected: a hosted visual surface is the premium tier's job and a server commitment. Local Markdown/terminal output proves the value with zero infrastructure.

## MVP Scope

A ~1–2 week spike: a read-only `specscore hub` surface (e.g. `hub status` + `hub digest`) that, across the projects the journal already aggregates, renders (1) a **cross-project portfolio digest** — per project: status counts, last-activity time, open questions, drift flags — and (2) a **recent-activity / session digest** assembled from journal events plus the session's commits and the existing `_recap`/`_verify` artifacts (and any `session-recap` artifacts, once `recap-artifacts` lands). No server, no cost metering, no dispatch, no web UI, **no new artifact definitions**. The spike pins only the **portfolio-projection schema** as Hub's stable contract (the recap/journal artifact formats are owned by the sibling Ideas). Success = the founder's portfolio and "what I did this session" digest stay current automatically from real agent activity for two weeks with zero manual upkeep. If the first version is not slightly embarrassing, it waited too long.

## Not Doing (and Why)

- A server / hosted backend / SaaS — the free Hub is local-only; a hosted/managed tier is a separate future product
- New capture — Hub only reads the activity journal and the _recap/_verify artifacts that already exist; it never instruments a new data source
- Token/cost tracking — not present in SpecScore's data (it lives in the agent host); deferred to the future premium tier
- Task dispatch / scheduling — Hub is read-only observability; directing work is out of scope
- Cross-repo aggregation mechanics — owned by the journal data layer (journal-and-summary journal.repo); Hub consumes it, never reimplements it
- Defining or producing recap artifacts — the `drift-recap`/`session-recap` formats are owned by recap-artifacts-drift-and-session, and production is a skill concern; Hub only renders/aggregates them
- A web UI — local rendered output (markdown / terminal) for the MVP; visual surfaces are later or premium

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The data SpecScore already emits (journal events + `_recap`/`_verify` artifacts) is sufficient to render a useful, current portfolio + session recap with no new capture. | Dogfood the read layer across the founder's repos for two weeks; judge whether it answers "what did I do / where does each project stand" unaided. |
| Must-be-true | A stable portfolio-projection contract can be defined now such that a future hosted tier ingests the same artifacts + projection unchanged. | Sketch the hosted-tier ingestion against the proposed projection schema; confirm no field is shaped local-only (machine paths, per-repo absolutes) that would force a redefinition. |
| Should-be-true | Activity/status stats alone (timestamps + lifecycle events, no cost) are valuable enough that the free tier stands on its own. | Use the activity-only digest for two weeks; judge whether the absence of cost/$ guts its usefulness. |
| Should-be-true | A free local Hub is a strong enough habit-forming surface to pull users toward a future paid hosted tier. | Founder plus a few early users; observe whether the digest becomes a recurring daily/weekly check. |
| Might-be-true | Hub can reliably correlate journal events, a session's commits, and recap/verify artifacts into a coherent per-project (and per-session) view without a new capture hook. | Build the projection against two weeks of real activity; check whether events/commits/recaps line up into the right project + session buckets, or whether correlation needs data the producers don't emit yet. |


## SpecScore Integration

- **New Features this would create:** the SpecScore Hub portfolio projection + render surface (`specscore hub status` / `hub digest`) — cross-project status and a session/activity digest rolled up from the journal, spec tree, and recap/verify artifacts; and the stable **portfolio-projection schema**. Detailed at spec time. (No artifact definitions — those belong to recap-artifacts.)
- **Existing Features affected:** consumes the per-feature `_recap`/`_verify` artifacts and the `session-recap`/`drift-recap` types; should align with `artifact-frontmatter-convention` and the idea/feature lifecycle conventions.
- **Dependencies:** [journal-and-summary](journal-and-summary.md) — the activity data layer; its cross-repo `journal.repo` aggregation must land before Hub's multi-project view is fully usable. [recap-artifacts-drift-and-session](recap-artifacts-drift-and-session.md) — the artifact layer defining the `drift-recap`/`session-recap` types Hub renders. (The `define-recap-artifacts-drift-recap-and-session-recap-storage` seed promotes to *that* Idea, not this one.)

## Open Questions

- How does Hub **discover** `session-recap` artifacts, which `recap-artifacts` places in a separate user-configured recap repo (`recaps.repo`) rather than the project tree? (Likely via the same layered-config / `journal.repo`-style resolution.)
- What is the MVP output surface — terminal render, a generated Markdown digest file, or both?
- What is the minimal field set of the portfolio-projection contract such that a future hosted tier ingests it unchanged (no machine-local-only fields)?
- How does Hub define a "session" for its digest given the producing layers may key sessions differently (Hub should consume whatever session identity `recap-artifacts` / the journal settle on, not invent its own)?

---
*This document follows the https://specscore.md/idea-specification*

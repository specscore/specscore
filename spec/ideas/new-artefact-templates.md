# Idea: New Artefact Templates (published at /new/)

**Status:** Implemented
**Date:** 2026-06-05
**Owner:** alex
**Promotes To:** cli-template-runtime-fetch, new-artefact-template-gallery
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we publish one authoritative set of new-artefact templates on specscore.md (/new/) that the CLI can fetch at create-time, so every Idea, Feature, Plan, and Task starts from the same canonical, always-current shape — instead of humans, agents, and the CLI maintaining divergent copies?

## Context

specscore.md is a static docs site built by tools/site-generator/build.js from spec/**/README.md into flat slugs (/feature-specification, /idea-specification…), each with a .md companion for agent/LLM consumption. The CLI already embeds scaffold templates (specscore idea new, feature new, decision, issue, task create) but they ship inside the binary, so updating a skeleton requires a CLI release, and non-CLI users or agents have no canonical place to copy a valid artefact. An established footer convention already points every artefact at https://specscore.md/<type>-specification, so a sibling /new/<type> template namespace is a natural fit. Triggered by the request to publish templates at /new/idea, /new/feature, … with an index page at /new/.

## Recommended Direction

Publish a /new/ template gallery — an index page plus one page per artefact type (idea, feature, plan, task, decision, issue, proposal) — authored as Markdown under spec/new/ and built by the existing site-generator into /new/<type> (HTML) plus a raw /new/<type>.md companion. Each page is an annotated authoring guide: prose explaining the artefact and each field, a filled-in example, and the canonical raw template inside a single clearly-delimited block. The CLI's '… new' verbs fetch the raw companion at create-time, extract the template block, and write the file; an embedded copy ships as offline fallback. One human-readable home for templates keeps agents, humans, and the CLI aligned, and lets template fixes ship without a CLI release. Honest tension to resolve up front: runtime-fetch plus annotated-guide only works if the raw template is mechanically extractable from the prose — a stable delimiter (a single fenced template block) or a raw-only .md companion. Pinning that extraction contract is the non-negotiable Must-be-true; everything else is mechanical.

## Alternatives Considered

- **Copy-paste-only gallery (no CLI integration).** Publish the pages purely for humans/agents to hand-copy. Lost because it leaves the CLI's embedded templates as the de-facto source of truth; the published pages become decoration and rot out of sync the first time a skeleton changes — the "single source" value never materializes.
- **Runtime-fetch of raw-only templates (no prose).** The CLI fetches a bare template with no documentation. Lost because it gives agents and humans no field-level guidance, so you still have to write the docs somewhere else — re-introducing a second copy (template vs. its docs) and the exact drift this idea exists to kill.
- **Generate `/new/*` from the CLI's embedded template assets at build time.** A build step renders the pages from the same templates the CLI ships (the rejected Q2 option). Cleanest single-source story, but rejected in favor of authoring independently in `spec/` for editorial control and to keep the website build decoupled from the CLI binary's internals; the cost is manually syncing the CLI's offline-fallback copy.

## MVP Scope

A two-week slice that proves the publish→fetch→scaffold contract end-to-end for ONE artefact type. Author spec/new/README.md (index) and spec/new/idea.md as an annotated guide with an agreed raw-template delimiter; wire the site-generator to emit /new/ and /new/idea(.md); have 'specscore idea new' fetch /new/idea.md over the network, extract the template block, write the file, and pass 'specscore spec lint' — with an embedded copy as offline fallback. If a live-URL round-trip produces a lint-clean Idea (and the offline path produces an identical file), the contract is proven and the remaining artefact types are mechanical follow-on.

## Not Doing (and Why)

- Generating /new/* from the CLI's embedded templates — pages are authored independently in spec/ per decision, accepting manual sync of the offline-fallback copy
- Localizing /new/ pages into the 7 landing languages — templates are English-canonical for the MVP; i18n is a later concern
- Adding a plan/proposal '… new' CLI verb where none exists today — a /new/ page can ship before its CLI verb; runtime-fetch wiring lands per-type as verbs exist
- A template versioning/pinning scheme — deferred; the MVP fetches latest with an embedded fallback
- Rewriting the existing /<type>-specification pages — /new/ is a new sibling namespace, not a change to the spec pages

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The raw template is mechanically extractable from the annotated page (stable delimiter or raw `.md` companion), so the CLI writes a clean, lint-passing file — not the prose. | Define the delimiter/companion contract; have `specscore idea new` fetch `/new/idea.md`, extract, write, then run `specscore spec lint` on the result and assert it passes. |
| Must-be-true | A create-time network fetch is acceptable in the CLI's UX (latency, corporate proxies, air-gapped machines) given an embedded offline fallback. | Prototype fetch with a timeout + fallback; measure added latency; confirm the offline path produces a byte-identical file to the fetched path. |
| Should-be-true | One annotated page can serve humans, agents, and the CLI at once without the prose bloating the scaffolded file or confusing copy-paste users. | Usability pass: a human and an agent each create an artefact from the page; diff their output against the CLI's output. |
| Should-be-true | Templates change often enough relative to CLI releases that shipping fixes via the website (not a binary release) is genuinely valuable. | Review the git history of the CLI's template assets: how often do skeletons change vs. how often the CLI is released? |
| Might-be-true | A `/new/` namespace improves discoverability and becomes an onboarding entry point that drives CLI adoption. | Post-launch: track `/new/*` traffic and whether those sessions convert to CLI installs. |


## SpecScore Integration

- **New Features this would create:** a "New-Artefact Template Gallery" site feature (`spec/new/` authoring + site-generator routing for `/new/` and `/new/<type>(.md)`); and a "CLI template runtime-fetch" feature (fetch + extract + cache + offline fallback across the `… new` verbs). Exact split TBD at spec time.
- **Existing Features affected:** site-generator (`tools/site-generator/` routing + `site-config.json`); the CLI scaffolders (`idea new`, `feature new`, `decision`, `issue`, `task create`); possibly the adherence-footer convention (add a sibling `/new/<type>` reference).
- **Dependencies:** the existing site-generator build pipeline; the CLI scaffolder internals; the `.md` companion mechanism already used for `/<type>-specification.md`.

## Open Questions

- What exactly does the CLI fetch — the human page's `.md` companion (then extract a delimited block), or a dedicated raw endpoint (e.g. `/new/idea.tmpl` or `/new/idea.raw.md`)? This pins the Must-be-true extraction contract.
- How are templates versioned so a newer published template doesn't produce files that an older CLI's lint rules reject (and vice-versa)?
- Do `plan` and `proposal` get real `… new` CLI verbs as part of this, or do their `/new/` pages ship publish-only until a verb exists?
- Caching policy: TTL, cache location, and offline-fallback freshness — when does the embedded fallback get refreshed relative to CLI releases?

---
*This document follows the https://specscore.md/idea-specification*

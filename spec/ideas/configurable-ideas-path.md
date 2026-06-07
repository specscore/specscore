---
format: https://specscore.md/idea-specification
status: Approved
---

# Idea: Configurable Ideas Path (Module-Level Path Overrides)

**Status:** Approved
**Date:** 2026-06-07
**Owner:** alex
**Promotes To:** —
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we let each module's ideas live where contributors actually find them — without sacrificing SpecScore's predictable, tool-navigable path conventions?

## Context

Raised while ideating on moving spec/ideas/ to the repo root. Two motivations: (1) discoverability — people browse file trees, not READMEs, so ideas hidden under spec/ get missed; (2) ideas are upstream of specs (the funnel into Features), so nesting them inside spec/ overstates their status. SpecScore repos can have multiple modules, each able to own its ideas, so the override must be module-scoped. Today the ideas path is a hardcoded literal: the idea feature's validation MUST rejects any location other than spec/ideas/<slug>.md, and the CLI, skills, and studio all assume spec/ideas/. A partial wiring (some readers honor the override, others don't) would be worse than a fixed convention. Overlaps the existing repo-config specs_dir_name/docs_dir_name overrides, which are repo-wide and name-only — this is finer-grained (per-module, per-kind, full path).

## Recommended Direction

Add a per-module path_overrides block to specscore.yaml whose first key is ideas_path (a path relative to the module root, default spec/ideas). Introduce a single path-resolution contract in the specscore CLI that every reader — CLI, skills, the idea feature's validation, and studio — calls instead of using a hardcoded literal; relocation only ships once all readers route through it. Keep spec/ideas as the global default (non-breaking; opt-in). Ship path_overrides as a generic map so features/plans/decisions can gain their own keys later, but wire only ideas_path in this MVP. Provide an explicit, opt-in relocation command in the specscore-cli repo: specscore migrate ideas --module . --to ideas (moves files, updates the module's path_overrides, never automatic).

## Alternatives Considered

- **Change the global default to `/ideas/`.** Rejected: breaks every existing repo, every studio URL, and every tool that assumes `spec/ideas/`, plus needs a fleet-wide migration — a large blast radius for what is largely a discoverability gain. Opt-in delivers the same value without the breakage.
- **Discoverability-only: add a root pointer / index, move nothing.** Rejected: people browse file trees, not READMEs, so a pointer doesn't actually surface ideas; and it leaves the "ideas aren't specs yet" conceptual concern unaddressed.
- **Extend the existing repo-wide `specs_dir_name` override.** Rejected: it is name-only (rename, can't relocate out of `spec/`), repo-wide (can't differ per module), and renames the *whole* spec tree, not just ideas.
- **Single top-level `ideas_path` key.** Rejected: SpecScore repos can have multiple modules, each owning its ideas, so the override must live in the per-module config block, not a single repo-level key.

## MVP Scope

specscore.yaml accepts module.path_overrides.ideas_path (default spec/ideas); a CLI path-resolver returns the ideas dir for a given module; the idea feature's location validation and the CLI's idea commands resolve through it; specscore migrate ideas --module <m> --to <path> relocates an existing tree and writes the config. Features/plans/decisions stay hardcoded for now.

## Not Doing (and Why)

- Changing the global default — spec/ideas stays the default for every project; this is opt-in only
- Wiring features, plans, or decisions paths — path_overrides is generic but only ideas_path is implemented in this MVP
- Reconciling with the existing specs_dir_name/docs_dir_name overrides — captured as an open question, not resolved here
- Automatic migration — relocation is always explicit via the migrate command, never silent on read

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Every reader of the ideas path (CLI commands, the `idea` feature's location validation, the ideate/sidekick skills, and studio) can be routed through one resolver before relocation is enabled. | Inventory every hardcoded `spec/ideas` literal across the CLI, the skills repo, and studio; confirm each has a single resolution seam. |
| Must-be-true | Studio can locate a module's ideas without breaking zero-config URL discovery (or the cost of parsing `specscore.yaml` per repo is acceptable). | Trace studio's current URL-to-path assumptions for `spec/ideas/`; prototype a config-driven lookup. |
| Should-be-true | Per-module `path_overrides` is acceptable even though repo-config v1 explicitly says per-module overrides are unsupported. | Confirm with the repo-config feature; revise that feature to allow per-module `path_overrides`. |
| Should-be-true | `ideas_path` relative to the module root is the intuitive semantics. | Test a multi-module example (`backend/ideas` vs root `ideas`) and confirm it reads naturally. |
| Might-be-true | Features, plans, and decisions will eventually want the same per-kind override. | Defer; watch for demand before adding keys beyond `ideas_path`. |


## SpecScore Integration

- **New Features this would create:** a path-overrides / path-resolution Feature (the `path_overrides` config schema plus the single resolver contract all tools call); a `specscore migrate ideas` CLI command Feature (lands in the `specscore-cli` repo).
- **Existing Features affected:** `repo-config` (adds per-module `path_overrides`; revisits its "per-module overrides unsupported in v1" stance and the `specs_dir_name`/`docs_dir_name` overlap, including the `spec` vs `specs` default drift); `idea` (its location-validation MUST resolves through the resolver instead of the literal `spec/ideas/`); `source-references` / `studio-toolbar` (URL building must use resolved paths).
- **Dependencies:** `repo-config` (config schema host).

## Open Questions

- Is `ideas_path` resolved relative to the module root or the repo root? (Leaning module root.)
- How does `path_overrides` reconcile with the existing repo-wide, name-only `specs_dir_name`/`docs_dir_name` — supersede, coexist, or fold them in? And the documented `specs` default conflicts with the lived `spec/` convention (drift to resolve).
- Does studio keep zero-config path discovery, or must it parse `specscore.yaml` to locate ideas?
- Do seeds (`spec/ideas/seeds/`) relocate with ideas under the same override?

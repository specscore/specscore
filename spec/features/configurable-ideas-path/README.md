---
format: https://specscore.md/feature-specification
status: Approved
---

# Feature: Configurable Ideas Path

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/configurable-ideas-path?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/configurable-ideas-path?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/configurable-ideas-path?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/configurable-ideas-path?op=request-change) |
**Status:** Approved
**Source Ideas:** configurable-ideas-path

## Summary

Resolve each module's ideas directory through repo-config's per-module path_overrides.ideas_path (default spec/ideas) via a single resolution contract that every reader uses, instead of a hardcoded spec/ideas literal.

## Contents

| Directory | Description |
|-----------|-------------|
| [_tests/](_tests/README.md) | Test scenarios for configurable-ideas-path requirements |

## Problem

The ideas directory is a hardcoded literal across SpecScore. The [idea](../idea/README.md) Feature mandates that every feature-request Idea reside at `spec/ideas/<slug>.md` and rejects any other location; the CLI's `idea` commands, the authoring skills, and studio URL building all assume `spec/ideas/`. This is fine for single-layout repos, but two needs are unmet:

1. **Discoverability** — contributors browse the file tree, not the README; ideas buried under `spec/` are easy to miss, and a top-level `ideas/` (alongside `docs/`) surfaces them.
2. **Multi-module repos** — a SpecScore repo can declare several [modules](../repo-config/README.md), each of which may want to own its ideas under its own root.

Today there is no seam: even if [repo-config](../repo-config/README.md) carried an override, the readers would ignore it. A *partial* wiring (some readers honor an override, others keep the literal) would split-brain the tree and is worse than a fixed convention. This Feature introduces a single resolution contract so the ideas directory can be overridden per module, opt-in, with the default unchanged.

## Behavior

The config field itself — `path_overrides.ideas_path` on a module — is defined by [repo-config](../repo-config/README.md) (revised alongside this Feature). This Feature owns the **resolution semantics** and the requirement that **every** reader uses them.

### Ideas-path resolution

#### REQ: ideas-path-default

When a module declares no `path_overrides.ideas_path`, tools MUST resolve that module's ideas directory to `spec/ideas` relative to the module root. This is the behavior of every repo today; the default is unchanged and requires no config.

#### REQ: ideas-path-override

When a module declares `path_overrides.ideas_path: <value>`, tools MUST resolve that module's ideas directory to `<value>` interpreted relative to the module root. For the implicit root module, `ideas_path: ideas` resolves to `./ideas`; for a module at `backend/`, `ideas_path: ideas` resolves to `./backend/ideas`.

#### REQ: ideas-path-relative-to-module

`ideas_path` MUST be a repo-relative path anchored at the module root. An absolute path (leading `/`) or a value that escapes the module root via `../` is a hard error reported against the offending module; tools MUST NOT apply a default in that case or silently rewrite the file.

#### REQ: seeds-follow-ideas

The sidekick-seed directory MUST resolve as `seeds/` under the resolved ideas directory (`<resolved-ideas-path>/seeds/`), so seeds travel with their ideas under any override.

### Universal resolution

#### REQ: single-resolver

All readers and writers of the ideas location MUST obtain the directory from the shared resolution contract, never from a hardcoded `spec/ideas` literal. This covers, at minimum: the `specscore idea` CLI commands (`new`, `promote`, lint/index), idea-location validation, the `specstudio:ideate` and `specstudio:sidekick` authoring skills, and studio URL building.

#### REQ: location-validation-resolved

Idea-location validation MUST accept `<resolved-ideas-path>/<slug>.md` (active) and `<resolved-ideas-path>/archived/<slug>.md` (archived) and reject Idea files at any other location, using the resolved path rather than the literal `spec/ideas`. This revises the [idea](../idea/README.md) Feature's `idea-location` requirement to defer to the resolver.

## Acceptance Criteria

### AC: default-resolution

**Requirements:** configurable-ideas-path#req:ideas-path-default

**Given** a `specscore.yaml` with no `path_overrides.ideas_path` on any module
**When** a tool resolves the ideas directory for the implicit root module
**Then** it MUST use `spec/ideas` (relative to the module root), identical to current behavior.

### AC: override-resolution

**Requirements:** configurable-ideas-path#req:ideas-path-override, configurable-ideas-path#req:ideas-path-relative-to-module

**Given** a `specscore.yaml` whose root module sets `path_overrides.ideas_path: ideas`, and a second module at `backend/` that sets `path_overrides.ideas_path: ideas`
**When** a tool resolves the ideas directory for each module
**Then** the root module resolves to `./ideas` and the `backend` module resolves to `./backend/ideas`.

### AC: invalid-path-rejected

**Requirements:** configurable-ideas-path#req:ideas-path-relative-to-module

**Given** a `specscore.yaml` whose module sets `path_overrides.ideas_path` to an absolute path (`/ideas`) or an escaping path (`../ideas`)
**When** a tool loads the config
**Then** the load fails with a hard error naming the offending module and the `ideas-path-relative-to-module` REQ; no default is applied and the file is not rewritten.

### AC: seeds-resolution

**Requirements:** configurable-ideas-path#req:seeds-follow-ideas

**Given** a module that sets `path_overrides.ideas_path: ideas`
**When** a tool resolves the sidekick-seed directory for that module
**Then** it MUST use `ideas/seeds` (relative to the module root).

### AC: all-readers-consistent

**Requirements:** configurable-ideas-path#req:single-resolver

**Given** a repo whose root module sets `path_overrides.ideas_path: ideas`
**When** `specscore idea new <slug>` creates an Idea, then lint runs, then the idea index is rendered
**Then** the Idea is created at `ideas/<slug>.md`, lint reports no location violation, and the index links to `ideas/<slug>.md` — none of these readers fall back to `spec/ideas`.

### AC: location-validation-honors-override

**Requirements:** configurable-ideas-path#req:location-validation-resolved

**Given** a repo whose root module sets `path_overrides.ideas_path: ideas`
**When** lint validates an Idea file placed at `ideas/<slug>.md` and another placed at the now-stale `spec/ideas/<slug>.md`
**Then** the file under `ideas/` passes location validation and the file under `spec/ideas/` is rejected as a wrong-location Idea.

## Architecture & Dependencies

- **Resolver (new, in `specscore-cli`).** A single function that, given a module, returns its resolved ideas directory from `path_overrides.ideas_path` (default `spec/ideas`). It is the only place that knows the default literal. Every CLI reader/writer of the ideas location calls it.
- **`repo-config` (revised).** Gains the per-module `path_overrides` block with the `ideas_path` key, its default, and the relative-path validation. This is a departure from repo-config's current "per-module overrides are not supported in v1" stance and overlaps its repo-wide, name-only `specs_dir_name` — reconciliation is an Open Question, not resolved here.
- **`idea` (revised).** Its `idea-location` requirement is rewired to validate against the resolved path (REQ:location-validation-resolved).
- **Authoring skills & studio.** `specstudio:ideate`, `specstudio:sidekick`, and studio URL building consume the resolved path; studio's resolution strategy (config fetch vs zero-config) is an Open Question.

## Not Doing / Out of Scope

- **`specscore migrate ideas` relocation command** — the explicit, opt-in tool to move an existing `spec/ideas/` tree and write the config. Tracked as a separate follow-up Feature (depends on this one); lives in the `specscore-cli` repo.
- **Changing the global default** — `spec/ideas` stays the default for every repo; this is opt-in only.
- **Wiring features, plans, or decisions paths** — `path_overrides` is shaped to grow more keys later, but only `ideas_path` is specified here.
- **Automatic relocation on read** — tools never move files implicitly; an override only changes where tools look, never silently migrates an existing tree.
- **Resolving the `specs_dir_name` overlap / `spec`-vs-`specs` default drift** — noted as an Open Question for repo-config.

## Assumption Carryover

From the source Idea's Must/Should/Might assumptions:

- **Survives (Must):** every reader can be routed through one resolver before relocation is enabled — REQ:single-resolver makes this the gating contract.
- **Survives (Must):** studio can locate ideas under an override — carried as an Open Question on resolution strategy.
- **Survives (Should):** `ideas_path` relative to the module root is intuitive — encoded in REQ:ideas-path-relative-to-module.
- **Deferred (Might):** other artifact kinds will want the same override — explicitly Out of Scope.

## Rehearse Integration

All six ACs are testable (config-load + path-resolution + CLI/fs surface). Scenario stubs are scaffolded under [`_tests/`](_tests/README.md), one per AC, at `**Status:** pending`.

## Open Questions

- How does per-module `path_overrides` reconcile with repo-config's existing repo-wide, name-only `specs_dir_name`/`docs_dir_name` — supersede, coexist, or fold in? And the documented `specs` default conflicts with the lived `spec/` convention (drift to resolve).
- Does studio keep zero-config path discovery, or must it parse `specscore.yaml` per repo to locate ideas?

---
*This document follows the https://specscore.md/feature-specification*

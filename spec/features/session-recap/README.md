# Feature: Session Recap

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=request-change) |

**Status:** Under Review
**Source Ideas:** recap-artifacts-drift-and-session

## Summary

A **session recap** is an **automatically generated** journal rollup over a working session window — its goal, decisions, scope changes, what shipped, the commits, verification, and follow-ups — the persisted "summary" projection of the [journal](../journal-and-summary/README.md). Per [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md), it is **status-less** (no `Draft → Final → Archived` lifecycle, no `status:` frontmatter), gains an **optional human notes/comments** section, and is keyed `<timestamp>-<title>.md`. It lives in the user's hub repo with a per-user subdirectory so one shared repo can hold many people's recaps without collisions. This Feature defines the artifact type — frontmatter, body shape, storage rule, the `recaps:` config block — and a `specscore recap new --session` scaffold. SpecScore defines the artifact; a producing skill writes it.

## Problem

A session's summary — what the goal was, what changed mid-stream, what shipped, what's left to do — should be captured cheaply at the end of a working session without taxing the developer's flow. Today it has no artifact home. It also doesn't fit the drift-recap mould: a session routinely spans many Features or none, and may touch repos that aren't SpecScore-managed, so it can't be filed under a single Feature. And because a session recap is most useful aggregated across all of a developer's projects, it lives in the hub repo — which a shared, committed project `specscore.yaml` cannot encode without leaking per-user/per-machine paths. Per [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md), the session recap is the automatic rollup projection of the journal over a session window, status-less, with an optional human notes section. This Feature gives it a defined shape and a collision-free shared-repo storage rule.

## Behavior

### Document type and frontmatter

The session recap is a registered, **status-less** document type (per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md)).

#### REQ: registry-row

The session recap MUST be registered in [`document-types-registry`](../document-types-registry/README.md) as Kind `Document` with its Consumer Path under the configured recap repo (the hub repo by default).

#### REQ: frontmatter

A session recap MUST carry a `format:` frontmatter line (the session-recap specification URL), aligned with the [`artifact-frontmatter-convention`](../artifact-frontmatter-convention/README.md) Feature (Under Review; a **forward dependency** — the generic `format:` lint these REQs build on lands when it is **implemented**). Per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md) the session recap is **status-less** — an automatic rollup, not a lifecycle object — so it MUST NOT carry a `status:` field, and the frontmatter-convention lint MUST classify `session-recap` as a type with no Status concept (absence of `status:` is not a violation; its presence is). This Feature owns the session-recap-specific rules regardless.

#### REQ: body-sections

A session recap's body MUST contain the sections: **Goal**, **Decisions**, **Scope Changes**, **Shipped**, **Commits**, **Verification**, and **Follow-ups**. These are the rollup projection of the journal over the session window.

#### REQ: optional-notes

A session recap MAY contain an optional **Notes** (human comments) section for narrative judgment the automatic rollup cannot derive — *why* choices were made, context, caveats. The section is optional; its absence is not a violation. Because the recap is an automatic rollup rather than a curated artifact, regenerating it MUST preserve any human-authored Notes content rather than clobbering it.

### Session window and triggers

The session recap is an automatic rollup over a **session window** — a span of journal events bounded by an open and a close. The model is **hybrid** (resolving the session-window question deferred by [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md)): sitting-aligned windows that any milestone may also cap. The window semantics are defined here (they determine what a session recap *is*); the producing skill plus the [journal](../journal-and-summary/README.md) implement and enforce them.

#### REQ: session-window-open

A session window opens at the first journal event recorded after the previous window for that author closed (or the first event ever). Events are attributed to a window by author and time.

#### REQ: boundary-close-triggers

A session window MUST close — producing one session recap — on the first of these **boundary triggers** to fire (sitting-aligned):

- **Explicit flush** — the user runs `specscore recap new --session` (or an equivalent "wrap up" command).
- **Idle timeout** — a configurable span (`recaps.idle_timeout`, default 2h) elapses with no new journal event for that author.
- **Agent-session end** — the AI agent session ends (e.g. Claude Code SessionEnd / context clear) emits a session-end signal.
- **End of day** — a scheduled end-of-day rollup (local time) closes any window still open, so a day's work always yields a recap.

#### REQ: milestone-close-triggers

In addition to boundary triggers, a **milestone event** — `recap.completed` or `ship.completed` (configurable via `recaps.milestone_triggers`) — MUST **force-close the current window and open a new one**, so the milestone caps its session. This is the hybrid behavior: milestones segment a long sitting into milestone-aligned sessions, while boundary triggers close the trailing window that holds no milestone.

#### REQ: window-rollup-on-close

On close (by any trigger), the journal events in the window MUST be rolled up into one session recap written per `### Storage`. The `<title>` is derived from the closing milestone's subject (e.g. the feature slug) when milestone-closed, else an auto-generated summary slug; `<timestamp>` is the window-close time. Closing a window with no substantive journal events MUST NOT produce a recap.

#### REQ: trigger-config

The `recaps:` block in [`repo-config`](../repo-config/README.md) MUST accept behavioral trigger keys: `idle_timeout` (duration), `milestone_triggers` (list of event types, default `[recap.completed, ship.completed]`), and `end_of_day` (local time, or off). Unlike `recaps.repo`/`recaps.user`, these are not per-user/per-machine path values, so they are **not** layered-config-gated and MAY live in a shared project `specscore.yaml`.

### Storage

Session recaps live in the hub repo in a shared, per-user-partitioned location.

#### REQ: dedicated-repo-storage

A session recap MUST be stored at `<recaps.repo>/<username>/<timestamp>-<title>.md` — always the hub repo per [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md) (a configured location; default a dedicated repo; may be configured to equal the current code repo). The per-user subdirectory makes concurrent writes from multiple people or machines collision-free by construction (pure git adds, never overlapping paths).

#### REQ: username-not-email

The `<username>` path segment MUST be a username/userid, **never a raw email**. For MVP the author is identified by their git `user.email`, then resolved to a username via a configured email→username map; an explicit `recaps.user` override takes precedence. A raw email address MUST NOT appear in any recap path.

#### REQ: single-home-repo

A session has exactly **one** home repo (the cwd repo, or a configured default). Other repos a session touched — including non-SpecScore-managed ones — MUST be referenced by path/origin in the body, never written to. A session recap MUST NOT be duplicated into each touched repo.

### Configuration

A `recaps:` config block parallels the journal's, and its repo/user keys are layered-config-gated.

#### REQ: recaps-config-block

[`repo-config`](../repo-config/README.md) MUST accept a `recaps:` block with keys `enabled`, `repo`, `user`, and a `users` email→username map. Because `repo` and `user` are per-user/per-machine values that MUST NOT be committed into a shared project `specscore.yaml`, they MUST be rejected by the loader with a clear error pointing at the [layered-config](../layered-config/README.md) Feature (**Under Review; not yet implemented**) until that Feature ships — exactly the posture the activity-journal cross-repo key carries.

### Scaffold

One CLI verb creates a blank, lint-clean session recap.

#### REQ: recap-new-scaffold

`specscore recap new --session [--slug <slug>]` MUST write a lint-clean blank session-recap template (correct `format:` frontmatter — no `status:` — and the required body sections) into the resolved per-user path under `recaps.repo`. The scaffold MUST exit non-zero with a clear error when `recaps.repo` is unresolved (pending layered config).

## Acceptance Criteria

### AC: registered-in-registry

**Requirements:** session-recap#req:registry-row

**Given** a SpecScore repo with the document-types registry
**When** `specscore spec lint` resolves document types
**Then** `session-recap` is present with Kind `Document` and a Consumer Path under the configured recap repo.

### AC: frontmatter-required

**Requirements:** session-recap#req:frontmatter

**Given** two session recaps — one missing `format:` and one carrying a `status:` field
**When** `specscore spec lint` runs
**Then** the one missing `format:` is flagged for the missing field; the one carrying `status:` is flagged (session-recap has no Status concept); a recap with `format:` and no `status:` passes.

### AC: body-sections-required

**Requirements:** session-recap#req:body-sections

**Given** a session recap missing one of Goal / Decisions / Scope Changes / Shipped / Commits / Verification / Follow-ups
**When** `specscore spec lint` runs
**Then** lint reports the missing section.

### AC: optional-notes-preserved

**Requirements:** session-recap#req:optional-notes

**Given** a session recap whose optional **Notes** section contains human-authored comments
**When** the rollup is regenerated for that session
**Then** the recap with no Notes section still passes lint, and regeneration preserves the human-authored Notes content rather than clobbering it.

### AC: boundary-triggers-close-window

**Requirements:** session-recap#req:session-window-open, session-recap#req:boundary-close-triggers, session-recap#req:window-rollup-on-close

**Given** an open session window with substantive journal events
**When** any boundary trigger fires (explicit flush, idle timeout elapses, agent-session end, or end-of-day)
**Then** the window closes and exactly one session recap is produced rolling up that window's events; a window closing with no substantive events produces no recap.

### AC: milestone-forces-new-session

**Requirements:** session-recap#req:milestone-close-triggers

**Given** an open session window and the configured milestone triggers
**When** a `recap.completed` (or other configured milestone) event is recorded
**Then** the current window force-closes — producing a recap capped at that milestone — and a new window opens for subsequent events.

### AC: trigger-keys-not-gated

**Requirements:** session-recap#req:trigger-config

**Given** a shared project `specscore.yaml` setting `recaps.idle_timeout`, `recaps.milestone_triggers`, and `recaps.end_of_day`
**When** the config loader runs (with the layered-config Feature not yet landed)
**Then** these behavioral trigger keys are accepted (not rejected like `recaps.repo`/`recaps.user`).

### AC: per-user-path

**Requirements:** session-recap#req:dedicated-repo-storage, session-recap#req:username-not-email

**Given** two authors with different git `user.email` values writing same-day recaps into one shared `recaps.repo`
**When** the paths are resolved
**Then** each lands at `<recaps.repo>/<username>/<timestamp>-<title>.md` under its own username subdirectory, with no collision and no raw email anywhere in the path.

### AC: single-home-repo-referenced-not-copied

**Requirements:** session-recap#req:single-home-repo

**Given** a session that edited a home repo and a second (possibly non-SpecScore) repo
**When** the recap is written
**Then** exactly one recap is written in the home repo's recap location, and the second repo is named by path/origin in the body, not given its own copy.

### AC: recaps-keys-gated

**Requirements:** session-recap#req:recaps-config-block

**Given** a project `specscore.yaml` setting `recaps.repo` while the layered-config Feature has not shipped
**When** `specscore spec lint` (or the config loader) runs
**Then** it rejects `recaps.repo` with a clear error pointing at the layered-config dependency; `recaps.enabled` alone is accepted.

### AC: scaffold-writes-lint-clean-template

**Requirements:** session-recap#req:recap-new-scaffold

**Given** a resolved `recaps.repo` and a mapped username
**When** the user runs `specscore recap new --session --slug demo`
**Then** a lint-clean blank session recap is written at `<recaps.repo>/<username>/<timestamp>-demo.md` with valid `format:` frontmatter (no `status:`) and all required body sections; with `recaps.repo` unresolved the command exits non-zero with a clear error.

## Rehearse Integration

Every AC above is testable through `specscore spec lint` (frontmatter / body / registry / config-gating) or the `specscore recap new --session` CLI surface (path resolution, scaffold output). Rehearse scenario stubs are deferred to the Plan phase to match the current repo convention. Recorded scope decision, not a claim of untestability.

## Open Questions

- The email→username map's exact config shape and the fallback when an email is unmapped — reject the write, or derive a safe slug from the local-part? (Inherited from the source Idea.)
- Exact path shape: `<recaps.repo>/<username>/<timestamp>-<title>.md` vs nesting under a `recaps/` prefix vs encoding the home-repo org/name for cross-project disambiguation.
- Does a shared recap repo need a canonical index README (per-user and/or top-level) to satisfy the `readme-exists` lint rule, and who generates it?
- The session-window definition is **resolved** (see `### Session window and triggers`): a hybrid model — sitting-aligned windows closed by four boundary triggers (explicit flush, idle timeout, agent-session end, end-of-day), with milestone events (`recap.completed`/`ship.completed`) also force-closing a window. Remaining joint work with [`journal-and-summary`](../journal-and-summary/README.md): emitting the idle-timeout and agent-session-end signals the producer consumes.
- **Forward dependency:** [`artifact-frontmatter-convention`](../artifact-frontmatter-convention/README.md) is now a Feature (Under Review; not yet implemented); and the `recaps.repo`/`recaps.user` keys depend on the [layered-config](../layered-config/README.md) Feature (**Under Review; not yet implemented**) — they remain rejected until it ships. Sequence accordingly at plan time.

---
*This document follows the https://specscore.md/feature-specification*

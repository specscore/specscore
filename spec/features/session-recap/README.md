# Feature: Session Recap

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/session-recap?op=request-change) |

**Status:** Under Review
**Source Ideas:** recap-artifacts-drift-and-session

## Summary

A **session recap** is a *curated* narrative of a working session — its goal, decisions, scope changes, what shipped, the commits, verification, and follow-ups. Unlike the machine-generated [drift recap](../drift-recap/README.md), it is authored (by a human, or AI-drafted then human-curated), carries a `Draft → Final` lifecycle, and lives in a dedicated, user-configured recap repo with a per-user subdirectory so one shared repo can hold many people's recaps without collisions. This Feature defines the artifact type — frontmatter, body shape, storage rule, lifecycle, the `recaps:` config block — and a `specscore recap new --session` scaffold. SpecScore defines the artifact; a producing skill writes it.

## Problem

A session's narrative — *why* choices were made, what changed mid-stream, what's left to do — is judgment, not something derivable from the event stream or a per-AC drift report. Today it has no artifact home. It also doesn't fit the existing recap mould: a session routinely spans many Features or none, and may touch repos that aren't SpecScore-managed, so it can't be filed under a single Feature like a drift recap. And because a session recap is most useful aggregated across all of a developer's projects, it wants a dedicated home repo — which a shared, committed project `specscore.yaml` cannot encode without leaking per-user/per-machine paths. This Feature gives the session recap a defined shape, a collision-free shared-repo storage rule, and a minimal lifecycle.

## Behavior

### Document type and frontmatter

The session recap is a registered, lifecycle-bearing document type.

#### REQ: registry-row

The session recap MUST be registered in [`document-types-registry`](../document-types-registry/README.md) as Kind `Document` with its Consumer Path under the configured recap repo.

#### REQ: frontmatter

A session recap MUST carry both `format:` (the session-recap specification URL) and `status:` frontmatter, aligned with the [`artifact-frontmatter-convention`](../../ideas/artifact-frontmatter-convention.md) Idea (a **forward dependency** — currently an Idea, not yet a Feature; the generic `format:`/`status:` lint these REQs build on lands when it is specified). Unlike the drift recap, the session recap is a lifecycle object and therefore has a Status concept. This Feature owns the session-recap-specific rules regardless.

#### REQ: body-sections

A session recap's body MUST contain the sections: **Goal**, **Decisions**, **Scope Changes**, **Shipped**, **Commits**, **Verification**, and **Follow-ups**. These capture the curated judgment a journal rollup cannot.

#### REQ: curated-source-of-truth

The session-recap artifact is the source of truth for the session narrative. Tooling (e.g. an activity journal) MAY pre-fill a draft, but MUST NOT be treated as owning or overwriting the curated narrative; finalization is a human act.

### Lifecycle

The lifecycle is intentionally minimal.

#### REQ: lifecycle-states

A session recap's `status:` MUST be one of `Draft`, `Final`, or `Archived`. The normal path is `Draft → Final`; `Archived` is the escape hatch. Transitions other than `Draft → Final`, `Draft → Archived`, and `Final → Archived` MUST be rejected.

### Storage

Session recaps leave the project repo and live in a shared, per-user-partitioned location.

#### REQ: dedicated-repo-storage

A session recap MUST be stored at `<recaps.repo>/<username>/<YYYY-MM-DD>-<slug>.md`. The session recap is the **only** recap kind that leaves the project repo; the drift recap stays co-located with its Feature. The per-user subdirectory makes concurrent writes from multiple people or machines collision-free by construction (pure git adds, never overlapping paths).

#### REQ: username-not-email

The `<username>` path segment MUST be a username/userid, **never a raw email**. For MVP the author is identified by their git `user.email`, then resolved to a username via a configured email→username map; an explicit `recaps.user` override takes precedence. A raw email address MUST NOT appear in any recap path.

#### REQ: single-home-repo

A session has exactly **one** home repo (the cwd repo, or a configured default). Other repos a session touched — including non-SpecScore-managed ones — MUST be referenced by path/origin in the body, never written to. A session recap MUST NOT be duplicated into each touched repo.

### Configuration

A `recaps:` config block parallels the journal's, and its repo/user keys are layered-config-gated.

#### REQ: recaps-config-block

[`repo-config`](../repo-config/README.md) MUST accept a `recaps:` block with keys `enabled`, `repo`, `user`, and a `users` email→username map. Because `repo` and `user` are per-user/per-machine values that MUST NOT be committed into a shared project `specscore.yaml`, they MUST be rejected by the loader with a clear error pointing at the foundational layered-config Feature until that Feature lands — exactly the posture the activity-journal cross-repo key carries.

### Scaffold

One CLI verb creates a blank, lint-clean session recap.

#### REQ: recap-new-scaffold

`specscore recap new --session [--slug <slug>]` MUST write a lint-clean blank session-recap template (correct `format:`/`status:` frontmatter and the required body sections) into the resolved per-user path under `recaps.repo`. The scaffold MUST exit non-zero with a clear error when `recaps.repo` is unresolved (pending layered config).

## Acceptance Criteria

### AC: registered-in-registry

**Requirements:** session-recap#req:registry-row

**Given** a SpecScore repo with the document-types registry
**When** `specscore spec lint` resolves document types
**Then** `session-recap` is present with Kind `Document` and a Consumer Path under the configured recap repo.

### AC: frontmatter-required

**Requirements:** session-recap#req:frontmatter

**Given** a session recap missing `format:` or `status:`
**When** `specscore spec lint` runs
**Then** lint reports a violation naming the missing field; a recap carrying both passes.

### AC: body-sections-required

**Requirements:** session-recap#req:body-sections

**Given** a session recap missing one of Goal / Decisions / Scope Changes / Shipped / Commits / Verification / Follow-ups
**When** `specscore spec lint` runs
**Then** lint reports the missing section.

### AC: lifecycle-transitions-enforced

**Requirements:** session-recap#req:lifecycle-states

**Given** a session recap in `Final`
**When** a transition back to `Draft` is attempted
**Then** it is rejected as an illegal transition; `Draft → Final` and `Final → Archived` are accepted.

### AC: curated-not-overwritten

**Requirements:** session-recap#req:curated-source-of-truth

**Given** a session recap a human has edited and finalized
**When** any draft-seeding tooling runs again for that session
**Then** it does not overwrite the curated narrative (it may only seed a fresh draft, never clobber a `Final` one).

### AC: per-user-path

**Requirements:** session-recap#req:dedicated-repo-storage, session-recap#req:username-not-email

**Given** two authors with different git `user.email` values writing same-day recaps into one shared `recaps.repo`
**When** the paths are resolved
**Then** each lands at `<recaps.repo>/<username>/<YYYY-MM-DD>-<slug>.md` under its own username subdirectory, with no collision and no raw email anywhere in the path.

### AC: single-home-repo-referenced-not-copied

**Requirements:** session-recap#req:single-home-repo

**Given** a session that edited a home repo and a second (possibly non-SpecScore) repo
**When** the recap is written
**Then** exactly one recap is written in the home repo's recap location, and the second repo is named by path/origin in the body, not given its own copy.

### AC: recaps-keys-gated

**Requirements:** session-recap#req:recaps-config-block

**Given** a project `specscore.yaml` setting `recaps.repo` while the foundational layered-config Feature has not landed
**When** `specscore spec lint` (or the config loader) runs
**Then** it rejects `recaps.repo` with a clear error pointing at the layered-config dependency; `recaps.enabled` alone is accepted.

### AC: scaffold-writes-lint-clean-template

**Requirements:** session-recap#req:recap-new-scaffold

**Given** a resolved `recaps.repo` and a mapped username
**When** the user runs `specscore recap new --session --slug demo`
**Then** a lint-clean blank session recap is written at `<recaps.repo>/<username>/<YYYY-MM-DD>-demo.md` with valid frontmatter and all required body sections; with `recaps.repo` unresolved the command exits non-zero with a clear error.

## Rehearse Integration

Every AC above is testable through `specscore spec lint` (frontmatter / body / registry / lifecycle / config-gating) or the `specscore recap new --session` CLI surface (path resolution, scaffold output). Rehearse scenario stubs are deferred to the Plan phase to match the current repo convention. Recorded scope decision, not a claim of untestability.

## Open Questions

- The email→username map's exact config shape and the fallback when an email is unmapped — reject the write, or derive a safe slug from the local-part? (Inherited from the source Idea.)
- Exact path shape: `<recaps.repo>/<username>/<date>-<slug>.md` vs nesting under a `recaps/` prefix vs encoding the home-repo org/name for cross-project disambiguation.
- Does a shared recap repo need a canonical index README (per-user and/or top-level) to satisfy the `readme-exists` lint rule, and who generates it?
- Optional journal-seeded drafts (`--from-journal`) are deferred until the activity-journal Feature lands and demand is shown — confirmed out of scope here.
- **Forward dependency:** `artifact-frontmatter-convention` is currently an Idea, not a Feature; and the `recaps.repo`/`recaps.user` keys depend on the foundational layered-config Feature. Both must be specified before the parts of this Feature that build on them; sequence accordingly at plan time.

---
*This document follows the https://specscore.md/feature-specification*

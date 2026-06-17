---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: Recap/Verify Storage, Surfacing, and the Producer/Gate Boundary

**Status:** Approved
**Date:** 2026-06-02
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** recap, verify, storage, hub, ci, agent-session, portfolio
**Source Idea:** recap-artifacts-drift-and-session
**Supersedes:** —
**Superseded By:** —

## Context

A design conversation worked through how SpecScore's recap artifacts (drift recap, session recap) and the upstream verify report are stored, surfaced in pull requests, and gated — and where each step actually runs. It reached conclusions that **amend** the `recap-artifacts-drift-and-session` Idea (currently `Implementing`) in two material ways: drift recaps no longer stay co-located in the code repo, and session recaps lose their `Draft → Final → Archived` lifecycle. This Decision records the resolved model so it is not lost, and flags what it changes downstream.

Anchoring facts the conversation relied on:

- **Reporting scope is cross-repo / portfolio**, not single-repo. End-of-month stats and auto-stats are expected to span all of a user's projects (the `specscore-hub` vision).
- **`specstudio:verify` and `specstudio:recap` are AI skills run in the agent (dev) session** — they dispatch one LLM subagent per AC to judge `{pass, fail}` and drift `{no-drift, spec-tighter-than-code, code-tighter-than-spec, contradiction}`. They are not deterministic CLI commands and are not intended to run in CI.
- **The "hub repo" is a storage backend** (the user's, default/first) — distinct from the **Hub UI/backend** (the render/aggregation product). Session recaps are already destined for the hub repo.
- Squash-merge — the common GitHub case — orphans every per-commit SHA at merge time.

## Decision

### 1. Three-layer artifact model

- **Events (journal)** — the append-only, timestamped, cross-repo/cross-machine spine. The time-series surface. Carries counts + `report_path`, references code by `(origin, repo, sha)`.
- **Detail (drift recap + verify report)** — immutable, per-Feature, per-verification-run records. Keyed by the **code-state SHA**.
- **Rollups (session recap, month report)** — projections of the journal over a time window, auto-generated, plus optional human notes.

End-of-month / portfolio reports roll up **journal events** and link into the detail; they never scan recap filenames for the time dimension.

### 2. Drift recap stays SHA-keyed; add provenance, not a rematch key

The drift recap's primary key remains the code-state SHA (already mirrored inside the YAML as `revision:` / `verify_revision:`). On top of that, record descriptive provenance — `author`, `commit timestamp`, `commit message`, `origin` — as a human-readable fingerprint and audit aid. This provenance is **not** a reliable key for re-matching a commit after history rewrite (it survives plain rebase, breaks on squash/reword/amend). If a real "same change after rebase" matcher is ever needed, use `git patch-id`. The durable answer to SHA-drift is **self-containment** (below), not fingerprinting.

### 3. Detail artifacts move OUT of the code repo, into the hub repo

Drift recaps and verify reports are written to the user's **hub repo** (the default storage backend), namespaced by source repo — e.g. `<hub-repo>/<repo-key>/features/<feature-slug>/recap/<sha>.md` and `.../verify/<sha>.md`, where `<repo-key>` derives from git origin (same resolution the journal's `stream` uses). They are no longer written to `spec/features/<slug>/_recap|_verify/`.

This establishes the invariant: **code repos hold only hand-authored artifacts (spec + code); the hub repo holds everything machine-generated.** It also eliminates the `_recap`-inside-`spec/` "named exception" entirely.

Storage **always targets the hub repo** — a configured location, by default a dedicated repo, that **may be configured to equal the current code repo**. There is no separate "local fallback": writing into the current repo is simply the degenerate case where the hub repo points at it, so resolution stays uniform (one storage target, one read path — recap always reads the verify report from the hub repo). This keeps verify/recap usable before a Hub backend exists (point the hub repo at a local/dedicated repo, which the skill writes directly) and gives non-SpecScore-managed repos a home (a dedicated hub repo).

The hub repo is written by the **Hub backend reacting to the `recap.completed` event** (single `SPECSCORE_TOKEN` auth), not by the agent or CI pushing cross-repo with a PAT.

### 4. Session recap: automatic rollup, no status, with notes

Session recap is keyed `<timestamp>-<title>.md` in the hub repo, **auto-generated** as a journal rollup over a session window, carries **no `status:` / lifecycle**, and gains an **optional human notes/comments** section. It is the persisted "summary" projection of the journal. (This amends the source Idea, which specified human curation and a `Draft → Final → Archived` lifecycle.)

### 5. Commit trailers are many-to-many

There is no "one commit per AC" rule. `Verifies: <feature>#ac:<ac-slug>` lines are matched by `git log --grep`, so one commit may reference N ACs (multiple trailer lines), and an AC may be referenced by N commits. The mapping is many-to-many.

### 6. Producer vs gate boundary

- **Produce** (agent session): the agent runs implement → verify → recap. recap writes the report to the hub repo and emits `recap.completed`. The report exists **before the PR is opened**.
- **Surface in PR** (no CI, no GitHub App): the agent — which opens the PR — writes the **Hub deeplink** into the PR body; alternatively the Hub posts it on the PR-opened webhook. Deeplink is content-addressed by `(repo, sha)` and offered in two forms: Hub UI (rich) and a hub-repo file link (degraded fallback).
- **Gate in CI** (optional, deterministic only): if a team wants branch-protection enforcement, a deterministic `specscore` check reads the artifact and asks "is there a clean recap for this SHA?" — it does **not** run the LLM. Lint is the other deterministic CI use. The AI verify/recap never run in CI.

### 7. (Recommended) self-containment of detail artifacts

Because the hub repo is separate and squash-merge orphans SHAs, recaps should embed enough evidence (the cited diff hunks, or a content hash + file paths they already record) to be interpretable without re-fetching the commit. The SHA becomes provenance, not a dependency.

## Rationale

- **Cross-repo scope forces durable, linkable detail.** Portfolio reports roll up journal events and link to detail; ephemeral recaps would leave dead links, and AI judgment is non-reproducible, so discarded detail is gone for good — not rebuildable.
- **Keeping code repos clean is the user's explicit priority.** Operational data and commits do not belong in hand-authored code repos. Relocating to the hub repo satisfies this and yields a cleaner authored-vs-generated invariant than the prior "named exception."
- **The PR anchor survives merge.** Surfacing via the agent/Hub-on-PR (anchored to the PR, not pre-merge SHAs) sidesteps squash-merge orphaning without any custom GitHub Check or App.
- **Right tool, right place.** LLM-judgment skills belong in the agent session (cost, non-determinism, model access); CI is for deterministic gates. Conflating them produced an unnecessary "install a CI action" design that this Decision discards.
- **Simplicity.** Single-token auth + agent-writes-the-deeplink removes the GitHub App, cross-repo PAT, and custom Checks API surface considered earlier.

## Declined Alternatives

### Ephemeral drift recaps (consume at review, then discard)
Lost: portfolio reports link to detail (dead links if discarded), AI judgment is non-reproducible, and SHA-keyed immutability assumes accumulation. Only viable if journal counts alone sufficed — the portfolio choice says they do not.

### Co-locate drift/verify in the code repo (status quo / source Idea)
Lost: spams code repos with generated files and commits, and perpetuates the `_recap`-inside-`spec/` exception. Relocation to the hub repo removes both.

### Re-key drift recap by timestamp+title instead of SHA
Lost: the SHA is the load-bearing link to the exact code state measured; the time dimension belongs in the journal, not the detail filename. (timestamp+title is correct for the *session* recap, which is genuinely session/time-oriented.)

### {message, author, timestamp} as a reliable rebase-rematch key
Lost: survives plain rebase only; breaks on squash/reword/amend and is ambiguous on cherry-pick. Kept solely as descriptive provenance. `git patch-id` is the better matcher if ever needed; self-containment is the real fix.

### Custom GitHub Check run / GitHub App for PR surfacing
Lost: unnecessary. The agent already opens the PR and holds the deeplink; the optional CI gate is deterministic and a plain CI job is itself a check. Avoids `checks:write`/`pull_requests:write` App permissions.

### Run AI verify/recap in CI
Lost: they are LLM-judgment skills (cost, non-determinism, model access) and belong in the agent session. CI's role is deterministic-only (lint, "clean recap exists at HEAD").

### Store detail in the code repo but link out to fix only PR noise
Subsumed: the hub-repo relocation plus PR deeplink solves clean-repos and PR visibility together; lighter noise-only fixes (prune no-drift runs, dedicated commit) remain available if ever co-located.

## Consequences at Decision Time

**Positive**
- Code repos become hand-authored-only; the `_recap`/`_verify`-in-`spec/` exception is removed.
- One uniform operational store (journal + verify + recap + session/month rollups) in the hub repo.
- PR discoverability with zero GitHub App / Checks integration; single-token auth.
- Squash-merge SHA-orphaning stops mattering (PR anchor + self-contained detail).

**Negative / costs**
- Code repos are no longer self-contained audit trails — the hub repo is required to read history.
- Detail artifacts need `(repo, sha)` addressing; deterministic CI gates become cross-repo reads of the hub/Hub.
- verify/recap gain a dependency on hub-repo storage + the Hub backend for the full experience; mitigated because the hub repo is just a configured git location (which may point at the current repo) the skill can write directly pre-Hub.

**Critical-path dependencies (mostly green-field)**
- **`layered-config`** — *not started*; gates resolution of `hub`/`recaps`/`journal` repo paths. Hard blocker for the portfolio experience.
- **`journal-and-summary`** — Draft Idea; must become a Feature (it is the spine).
- **`specscore-hub` backend** — Idea; owns hub-repo writes, deeplinks, and the optional PR webhook.
- **`session-recap` Feature** — must be revised per §4 (drop lifecycle, add notes, reframe as rollup).

## Observed Consequences

None observed yet.

## Amendment Notes

**2026-06-02 (same day, owner):** Refined the storage model in §3. The original wording described pluggable storage *with the local code repo as a fallback*. Corrected: storage **always** targets the hub repo, which is a configured location (default: a dedicated repo) that may be set equal to the current code repo. "Local" is not a separate fallback — it is the degenerate configuration where the hub repo points at the current repo. This makes the read path uniform (recap always reads the verify report from the hub repo), removing the dual-path follow-up noted during the initial spec revision.

## Affected Features

- `recap-artifacts-drift-and-session` (Idea) — amended: drift recap storage relocates from `spec/features/<slug>/_recap/<sha>.md` to the hub repo; session recap loses its `Draft → Final → Archived` lifecycle and `status:`, becomes an automatic journal rollup with optional notes.
- `specstudio-skills` `verify` / `recap` Features — `report-path` REQ changes from the in-repo `spec/features/<slug>/_verify|_recap/<sha>.md` to a hub-repo path resolved via config (always the hub repo; a configured location, default dedicated, may equal the current repo); add the provenance metadata block; verify/recap remain agent-session skills, not CI.
- `session-recap` Feature (specscore) — revise per §4.
- `journal-and-summary` (Idea) — promote to Feature; `recap.completed` / `verify.completed` events carry `report_path` + counts and are the rollup source.
- `specscore-hub` (Idea) — consumes journal + detail; writes the hub repo on event ingest; optionally posts the PR deeplink on PR-open.
- `repo-config` Feature — `recaps:` / `journal:` blocks plus a storage-target setting; depends on `layered-config`.

---

*This document follows the https://specscore.md/decision-specification*

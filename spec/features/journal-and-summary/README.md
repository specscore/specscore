---
format: https://specscore.md/feature-specification
status: In Review
---

# Feature: Journal and Summary

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/journal-and-summary?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/journal-and-summary?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/journal-and-summary?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/journal-and-summary?op=request-change) |

**Status:** In Review
**Source Ideas:** journal-and-summary

## Summary

The **journal** is an append-only, low-cost record of SpecScore activity, written one event per file (date-sharded) at the existing event-emission points, plus an on-demand **summary** projection (`day` / `week` / `month`) computed at query time. It is the **rollup spine** of the recap model named by [Decision D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md): the session recap and month report are projections of the journal over a time window, and `recap.completed` / `verify.completed` events carry `report_path` + per-AC verdict counts so portfolio rollups link into the detail without scanning recap filenames for the time dimension. This Feature defines **Phase 1** (single-repo journal, project-only config) — the event store and schema, write-time stream resolution, deterministic auto-write, explicit write, and the two read commands. The cross-repo `journal.repo` capability (**Phase 2**) is a proposal attached to this Feature, gated on the [layered-config](../layered-config/README.md) Feature (**Under Review; not yet implemented**).

## Problem

The only record of SpecScore activity today is git history plus the structured event stream skills emit. There is no human-readable "what changed recently?" view and no rollup over day/week/month. As repos accumulate dozens of Features and hundreds of events, scanning `git log` becomes infeasible. Separately, [D-0002](../../decisions/0002-recap-storage-surfacing-and-producer-gate-boundary.md) makes this journal load-bearing: recap/session rollups and portfolio reports depend on a time-series event spine that links to the detail artifacts in the hub repo. This Feature pins that spine into an enforceable contract.

## Behavior

### Event store and format

#### REQ: event-store-layout

Journal events MUST be stored **one event per file**, date-sharded, at `<journal.path>/events/YYYY/MM/DD/<ISO8601-timestamp>-<machine-id>-<short-uuid>.json` (default `journal.path` is `_specscore/journal/`). The store MUST be an [inGitDB](https://ingitdb.com/) collection, with a canonical `.ingitdb.yaml` schema scaffolded at the journal root on first write declaring the `events` collection and the event record shape. One-file-per-event sharded by date makes cross-machine sync a pure-add merge (no line-ordering conflicts) and lets summaries prune to a date range without opening every file.

#### REQ: event-record-schema

Each event record MUST carry these flat fields (ingitdb `--where`-friendly): `type` (event type, e.g. `idea.approved`), `timestamp` (ISO 8601 UTC), `machine_id` (short stable id of the writing machine), `source_repo` (repo root path at write time), `source_origin` (git origin URL; omitted when no origin), `stream` (always populated per stream resolution), and `data` (type-specific payload).

#### REQ: single-writer

The SpecScore CLI, linking the inGitDB Go library (`pkg/dalgo2ingitdb`), MUST be the **only** writer of journal records. Skills and external automation MUST NOT link inGitDB directly — they write via `specscore journal write` or inherit auto-write (below). This keeps exactly one place that knows the journal schema and the inGitDB API.

### Stream resolution

#### REQ: stream-resolution

The `stream` field MUST be resolved at write time and persisted into the record, by first-match precedence: (1) explicit `journal.stream: <value>` in resolved config (Phase 2); (2) explicit `journal.stream: null` → `stream` omitted (Phase 2); (3) the git origin org (first path segment after the host, lowercased); (4) the lowercased basename of `source_repo`. Rules 3–4 fire in Phase 1 (no config key yet), so every Phase 1 event has a populated `stream` even with no user config. Resolution is at write time — re-orging or renaming later does not retroactively re-tag historical events.

### Write paths

#### REQ: implicit-auto-write

Every SpecScore CLI subcommand of the form `specscore <resource> new` or `specscore <resource> change-status` — across all current and **future** resources — MUST record the corresponding journal event as a deterministic side effect of normal execution. The rule is structural, not enumerated: any new resource that adds these subcommands inherits journal coverage automatically. The auto-written payload MUST be derived deterministically from the command's arguments and the resulting artifact state.

#### REQ: explicit-write

`specscore journal write --type=<event-type> [--data='{...}']` MUST record an event the CLI does not infer — skill-level checkpoints, custom workflow steps, ad-hoc notes from external automation. This is the path skills use; they never link inGitDB directly.

### Read and rollup

#### REQ: journal-show

`specscore journal show --since=<duration> [--stream=<name>] [--no-stream]` MUST list recent events as a pure read over the journal working tree, defaulting to aggregating across all streams.

#### REQ: journal-summary

`specscore journal summary --period=day|week|month [--stream=<name>]` MUST produce the rollup as a **pure on-demand projection** — no pre-computation, no scheduler, no commit hook, no session-start cost. The projection MUST prune to the relevant date range using the date-sharded directory layout rather than opening every event file. The allowed periods are bounded by the optional `aggregation_periods` allowlist (default `[day, week, month]`).

### Integration with recap rollups (per D-0002)

#### REQ: completed-event-payload

The `recap.completed` and `verify.completed` events (written through the explicit/auto path by the producing skills) MUST carry, in their `data` payload, a `report_path` (the hub-repo location of the detail artifact) and the per-AC verdict counts (e.g. `no_drift_count`, `contradiction_count`, …). The journal MUST store these verbatim. These are the link by which time-series rollups and portfolio reports reach the detail without scanning recap filenames. The journal does not interpret the payload — it is the spine; consumers (session recap, month report, Hub) read it.

#### REQ: session-trigger-signals

The journal MUST be the event/timestamp source for the [session-recap](../session-recap/README.md) window triggers: (a) an **agent-session-end** signal MUST be recordable as a journal event (`agent.session-end`, e.g. via a Claude Code SessionEnd hook calling `journal write`); and (b) per-author event timestamps MUST be queryable so the session-recap producer can detect the **idle-timeout** boundary. Window definition and rollup production are owned by [session-recap](../session-recap/README.md); this Feature owns only emitting/storing the signals it consumes.

### Configuration

#### REQ: journal-config-block

[`repo-config`](../repo-config/README.md) MUST accept a project-level `journal:` block with keys `enabled` (default `true`), `path` (default `_specscore/journal/`, fully overridable), and `aggregation_periods` (default `[day, week, month]`). Setting `journal: null` or `journal.enabled: false` MUST disable writes entirely — existing skills' journal calls become no-ops.

#### REQ: cross-repo-gated

The Phase 2 keys `journal.repo` (cross-repo aggregation target) and `journal.stream` (override the inferred stream) MUST be documented but **rejected by the loader with a clear error** pointing at the [layered-config](../layered-config/README.md) Feature (**Under Review; not yet implemented**), until that Feature ships. Phase 1 writes always go to the current repo's resolved `journal.path`.

## Acceptance Criteria

### AC: event-written-on-resource-command

**Requirements:** journal-and-summary#req:implicit-auto-write, journal-and-summary#req:event-store-layout, journal-and-summary#req:event-record-schema

**Given** a SpecScore repo with the journal enabled
**When** the user runs `specscore idea new <slug>` (or any `<resource> new` / `<resource> change-status` subcommand)
**Then** exactly one event file is written at `<journal.path>/events/YYYY/MM/DD/<ts>-<machine>-<uuid>.json` carrying `type`, `timestamp`, `machine_id`, `source_repo`, `stream`, and a deterministic `data` payload.

### AC: explicit-write-records-event

**Requirements:** journal-and-summary#req:explicit-write, journal-and-summary#req:single-writer

**Given** a SpecScore repo with the journal enabled
**When** a skill runs `specscore journal write --type=checkpoint --data='{"note":"x"}'`
**Then** one event file is written with `type: checkpoint` and the given `data`, through the SpecScore CLI as the sole writer.

### AC: stream-resolved-at-write

**Requirements:** journal-and-summary#req:stream-resolution

**Given** a repo whose git origin is `git@github.com:SpecScore/specscore.git`, and a second repo with no origin remote
**When** events are written in each
**Then** the first repo's events carry `stream: specscore` (origin org, lowercased) and the second's carry `stream: <lowercased source_repo basename>`.

### AC: one-file-per-event-no-conflict

**Requirements:** journal-and-summary#req:event-store-layout

**Given** two machines writing events into one shared journal tree at the same timestamp
**When** the event filenames are generated (timestamp + machine-id + uuid)
**Then** the two files have distinct paths and a git merge of the two trees is a pure add with no conflict.

### AC: journal-show-lists-recent

**Requirements:** journal-and-summary#req:journal-show

**Given** a journal with events spanning several days
**When** the user runs `specscore journal show --since=24h`
**Then** only events from the last 24 hours are listed, across all streams by default, with `--stream=<name>` / `--no-stream` filtering as specified.

### AC: journal-summary-rolls-up

**Requirements:** journal-and-summary#req:journal-summary

**Given** a date-sharded journal of events
**When** the user runs `specscore journal summary --period=month`
**Then** a rollup for the period is produced as an on-demand projection that prunes to the relevant date range (does not open every event file), and a period outside `aggregation_periods` is rejected.

### AC: completed-event-carries-report-path-and-counts

**Requirements:** journal-and-summary#req:completed-event-payload

**Given** a `recap.completed` event recorded in the journal
**When** a consumer reads it
**Then** its `data` payload carries `report_path` (the hub-repo detail location) and the per-AC verdict counts, stored verbatim by the journal.

### AC: session-end-event-recorded

**Requirements:** journal-and-summary#req:session-trigger-signals

**Given** an agent session ending (e.g. a Claude Code SessionEnd hook)
**When** it calls `specscore journal write --type=agent.session-end`
**Then** an `agent.session-end` event is recorded, and per-author event timestamps remain queryable so the session-recap producer can detect the idle-timeout boundary.

### AC: cross-repo-keys-rejected

**Requirements:** journal-and-summary#req:cross-repo-gated

**Given** a project `specscore.yaml` setting `journal.repo` (or `journal.stream`) while the layered-config Feature has not shipped
**When** the config loader runs
**Then** the key is rejected with a clear error pointing at the layered-config dependency; `journal.enabled` / `journal.path` / `journal.aggregation_periods` are accepted.

### AC: journal-disabled-noop

**Requirements:** journal-and-summary#req:journal-config-block

**Given** a project `specscore.yaml` with `journal.enabled: false` (or `journal: null`)
**When** a `specscore <resource> new` command or a `journal write` call runs
**Then** no event file is written and the command otherwise succeeds (the journal call is a no-op).

## Rehearse Integration

Every AC above is testable through CLI invocation against a fixture repo (seeded git origin, journal tree, and `specscore.yaml`) plus filesystem/event-record inspection. The non-testable cases (e.g. inGitDB upstream API stability) are validated at the source Idea's assumption-validation layer, not as Rehearse scenarios. Rehearse scenario stubs are deferred to the Plan phase to match the current repo convention.

## Not Doing

Inherited from the source Idea and pinned here:

- **Phase 2 (`journal.repo` / `journal.stream` activation)** — ships as a *proposal* attached to this Feature once the [layered-config](../layered-config/README.md) Feature (**Under Review; not yet implemented**) ships; it is a config-loader lift-up, not a journal redesign.
- **Pre-computed / versioned rollup artifacts** committed to git — the rollup is a deterministic projection; computing on demand avoids drift and merge conflicts.
- **Scheduled / background / session-start / commit-hook aggregation** — pre-computation creates the fairness problem on-demand projection sidesteps.
- **Single JSONL file** — forces per-merge line-conflict resolution; one-file-per-event eliminates it.
- **inGitDB linkage in any consumer other than the SpecScore CLI** — keeps the dependency surface narrow.
- **Backfill of pre-journal history; retention/GC/compaction; studio dashboard; email/Slack digests** — each is a separate, additive Feature.

## Open Questions

- The `format:`/`https://specscore.md/...` spec URL (if any) for the journal capability vs. its event records, and whether journal event JSON participates in `specscore spec lint` at all (it is inGitDB-validated, not markdown).
- Whether `specscore journal write` should accept `--data-file=-` (stdin) for long structured payloads (likely yes; defer).
- **Dependencies / forward work:** the inGitDB Go library API + on-disk format stability (Must-be-true assumptions in the source Idea); the [**layered-config**](../layered-config/README.md) Feature (**Under Review; not yet implemented**) is a hard prerequisite for the Phase 2 proposal; emitting the `agent.session-end` signal requires a Claude Code SessionEnd hook (producer-side, coordinated with session-recap).

---
*This document follows the https://specscore.md/feature-specification*

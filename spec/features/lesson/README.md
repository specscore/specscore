---
format: https://specscore.md/feature-specification
status: Approved
---

# Feature: Lesson

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lesson?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lesson?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lesson?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lesson?op=request-change) |

**Status:** Approved
**Source Ideas:** —

## Contents

| Directory | Description |
|---|---|
| [_tests](_tests/README.md) | End-to-end scenarios for authoring, recurrence, and enforcement evidence |

## Summary

A Lesson is the durable, compact rule learned from a process gap. It is separate from append-only Occurrences that evidence the gap, so a recurring problem enriches evidence without repeatedly rewriting the lesson that names the improvement.

## Problem

A lessons-learned file often mixes the durable rule, an expanding incident diary, mutable counters, runtime-specific details, and hoped-for fixes. It becomes hard to find the rule, concurrent recurrence updates conflict on one file, and a claimed control can look enforced without reproducible proof.

## Behavior

### Lesson hierarchy and identity

```text
spec/lessons/
  README.md
  <lesson-slug>/
    README.md
    occurrences/
      <uuid-v4>.json
    legacy/                         # only when migration must retain raw bytes
      README.md
      <sha256-of-legacy-bytes>.md
```

#### REQ: lesson-location

Every Lesson MUST reside at `spec/lessons/<lesson-slug>/README.md`. `<lesson-slug>` is lowercase, hyphen-separated, and URL-safe. A legacy single file at `spec/lessons/<lesson-slug>.md` is not canonical after migration. `occurrences/` is reserved for child occurrence JSON and MUST NOT contain another Lesson README or arbitrary prose artifacts.

#### REQ: lesson-id

The directory slug is the Lesson's canonical stable ID. Links, duplicate relations, supersession relations, and occurrence paths use it. A new occurrence never changes this ID.

### Compact canonical Lesson

The Lesson README carries only the durable rule and information needed to understand, track, and enforce it:

```markdown
---
format: https://specscore.md/lesson-specification
status: Recorded
---

# Lesson: <short imperative rule>

**Status:** Recorded
**Date:** YYYY-MM-DD
**Owner:** <owner>
**Classifications:** <repository-defined, comma-separated values>
**Legacy Provenance:** —
**Duplicate Of:** —
**Supersedes:** —
**Superseded By:** —

## Lesson
<The durable rule: what should catch the gap, and why it did not.>

## Process Gap
<The failed check or feedback loop, not a raw incident transcript.>

## Tracking
- **Occurrence store:** `occurrences/`
- **Recurrence metadata:** derived from child JSON; never hand-maintained here.
- **Occurrence schema:** `https://specscore.md/new/lesson-occurrence.schema.json`

## Enforcement
**Control:** —
**Verification:** —
**Evidence:** —

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/lesson-specification*
```

#### REQ: lesson-required-fields

A Lesson MUST contain the frontmatter shown above, title `# Lesson: <Title>`, metadata in the shown order, and sections `Lesson`, `Process Gap`, `Tracking`, `Enforcement`, and `Open Questions` in that order. `Legacy Provenance`, `Duplicate Of`, `Supersedes`, and `Superseded By` use `—` when absent. Lesson is status-bearing: frontmatter `status:` mirrors body `**Status:**`.

#### REQ: progressive-disclosure

The Lesson README MUST be readable as the concise current rule without opening an occurrence. It MUST NOT contain raw logs, prompts, diffs, credentials, individual session transcripts, or a copied occurrence timeline. Investigation detail belongs in bounded occurrence fields and linked evidence.

### Controlled classifications and status ladder

`specscore.yaml` owns the legal vocabulary:

```yaml
lessons:
  classifications: [process, tooling, validation]
```

#### REQ: controlled-classifications

`**Classifications:**` MUST contain one or more unique values from `lessons.classifications`. The collection is repository-defined and closed for that repository; free-form tags do not satisfy this requirement. A repository changing its vocabulary migrates existing Lessons before removing a value.

#### REQ: lesson-statuses

`**Status:**` MUST be one of `Recorded`, `Stated`, `Enforced`, `Withdrawn`, or `Superseded`.

- `Recorded` captures a genuine gap and candidate lesson; it is not binding.
- `Stated` makes the rule visible in guidance, but not mechanically proven.
- `Enforced` means a deterministic control is active and its evidence is declared.
- `Withdrawn` and `Superseded` retain history without claiming the rule is active.

Only `Enforced` is a binding repository rule. The ladder is progressive: later status adds evidence and never erases the original gap or occurrences.

### Append-only Occurrences and derived recurrence

An Occurrence is a one-time observation that a Lesson's gap manifested or was confirmed. It is one JSON object at `occurrences/<uuid-v4>.json`; creating an occurrence MUST create a new file and MUST NOT edit a prior occurrence or the Lesson README.

#### REQ: occurrence-schema

Every occurrence MUST conform to the published [Occurrence JSON Schema](/new/lesson-occurrence.schema.json); unknown fields are rejected. The schema is the machine-readable contract and this example is illustrative:

```json
{
  "schema_version": 1,
  "id": "uuid-v4",
  "occurred_at": "2026-08-10T12:00:00Z",
  "summary": "A bounded factual statement of the manifestation.",
  "context": {
    "repository": "github.com/org/repository",
    "git": {"commit": "<sha-or-null>", "branch": "<name-or-null>"},
    "worktree": {"path_hint": "<relative-or-redacted>", "id": "<opaque-or-null>"},
    "execution": {"kind": "interactive|automation|ci|unknown", "id": "<opaque-or-null>"}
  },
  "evidence": {"kind": "url|path|command|none", "ref": "<bounded-reference-or-null>"},
  "redactions": ["<field-or-reason>"]
}
```

`id` MUST equal its filename without `.json`; the filename and `id` are UUID v4 values. `occurred_at` is an RFC 3339 UTC instant. `summary` is at most 500 Unicode code points; every string in `context`, `evidence.ref`, and `redactions` is at most 500; arrays contain at most 20 entries. Unavailable context is omitted or `null`.

Values MUST NOT contain secrets, access tokens, personal contact data, raw prompts, complete logs, or raw diffs. In particular, the original user or agent prompt MUST NEVER be committed to an occurrence, even when it explains the gap. `redactions` records only the field or reason omitted, never the omitted content. Git, worktree, and execution fields are generic context only; the format names no runtime or vendor. A worktree `path_hint` and `evidence.ref` whose kind is `path` are repository-relative or `redacted`, never absolute or containing `..`. The schema's `x-specscore-content-policy` defines the minimum property/value patterns every writer and validator MUST apply to every property name and string. A configured repository secret scanner is an additional check, not a replacement for that baseline. Validators MUST reject unsupported fields, overlong values, known credential/contact-bearing values, and raw-log or raw-prompt fields rather than silently discarding them.

#### REQ: recurrence-derived

Recurrence count, first occurrence time, last occurrence time, and status breakdown are derived by scanning valid child occurrence files. First and last are ordered by `occurred_at`; ties are broken by lexical occurrence path for a deterministic result. They MAY be shown by tooling or generated views, but are not author-maintained Lesson README fields. Adding an occurrence MUST NOT require a same-file update to the README or index. Invalid occurrence JSON fails validation rather than being silently omitted.

### Tracking and deterministic enforcement evidence

`## Tracking` is the stable pointer to `occurrences/`, declaration that recurrence is derived, and exact published Occurrence schema URL. `## Enforcement` contains the current control, reproducible verification, and proof location.

#### REQ: enforcement-evidence

A Lesson at `Enforced` MUST have non-empty `**Control:**`, `**Verification:**`, and `**Evidence:**` values. `Verification` MUST be a deterministic command or stable test/scenario reference returning the same result for the same repository revision and declared inputs. `Evidence` MUST be a stable repository-relative path, immutable URL, or content-addressed reference produced by that verification. “Checked manually” is insufficient. `Recorded` and `Stated` retain the fields as `—`; `Withdrawn` and `Superseded` retain historic evidence without claiming it is active.

### Duplicate and supersession relations

#### REQ: relations

`Duplicate Of`, `Supersedes`, and `Superseded By` refer to Lesson slugs or `—`. A discovered duplicate SHOULD add an occurrence to the canonical Lesson instead of creating another active Lesson. A retained duplicate is `Superseded`, carries `Duplicate Of: <canonical-slug>` and `Superseded By: <canonical-slug>`, and cannot be `Enforced`. A superseding Lesson declares `Supersedes: <prior-slug>`; tooling derives and synchronizes the prior Lesson's `Superseded By` and status. Relations MUST not form cycles.

### Legacy migration and compatibility

#### REQ: legacy-migration

Legacy `spec/lessons/<slug>.md` artifacts remain readable during a compatibility window. Migration creates `spec/lessons/<slug>/README.md` and sets `**Legacy Provenance:** spec/lessons/<slug>.md@<commit-or-uncommitted>`. It preserves the original legacy bytes losslessly: a committed source MAY be referenced by immutable commit URL; an uncommitted source MUST be copied byte-for-byte to `legacy/<sha256-of-legacy-bytes>.md`, with `legacy/README.md` identifying that immutable snapshot. The compact `Process Gap` may summarize or link to that evidence; it is not a replacement for the preserved source. Each independently useful historical incident becomes a new occurrence with `context.execution.kind: "unknown"` and a `redactions` entry where history lacks safe structured data. No occurrence is invented merely to populate a count.

During the window readers accept both paths but prefer the directory form; writers and scaffolders create only the directory form. A repository MUST NOT retain both forms for one slug after migration. Once configured repositories migrate, legacy-file support becomes a warning, then an error in a later CLI release; provenance remains valid indefinitely.

### CLI behavior

#### REQ: lesson-cli-commands

`specscore lesson new <slug>` MUST preflight the repository configuration before creating any path. If `specscore.yaml` or its non-empty `lessons.classifications` vocabulary is absent, it MUST fail with the configuration action needed and leave the working tree unchanged. Once configured, it MUST scaffold the directory-form Lesson from `new/lesson.md` and create an empty `occurrences/` directory; it MUST NOT create a legacy `<slug>.md` file. `specscore lesson recur <slug>` MUST validate and append exactly one new occurrence file without rewriting the Lesson README or index. `specscore lesson info <slug>` computes recurrence metadata from occurrence files, and `specscore lesson change-status <slug>` enforces the status ladder and `Enforced` evidence preconditions. CLI consumers receive the same directory form whether the artifact was hand-authored or scaffolded.

### Adherence footer

#### REQ: adherence-footer

Every Lesson document MUST end with an adherence footer per the [Adherence Footer feature](../adherence-footer/README.md). The footer URL MUST be `https://specscore.md/lesson-specification`.

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Lessons Index](../lessons-index/README.md) | Lists canonical Lesson directories and displays derived recurrence metadata without becoming a writer for it. |
| [Occurrence JSON Schema](/new/lesson-occurrence.schema.json) | Machine-readable, versioned validation contract for append-only occurrence files. |
| [Repo Config](../repo-config/README.md) | `lessons.classifications` supplies the controlled vocabulary. |
| [Artifact Frontmatter Convention](../artifact-frontmatter-convention/README.md) | Lesson is status-bearing and uses `format:`/`status:` mirror rules. |
| [Decision](../decision/README.md) | A Decision records a chosen architecture path; a Lesson records how the process must improve. |

## Acceptance Criteria

### AC: canonical-lesson-and-index-journey

**Requirements:** lesson#req:lesson-location, lesson#req:lesson-required-fields, lesson#req:controlled-classifications

Given a repository with `lessons.classifications: [process, validation]`, when an author creates `spec/lessons/review-before-merge/README.md` with `Classifications: process` and runs `specscore spec lint`, then the document passes, appears once in `spec/lessons/README.md`, and a free-form classification fails validation.

### AC: append-only-recurrence-journey

**Requirements:** lesson#req:occurrence-schema, lesson#req:recurrence-derived, lesson#req:progressive-disclosure

Given a valid canonical Lesson with one occurrence, when a second valid `occurrences/<uuid>.json` is added, then lint passes, lesson-info reports count two and deterministic first/last times ordered by `occurred_at` (then filename), and the Lesson README and existing occurrence remain byte-identical. An oversized summary, secret-bearing value, raw log, or original prompt fails validation.

### AC: enforcement-journey

**Requirements:** lesson#req:lesson-statuses, lesson#req:enforcement-evidence

Given a `Stated` Lesson with empty enforcement fields, when it changes to `Enforced` without deterministic verification and evidence, then lint fails. When it declares a stable control, deterministic verification command or scenario, and immutable evidence reference, lint passes and the control is discoverable from the compact README.

### AC: duplicate-supersession-journey

**Requirements:** lesson#req:relations

Given canonical Lesson `review-before-merge`, when a later Lesson supersedes it, then the successor names the prior slug, the prior Lesson is `Superseded` with derived `Superseded By`, both occurrence histories remain intact, and a cyclic or duplicate-of-plus-enforced relation fails validation.

### AC: legacy-migration-journey

**Requirements:** lesson#req:legacy-migration

Given legacy `spec/lessons/review-before-merge.md`, when migration runs, then it produces the directory-form README with legacy provenance, preserves safely representable history as child occurrence files, removes the old canonical path, and lint accepts the result. During the compatibility window the legacy file reads with a warning; after cutover it is rejected.

### AC: cli-scaffold-and-recur-journey

**Requirements:** lesson#req:lesson-cli-commands

Given a configured repository, when `specscore lesson new review-before-merge` runs, then it creates the canonical README and empty occurrence directory. When `specscore lesson recur review-before-merge` records a valid observation, then exactly one new JSON file appears, recurrence metadata is visible through `lesson info`, and the README is unchanged.

### AC: lesson-scaffold-preflight-journey

**Requirements:** lesson#req:lesson-cli-commands, repo-config#req:lessons-classifications

Given a repository without `specscore.yaml` or without a non-empty `lessons.classifications` vocabulary, when `specscore lesson new review-before-merge` runs, then it reports the missing configuration and creates or rewrites no files. Given a configured repository, the same command creates only the Lesson directory form and its empty occurrence directory.

## Open Questions

- Should an organization-level classification vocabulary supplement `specscore.yaml`, or is local ownership sufficient until repeated use demonstrates a stable cross-repository set?
- Should occurrence evidence support a content digest beside `evidence.ref` in v1, or wait for a generic evidence-reference structure?

---
*This document follows the https://specscore.md/feature-specification*

# Feature: Grade body-metadata field

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/canonical-grade-metadata-field?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/canonical-grade-metadata-field?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/canonical-grade-metadata-field?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/canonical-grade-metadata-field?op=request-change) |

**Status:** Approved
**Source Ideas:** canonical-grade-metadata-field

## Summary

Defines an optional, single-value quality **Grade** as a canonical body-metadata field on gradeable SpecScore artifacts. The value is validated by `specscore spec lint` against a value set that defaults to `A, B, C, D, F` and is configurable per repository in `specscore.yaml`. The field is defined generically — it is not coupled to any reviewer-gate workflow or to an artifact's `Status`.

## Contents

| Directory | Description |
|-----------|-------------|
| [_tests/](_tests/README.md) | Test scenarios for grade body-metadata-field requirements |

## Problem

Some SpecScore workflows want to record a quality grade on an artifact. In `specstudio-skills`, reviewer-gates already do this: producers write a `**Grade:** <letter>` body-metadata line on an approved artifact (its `grade-recording` requirement). Today that line is only lint-tolerated as a repo-local convention — it is not part of the canonical SpecScore schema, so the meaning, allowed values, and placement differ from repo to repo and lint cannot catch a typo or a rogue scale.

Promoting `**Grade:**` into the canonical schema makes grade recording uniform across repositories. Defining it generically (a quality letter, decoupled from how or when it is assigned) lets workflow-driven repos keep their existing convention while repos that never grade anything simply omit the field.

## Behavior

### The Grade field

`**Grade:**` is an optional body-metadata line in an artifact's header block — the run of bold-prefixed metadata lines between the title and the first `##` section.

#### REQ: grade-field-optional

A `**Grade:**` body-metadata line MAY appear on a gradeable artifact. Its absence is always valid: an artifact without a `**Grade:**` line MUST NOT produce any lint warning or error on account of the missing field.

#### REQ: grade-single-value

When present, `**Grade:**` MUST carry exactly one value — a single non-empty token drawn from the effective value set. An empty value, or a value containing more than one token (e.g. a list such as `A, B`), is a hard error. The field records the latest grade only; a re-grade overwrites the value in place. The canonical schema does NOT define a grade history or a per-gate breakdown.

#### REQ: grade-placement

When present, `**Grade:**` MUST appear inside the header block, after `**Status:**`. When other optional body-metadata lines are present (e.g. `**Source Ideas:**`, `**Supersedes:**`), `**Grade:**` MUST appear after them — it is the last line of the header block. A `**Grade:**` line placed before `**Status:**`, or outside the contiguous header block, is a hard error.

#### REQ: grade-artifact-scope

Any SpecScore artifact kind that has a body-metadata header block (e.g. Feature, Plan, Idea, Decision, Task) MAY carry a `**Grade:**` line. There is no per-kind allow-list and no opt-in: the field, its validation, and its placement rules apply uniformly wherever a header block exists.

#### REQ: grade-generic-definition

`**Grade:**` is defined generically as a quality grade. The canonical schema does NOT define who assigns the grade, when it is assigned, or what each value means. In particular, the field is NOT coupled to the reviewer-gate workflow that motivated it: a repository that defines no reviewer gates MAY still carry `**Grade:**` lines, and lint MUST accept them on the same terms as any other repository.

### Configurable value set

The set of allowed grade values is repository-configurable through `specscore.yaml` (see [repo-config](../repo-config/README.md)).

#### REQ: grade-values-config

`specscore.yaml` MAY declare a `grade:` block with a `values:` key:

```yaml
grade:
  values: [A, B, C, D, F]
```

When present, `grade.values` is the effective value set for the repository, replacing the default. The same value set applies to every gradeable artifact kind; per-kind value sets are out of scope (see Out of Scope).

#### REQ: grade-values-default

When `specscore.yaml` declares no `grade:` block (or a `grade:` block without `values:`), the effective value set is the built-in default `A, B, C, D, F`. A `**Grade:**` line is therefore always validated against some value set — the configured one when present, the default otherwise.

The default deliberately **excludes `E`**, following the academic letter-grade convention the scale borrows from (A–F with no E, so `F` reads unambiguously as the failing grade). Five buckets — excellent / good / acceptable / weak / fail — suffice for a review-quality signal; a different or finer scale (an `E`, a numeric `1–5`, or `pass/fail`) is expressed by declaring `grade.values` (see [REQ: grade-values-config](#req-grade-values-config)) rather than by enlarging the default.

#### REQ: grade-values-shape

When `grade.values` is present, it MUST be a non-empty YAML list of non-empty scalar tokens. An empty list (`values: []`), a scalar value (`values: A`), or a list containing an empty or non-scalar entry is a hard error. Duplicate tokens within the list SHOULD emit a lint advisory and are de-duplicated; they are not a hard error.

### Lint validation

#### REQ: grade-value-validated

`specscore spec lint` MUST reject a `**Grade:**` whose value is not a member of the effective value set, naming the artifact, the offending value, and the effective value set. A value that is a member of the effective set passes validation.

#### REQ: grade-no-status-coupling

Lint MUST NOT require any particular `Status` for a `**Grade:**` line to be present. A valid grade on a `Draft` artifact, an `Approved` artifact, or any other lifecycle status passes validation. The presence or absence of a grade MUST NOT affect, and MUST NOT be affected by, the artifact's `Status`.

## Dependencies

- [feature](../feature/README.md)
- [repo-config](../repo-config/README.md)

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [feature](../feature/README.md) | Adds `**Grade:**` to the canonical body-metadata field set (alongside `**Status:**`, `**Source Ideas:**`, `**Supersedes:**`). Placement is defined relative to those fields by `grade-placement`. |
| [repo-config](../repo-config/README.md) | Introduces the optional `grade.values` config key. `repo-config` owns the `specscore.yaml` schema; this Feature owns the `grade.values` shape, default, and lint semantics. |

## Acceptance Criteria

### AC: grade-absent-is-valid

**Requirements:** canonical-grade-metadata-field#req:grade-field-optional

**Given** a gradeable artifact whose header block has no `**Grade:**` line
**When** `specscore spec lint` runs
**Then** lint passes with no warning or error referencing a Grade field.

### AC: grade-single-token-enforced

**Requirements:** canonical-grade-metadata-field#req:grade-single-value

**Given** an artifact whose `**Grade:**` line is empty or carries more than one token (e.g. `**Grade:** A, B`)
**When** `specscore spec lint` runs
**Then** lint fails with a hard error stating that `**Grade:**` must carry exactly one value.

### AC: grade-placement-enforced

**Requirements:** canonical-grade-metadata-field#req:grade-placement

**Given** an artifact whose header block contains `**Status:**`, then `**Source Ideas:**`, then `**Grade:**` as the last metadata line
**When** `specscore spec lint` runs
**Then** lint passes; and **Given** the same artifact with `**Grade:**` moved above `**Status:**` or outside the header block, **When** lint runs, **Then** lint fails with a hard placement error.

### AC: grade-on-any-header-block-kind

**Requirements:** canonical-grade-metadata-field#req:grade-artifact-scope

**Given** a valid `**Grade:**` line on a non-Feature artifact that has a header block (e.g. a Plan)
**When** `specscore spec lint` runs
**Then** lint applies the same validation it applies to a Feature — the value is checked against the effective value set and the placement rule is enforced — with no kind-specific exemption or rejection.

### AC: grade-decoupled-from-workflow-and-status

**Requirements:** canonical-grade-metadata-field#req:grade-generic-definition, canonical-grade-metadata-field#req:grade-no-status-coupling

**Given** a repository that declares no reviewer gates, containing a `Draft` artifact with a valid `**Grade:**` value
**When** `specscore spec lint` runs
**Then** lint accepts the grade — neither the absence of a reviewer-gate workflow nor the `Draft` status causes a Grade-related error.

### AC: grade-default-scale-validated

**Requirements:** canonical-grade-metadata-field#req:grade-values-default, canonical-grade-metadata-field#req:grade-value-validated

**Given** a repository whose `specscore.yaml` declares no `grade:` block, with one artifact graded `**Grade:** A` and another graded `**Grade:** Z`
**When** `specscore spec lint` runs
**Then** the `A` grade passes against the default set `A, B, C, D, F`, and the `Z` grade fails with a hard error naming the value and the effective default set.

### AC: grade-custom-scale-validated

**Requirements:** canonical-grade-metadata-field#req:grade-values-config, canonical-grade-metadata-field#req:grade-value-validated

**Given** a repository whose `specscore.yaml` declares `grade.values: [1, 2, 3, 4, 5]`, with one artifact graded `**Grade:** 3` and another graded `**Grade:** A`
**When** `specscore spec lint` runs
**Then** the `3` grade passes against the configured set, and the `A` grade fails with a hard error naming the value and the configured set.

### AC: grade-values-shape-errors

**Requirements:** canonical-grade-metadata-field#req:grade-values-shape

**Given** a `specscore.yaml` whose `grade.values` is malformed — an empty list (`values: []`), a scalar (`values: A`), or a list with an empty entry
**When** `specscore spec lint` runs
**Then** the load fails with a hard error identifying the violated `grade-values-shape` rule; no implicit value set is substituted.

## Out of Scope

- **Reviewer-gate coupling** — Grade is generic; who assigns it and when is owned by each repo's workflow (e.g. `specstudio-skills` reviewer-gates), not by this Feature.
- **Grade history / per-gate breakdown** — the field holds one latest value, overwritten on re-grade.
- **Per-artifact-kind value sets** — a single repo-wide `grade.values` applies to all kinds; per-kind scales are a possible later refinement.
- **Status coupling** — lint validates the value only; it never requires a particular `Status` for a grade to be present.

## Rehearse Integration

Every acceptance criterion has a lint (CLI) surface, so a stub Scenario was scaffolded per AC under `_tests/`. The stubs are pending: the lint rule and `grade.values` config they exercise do not exist yet and are written at implementation time.

## Open Questions

None at this time. (Resolved: the default value set is `A, B, C, D, F` — no `E` — per [REQ: grade-values-default](#req-grade-values-default); and `**Grade:**` placement is auto-normalized by `specscore spec lint --fix` per [REQ: grade-placement](#req-grade-placement).)

---
*This document follows the https://specscore.md/feature-specification*

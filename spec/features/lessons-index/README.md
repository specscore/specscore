---
format: https://specscore.md/feature-specification
status: Approved
---

# Feature: Lessons Index

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lessons-index?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lessons-index?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lessons-index?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/lessons-index?op=request-change) |

**Status:** Approved
**Source Ideas:** —

## Summary

The Lessons Index at `spec/lessons/README.md` is the concise inventory of process-improvement Lessons. It presents recurrence as derived read-model data, never as a hand-maintained counter.

## Problem

Without a canonical index, lessons disappear into retrospectives. A mutable recurrence counter would also race concurrent occurrence writers and create a second, unreliable source of truth.

## Behavior

This feature inherits location, section, completeness, and footer rules from [Index](../index/README.md). It defines only Lesson-specific columns and derived-data behavior.

### Index columns

#### REQ: lesson-index-columns

The `## Lessons` table MUST contain, in order: `Lesson`, `Status`, `Classifications`, `Occurrences`, `Last Occurred`, and `Enforcement`. `Lesson` links to `<slug>/README.md`; `Occurrences` and `Last Occurred` are derived from child occurrence JSON; `Enforcement` is the Lesson's declared `Control` or `—`. The index MAY be generated or refreshed by tooling, but authors do not edit derived cells to record a new occurrence.

#### REQ: canonical-only

The index lists every canonical directory-form Lesson exactly once. Legacy single-file Lessons are listed only during the compatibility window and marked `Legacy`; a retained duplicate is listed with `Duplicate Of` rather than presented as an independent active rule.

### Adherence footer

#### REQ: adherence-footer

Every lessons index MUST end with an adherence footer per the [Adherence Footer feature](../adherence-footer/README.md). The footer URL MUST be `https://specscore.md/lessons-index-specification`.

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Lesson](../lesson/README.md) | Aggregates canonical Lesson metadata and child occurrence-derived values. |
| [Index](../index/README.md) | Inherits shared index structure and completeness rules. |
| [Adherence Footer](../adherence-footer/README.md) | Supplies the delegated footer mechanism. |
| [Document Types Registry](../document-types-registry/README.md) | Registers this Index-Kind type at `spec/lessons/README.md`. |

## Acceptance Criteria

### AC: index-derives-recurrence

**Requirements:** lessons-index#req:lesson-index-columns, lessons-index#req:canonical-only

Given two canonical Lessons with occurrence files, when the index is generated or refreshed, then it lists each directory once with the correct derived occurrence count and last-occurrence time. Adding an occurrence changes only child JSON until the generated view is refreshed; it does not make the README a mutable counter.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

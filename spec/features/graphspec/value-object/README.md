---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: ValueObjectSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/value-object?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/value-object?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/value-object?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/value-object?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

ValueObjectSpec describes an immutable concept without identity.

Examples: Money, Address, DateRange, GeoLocation.

## Problem

GraphSpec needs a way to describe reusable structured values that are identified by their content rather than a stable id.

## Behavior

ValueObjectSpec should eventually support structure, validation, examples, invariants, and reuse across entities, commands, and events.

Provisional shape:

```yaml
---
kind: value-object
id: date-range
name: DateRange
owner: calendarius
status: draft
summary: A start and end time used to describe a scheduled interval.
---
```

## Acceptance Criteria

- ValueObjectSpec is documented as a GraphSpec kind for immutable concepts without identity.
- The README records the unresolved relationship between value objects, properties, and enums.

## Open Questions

- Should enums be specialised value objects?
- Should value objects own properties or only define shape?
- How should value object versioning work?

---
*This document follows the https://specscore.md/feature-specification*

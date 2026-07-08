---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: EnumSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/enum?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/enum?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/enum?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/enum?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

EnumSpec describes a reusable enumeration.

Examples: BookingStatus, MembershipRole.

## Problem

GraphSpec needs controlled vocabularies that can be reused across entities, commands, events, APIs, and tests.

## Behavior

Whether EnumSpec should remain independent or become a specialised ValueObjectSpec is unresolved.

Provisional shape:

```yaml
---
kind: enum
id: booking-status
name: BookingStatus
owner: bookius
status: draft
values:
  - requested
  - confirmed
  - cancelled
---
```

## Acceptance Criteria

- EnumSpec is documented as a reusable enumeration kind.
- The README records the unresolved enum versus value-object question.

## Open Questions

- Should EnumSpec remain independent?
- Should enums become specialised ValueObjectSpec?
- How should externally governed enumerations be represented?
- How should enum value deprecation work?

---
*This document follows the https://specscore.md/feature-specification*

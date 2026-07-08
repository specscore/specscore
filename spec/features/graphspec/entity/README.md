---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: EntitySpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/entity?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

EntitySpec describes a domain concept with identity.

Examples: User, Space, Contact, Booking, Asset.

## Problem

GraphSpec needs a durable way to describe things that can be referred to over time as the same thing, even as their properties or relationships change.

## Behavior

EntitySpec should eventually support identity, ownership, lifecycle, properties, relationships, invariants, permissions, examples, and deprecation.

Provisional shape:

```yaml
---
kind: entity
id: booking
name: Booking
owner: bookius
status: draft
identity:
  type: stable-id
summary: A reservation for a resource during a time window.
---
```

## Acceptance Criteria

- EntitySpec is documented as a GraphSpec kind for concepts with identity.
- The README records that properties, lifecycle, inheritance, composition, and mixins are not yet settled.

## Open Questions

- Are properties intrinsic to EntitySpec or references to PropertySpec?
- Should entities declare relationships inline?
- How should lifecycle be represented?
- How should inheritance, composition, and mixins be handled?

---
*This document follows the https://specscore.md/feature-specification*

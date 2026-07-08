---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: RelationshipSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/relationship?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

RelationshipSpec describes a reusable relationship definition between domain concepts.

Examples: owns, memberOf, bookedBy.

## Problem

GraphSpec needs to decide whether relationships are first-class artifacts or metadata embedded inside entities and value objects.

## Behavior

Keeping relationships first-class may help with graph analysis, diagrams, cross-module review, and reuse. Embedding relationships inside EntitySpec may be easier for authors and simpler for validation.

Provisional shape:

```yaml
---
kind: relationship
id: booking-books-resource
name: books
owner: bookius
status: draft
from: bookius.Booking
to: assetus.Asset
cardinality: many-to-one
summary: A booking reserves one bookable resource.
---
```

## Acceptance Criteria

- RelationshipSpec is documented as provisional and unresolved.
- The README records both first-class and embedded alternatives.

## Open Questions

- Should RelationshipSpec remain first-class?
- Should relationships have identity?
- Can relationships carry properties, lifecycle, permissions, or audit history?
- How should cross-module relationships be owned?

---
*This document follows the https://specscore.md/feature-specification*

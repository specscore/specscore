---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: ModuleSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/module?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

ModuleSpec describes an architectural module or bounded context.

Examples: core, contactius, calendarius, assetus, bookius.

## Problem

GraphSpec needs a reusable module concept that is not tied to Sneat extension naming.

## Behavior

Modules are expected to own entities, commands, and events. It remains open whether modules also own relationships, policies, projections, workflows, and runtime instances.

Modules may be defined in the same repository, in separate module spec repositories, or next to module code. Cross-repo references should reuse SpecScore's unified linking model.

Provisional shape:

```yaml
---
kind: module
id: bookius
name: Bookius
status: draft
summary: Booking domain module.
owns:
  entities:
    - Booking
  commands:
    - CreateBooking
    - CancelBooking
  events:
    - BookingCreated
    - BookingCancelled
---
```

## Acceptance Criteria

- ModuleSpec is documented as the reusable name for architectural modules.
- The README records that Sneat extensions are one possible implementation of modules.

## Open Questions

- Should ModuleSpec describe runtime instances or only architectural modules?
- How should cross-module ownership be represented?
- Should modules own relationships?
- How should modules import or depend on each other?
- How should multiple `graph/` roots be indexed across repositories?

---
*This document follows the https://specscore.md/feature-specification*

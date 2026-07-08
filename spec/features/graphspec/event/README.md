---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: EventSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/event?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/event?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/event?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/event?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

EventSpec describes a fact that happened.

Examples: BookingCreated, BookingCancelled, MemberInvited.

## Problem

GraphSpec needs event descriptions that are not limited to command outcomes. Events may originate from commands, integrations, timers, external systems, automation, or manual correction.

## Behavior

Avoid a single `raisedBy` field. Prefer richer concepts such as subject, participants, possible triggers, source systems, and causation notes.

Provisional shape:

```yaml
---
kind: event
id: booking-created
name: BookingCreated
owner: bookius
status: draft
subject: bookius.Booking
participants:
  - assetus.Asset
  - contactius.Contact
possibleTriggers:
  - command: bookius.CreateBooking
  - source: external-system
---
```

## Acceptance Criteria

- EventSpec is documented as factual history.
- Event origins are described as flexible and not limited to commands.

## Open Questions

- Should events reference commands?
- How should external, timer, and automation events be represented?
- Should event payloads be full schemas or references to entities and value objects?

---
*This document follows the https://specscore.md/feature-specification*

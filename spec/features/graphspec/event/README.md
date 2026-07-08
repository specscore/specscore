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

GraphSpec needs event descriptions that are not limited to command outcomes. Events may originate from commands, integrations, timers, external systems, automation, or manual correction — without hand-maintained links back to commands that drift.

## Behavior

Avoid a single `raisedBy` field. Prefer subject, participants, and sources.

Shape (bare kebab-case `id`; references use computed qualified IDs):

```yaml
---
kind: event
id: booking-created
name: BookingCreated
status: draft
subject: reservations.booking
participants:
  - catalog.asset
  - directory.contact
sources:
  - external-system
  - automation
---
```

Rules:

- **Events declare only non-command sources.** `sources` lists origins such as `timer`, `integration`, `external-system`, `automation`, and `manual-correction`. Command triggers are NOT listed on the event; tooling derives them from CommandSpec `possibleEvents` ([current decisions](../decisions.md)). This keeps the command-event link authored in exactly one place.
- Event payload shape references the subject entity's ModelSpec model or dedicated ModelSpec models; events embed no field definitions.
- EventSpec records factual history: an event artifact describes what the fact means, not how it is produced.

## Acceptance Criteria

- EventSpec is documented as factual history.
- Event origins are documented as flexible: derived command triggers plus declared non-command sources.
- Events author no command links of their own.

## Open Questions

- Should event payloads be references to entities/models only, or may events need dedicated payload models routinely?
- Should `sources` values be an open set or a controlled vocabulary?
- How should causation between events (event → event) be represented, if at all?

---
*This document follows the https://specscore.md/feature-specification*

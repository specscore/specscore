---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: CommandSpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/command?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/command?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/command?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/command?op=request-change) |
**Status:** Draft
**Source Ideas:** graphspec

## Summary

CommandSpec describes an intention that can be requested.

Examples: CreateBooking, CancelBooking, InviteMember.

## Problem

GraphSpec needs a way to describe requested intent without forcing every command into a fixed event-emission model, and without hand-maintained bidirectional command-event links that drift.

## Behavior

Commands reference GraphSpec concepts. Commands may succeed or fail. Commands do not imply events as a language rule.

Shape (bare kebab-case `id`; references use computed qualified IDs; input types reference ModelSpec):

```yaml
---
kind: command
id: create-booking
name: CreateBooking
status: draft
subject: reservations.booking
actors:
  - identity.user
inputs:
  - name: resource
    ref: catalog.asset
  - name: time-window
    model: modelspec://scheduling.TimeWindow
possibleEvents:
  - reservations.booking-created
---
```

Rules:

- **Command-event links are declared here, one-directionally.** `possibleEvents` on the command is the single authored source of command-to-event links. Events do not list commands; tooling derives an event's command triggers from CommandSpecs ([current decisions](../decisions.md)).
- `possibleEvents` records possible outcomes, not a contract: a command may emit zero, one, or several of them.
- **`inputs:` items have a fixed shape.** Each item carries `name` (kebab-case, unique within the command) plus exactly one of `ref:` (a qualified graph reference) or `model:` (a `modelspec://` reference). Items with both, neither, or embedded field definitions are invalid — commands carry no structure of their own. *(Made normative after the first consumer pilot exercised both forms in one command.)*
- Failure cases are documented in prose (`## Failure Cases`) until a normative representation is designed.

## Acceptance Criteria

- CommandSpec is documented as requested intent.
- Command-event references are documented as possible links, authored only on the command side.
- Inputs reference ModelSpec or graph concepts without embedding structure.

## Open Questions

- Should failures become first-class (structured failure cases, policy references), and when?
- Should `possibleEvents` entries carry conditions (when does CreateBooking emit BookingCreated)?
- Should permissions live on commands, policies, or both?
- How should idempotency and validation be described?

---
*This document follows the https://specscore.md/feature-specification*

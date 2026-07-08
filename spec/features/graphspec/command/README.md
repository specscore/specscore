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

GraphSpec needs a way to describe requested intent without forcing every command into a fixed event-emission model.

## Behavior

Commands reference GraphSpec concepts. Commands may succeed or fail. Commands do not imply events as a language rule.

Provisional shape:

```yaml
---
kind: command
id: create-booking
name: CreateBooking
owner: bookius
status: draft
subject: bookius.Booking
actors:
  - core.User
inputs:
  - resource
  - timeWindow
possibleEvents:
  - bookius.BookingCreated
---
```

## Acceptance Criteria

- CommandSpec is documented as requested intent.
- Command-event references are described as possible links, not mandatory outcomes.

## Open Questions

- Should commands reference possible events?
- How should failures be represented?
- Should permissions live on commands, policies, or both?
- How should idempotency and validation be described?

---
*This document follows the https://specscore.md/feature-specification*

---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Event

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/event?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/event?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/event?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/event?op=request-change) |
**Status:** Draft
**Source Ideas:** domain-behavior-artifacts

## Summary

An event describes a fact that happened — BookingCreated, IdentityShared, ShareExpired.

It names the concept it is about, who took part and in which role, and where it can come from other than a command. An event that nothing requested — a timer, an integration, an automation — declares the lifecycle transition it causes.

## Problem

Events originate from commands, timers, integrations, external systems and manual corrections. A single "raised by" field cannot say that, and listing commands on events duplicates links that commands already author. Participants of the same concept in different roles — guardian and ward — are indistinguishable without role labels.

## Behavior

```yaml
---
kind: event
id: share-expired
name: ShareExpired
status: Draft
summary: An identity share reached its expiry time.
subject: meaning:///identity-share
participants:
  - ref: meaning:///contact
    role: guardian
  - ref: meaning:///contact
    role: recipient
sources:
  - timer
transition:
  property: meaning:///identity-share-status
  from: [active]
  to: expired
---
```

#### REQ: event-subject

`subject` is REQUIRED and MUST be a meaning reference to an entity or value-set concept. `fact` is OPTIONAL and, when present, is a meaning reference to the entity concept that represents occurrences of this event as data (an entity that extends an event concept).

#### REQ: participants

`participants` is OPTIONAL. Each item is either a meaning reference to an entity concept or a map `{ref, role}` whose `role` is one bare kebab-case token. A role is REQUIRED on every item whose `ref` appears more than once in the list; two items with the same `ref` and the same or no role are a validation error.

#### REQ: non-command-sources

`sources` lists only origins other than commands, from the set `timer`, `integration`, `external-system`, `automation`, `manual-correction`. An event with no `sources` key is command-triggered only; `sources: []` is a warning. An unknown source is a validation error. Events MUST NOT list commands; command triggers are derived from commands' `possibleEvents`.

#### REQ: event-transition

`transition` is OPTIONAL, follows domain-behavior's transition rules, and is allowed only when `sources` is present: a command-triggered transition is declared on the command. Its `property` MUST be a property of the event's `subject` concept.

#### REQ: payload-model

`model` is OPTIONAL and, when present, is a `modelspec://` reference to the DataModel record type of the event's payload. Events embed no field definitions.

#### REQ: triggerless-event

An event with no `sources` that no command lists in `possibleEvents` is reported as a warning: nothing can produce it.

## Dependencies

- domain-behavior

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Command](../command/README.md) | Commands author command → event links; triggers are derived from them |
| [Policy](../policy/README.md) | A policy invariant may be stated for the concept an event transitions |

## Acceptance Criteria

### AC: valid-event

**Requirements:** domain-behavior/event#req:event-subject, domain-behavior/event#req:participants, domain-behavior/event#req:non-command-sources, domain-behavior/event#req:event-transition

The example above lints clean. Two `contact` participants without roles, a `sources` entry `cron`, a `commands:` key, and a transition on an event with no `sources` each fail lint.

### AC: payload-and-fact

**Requirements:** domain-behavior/event#req:event-subject, domain-behavior/event#req:payload-model

A `model` naming an existing DataModel record type and a `fact` naming an entity concept lint clean; a `fields:` key or a `fact` naming a property concept fails.

### AC: unreachable-event-warned

**Requirements:** domain-behavior/event#req:triggerless-event

An event with no `sources` that no command emits produces one warning naming the event; adding it to a command's `possibleEvents` clears the warning.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

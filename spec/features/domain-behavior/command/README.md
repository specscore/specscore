---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Command

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/command?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/command?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/command?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/command?op=request-change) |
**Status:** Draft
**Source Ideas:** domain-behavior-artifacts

## Summary

A command describes an intention that can be requested — CreateBooking, ShareIdentity, InviteMember.

It names the concept it acts on, who may request it, its inputs, the lifecycle transition it causes when it succeeds and the events it may emit. Command → event links are authored here and only here.

## Problem

Requested intent spans actors, concepts, state and outcomes. Without a typed artifact, "who can do what to which concept, and what follows" lives in prose that no tool can check, and links between commands and their events drift when maintained on both sides.

## Behavior

```yaml
---
kind: command
id: share-identity
name: ShareIdentity
status: Draft
summary: Grant a scoped, optionally time-limited share of one contact's identity from a family card.
subject: meaning:///identity-share
actors:
  - meaning:///user
inputs:
  - name: card
    meaning: meaning:///family-card
  - name: subject
    meaning: meaning:///contact
  - name: scope
    model: modelspec:///familycard.ShareScope
  - name: consent
    meaning: meaning:///consent
transition:
  property: meaning:///identity-share-status
  to: active
possibleEvents:
  - identity-shared
---
```

This is `sneat-co/backstage` `familycard/commands/share-identity` converted: the GraphSpec references `familycard.identity-share`, `core.user`, `familycard.family-card`, `contactius.contact` and `familycard.consent` become meaning concepts, and the command now states that it creates the share in state `active`.

#### REQ: subject-and-actors

`subject` is REQUIRED and MUST be a meaning reference to an entity or value-set concept. `actors` is OPTIONAL and, when present, is a non-empty list of meaning references to entity concepts.

#### REQ: input-shape

`inputs` is OPTIONAL. Each item MUST carry `name` (kebab-case, unique within the command) and exactly one of `meaning` (a meaning reference) or `model` (a `modelspec://` reference). An item with both, neither, or any other key is a validation error — commands carry no structure of their own.

#### REQ: possible-events

`possibleEvents` is OPTIONAL; each entry MUST resolve to an event artifact. It lists possible outcomes, not a contract: a command may emit none, one or several. It is the single authored source of command → event links; tooling derives each event's command triggers from it.

#### REQ: command-transition

`transition` is OPTIONAL and follows domain-behavior's transition rules. Its `property` MUST be a property of the command's `subject` concept: the property's `of` names the subject or a concept the subject extends. A command that creates its subject declares a transition without `from`.

#### REQ: failure-cases-prose

Failure cases are written in a `## Failure Cases` body section. No frontmatter key describes them in this version.

## Dependencies

- domain-behavior

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Event](../event/README.md) | Events are the targets of `possibleEvents`; their command triggers are derived from commands |
| [Policy](../policy/README.md) | A policy may apply to a command and name its inputs |
| [Requirement](../../requirement/README.md) | The owning Feature's REQs state the behavior in prose; code `implements` those REQs |

## Acceptance Criteria

### AC: valid-command

**Requirements:** domain-behavior/command#req:subject-and-actors, domain-behavior/command#req:input-shape, domain-behavior/command#req:possible-events, domain-behavior/command#req:command-transition

The example above lints clean. A missing `subject`, an input with both `meaning` and `model`, a `possibleEvents` entry naming no event, and a transition on a property of another concept each fail lint; removing `transition` from a creating command is accepted (a transition is optional).

### AC: derived-triggers

**Requirements:** domain-behavior/command#req:possible-events

Querying an event's triggers returns every command listing it in `possibleEvents`, and the event file itself names no command.

### AC: failure-cases-in-body

**Requirements:** domain-behavior/command#req:failure-cases-prose

A `failureCases:` frontmatter key fails lint as an unknown key; a `## Failure Cases` body section is accepted.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

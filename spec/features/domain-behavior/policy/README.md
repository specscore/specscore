---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Policy

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/policy?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/policy?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/policy?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior/policy?op=request-change) |
**Status:** Draft
**Source Ideas:** domain-behavior-artifacts

## Summary

A policy states a cross-cutting domain rule — "sharing a ward's identity requires the guardian's granted consent" — in a small typed clause vocabulary whose operands are only things that already exist: commands, their inputs, and MeaningGraph concepts and values.

Lint checks that every operand resolves. It does not evaluate the rule: with no instance data at specification time there is nothing to evaluate against.

## Problem

Rules that cross concepts — conditional requirements, actor qualification, lifecycles that depend on each other — otherwise live in prose with no identity and no check when a concept, state or input they mention is renamed. A rule about one command or one concept is a REQ of its Feature; a rule that crosses them needs an artifact of its own.

## Behavior

`sneat-co/backstage` `familycard/policies/guardian-consent-required` converted (concept ids as the backstage migration would name them):

```yaml
---
kind: policy
id: guardian-consent-required
name: GuardianConsentRequired
status: Draft
summary: Sharing a ward's identity requires the guardian's granted consent.
applies:
  command: share-identity
when:
  - value-is:
      input: subject
      via: {inverse: meaning:///household-member-contact}
      property: meaning:///household-member-role
      value: child
requires:
  - value-is:
      input: consent
      property: meaning:///consent-status
      value: granted
  - actor-is:
      via: {inverse: meaning:///contact-user}
      property: meaning:///guardianship-guardian
---
```

And `consent-void-on-revocation`:

```yaml
applies:
  concept: meaning:///consent
invariant:
  - when:
      via: meaning:///consent-guardianship
      property: meaning:///guardianship-status
      value: revoked
    then:
      property: meaning:///consent-status
      value: revoked
```

#### REQ: applies-target

`applies` is REQUIRED and carries exactly one of `command` (a behavior reference that resolves to a command) or `concept` (a meaning reference to an entity concept). A rule about a relationship applies to the entity that represents it (an association concept).

#### REQ: via-steps

A `via` is one step from one instance to another along a reference property P (a property concept whose `values-of` names an entity or value set). Written as a meaning reference to P, it is **forward**: from an instance of P's `of` concept to the instance P's value names. Written as `{inverse: <reference to P>}`, it is **inverse**: from an instance of P's `values-of` concept to the instances of P's `of` concept whose P names it. A step is valid only when the instance it starts from is of the concept the direction requires, or of a concept that extends it.

#### REQ: clause-vocabulary

`when` (conditions) and `requires` (requirements) are OPTIONAL lists; `invariant` is OPTIONAL and allowed only when `applies` names a concept. The clause forms are exactly:

| Clause | Allowed in | Operands |
|---|---|---|
| `value-is` | `when`, `requires` | `property`, `value`; optional `input` (a command input; only when `applies` is a command) and `via`. The clause reads `property` on the instance reached from the start — the named input, or the applies concept's instance — through `via` when present |
| `actor-is` | `requires`, only when `applies` is a command | `property`; optional `via`. The instance reached from the requesting actor through `via` (or the actor itself) must be the value of `property` on some instance |
| `invariant` | — | a list of `{when: {via, property, value}, then: {property, value}}`: when the instance reached from the applies instance through `via` carries the `when` value, the applies instance must carry the `then` value |

An unknown clause or operand key is a validation error. New clause forms are admitted only when a consumer needs them, by amending this list; GraphSpec's `exists` form is not carried over because no converted policy needs it.

#### REQ: operands-resolve

Every operand MUST resolve, and lint checks this and nothing more: `input` names an input of the applies command and starts at that input's concept; each `via` is valid per via-steps from the instance it starts at; `property` is a property or dimension concept whose `of` is the concept reached (or a concept that concept extends), and `value` is a value id of the value set its `values-of` names; for `actor-is`, the applies command declares `actors`, the step starts at one of them, and the concept reached is `property`'s `values-of` concept or extends it; `invariant.then.property` belongs to the applies concept.

#### REQ: no-expressions

Policies carry no expression language. A comparison or ordering the clause vocabulary cannot state ("scope school fits within full") is written as a REQ of the owning Feature. If a runtime consumer later needs evaluable rules, an existing language is adopted rather than one invented.

#### REQ: policy-closure

A policy that applies to a command of another Feature is subject to domain-behavior's dependency closure, like any cross-Feature behavior reference.

## Dependencies

- domain-behavior

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Command](../command/README.md) | A policy may apply to a command and name its inputs and actors |
| [Meaning References](../../meaning-references/README.md) | Resolves every concept, property and value operand |

## Acceptance Criteria

### AC: valid-policy

**Requirements:** domain-behavior/policy#req:applies-target, domain-behavior/policy#req:clause-vocabulary, domain-behavior/policy#req:operands-resolve, domain-behavior/policy#req:via-steps

Both examples above lint clean against concepts that exist with those properties and value sets. A missing `applies`, both `command` and `concept` under `applies`, an `invariant` on a command policy, an `input` the command does not declare, a `value` not in the property's value set, an `actor-is` on a command with no `actors`, a forward `via` written where only the inverse direction connects the two concepts, and an unknown clause each fail lint.

### AC: expressions-refused

**Requirements:** domain-behavior/policy#req:no-expressions

A `value` such as `granted && active`, which is not a value id of the property's value set, fails lint as an unresolvable operand, and the error message suggests writing the rule as a Feature REQ.

### AC: cross-feature-policy

**Requirements:** domain-behavior/policy#req:policy-closure

A policy applying to a command of a Feature outside its owner's dependency closure fails lint; adding that Feature to the owner's `## Dependencies` clears it.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

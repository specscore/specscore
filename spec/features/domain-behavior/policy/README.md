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
      via: meaning:///household-member-member
      property: meaning:///household-member-role
      value: child
requires:
  - exists:
      concept: meaning:///consent
      property: meaning:///consent-status
      value: granted
  - actor-is:
      property: meaning:///guardianship-guardian
---
```

#### REQ: applies-target

`applies` is REQUIRED and carries exactly one of `command` (a behavior reference that resolves to a command) or `concept` (a meaning reference to an entity concept). A rule about a relationship applies to the entity that represents it (an association concept).

#### REQ: clause-vocabulary

`when` (conditions) and `requires` (requirements) are OPTIONAL lists; `invariant` is OPTIONAL and allowed only when `applies` names a concept. The clause forms are exactly:

| Clause | Allowed in | Operands |
|---|---|---|
| `value-is` | `when`, `requires` | `property`, `value`; optional `input` (a command input, when `applies` is a command) and `via` (a reference property leading from that instance to the instance that carries `property`) |
| `exists` | `requires` | `concept`; optional `property` and `value` that the existing instance must carry |
| `actor-is` | `requires` | `property`, a reference property whose value must be the requesting actor (`applies` is a command) |
| `invariant` | — | a list of `{when: {via, property, value}, then: {property, value}}`: when the instance reached through `via` carries the value, the applies instance must carry the `then` value |

An unknown clause or operand key is a validation error. New clause forms are admitted only when a consumer needs them, by amending this list.

#### REQ: operands-resolve

Every operand MUST resolve, and lint checks this and nothing more: `input` names an input of the applies command; `via` is a reference property concept (its `values-of` names an entity) connecting the instances the clause names; `property` is a property or dimension concept of the concept it is read from, and `value` is a value id of the value set its `values-of` names; `actor-is.property` is a property whose `values-of` is an entity concept compatible with one of the command's `actors`; `invariant.then.property` belongs to the applies concept.

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

**Requirements:** domain-behavior/policy#req:applies-target, domain-behavior/policy#req:clause-vocabulary, domain-behavior/policy#req:operands-resolve

The example above lints clean against concepts that exist with those properties and value sets. A missing `applies`, both `command` and `concept` under `applies`, an `invariant` on a command policy, an `input` the command does not declare, a `value` not in the property's value set, and an unknown clause each fail lint.

### AC: expressions-refused

**Requirements:** domain-behavior/policy#req:no-expressions

A clause value such as `consent.status == 'granted'` fails lint as an unresolvable operand, and the error points to writing the rule as a Feature REQ.

### AC: cross-feature-policy

**Requirements:** domain-behavior/policy#req:policy-closure

A policy applying to a command of a Feature outside its owner's dependency closure fails lint; adding that Feature to the owner's `## Dependencies` clears it.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

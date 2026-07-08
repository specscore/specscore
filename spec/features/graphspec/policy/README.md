---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: PolicySpec

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/policy?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/policy?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/policy?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/graphspec/policy?op=request-change) |

**Status:** Draft
**Source Ideas:** graphspec

## Summary

PolicySpec expresses a cross-cutting domain constraint through a small typed
clause vocabulary whose operands are only things the graph already knows —
entities, commands, relationships, lifecycle states, ModelSpec model properties,
and role labels. Added by [decision 0013](../../../decisions/0013-rules-and-policies.md);
design history in [policy-layer.md](../policy-layer.md).

Examples: "sharing a ward's identity requires the guardian's granted consent";
"a consent is void when its guardianship is revoked".

## Problem

Domain rules that cross artifacts — conditional requirements, cross-entity
lifecycle dependencies, actor qualification — otherwise live in prose: no
identity, no inventory, no lint when the entities or states they mention are
renamed. Small single-artifact rules have a lighter home (`rules:` blocks, also
decision 0013); PolicySpec is where a rule graduates when it outgrows one
artifact — the same promotion judgement as relationship → association object.

## Behavior

Shape (bare kebab-case `id`; placed in a module's `policies/` collection):

```yaml
---
kind: policy
id: guardian-consent-required
name: GuardianConsentRequired
status: draft
applies:
  command: sharing.share-identity
when:
  - input: subject
  - is-role: {relationship: family.household-member, role: child}
requires:
  - entity: sharing.consent
    in-state: granted
  - actor-is: {entity: family.guardianship, model-role: guardian}
summary: Sharing a ward's identity requires the guardian's granted consent.
---
```

Rules:

- **`applies:` is REQUIRED** and carries exactly one of `command`, `entity`, or
  `relationship` — a qualified reference that must resolve to an artifact of that
  kind.
- **Clause operands must resolve.** `when.input` names an input of the applies
  command; `in-state` values are members of the target entity's
  `lifecycle.states`; `actor-is.model-role` is a property of the target entity's
  ModelSpec model; `invariant.then.self-state` is a state of the applies entity
  (`invariant:` is valid only when `applies` names an entity).
- **No expressions.** Value comparisons and orderings the graph cannot resolve
  (e.g. "scope `school` fits within `full`") stay Tier-1 `rules:` text; the
  clause vocabulary knows what it cannot say.
- **Ownership follows dependencies**, exactly as for relationships: the owning
  module's `dependsOn` closure must cover every module a clause references.
- **The clause vocabulary grows bottom-up**: new clause forms are admitted only
  when a consumer pilot needs them, by amending decision 0013's list.

## Acceptance Criteria

- PolicySpec is documented as the promoted home for cross-cutting rules, with the `rules:`-block tier for local ones.
- The `applies` targeting rule and per-clause operand resolution are documented.
- The no-expressions stance and its rationale are documented.

## Open Questions

- Should a policy be able to `applies` to multiple targets (e.g. one consent rule over several commands), or is one-policy-per-target the discipline?
- Do policies need lifecycle/status semantics of their own (draft policies that warn instead of erroring)?
- When lifecycle-state fragments on graph references arrive, should clause operands accept them as an alternative spelling?

---
*This document follows the https://specscore.md/feature-specification*

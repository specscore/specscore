---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Domain Behavior

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/domain-behavior?op=request-change) |
**Status:** Draft
**Source Ideas:** domain-behavior-artifacts

## Summary

Domain behavior artifacts describe what happens to domain concepts — the commands people and systems request, the events that record what happened, and the cross-cutting rules that constrain both.

They are small YAML-frontmatter files placed inside the Feature that owns the behavior. They never define a concept: every subject, actor, participant, input and rule operand is a reference to a MeaningGraph concept or DataModel, so the vocabulary lives once, in MeaningGraph, and the behavior lives once, next to the Feature that specifies it.

## Contents

| Directory | Description |
|---|---|
| [command/](command/README.md) | Command: a requested intention, its inputs, the lifecycle transition it causes and the events it may emit. |
| [event/](event/README.md) | Event: a fact that happened, its participants, its non-command sources and the transition it causes when nothing requested it. |
| [policy/](policy/README.md) | Policy: a cross-cutting rule expressed in a small typed clause vocabulary over meanings. |

## Problem

Commands, events, lifecycle transitions and domain rules span several concepts and several Features. Written only as prose requirements they have no identity and no lint: renaming a concept, deleting an event or misspelling a state goes unnoticed. GraphSpec gave them identity and checks but also defined its own entities, relationships and modules, duplicating the vocabulary MeaningGraph now owns ([decision 0015](../../decisions/0015-meaninggraph-supersedes-graphspec.md)). The behavior half needs a home that keeps its checks without bringing the duplicated vocabulary back.

## Behavior

### Placement and identity

```text
spec/features/family/identity-sharing/
  README.md                          # the owning Feature
  share-identity.command.md
  identity-shared.event.md
  share-expired.event.md
  guardian-consent-required.policy.md
```

#### REQ: co-located-placement

A behavior artifact MUST be a file named `<id>.command.md`, `<id>.event.md` or `<id>.policy.md` directly inside a Feature directory under `spec/features/**`. The Feature whose directory contains the file owns it. A behavior file outside a Feature directory, or in a Feature's `_tests/` or `proposals/` directory, is a validation error.

#### REQ: frontmatter-source-of-truth

The YAML frontmatter is the artifact's source of truth and MUST carry `kind` (`command`, `event` or `policy`, matching the filename suffix), `id` (equal to the filename stem, bare lowercase kebab-case), `name`, `status` and `summary`, plus the keys its kind defines. Any other key is a validation error. The Markdown body MAY explain, give examples and list failure cases; it is never read for structure.

#### REQ: status-values

`status` MUST be one of `Draft`, `Approved` or `Deprecated`. A Deprecated artifact remains resolvable; referencing it from a non-Deprecated artifact is a warning.

#### REQ: no-definitions

A behavior artifact MUST NOT define a domain concept or a structure: no `fields:`, `properties:`, `states:`, `values:` or entity, relationship or module declarations. Concepts are referenced through [meaning references](../meaning-references/README.md); structures through `modelspec://` DataModel references.

### References

| To | Form |
|---|---|
| A concept | `meaning:///{concept}` or `meaning://{host}/{org}/{repo}/{concept}` ([meaning-references](../meaning-references/README.md)) |
| A DataModel record type | `modelspec:///{module}.{Record}` or the cross-repo authority form ([decision 0010](../../decisions/0010-references-are-urls.md)) |
| A behavior artifact in the same Feature | its bare `id` |
| A behavior artifact in another Feature | `specscore:feature/{feature-path}/{id}.{kind}.md` ([source-references](../source-references/README.md)) |

#### REQ: references-resolve

Every reference in a behavior artifact MUST resolve: meaning references per meaning-references, DataModel references per decision 0007's resolution ladder, and behavior references to an existing artifact of the kind the field expects. A reference to a behavior artifact in another repository is a validation error in this version.

#### REQ: dependency-closure

A behavior artifact MAY reference a behavior artifact owned by another Feature only when that Feature is the owning Feature itself, an ancestor of it, or in the transitive closure of the owning Feature's `## Dependencies` list. Any other cross-Feature behavior reference is a validation error naming both Features. Meaning and DataModel references are not subject to this rule; their repositories are governed by meaning-references pins.

### Transitions

Lifecycle states and the transitions allowed between them are meaning: they are the values of a MeaningGraph value set, and the allowed transitions are declared on that value set. Which command or event causes a transition is behavior, declared here.

```yaml
transition:
  property: meaning:///identity-share-status   # a property concept whose values-of is a value set
  from: [active]
  to: expired
```

#### REQ: transition-shape

A `transition` MUST carry `property`, a meaning reference to a property or dimension concept whose `values-of` (own or inherited) names a value set; `from`, a non-empty list of value ids of that set, or the single token `any`; and `to`, one value id of that set. Retired values are allowed with a warning.

#### REQ: transition-allowed

When the value set declares allowed transitions, every `from` value to `to` pair MUST be one the value set allows. When it declares none, any pair of distinct values is accepted and lint reports one notice per value set naming the artifacts that rely on it.

### Rules local to one Feature

A rule that concerns one command or one concept and is fully stated in a sentence is a REQ of the owning Feature. A rule that crosses artifacts, qualifies an actor or ties lifecycles together is a [policy](policy/README.md). This is decision 0013's promotion line with Tier-1 `rules:` blocks replaced by ordinary REQs.

## Dependencies

- meaning-references
- feature
- source-references

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Meaning References](../meaning-references/README.md) | Resolves every concept operand; behavior artifacts are a reference location in addition to Feature bodies |
| [Feature](../feature/README.md) | Owns behavior artifacts by placement; its `## Dependencies` list is the dependency closure |
| [Source References](../source-references/README.md) | Supplies the `specscore:feature/...` form for cross-Feature behavior references; code may `implements` a Feature REQ that a command realises |
| [Document Types Registry](../document-types-registry/README.md) | Registers Command, Event and Policy as Document kinds with `spec/features/**/*.{kind}.md` consumer paths |
| [GraphSpec](../graphspec/README.md) | Deprecated; its commands, events and policies migrate here, its entities, relationships and lifecycles to MeaningGraph |

## Acceptance Criteria

### AC: placement-and-identity

**Requirements:** domain-behavior#req:co-located-placement, domain-behavior#req:frontmatter-source-of-truth, domain-behavior#req:status-values

A `share-identity.command.md` with matching `kind`, `id`, `name`, `status` and `summary` inside a Feature directory lints clean and is owned by that Feature. The same file at `spec/features/` root, with `id: share`, with `kind: event`, or with `status: Live` fails lint.

### AC: no-inline-vocabulary

**Requirements:** domain-behavior#req:no-definitions

A behavior artifact that carries `states:`, `fields:` or an entity declaration fails lint with an error pointing to MeaningGraph and DataModel references.

### AC: references-and-closure

**Requirements:** domain-behavior#req:references-resolve, domain-behavior#req:dependency-closure

A command emitting an event of a Feature listed in its owner's `## Dependencies` lints clean. Removing that dependency, misspelling the event id, pointing the reference at a policy, or pointing it at another repository each fail lint; a reference to an unknown concept fails with the meaning-references error.

### AC: transitions-checked

**Requirements:** domain-behavior#req:transition-shape, domain-behavior#req:transition-allowed

A transition whose property's value set allows `active → expired` lints clean. An unknown value id, a property with no value set, and a disallowed pair each fail; against a value set with no declared transitions the same artifact lints clean with one notice.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*

---
format: https://specscore.md/idea-specification
status: Specifying
---

# Idea: Domain behavior artifacts over MeaningGraph meanings

**Status:** Specifying
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Promotes To:** domain-behavior, domain-behavior/command, domain-behavior/event, domain-behavior/policy
**Supersedes:** —
**Related Ideas:** depends_on:meaninggraph-linkage, alternative_to:graphspec

## Problem Statement

How might we keep commands, events, lifecycle transitions and cross-cutting domain rules machine-checkable after GraphSpec is removed, without giving MeaningGraph a behavior language or defining any domain concept twice?

## Context

Approved by the owner on 2026-10-27, together with the split recorded in [decision 0015](../decisions/0015-meaninggraph-supersedes-graphspec.md).

GraphSpec had two halves. Its vocabulary half — entities, relationships, lifecycle state names — is what [MeaningGraph](https://meaninggraph.io) describes better, and moves there ([meaninggraph-linkage](meaninggraph-linkage.md)). Its behavior half has no home in MeaningGraph and should not get one: MeaningGraph answers "what does this data mean" for people reading data without the system that produced it (DataTug, the OpenVaultDB Directory, registry search), and none of them needs commands or module rules.

The behavior half did real work. In the `sneat-co/backstage` pilots (`spec/graph/pilot-notes.md`, `family-pilot-notes.md`) command → event links, relationship endpoint coverage, lifecycle-state operands and dependency direction all resolved under `specscore graph lint` across a four-module chain. Backstage has 6 commands, 7 events and 3 policies that must survive the migration. Rewriting them as prose requirements would keep the words and lose every check.

The test that decides where a thing goes: would someone reading the data, without the system, need it? Then it is MeaningGraph's. If only the people building the system need it, it is SpecScore's.

## Recommended Direction

1. **Three SpecScore document kinds — Command, Event, Policy — placed inside the Feature that owns the behavior**, as `spec/features/**/<id>.command.md`, `<id>.event.md` and `<id>.policy.md`, the same co-location SpecScore already uses for `*.entity.md`. YAML frontmatter is the source of truth; the body explains.
2. **They reference concepts and never define them.** Subjects, actors, participants, inputs and clause operands are `meaning://` references (or `modelspec://` for DataModel shapes), resolved through [meaning-references](../features/meaning-references/README.md). There is no `entity`, `relationship` or `module` kind.
3. **Ownership is placement; dependency direction is Feature dependencies.** The owning Feature is the directory the file sits in. A behavior artifact may reference another Feature's behavior artifact only when that Feature is in the owner's `## Dependencies` closure — the rule GraphSpec enforced with module `dependsOn`, now on the dependency graph SpecScore already has.
4. **Lifecycle states and allowed transitions are meaning; who causes a transition is behavior.** The states and the transitions allowed between them live in a MeaningGraph value set (allowed transitions are proposed for `meaninggraph/core` alongside this work). A command, or an event with a non-command source, declares the transition it causes; lint checks the transition is one the value set allows.
5. **Keep what the pilots validated.** Command → event links authored once, on the command; events list only non-command sources; role-labelled participants; the policy clause vocabulary of decision 0013 with operands retyped to meanings; no expression language; the vocabulary grows only when a consumer needs more. Single-artifact rules are ordinary REQs in the owning Feature. What is not kept: GraphSpec's dependency-direction and ownership checks on *vocabulary* (relationship endpoints, cross-module model references). Within one meaning graph concepts have no direction rule; between graphs MeaningGraph pins govern.
6. **Reuse the CLI implementation.** `specscore-cli` `pkg/graph` already parses and checks commands, events and policies; it is retargeted to the new placement and to meaning references instead of being deleted, and only its entity, relationship and module handling goes.

## Alternatives Considered

- **Behavior as prose REQs in the Feature README.** No new kinds, but command → event links, transitions and policy operands become unlintable text; the pilot-validated checks are lost.
- **Behavior kinds in MeaningGraph.** Turns a semantic-definition format into a system-design language, duplicates SpecScore Features and delays `meaning/1` for every publisher who only describes data.
- **Keep GraphSpec's separate `spec/graph/` tree for the behavior half.** Keeps a second ownership hierarchy (modules) parallel to Features; placing behavior in the Feature that owns it removes the module concept altogether.

## MVP Scope

Backstage's Family Identity slice (`familius`, `familycard`, `contactius`): its commands, events and policies — `share-identity`, `grant-consent`, `guardian-consent-required` and the two revocation invariants among them — rewritten as co-located behavior artifacts referencing migrated meaning concepts, as they are, not simplified, linting clean, with GraphSpec's intentional error probes re-created against the new shapes (an unknown event, an unknown state value, an unknown policy operand).

## Not Doing (and Why)

- An expression language for policies — decision 0013's reasons still hold: nothing can evaluate it at spec time.
- Entity, relationship or module kinds — concepts are MeaningGraph's, ownership is placement.
- A runtime or code generator for commands and events — these are specifications; code links to them through source references.
- Normative failure-case representation for commands — stays prose, as in GraphSpec.
- Direction rules between concepts inside one meaning graph — MeaningGraph has none, and adding them would put module architecture into a data format.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Every backstage command, event and policy can be expressed with meaning operands without losing a behavior check | Convert the Family Identity slice unchanged and re-create the pilot's error probes |
| Must-be-true | Feature dependency closure is an adequate replacement for module `dependsOn` | Map backstage module dependencies onto the owning Features and diff the allowed references |
| Should-be-true | Most of `pkg/graph` behavior handling survives retargeting | Count retained versus rewritten functions in the CLI change |
| Might-be-true | Value-set transitions are useful to data consumers beyond SpecScore | Ask DataTug whether it would validate status histories against them |

## SpecScore Integration

- **New Features this would create:** domain-behavior, domain-behavior/command, domain-behavior/event, domain-behavior/policy
- **Existing Features affected:** meaning-references (operand resolution), feature (co-located behavior files, dependency closure), document-types-registry (three Document kinds), graphspec (behavior half replaced)
- **Dependencies:** meaninggraph-linkage; `meaninggraph/core` value-set transitions; `specscore-cli` `pkg/graph` retargeting

## Open Questions

None at this time.

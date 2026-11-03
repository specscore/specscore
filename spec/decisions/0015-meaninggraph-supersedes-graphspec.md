---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: MeaningGraph Supersedes GraphSpec

**Status:** Approved
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** meaninggraph, graphspec, domain-behavior, references, linkage, deprecation
**Source Idea:** meaninggraph-linkage
**Supersedes:** 0008-graphspec-is-a-specscore-component
**Superseded By:** —

## Context

[GraphSpec](../features/graphspec/README.md) was bootstrapped in July 2026 as SpecScore's domain-vocabulary layer: modules, entities, relationships, commands, events and policies, with structure delegated to ModelSpec. In parallel, [MeaningGraph](https://meaninggraph.io) became the registry and format for semantic definitions, and ModelSpec consolidated into it as the DataModel resource type (`sneat-co/backstage` ADR 0026). MeaningGraph concepts are defined in Git repositories, addressed by `meaning://` URLs, pinned by commit, parsed by a released library and indexed by CodeGrapher.

Both describe the same thing — the named domain concepts that features, models and code talk about. Keeping both would give every concept two definitions in two formats. The owner directed on 2026-10-27 that GraphSpec, as the earlier form of what became MeaningGraph, be removed, and that specs link to MeaningGraph meanings instead ([meaninggraph-linkage](../ideas/meaninggraph-linkage.md)).

At this date GraphSpec has one consumer: `sneat-co/backstage` `spec/graph/` (12 modules: 21 entities, 5 relationships, 6 commands, 7 events and 3 policies, plus 11 ModelSpec model files). `specscore-cli` implements it as `specscore graph new|lint|list|refs` (`pkg/graph`).

## Decision

MeaningGraph is SpecScore's domain-vocabulary layer. GraphSpec is deprecated now and removed once its consumer is migrated; no new GraphSpec artifacts are authored.

GraphSpec splits along one test: would someone reading the data, without the system that produced it, need this? Its vocabulary half — what things are and how they relate — goes to MeaningGraph. Its behavior half — what happens to things — stays in SpecScore as [domain behavior](../features/domain-behavior/README.md) artifacts placed inside the Feature that owns the behavior, referencing concepts by `meaning://` URL ([meaninggraph-linkage](../ideas/meaninggraph-linkage.md), [domain-behavior-artifacts](../ideas/domain-behavior-artifacts.md)). GraphSpec content migrates as follows:

| GraphSpec | Becomes |
|---|---|
| entity | MeaningGraph concept of kind `entity`; its `model:` becomes an `instances` binding to the same ModelSpec record type |
| entity lifecycle states | a `value-set` concept and a property concept whose `values-of` names it; the allowed transitions are declared on the value set once MeaningGraph supports it |
| many-to-one relationship | a reference property concept with `of:` the source entity and `values-of:` the target, bound with role `reference` where a model field holds it |
| many-to-many relationship | an association entity concept with one reference property per endpoint, each named by its endpoint role (`household-member` with `household-member-household` and `household-member-contact`); an association with its own lifecycle is the same, plus its lifecycle |
| relationship `metadata` | a property of the association entity; an enum-typed value (`modelspec:///familius.enums.HouseholdRole`) becomes a value set mirroring the enum, bound with role `value` to the model field — MeaningGraph does not compare the two lists, so they are kept in step by review |
| relationship `cardinality` | not represented; the DataModel's fields and keys carry the structure, and the description states the cardinality in words |
| module | for concepts, packaging only — one `*.meaning.yaml` file per module, the file `id` not part of any address; for behavior, the owning Feature, with `dependsOn` replaced by the Feature's `## Dependencies` closure |
| command, event, policy | `<id>.command.md`, `<id>.event.md`, `<id>.policy.md` in the owning Feature ([domain-behavior](../features/domain-behavior/README.md)), with every operand a meaning or DataModel reference |
| who causes a transition | the command, or the event with a non-command source, that declares it |
| Tier-1 `rules:` blocks | REQs of the owning Feature |
| ModelSpec models (`modules/<module>/models/*.hcl`) | unchanged in content — MeaningGraph DataModels; moved to `models/<module>.modelspec.hcl` at the repository root (the `.modelspec.hcl` suffix CodeGrapher indexes) and listed in the `models` map of the module's `*.meaning.yaml` file |

This decision supersedes decision 0008, which made GraphSpec SpecScore's component for domain vocabulary. The GraphSpec language-design decisions 0004, 0005, 0006, 0009, 0012 and 0013 are moved to `archived/` as Deprecated when GraphSpec is removed; the parts of 0012 (role-labelled participants) and 0013 (policy clause vocabulary, no expression language) that still apply are restated in the domain-behavior features, which are normative from then on. Decisions 0003, 0010, 0011 and 0014 stay in force: they govern ModelSpec structure and the reference URL grammar, both of which MeaningGraph keeps. This decision amends decision 0007: its first resolution step, the GraphSpec graph root (`modules/<module>/models/`, from decision 0006), is replaced by the `models` maps of the repository's root `*.meaning.yaml` files; the configured-project and cross-repository steps and the no-implicit-network rule are unchanged.

## Rationale

One concept should have one definition. MeaningGraph already provides what GraphSpec still lacked: a released parser, cross-repository references with commit pins, a public registry, and CodeGrapher indexing that links concepts to models and code. Its address grammar already follows the family rule of decision 0010, so linking a spec to a meaning is the same act as linking to another spec.

Commands, events and policies describe behavior, not meaning. MeaningGraph's consumers — DataTug, the OpenVaultDB Directory, registry search — read data and never need them, and SpecScore already owns behavior through Features that trace to code. Keeping them as typed artifacts inside those Features, rather than as prose requirements, keeps the checks the backstage pilots relied on: command → event links, lifecycle-state operands, policy operands and dependency direction.

## Declined Alternatives

### Keep GraphSpec and link its entities to meanings

Two vocabularies for one domain; every concept would need its GraphSpec entity and its MeaningGraph concept kept in step by hand.

### Move commands, events and policies into MeaningGraph

MeaningGraph has no such kinds, and adding them would turn a semantic-definition format into a behaviour language that duplicates SpecScore Features.

### Write commands, events and policies as prose requirements

No new document kinds, but every check on them is lost; backstage's 16 behavior artifacts would become unlintable text.

### Delete GraphSpec immediately

The backstage graph and the `specscore graph` command still depend on it; deleting the format first would leave a consumer with unlintable files and lose modelling work that has not been migrated.

## Consequences at Decision Time

- GraphSpec's feature status becomes Deprecated; the language receives no changes other than its removal.
- `sneat-co/backstage` `spec/graph/` is migrated to `*.meaning.yaml` files in that repository's root (MeaningGraph reads root-level files only) and to domain-behavior artifacts in the owning Features, then deleted.
- `specscore-cli` retargets the command, event and policy handling of `pkg/graph` to domain-behavior artifacts and meaning references, and removes the entity, relationship and module handling and the `specscore graph` command once the migration lands, in a release whose notes name this decision; `modelspec-validation` keeps validating models.
- Value sets exist only in `meaning/draft-2`, which no released MeaningGraph reader reads yet; a `meaninggraph/cli` release that reads it precedes lint and the backstage migration.
- `meaninggraph/core` is asked for allowed transitions and initial values on value sets, inverse labels on reference properties and a deprecation marker for concepts; until transitions exist, transition checks verify only that the values exist.
- The GraphSpec feature directory, its idea, its plans and the superseded decisions' references are removed or archived from this repository last.
- Dependency direction and ownership checks survive for behavior, on Feature placement and Feature dependencies.
- GraphSpec's dependency-direction checks on vocabulary — relationship endpoint ownership and cross-module model references — are lost: concepts within one meaning graph have no direction rule, and between graphs only MeaningGraph pins govern.

## Observed Consequences

- 2026-10-27, review of the drafts: a module with models but no concepts (`calendarius`) has no meaning file of its own, since a meaning file needs at least one concept. Its models are listed in the `models` map of each meaning file that uses them, and the resolver reads the union of the maps, one path per short name ([domain-behavior](../features/domain-behavior/README.md#req-references-resolve)).
- 2026-10-28: the owner chose a clean cut to one MeaningGraph format, `meaning/draft-2`; `meaning/draft-1` is withdrawn and every registered graph is rewritten (meaninggraph/core#15). The draft-2 reader this decision waits for is therefore the only MeaningGraph reader.

## Affected Features

- graphspec
- meaning-references
- domain-behavior
- source-references
- repo-config
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

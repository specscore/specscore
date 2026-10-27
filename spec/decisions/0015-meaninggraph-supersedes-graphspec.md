---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: MeaningGraph Supersedes GraphSpec

**Status:** Approved
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** meaninggraph, graphspec, references, linkage, deprecation
**Source Idea:** meaninggraph-linkage
**Supersedes:** 0008-graphspec-is-a-specscore-component
**Superseded By:** —

## Context

[GraphSpec](../features/graphspec/README.md) was bootstrapped in July 2026 as SpecScore's domain-vocabulary layer: modules, entities, relationships, commands, events and policies, with structure delegated to ModelSpec. In parallel, [MeaningGraph](https://meaninggraph.io) became the registry and format for semantic definitions, and ModelSpec consolidated into it as the DataModel resource type (`sneat-co/backstage` ADR 0026). MeaningGraph concepts are defined in Git repositories, addressed by `meaning://` URLs, pinned by commit, parsed by a released library and indexed by CodeGrapher.

Both describe the same thing — the named domain concepts that features, models and code talk about. Keeping both would give every concept two definitions in two formats. The owner directed on 2026-10-27 that GraphSpec, as the earlier form of what became MeaningGraph, be removed, and that specs link to MeaningGraph meanings instead ([meaninggraph-linkage](../ideas/meaninggraph-linkage.md)).

At this date GraphSpec has one consumer: `sneat-co/backstage` `spec/graph/` (12 modules: 21 entities, 5 relationships, 6 commands, 7 events and 3 policies, plus 11 ModelSpec model files). `specscore-cli` implements it as `specscore graph new|lint|list|refs` (`pkg/graph`).

## Decision

MeaningGraph is SpecScore's domain-vocabulary layer. GraphSpec is deprecated now and removed once its consumer is migrated; no new GraphSpec artifacts are authored.

SpecScore artifacts reference domain concepts with `meaning://` URLs as specified by the meaninggraph-linkage idea. GraphSpec content migrates as follows:

| GraphSpec | Becomes |
|---|---|
| entity | MeaningGraph concept of kind `entity`; its `model:` becomes an `instances` binding to the same ModelSpec record type |
| entity lifecycle states | a `value-set` concept and a property concept whose `values-of` names it |
| relationship | a property concept with `of:` the source entity and `values-of:` the target, bound with role `reference` where a model field holds it; an association with its own lifecycle becomes an entity |
| module | packaging only — one `*.meaning.yaml` file per module; the file `id` is not part of any address |
| command, event, policy | requirements and acceptance criteria in the SpecScore Feature that owns the behaviour, referencing the concepts they act on |
| ModelSpec models | unchanged — MeaningGraph DataModels |

This decision supersedes decision 0008, which made GraphSpec SpecScore's component for domain vocabulary. The GraphSpec language-design decisions 0004, 0005, 0006, 0009, 0012 and 0013 lose their subject with GraphSpec and are moved to `archived/` as Deprecated when GraphSpec is removed. Decisions 0003, 0007, 0010, 0011 and 0014 stay in force: they govern ModelSpec structure and the reference URL grammar, both of which MeaningGraph keeps.

## Rationale

One concept should have one definition. MeaningGraph already provides what GraphSpec still lacked: a released parser, cross-repository references with commit pins, a public registry, and CodeGrapher indexing that links concepts to models and code. Its address grammar already follows the family rule of decision 0010, so linking a spec to a meaning is the same act as linking to another spec.

Commands, events and policies describe behaviour, not meaning. SpecScore already owns behaviour through Features, requirements and acceptance criteria, which are traceable to code; moving them there keeps one home for behaviour as well.

## Declined Alternatives

### Keep GraphSpec and link its entities to meanings

Two vocabularies for one domain; every concept would need its GraphSpec entity and its MeaningGraph concept kept in step by hand.

### Move commands, events and policies into MeaningGraph

MeaningGraph has no such kinds, and adding them would turn a semantic-definition format into a behaviour language that duplicates SpecScore Features.

### Delete GraphSpec immediately

The backstage graph and the `specscore graph` command still depend on it; deleting the format first would leave a consumer with unlintable files and lose modelling work that has not been migrated.

## Consequences at Decision Time

- GraphSpec's feature status becomes Deprecated; the language receives no changes other than its removal.
- `sneat-co/backstage` `spec/graph/` is migrated to `*.meaning.yaml` files in that repository's root (MeaningGraph reads root-level files only) and to Feature requirements, then deleted.
- `specscore-cli` removes `specscore graph` and `pkg/graph` after the migration, in a release whose notes name this decision; `modelspec-validation` keeps validating models.
- The GraphSpec feature directory, its idea, its plans and the superseded decisions' references are removed or archived from this repository last.
- GraphSpec's module dependency-direction and ownership checks have no MeaningGraph equivalent and are dropped.

## Observed Consequences

None observed yet.

## Affected Features

graphspec, meaning-references, source-references, repo-config, modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

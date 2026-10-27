---
format: https://specscore.md/plan-specification
status: Executing
---
# Plan: MeaningGraph Linkage, Domain Behavior and GraphSpec Removal

**Status:** Executing
**Source:** idea:meaninggraph-linkage
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Supersedes:** —

## Summary

Master plan for linking SpecScore specs to MeaningGraph meanings ([meaninggraph-linkage](../ideas/meaninggraph-linkage.md)), for keeping GraphSpec's behavior half as [domain behavior](../features/domain-behavior/README.md) artifacts ([domain-behavior-artifacts](../ideas/domain-behavior-artifacts.md)), and for removing GraphSpec, which MeaningGraph supersedes ([decision 0015](../decisions/0015-meaninggraph-supersedes-graphspec.md)). The work spans six repositories: `specscore/specscore` (format), `meaninggraph/core` and `meaninggraph/cli` (address grammar, value-set transitions, inverse labels), `specscore/specscore-cli` (lint), `code-grapher/codegrapher` (indexing, annotations, write-back), SpecScore Studio (write-back) and `sneat-co/backstage` (first consumer and GraphSpec migration).

## Approach

Three tracks that meet at the backstage migration.

- **Linkage.** Specify meaning references (Task 1) and the same-repository `meaning:///` form in MeaningGraph (Task 3), implement lint (Task 5), indexing with aligned code annotations (Task 7) and write-back (Task 8). Backstage is the MVP consumer (Task 9).
- **Behavior.** Specify Command, Event and Policy as co-located Feature artifacts (Task 2), propose value-set transitions and inverse labels to MeaningGraph (Task 4), and retarget the CLI's existing command, event and policy checks to the new placement and to meaning operands (Task 6). Transition checks verify value existence until Task 4 lands, then allowed pairs.
- **GraphSpec removal, consumer first.** Backstage's `spec/graph/` migrates per decision 0015 — concepts to root-level `*.meaning.yaml`, behavior to domain-behavior artifacts (Task 10). Only then does the CLI drop GraphSpec's vocabulary handling and `specscore graph` (Task 11), and finally this repository deletes the GraphSpec feature and archives its idea, plans and language decisions (Task 12).

## Tasks

### Task 1: Specify meaning references

**Depends-On:** —
**Status:** in_progress

Write the [meaning-references](../features/meaning-references/README.md) feature, which defines the `meaninggraph.pins` repo-config block and the `**Meanings:**` Feature header, and mark GraphSpec Deprecated (both done in the change that adds this plan). Pass the specify gate, then add the matching rows to the [repo-config](../features/repo-config/README.md) and [feature](../features/feature/README.md) specs so their own field tables list the new block and header.

### Task 2: Specify domain behavior

**Depends-On:** 1
**Status:** in_progress

Write the [domain-behavior](../features/domain-behavior/README.md) umbrella and its [command](../features/domain-behavior/command/README.md), [event](../features/domain-behavior/event/README.md) and [policy](../features/domain-behavior/policy/README.md) features (done in this change). Pass the specify gate, then register Command, Event and Policy as Document kinds in the [document types registry](../features/document-types-registry/README.md) with their `spec/features/**/*.{kind}.md` consumer paths, and add co-located behavior files to the [feature](../features/feature/README.md) spec's directory layout.

### Task 3: Same-repository meaning addresses (in meaninggraph/core and meaninggraph/cli)

**Depends-On:** 1
**Status:** queued

Add `meaning:///{concept}` (empty authority = current repository, per decision 0010's family rule) to `FORMAT.md` and both JSON schemas, the reference checker and the Go parser in `meaninggraph/cli`, with a release that SpecScore and CodeGrapher can depend on.

### Task 4: Value-set transitions and inverse labels (in meaninggraph/core and meaninggraph/cli)

**Depends-On:** 2
**Status:** queued

Take the `value-set-transitions-and-inverse-labels` idea in `meaninggraph/core` through its own review: allowed transitions declared on a value set, and labels for the inverse direction of a reference property. When accepted, specify them in `FORMAT.md` (a new draft format if needed), the schemas, the checker and the Go parser, and release.

### Task 5: Lint meaning references (in specscore-cli)

**Depends-On:** 1, 3
**Status:** queued

Parse `meaning://` references and the `**Meanings:**` header, read `meaninggraph.pins`, resolve concepts through the MeaningGraph parser at the pin from a local checkout or cache, and report the errors of meaning-references. No network access unless explicitly allowed. Bump the dogfood `SPECSCORE_VERSION` pin in the same change that first uses the rules here.

### Task 6: Lint domain behavior (in specscore-cli)

**Depends-On:** 2, 5
**Status:** queued

Retarget the command, event and policy parsing and checks of `pkg/graph` to co-located `*.command.md`, `*.event.md` and `*.policy.md` files: placement and identity, unknown keys, references and Feature dependency closure, transition shape and — once Task 4 is released — allowed pairs, event sources and participants, and the policy clause vocabulary with meaning operands. Derive event triggers from `possibleEvents` for `specscore` queries.

### Task 7: Index spec, behavior and meaning edges; align annotations (in codegrapher)

**Depends-On:** 1, 2, 3
**Status:** queued

Emit a `references_meaning` ref from `specdoc` (artifact, REQ/AC section, reference, pin) and resolve it to `meaning_concept` nodes when the graph is indexed, otherwise keep it unresolved. Index behavior artifacts as nodes owned by their Feature, with edges to the concepts they reference and command → event edges. Replace the literal `// meaninggraph: references ` match in `semantic/build.go` with the `meaninggraph:{relation}` grammar on the source-references comment scanner (any comment syntax, `implements`/`references`, unknown relation is an error), keeping the old spelling readable with a deprecation diagnostic. Add the triangulation queries named in the meaninggraph-linkage idea.

### Task 8: Write graph edits back to source repositories (in codegrapher and SpecScore Studio)

**Depends-On:** 7
**Status:** queued

Turn add, change and remove of a link in the viewer into a minimal patch of the owning file and hand it to the owning repository's publication policy; show it pending until merged and re-indexed; store no link state.

### Task 9: First consumer (in sneat-co/backstage)

**Depends-On:** 5, 7
**Status:** queued

Pin `meaninggraph/core` in backstage `specscore.yaml`, add `**Meanings:**` and inline references to the Features that own the migrated concepts, and run lint and CodeGrapher over the result.

### Task 10: Migrate backstage GraphSpec content (in sneat-co/backstage)

**Depends-On:** 5, 6
**Status:** queued

Convert `spec/graph/` per the decision 0015 mapping: entities, lifecycles and relationships into root-level `*.meaning.yaml` files (one per GraphSpec module) bound to the existing ModelSpec models; commands, events and policies into domain-behavior artifacts in the Features that own them, with module `dependsOn` re-expressed as those Features' `## Dependencies`; Tier-1 `rules:` into Feature REQs. Re-run the pilot failure probes (dangling event, unknown state, out-of-closure reference, unknown clause operand) against the result, then delete `spec/graph/` and retarget links to it. Keep `spec/graph/pilot-notes.md` and `family-pilot-notes.md` as research.

### Task 11: Remove GraphSpec vocabulary handling and `specscore graph` (in specscore-cli)

**Depends-On:** 10
**Status:** queued

Delete the entity, relationship and module handling of `pkg/graph`, `internal/cli/graph.go`, the GraphSpec lint catalog entries and the `cli/graph` feature specs; keep the domain-behavior checks from Task 6 and `modelspec-validation`. Release with notes naming decision 0015 and the migration.

### Task 12: Remove GraphSpec from the format repository

**Depends-On:** 11
**Status:** queued

Delete `spec/features/graphspec/`, archive the `graphspec` idea and the `v1-readiness` plan, move decisions 0004, 0005, 0006, 0009, 0012 and 0013 to `spec/decisions/archived/` as Deprecated, and remove GraphSpec from `README.md`, `ROADMAP.md` and `docs/`.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/plan-specification*

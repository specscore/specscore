---
format: https://specscore.md/plan-specification
status: Executing
---
# Plan: MeaningGraph Linkage and GraphSpec Removal

**Status:** Executing
**Source:** idea:meaninggraph-linkage
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Supersedes:** —

## Summary

Master plan for linking SpecScore specs to MeaningGraph meanings ([meaninggraph-linkage](../ideas/meaninggraph-linkage.md)) and for removing GraphSpec, which MeaningGraph supersedes ([decision 0015](../decisions/0015-meaninggraph-supersedes-graphspec.md)). The work spans six repositories: `specscore/specscore` (format), `meaninggraph/core` (address grammar), `specscore/specscore-cli` (lint and removal of `specscore graph`), `code-grapher/codegrapher` (indexing, annotations, write-back), SpecScore Studio (write-back) and `sneat-co/backstage` (first consumer and GraphSpec migration).

## Approach

Two tracks that meet at the backstage migration.

- **Linkage.** Specify the reference grammar here (Task 1), add the same-repository `meaning:///` form to MeaningGraph (Task 2), then implement lint (Task 3) and indexing with aligned code annotations (Task 4), then write-back (Task 5). Backstage is the MVP consumer (Task 6).
- **GraphSpec removal, consumer first.** GraphSpec is deprecated now. Backstage's `spec/graph/` migrates to `*.meaning.yaml` files and Feature requirements using the mapping table of decision 0015 (Task 7). Only then does the CLI drop `specscore graph` (Task 8), and finally this repository deletes the GraphSpec feature and archives its idea, plans and language decisions (Task 9). Deleting the format before its consumer would leave unlintable files and lose unmigrated modelling.

## Tasks

### Task 1: Specify meaning references

**Depends-On:** —
**Status:** in_progress

Write the [meaning-references](../features/meaning-references/README.md) feature, which defines the `meaninggraph.pins` repo-config block and the `**Meanings:**` Feature header, and mark GraphSpec Deprecated (both done in the change that adds this plan). Pass the specify gate, then add the matching rows to the [repo-config](../features/repo-config/README.md) and [feature](../features/feature/README.md) specs so their own field tables list the new block and header.

### Task 2: Same-repository meaning addresses (in meaninggraph/core)

**Depends-On:** 1
**Status:** queued

Add `meaning:///{concept}` (empty authority = current repository, per decision 0010's family rule) to `FORMAT.md` and both JSON schemas, and to the reference checker and the Go parser in `meaninggraph/cli`, with a release that SpecScore and CodeGrapher can depend on.

### Task 3: Lint meaning references (in specscore-cli)

**Depends-On:** 1, 2
**Status:** queued

Parse `meaning://` references and the `**Meanings:**` header, read `meaninggraph.pins`, resolve concepts through the MeaningGraph parser at the pin from a local checkout or cache, and report the errors of meaning-references. No network access unless explicitly allowed. Bump the dogfood `SPECSCORE_VERSION` pin in the same change that first uses the rules here.

### Task 4: Index spec → meaning edges and align annotations (in codegrapher)

**Depends-On:** 1, 2
**Status:** queued

Emit a `references_meaning` ref from `specdoc` (artifact, REQ/AC section, reference, pin) and resolve it to `meaning_concept` nodes when the graph is indexed, otherwise keep it unresolved. Replace the literal `// meaninggraph: references ` match in `semantic/build.go` with the `meaninggraph:{relation}` grammar on the source-references comment scanner (any comment syntax, `implements`/`references`, unknown relation is an error), keeping the old spelling readable with a deprecation diagnostic. Add the triangulation queries named in the idea.

### Task 5: Write graph edits back to source repositories (in codegrapher and SpecScore Studio)

**Depends-On:** 4
**Status:** queued

Turn add, change and remove of a link in the viewer into a minimal patch of the owning file and hand it to the owning repository's publication policy; show it pending until merged and re-indexed; store no link state.

### Task 6: First consumer (in sneat-co/backstage)

**Depends-On:** 3, 4
**Status:** queued

Pin `meaninggraph/core` in backstage `specscore.yaml`, add `**Meanings:**` and inline references to the Features that own the migrated concepts, and run lint and CodeGrapher over the result.

### Task 7: Migrate backstage GraphSpec content (in sneat-co/backstage)

**Depends-On:** 3
**Status:** queued

Convert `spec/graph/` per the decision 0015 mapping: entities, lifecycles and relationships into root-level `*.meaning.yaml` files (one per GraphSpec module) bound to the existing ModelSpec models; commands, events and policies into REQs and ACs of their owning Features; then delete `spec/graph/` and retarget links to it. Keep `spec/graph/pilot-notes.md` and `family-pilot-notes.md` as research.

### Task 8: Remove `specscore graph` (in specscore-cli)

**Depends-On:** 7
**Status:** queued

Delete `internal/cli/graph.go`, `pkg/graph`, the graph lint catalog and the `cli/graph` feature specs; keep `modelspec-validation`. Release with notes naming decision 0015 and the migration.

### Task 9: Remove GraphSpec from the format repository

**Depends-On:** 8
**Status:** queued

Delete `spec/features/graphspec/`, archive the `graphspec` idea and the `v1-readiness` plan, move decisions 0004, 0005, 0006, 0009, 0012 and 0013 to `spec/decisions/archived/` as Deprecated, and remove GraphSpec from `README.md`, `ROADMAP.md` and `docs/`.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/plan-specification*

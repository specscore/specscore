---
format: https://specscore.md/idea-specification
status: Specifying
---

# Idea: Link SpecScore specs to MeaningGraph meanings

**Status:** Specifying
**Date:** 2026-10-27
**Owner:** alexander.trakhimenok@gmail.com
**Promotes To:** meaning-references
**Supersedes:** —
**Related Ideas:** extends:spec-code-linking-via-codegraph, alternative_to:graphspec

## Problem Statement

How might we link SpecScore features, requirements and acceptance criteria to the MeaningGraph concepts they talk about, so that specs, meanings and code form one navigable, lintable graph whose every edit is stored in the owning source repository?

## Context

Approved by the owner on 2026-10-27.

[MeaningGraph](https://meaninggraph.io) is the registry and format for semantic definitions and logical DataModels (ModelSpec consolidated into it — see `sneat-co/backstage` ADR 0026). Meanings are defined in Git repositories, exactly as specs are: `*.meaning.yaml` files in a repository root, addressed as `meaning://{host}/{org}/{repo}/{concept}` and pinned with `?ref=<commit>` (format `meaning/draft-2`, `meaninggraph/core` `FORMAT.md`).

The two linkage systems are already almost identical:

| | SpecScore | MeaningGraph |
|---|---|---|
| Cross-repo address | `specscore://{host}/{org}/{repo}/{reference}` ([0010](../decisions/0010-references-are-urls.md)) | `meaning://{host}/{org}/{repo}/{concept}` |
| Pin | `?ref={git-ref}` | `?ref={40-char commit}`, one pin per referenced repository |
| Code → resource | `specscore:implements\|verifies\|references` ([source-references](../features/source-references/README.md)) | `// meaninggraph: references <id>` (CodeGrapher only, Go-style comment, one relation) |
| Indexed by CodeGrapher | Features, Ideas, Plans via `specdoc`; typed code edges via `trace` | `meaning_graph` / `meaning_concept` nodes, `binds_to`, `maps_to_code` |

What is missing is the edge between the two: no SpecScore artifact can reference a meaning, CodeGrapher's `specdoc` has no meaning reference kind, and the code-annotation grammars differ. GraphSpec ([graphspec](graphspec.md)) was an earlier attempt at the same domain-vocabulary layer and is superseded by MeaningGraph in [decision 0015](../decisions/0015-meaninggraph-supersedes-graphspec.md).

## Recommended Direction

1. **Specs reference meanings with plain `meaning://` URLs.** No `specscore:meaning/` shortcut: the target is a MeaningGraph resource, so it keeps MeaningGraph's own address. References may appear anywhere a SpecScore artifact references another resource — inline links in Feature, Idea, REQ and AC bodies, and a `**Meanings:**` header field on Features. Same-repository references use the empty-authority form `meaning:///{concept}` required by the family rule of decision 0010; this needs a matching grammar addition in `meaninggraph/core`.
2. **Pin once per repository in `specscore.yaml`.** MeaningGraph already requires all references from one repository to another to carry the same pin (go.mod style). SpecScore records that pin once in repo config, so spec prose carries readable unpinned URLs; an explicit `?ref=` in prose that disagrees with the configured pin is an error.
3. **One relation vocabulary.** Specs `references` meanings. Code `implements` or `references` meanings using the source-references grammar: `meaninggraph:implements {target}` / `meaninggraph:references {target}`, in any comment syntax, unknown relation is an error, inferred pairs are never accepted claims.
4. **CodeGrapher indexes spec → meaning edges.** `specdoc` emits a `references_meaning` ref; CodeGrapher resolves it to the `meaning_concept` node when the concept's graph is indexed and keeps it as an unresolved reference (with repository and pin) otherwise — it never fetches implicitly. Triangulation queries follow from the combined graph: code that implements a REQ of a Feature which references meaning M but never mentions M, and code that references M under no Feature that does.
5. **Strict lint.** `specscore spec lint` resolves every meaning reference at its pin through the MeaningGraph parser and reports a missing concept, a deprecated concept, or a pin conflict as an error — the same "non-existent is an error" rule as source references.
6. **Graph edits write back to source repositories.** CodeGrapher and SpecScore Studio never hold link state of their own. Adding, changing or removing a link in the graph UI produces a patch to the owning file — spec Markdown, a `*.meaning.yaml` file, or a code comment — published through the target repository's own `specscore.yaml` gates and publication policy. An edit spanning repositories yields one change per repository. The graph reflects the edit after the change merges and the index refreshes.

## Alternatives Considered

- **Keep GraphSpec as the vocabulary layer and link it to MeaningGraph.** Two vocabularies for the same domain concepts would drift; MeaningGraph already has a registry, a released parser and CodeGrapher support.
- **A `specscore:meaning/...` type prefix.** Terser, but it would give one concept two addresses and make SpecScore the resolver of another product's resources.
- **Store links in the graph and export them.** Fast to edit, but creates a second source of truth outside Git review and the repository's gates.

## MVP Scope

One spec repository (`sneat-co/backstage`) references concepts of `meaninggraph/core` from Feature bodies; `specscore spec lint` validates those references at a configured pin; CodeGrapher shows spec → meaning → code paths for that repository; one link added in the CodeGrapher viewer arrives as a reviewed change in the spec repository.

## Not Doing (and Why)

- Name-based or inferred spec → meaning links — accepted links are explicit, as with code links.
- Fetching meaning repositories inside CodeGrapher indexing — keeps indexing offline and reproducible; lint and explicit indexing of the meaning repository resolve them.
- A graph-side link store or edit API that bypasses Git — edits are changes to the owning repository.
- Migrating commands, events and policies into MeaningGraph — MeaningGraph has no such kinds; see decision 0015.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | Specs can name meanings precisely enough that lint can resolve every reference | Annotate backstage Features and run lint against a pinned `meaninggraph/core` |
| Must-be-true | A graph-UI edit can be turned into a minimal, reviewable patch of the owning file | Prototype one add and one remove in the CodeGrapher viewer |
| Should-be-true | One configured pin per meaning repository is enough for spec repositories | Survey backstage and DataTug references |
| Might-be-true | Triangulation queries find real spec/code gaps | Run them on backstage-linked repositories and review the hits |

## SpecScore Integration

- **New Features this would create:** meaning-references
- **Existing Features affected:** source-references (meaninggraph relation directives share the grammar), repo-config (meaning repository pins), feature (optional `**Meanings:**` header), graphspec (deprecated, then removed)
- **Dependencies:** `meaninggraph/core` (`meaning:///` same-repository form), `meaninggraph/cli` parser release, `code-grapher/codegrapher` (`specdoc` meaning refs, annotation grammar, write-back), SpecScore Studio (write-back)

## Open Questions

None at this time.

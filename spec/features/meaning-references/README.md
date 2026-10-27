---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Meaning References

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/meaning-references?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/meaning-references?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/meaning-references?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/meaning-references?op=request-change) |
**Status:** Draft
**Source Ideas:** meaninggraph-linkage

## Summary

Meaning references link SpecScore artifacts and source code to MeaningGraph concepts.

A spec names the domain concepts it talks about with `meaning://` URLs; code claims to implement or reference a concept with a `meaninggraph:` directive. [MeaningGraph](https://meaninggraph.io) defines those concepts in Git repositories. Pins live once per meaning repository in `specscore.yaml`, every reference is resolved strictly by lint, and edits made in a graph view are written back to the repository that owns the changed file.

## Problem

Features and requirements describe behaviour over domain concepts — an invoice, a booking, a household member — but name them only in prose. MeaningGraph defines those concepts in Git, binds them to DataModels, and CodeGrapher already links them to code. Without a spec → meaning link, nobody can ask which features touch a concept, lint cannot catch a spec that names a concept that does not exist, and the spec, meaning and code graphs stay disconnected.

## Design Philosophy

- **The concept keeps its own address.** A meaning is referenced by MeaningGraph's `meaning://` URL, never by a SpecScore alias, so one concept has one address everywhere.
- **Same shape as spec references.** Same-repository and cross-repository forms, pinning, strictness and typed code relations follow [source-references](../source-references/README.md) and [decision 0010](../../decisions/0010-references-are-urls.md).
- **Git is the store.** Links exist only in committed files. A graph view is an index and an editor, never a second source of truth.

## Behavior

### Reference forms

```text
meaning:///{concept}                          # concept in the current repository
meaning://{host}/{org}/{repo}/{concept}       # concept in another repository
```

`{concept}` is a MeaningGraph concept id. The same-repository form applies when the spec repository itself contains `*.meaning.yaml` files in its root.

#### REQ: meaning-url-forms

A meaning reference in a SpecScore artifact MUST use `meaning:///{concept}` for a concept in the current repository or `meaning://{host}/{org}/{repo}/{concept}` for a concept in another repository. The last path segment is the concept id; host, org, repo and concept are compared exactly as written. Any other `meaning:` form is a validation error.

#### REQ: reference-locations

Meaning references MAY appear as Markdown links or bare URLs anywhere in the body of a Feature, Idea, Plan or Decision, including inside REQ and AC sections. A Feature MAY declare the concepts it is primarily about in an optional `**Meanings:**` header field as a comma-separated list of meaning references; when present it follows `**Source Ideas:**`.

### Pinning

```yaml
meaninggraph:
  pins:
    - repo: github.com/meaninggraph/core
      ref: 3b5f1ab…   # full 40-character commit id
```

#### REQ: one-pin-per-repository

Every cross-repository meaning reference resolves at the commit configured for its repository under `meaninggraph.pins` in `specscore.yaml`. Each repository appears at most once. A cross-repository reference whose repository has no configured pin is an error.

#### REQ: inline-pin-agreement

A reference MAY carry `?ref={commit}`. An inline pin that differs from the configured pin for that repository is an error. Same-repository references MUST NOT carry `?ref=`.

### Validation

#### REQ: nonexistent-concept-is-error

`specscore spec lint` MUST resolve every meaning reference with the MeaningGraph parser at its pin and report as an error a reference to a concept that does not exist, an unreadable pinned commit, or a graph that fails MeaningGraph's own check. A reference to a concept marked deprecated is a warning.

#### REQ: explicit-network

Lint MUST NOT fetch a meaning repository unless a local checkout or cache is configured or a flag explicitly allows fetching; an unresolvable repository is reported as unresolved, not silently skipped.

### Code annotations

```go
// meaninggraph:implements meaning://github.com/meaninggraph/core/invoice-total
func InvoiceTotal(...) Money { ... }

// meaninggraph:references meaning:///booking
func ShowBooking(...) { ... }
```

#### REQ: code-relations

A source comment MAY link code to a concept with `meaninggraph:implements {reference}` or `meaninggraph:references {reference}`, in any comment syntax recognised by source-references. An omitted relation means `references`; an unknown relation is an error. Short concept ids without the `meaning:` scheme are accepted for same-repository concepts and expanded to `meaning:///{concept}` before commit.

#### REQ: accepted-not-inferred

Only committed directives are accepted links. Links inferred from names, bindings or proximity MAY be suggested with evidence and confidence, and MUST NOT be reported as accepted.

### Graph indexing and write-back

#### REQ: provider-indexes-spec-meaning-edges

A code-intelligence provider that indexes SpecScore artifacts MUST expose each meaning reference as a spec → concept edge carrying the artifact, the section (REQ or AC id when inside one), the reference as written and its pin. It MUST resolve the edge to an indexed concept when that graph is indexed at the same pin and otherwise keep it as unresolved, without fetching.

#### REQ: edits-write-to-owning-repository

A tool that lets a user add, change or remove a link in a graph view MUST express the edit as a change to the file that owns the link — the spec Markdown, the `*.meaning.yaml` file, or the source comment — and publish it through that repository's configured gates and publication policy. An edit touching several repositories produces one change per repository. The tool MUST NOT persist link state of its own, and MUST show the edit as pending until the change is merged and the index refreshed.

## Dependencies

- [source-references](../source-references/README.md)
- [repo-config](../repo-config/README.md)
- [feature](../feature/README.md)

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Source References](../source-references/README.md) | Shares comment detection, relation semantics and the accepted-versus-suggested rule; `meaninggraph:` directives are a second prefix with the same grammar |
| [Repo Config](../repo-config/README.md) | Adds the optional `meaninggraph.pins` block |
| [Feature](../feature/README.md) | Adds the optional `**Meanings:**` header field |
| [Publication Policy Config](../publication-policy-config/README.md) | Governs how write-back changes are staged, committed and pushed |
| [GraphSpec](../graphspec/README.md) | Deprecated by [decision 0015](../../decisions/0015-meaninggraph-supersedes-graphspec.md); its entities and relationships migrate to MeaningGraph concepts referenced through this feature |

## Acceptance Criteria

### AC: spec-references-resolve

**Requirements:** meaning-references#req:meaning-url-forms, meaning-references#req:reference-locations, meaning-references#req:nonexistent-concept-is-error

A Feature that references an existing concept in a REQ body and in its `**Meanings:**` header lints clean. Changing the concept id to one that does not exist fails lint with an error naming the artifact, the reference and the pinned repository.

### AC: pins-are-single-and-agree

**Requirements:** meaning-references#req:one-pin-per-repository, meaning-references#req:inline-pin-agreement

A cross-repository reference resolves at the pin configured in `specscore.yaml`. A missing pin, a duplicate pin for one repository, a disagreeing inline `?ref=`, and a `?ref=` on a same-repository reference each fail lint.

### AC: no-implicit-fetch

**Requirements:** meaning-references#req:explicit-network

With no local checkout or cache and no fetch flag, lint reports a cross-repository reference as unresolved and makes no network request.

### AC: typed-code-links

**Requirements:** meaning-references#req:code-relations, meaning-references#req:accepted-not-inferred

`meaninggraph:implements` and `meaninggraph:references` directives are recognised in Go, Python and TypeScript comments; an unknown relation fails; a short concept id is expanded before commit; a name-matched suggestion is never reported as an accepted link.

### AC: graph-shows-spec-meaning-code

**Requirements:** meaning-references#req:provider-indexes-spec-meaning-edges

After indexing a spec repository and the meaning repository at the configured pin, the provider returns a path from a Feature REQ to a concept to a code symbol annotated for that concept; without the meaning repository indexed, the same edge is returned as unresolved with its repository and pin.

### AC: edit-becomes-reviewed-change

**Requirements:** meaning-references#req:edits-write-to-owning-repository

Adding a spec → concept link in a graph view produces a change to the Feature file only, through that repository's publication policy; the view shows the link as pending until the change merges and the index refreshes, and no link record exists outside the repository.

## Open Questions

- Should `// modelspec: implements` code annotations move to the same `modelspec:{relation}` grammar at the same time?

---
*This document follows the https://specscore.md/feature-specification*

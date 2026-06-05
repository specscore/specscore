# Feature: New-Artefact Template Gallery

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=request-change) |
**Status:** Stable
**Source Ideas:** new-artefact-templates
**Grade:** B

## Summary

Publishes the canonical new-artefact templates as raw Markdown files on specscore.md — one per artefact type at `/new/<type>.md` — with a browsable index at `/new/`. Each published file is the bare, ready-to-fill skeleton (canonical section headings plus `<!-- … -->` authoring prompts), so humans, agents, and (via a later Feature) the CLI can fetch a valid starting point for a new artefact from one authoritative URL.

## Problem

The only canonical new-artefact templates today are embedded inside the CLI binary. A person or an AI agent without the CLI has nowhere to fetch a valid skeleton for a new Idea, Feature, Plan, or Task; there is no single web home that answers "what does a new X start from." The docs site already publishes the *specification* of each artefact type at `/<type>-specification`, but not the *blank template* you fill in. This Feature adds the missing template namespace.

## Behavior

### Template source files

#### REQ: template-source-location

Template source files MUST live **outside** the `spec/` tree so that `specscore spec lint` does not dispatch them as real artefacts (a file titled `# Idea: <name>` with placeholder content would otherwise fail validation). They live in a build-owned directory `new/` at the repository root, one file per artefact type named `<type>.md` (e.g. `new/idea.md`, `new/feature.md`).

#### REQ: template-content

Each `new/<type>.md` source MUST contain only the lint-clean skeleton a new artefact of that type starts from: the canonical section headings and `<!-- … -->` authoring prompts, with no real content filled in. Where a `specscore <type> new` scaffolder exists, the skeleton MUST match the shape that scaffolder emits.

#### REQ: supported-types

The gallery MUST publish a template for each supported artefact type: `idea`, `feature`, `plan`, `task`, `decision`, `issue`, `proposal`.

### Publishing

#### REQ: raw-template-url

The site build MUST publish each `new/<type>.md` source **verbatim** (byte-for-byte) at the URL path `/new/<type>.md`, served as Markdown. No prose, examples, rendering, or markup is added around the template bytes.

#### REQ: index-page

The site build MUST publish an index page at `/new/` that lists every supported artefact type and links to its `/new/<type>.md` template.

### Fidelity

#### REQ: template-yields-valid-artefact

A template, once its `<!-- … -->` prompts are replaced with valid content and placed at its canonical path, SHOULD produce an artefact that passes `specscore spec lint` for its type.

## Acceptance Criteria

### AC: idea-template-published (verifies REQ:raw-template-url)

**Given** the site has been built from the `new/` sources
**When** a client requests `/new/idea.md`
**Then** the response body is byte-identical to the `new/idea.md` source file and is served as Markdown.

### AC: index-lists-types (verifies REQ:index-page)

**Given** the site has been built
**When** a client requests `/new/`
**Then** the page lists each supported artefact type and each entry links to its `/new/<type>.md` template.

### AC: supported-set-present (verifies REQ:supported-types)

**Given** the site has been built
**When** the published `/new/` namespace is inspected
**Then** a template file is published at `/new/<type>.md` for each of: `idea`, `feature`, `plan`, `task`, `decision`, `issue`, `proposal`.

### AC: templates-outside-spec-tree (verifies REQ:template-source-location)

**Given** the template sources exist under `new/` at the repository root
**When** `specscore spec lint` runs over the repository
**Then** no template file is reported as an artefact violation and the lint tree stays clean.

### AC: template-is-empty-skeleton (verifies REQ:template-content)

**Given** the `new/idea.md` template
**When** it is opened
**Then** it contains the canonical Idea section headings and `<!-- … -->` prompts with no filled-in real content.

### AC: filled-template-lints-clean (verifies REQ:template-yields-valid-artefact)

**Given** the `new/idea.md` template with its prompts replaced by valid content and saved at `spec/ideas/<slug>.md`
**When** `specscore spec lint` runs
**Then** it passes with zero violations.

## Rehearse Integration

The build/routing and lint-surface ACs are testable and have Rehearse stubs under `_tests/`:

- `raw-template-url-idea-template-published.md`
- `index-page-index-lists-types.md`
- `template-source-location-templates-outside-spec-tree.md`
- `template-yields-valid-artefact-filled-template-lints-clean.md`

`supported-set-present` and `template-is-empty-skeleton` are covered by inspection of the build output and the source files respectively; they reuse the same harness as the routing tests and do not get separate stubs.

## Not Doing / Out of Scope

- **CLI runtime-fetch** — the CLI fetching `/new/<type>.md` (with embedded offline fallback) is the sibling Feature `cli-template-runtime-fetch`, specified next. This Feature only publishes the files.
- **Annotated guides, prose, or worked examples** — published files are the bare skeleton only (simplified from the source Idea's "annotated authoring guide" direction, per author decision at spec time).
- **HTML rendering of individual templates** — only the `/new/` index is an HTML page; each `/new/<type>.md` is served as raw Markdown.
- **Localized templates** — English-canonical only; i18n is out of scope.
- **Template versioning / pinning** — deferred; the published file is always "latest."
- **Rewriting the existing `/<type>-specification` pages** — `/new/` is a new sibling namespace.

## Assumption Carryover

From the source Idea `new-artefact-templates`:

- **Resolved / dissolved** — the Idea's lead Must-be-true ("the raw template must be mechanically extractable from the surrounding prose") no longer applies: templates are published raw with no prose, so there is nothing to extract. The CLI (Feature B) fetches the file as-is.
- **Amended** — the Idea proposed an "annotated authoring guide" format and authoring "under `spec/new/`." At spec time both were simplified: raw skeleton files, authored under a build-owned `new/` directory outside `spec/` to keep the lint tree clean.
- **Carried forward to Feature B** — the Idea's second Must-be-true (create-time network fetch is acceptable given an embedded offline fallback) belongs to `cli-template-runtime-fetch`, not this Feature.

## Open Questions

- Should each `/new/<type>.md` also get a human-friendly HTML rendering later, or is the raw `.md` plus the `/new/` index sufficient? (Out of scope for now; not blocking.)
- How does a `plan` template stay in sync given there is no `specscore plan new` scaffolder to mirror? (Tracked; the template is hand-authored from the Plan specification for now.)

---
*This document follows the https://specscore.md/feature-specification*

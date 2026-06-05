# Feature: New-Artefact Template Gallery

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/new-artefact-template-gallery?op=request-change) |
**Status:** Stable
**Source Ideas:** new-artefact-templates
**Grade:** B

## Summary

Publishes the canonical new-artefact templates as raw Markdown files on specscore.md — one per artefact type at `/new/<type>.md` — with a browsable index at `/new/`. Each published file is the bare, ready-to-fill skeleton (canonical section headings plus `<!-- … -->` authoring prompts), so humans, agents, and (via a later Feature) the CLI can fetch a valid starting point for a new artefact from one authoritative URL. Each skeleton also carries the YAML frontmatter every artefact is required to declare under the Approved [Artifact Frontmatter Convention](../artifact-frontmatter-convention/README.md) — a `format:` spec-URL key on every type, plus a `status:` mirror on status-bearing types — so a filled-in template is convention-clean from the first byte.

## Problem

The only canonical new-artefact templates today are embedded inside the CLI binary. A person or an AI agent without the CLI has nowhere to fetch a valid skeleton for a new Idea, Feature, Plan, or Task; there is no single web home that answers "what does a new X start from." The docs site already publishes the *specification* of each artefact type at `/<type>-specification`, but not the *blank template* you fill in. This Feature adds the missing template namespace.

## Behavior

### Template source files

#### REQ: template-source-location

Template source files MUST live **outside** the `spec/` tree so that `specscore spec lint` does not dispatch them as real artefacts (a file titled `# Idea: <name>` with placeholder content would otherwise fail validation). They live in a build-owned directory `new/` at the repository root, one file per artefact type named `<type>.md` (e.g. `new/idea.md`, `new/feature.md`).

#### REQ: template-content

Each `new/<type>.md` source MUST contain only the lint-clean skeleton a new artefact of that type starts from: the canonical section headings and `<!-- … -->` authoring prompts, with no real content filled in. The skeleton also includes the YAML frontmatter required by `template-frontmatter-format` and `template-frontmatter-status` below. Where a `specscore <type> new` scaffolder exists, the skeleton MUST match the shape that scaffolder emits once that scaffolder implements the convention's `scaffold-and-change-status` requirement (see Open Questions on sequencing).

#### REQ: supported-types

The gallery MUST publish a template for each supported artefact type: `idea`, `feature`, `plan`, `task`, `decision`, `issue`, `proposal`.

### Frontmatter

The published templates start from the YAML frontmatter every new artefact is required to carry under the Approved [Artifact Frontmatter Convention](../artifact-frontmatter-convention/README.md), so a filled-in template is convention-clean and a future `specscore … new` scaffold (once that Feature's `scaffold-and-change-status` lands) emits the same shape. This Feature owns the *published gallery* surface only; the lint rules and CLI dual-write that enforce the convention live in `specscore-cli` per that Feature.

#### REQ: template-frontmatter-format

Every `new/<type>.md` template MUST carry a `format:` key in YAML frontmatter whose value is the canonical spec URL for its type — `https://specscore.md/<type>-specification` — per [`artifact-frontmatter-convention#req:format-field`](../artifact-frontmatter-convention/README.md). This applies to every type in `supported-types`. Where the template also carries the human-visible footer line (`*This document follows the <url>*`), the `format:` value and the footer URL MUST be the same URL, per the convention's `footer-format-mirror`.

#### REQ: template-frontmatter-status

A `new/<type>.md` template for a **status-bearing** type MUST carry a `status:` frontmatter key whose value equals the template's body `**Status:**` token, in the same vocabulary, per [`artifact-frontmatter-convention#req:status-field`](../artifact-frontmatter-convention/README.md). For this gallery the status-bearing templates are `idea`, `feature`, `plan`, `decision`, and `proposal` (`proposal` is treated as status-bearing because it carries a body `**Status:**`; its formal addition to the convention's `status-concept-by-type` classification is tracked in Open Questions). Two types are special-cased:

- **`task`** is **exempt** from `status:` for now — its status is board-managed (it has no body `**Status:**`), so it carries `format:` only. Full status-bearing alignment is deferred (see Open Questions).
- **`issue`** carries `status:` **natively** in its existing YAML frontmatter — defined by the issue type's own spec and lint rules, not by the convention's `status-concept-by-type` (which does not list `issue`); it keeps that `status:` unchanged and only gains `format:`.

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

### AC: templates-carry-format (verifies REQ:template-frontmatter-format)

**Given** the `new/` template sources
**When** each `new/<type>.md` is inspected for every type in `supported-types`
**Then** each carries a `format:` YAML-frontmatter key equal to `https://specscore.md/<type>-specification`, and for every template that also has a footer line the `format:` value equals the footer URL.

### AC: status-bearing-templates-mirror-status (verifies REQ:template-frontmatter-status)

**Given** the `idea`, `feature`, `plan`, `decision`, and `proposal` templates
**When** each is inspected
**Then** each carries a `status:` frontmatter key whose value equals its body `**Status:**` token (e.g. `idea` → `Draft`, `decision` → `Proposed`).

### AC: task-template-format-only (verifies REQ:template-frontmatter-status)

**Given** the board-managed `task` template, which has no body `**Status:**`
**When** `new/task.md` is inspected
**Then** it carries a `format:` frontmatter key and **no** `status:` key.

## Rehearse Integration

The build/routing and lint-surface ACs are testable and have Rehearse stubs under `_tests/`:

- `raw-template-url-idea-template-published.md`
- `index-page-index-lists-types.md`
- `template-source-location-templates-outside-spec-tree.md`
- `template-yields-valid-artefact-filled-template-lints-clean.md`

`supported-set-present` and `template-is-empty-skeleton` are covered by inspection of the build output and the source files respectively; they reuse the same harness as the routing tests and do not get separate stubs. The three frontmatter ACs (`templates-carry-format`, `status-bearing-templates-mirror-status`, `task-template-format-only`) are likewise covered by source-file inspection of the `new/` templates and reuse the same harness — no separate stubs.

## Not Doing / Out of Scope

- **CLI runtime-fetch** — the CLI fetching `/new/<type>.md` (with embedded offline fallback) is the sibling Feature `cli-template-runtime-fetch`, specified next. This Feature only publishes the files.
- **Annotated guides, prose, or worked examples** — published files are the bare skeleton only (simplified from the source Idea's "annotated authoring guide" direction, per author decision at spec time).
- **HTML rendering of individual templates** — only the `/new/` index is an HTML page; each `/new/<type>.md` is served as raw Markdown.
- **Localized templates** — English-canonical only; i18n is out of scope.
- **Template versioning / pinning** — deferred; the published file is always "latest."
- **Rewriting the existing `/<type>-specification` pages** — `/new/` is a new sibling namespace.
- **The convention's lint rules and CLI dual-write/scaffold implementations** — `lint-format-required`, `lint-status-mirror`, and the `… new` / `change-status` frontmatter emission live in `specscore-cli` per [artifact-frontmatter-convention](../artifact-frontmatter-convention/README.md); this revision only brings the published gallery templates into the convention's frontmatter shape.
- **Task's full status-bearing alignment and footer** — adding a body `**Status:**`, a `status:` mirror, and a footer to `task` is deferred (see Open Questions); this revision adds only `format:` to the task template.

## Assumption Carryover

From the source Idea `new-artefact-templates`:

- **Resolved / dissolved** — the Idea's lead Must-be-true ("the raw template must be mechanically extractable from the surrounding prose") no longer applies: templates are published raw with no prose, so there is nothing to extract. The CLI (Feature B) fetches the file as-is.
- **Amended** — the Idea proposed an "annotated authoring guide" format and authoring "under `spec/new/`." At spec time both were simplified: raw skeleton files, authored under a build-owned `new/` directory outside `spec/` to keep the lint tree clean.
- **Carried forward to Feature B** — the Idea's second Must-be-true (create-time network fetch is acceptable given an embedded offline fallback) belongs to `cli-template-runtime-fetch`, not this Feature.

## Open Questions

- Should each `/new/<type>.md` also get a human-friendly HTML rendering later, or is the raw `.md` plus the `/new/` index sufficient? (Out of scope for now; not blocking.)
- How does a `plan` template stay in sync given there is no `specscore plan new` scaffolder to mirror? (Tracked; the template is hand-authored from the Plan specification for now.)
- **Sequencing vs the scaffolders.** These template frontmatter additions *lead* the `specscore … new` scaffolders, which do not yet emit frontmatter (the convention's `scaffold-and-change-status` is unimplemented in `specscore-cli`). Per the convention's `migration-sequencing` grace period the two converge during that rollout; until then a bare CLI fetch (`cli-template-runtime-fetch`) yields a frontmatter'd artefact while an embedded scaffold does not. Not blocking, but the gallery and scaffolder changes should land in the same rollout window. (Tracked.)
- **`task` full alignment.** `task` carries `format:` only here. Bringing it fully under the convention (body `**Status:**` + `status:` mirror + footer) depends on the task-lifecycle / `task new` status model, which is board-managed today. Note that the convention's `status-concept-by-type` *does* classify Task as status-bearing, so until `task` is aligned its template would trip `lint-status-mirror` case (a) ("status-bearing artefact missing `status:`"); the convention's `migration-sequencing` grace period must therefore stay in effect for `task` until that alignment lands. Recommend resolving in the task-lifecycle work, not here. (Tracked.)
- **`proposal` classification + spec page.** `proposal` is treated as status-bearing here but is not yet in the convention's `status-concept-by-type` list, and no `https://specscore.md/proposal-specification` page is published yet — so its `format:` URL is pattern-derived pending that page, and its footer alignment follows the convention's `footer-format-mirror` rollout. Recommend the convention Feature formally add `proposal` and the page be published. (Tracked.)

---
*This document follows the https://specscore.md/feature-specification*

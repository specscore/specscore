# Feature: Studio Toolbar

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/studio-toolbar?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/studio-toolbar?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/studio-toolbar?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/studio-toolbar?op=request-change) |

**Status:** Approved
**Source Ideas:** studio-toolbar

## Summary

Replaces the single "View in SpecStudio" link at the top of every feature README with a fixed four-item toolbar — Explore, Edit, Ask question, Request change — linking into the SpecScore.Studio web app at `specscore.studio/app/`. Defines the canonical byte form of the toolbar line, the URL grammar (`/app/{host}/{org}/{repo}/{artifact_path}?op={verb}`, per the canonical scheme in [Studio URL Scheme decision (D-0001)](https://specscore.studio/app/github.com/specscore/specscore/spec/decisions/0001-studio-url-scheme.md)), the brand attribution rendering rule, the new `studio-toolbar` lint rule (replacing `view-link`), and the `--fix` autofix that rewrites legacy lines into the canonical form.

## Problem

Feature READMEs today carry a single text-with-one-link line — `> [View in SpecStudio](url) — graph, discussions, approvals` — that surfaces only one action (view) and treats the trailing annotation as unclickable text. The link host (`specstudio.synchestra.io`) and URL shape (query-id style `?id={repo}@{org}@{host}&path=...`) are baked into tooling defaults that no longer match the product's intended home (`specscore.studio`) or its action-oriented model. Users reviewing a feature need actionable entry points for the four canonical operations the studio supports — explore the artifact graph, edit the spec, ask a question, request a change — directly from the markdown file. The line must remain byte-deterministic so lint can validate it without becoming a template renderer.

## Behavior

### Toolbar rendering

Every feature README emits exactly one studio toolbar at a fixed position in a fixed shape. The toolbar is non-configurable in v1: the items, labels, order, separator, and surrounding chrome are part of this Feature's contract, not the per-project `studio:` config.

#### REQ: toolbar-position

A feature README that is not opted out via `studio: null` in `specscore.yaml` MUST render the studio toolbar as a single line at file position 3 — that is, immediately after the `# Feature: <title>` title on line 1 and the mandatory blank separator on line 2. Exactly one toolbar MUST be rendered per file.

#### REQ: toolbar-line-shape

The toolbar line MUST conform to the canonical byte form:

```
> {brand-attribution}: | [Explore]({explore-url}) | [Edit]({edit-url}) | [Ask question]({ask-url}) | [Request change]({request-change-url}) |
```

Where:

- The line begins with `> ` (blockquote marker followed by a single space).
- `{brand-attribution}` is rendered per `brand-attribution-rendering`.
- A literal `:` immediately follows the closing `)` of the brand attribution link, before the first ` | ` separator.
- Each toolbar item is `[Label]({url})` with the labels exactly `Explore`, `Edit`, `Ask question`, `Request change`.
- ` | ` (space, pipe, space) MUST separate every adjacent pair of items and the brand prefix from the first item.
- A trailing ` |` (space, pipe) terminates the line.
- The line ends with a single LF; no trailing whitespace before the LF.

Implementations MUST emit this byte form exactly. Lint MUST validate it byte-for-byte. No alternative separator, label, casing, or ordering is permitted.

#### REQ: toolbar-verb-order

The four toolbar items MUST appear in the exact order: Explore, Edit, Ask question, Request change. The verb set is closed — no other verbs may be rendered, omitted, or reordered. Per-item visibility toggles MUST NOT be supported in v1.

#### REQ: toolbar-file-scope

All four verbs operate at the level of the entire feature artifact (the README file). The toolbar MUST NOT render scope tokens such as `&section=` or `&req=` in URLs, and MUST NOT render additional per-section or per-REQ toolbars within the file. Finer-grained scoping, if it ever ships, is the subject of a separate future Feature; it is out of scope here.

### Brand attribution

#### REQ: brand-attribution-rendering

The brand attribution prefix MUST be rendered as a single markdown hyperlink wrapping the entire `studio.name`, targeting `studio.url` (after trailing-slash strip per `url-grammar-trailing-slash`). The substring of `studio.name` that follows the LAST `.` character MUST be wrapped in `**...**` (markdown bold) inside the link text. All earlier characters of `studio.name` (including any preceding dots) render plain inside the same link text.

A literal `:` (plain text, no emphasis) MUST follow the closing `)` of the markdown link, before the first toolbar separator.

For the default `studio.name = "SpecScore.Studio"` with `studio.url = "https://specscore.studio/"`, the rendered prefix is exactly:

```
[SpecScore.**Studio**](https://specscore.studio):
```

#### REQ: brand-attribution-no-dot

When `studio.name` contains no `.` character, the entire name MUST render plain inside the link (no bold emphasis). The link target and following `:` are unchanged.

For `studio.name = "AcmeSpecs"` and `studio.url = "https://specs.acme.internal/"`, the rendered prefix is:

```
[AcmeSpecs](https://specs.acme.internal):
```

#### REQ: brand-attribution-multi-dot

When `studio.name` contains more than one `.` character, only the segment following the LAST `.` is wrapped in `**...**`. All earlier segments and their interior dots render plain.

For `studio.name = "Acme.Internal.Studio"`, the rendered prefix is:

```
[Acme.Internal.**Studio**](...):
```

### URL grammar

#### REQ: url-grammar-path

Each toolbar URL MUST conform to the grammar:

```
{studio.url-stripped}/app/{host}/{org}/{repo}/{artifact_path}?op={verb}
```

The grammar follows the canonical Studio URL scheme in [D-0001](https://specscore.studio/app/github.com/specscore/specscore/spec/decisions/0001-studio-url-scheme.md) — first segment after `/app/` is the forge host directly (no `/p/` or `/project/` prefix). Where:

- `{studio.url-stripped}` is the value of `studio.url` with its single trailing `/` removed (per `url-grammar-trailing-slash`).
- `{host}`, `{org}`, `{repo}` are resolved from `specscore.yaml` `project.host` / `project.org` / `project.repo` (explicit values override git-remote inference per the `repo-config` Feature's `source-reference-overrides` REQ). `{host}` MUST contain `.` per D-0001's first-segment dispatch rule — every forge host on the allow-list satisfies this.
- `{artifact_path}` is the filesystem path from the repository root to the feature's directory (e.g., `spec/features/repo-config`), NOT including the `/README.md` suffix. Path separators (`/`) are preserved literally. Only characters that RFC 3986 requires to be percent-encoded (e.g., spaces) MUST be percent-encoded; common alphanumerics, `-`, `_`, `.`, and `/` MUST NOT be percent-encoded.
- `{verb}` is one of the four values from the closed set: `explore`, `edit`, `ask`, `request-change`.

The query parameter key MUST be exactly `?op=` — not `?action=`, not `?o=`. No additional query parameters MUST be appended (see `url-grammar-no-utm`).

#### REQ: url-grammar-trailing-slash

This Feature requires `studio.url` to end with exactly one trailing `/` (the schema-level validation of that requirement is owned by the `repo-config` Feature). The renderer MUST strip this single trailing `/` before joining `studio.url` with the path grammar, to avoid producing a double slash in toolbar URLs. The renderer MUST NOT strip any other slashes from `studio.url`.

#### REQ: url-grammar-naked-default

The studio MUST treat a naked artifact URL (no `?op=` query parameter) as equivalent to `?op=explore`. The toolbar's `Explore` link MUST nevertheless include the explicit `?op=explore` parameter, so that lint can validate the toolbar line byte-for-byte without conditionally omitting the parameter.

#### REQ: url-grammar-no-utm

Toolbar URLs MUST NOT include UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) or any other tracking query parameters. Server-side attribution is derived from `op` + path + HTTP `Referer`; URL-level tagging is rejected as duplicative and pollution-prone.

#### REQ: url-grammar-no-branch-tag

Toolbar URLs MUST NOT include branch or tag suffixes (no `@{branch}`, `@{tag}`, `?ref=`, etc.). Links always reference the current state of the artifact in the working repository view.

### Lint rule and autofix

#### REQ: studio-toolbar-lint-rule

The CLI MUST expose a lint rule named `studio-toolbar` (replacing the legacy `view-link` rule). The rule MUST validate that the toolbar line at file position 3 of every feature README conforms byte-for-byte to `toolbar-line-shape`, given the project's resolved `studio` config and the artifact's path. Any deviation — different separator, missing item, reordered items, extra whitespace, wrong host, missing or wrong `?op=` parameter — MUST be a hard error with severity `error`. The renderer and the linter MUST produce the same bytes from the same inputs.

#### REQ: studio-toolbar-lint-removes-view-link

The legacy `view-link` lint rule MUST be removed in the same release that introduces `studio-toolbar`. Configurations referencing `view-link` (e.g., `--ignore view-link`, `--rules view-link`) MUST emit a "rule not found" error with a remediation message directing the user to the `studio-toolbar` rule name.

#### REQ: studio-toolbar-lint-no-viewer-backcompat

The lint rule MUST treat the presence of a `viewer:` block in `specscore.yaml` (in any form — mapping, `null`, or bare key) as a hard error. The error message MUST direct the user to rename the block to `studio:`. The `--fix` autofix MUST NOT rewrite `viewer:` to `studio:` automatically — yaml block migration is hand-edited for this pre-v1 break (see `repo-config` for the removal of `viewer:` REQs).

#### REQ: studio-toolbar-autofix-artifact-line

`specscore spec lint --fix` MUST detect any non-conforming toolbar line at file position 3 of a feature README and rewrite it to the canonical byte form, given the project's resolved `studio` config. Non-conforming forms that the autofix MUST handle include: the legacy single-link `> [View in {name}](...) — graph, discussions, approvals` line; any toolbar with a missing, extra, reordered, or relabeled item; any URL with a wrong host, wrong path prefix (pre-canonical forms such as `/project/`, `/app/p/`, `/app/project/`, or query-id form), and a missing toolbar line entirely (when `studio:` is not `null`). The autofix MUST NOT touch any other line of the README.

#### REQ: studio-toolbar-autofix-blocked-by-viewer

When `specscore.yaml` contains a `viewer:` block, `specscore spec lint --fix` MUST NOT rewrite any toolbar lines. The autofix MUST emit a hard error directing the user to first rename `viewer:` to `studio:` in `specscore.yaml`. This prevents the autofix from running with a stale or absent `studio.url` / `studio.name`.

### Opt-out

#### REQ: studio-toolbar-opt-out

When `studio:` is explicitly set to `null` in `specscore.yaml`, NO toolbar MUST be rendered in any feature README. Lint MUST NOT report a missing-toolbar error for any feature. This is the only way to suppress the toolbar; the all-or-nothing semantics are inherited from the `repo-config` Feature's `studio:` block (which replaces the legacy `viewer:` block).

The `--fix` autofix MUST remove any pre-existing toolbar line at file position 3 from a feature README when `studio:` is set to `null`, and MUST NOT introduce a toolbar line into any feature README that does not already have one.

## Dependencies

- [repo-config](../repo-config/README.md) — owns the `studio:` yaml block schema (defaults, `studio: null` opt-out, required-when-explicit, trailing-slash validation on `studio.url`). This Feature consumes the resolved `studio.name` and `studio.url`.
- [feature](../feature/README.md) — defines feature README structural conventions (title on line 1, blank separator on line 2); this Feature places the toolbar at line 3 within that structure.

## Acceptance Criteria

### AC: toolbar-rendered-with-defaults

**Requirements:** studio-toolbar#req:toolbar-position, studio-toolbar#req:toolbar-line-shape, studio-toolbar#req:toolbar-verb-order, studio-toolbar#req:brand-attribution-rendering, studio-toolbar#req:url-grammar-path, studio-toolbar#req:url-grammar-trailing-slash, studio-toolbar#req:url-grammar-naked-default

**Given** a SpecScore project at git remote `https://github.com/specscore/specscore` with no `studio:` block in `specscore.yaml` (so defaults apply: `name = "SpecScore.Studio"`, `url = "https://specscore.studio/"`), and a feature README at `spec/features/repo-config/README.md`
**When** the feature README's toolbar line is rendered (by `specscore` codegen or by `--fix`)
**Then** file position 3 of `spec/features/repo-config/README.md` is exactly:

```
> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/repo-config?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/repo-config?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/repo-config?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/repo-config?op=request-change) |
```

### AC: brand-attribution-bolds-last-segment

**Requirements:** studio-toolbar#req:brand-attribution-rendering, studio-toolbar#req:brand-attribution-multi-dot

**Given** a project with `studio: { name: "Acme.Internal.Studio", url: "https://acme.internal.studio/" }` in `specscore.yaml`
**When** any feature README's toolbar is rendered
**Then** the brand attribution prefix is exactly `[Acme.Internal.**Studio**](https://acme.internal.studio):` — only the substring "Studio" is wrapped in `**...**`; both preceding `.` characters and the substrings "Acme" and "Internal" render plain.

### AC: brand-attribution-no-dot-no-bold

**Requirements:** studio-toolbar#req:brand-attribution-no-dot

**Given** a project with `studio: { name: "AcmeSpecs", url: "https://specs.acme.internal/" }` in `specscore.yaml`
**When** any feature README's toolbar is rendered
**Then** the brand attribution prefix is exactly `[AcmeSpecs](https://specs.acme.internal):` — no `**` markers anywhere in the prefix.

### AC: url-grammar-strips-trailing-slash

**Requirements:** studio-toolbar#req:url-grammar-path, studio-toolbar#req:url-grammar-trailing-slash

**Given** a project with `studio: { name: "X.Y", url: "https://x.example/" }` and a feature at `spec/features/foo/` in repo `baz` under org `bar` on host `github.com`
**When** the `Edit` toolbar URL is rendered
**Then** the URL is exactly `https://x.example/app/github.com/bar/baz/spec/features/foo?op=edit` — exactly one `/` between `https://x.example` and `app`, the path prefix is `/app/`, the host segment (`github.com`) follows `/app/` directly, the artifact path is the feature directory without `/README.md`, and the verb is `?op=edit`.

### AC: opt-out-suppresses-toolbar

**Requirements:** studio-toolbar#req:studio-toolbar-opt-out

**Given** a project with `studio: null` in `specscore.yaml` and a feature README at `spec/features/foo/README.md` that contains no toolbar line at file position 3
**When** `specscore spec lint` runs against the project
**Then** the rule `studio-toolbar` emits no errors or warnings for the missing toolbar line in any feature README.

### AC: lint-errors-on-byte-drift

**Requirements:** studio-toolbar#req:studio-toolbar-lint-rule, studio-toolbar#req:toolbar-line-shape

**Given** a feature README whose line at file position 3 differs by at least one byte from the canonical form for the project's resolved `studio` config (for example: the separator is `|` without surrounding spaces, or the first label is `explore` lowercase, or the trailing ` |` is missing, or the brand attribution lacks the closing `:`)
**When** `specscore spec lint` runs
**Then** the rule `studio-toolbar` emits exactly one hard `error`-severity violation at the offending line, with a message identifying the specific byte deviation and showing the expected form.

### AC: viewer-block-is-hard-error

**Requirements:** studio-toolbar#req:studio-toolbar-lint-no-viewer-backcompat

**Given** a `specscore.yaml` containing any form of `viewer:` block (mapping, `viewer: null`, or bare key)
**When** `specscore spec lint` runs
**Then** the rule `studio-toolbar` emits a hard `error`-severity violation whose message names the offending `viewer:` key and directs the user to rename it to `studio:`. The `--fix` autofix does not silently migrate the block.

### AC: autofix-rewrites-legacy-line

**Requirements:** studio-toolbar#req:studio-toolbar-autofix-artifact-line

**Given** a feature README whose line at file position 3 is the legacy form `> [View in SpecStudio](https://specstudio.synchestra.io/project/features?id=specscore@synchestra-io@github.com&path=spec%2Ffeatures%2Fstudio-toolbar) — graph, discussions, approvals`, **and** a `specscore.yaml` that has already been hand-migrated from `viewer:` to `studio:` with defaults
**When** `specscore spec lint --fix` runs
**Then** line 3 of the feature README is replaced byte-for-byte with the canonical toolbar form per `AC: toolbar-rendered-with-defaults`; no other line of the README is modified.

### AC: autofix-blocked-when-viewer-still-present

**Requirements:** studio-toolbar#req:studio-toolbar-autofix-blocked-by-viewer

**Given** a `specscore.yaml` that still contains a `viewer:` block (in any form), and at least one feature README with a non-conforming line at file position 3
**When** `specscore spec lint --fix` runs
**Then** no feature README is modified, and a hard `error`-severity violation is emitted directing the user to first rename `viewer:` to `studio:` in `specscore.yaml`.

### AC: view-link-rule-removed

**Requirements:** studio-toolbar#req:studio-toolbar-lint-removes-view-link

**Given** a CLI invocation of `specscore spec lint --ignore view-link` (referencing the removed legacy rule name)
**When** the CLI processes the flag
**Then** the CLI exits with a "rule not found" error that names `view-link` as removed and identifies `studio-toolbar` as the replacement rule name.

### AC: no-section-or-req-scope-tokens

**Requirements:** studio-toolbar#req:toolbar-file-scope

**Given** a feature README whose line at file position 3 is a toolbar whose any item URL contains `&section=<value>`, `&req=<value>`, or any other scope-narrowing query parameter beyond `?op=<verb>`
**When** `specscore spec lint` runs
**Then** the rule `studio-toolbar` emits a hard `error`-severity violation identifying the disallowed query parameter and citing `toolbar-file-scope` as the violated REQ.

### AC: no-utm-parameters

**Requirements:** studio-toolbar#req:url-grammar-no-utm

**Given** a feature README whose line at file position 3 is a toolbar whose any item URL contains any `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, or any other tracking query parameter
**When** `specscore spec lint` runs
**Then** the rule `studio-toolbar` emits a hard `error`-severity violation identifying the disallowed tracking parameter and citing `url-grammar-no-utm` as the violated REQ.

### AC: no-branch-or-tag-suffix

**Requirements:** studio-toolbar#req:url-grammar-no-branch-tag

**Given** a feature README whose line at file position 3 is a toolbar whose any item URL contains `@<branch>`, `@<tag>`, `?ref=<value>`, or any other branch- or tag-pinning suffix
**When** `specscore spec lint` runs
**Then** the rule `studio-toolbar` emits a hard `error`-severity violation identifying the disallowed suffix and citing `url-grammar-no-branch-tag` as the violated REQ.

### AC: opt-out-strips-existing-toolbar

**Requirements:** studio-toolbar#req:studio-toolbar-opt-out

**Given** a project with `studio: null` in `specscore.yaml`, and a feature README that DOES contain a canonical toolbar line at file position 3 (e.g., from a previous render before opt-out was set)
**When** `specscore spec lint --fix` runs
**Then** the toolbar line is removed from the feature README, leaving file position 3 either blank (matching feature-README convention for absent toolbar) or filled with whatever line followed it; no other line is modified.

## Open Questions

- Rehearse stub coverage for each AC is deferred to the implementation plan; the `_tests/` directory is not yet scaffolded in this Feature.

---
*This document follows the https://specscore.md/feature-specification*

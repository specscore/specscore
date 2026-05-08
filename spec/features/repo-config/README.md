# Feature: Repo Config

> [View in SpecStudio](https://specstudio.synchestra.io/project/features?id=specscore@synchestra-io@github.com&path=spec%2Ffeatures%2Frepo-config) — graph, discussions, approvals

**Status:** Draft

## Summary

Defines `specscore.yaml`, the single mandatory repository-level config file for SpecScore projects. Specifies the file name, the mandatory schema-pointer header comment, the optional `project` identity block, related-project navigation hints, top-level dir-name overrides, modules with code roots, viewer configuration, and inference defaults so a minimal repo can ship with an effectively empty config.

## Contents

| Directory | Description |
|-----------|-------------|
| [_tests/](_tests/README.md) | Test scenarios for repo-config requirements |

## Problem

SpecScore needs a single, predictable, repo-level config file. The legacy `specscore-spec-repo.yaml` carried Synchestra-flavored naming (the spec-repo / state-repo / code-repo split) that does not apply to SpecScore proper, and its schema did not support modular layouts (e.g., a frontend and a backend module sharing one repo). Tools that render artifact links (`View in …`) had no name-agnostic place to read viewer settings, so `Spec Studio` was effectively hard-coded.

This feature replaces `project-definition` with a simpler, more flexible schema.

## Behavior

### File name and location

The config file is `specscore.yaml` and lives at the repository root.

#### REQ: file-name

Every SpecScore project MUST have a file named exactly `specscore.yaml` at the repository root. Any other name (including `specscore-project.yaml`, `specscore-spec-repo.yaml`, `.specscore.yaml`) is invalid.

### Schema-pointer header comment

Every `specscore.yaml` is self-identifying. Line 1 of the file is a fixed comment that names the schema. The comment is required even when the rest of the file is empty.

#### REQ: schema-header-comment

Line 1 of `specscore.yaml` MUST be exactly:

```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config
```

A file whose line 1 is anything else — including a blank line, a different comment, a YAML document marker (`---`), or a leading BOM followed by other content — is invalid. Lint MUST emit a hard error.

#### REQ: empty-config-valid

A `specscore.yaml` containing only the schema-header comment (with an optional trailing newline) is valid. All field defaults defined by this feature apply.

### Project identity

The optional `project:` block declares the project's identity. Every field within it is also optional; missing fields are inferred from the git remote or from the working directory.

| Field | Default | Description |
|-------|---------|-------------|
| `title` | git repository name | Human-readable project name |
| `host` | parsed from `origin` git remote | Repository host (e.g., `github.com`) |
| `org` | parsed from `origin` git remote | Repository org / owner |
| `repo` | parsed from `origin` git remote | Repository name |
| `repositories` | — | List of code repository URLs associated with this project |

#### REQ: project-block-optional

The `project:` block MAY be omitted entirely. When omitted, every field below is inferred from the git remote and working directory; the file remains valid.

#### REQ: project-title-default

When `project.title` is omitted, the effective title is the basename of the repository's working directory. When `project.title` is present, its value is used as-is.

#### REQ: source-reference-overrides

`project.host`, `project.org`, and `project.repo` override `origin` git-remote inference for source-reference URL building. Tools resolving same-repo references MUST prefer explicit values when present. This handles forks, mirrors, and non-standard remote names. See the [Source References feature](../source-references/README.md).

#### REQ: project-repositories

`project.repositories` is an OPTIONAL list of code repository URLs associated with this project. SpecScore CLI does not consume this list; it is metadata for downstream tools (e.g., orchestration platforms, viewers). The list MUST round-trip on read/write.

### Related projects

The optional root-level `projects:` field is a list of related SpecScore projects worth navigating to from this one. The relationship direction (parent, child, sibling, dependency) is unspecified; entries are navigation aids.

```yaml
projects:
  - https://github.com/org/parent-project          # external repo URL
  - ./packages/api                                  # path to dir with its own specscore.yaml
```

#### REQ: projects-list

`projects:` is an OPTIONAL root-level list. Each entry MUST be either:

1. A URL to an external repository (any scheme parseable as a URI), or
2. A path (relative or starting with `./`) to a directory in the current repository.

#### REQ: projects-local-path-must-resolve

When a `projects:` entry is a local path, that path MUST resolve to a directory containing its own `specscore.yaml` file. Lint MUST emit an error for local-path entries pointing at directories that do not exist or do not contain `specscore.yaml`.

### Directory names

Top-level overrides for the spec and docs directory names. These apply uniformly across all modules; per-module overrides are not supported in v1.

| Field | Default | Description |
|-------|---------|-------------|
| `specs_dir_name` | `specs` | Name of the specs directory inside each module |
| `docs_dir_name` | `docs` | Name of the docs directory inside each module |

#### REQ: specs-dir-name-default

When `specs_dir_name` is omitted, tools MUST treat the value as `specs`. The same name applies to every module.

#### REQ: docs-dir-name-default

When `docs_dir_name` is omitted, tools MUST treat the value as `docs`. The same name applies to every module.

### Modules

A module is a code area within the repository, optionally with its own specs and docs subdirectories. The feature graph is unified across modules; modules partition where files live, not the graph itself.

```yaml
modules:
  - name: Highlevel        # specs at ./specs/, docs at ./docs/
  - name: Backend
    path: backend          # specs at ./backend/specs/, docs at ./backend/docs/
    code:
      - pkg/               # ./backend/pkg/
      - go.mod             # ./backend/go.mod
      - go.sum             # ./backend/go.sum
  - path: frontend         # name deduced as "frontend"
```

#### REQ: modules-default

When `modules:` is omitted, tools MUST behave as if a single module `{}` were declared — one module at the repository root with no `code:` paths.

#### REQ: module-name-deduction

When a module's `name` field is omitted, the effective name is the basename of `path`. When both `name` and `path` are omitted, the effective name is `default`.

#### REQ: module-path-resolution

A module's specs directory is `{module.path}/{specs_dir_name}/`. Its docs directory is `{module.path}/{docs_dir_name}/`. Each entry in `code:` is resolved as a path (file or directory) relative to `{module.path}/`. When `module.path` is omitted, all resolution is relative to the repository root.

#### REQ: module-code-list

`code:` is an OPTIONAL per-module list of paths (files or directories). Tools scanning code for `specscore:` annotations MUST use these paths as scan roots, scoped to the module's effective `path`. A module without a `code:` list is spec-only — no code is attributed to it.

#### REQ: module-paths-unique

Two modules MUST NOT have the same effective `path` (where omitted `path` is treated as `.`). Duplicate module paths are a hard error.

#### REQ: module-paths-non-nested

Two modules with explicit `path:` values MUST NOT have an ancestor-descendant relationship (i.e., one path is a prefix of the other interpreted as filesystem paths). A module with no `path:` (the implicit-root module) MAY coexist with any number of explicit-path modules. Nested explicit-path modules are a hard error.

### Viewer

The optional `viewer:` block names the upstream viewer that renders SpecScore artifacts in a browser. Tools that emit "View in …" links in artifact documents (e.g., feature READMEs) read this block.

```yaml
viewer:
  name: SpecStudio
  url: https://specstudio.synchestra.io/
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | yes (when `viewer:` is present as a mapping) | Display name shown in rendered links (e.g., "View in {name}") |
| `url` | yes (when `viewer:` is present as a mapping) | Base URL of the viewer; rendered links point under this URL |

#### REQ: viewer-default-when-omitted

When `viewer:` is omitted entirely, tools MUST use the defaults `name: SpecStudio` and `url: https://specstudio.synchestra.io/`. Artifact view links MUST be rendered with these defaults.

#### REQ: viewer-explicit-values

When `viewer:` is present as a mapping, both `name` (string) and `url` (valid URL) MUST be present. Partial mappings (e.g., `viewer: { name: X }` without a URL) are a hard error. Defaults do not apply to a partially-specified `viewer:` block — defaults apply only when the whole block is absent.

#### REQ: viewer-null-opts-out

When `viewer:` is explicitly set to `null` (YAML `null`, `~`, or an empty value), tools MUST NOT render any view link in artifact documents. This is the only way to suppress view links; omitting the block falls back to defaults.

#### REQ: viewer-link-mandatory-unless-opted-out

Tools rendering artifact documents that support a "View in …" link (e.g., the lint `view-link` rule operating on feature READMEs) MUST emit such a link unless `viewer: null` is explicitly set. Implementations MUST NOT silently omit links for any other reason.

### Unknown fields

Orchestration tools (e.g., Synchestra) MAY extend `specscore.yaml` with additional fields at any level. SpecScore tooling preserves them.

```yaml
# Example: orchestrator extension
state_repo: https://github.com/org/project-state
planning:
  auto_create: false
```

#### REQ: unknown-fields-preserved

SpecScore MUST ignore unknown fields at the root, inside `project:`, and inside any module entry. Unknown fields MUST round-trip unchanged on read/write. They MUST NOT cause a validation warning or error.

### Example

A maximal `specscore.yaml` exercising every documented field:

```yaml
# SpecScore Repo Config Schema: https://specscore.md/repo-config

project:
  title: Acme Service
  host: github.com
  org: acme
  repo: service
  repositories:
    - https://github.com/acme/service-api
    - https://github.com/acme/service-web

projects:
  - https://github.com/acme/platform
  - ./packages/shared

specs_dir_name: specs
docs_dir_name: docs

viewer:
  name: SpecStudio
  url: https://specstudio.synchestra.io/

modules:
  - name: Highlevel
  - name: Backend
    path: backend
    code:
      - pkg/
      - go.mod
      - go.sum
  - path: frontend
```

## Dependencies

- [feature](../feature/README.md)
- [source-references](../source-references/README.md)

## Interaction with Other Features

| Feature | Interaction |
|---|---|
| [Source References](../source-references/README.md) | `project.host`, `project.org`, `project.repo` provide overrides for git-remote inference when expanding same-repo references. |
| [Feature](../feature/README.md) | Feature READMEs carry "View in …" links rendered from the `viewer:` block (or its defaults). |
| [Document Types Registry](../document-types-registry/README.md) | This feature is registered in the canonical document-types table; its consumer path is `specscore.yaml`. |

## Acceptance Criteria

### AC: file-recognized

**Requirements:** repo-config#req:file-name, repo-config#req:schema-header-comment, repo-config#req:empty-config-valid

A file named `specscore.yaml` at the repository root with the exact schema-header comment on line 1 is recognized as a SpecScore repo config. A file with any other name, or with a missing or misplaced header comment, is not.

### AC: identity-inferred

**Requirements:** repo-config#req:project-block-optional, repo-config#req:project-title-default, repo-config#req:source-reference-overrides, repo-config#req:project-repositories

Project identity (title, host, org, repo) is inferred from the working directory and git remote when fields are omitted. Explicit values override inference. `project.repositories` round-trips without being interpreted by SpecScore tooling.

### AC: related-projects-validated

**Requirements:** repo-config#req:projects-list, repo-config#req:projects-local-path-must-resolve

Each `projects:` entry is recognized as a URL or a local directory path. Local paths are validated to exist and to contain a nested `specscore.yaml`; entries that fail validation are reported as errors.

### AC: modules-resolved

**Requirements:** repo-config#req:modules-default, repo-config#req:module-name-deduction, repo-config#req:module-path-resolution, repo-config#req:module-code-list, repo-config#req:module-paths-unique, repo-config#req:module-paths-non-nested

Modules resolve their specs, docs, and code paths relative to `module.path`. Module names are deduced from `path` when omitted. Duplicate or nested explicit module paths produce hard errors. The implicit-root module (no `path:`) coexists with explicit-path modules.

### AC: viewer-rules

**Requirements:** repo-config#req:viewer-default-when-omitted, repo-config#req:viewer-explicit-values, repo-config#req:viewer-null-opts-out, repo-config#req:viewer-link-mandatory-unless-opted-out

When `viewer:` is omitted, defaults apply and view links are rendered. When `viewer:` is a mapping, both fields are required. `viewer: null` suppresses view links. View links are mandatory in artifact documents unless explicitly opted out.

### AC: extensions-preserved

**Requirements:** repo-config#req:unknown-fields-preserved

Unknown fields at any level survive read/write without warnings. Orchestrators can extend the config without breaking SpecScore validation.

## Outstanding Questions

- The schema-pointer URL `https://specscore.md/repo-config` does not follow the registry convention `https://specscore.md/{type}-specification` used by other Document-Kind features. Should it be renamed to `https://specscore.md/repo-config-specification` for consistency, or is the shorter form preferred for human typing in YAML headers?
- Should `code:` entries support glob patterns (e.g., `pkg/**/*.go`), or must they be literal file/directory paths? Defer until lint actually consumes them.
- Should an explicit `viewer.name` be allowed to differ from the host implied by `viewer.url` (e.g., `name: MyCompanyDocs` with a SpecStudio-hosted URL)? Spec currently allows it freely.
- How should tooling handle a repository that has no `specscore.yaml` at all — refuse to operate, or assume defaults?

---
*This document follows the https://specscore.md/feature-specification*

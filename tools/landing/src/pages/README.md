# Landing — pages

Astro file-based routes. One file per route.

| File | Route | Purpose |
|---|---|---|
| `index.astro` | `/` | The SpecScore homepage. Imports all section components in IA order and renders them inside `BaseLayout`. |
| `articles/index.astro` | `/articles/` | Index of informational articles. |
| `articles/acceptance-criteria/index.astro` | `/articles/acceptance-criteria/` | How to write acceptance criteria an AI agent can verify. |
| `articles/ears-requirements/index.astro` | `/articles/ears-requirements/` | EARS requirements syntax. |
| `articles/lint-specs-in-ci/index.astro` | `/articles/lint-specs-in-ci/` | How to lint specifications in CI. |
| `articles/feature-spec-template/index.astro` | `/articles/feature-spec-template/` | A PRD and feature spec template in Markdown for AI coding. |
| `articles/claude-code-specs/index.astro` | `/articles/claude-code-specs/` | Spec-driven development with Claude Code and Cursor. |
| `articles/spec-management/index.astro` | `/articles/spec-management/` | Spec management: store, version, and review specifications as Markdown in git, and lint them in CI. |
| `alternatives/openspec/index.astro` | `/alternatives/openspec/` | English OpenSpec alternatives article; Russian counterpart under `ru/`. |
| `alternatives/{spec-kit,kiro,tessl,bmad-method,task-master-ai,datarim,codespeak}/index.astro` | `/alternatives/<slug>/` | Seven competitor alternatives articles in English, with Russian counterparts under `ru/`. |

Locale copies of those routes live in the locale directories (`es/`, `de/`, and the rest). Product pages, comparisons, and the spec-driven development guide are Astro routes in this tree as well.

The docs site (`tools/site-generator/`) still serves `/docs/`, the specification pages, and the blog.

## Open Questions

None at this time.

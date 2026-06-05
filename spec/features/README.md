# SpecScore Features

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features?op=explore) | [Edit](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features?op=edit) | [Ask question](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features?op=ask) | [Request change](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features?op=request-change) |

Core features of the SpecScore specification framework. This table is the canonical [Document Types Registry](document-types-registry/README.md) — every SpecScore document type is listed here with its Kind, specification URL, and Consumer Path.

| Feature | Status | Kind | URL | Consumer Path | Index | Description |
|---------|--------|------|-----|---------------|-------|-------------|
| [idea](idea/README.md) | Approved | Document | `https://specscore.md/idea-specification` | `spec/ideas/*.md` | [ideas-index](ideas-index/README.md) | Pre-spec one-pager that refines a concept into a promotable artifact |
| [feature](feature/README.md) | Stable | Document | `https://specscore.md/feature-specification` | `spec/features/**/README.md` | [features-index](features-index/README.md) | Feature specification structure, metadata, lifecycle, and conventions |
| [acceptance-criteria](acceptance-criteria/README.md) | Stable | Structure | `https://specscore.md/acceptance-criteria-specification` | — | — | Acceptance criteria format and conventions |
| [requirement](requirement/README.md) | Stable | Structure | `https://specscore.md/requirement-specification` | — | — | Discrete testable rules within feature Behavior sections |
| [scenario](scenario/README.md) | Stable | Document | `https://specscore.md/scenario-specification` | `spec/features/**/_tests/*.md` | [scenarios-index](scenarios-index/README.md) | Concrete Given/When/Then behavior examples in `_tests/` directories |
| [entity](entity/README.md) | Approved | Document | `https://specscore.md/entity-specification` | `spec/features/**/*.entity.md` | — | Typed business-object definition with YAML-frontmatter source of truth |
| [property](property/README.md) | Approved | Document | `https://specscore.md/property-specification` | `spec/features/**/*.property.md` | — | Reusable single-field definition (data type + checks) referenced from entities |
| [source-references](source-references/README.md) | Stable | Structure | `https://specscore.md/source-references-specification` | — | — | Code-to-spec traceability via inline annotations |
| [plan](plan/README.md) | Stable | Document | `https://specscore.md/plan-specification` | `spec/plans/**/README.md` | [plans-index](plans-index/README.md) | Planning documents that bridge specs to execution |
| [plans-index](plans-index/README.md) | Draft | Index | `https://specscore.md/plans-index-specification` | `spec/plans/README.md` | — | Canonical index of all Plan documents in a repo |
| [ideas-index](ideas-index/README.md) | Draft | Index | `https://specscore.md/ideas-index-specification` | `spec/ideas/README.md` | — | Canonical index of all active Idea documents in a repo |
| [features-index](features-index/README.md) | Draft | Index | `https://specscore.md/features-index-specification` | `spec/features/README.md` | — | Canonical index of all top-level features in a repo |
| [scenarios-index](scenarios-index/README.md) | Draft | Index | `https://specscore.md/scenarios-index-specification` | `spec/features/**/_tests/README.md` | — | Per-feature index of scenarios inside `_tests/` directories |
| [task](task/README.md) | Stable | Document | `https://specscore.md/task-specification` | `spec/plans/**/tasks/*.md` | — | Discrete units of work within a plan |
| [repo-config](repo-config/README.md) | Draft | Document | `https://specscore.md/repo-config` | `specscore.yaml` | — | SpecScore repo-level configuration: identity, modules, studio settings, publication policy, related projects |
| [adherence-footer](adherence-footer/README.md) | Draft | Meta | — | — | — | The shared footer mechanism every Document-Kind feature delegates to |
| [document-types-registry](document-types-registry/README.md) | Draft | Meta | — | — | — | This registry — canonical list of SpecScore document types |
| [index](index/README.md) | Draft | Meta | — | — | — | Shared shape of every Index-Kind feature — required sections, completeness, footer delegation |
| [studio-toolbar](studio-toolbar/README.md) | Approved | Meta | — | — | — | Fixed four-item toolbar (Explore / Edit / Ask question / Request change) at line 3 of every feature README, replacing the legacy "View in SpecStudio" link |
| [decision](decision/README.md) | Approved | Document | `https://specscore.md/decision-specification` | `spec/decisions/<NNNN>-<slug>.md` | — | Durable, lintable record of a choice made between two or more options |
| [decisions-index](decisions-index/README.md) | Approved | Index | `https://specscore.md/decisions-index-specification` | `spec/decisions/README.md` | — | Canonical index of active Decision documents in a repo |
| [canonical-grade-metadata-field](canonical-grade-metadata-field/README.md) | Approved | — | https://specscore.md/feature-specification | — | — | Defines an optional, single-letter quality Grade as a canonical body-metadata field on gradeable SpecScore artifacts, validated by lint against a configurable value set in specscore.yaml. |
| [publication-policy-config](publication-policy-config/README.md) | Approved | — | https://specscore.md/feature-specification | — | — | Defines durable project and user configuration for SpecScore publication policy: action lists, event and command scopes, branch safety, and precedence. |
| [drift-recap](drift-recap/README.md) | Under Review | — | https://specscore.md/feature-specification | — | — | Formalizes the existing machine-generated per-AC spec-vs-code drift recap as a first-class, status-less SpecScore document type: registry row, format frontmatter, and a lint contract for its YAML summary block. |
| [session-recap](session-recap/README.md) | Under Review | — | https://specscore.md/feature-specification | — | — | Defines the automatic, status-less session-recap document type (a journal rollup over a session window): format frontmatter, body sections plus an optional notes section, a per-user hub-repo storage rule, the recaps config block, and a specscore recap new --session scaffold. |
| [journal-and-summary](journal-and-summary/README.md) | Under Review | — | https://specscore.md/feature-specification | — | — | The append-only activity journal (one event per file, date-sharded, inGitDB-backed) plus on-demand day/week/month summary rollups; the time-series spine D-0002 builds recap/session/portfolio rollups on. Phase 1 (single-repo, project-only config); Phase 2 (cross-repo journal.repo) is a gated proposal. |
| [layered-config](layered-config/README.md) | Under Review | — | https://specscore.md/feature-specification | — | — | Three-layer config resolution (specscore.local.yaml → specscore.yaml → ~/.specscore.yaml, most-specific wins, maps deep-merged) plus user-scoped keys that must not be committed to the shared specscore.yaml. The foundational Feature that unblocks recaps.repo/user and journal.repo/stream. |
| [artifact-frontmatter-convention](artifact-frontmatter-convention/README.md) | Approved | — | https://specscore.md/feature-specification | — | — | Every artifact carries frontmatter format: (spec URL, replacing the footer line) and, for status-bearing types, status: (a mirror of body Status). Defines the Status-concept classification (drift-recap/session-recap are status-less) and the format:/status: lint contract drift-recap and session-recap depend on. |
| [capability-and-platform-implementations](capability-and-platform-implementations/README.md) | Implementing | — | https://specscore.md/feature-specification | — | — | Defines the Capability (platform-agnostic feature) and Implementation (per-platform realization) roles, the Implements reference, and the author-declared Implementation Matrix that makes cross-surface feature drift visible. |
| [new-artefact-template-gallery](new-artefact-template-gallery/README.md) | Approved | — | https://specscore.md/feature-specification | — | — | Publishes the canonical new-artefact templates as raw Markdown files on specscore.md — one per artefact type at /new/<type>.md, with a browsable index at /new/. |

## Feature Hierarchy

```
spec/features/
├── idea/                      # How to structure pre-spec ideation artifacts
├── feature/                   # How to structure and write features
├── requirement/               # How to define addressable rules in Behavior sections
├── acceptance-criteria/       # How to define abstract verification conditions
├── scenario/                  # How to write concrete behavior examples
├── entity/                    # How to define typed business objects with YAML-frontmatter source of truth
├── property/                  # How to define reusable single-field property definitions
├── source-references/         # How to link code to specifications
├── plan/                      # How to structure planning documents
├── plans-index/               # How to structure the plans index
├── ideas-index/               # How to structure the ideas index
├── features-index/            # How to structure this features index
├── scenarios-index/           # How to structure per-feature scenarios indexes
├── task/                      # How to define discrete units of work within a plan
├── repo-config/               # Repo-level config (specscore.yaml): identity, modules, studio, publication policy
├── adherence-footer/          # Shared footer mechanism
├── document-types-registry/   # Canonical list of document types (this registry)
├── index/                     # Shared shape of every Index-Kind feature
└── publication-policy-config/ # Durable project and user publication policy config
```

The `specscore` CLI is specified separately at [specscore/specscore-cli](https://github.com/specscore/specscore-cli).

## Integration with Orchestration Tools

SpecScore specs are format-agnostic. These features define the mental model and conventions:

- **Standalone:** Use SpecScore specs with any orchestration tool (Linear, Jira, custom)
- **With Rehearse:** Add automated testing and validation to SpecScore specs
- **With Synchestra:** Add multi-agent orchestration and coordination

See [synchestra.io](https://synchestra.io) for orchestration on top of SpecScore.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/features-index-specification*

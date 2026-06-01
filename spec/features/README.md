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
| [repo-config](repo-config/README.md) | Draft | Document | `https://specscore.md/repo-config` | `specscore.yaml` | — | SpecScore repo-level configuration: identity, modules, viewer, related projects |
| [adherence-footer](adherence-footer/README.md) | Draft | Meta | — | — | — | The shared footer mechanism every Document-Kind feature delegates to |
| [document-types-registry](document-types-registry/README.md) | Draft | Meta | — | — | — | This registry — canonical list of SpecScore document types |
| [index](index/README.md) | Draft | Meta | — | — | — | Shared shape of every Index-Kind feature — required sections, completeness, footer delegation |
| [studio-toolbar](studio-toolbar/README.md) | Approved | Meta | — | — | — | Fixed four-item toolbar (Explore / Edit / Ask question / Request change) at line 3 of every feature README, replacing the legacy "View in SpecStudio" link |
| [decision](decision/README.md) | Approved | Document | `https://specscore.md/decision-specification` | `spec/decisions/<NNNN>-<slug>.md` | — | Durable, lintable record of a choice made between two or more options |
| [decisions-index](decisions-index/README.md) | Approved | Index | `https://specscore.md/decisions-index-specification` | `spec/decisions/README.md` | — | Canonical index of active Decision documents in a repo |
| [canonical-grade-metadata-field](canonical-grade-metadata-field/README.md) | Approved | — | https://specscore.md/feature-specification | — | — | Defines an optional, single-letter quality Grade as a canonical body-metadata field on gradeable SpecScore artifacts, validated by lint against a configurable value set in specscore.yaml. |
| [publication-policy-config](publication-policy-config/README.md) | Draft | — | https://specscore.md/feature-specification | — | — | Defines durable project and user configuration for SpecScore publication policy: action lists, event and command scopes, branch safety, and precedence. |

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
├── repo-config/               # Repo-level config (specscore.yaml): identity, modules, viewer
├── adherence-footer/          # Shared footer mechanism
├── document-types-registry/   # Canonical list of document types (this registry)
└── index/                     # Shared shape of every Index-Kind feature
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

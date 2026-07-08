# SpecScore Specification

This directory contains the specification for SpecScore — the open-source specification framework for AI-driven development.

## Structure

```
spec/
├── README.md      # This file
├── features/      # The specification format itself, one feature per artifact kind
│                  # (feature, plan, task, idea, decision, repo-config, …) plus the
│                  # GraphSpec language bootstrap (features/graphspec/)
├── decisions/     # Accepted architecture decisions (ADR index)
├── ideas/         # Pre-specification one-pagers and captured seeds
└── plans/         # Ordered task plans that bridge specs to implementation
```

| Path | Start here for |
|---|---|
| [features/](features/README.md) | The full feature index — every artifact kind SpecScore defines, with status |
| [features/graphspec/](features/graphspec/README.md) | The GraphSpec domain-modelling language: kinds, roadmap, decisions, design history |
| [decisions/](decisions/README.md) | Why the architecture is the way it is (ADRs 0001–0005) |
| [ideas/](ideas/README.md) | Work being shaped before it becomes a feature |
| [plans/](plans/README.md) | How accepted features get implemented |

## What SpecScore Defines

1. **Format:** How specifications are structured (directories, files, naming conventions)
2. **Schema:** What makes a valid specification (required fields, metadata, validation rules)
3. **Mental Model:** Best practices for thinking about specifications as machine-readable blueprints
4. **Standards:** How specs link to code, to each other, and to execution workflows
5. **Validation integrations:** How SpecScore can validate independent specifications such as [ModelSpec](https://github.com/specscore/modelspec) without owning their language semantics

Structure (data models) is owned by ModelSpec; connected domain semantics by [GraphSpec](features/graphspec/README.md); see [decision 0003](decisions/0003-one-structural-language.md) for the boundary.

## Open Questions

None at this time.

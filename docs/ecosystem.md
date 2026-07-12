# The Ecosystem

SpecScore is the specification layer in a broader ecosystem of tools for AI-driven development. Each tool works independently but is designed to complement the others.

## SpecScore — The Score

Defines *what* gets built. An open specification format with validation tooling.

- **Format:** Markdown and YAML — version-controlled, portable, no vendor lock-in
- **Tooling:** CLI linter, LSP for editor integration
- **Standalone value:** Write better specs, validate them automatically, link them to code

## Rehearse — The Rehearsal

The acceptance-evidence layer: runs a spec's acceptance criteria *for real* and reports which promises are currently backed by evidence.

- **Real execution, no glue code, no mocks** — scenarios are Markdown with executable steps (`bash`, `sql`, `hurl`, `graphql`) that run against the real system
- **Reusable checks** — `**Use:** [label](url) with name=value` invokes a parameterized verification unit written once and reused across scenarios, so common checks aren't copy-pasted
- **Thin acceptance criteria** — ACs live in `_acs/*.ac.md` as intent only; `specscore rehearse acs` generates a `## Acceptance Criteria` summary as a read-model
- **Self-hosting** — Rehearse's own acceptance tests run in its CI
- Works with any project that uses the SpecScore format

*Shipped and working in `specscore-cli`, in active pre-v1 development.*

Learn more: [Rehearse — in plain language](/rehearse) · [Rehearse vs. Established Testing Frameworks](/rehearse-vs-testing-frameworks) · [rehearse.ink](https://rehearse.ink)

## ModelSpec — The Application Data Model

Defines storage-neutral application data models.

- Describes entities, properties, relationships, components, constraints, indexes, projections, migration metadata, and storage-neutral schemas
- Independent from SpecScore, OpenVaultDB, GraphSpec, and any backend
- Validated by SpecScore through linting, structural validation, and semantic checks
- Consumed directly by OpenVaultDB for schema validation, migration planning, backend mapping, GraphQL generation, DTQL typing metadata, DALGO metadata, and backend generators

[github.com/specscore/modelspec](https://github.com/specscore/modelspec) *(website modelspec.org planned)*

## Synchestra — The Performance

Orchestrates multi-agent work *across* specifications.

- Coordinates AI agents claiming and executing tasks from SpecScore specs
- Schema-validated state at every commit — git is the protocol
- Scales from a single developer to distributed teams

[synchestra.io](https://synchestra.io)

## SpecScore.Studio — The Studio

Authors specifications through guided AI workflows in your editor.

- Claude Code plugin with skills for `ideate`, `specify`, and the rest of the spec-driven lifecycle
- Gates implementation on lint-clean SpecScore artifacts that the user has explicitly approved
- Turns vague ideas into testable specifications without leaving your IDE

[specstudio-skills](https://github.com/specscore/specstudio-skills)

## Codegrapher — The Map

Indexes code into a queryable graph for fast exploration and spec↔code linkage.

- Builds a knowledge graph of symbols and their relationships across the codebase
- Lets AI agents navigate and trace code quickly instead of grepping
- Links SpecScore specifications to the source that implements them, and back

[codegrapher.dev](https://codegrapher.dev/)

## How They Fit Together

```
Author specs with SpecScore.Studio
         ↓
Validate format with SpecScore
         ↓
Validate ModelSpec when present
         ↓
Run acceptance evidence with Rehearse
         ↓
Orchestrate execution with Synchestra
         ↓
Agents coordinate using SpecScore as the shared protocol
```

## Each Tool Standalone, Better Together

You don't need the full ecosystem. SpecScore works with any orchestration tool — Jira, Linear, your own scripts. Rehearse works in any project that uses SpecScore-formatted specs. ModelSpec can be adopted independently anywhere an application data model needs a storage-neutral source of truth. Synchestra is optimized for SpecScore but is not required. SpecScore.Studio is one way to author SpecScore artifacts — you can write them by hand or with any other editor.

The recommended path: start with SpecScore. Add SpecScore.Studio when you want guided authoring in Claude Code. Add Rehearse when you want to run acceptance criteria for real and keep evidence current. Add Synchestra when you need multi-agent coordination.

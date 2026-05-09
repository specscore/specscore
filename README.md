# SpecScore

**The open specification standard for AI-driven development**

SpecScore is an open specification format that makes requirements machine-readable without making them human-unreadable. It's Markdown and YAML — version-controlled, portable, no vendor lock-in. Use it standalone or with any orchestration tool.

[Read the Spec](spec/README.md) · [specscore.md](https://specscore.md) · [Ecosystem](docs/ecosystem.md)

---

## CLI

The CLI for working with SpecScore repositories is [`specscore-cli`](https://github.com/synchestra-io/specscore-cli):

```bash
curl -fsSL https://specscore.md/get-cli | sh
```

```bash
specscore spec lint              # validate the current spec tree
specscore feature list           # list features
specscore feature show <slug>    # inspect a feature
specscore task list              # show the task board
specscore version                # full build identity
```

Full installation guide: [docs/installation.md](docs/installation.md). Source: <https://github.com/synchestra-io/specscore-cli>.

---

## What SpecScore Defines

SpecScore provides a structured format for:

- **[Features](spec/features/feature/README.md)** — user-facing capabilities with requirements and acceptance criteria
- **[Requirements](spec/features/requirement/README.md)** — scoped, testable conditions that define done
- **[Acceptance Criteria](spec/features/acceptance-criteria/README.md)** — machine-readable conditions tied to features and tasks
- **[Plans](spec/features/plan/README.md)** — ordered sequences of tasks that bridge specs to implementation
- **[Tasks](spec/features/task/README.md)** — atomic units of work assigned to agents or people
- **[Source References](spec/features/source-references/README.md)** — traceable links from specs to code and back
- **[Repo Config](spec/features/repo-config/README.md)** — root configuration in `specscore.yaml` that ties a project together

---

## Role-Based Guides

SpecScore is designed for every role on a product team:

| Role | Guide |
|------|-------|
| Developers | [docs/for/developers.md](docs/for/developers.md) |
| Product Owners | [docs/for/product-owners.md](docs/for/product-owners.md) |
| QA Engineers | [docs/for/qas.md](docs/for/qas.md) |
| Business Analysts | [docs/for/business-analysts.md](docs/for/business-analysts.md) |
| Project Managers | [docs/for/project-managers.md](docs/for/project-managers.md) |
| Architects | [docs/for/architects.md](docs/for/architects.md) |

---

## Ecosystem

SpecScore is the foundation layer of a multi-tool stack:

| Tool | Role |
|------|------|
| **SpecScore** | Open specification format — the standard itself |
| **SpecStudio** | Authors SpecScore artifacts through guided AI skills in Claude Code |
| **Rehearse** | Validates and tests SpecScore specs automatically |
| **Synchestra** | Orchestrates multi-agent execution of SpecScore specs |

Use SpecScore standalone with any tool, or pair it with [SpecStudio](https://github.com/synchestra-io/specstudio-skills), [Rehearse](https://github.com/synchestra-io/rehearse), and [Synchestra](https://synchestra.io) for a full spec-driven development lifecycle.

See [docs/ecosystem.md](docs/ecosystem.md) for details.

---

## Open-Source SpecScore Projects

Projects that use SpecScore as their specification format:

| Project | Description |
|---------|-------------|
| [synchestra-io/specscore](https://github.com/synchestra-io/specscore) | This repository — the SpecScore format is itself specified using SpecScore (see [`spec/`](spec/README.md)) |
| [synchestra-io/spec-driven-todo-app](https://github.com/synchestra-io/spec-driven-todo-app) | A todo CLI specified end-to-end across all four SpecScore layers (Features, Requirements, Acceptance Criteria, Scenarios) |
| [synchestra-io/synchestra](https://github.com/synchestra-io/synchestra) | The Synchestra orchestrator, specified using SpecScore |
| [dal-go/dalgo](https://github.com/dal-go/dalgo) | _(planned)_ Go data access layer — SpecScore specification in progress |

Adding your project? Open a PR.

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) to get started.

---

## License

This repository's specification text and documentation are licensed under [CC BY 4.0](LICENSE). The CLI [`specscore-cli`](https://github.com/synchestra-io/specscore-cli) is licensed separately under Apache-2.0.

---

## History

The `specscore` CLI was extracted from this repository on 2026-04-22. Its source code, releases, and the `v0.x` release tags that were originally created here now live at [`synchestra-io/specscore-cli`](https://github.com/synchestra-io/specscore-cli). This repository's `v*` tags were removed at the same time, since they tagged CLI releases that no longer reside here. Engineering history (commits) for the extracted code is preserved in `specscore-cli` via `git filter-repo`.

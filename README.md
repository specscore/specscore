# SpecScore

**An open standard for AI-readable software specifications.**

SpecScore is a structured Markdown + YAML format for software specifications — features, requirements, acceptance criteria, plans, tasks — designed so an AI agent can read a spec and execute against it without losing information to ambiguity. Specs are plain files in `spec/`; lint runs in CI and in `pre-commit` hooks; status transitions are CLI-driven rather than hand-edited.

The format is portable by construction. Adopt SpecScore with any AI-coding tool, or none. Leave it any time — your specs come with you.

> [Read the specification](spec/README.md) · [specscore.md](https://specscore.md) · [Ecosystem](docs/ecosystem.md)

---

## Quickest start — for Claude Code users

The fastest way to write strongly-formatted, lintable specifications with an AI agent is **SpecStudio Skills** — our Claude Code plugin.

```
/plugin marketplace add specscore/ai-marketplace
/plugin install specstudio@specscore
```

Free forever, including for private repos. Source: [`specstudio-skills`](https://github.com/specscore/specstudio-skills) (MIT).

---

## CLI

The reference SpecScore CLI lives in [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli).

```bash
curl -fsSL https://specscore.md/install/get-cli | sh
```

```bash
specscore spec lint              # validate the current spec tree
specscore feature list           # list features
specscore feature show <slug>    # inspect a feature
specscore task list              # show the task board
specscore version                # full build identity
```

Full installation guide: [docs/installation.md](docs/installation.md).

---

## What SpecScore defines

A spec tree contains:

- **[Features](spec/features/feature/README.md)** — user-facing capabilities with requirements and acceptance criteria
- **[Requirements](spec/features/requirement/README.md)** — scoped, testable conditions that define done
- **[Acceptance Criteria](spec/features/acceptance-criteria/README.md)** — machine-readable conditions tied to features and tasks
- **[Plans](spec/features/plan/README.md)** — ordered sequences of tasks that bridge specs to implementation
- **[Tasks](spec/features/task/README.md)** — atomic units of work assigned to agents or people
- **[Source References](spec/features/source-references/README.md)** — traceable links from specs to code and back
- **[Repo Config](spec/features/repo-config/README.md)** — root configuration in `specscore.yaml` that ties a project together

The schema is published; every `specscore.yaml` carries `# SpecScore Repo Config Schema: https://specscore.md/repo-config` on line one as a self-identifying header.

---

## A short example

A SpecScore feature looks like this:

```markdown
# Feature: Password reset

## Requirements
- A user with a verified email address may request a password reset.
- The reset link expires 30 minutes after issuance.
- A reset link may only be used once.

## Acceptance criteria
- Given a user with a verified email,
  when they request a password reset,
  then a single-use link is delivered to that email within 60 seconds.
- Given an expired or used reset link,
  when the user clicks it,
  then they see a "link expired" page and are offered a new request.

## Out of scope
- Multi-factor recovery (covered in feature/mfa-recovery).
```

`specscore spec lint` enforces the structural conventions — AC IDs, transition validity, references that resolve.

---

## Ecosystem

| Tool | Role | Status |
|---|---|---|
| **SpecScore** | The open specification format — this repository | Standard |
| [SpecStudio Skills](https://github.com/specscore/specstudio-skills) *(repo: `specstudio-skills`)* | Opinionated SDD workflow Claude Code plugin — the entry gate for cold users | Live (MIT, free) |
| [SpecScore Studio](https://specscore.studio) | Hosted web UI for SpecScore — Stage 0 minimal viewer (view documents + spec graph, navigate) live 2026-05-20 | Stage 0 viewer |
| [Rehearse](https://github.com/specscore/rehearse) | Markdown-native test framework for SpecScore specs | Sibling, MIT |

See [docs/ecosystem.md](docs/ecosystem.md) for the full architecture.

---

## Used by

Projects and tools built on SpecScore:

- [**specscore-cli**](https://github.com/specscore/specscore-cli) — reference CLI: lint, query, and scaffold SpecScore specifications
- [**specstudio-skills**](https://github.com/specscore/specstudio-skills) — Claude Code plugin: opinionated SDD authoring workflow for SpecScore
- [**rehearse**](https://github.com/specscore/rehearse) — Markdown-native test framework that turns SpecScore specs into executable scenarios
- [**spec-driven-todo-app**](https://github.com/specscore/spec-driven-todo-app) — demo todo app specified end-to-end across all four SpecScore layers
- [**inGitDB**](https://github.com/ingitdb) — open-source Git-backed versioned database, specified with SpecScore
- [**dal-go/dalgo**](https://github.com/dal-go/dalgo) — *(planned)* Go data access layer, SpecScore specification in progress

Using SpecScore in your project? Open a PR.

---

## Role-based guides

| Role | Guide |
|---|---|
| Developers | [docs/for/developers.md](docs/for/developers.md) |
| Product owners | [docs/for/product-owners.md](docs/for/product-owners.md) |
| QA engineers | [docs/for/qas.md](docs/for/qas.md) |
| Business analysts | [docs/for/business-analysts.md](docs/for/business-analysts.md) |
| Project managers | [docs/for/project-managers.md](docs/for/project-managers.md) |
| Architects | [docs/for/architects.md](docs/for/architects.md) |
| AI agents | [docs/for/ai-agents.md](docs/for/ai-agents.md) |

---

## The `.md` is the format

SpecScore specifications are Markdown files. SpecScore lives at [`specscore.md`](https://specscore.md). The naming is deliberate.

---

## Read more

- [The SpecScore specification](spec/README.md)
- [Installation guide](docs/installation.md)
- [Ecosystem](docs/ecosystem.md)
- [Entities and properties](docs/entities-and-properties.md)
- [specscore.md/principles](https://specscore.md/principles) — the SpecScore worldview

---

## Support the project

Star us on GitHub — it helps others find the project.

[![Star on GitHub](https://img.shields.io/github/stars/specscore/specscore?style=social)](https://github.com/specscore/specscore)

---

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

This repository's specification text and documentation are licensed under [CC BY 4.0](LICENSE). The reference CLI [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli) is licensed separately under Apache-2.0.

---

## History

The `specscore` CLI was extracted from this repository on 2026-04-22. Its source code, releases, and the `v0.x` release tags that were originally created here now live at [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli) (migrated from `synchestra-io/specscore-cli` to the canonical `specscore` org per the [2026-05-18 umbrella ADR](https://github.com/synchestra-io/synchestra-marketing/blob/main/decisions/2026-05-18-rebrand-to-specscore-studio.md)). This repository's `v*` tags were removed at the same time, since they tagged CLI releases that no longer reside here. Engineering history (commits) for the extracted code is preserved in `specscore-cli` via `git filter-repo`.

---

## Outstanding questions

None at this time.

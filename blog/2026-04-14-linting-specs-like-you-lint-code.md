---
title: Linting Specs Like You Lint Code
description: How SpecScore's CLI catches structural problems in your specifications the same way ESLint catches bugs in your JavaScript.
date: 2026-04-14
---

# Linting Specs Like You Lint Code

You lint your code. You lint your CSS. You lint your commit messages. Why aren't you linting your specifications?

Specifications are the upstream input to everything an AI agent builds. If the spec is ambiguous, the output is unpredictable. If the spec has missing fields, the agent fills in blanks with assumptions. If the spec structure is inconsistent, every agent interaction starts with "what format is this in?"

SpecScore brings the same discipline to specifications that ESLint brought to JavaScript.

## What the Linter Catches

The `specscore spec lint` command validates your specification files against the SpecScore conventions:

```bash
$ specscore spec lint

features/apply-discount/README.md:0 [error] oq-section: Open Questions section not found
features/apply-discount/README.md:0 [error] index-entries: Child directory not listed in index: refunds
features/apply-discount/refunds:0 [error] readme-exists: README.md not found

3 violations found (3 errors)
```

Exit code 0 means the tree is clean; 1 means violations were found.

The linter checks for:

- **Structural completeness** — required fields, proper hierarchy, valid metadata
- **Referential integrity** — features, requirements, and acceptance criteria reference things that exist
- **Index consistency** — index tables list every artifact and match the files they point to
- **Consistency** — naming conventions, status lifecycle, and format conformance

Judging whether an acceptance criterion is vague is not a lint rule; that is what the AI review pass is for.

## Pluggable Rules

The linting engine is designed for extension. The core rules ship with SpecScore. Teams can add custom rules for their own conventions — naming patterns, required metadata fields, domain-specific validation.

## In Your Editor

The SpecScore LSP (coming soon) brings linting into your editor. Write a spec, see violations inline, fix them before you commit. The same feedback loop you have for code, applied to specifications.

## In CI/CD

Add `specscore spec lint` to your CI pipeline:

```yaml
# .github/workflows/specs.yml
- name: Lint specifications
  run: specscore spec lint
```

Specs that don't pass the linter don't get merged. The same gate you have for tests and code quality, applied to specifications.

## Try It

Builds the latest dev version from `main` (may be ahead of the most recent release):

```bash
go install github.com/specscore/specscore-cli/cmd/specscore@main
specscore spec lint
```

[Read the specification format](/specifications) to understand what the linter validates.

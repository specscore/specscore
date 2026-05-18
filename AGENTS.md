# SpecScore — AI Agent Rules

## Repository scope

This repository holds the SpecScore **specification format** and the public website. The reference `specscore` CLI was extracted to [`synchestra-io/specscore-cli`](https://github.com/synchestra-io/specscore-cli); changes to CLI code, linter rules, or Go packages belong there, not here.

## High-level layout

- `spec/` — technical source of truth for the SpecScore format (features, acceptance criteria, plans, project definition, source references). Linted via `specscore spec lint`.
- `docs/` — user-facing explanations and role-based guides under `docs/for/`.
- `blog/` — long-form articles published to the site.
- `tools/site-generator/` — Node.js (pnpm) static site builder for `https://specscore.md`.
- `public/` — generated site output checked in for Firebase Hosting.
- `.github/workflows/` — `dogfood.yml` (installs the released `specscore` binary and lints `spec/`); `site-ci.yml` (builds and deploys the site).

## Build, test, and lint commands

- `specscore spec lint` — lint the spec tree (matches CI in `dogfood.yml`).
- `pnpm test` (run inside `tools/site-generator/`) — site-generator unit tests.
- `pnpm build` (run inside `tools/site-generator/`) — produce `public/`.

The `specscore` CLI is installed via `curl -fsSL https://specscore.md/install/get-cli | sh` (legacy `/get-cli` 301-redirects to `/install/get-cli`); the dogfood workflow pins `SPECSCORE_VERSION` and uses the same install command.

## Directory structure

- Every directory MUST have a `README.md` file.
- Every `README.md` MUST have an "Outstanding Questions" section. If there are none, it explicitly states "None at this time."
- Every `README.md` that has child directories MUST include a brief summary for each immediate child.

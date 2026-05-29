# SpecScore — AI Agent Rules

## Repository scope

This repository holds the SpecScore **specification format** and the public website. The reference `specscore` CLI was extracted to [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli); changes to CLI code, linter rules, or Go packages belong there, not here.

## High-level layout

- `spec/` — technical source of truth for the SpecScore format (features, acceptance criteria, plans, project definition, source references). Linted via `specscore spec lint`.
- `docs/` — user-facing explanations and role-based guides under `docs/for/`.
- `blog/` — long-form articles published to the site.
- `tools/site-generator/` — Node.js (pnpm) static site builder for `https://specscore.md`.
- `public/` — generated site output (gitignored build artifact); Cloudflare Pages rebuilds it from sources on deploy.
- `.github/workflows/` — `dogfood.yml` (installs the released `specscore` binary and lints `spec/`); `site-ci.yml` (builds and deploys the site).

## Build, test, and lint commands

- `specscore spec lint` — lint the spec tree (matches CI in `dogfood.yml`).
- `pnpm test` (run inside `tools/site-generator/`) — site-generator unit tests.
- `pnpm build` (run inside `tools/site-generator/`) — produce `public/`.

The `specscore` CLI is installed via `curl -fsSL https://specscore.md/install/get-cli | sh` (legacy `/get-cli` 301-redirects to `/install/get-cli`); the dogfood workflow pins `SPECSCORE_VERSION` and uses the same install command.

## Directory structure

- Every directory MUST have a `README.md` file.
- Every `README.md` MUST have an "Open Questions" section. If there are none, it explicitly states "None at this time."
- Every `README.md` that has child directories MUST include a brief summary for each immediate child.

## CI: keep `SPECSCORE_VERSION` in lockstep with the convention

`.github/workflows/dogfood.yml` pins `SPECSCORE_VERSION` to a specific released CLI tag (e.g. `v0.4.0`). When a convention change ships in a new CLI release — a renamed section heading, a tightened rule, a new lint check — the dogfood pin MUST be bumped in the SAME PR that touches the affected spec files, or the next CI run will install the old CLI and either silently use the old convention or fail loudly on new artifacts the old CLI does not understand.

The `dogfood-version-bump` lint rule (severity: `warning`, no autofix) surfaces this drift: when `specscore spec lint` runs with a binary newer than the pinned version, it emits a warning naming both versions. The check is skipped silently when the running binary is a dev build (`version == "dev"`) or when the pin uses a non-semver expression (`latest`, `main`, `${{ inputs.* }}`) — those are intentional overrides. Because the rule is warning-level, the default `specscore spec lint` (which filters at error severity) does NOT surface it; run with `--severity warning` to see it during development, or treat the rule as a documentation pointer at the right time.

Bumping the pin is a deliberate, PR-gated action — the convention comment in `dogfood.yml` (`# bump intentionally via PR`) and the absence of `--fix` for this rule both reinforce that. There is no autofix.

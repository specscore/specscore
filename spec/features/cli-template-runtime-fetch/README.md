# Feature: CLI Template Runtime-Fetch

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/cli-template-runtime-fetch?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/cli-template-runtime-fetch?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/cli-template-runtime-fetch?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/cli-template-runtime-fetch?op=request-change) |
**Status:** Approved
**Source Ideas:** new-artefact-templates
**Grade:** B

## Summary

The `specscore … new` scaffolders fetch the canonical artefact template from the published gallery (`specscore.md/new/<type>.md`) at create-time, fill the known fields (title, date, owner), and write the file — falling back to an embedded copy with a stderr warning when the site is unreachable. This makes the published gallery the live source of truth for templates, so fixes ship via the website without a CLI release, while preserving today's offline-capable UX.

## Problem

Templates ship embedded in the CLI binary, so fixing a skeleton requires a CLI release and users on older binaries get stale templates. The [New-Artefact Template Gallery](../new-artefact-template-gallery/README.md) now publishes the canonical templates at `/new/<type>.md`; this Feature makes the CLI consume them at runtime, demoting the embedded copy to an offline fallback.

## Behavior

### Template resolution

#### REQ: fetch-at-create-time

Each `specscore <type> new` verb — `idea`, `feature`, `decision`, `issue`, `proposal` — MUST, for a **bare** scaffold (no authored content supplied via flags, non-interactive), attempt to fetch the canonical template for that type from the published gallery before writing the new file. A scaffold that carries authored content (e.g. `--hmw`, `--description`, `--tags`, `--severity`) uses the embedded scaffolder instead — the static gallery template cannot carry per-invocation content — and performs no fetch.

#### REQ: url-mapping

The CLI MUST resolve a type's template URL as `<base>/new/<type>.md`. The base MUST default to `https://specscore.md` and MAY be overridden via the `SPECSCORE_TEMPLATE_BASE_URL` environment variable (for testing and self-hosted mirrors).

#### REQ: field-substitution

After obtaining the template (from network or fallback), the CLI MUST fill the same fields it fills today — artefact title (from `--title`, else the title-cased slug), date (current date), and owner (`--owner`, else `$USER`) — by replacing the template's canonical placeholder tokens, producing a file equivalent to the legacy embedded-scaffold output. Substitution operates on the same tokens regardless of whether the template came from the network or the embedded copy.

### Offline fallback

#### REQ: embedded-fallback

The CLI MUST retain an embedded copy of each template and use it whenever the fetch fails for any reason — network error, timeout, or non-200 response. Artefact creation MUST succeed in every offline case.

#### REQ: bounded-timeout

The fetch MUST apply a bounded timeout (default 3 seconds), after which the CLI abandons the network and uses the embedded fallback, so a slow or unreachable site never blocks artefact creation beyond that bound.

#### REQ: fallback-notice

When the CLI falls back to the embedded template, it MUST print a one-line warning to stderr (e.g. `warning: specscore.md unreachable, used built-in template`) and still exit zero with the file created. The warning MUST NOT be printed when the fetch succeeds.

### Parity

#### REQ: scaffold-parity

For identical inputs, both the fetch path and the embedded-fallback path MUST produce a **lint-clean** artefact of the correct type with the **same metadata fields filled** (title, date, owner). The two are NOT required to be byte-identical: the gallery template and the embedded scaffolder are independently maintained (the thin-wrapper design), so section-body wording may differ. Enabling runtime-fetch therefore never yields an invalid artefact, even if the two sources have drifted.

## Acceptance Criteria

### AC: fetches-published-template (verifies REQ:fetch-at-create-time)

**Given** the gallery base URL points at a reachable server
**When** the user runs `specscore idea new my-idea`
**Then** the CLI issues a GET for `<base>/new/idea.md` before writing the file.

### AC: maps-type-to-url (verifies REQ:url-mapping)

**Given** `SPECSCORE_TEMPLATE_BASE_URL` is set to a test server
**When** the user runs `specscore feature new --title X --slug y`
**Then** the CLI requests `<base>/new/feature.md`.

### AC: fills-known-fields (verifies REQ:field-substitution)

**Given** a fetched idea template containing the placeholders `<Idea Name>`, `YYYY-MM-DD`, and `<your-handle>`
**When** the user runs `specscore idea new my-idea --owner alex`
**Then** the created file's title is `My Idea`, its Date is the current date, and its Owner is `alex`.

### AC: falls-back-when-offline (verifies REQ:embedded-fallback)

**Given** the gallery base URL is unreachable
**When** the user runs `specscore idea new my-idea`
**Then** the CLI creates the file from the embedded template and exits zero.

### AC: timeout-bounds-the-wait (verifies REQ:bounded-timeout)

**Given** a gallery base URL that accepts the connection but never responds
**When** the user runs `specscore idea new my-idea`
**Then** the CLI abandons the fetch within ~3 seconds and uses the embedded fallback.

### AC: warns-on-fallback (verifies REQ:fallback-notice)

**Given** the gallery is unreachable
**When** the user runs `specscore idea new my-idea`
**Then** a one-line warning is printed to stderr and the command exits zero with the file created.

### AC: fetch-and-fallback-parity (verifies REQ:scaffold-parity)

**Given** the gallery serves the bare idea template
**When** a file is created once with the gallery reachable and once unreachable, for identical inputs
**Then** both created files are lint-clean Ideas with the same Title, Date, and Owner (section-body wording may differ).

## Rehearse Integration

These ACs are testable against the CLI with a local test HTTP server (or an unroutable base URL for the offline cases) and have Rehearse stubs under `_tests/`:

- `fetch-at-create-time-fetches-published-template.md`
- `embedded-fallback-falls-back-when-offline.md`
- `fallback-notice-warns-on-fallback.md`
- `scaffold-parity-fetch-and-fallback-parity.md`

`maps-type-to-url`, `fills-known-fields`, and `timeout-bounds-the-wait` reuse the same test-server harness and are covered by assertions there rather than separate stubs.

## Dependencies

- [new-artefact-template-gallery](../new-artefact-template-gallery/README.md) — publishes the `/new/<type>.md` templates this Feature fetches. Its placeholder tokens are the substitution anchors for REQ:field-substitution: the shared `YYYY-MM-DD` (date) and `<your-handle>` (owner) tokens, plus each type's title token, which is that gallery page's H1 placeholder (e.g. `<Idea Name>` in `new/idea.md`, `<Feature Name>` in `new/feature.md`).

## Not Doing / Out of Scope

- **Template versioning / pinning** — reconciling a newer published template against an older CLI's lint rules is deferred (inherited from the source Idea).
- **Persistent caching** — the MVP fetches on each invocation; no on-disk template cache.
- **Build-time auto-sync of the embedded fallback** — the embedded copy is maintained manually (the Idea's accepted trade-off); a CI parity check is a candidate follow-up, not part of this Feature.
- **`plan` fetch wiring** — there is no `specscore plan new` verb, so `plan` is intentionally absent from REQ:fetch-at-create-time's verb list. Fetch is wired per-type only where a `… new` verb exists; the published `/new/plan.md` template remains copy-paste-only until such a verb is added.
- **`task` fetch wiring** — `task new` writes a *board-managed* entry (`tasks/<slug>/README.md` plus a row in `tasks/README.md`) rendered from a struct, not a free-form artefact template. Runtime-fetch does not fit that shape, so `task` keeps its current rendering and is excluded from the fetch verbs. The published `/new/task.md` remains copy-paste-only.
- **Template content** — owned by `new-artefact-template-gallery`; this Feature only consumes templates.
- **"Template updated" notifications** — surfacing when a fetched template differs from the embedded copy is out of scope.

## Assumption Carryover

From the source Idea `new-artefact-templates`:

- **Validated by this Feature** — the Idea's Must-be-true "a create-time network fetch is acceptable given an embedded offline fallback" is realized by REQ:embedded-fallback + REQ:bounded-timeout + REQ:fallback-notice.
- **Dissolved upstream** — the Idea's "extraction contract" Must-be-true was eliminated in Feature A (templates are published raw), so this Feature fetches a file with no parsing.
- **Dependency satisfied** — the Idea named the published `/new/<type>.md` gallery as a prerequisite; it now exists (Feature A, on `main`).

## Open Questions

- **Embedded-fallback drift:** how and when is the embedded copy reconciled with the published template? (Manual for the MVP; a CI parity check is the likely follow-up.)
- Should the 3-second timeout be user-configurable (flag or env), or is a fixed bound sufficient?
- Should a successful fetch whose content differs from the embedded copy notify the user that a newer template was used? (Out of scope for the MVP.)

---
*This document follows the https://specscore.md/feature-specification*

# Idea: Studio Toolbar

**Status:** Implementing
**Date:** 2026-05-19
**Owner:** alex
**Promotes To:** studio-toolbar
**Supersedes:** —
**Related Ideas:** —

## Problem Statement

How might we replace the single "View in SpecStudio" link in artifacts with a fixed toolbar of canonical actions (Explore, Edit, Ask question, Request change) — and migrate the studio host and URL scheme — while keeping lint a deterministic byte-level check?

## Context

Today every feature README emits a single `> [View in SpecStudio](url) — graph, discussions, approvals` line, configured by the `viewer:` block in `specscore.yaml`. The link conveys only one action ("view"), the trailing annotation is text-only and not clickable, and the host plus URL scheme are effectively hardcoded. Users want richer affordances (explore, edit, ask a question, request a change) surfaced as actual links. Independently, the studio is moving to the `specscore.studio` domain with a path-style URL scheme that mirrors the source-references URL grammar. Because the toolbar's verbs (Edit, Ask, Request change) are intrinsically studio-specific — not generic "viewer" concepts — the yaml block is renamed `viewer:` → `studio:` in the same migration.

## Recommended Direction

Rename the `viewer:` yaml block to `studio:` (preserving the `name` and `url` field names inside it) and replace the single rendered link with a fixed toolbar prefixed by the studio name. The toolbar items are NOT configurable in v1; only the host (via `studio.url`), the display name (`studio.name`), and the all-or-nothing opt-out (`studio: null`) remain configurable. Each toolbar item links to `specscore.studio` under a path-style URL with the action passed as `?op=<verb>`. Lint validates the toolbar shape byte-for-byte against the project's `studio` config.

The rendered line on a feature README becomes:

```markdown
> [SpecScore.**Studio**](https://specscore.studio/): | [Explore](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features/repo-config?op=explore) | [Edit](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features/repo-config?op=edit) | [Ask question](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features/repo-config?op=ask) | [Request change](https://specscore.studio/app/p/github.com/specscore/specscore/spec/features/repo-config?op=request-change) |
```

The brand attribution prefix is itself a link to `{studio.url}` (clickable brand → studio home). The renderer bolds the segment of `studio.name` that follows the last `.` — for the default brand `"SpecScore.Studio"`, this yields `SpecScore.**Studio**` inside the hyperlink, visually anchoring the product portion within the family/product hierarchy. The whole brand stays clickable; only the styling is split. (If `studio.name` contains no `.`, the entire name renders plain inside the link with no bold emphasis.)

The path grammar for each toolbar item is `{studio.url}/app/p/{host}/{org}/{repo}/{artifact_path}?op={verb}`. The verb set is closed: `explore`, `edit`, `ask`, `request-change`. The naked artifact URL (no `?op=` query parameter) routes to the same view as `?op=explore` — `explore` is the implicit default action.

Defaults when `studio:` is omitted from `specscore.yaml`: `studio.name = "SpecScore.Studio"`, `studio.url = "https://specscore.studio/"`. When `studio: null`, no toolbar renders. When `studio:` is an explicit mapping, both `name` and `url` are required.

The toolbar is **file-scoped** in v1: exactly one toolbar per artifact, rendered at the top of the file (above the title's existing position, in the same blockquote slot the single "View in" line occupies today). All four verbs (`explore`, `edit`, `ask`, `request-change`) operate at file scope — clicking `Ask question` or `Request change` opens a studio form that asks "about this feature" by default; the studio UI handles per-REQ or per-section anchoring interactively if the user wants it. Per-section or per-REQ toolbars, and URL scope tokens like `&req=` or `&section=`, are explicitly deferred. If real usage data later shows enough pain, a separate Feature can introduce them — they are not in scope for this Idea.

The `/app/` prefix isolates PWA routes from marketing and docs surfaces (`/`, `/terms`, `/pricing`, `/docs`, `/blog`, `/login`) which live at the studio root. The `/p/` segment inside `/app/` is namespace headroom — future studio routes like `/app/settings`, `/app/inbox`, or `/app/u/{username}` can be added without ambiguity against project paths. The studio runs as a single origin (no `app.` subdomain) — one cookie scope, one CSP, one TLS cert; the brand surface stays unified at `specscore.studio`. As a downstream benefit, ranking signals (inbound links, engagement, internal-link equity) consolidate on a single apex rather than splitting between marketing and app subdomains, modestly strengthening marketing-page SEO.

## Alternatives Considered

1. **Single configurable link with a free-form `text:` template** (the original proposal). Lost because lint must then become a template renderer: any drift in an artifact line is either silently accepted (lint goes lax) or rigidly rejected on stray whitespace (lint goes brittle). Round-trip equality dies.
2. **Toolbar with per-item configurability** (label / url / visibility per action). Lost because it multiplies the config surface roughly 4× and reintroduces the lint-renderer problem from option 1. The marginal benefit over a fixed toolbar is small — projects almost never want a *different* set of actions.
3. **Keep the single link, do the domain and URL-scheme migration only.** Lost because the action-richness (Explore / Edit / Ask / Request change) is the actual motivation; without it this becomes a cosmetic host change.

## MVP Scope

Update (a) the `specscore.yaml` schema in the `repo-config` Feature to rename the top-level block `viewer:` → `studio:` (field names `name` and `url` unchanged), (b) the rendered output in feature READMEs and any other artifact that today emits a view link, (c) the `view-link` lint rule (renamed to `studio-toolbar`) to enforce the new toolbar shape, and (d) the default `studio.url` from `https://specstudio.synchestra.io/` to `https://specscore.studio/`. Ship all four toolbar items together — studio commits to support `?op=explore|edit|ask|request-change` at v1.

SpecScore is pre-v1 and has no external users, so the `viewer:` → `studio:` schema change is a hard break with no backcompat: old `viewer:` blocks become a hard lint error from day one. The handful of internal `specscore.yaml` files are hand-edited in the same commit that ships the rename. Future post-v1 schema changes will require a proper deprecation window; this one does not.

Artifact line rewrites (every feature README's old `> [View in SpecStudio](url) — graph, discussions, approvals` line → new toolbar line) flow through `specscore spec lint --fix` as a normal autofix, inheriting the capability that the existing `view-link` checker already exposes. No separate migration command; the new `studio-toolbar` rule emits the toolbar form, old lines are non-conforming, `--fix` rewrites them to the canonical shape.

## Not Doing (and Why)

- Per-item visibility toggles — `studio: null` is enough for v1; per-action toggles multiply config surface without earning their keep
- Free-form text templates for link rendering — would force lint to become a template renderer and lose deterministic byte-level validation
- Branch or tag suffix in URLs (the `[@{branch|tag}]` from the original proposal) — no clear source of truth at lint time; CI on detached SHAs has no answer
- Renaming the inner field names (`studio.name`, `studio.url`) — only the top-level block is renamed; inner fields stay the same to minimize migration churn
- Any backward-compatibility for `viewer:` blocks — SpecScore is pre-v1 with no external users; the rename is a clean break, old `viewer:` is a hard error from day one
- Reserved-words approach at the studio root (e.g., serving project URLs as `specscore.studio/{host}/...`) — the `/app/` prefix isolates PWA routes from marketing pages without requiring an ongoing reserved-words list
- Running the studio app on a subdomain like `app.specscore.studio` — the brand reads better with one origin (`specscore.studio/app/...`), and a single origin keeps cookies, CSP, TLS, and CDN config simple
- Per-section or per-REQ toolbars, and URL scope tokens (`&req=`, `&section=`) — v1 is single toolbar at file top; finer-grained scoping is a separate Feature gated on real usage data
- UTM parameters on toolbar URLs (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`) — duplicative of data already available from `op` + path + HTTP Referer; would add ~90 bytes per link (~450 bytes per artifact, ~45KB per 100-feature repo committed to git); leaks attribution tokens into copy-pasted URLs. Server-side analytics can synthesize equivalent grouping from the request triple without polluting URLs.

## Key Assumptions to Validate

| Tier | Assumption | How to validate |
|------|------------|-----------------|
| Must-be-true | The specscore.studio web app actually supports the four actions (`?op=explore`, `?op=edit`, `?op=ask`, `?op=request-change`) at the proposed path-style URLs by the time this Idea is promoted to a Feature. | Confirm with the studio team that these endpoints exist or are committed for the release this Feature targets. Block the Feature on studio readiness. |
| Must-be-true | Existing artifact lines (every feature README's old single-link line) can be rewritten by `specscore spec lint --fix` to the new toolbar shape without manual edits. The handful of internal `specscore.yaml` files are hand-edited; no CLI migration needed there since there are no external users. | Prototype the new `studio-toolbar` autofix over this repo's spec tree and verify the diff is mechanical and round-trip-stable. Confirm the count of `specscore.yaml` files needing hand-edit is small (≤10 across the workspace). |
| Should-be-true | Users prefer a four-item toolbar to a single labeled link; the visual chrome above each artifact title is acceptable at scale (hundreds of READMEs in a large repo). | Render the toolbar above 5–10 representative existing features in this repo; review with maintainers; check it survives narrow markdown viewers (GitHub mobile, terminal renderers). |
| Should-be-true | `?op=<verb>` is a stable contract; studio routing will not later require a different query key or path segment for action dispatch. | Confirm the URL contract is owned by SpecScore (this Idea), not the studio implementation. Document `?op=` in the repo-config Feature as the canonical scheme. |
| Might-be-true | The `\|` separator survives all common markdown renderers (GitHub, GitLab, in-IDE preview) without being mistaken for table syntax inside a blockquote one-liner. | Spot-check rendering in GitHub, GitLab, VS Code preview, and the specstudio renderer itself before locking the byte-level lint contract. |


## SpecScore Integration

- **New Features this would create:** Likely a single new Feature (working title "studio-toolbar") that defines the toolbar shape, the `?op=<verb>` URL grammar, and the new `studio-toolbar` lint rule.
- **Existing Features affected:** `repo-config` — top-level block rename `viewer:` → `studio:`, default `studio.url` flips to `https://specscore.studio/`, REQs `viewer-default-when-omitted` / `viewer-explicit-values` / `viewer-null-opts-out` / `viewer-link-mandatory-unless-opted-out` all renamed and rescoped to the toolbar; `feature` — the README rendering convention currently producing the single "View in" line; `source-references` — URL-scheme alignment, both should use the same `/app/p/{host}/{org}/{repo}/...` grammar.
- **Dependencies:** specstudio web app must accept the new path-style URLs with `?op=<verb>` before the Feature ships; existing `specscore.yaml` files and existing artifact lines must be migrated via a single CLI codegen pass in the same release.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/idea-specification*

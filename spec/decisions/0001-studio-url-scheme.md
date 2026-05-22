# Decision: SpecScore Studio Deep-Link URL Scheme

**Status:** Accepted
**Date:** 2026-05-22
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** url, studio, contract, branding, security
**Source Idea:** —
**Supersedes:** —
**Superseded By:** —

## Context

SpecScore artifacts (Markdown files in `spec/`) deep-link into SpecScore Studio (`specscore.studio`, an Angular SPA, no SSR). The URLs are written into committed spec files by humans, the `specscore` CLI, and AI agents, then read in PR descriptions, IDEs, chat unfurls, and search results. Whatever shape ships becomes contract: changing it later requires rewriting every spec file in every consumer repo.

Today there is drift:

- **`specscore` repo spec/docs reference:** `https://specscore.studio/app/p/{git_host}/{org}/{repo}/{path}` (with optional `?op=explore|edit|ask|request-change`).
- **`specscore-studio-app` code implements:** `https://specscore.studio/project?id={repo}@{org}@{git_host}` — reverse order, `@`-chain, no `{path}` support.
- **`specscore-studio-app` own spec for `project-page`** says id should be slash-delimited `github.com/owner/repo`. So even within studio-app, code and spec disagree.

Constraints surfaced during review:

- The PWA must be served under a path prefix (`/app/`) so its service worker scope does not claim the apex marketing site (Astro, under `tools/landing/`).
- URLs end up committed to repos on every branch, so a URL that hard-codes `?ref=main` will be wrong when read on a `feature/x` branch.
- `{git_host}` is attacker-controllable input — any spec author can write a URL pointing at an arbitrary host segment.
- Studio is SPA with no SSR; deep-link pages are typically gated content (private repos), so SEO is not a meaningful goal for these URLs. Shareability, unfurl quality, and link permanence are.

This decision was reviewed by four sub-agents acting as VP Marketing, Software Architect, Security Engineer, and Developer Advocate. Their analyses converged on the scheme below.

## Decision

SpecScore Studio adopts the following deep-link URL scheme:

**Default canonical (works for any accessible repo, no registration):**

```text
https://specscore.studio/app/project/{git_host}/{org}/{repo}/{path}[?ref={branch|tag|sha}][&op={operation}]
```

**Handle canonical (opt-in, paid; reserves a stable identifier):**

```text
https://specscore.studio/app/project/~{handle}/{project-slug}/{path}[?ref=...][&op=...]
```

**Legacy redirect (one-time migration):**

```text
https://specscore.studio/project?id={repo}@{org}@{git_host}
  → 302 → canonical default form (path inferred as project root)
```

Rules:

1. **Segments are positional:** `{git_host}` → `{org}` → `{repo}` → `{path}`. Repo names cannot contain `/` on any major forge, so the boundary between `{repo}` and `{path}` is unambiguous (segment 3 vs. segments 4+).
2. **The `~` sigil distinguishes a handle from a host.** Handles MUST NOT contain `.`; this guarantees they can never collide with a real `{git_host}` segment.
3. **Ref is a query parameter, never a path segment.** Branch names contain `/` and would otherwise be ambiguous with `{path}`. URLs written to spec files MUST omit `?ref=`; explicit `?ref=` is for CLI-pinned shares only.
4. **Studio infers ref client-side from `document.referrer`** when a known forge URL is present, then `history.replaceState`s the resolved URL. Fallback: HEAD of default branch.
5. **`?op=` is reserved for Studio operations** (`explore`, `edit`, `ask`, `request-change`, future verbs). It is orthogonal to ref.
6. **`/app/` is retained.** It is required for PWA service-worker scoping and signals "dynamic application" rather than "static rendering."
7. **`{git_host}` is allow-listed.** Studio resolves only allow-listed forge hosts (`github.com`, `gitlab.com`, `bitbucket.org`, `codeberg.org`, …). Unknown hosts render a dedicated "Unsupported source" page — never the normal project chrome.
8. **Both URL shapes (path-default and handle) are first-class.** Neither redirects to the other. The CLI emits handle-shape when `studio.handle` is set in `specscore.yaml`; otherwise it emits path-shape. Both resolve correctly forever.

## Rationale

**Path-based, conventional order** is the readable, shareable shape. It matches how every developer reads repo coordinates (host → org → repo). The URL itself documents what it points to when pasted into PRs, Slack, or IDE markdown previews — that is the real value (not SEO, which is a non-goal here).

**Repos cannot contain `/`** on any major forge, so no `/blob/{ref}/`-style sentinel is needed to disambiguate `{repo}` from `{path}`. Importing the GitHub/GitLab sentinel would solve a problem that does not exist in this URL space.

**Ref-as-query-param** keeps the URL short for the common case (default branch) and side-steps ref-vs-path ambiguity entirely. It also enables the client-side Referer-based ref inference: URLs in repo files stay branch-agnostic, but readers viewing a non-default branch on a known forge land on the right snapshot anyway.

**`/app/` is non-negotiable** because of PWA service-worker scope. Marketing aesthetics ("`/app/` reads cheap") did not survive contact with this constraint. The prefix also signals dynamism, which is on-brand.

**`~{handle}` as a sigil** unifies the route grammar — one `/app/project/<thing>` namespace — instead of fragmenting into `/app/project/...` and `/app/p/...`. It disambiguates handle from host in O(1) without a registry lookup and is forge-style familiar (Unix home dirs, academic homepages).

**Freemium framing** for handles (path-shape free, handle-shape paid) is honest: the free tier is fully functional; the paid tier sells link permanence and brevity for orgs that publish many long-lived links. Comparable products price similar features at $4–$10 per org per month.

**Security controls** (host allow-list, IDNA normalization, path-traversal rejection, `Referrer-Policy: strict-origin`, no upstream host templating) are mandatory regardless of URL shape. They are listed in [Consequences at Decision Time](#consequences-at-decision-time) as implementation prerequisites.

## Declined Alternatives

### Query-parameter id with `@`-chain (current studio-app implementation)

`https://specscore.studio/project?id={repo}@{org}@{git_host}`. Rejected for three reasons: `@` is a reserved character that Slack/GitHub/Markdown auto-linkers truncate or treat as a user mention, breaking links in the most common sharing surfaces; `repo@org@host` is leaf-first, which no human reads naturally; and `?id=` reads as an internal database key, eroding the perception of the product as a polished surface. The current implementation will be migrated and retained as a 302 source.

### Hash routes (`#path/...` or `#id=...`)

Fragments never reach the server. They are invisible to access logs, analytics, OpenGraph/Twitter card scrapers, Slack/Discord unfurls, and CDNs. For a product whose value proposition is shareable spec links, that is disqualifying. The "we have no SSR so we must use hashes" framing was rejected: SPA fallback on a path route is one rewrite rule on every modern host (Firebase Hosting, Netlify, Vercel, Cloudflare Pages).

### `/-/blob/{ref}/` sentinel (GitLab-style)

Proposed initially to disambiguate `{ref}` from `{path}`. Once `{ref}` was moved to a query parameter, the only remaining ambiguity (`{repo}` vs. `{path}`) was already resolved by the single-segment repo-name constraint. The sentinel added visual clutter (`/-/blob/HEAD/` per URL) without solving a real problem in this URL space. Rejected as cargo-culted convention.

### Dropping `/app/` prefix

Recommended on aesthetic grounds during marketing review. Rejected when the PWA service-worker scope constraint surfaced: a service worker registered at the apex would claim the marketing site under the same origin. `/app/` is the cleanest path-level isolation. A subdomain (`app.specscore.studio`) would also work but requires DNS, deploy, OAuth-callback, and CORS changes — not worth doing for URL aesthetics alone.

### Stable opaque IDs as primary canonical (`/app/f/01HQXY3K8N`)

Proposed by the Developer Advocate review as the long-term answer to spec-file path rot. Rejected as the *primary* canonical because it forces a registry/resolver in Studio (centralizing a piece of what is otherwise a git-native product), is unreadable in PRs and grep output, and creates a bootstrapping problem (most existing artifacts have no ID). Retained as a future option: the `~{handle}` shape covers the most common stability need (repo renames and org moves) without requiring per-artifact IDs. Per-feature stable IDs can be added later without breaking this scheme.

### Per-segment query parameters

`https://specscore.studio/app/project?host=github.com&org=acme&repo=widgets&path=...`. Rejected at framing time: too verbose, harder to read, and breaks the "URL coordinates read like git coordinates" property that makes path-shape work for humans.

## Consequences at Decision Time

**Positive (expected):**

- URLs in spec files become readable and shareable; pasted-in-PR URLs document what they point to.
- Spec authors and AI agents emit branch-agnostic URLs; readers on non-default branches still land on the correct snapshot when coming from a recognized forge.
- The `~{handle}` shape opens a clean monetization surface (link permanence + brevity) without crippling the free tier.
- Single URL grammar in the CLI: one builder function, swap segment 2 between `{git_host}` and `~{handle}`.
- One-time migration unblocks studio-app to match the documented contract.

**Negative / cost (expected):**

- One-time migration: studio-app must add the canonical route, retain the legacy `/project?id=...` route as a 302 source, and update its own `project-page` feature spec to match. CLI references to `/app/p/...` (current short form in existing spec files) must be updated to `/app/project/...` or `/app/p/` must be retained as an alias — pick one before merging.
- Studio must ship the security controls before public launch: forge-host allow-list with IDNA normalization, path-validation pipeline (decode-once → NFC → reject `..`/`%00`/encoded slashes), `Referrer-Policy: strict-origin` site-wide, and a hardcoded forge-API base mapped from the allow-list (never templated from the URL).
- CDN cache key must include query string for `/app/project/*` so `?ref=` and `?op=` produce distinct cache entries. One configuration line per host.
- Client-side Referer inference is a polish feature; the first launch should ship with HEAD-only resolution and add forge-specific Referer parsers as a follow-up. Each forge parser carries its own test surface (renames, forks, foreign refs).
- Handle-reservation infrastructure (ownership verification via `.well-known/specscore-handle.txt`, squatting policy, payment integration, downgrade behavior when subscription lapses) is net-new product surface. None of it ships with v1 of this URL scheme; the route shape simply reserves the slot.

**Risks accepted:**

- **`/app/p/` vs `/app/project/` open detail.** Spec files currently emit `/app/p/`. This decision adopts `/app/project/` as canonical. The migration story (rewrite, alias, or both) is delegated to the implementing feature spec; this decision does not resolve it.
- **Branch-name leak via Referer.** When a reader on a non-default branch follows a link to Studio, the branch name reaches Studio in the Referer header. Acceptable: the org/repo names are already in the destination URL, and a one-line privacy-policy note covers it.
- **Path rot on file moves.** A URL pointing at `spec/features/login.md` does not survive renaming the file to `spec/features/authentication.md`. Mitigation is left to authors (rewrite URLs at rename time, or use `git mv` plus a CLI helper) and to a possible future per-feature stable-ID layer; the URL scheme itself does not solve it.

## Observed Consequences

None observed yet.

## Affected Features

None at this time.

---

*This document follows the https://specscore.md/decision-specification*

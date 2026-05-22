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
- **(Surfaced during same-day implementation, see [Amendment Notes](#amendment-notes))** Studio's own application surface (left-nav menu items like Features / Plans / Architecture / Tests) needed a way to scope navigation to the current project without colliding with the canonical `{git_host}` namespace.

This decision was initially reviewed by four sub-agents acting as VP Marketing, Software Architect, Security Engineer, and Developer Advocate. Their analyses converged on an early version of the scheme. That version was implemented in `specscore-studio-app` the same day, which surfaced a routing-collision problem that drove a same-day amendment — see [Amendment Notes](#amendment-notes) for the full timeline.

## Decision

SpecScore Studio adopts the following deep-link URL scheme:

**Default canonical (works for any accessible repo, no registration):**

```text
https://specscore.studio/app/{git_host}/{org}/{repo}[/{path}][?ref={branch|tag|sha}][&op={operation}][#page={view}]
```

Examples:

```text
https://specscore.studio/app/github.com/specscore/specscore-cli
https://specscore.studio/app/github.com/specscore/specscore/spec/features/decision/README.md
https://specscore.studio/app/github.com/acme/widgets/spec/features?ref=feature/x&op=explore#page=features
```

**Handle canonical (reserved shape, resolver out of scope):**

```text
https://specscore.studio/app/~{handle}[/{path}]
```

The `~{handle}` route shape is reserved for a future handle-namespace feature. No resolver ships in MVP; URLs hitting this shape render a placeholder. See [Declined Alternatives](#declined-alternatives) for why slug suffix was dropped from the earlier draft.

Rules:

1. **First segment after `/app/` is the dispatch key.**
   - Contains `.` → canonical forge URL → segments are positional: `{git_host}` → `{org}` → `{repo}` → `{path}`.
   - Starts with `~` → handle namespace (route shape reserved; resolver deferred).
   - Otherwise → app-route literal (`landing`, `auth`, `settings`, future Studio pages).

2. **The dot-vs-no-dot distinguisher eliminates the `/project/` namespace.** Forge hosts always contain `.` (github.com, gitlab.com, bitbucket.org, codeberg.org). App-route literals MUST NOT contain `.`. This is a forever constraint on both sides.

3. **Repo names cannot contain `/`** on any major forge, so the boundary between `{repo}` and `{path}` remains unambiguous (segment 3 vs. segments 4+).

4. **Ref is a query parameter, never a path segment.** Branch names contain `/` and would otherwise be ambiguous with `{path}`. URLs written to spec files MUST omit `?ref=`; explicit `?ref=` is for CLI-pinned shares only.

5. **Studio infers ref client-side from `document.referrer`** when a known forge URL is present, then `history.replaceState`s the resolved URL. Fallback: HEAD of default branch.

6. **`?op=` is reserved for Studio operations** (`explore`, `edit`, `ask`, `request-change`, future verbs). It is orthogonal to ref.

7. **`#page=` is reserved for in-page view state on directory URLs** (`features`, `plans`, `architecture`, `tests`, future views). Hash routes are client-only and never participate in CDN cache keys or server logs — which is correct for view state (cf. GitHub's `#L42` line-highlight pattern). `#page=` MUST NOT appear on file URLs; `#tab=…` is reserved for future file-view state. **The `?op=` and `#page=` value sets are disjoint**: the verb set (`explore`, `edit`, `ask`, `request-change`, …) and the view set (`features`, `plans`, `architecture`, `tests`, …) MUST NOT share any value. `?op=features` and `#page=edit` are both invalid by construction. Lint MUST enforce this — `?op=` accepts only the verb set, `#page=` accepts only the view set.

8. **`/app/` is retained.** It is required for PWA service-worker scoping and signals "dynamic application" rather than "static rendering."

9. **`{git_host}` is allow-listed.** Studio resolves only allow-listed forge hosts (`github.com`, `gitlab.com`, `bitbucket.org`, `codeberg.org`, …). Unknown hosts render a dedicated "Unsupported source" page — never the normal project chrome.

10. **No legacy-URL bridge.** The pre-canonical `?id={repo}@{org}@{git_host}` and intermediate `/app/project/{git_host}/...` URL forms are dropped without an edge-level 302 redirect. Authors update their links; URLs in committed spec files are migrated by the `specscore` CLI when next written.

## Rationale

**Path-based, conventional order** is the readable, shareable shape. It matches how every developer reads repo coordinates (host → org → repo). The URL itself documents what it points to when pasted into PRs, Slack, or IDE markdown previews — that is the real value (not SEO, which is a non-goal here).

**Dropping the `/project/` prefix** produces the shortest possible canonical URL that still reads like git coordinates. The first segment after `/app/` directly answers "where does this point?" without intermediate scaffolding.

**Structural distinguishability via the dot** eliminates the literal-vs-canonical routing ambiguity that the `/project/` prefix produced when literal Studio sub-routes (e.g. `/app/project/features`) shadowed the canonical `:git_host/:org/:repo` matcher. The new rule — first segment contains `.` → forge host — is structural rather than configuration-dependent: no reserved-word list to maintain, no route-order subtleties, and the constraint propagates to app-route literals (cannot contain `.`) and forge hosts (always contain `.`). Both halves of the constraint are already satisfied by every forge host on the allow-list and every existing Studio app route.

**Repos cannot contain `/`** on any major forge, so no `/blob/{ref}/`-style sentinel is needed to disambiguate `{repo}` from `{path}`. Importing the GitHub/GitLab sentinel would solve a problem that does not exist in this URL space.

**Ref-as-query-param** keeps the URL short for the common case (default branch) and side-steps ref-vs-path ambiguity entirely. It also enables the client-side Referer-based ref inference: URLs in repo files stay branch-agnostic, but readers viewing a non-default branch on a known forge land on the right snapshot anyway.

**`#page=` as view-state hash** separates concerns cleanly: the path identifies what to look at (a repo, directory, or file); the hash chooses how to look at it (default README view vs. Features tree vs. Plans tree vs. ...). The artifact remains in the path so unfurlers, scrapers, and the CDN see what they need; the tab selection rides along as in-page state. This is the same pattern as GitHub's line-anchor (`#L42`) — hash for non-essential view enrichment, never for primary content identity.

**`/app/` is non-negotiable** because of PWA service-worker scope. Marketing aesthetics ("`/app/` reads cheap") did not survive contact with this constraint. The prefix also signals dynamism, which is on-brand.

**Handle namespace deferred but reserved.** The `~{handle}` route shape is held in reserve for a future feature that introduces handle registration, ownership verification, and resolution. The earlier draft's `~{handle}/{project-slug}` shape carried implementation cost (slug parsing, slug-vs-handle disambiguation) that wasn't earned by any MVP requirement — handles aren't built yet. Deferring to a single-segment `~{handle}` shape simplifies the parser and leaves the slug question open for whichever future feature actually implements the resolver.

**Security controls** (host allow-list, IDNA normalization, path-traversal rejection, `Referrer-Policy: strict-origin`, no upstream host templating) are mandatory regardless of URL shape. They are listed in [Consequences at Decision Time](#consequences-at-decision-time) as implementation prerequisites and carry forward unchanged from the original draft.

## Declined Alternatives

### Path-based with `/project/` prefix (earlier draft, implemented same-day)

`https://specscore.studio/app/project/{git_host}/{org}/{repo}/{path}`. The original draft of this Decision. Shipped end-to-end in `specscore-studio-app` (matcher, allow-list, path validation, query parameters, handle parser, security headers) before the routing collision surfaced. Rejected (this amendment) because:

- The `/project/` namespace required literal Studio sub-routes (`/project/features`, `/project/plans`, `/project/architecture`, `/project/tests`, `/project/unsupported-source`) to coexist with the canonical `:git_host/:org/:repo` matcher. Angular matched the literals first, which kept them functional but encoded a forever constraint that no forge host on the allow-list could ever be named `features`, `plans`, `architecture`, `tests`, or `unsupported-source` — and the list grows with every new app sub-page.
- The Studio left-nav menu (Features / Plans / Architecture / Tests as tabs over a project) inherited the literal-route shape and lost project context when navigated to from a canonical URL: `/app/project/github.com/specscore/specscore-cli` → click "Features" → `/app/project/features` with no carried coordinates → "No project ID provided."
- Resolving the menu context required either (a) reviving the legacy `?id=` query param for internal navigation, producing two URL schemes in parallel; (b) merging the spec viewer into the project page with hash-based view switching (effectively this amendment); or (c) maintaining a reserved-word list of forbidden forge-host names forever.

The cleanest resolution was (b) combined with dropping the `/project/` prefix entirely. The dot-vs-no-dot distinguisher then handles forge-host vs. app-literal dispatch without configuration or reserved lists.

### Query-parameter id with `@`-chain (pre-canonical studio-app implementation)

`https://specscore.studio/project?id={repo}@{org}@{git_host}`. Rejected for three reasons: `@` is a reserved character that Slack/GitHub/Markdown auto-linkers truncate or treat as a user mention, breaking links in the most common sharing surfaces; `repo@org@host` is leaf-first, which no human reads naturally; and `?id=` reads as an internal database key, eroding the perception of the product as a polished surface.

### Query-parameter id with slash-shaped value

`https://specscore.studio/project?id={git_host}/{org}/{repo}` (proposed during same-day amendment iteration). Addressed the first two objections above (no `@`, host-first order) but still:

- `?id=` reads as an internal database key. Marketing concern carries forward.
- `/` inside a query value is non-deterministically encoded by link unfurlers and sanitizers — some emit `?id=github.com%2Fspecscore%2Fspecscore-cli`, producing ugly URLs in Slack/IDE previews. Path-based is immune.
- The bare-repo URL looks fine but artifact URLs grow noisy: `?id=…&path=…&ref=…&op=…` pushes the primary identifier into the same query string as true modifiers, blurring the read.

### Query-parameter `?repo=` with slash-shaped value

`https://specscore.studio/app/project?repo={git_host}/{org}/{repo}` (proposed during same-day amendment iteration). Strictly better than `?id=` — `repo=` reads as a real identifier, not a DB key — and addresses all three of the original `@`-chain objections. Rejected for the same artifact-URL noise reason: pushing the primary coordinate into the query string alongside `ref` and `op` makes the URL look like a server-rendered CRUD page rather than a git-native deep link, which is the entire aesthetic the path-based scheme is designed to deliver. The `/` encoding ambiguity in query values also persists.

### Hash routes for primary content (`#path/...` or `#id=...`)

Fragments never reach the server. They are invisible to access logs, analytics, OpenGraph/Twitter card scrapers, Slack/Discord unfurls, and CDNs. For a product whose value proposition is shareable spec links, that is disqualifying. The "we have no SSR so we must use hashes" framing was rejected: SPA fallback on a path route is one rewrite rule on every modern host (Firebase Hosting, Netlify, Vercel, Cloudflare Pages). **Hash IS used for view state (`#page=`, `#tab=`)** because view state is inherently per-client and never part of the artifact identity — losing it on unfurl produces correct behavior (default view), not broken behavior.

### `/-/blob/{ref}/` sentinel (GitLab-style)

Proposed initially to disambiguate `{ref}` from `{path}`. Once `{ref}` was moved to a query parameter, the only remaining ambiguity (`{repo}` vs. `{path}`) was already resolved by the single-segment repo-name constraint. The sentinel added visual clutter (`/-/blob/HEAD/` per URL) without solving a real problem in this URL space. Rejected as cargo-culted convention.

### Dropping `/app/` prefix

Recommended on aesthetic grounds during marketing review. Rejected when the PWA service-worker scope constraint surfaced: a service worker registered at the apex would claim the marketing site under the same origin. `/app/` is the cleanest path-level isolation. A subdomain (`app.specscore.studio`) would also work but requires DNS, deploy, OAuth-callback, and CORS changes — not worth doing for URL aesthetics alone.

### Stable opaque IDs as primary canonical (`/app/f/01HQXY3K8N`)

Proposed by the Developer Advocate review as the long-term answer to spec-file path rot. Rejected as the *primary* canonical because it forces a registry/resolver in Studio (centralizing a piece of what is otherwise a git-native product), is unreadable in PRs and grep output, and creates a bootstrapping problem (most existing artifacts have no ID). Retained as a future option: the `~{handle}` shape covers the most common stability need (repo renames and org moves) when handle resolution ships, without requiring per-artifact IDs. Per-feature stable IDs can be added later without breaking this scheme.

### Per-segment query parameters

`https://specscore.studio/app/project?host=github.com&org=acme&repo=widgets&path=...`. Rejected at framing time: too verbose, harder to read, and breaks the "URL coordinates read like git coordinates" property that makes path-shape work for humans. The `?repo=` slash-shaped variant (above) was a one-parameter compromise that still inherited most of the readability cost.

### Handle with slug suffix (`~{handle}/{project-slug}` or `~{handle}-{slug}`)

Earlier draft reserved a two-component handle shape so a single handle namespace could own multiple Studio projects. Reduced to a single-segment `~{handle}` reservation in this amendment because: (a) no resolver ships in MVP, so the slug grammar is unconstrained by implementation; (b) the slug-vs-handle separator question (`/` vs `-`) has multiple defensible answers and pinning one prematurely costs flexibility; (c) the future handle Feature that introduces registration can introduce the slug shape (or any other multi-component shape) at the same time, in one coherent Decision.

## Consequences at Decision Time

**Positive (expected):**

- URLs in spec files become readable and shareable; pasted-in-PR URLs document what they point to. Shorter than the earlier `/app/project/...` draft by one segment per URL.
- Spec authors and AI agents emit branch-agnostic URLs; readers on non-default branches still land on the correct snapshot when coming from a recognized forge.
- Studio's own application surface and the canonical artifact URL space share a single namespace (`/app/*`) without configuration-dependent collision risk. Future Studio sub-pages (`/app/settings`, `/app/billing`, etc.) coexist with arbitrarily many forge hosts as long as both halves of the dot-constraint hold.
- Single URL grammar in the CLI: one builder function. Handle URLs become a future addition that doesn't require changing the path-based grammar.
- View state (`#page=`, future `#tab=`) lives entirely client-side, never enters the CDN cache key, and never inflates analytics cardinality.

**Negative / cost (expected):**

- **Studio-app migration from the earlier draft.** The just-shipped `/app/project/{git_host}/...` routing must move to `/app/{git_host}/...`. The custom URL matcher relocates from the `project` route's child router to the top-level app router. The literal Studio sub-routes (`features`, `plans`, etc.) disappear in favor of `#page=` view switching inside a unified component. The just-shipped handle parser becomes dead code (kept in place) until a future handle Feature revives it.
- **CLI migration.** The `specscore` CLI must update its URL emitter from `/app/p/...` (current short form) and `/app/project/...` (the just-shipped form) to `/app/{git_host}/...`. Spec files in this repo and consumer repos that quote the older forms become stale; a CLI subcommand to rewrite committed URLs would be a natural follow-up.
- **No legacy bridge.** Pre-canonical and intermediate URL forms break without redirect. Acceptable because (a) the pre-canonical `?id=` form is being shipped against literally today, (b) the intermediate `/app/project/` form has only minutes of production existence at amendment time, and (c) the CLI is the primary URL emitter and can be updated atomically.
- **Forever constraint on app routes:** Studio app-route literals must not contain `.` for the dispatch rule to hold. Current literals (`landing`, `auth`, `notfound`, `prime-demos`, `empty`, `crud`, `documentation`, future `settings`/`billing`/`orgs`) comply; the constraint is documentable and easy to enforce in code review.
- **Forever constraint on forge hosts:** allow-listed forge hosts must always contain `.`. All current hosts comply (every public forge uses a dotted domain). Self-hosted forges on dotless internal domains would be unsupportable without revisiting this Decision.
- Studio must ship the security controls — these carry forward unchanged: forge-host allow-list with IDNA normalization, path-validation pipeline (decode-once → NFC → reject `..`/`%00`/encoded slashes), `Referrer-Policy: strict-origin` site-wide, hardcoded forge-API base mapped from the allow-list (never templated from the URL).
- CDN cache key must include query string for `/app/*` so `?ref=` and `?op=` produce distinct cache entries. `#page=` and other hashes never reach the server, so they don't enter the cache key.
- Client-side Referer inference is a polish feature; first launch ships with HEAD-only resolution and a GitHub parser. Forge-specific Referer parsers expand the coverage over time. Each parser carries its own test surface (renames, forks, foreign refs).

**Risks accepted:**

- **Handle resolver is undefined.** The `~{handle}` route shape is reserved but unimplemented. URLs hitting it render a placeholder. Future handle Feature defines slug grammar, ownership verification, billing, downgrade behavior — none of that is locked by this Decision.
- **Branch-name leak via Referer.** When a reader on a non-default branch follows a link to Studio, the branch name reaches Studio in the Referer header. Acceptable: the org/repo names are already in the destination URL, and a one-line privacy-policy note covers it. (Mitigated client-side: Studio's outbound responses ship `Referrer-Policy: strict-origin`.)
- **Path rot on file moves.** A URL pointing at `spec/features/login.md` does not survive renaming the file to `spec/features/authentication.md`. Mitigation is left to authors (rewrite URLs at rename time, or use `git mv` plus a CLI helper) and to a possible future per-feature stable-ID layer; the URL scheme itself does not solve it.
- **`#page=` is invisible to OpenGraph unfurls.** If a user shares `…/repo/spec/features#page=plans` expecting the OG card to advertise "Plans for spec/features," the unfurl will show the bare directory. Acceptable: the view state is supplementary, not identifying, and the path-shown unfurl is still correct in scope.

## Amendment Notes

This Decision was amended in place on 2026-05-22, the same day it was first Accepted, after the original shape (`/app/project/{git_host}/...` with literal Studio sub-routes for Features/Plans/Architecture/Tests) was implemented end-to-end in `specscore-studio-app` and the implementation surfaced a route-collision pain that couldn't be resolved within the original shape's constraints.

The in-place amendment (rather than a successor Decision per `spec/features/decision/REQ:supersede-never-rewrite`) was chosen on these grounds:

- The original shape existed in production for only hours before amendment. No external consumer had built against it. The immutability rule serves the case where downstream artifacts have already cited a Decision; that condition wasn't met.
- Both shapes (original and amended) were explored within a single working session with the Decision's Owner. The amendment is a refinement of the same active design conversation, not a course correction after the fact.
- A successor-Decision dance (move D-0001 to `archived/`, create D-0002, update the index, update every Feature that references D-0001) would imply a governance shift that didn't actually happen — the design was simply iterated.

The original shape and the iterations that led to the current amended shape are all preserved in [Declined Alternatives](#declined-alternatives), so the audit trail of the design conversation remains complete in this single Decision artifact. Future amendments to this Decision, once external consumers exist, will follow the successor-Decision convention.

## Observed Consequences

None observed yet.

## Affected Features

- `specscore-studio-app/spec/features/studio-url-scheme` — implements this Decision. Must be amended to match the new shape: drop `/project/` prefix, swap `:git_host/:org/:repo` route mount from child of `project` to top-level of `/app/`, fold ProjectSpecPage into ProjectPage with `#page=` view switching, retain handle parser but as dead code until a future handle Feature. Existing path-validation, allow-list, IDNA, ref/op, Referrer-Policy, and Referer-inference work carries forward without change.
- `specscore-cli` — URL emitter must move from `/app/p/...` (current short form) and `/app/project/...` (the just-implemented form) to `/app/{git_host}/...`. Existing emitted URLs in committed spec files (this repo, studio-app repo) become stale; a `specscore url rewrite` subcommand would be a natural follow-up.

---

*This document follows the https://specscore.md/decision-specification*

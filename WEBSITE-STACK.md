# Website Build Stack

This document describes how the specscore.md website is built, what stack it uses, where it can be hosted, and — more importantly — **why we chose this stack over alternatives** like Astro/Starlight, Docusaurus, Hugo, or Jekyll.

If you are tempted to "modernize" the build by swapping in a popular static-site generator, **read the [Why not a standard SSG?](#why-not-a-standard-ssg) section first**. The custom generator exists for a specific product reason, not from neglect.

---

## Current Stack

The site uses **two coexisting build stacks**: the custom Node.js generator for everything *except* the homepage, plus a thin Astro sub-project that owns only `/`. The split exists because the homepage is a marketing landing with distinct visual and structural requirements that don't fit the markdown-driven template; everything else (docs, blog, ideas, specifications) still benefits from the custom generator's strengths (side-by-side `.html` + `.md`, fast cold-start, no framework lock-in).

| Layer | Tool | Where | Owns |
|---|---|---|---|
| Docs generator | Custom Node.js script | [`tools/site-generator/build.js`](tools/site-generator/build.js) | Every path *except* `/` |
| Markdown | `markdown-it` | [`tools/site-generator/package.json`](tools/site-generator/package.json) | Docs only |
| Diagrams | Mermaid (client-side, loaded from CDN only on pages with diagrams) | [`tools/site-generator/lib/render-page.js`](tools/site-generator/lib/render-page.js) | Docs only |
| Docs templates | Hand-rolled HTML | `tools/site-generator/{template,landing,blog-*}.html` | Docs only |
| **Landing** | **Astro 5** | [`tools/landing/`](tools/landing/) | **`/` only** |
| Output | Side-by-side `.html` + `.md` (docs); `index.html` + assets (landing) | `public/` | — |
| Hosting | **Cloudflare Pages** | see [Hosting](#hosting) | — |

### The two-stack rule

> **Docs stack owns every path except `/`. Astro owns `/` and nothing else.**

When building, the docs generator runs first and emits `public/index.html` (a docs-style landing — defensive fallback if the Astro build is ever broken). Astro then builds and `cp -r tools/landing/dist/. public/` overwrites that `index.html`, plus drops Astro's bundled assets (`_astro/*`, `hero*.webp`, `favicon.svg`) into `public/`. The order matters: Astro must run **after** the docs generator so its homepage wins.

If you're tempted to "modernize" the docs side onto Astro too, **read the [Why not a standard SSG?](#why-not-a-standard-ssg) section first**. The custom docs generator exists for a specific product reason. The landing carve-out doesn't change that reasoning — it only handles the one path where the docs philosophy fits least.

### Build pipeline

```
src markdown (docs/, blog/, ideas/)        tools/landing/src/ (Astro)
        │                                          │
        ▼                                          ▼
tools/site-generator/build.js              tools/landing/  (pnpm build)
   ├── markdown-it → HTML body                ├── Astro 5 (static)
   ├── ```mermaid``` fences → <pre>           ├── inlines small CSS, hashes assets
   ├── template/landing/blog templates        └── emits dist/index.html, dist/_astro/*,
   └── emit BOTH:                                 dist/hero*.webp, dist/favicon.svg
       public/foo.html   ← human-friendly
       public/foo.md     ← LLM/curl-friendly
        │                                          │
        ▼                                          ▼
                       cp -r tools/landing/dist/. public/
                        (Astro's index.html overwrites the docs one)
        │
        ▼
Cloudflare Pages
(re-runs both builds + merge from sources via tools/cf-build.sh,
 then places _headers/_redirects at the publish-dir root from
 repo-root sources)
```

---

## Hosting

**Cloudflare Pages** is the sole hosting target (active since 2026-05-21). It builds from sources — CF runs [`tools/cf-build.sh`](tools/cf-build.sh) in its own runner on every push to `main`, regenerates `public/`, and serves the result. Per-PR preview deploys come via the git integration out of the box.

Because CF Pages builds from sources, **`_headers` / `_redirects` are source files at the repo root and are NOT committed into `public/`** — `cf-build.sh` copies them to the publish-dir root during the build. A CI guard in [`site-ci.yml`](.github/workflows/site-ci.yml) fails the build if either file leaks into `public/` before that step.

> **Provider history.** The site was previously deployable to Firebase Hosting as a fallback; that path was retired on 2026-05-29 — the `firebase.json` / `.firebaserc` config and the `site-ci.yml` deploy step were removed after its GCP Workload Identity auth broke post org-rename. The stack stays provider-portable: moving to another static host (Netlify, Vercel, Firebase, …) is a config-translation exercise, not a re-architecture.

### Cloudflare Pages

**Cloudflare Pages builds from sources** — configured via the Cloudflare dashboard, CF runs its own build runner against the connected git repo, regenerates `public/`, and serves the result. There is no committed CF project-config file; the build command and output directory are set in the dashboard (see below).

| File | Purpose |
|---|---|
| [`_headers`](_headers) | Source-of-truth for per-path response headers: serves `*.md` as `text/markdown`, attaches `Link: rel="alternate"` to canonical HTML pages, and sets `Content-Type` + `Cache-Control` on `/install/get-cli{,.ps1}`. Lives at the **repo root only** — CF Pages' build command places it at the publish-dir root. |
| [`_redirects`](_redirects) | Source-of-truth for Cloudflare's HTTP redirects. Currently 301s legacy `/get-cli{,.ps1}` paths to the canonical `/install/get-cli{,.ps1}`. Same placement contract as `_headers`. |

**Notable Cloudflare-only behavior:**
- `_headers` syntax: path on its own line, headers indented two spaces below. See the [Cloudflare Pages headers docs](https://developers.cloudflare.com/pages/configuration/headers/).
- `_redirects` syntax: `<source> <destination> <status>` per line. See the [Cloudflare Pages redirects docs](https://developers.cloudflare.com/pages/configuration/redirects/).
- Clean URLs (no trailing slash, `/foo` → `foo.html`) are CF Pages defaults — no config needed.
- Per-PR preview deploys via the git integration are available out of the box.

**Required CF Pages project config (when setting up):**

| Setting | Value |
|---|---|
| Build command | see [CF Pages build command](#cf-pages-build-command) below |
| Build output directory | `public` |
| Root directory | repo root |

#### CF Pages build command

Paste this exact string into the CF dashboard's **Build command** field:

```sh
sh tools/cf-build.sh
```

That's the entire build command. The script at [`tools/cf-build.sh`](tools/cf-build.sh) orchestrates both sub-project builds and assembles `public/` for deploy.

What the script does, in order:
1. Install docs-generator deps.
2. Build the docs site → `public/*.html` + `public/*.md` (including a fallback `public/index.html`).
3. Install landing deps.
4. Build the Astro landing → `tools/landing/dist/`.
5. Merge `tools/landing/dist/*` into `public/`. Astro's `index.html` overwrites the docs-style one; Astro's `_astro/`, `hero*.webp`, and `favicon.svg` land alongside the docs assets.
6. Copy the CF config files (`_headers`, `_redirects`) into `public/` so Cloudflare reads them at the publish-dir root. (The CI guard fails the docs build if they leak into `public/` before this step.)

Why a script rather than inlining the full chain in the dashboard: the CF dashboard's command field is a single-string text input, and long multi-command pastes can pick up stray newlines that break the shell chain in confusing ways. A version-controlled script is reviewable in PRs and immune to that class of bug.

`pnpm --dir` is used inside the script (rather than `pnpm --filter`) because the repo has no top-level pnpm workspace. Both sub-projects (`tools/site-generator` and `tools/landing`) keep their own `package.json` + `pnpm-lock.yaml` independently.

**Manual deploy fallback:**
```sh
sh tools/cf-build.sh
npx wrangler pages deploy public --project-name=specscore
```

---

## Why This Stack

### 1. The product *is* raw Markdown

specscore.md's positioning is **"specs as first-class Markdown, served as Markdown to humans, LLMs, and tools."** Every canonical page has two representations at stable URLs:

- `/feature-specification` → rendered HTML for humans
- `/feature-specification.md` → byte-identical Markdown source for LLMs, `curl`, agents, MCP servers

This dual output, plus the `Link: rel="alternate" type="text/markdown"` header pointing humans-on-HTML at the raw Markdown twin, **is the differentiating feature**. It's the reason an agent can pull a spec and reason over it without scraping HTML.

A generator that doesn't naturally emit `.md` at canonical URLs is the wrong tool.

### 2. Bytes-stable Markdown is a contract

Because LLM tools and downstream agents fetch the `.md` files by URL, the **on-disk source must match the served bytes** (modulo small expansions like includes). A Markdown-in / HTML-out SSG that re-serializes Markdown through an AST and emits only HTML breaks this contract. Our generator copies `.md` through unchanged and renders HTML on the side.

### 3. Pure static + per-path headers

Cloudflare Pages handles the content negotiation we need with declarative config (`_headers` / `_redirects`) — no server, edge function, or custom runtime, exactly the constraint we want for a docs/spec site. The stack stays provider-portable: swapping to another static host is a config-translation exercise, not a re-architecture.

### 4. The custom generator is small

`tools/site-generator/build.js` is a single Node script with three dependencies. The cost of maintenance is low. The cost of replacing it with a framework — and then bolting on the dual-output behavior — is higher.

---

## Why not a standard SSG?

Real evaluations against the requirement "raw `.md` URLs are first-class, byte-stable, and LLM-fetchable."

### Astro + Starlight (what `datatug.io` uses)

**Pros**
- Built-in nav, sidebar, search, MDX, syntax highlighting
- Active ecosystem; minimal bespoke code
- Great for traditional docs sites

**Cons (blocking)**
- Starlight emits **HTML only**. There is no first-class story for "also emit the raw `.md` at the canonical URL."
- A custom Astro integration could copy `src/content/**/*.md` into `dist/**/*.md`, but at that point we're re-implementing what `build.js` already does, on top of a much larger framework.
- Astro's content collections re-parse Markdown through an AST; preserving byte-identity to the on-disk source requires bypassing that pipeline.
- Migration cost: 10+ landing/spec HTML templates would need to become Astro components / MDX.

**Verdict:** Good fit for `datatug.io` (no raw-Markdown contract). Wrong fit here without significant custom work that erodes the benefit.

### Docusaurus

**Pros**
- Polished docs experience, versioning, i18n, search
- React component ecosystem

**Cons**
- HTML-only output, same as Starlight
- Heavier runtime (React) for a site that is mostly static documents
- Plugin system would still need a "copy raw `.md`" extension

**Verdict:** Same blocker as Starlight, plus more weight.

### Hugo

**Pros**
- Extremely fast builds
- Single binary, no Node toolchain

**Cons**
- HTML-only by default; emitting raw `.md` alongside requires custom output formats and per-page front-matter coordination
- Go template language is another thing to learn for contributors who are already comfortable in Node/JS
- We'd lose Mermaid-as-SVG-at-build-time without bringing back a headless browser anyway

**Verdict:** Possible, but the win over the current setup is marginal.

### Jekyll / Eleventy / MkDocs

Same pattern: HTML-first, raw-Markdown-at-canonical-URL is bolt-on. None of them remove the hosting header config. None of them are markedly simpler than the current `build.js`.

---

## Known Pain Points (and what we'd actually change)

The current stack is not perfect. The honest list:

1. **No built-in search.** If/when we need site search, the right move is a small client-side index (e.g. Pagefind, which runs over the built `public/` directory and is generator-agnostic) — **not** a framework migration.

3. **No sidebar / nav generation.** Today nav is hand-maintained in templates. If this becomes painful, the fix is a small Node helper that reads frontmatter — not a framework.

5. **Long-form docs subdomain.** If we eventually want a richer docs experience that doesn't share the raw-`.md` contract (e.g. tutorials, conceptual guides with heavy components), the right move is a **separate `docs.specscore.md` site** built with Astro + Starlight, leaving the spec pages on the custom generator so `/feature-specification.md` etc. stay byte-stable.

---

## When to Revisit This Decision

Reopen the "should we switch generators?" question if **and only if** one of these becomes true:

- The raw-`.md` contract is dropped from the product (unlikely — it's the differentiator)
- A mainstream SSG ships first-class "emit source Markdown at canonical URL, byte-identical" support
- The custom generator grows past ~1000 LOC and starts duplicating framework features (templating engine, asset pipeline, content collections)
- We need rich interactive components (search-as-you-type, live playgrounds) on the spec pages themselves

Until then, the answer is: **keep `build.js`, add Pagefind if search is needed.**

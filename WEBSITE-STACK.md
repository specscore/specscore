# Website Build Stack

This document describes how the specscore.md website is built, what stack it uses, where it can be hosted, and — more importantly — **why we chose this stack over alternatives** like Astro/Starlight, Docusaurus, Hugo, or Jekyll.

If you are tempted to "modernize" the build by swapping in a popular static-site generator, **read the [Why not a standard SSG?](#why-not-a-standard-ssg) section first**. The custom generator exists for a specific product reason, not from neglect.

---

## Current Stack

| Layer | Tool | Where |
|---|---|---|
| Generator | Custom Node.js script | [`tools/site-generator/build.js`](tools/site-generator/build.js) |
| Markdown | `markdown-it` | [`tools/site-generator/package.json`](tools/site-generator/package.json) |
| Diagrams | `@mermaid-js/mermaid-cli` + `puppeteer` | [`tools/site-generator/package.json`](tools/site-generator/package.json) |
| Templates | Hand-rolled HTML | `tools/site-generator/{template,landing,blog-*}.html` |
| Output | Side-by-side `.html` + `.md` | `public/` |
| Hosting | **Firebase Hosting** *or* **Cloudflare Pages** | see [Supported Hostings](#supported-hostings) |

### Build pipeline

```
src markdown (docs/, blog/, ideas/)
        │
        ▼
tools/site-generator/build.js
   ├── markdown-it → HTML body
   ├── mermaid-cli (puppeteer) → inline SVG
   ├── template.html / landing.html / blog-*.html → wrap body
   ├── emit BOTH:  public/foo.html   ← human-friendly
   │               public/foo.md     ← LLM- / curl-friendly (verbatim source)
   └── copy hosting config into publish dir:
       public/_headers, public/_redirects   ← for Cloudflare Pages
        │
        ▼
Hosting (Firebase OR Cloudflare Pages — both supported)
```

---

## Supported Hostings

The site can be deployed to **either** Firebase Hosting **or** Cloudflare Pages from the same `public/` build output. Both targets are kept in sync intentionally so we can:

- A/B test latency and DX between providers
- Fail over from one to the other without rebuilding
- Migrate at our own pace without a flag day

**Header rules and redirects must be maintained in both config formats** when added or changed. There is no single source-of-truth generator today (intentional — see [Why duplicate config?](#why-duplicate-config)).

### Firebase Hosting

Active production target as of this writing. Site name: `specscore-org`.

| File | Purpose |
|---|---|
| [`firebase.json`](firebase.json) | All hosting config: publish dir (`public`), `cleanUrls`, `trailingSlash`, ignore patterns, and the full `headers[]` array (per-path `Content-Type`, `Link: rel="alternate"`, `Cache-Control`). Single file owns everything Firebase needs. |
| [`.firebaserc`](.firebaserc) | Maps the default project alias to `synchestra-io` so `firebase deploy` targets the right Firebase project without `--project` flags. |

**Notable Firebase-only behavior:**
- `"ignore": ["firebase.json", "**/.*", "**/_headers", "**/_redirects"]` — the `_headers` / `_redirects` patterns prevent Firebase from serving Cloudflare's config files as plain-text URLs (`https://specscore.md/_headers`).
- `cleanUrls: true` + `trailingSlash: false` — `/foo` resolves to `foo.html`; `/foo/` 301s to `/foo`.
- `headers[].source` uses Firebase's path-matching syntax (`**/*.md` for all Markdown).

**Deploy:**
```sh
firebase deploy --only hosting
```

### Cloudflare Pages

Companion target. Project setup is via the Cloudflare dashboard (Pages → connect repo or push via Wrangler); there is no `.cloudflare/` config file equivalent to `.firebaserc`.

| File | Purpose |
|---|---|
| [`_headers`](_headers) | Source-of-truth for Cloudflare's per-path response headers. Mirrors `firebase.json`'s `headers[]` block: serves `*.md` as `text/markdown`, attaches `Link: rel="alternate"` to canonical HTML pages, and sets `Content-Type` + `Cache-Control` on `/install/get-cli{,.ps1}`. Copied into `public/_headers` by `build.js` so Cloudflare finds it at the publish-dir root. |
| [`_redirects`](_redirects) | Source-of-truth for Cloudflare's HTTP redirects. Currently 301s legacy `/get-cli{,.ps1}` paths to the canonical `/install/get-cli{,.ps1}`. Copied into `public/_redirects` by `build.js`. Optional — if absent, the copy step is silently skipped. |

**Notable Cloudflare-only behavior:**
- `_headers` syntax: path on its own line, headers indented two spaces below. See the [Cloudflare Pages headers docs](https://developers.cloudflare.com/pages/configuration/headers/).
- `_redirects` syntax: `<source> <destination> <status>` per line. See the [Cloudflare Pages redirects docs](https://developers.cloudflare.com/pages/configuration/redirects/).
- Clean URLs (no trailing slash, `/foo` → `foo.html`) are CF Pages defaults — no config needed.
- Per-PR preview deploys via the git integration are available out of the box.

**Deploy:**
```sh
# via Wrangler
npx wrangler pages deploy public --project-name=specscore

# or push to main with the CF Pages GitHub integration enabled
```

### Why duplicate config?

Firebase wants JSON. Cloudflare wants two plain-text files with their own syntaxes. There is no shared schema; any "single source-of-truth generator" would be a custom script that translates between them.

For our current rule count (~10 headers, 2 redirects) the duplication is:
- A 30-second edit when something changes
- A visible, greppable diff in PRs
- Zero new dependencies

If the rule count grows past ~30 entries or we start forgetting to update both files in lockstep, the right move is to add `tools/site-generator/hosting.config.js` as a single source-of-truth that emits both `firebase.json#hosting.headers` and `public/_headers`. **Don't pre-build this** — overkill until duplication actually causes a bug.

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

### 3. Both hostings are pure static + per-path headers

Firebase Hosting and Cloudflare Pages both handle the negotiation we need with declarative config. Neither requires a server, edge function, or custom runtime — exactly the constraint we want for a docs/spec site. Swapping providers is a config-translation exercise, not a re-architecture.

### 4. The custom generator is small

`tools/site-generator/build.js` is a single Node script with three dependencies. The cost of maintenance is low. The cost of replacing it with a framework — and then bolting on the dual-output behavior — is higher.

---

## Why not a standard SSG?

Real evaluations against the requirement "raw `.md` URLs are first-class, byte-stable, and LLM-fetchable."

### Astro + Starlight (what `datatug.io` uses)

**Pros**
- Built-in nav, sidebar, search, MDX, syntax highlighting
- Active ecosystem; minimal bespoke code
- Mermaid via `astro-rehype-mermaid` would let us drop Puppeteer/Chromium
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

1. **Puppeteer / Chromium for Mermaid is heavy.** It dominates `node_modules` size and CI install time. Replacing `@mermaid-js/mermaid-cli` with either:
   - a `markdown-it` plugin that emits `<pre class="mermaid">` and lets Mermaid render client-side, or
   - server-side Mermaid via `@mermaid-js/mermaid` + `jsdom`

   would remove the largest dependency without touching the dual-output design.

2. **No built-in search.** If/when we need site search, the right move is a small client-side index (e.g. Pagefind, which runs over the built `public/` directory and is generator-agnostic) — **not** a framework migration.

3. **No sidebar / nav generation.** Today nav is hand-maintained in templates. If this becomes painful, the fix is a small Node helper that reads frontmatter — not a framework.

4. **Hosting config drift.** Header/redirect rules live in both `firebase.json` and `_headers`/`_redirects`. See [Why duplicate config?](#why-duplicate-config) for when to fix this and how.

5. **Long-form docs subdomain.** If we eventually want a richer docs experience that doesn't share the raw-`.md` contract (e.g. tutorials, conceptual guides with heavy components), the right move is a **separate `docs.specscore.md` site** built with Astro + Starlight, leaving the spec pages on the custom generator so `/feature-specification.md` etc. stay byte-stable.

---

## When to Revisit This Decision

Reopen the "should we switch generators?" question if **and only if** one of these becomes true:

- The raw-`.md` contract is dropped from the product (unlikely — it's the differentiator)
- A mainstream SSG ships first-class "emit source Markdown at canonical URL, byte-identical" support
- The custom generator grows past ~1000 LOC and starts duplicating framework features (templating engine, asset pipeline, content collections)
- We need rich interactive components (search-as-you-type, live playgrounds) on the spec pages themselves

Until then, the answer is: **keep `build.js`, kill Puppeteer when convenient, add Pagefind if search is needed.**

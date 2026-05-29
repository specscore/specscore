# SpecScore Landing

The new homepage for [`specscore.md`](https://specscore.md/), built with [Astro](https://astro.build/).

Lives alongside the existing markdown-driven `tools/site-generator/`. **Both stacks coexist on purpose.** This Astro sub-project owns *only* the landing page (`/`). Every other path — docs, blog, ideas, specifications — keeps using the custom Node.js generator. See [`../../WEBSITE-STACK.md`](../../WEBSITE-STACK.md) for the broader stack rationale.

## Develop

```sh
pnpm install
pnpm dev
```

Opens at `http://localhost:4321`.

## Build

```sh
pnpm build
```

Produces static HTML + assets in `tools/landing/dist/`. Output is plain HTML — no Astro adapter, no server runtime.

## Wiring into the deploy pipeline (TBD)

The Astro `dist/` needs to be merged into the parent repo's `public/` folder so Cloudflare Pages serves it from `/`.

Suggested CF Pages build command (extend the one in [`../../WEBSITE-STACK.md`](../../WEBSITE-STACK.md)):

```sh
pnpm install --frozen-lockfile \
  && pnpm --filter specscore-site-generator build \
  && pnpm --filter specscore-landing build \
  && cp -r tools/landing/dist/* public/ \
  && cp _headers _redirects public/
```

Notes for whoever wires this up:

1. **Order matters.** The custom site-generator emits `public/index.html` (current homepage). Astro's `dist/index.html` must be copied **after** so it overwrites — otherwise the docs index wins and the landing is never served.
2. **Asset collisions.** Astro outputs to `dist/_astro/*` by default. That namespace shouldn't collide with anything from the custom generator. Verify by inspecting `tools/landing/dist/` after a build.
3. **`/hero.png` and `/favicon.svg`** live in `tools/landing/public/` and are copied to the root of `dist/` by Astro. They land at `public/hero.png` and `public/favicon.svg` after the merge step.
4. **Build runs on deploy.** Cloudflare Pages rebuilds `public/` from sources via `tools/cf-build.sh` on every push to `main`, so the landing build runs as part of that script — `public/` itself is a gitignored artifact, not committed.

## Design conventions

Before editing any component here, read [`DESIGN-PRINCIPLES.md`](DESIGN-PRINCIPLES.md) (this directory). It captures locked-in decisions (no flag emoji, header-dropdown / footer-tabs, hero structure) and code conventions (per-locale variants + shared modules in `src/lib/`, crawler-discoverable hreflang links, shared styles in `global.css`).

## Brand source of truth

This page implements brand specs that live in the **marketing repo**, not in this repo. When in doubt about visual or content choices, the marketing repo wins. Do not duplicate brand specs here.

- [`specscore/marketing/branding/palette.md`](https://github.com/specscore/marketing/blob/main/branding/palette.md) — five-color palette
- [`specscore/marketing/branding/website/hero-scene.md`](https://github.com/specscore/marketing/blob/main/branding/website/hero-scene.md) — hero composition + animation
- [`specscore/marketing/branding/website/homepage-ia.md`](https://github.com/specscore/marketing/blob/main/branding/website/homepage-ia.md) — section structure
- [`specscore/marketing/branding/website/homepage-copy.md`](https://github.com/specscore/marketing/blob/main/branding/website/homepage-copy.md) — literal page text
- [`specscore/marketing/branding/prompts/hero-score.md`](https://github.com/specscore/marketing/blob/main/branding/prompts/hero-score.md) — hero image generation prompt + iteration log

The hero images are **optimized WebP derivatives** of the marketing repo's `images/hero3.png` (Round 3 Gemini output — two-cream design where the paper sheet visibly lifts off the surrounding cream desk). Two derivatives ship:

- `src/assets/hero.webp` — 1400px master, ~72 KB. Imported by every `Hero*.astro` variant and processed by Astro's `<Image />` component at build time. Astro auto-generates a 700w/1050w/1400w srcset (content-hashed filenames under `dist/_astro/`).
- `public/hero-og.webp` — 1200px Open Graph image, ~66 KB. Stays in `public/` because OG scrapers require a stable absolute URL; not processed by Astro.

The raw PNG source is intentionally NOT tracked in this repo. Gemini watermark + a faint residual drop shadow are known artifacts in the source; they propagate through the optimization step and need post-processing (clone-stamp the watermark, soften the shadow) before public launch. See the marketing repo's iteration log for detail.

### Regenerating the hero from a new source

When the marketing repo's `images/hero*.png` source is updated (e.g., watermark cleaned up, shadow removed, Round 3+ generation), regenerate the WebP variants here:

```sh
# from tools/landing/
cp /path/to/marketing/images/heroX.png /tmp/hero-source.png  # local only; not committed
cwebp -q 82 -resize 1400 0 /tmp/hero-source.png -o src/assets/hero.webp
cwebp -q 85 -resize 1200 0 /tmp/hero-source.png -o public/hero-og.webp
rm /tmp/hero-source.png
```

`cwebp` is from `libwebp` (install via `brew install webp` on macOS). The raw source PNG is intentionally NOT tracked here — the canonical source lives in the marketing repo. Astro's image pipeline handles the responsive srcset from the single 1400px master, so no hand-built mobile/`@1x` variant is needed.

## Project structure

```
tools/landing/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── README.md  ← you are here
├── public/
│   ├── hero-og.webp    (1200px, ~66 KB — OG meta only; stays in public for absolute URL)
│   └── favicon.svg     (clef glyph on cream)
└── src/
    ├── assets/
    │   └── hero.webp   (1400px master — imported by Hero*.astro; Astro generates the srcset)
    ├── layouts/
    │   └── BaseLayout.astro
    ├── pages/
    │   └── index.astro
    ├── components/
    │   ├── SiteHeader.astro
    │   ├── Hero.astro
    │   ├── Problem.astro
    │   ├── WhatSpecScoreIs.astro
    │   ├── LinterDemo.astro
    │   ├── WhatShips.astro
    │   ├── ToolAgnostic.astro
    │   ├── Quickstart.astro
    │   ├── Ecosystem.astro
    │   ├── FinalCta.astro
    │   └── SiteFooter.astro
    └── styles/
        └── global.css
```

One Astro component per IA section, plus a layout + a header + a footer + global tokens. No content collections, no CMS, no markdown content — every word on the page is committed to source.

## Known unresolved items

These are flagged in `homepage-copy.md` § *Open questions for engineering*. They are content-layer concerns the page renders verbatim from the copy doc; fixing them requires editing this codebase too.

1. **Example spec syntax.** The `R1 — Single-code limit` / `**AC-1**` / `## Scenario:` style in `WhatSpecScoreIs.astro` is the copywriter's best inference. Verify against the real SpecScore body format and update both the marketing copy doc and this component if reality differs.
2. **Install endpoint URLs.** `https://specscore.md/install.sh` and `https://specscore.md/install.ps1` are placeholders. Either stand them up at those URLs (and ensure `Content-Type: text/x-shellscript` per `_headers`) or repoint the install commands in `Quickstart.astro` at GitHub Releases.
3. **Footer link targets.** Every footer link assumes destinations like `/docs`, `/docs/cli`, `/docs/format`, etc. Drop any that don't exist by ship.
4. **Linter error format.** The `AC-3:18  ambiguous AC — …` style in `LinterDemo.astro` and `Quickstart.astro` is the copywriter's guess. If real `specscore lint` output formats errors differently, update both terminal blocks to match.

## License

Same as the parent SpecScore project — MIT.

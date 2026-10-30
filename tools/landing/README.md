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

## Deployment pipeline

GitHub Actions runs [`../../tools/cf-build.sh`](../cf-build.sh), which builds the docs first, then all Astro landing variants, and copies `dist/.` into the parent `public/` directory. The Astro homepages overwrite the docs fallback homepages. The script also places `_headers` and `_redirects` at the publish root.

[Site Generator CI](../../.github/workflows/site-ci.yml) tests and saves the complete output as a deployment artifact. Its production job downloads that run's artifact and publishes it to the `specscore-md` Cloudflare Worker without rebuilding. See [`../../WEBSITE-STACK.md`](../../WEBSITE-STACK.md) for credentials and environment configuration. Generated `public/` and `dist/` files are not committed.

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
- `public/hero-og.webp` — 1200px-wide source image. Not referenced by meta tags.
- `public/hero-og.jpg` — the Open Graph / Twitter image (same pixels, JPEG). `og:image` and `twitter:image` use the absolute URL `https://specscore.md/hero-og.jpg`. JPEG is what more crawlers accept. Stays in `public/` because scrapers need a stable URL; not processed by Astro.

The raw PNG source is intentionally NOT tracked in this repo. Gemini watermark + a faint residual drop shadow are known artifacts in the source; they propagate through the optimization step and need post-processing (clone-stamp the watermark, soften the shadow) before public launch. See the marketing repo's iteration log for detail.

### Regenerating the hero from a new source

When the marketing repo's `images/hero*.png` source is updated (e.g., watermark cleaned up, shadow removed, Round 3+ generation), regenerate the WebP variants here:

```sh
# from tools/landing/
cp /path/to/marketing/images/heroX.png /tmp/hero-source.png  # local only; not committed
cwebp -q 82 -resize 1400 0 /tmp/hero-source.png -o src/assets/hero.webp
cwebp -q 85 -resize 1200 0 /tmp/hero-source.png -o public/hero-og.webp
node --input-type=module -e "import sharp from 'sharp'; await sharp('public/hero-og.webp').jpeg({ quality: 82 }).toFile('public/hero-og.jpg')"
rm /tmp/hero-source.png
```

`cwebp` is from `libwebp` (install via `brew install webp` on macOS). The raw source PNG is intentionally NOT tracked here — the canonical source lives in the marketing repo. Astro's image pipeline handles the responsive srcset from the single 1400px master, so no hand-built mobile/`@1x` variant is needed.

## Project structure

```
tools/landing/
├── astro.config.mjs
├── package.json
├── scripts/          emit-compare-md.ts — raw .md companions for /vs/ pages
├── tsconfig.json
├── README.md  ← you are here
├── public/
│   ├── hero-og.webp    (1200px-wide source)
│   ├── hero-og.jpg     (OG / Twitter image — absolute URL in meta tags)
│   └── robots.txt
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

1. **Example spec syntax.** The idea / feature / plan tabs in `WhatSpecScoreIs.astro` (and `WhatSpecScoreIsRu.astro`) are rendered from files that lint clean under `specscore spec lint` (specscore 0.55.0); the idea tab shows an excerpt (through Recommended Direction) of the full idea file. All three follow `new/feature.md`, `new/idea.md` and `new/plan.md`. Re-check them against the templates whenever the format changes.
2. **Install endpoint URLs.** `https://specscore.md/install.sh` and `https://specscore.md/install.ps1` are placeholders. Either stand them up at those URLs (and ensure `Content-Type: text/x-shellscript` per `_headers`) or repoint the install commands in `Quickstart.astro` at GitHub Releases.
3. **Footer link targets.** Every footer link assumes destinations like `/docs/`, `/cli/`, and `/ai/`. Drop any that don't exist by ship.
4. **Linter output.** The terminal in `LintExample.astro` is real `specscore spec lint` output captured from specscore 0.55.0; the Quickstart blocks show real `specscore init` / `specscore spec lint` output. Re-capture them when lint rules or messages change. (`ScoreExample.astro` is an illustrative preview of the AI `/score` pass, not CLI output.)

## License

Same as the parent SpecScore project: specification text and documentation are [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE); the reference CLI ([`specscore/specscore-cli`](https://github.com/specscore/specscore-cli)) is [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Open Questions

The items under [Known unresolved items](#known-unresolved-items) are still open.

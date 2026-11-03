# Landing — public assets

Static files copied as-is into `dist/` at build time. Astro does no processing on these.

| File | Purpose |
|---|---|
| `hero-og.webp` | 1200px-wide source image. Meta tags do not reference it. |
| `hero-og.jpg` | Open Graph and Twitter image. `og:image` is `https://specscore.md/hero-og.jpg`. |
| `robots.txt` | Allows search and AI crawlers, points at `llms.txt`, and lists `https://specscore.md/sitemap.xml`. |
| `film/` | Local poster images (1280×720 WebP) for the click-to-load product films, one per locale shown (en, ru). The poster is local so no request goes to YouTube before the click. |
| `favicon.svg` | Clef glyph on cream. |

**Hero illustration note.** The main hero image (`hero.webp`) lived here through 2026-05-21 alongside a hand-built `hero@1x.webp` variant. Both were moved/dropped when the Hero component switched to Astro's `<Image />` component — the 1400px master now lives at [`../src/assets/hero.webp`](../src/assets/) and Astro generates the responsive srcset at build time (700w / 1050w / 1400w, written to `dist/_astro/*` with content-hashed filenames). `hero-og.jpg` lives in `public/` because Open Graph needs a stable absolute URL. `hero-og.webp` is the source it is exported from.

The raw PNG source is **not tracked in this repo** — canonical source lives in the marketing repo. To regenerate WebP variants from a refreshed source, see `tools/landing/README.md` § *Regenerating the hero from a new source*.

## Open Questions

None at this time.

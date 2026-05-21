# Landing — public assets

Static files copied as-is into `dist/` at build time. Astro does no processing on these.

| File | Purpose |
|---|---|
| `hero-og.webp` | Open Graph image, 1200px wide, ~66 KB. Must stay in `public/` because OG scrapers require an absolute static URL. |
| `favicon.svg` | Clef glyph on cream. |

**Hero illustration note.** The main hero image (`hero.webp`) lived here through 2026-05-21 alongside a hand-built `hero@1x.webp` variant. Both were moved/dropped when the Hero component switched to Astro's `<Image />` component — the 1400px master now lives at [`../src/assets/hero.webp`](../src/assets/) and Astro generates the responsive srcset at build time (700w / 1050w / 1400w, written to `dist/_astro/*` with content-hashed filenames). Only `hero-og.webp` still lives in `public/` because Open Graph needs a stable absolute URL.

The raw PNG source is **not tracked in this repo** — canonical source lives in the marketing repo. To regenerate WebP variants from a refreshed source, see `tools/landing/README.md` § *Regenerating the hero from a new source*.

## Outstanding Questions

None at this time.

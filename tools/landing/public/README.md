# Landing — public assets

Static files copied as-is into `dist/` at build time. Astro does no processing on these.

| File | Purpose |
|---|---|
| `hero.webp` | Main hero illustration, 1400px wide, ~79 KB. Derived from `specscore/marketing/images/hero2.png`. |
| `hero@1x.webp` | Mobile/1x variant, 700px wide, ~31 KB. |
| `hero-og.webp` | Open Graph image, 1200×630, ~72 KB. |
| `favicon.svg` | Clef glyph on cream. |

The raw PNG source is **not tracked here** — canonical source lives in the marketing repo. To regenerate the WebP variants from a refreshed source, see `tools/landing/README.md` § *Regenerating the hero from a new source*.

## Outstanding Questions

None at this time.

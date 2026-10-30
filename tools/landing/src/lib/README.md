# lib

Shared data and build helpers for the Astro landing. Imported by layouts and components; the sitemap and structured-data modules also run from `astro.config.mjs`.

| Module | Purpose |
|---|---|
| [`languages.ts`](languages.ts) | Locale list, labels, and path helpers for the language switcher. |
| [`route-map.mjs`](route-map.mjs) | Which locales actually have a given route, and the hreflang alternate set. |
| [`alternates.mjs`](alternates.mjs) | Build-time inventory of `src/pages` for the header, footer, and `<head>` alternates. |
| [`sitemap-pages.mjs`](sitemap-pages.mjs) | Docs-generator URLs added to the sitemap, plus `x-default`. |
| [`structured-data.mjs`](structured-data.mjs) | JSON-LD taken from the visible HTML of built pages. |
| [`html-to-md.mjs`](html-to-md.mjs) | Turns a built page's `<main>` into Markdown for `/llms-full.txt`. |
| [`llms.mjs`](llms.mjs) | Writes `/llms.txt`, `/llms-full.txt`, and raw Markdown companions at build time. |

## Open Questions

None at this time.

# Landing — src

Astro source tree.

| Directory | Purpose |
|---|---|
| [`pages/`](pages/) | Astro routes. One per file. Only `index.astro` exists today (the homepage). |
| [`layouts/`](layouts/) | Page-level wrappers — `<head>`, fonts, global styles, header/footer slots. |
| [`components/`](components/) | Section-level components — one `.astro` per IA section. |
| [`scripts/`](scripts/) | Client-side TypeScript bundled by Astro (click-to-load film embed). |
| [`styles/`](styles/) | Global CSS (color tokens, typography, reset, shared utilities). |
| [`lib/`](lib/) | Shared locale list, hreflang alternates, sitemap URL helpers, and structured-data injection. |

## Open Questions

None at this time.

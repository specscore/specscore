# Landing — src

Astro source tree.

| Directory | Purpose |
|---|---|
| [`pages/`](pages/) | Astro routes. One per file. Only `index.astro` exists today (the homepage). |
| [`layouts/`](layouts/) | Page-level wrappers — `<head>`, fonts, global styles, header/footer slots. |
| [`components/`](components/) | Section-level components — one `.astro` per IA section. |
| [`scripts/`](scripts/) | Client-side TypeScript bundled by Astro (click-to-load film embed). |
| [`styles/`](styles/) | Global CSS (color tokens, typography, reset, shared utilities). |
| [`content/`](content/) | Typed page copy rendered by shared Astro components. Comparison articles live in [`content/compare/`](content/compare/). |

## Outstanding Questions

None at this time.

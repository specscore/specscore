# Landing — layouts

Astro layout wrappers that surround page content.

| File | Purpose |
|---|---|
| `BaseLayout.astro` | Document `<head>` (charset, viewport, fonts, OG tags, favicon), force-light theme override script, and a single `<slot />` for page content. |

The landing is a single page so there's only one layout today. If a second page is added later (e.g., a thank-you page after a form submit) it would either reuse `BaseLayout.astro` or get its own.

## Outstanding Questions

None at this time.

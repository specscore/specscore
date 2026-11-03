# Tools roundup copy

Source for `/spec-driven-development/tools/`, the spec-driven development tools guide.

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, table cells, and sources. |
| `facts.ts` | Tool order, public URLs, and the Markdown sibling path. |
| `pages.ts` | Locale → page. A missing tool throws at render. |
| `render-md.ts` | Raw Markdown companion, same facts as the HTML page. |
| [`locales/`](locales/) | One article per locale. |

`tools/landing/scripts/emit-roundup-md.ts` writes `/{locale}/spec-driven-development/tools.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`. The root `_headers` file adds the matching Cloudflare `Link` header.

## Outstanding Questions

None at this time.

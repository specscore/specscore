# Article copy

Source for `/articles/`, informational pieces on the Astro site.

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, the article, and the index. |
| `facts.ts` | Shared URLs, EARS templates, example sentences, and the SpecScore files that passed `specscore spec lint`. |
| `pages.ts` | Locale → article. A missing locale throws at render. |
| `render-md.ts` | Raw Markdown companion, same facts as the HTML page. |
| [`locales/`](locales/) | One module per locale. |

`tools/landing/scripts/emit-articles-md.ts` writes `/{locale}/articles.md` and `/{locale}/articles/ears-requirements.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`. The root `_headers` file adds the matching Cloudflare `Link` header.

## Outstanding Questions

None at this time.

# Articles

Source for `/articles/`. One content object per locale, rendered by `ArticlePage.astro` and `ArticlesIndex.astro`, with a raw `.md` sibling.

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, sections, and the index. |
| `facts.ts` | Public URLs and the English format samples shared by every locale. |
| `pages.ts` | Locale → copy. A missing locale throws at render. |
| `render-md.ts` | Raw Markdown companion, same facts as the HTML page. |
| [`locales/`](locales/) | One article per locale. |

`tools/landing/scripts/emit-articles-md.ts` writes `/{locale}/articles.md` and `/{locale}/articles/acceptance-criteria.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`. The root `_headers` file adds the matching Cloudflare `Link` header.

## Outstanding Questions

None at this time.

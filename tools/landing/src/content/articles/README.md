# Articles

Source for `/articles/`. Each locale module holds the acceptance-criteria article, the EARS article, and the index. `ArticlePage.astro` renders the article for the current URL. `ArticlesIndex.astro` lists both. Each page has a raw `.md` sibling.

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, both articles, and the index. |
| `facts.ts` | Public URLs, EARS templates, and the English format samples shared by every locale. |
| `pages.ts` | Locale → copy. A missing locale throws at render. |
| `render-md.ts` | Raw Markdown companions, same facts as the HTML pages. |
| [`locales/`](locales/) | One module per locale, with both articles. |

`tools/landing/scripts/emit-articles-md.ts` writes `/{locale}/articles.md`, `/{locale}/articles/acceptance-criteria.md`, and `/{locale}/articles/ears-requirements.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`. The root `_headers` file adds the matching Cloudflare `Link` header.

## Outstanding Questions

None at this time.

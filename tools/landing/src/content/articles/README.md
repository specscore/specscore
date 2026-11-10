# Articles

Source for `/articles/`. Each locale module holds the acceptance-criteria article, the EARS article, the lint-specs-in-ci article, the feature-spec-template article, the Claude Code and Cursor article, and the index. Translated lint copy lives in [`locales/lint/`](locales/lint/). Translated feature-spec-template copy lives in [`locales/template/`](locales/template/). Translated Claude Code and Cursor copy lives in [`locales/agents/`](locales/agents/). `ArticlePage.astro` renders the article for the current URL. `ArticlesIndex.astro` lists them. Each page has a raw `.md` sibling.

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, the articles, and the index. |
| `facts.ts` | Public URLs, EARS templates, and the English format samples shared by every locale. |
| `pages.ts` | Locale → copy. A missing locale throws at render. |
| `render-md.ts` | Raw Markdown companions, same facts as the HTML pages. |
| [`locales/`](locales/) | One module per locale. Lint translations are in [`locales/lint/`](locales/lint/). Feature-spec-template translations are in [`locales/template/`](locales/template/). Claude Code and Cursor translations are in [`locales/agents/`](locales/agents/). |

`tools/landing/scripts/emit-articles-md.ts` writes `/{locale}/articles.md`, `/{locale}/articles/acceptance-criteria.md`, `/{locale}/articles/ears-requirements.md`, `/{locale}/articles/lint-specs-in-ci.md`, `/{locale}/articles/feature-spec-template.md`, and `/{locale}/articles/claude-code-specs.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`. The root `_headers` file adds the matching Cloudflare `Link` header.

`delivery.ts` and [`locales/delivery/`](locales/delivery/) own the weekly delivery article and its homepage introduction in all 14 locales. `DeliveryArticle.astro` renders it; the shared emitter produces its Markdown companion and includes it in the localized article indexes.

## Outstanding Questions

None at this time.

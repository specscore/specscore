# Comparison copy

Source for the `/vs/` articles added after the original five (plain Markdown, OpenSpec, Spec Kit, Datarim, CodeSpeak).

| File | Purpose |
|---|---|
| `types.ts` | Inline prose, cards, and table rows. |
| `chrome.ts` | Headings, CTA, and the “checked 30 October 2026” line, per locale. |
| `catalog.ts` | Slug order shared with the index and the “other comparisons” list. |
| `pages.ts` | Slug → locale → page. A missing locale throws at render. |
| `render-md.ts` | Raw Markdown companion, same facts as the HTML page. |
| `locales/en/` | English articles for Kiro, Tessl, the BMAD Method, and Task Master AI. |

`tools/landing/scripts/emit-compare-md.ts` writes `/{locale}/vs/{slug}.md` into the Astro build output. The HTML `<head>` points at that file with `rel="alternate" type="text/markdown"`.

## Outstanding Questions

None at this time.

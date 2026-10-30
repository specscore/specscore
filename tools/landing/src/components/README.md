# Landing — components

One Astro component per IA section, in render order, plus a header and a footer.

| File | IA section | Role |
|---|---|---|
| `SiteHeader.astro` | — | Sticky header: clef wordmark + GitHub link. No theme toggle (landing is light-only). |
| `Hero.astro` | 1 | Hero — headline, subhead, CTAs, score illustration. |
| `FilmSection.astro` / `FilmSectionRu.astro` | 1b | Click-to-load product film directly under the hero. English and Russian only; other locales show no film. Structure and click-to-load markup live in `FilmEmbed.astro`; styles in `global.css`. |
| `Problem.astro` | 2 | The Problem — only section in technical-but-warm voice. |
| `WhatSpecScoreIs.astro` | 3 | Format definition + hierarchy SVG + example spec block. |
| `LinterDemo.astro` | 4 | Terminal block. Green/red marks match the hero illustration. |
| `WhatShips.astro` | 5 | Two cards: format + linter, with wireframe icons. |
| `ToolAgnostic.astro` | 6 | Short pivot. No logos. |
| `Quickstart.astro` | 7 | Tabbed install (auto-detect Win/macOS-Linux) + lint demo. |
| `Ecosystem.astro` | 8 | Three quiet cards: Rehearse, SpecScore Studio, Synchestra (alphabetical). |
| `FinalCta.astro` | 9 | "Specs that pass." headline + Star + Read the docs. |
| `SiteFooter.astro` | — | Four-column footer. |
| `CompareArticle.astro` | — | Shared structure for a `/vs/` article. Copy comes from `src/content/compare/`. |
| `MoreComparisons.astro` | — | Cross-links to the other comparison pages. |
| `Inlines.astro` | — | Renders a typed prose run (text, links, code). |

Source of truth for **what each section should contain** lives in the marketing repo: [`branding/website/homepage-ia.md`](https://github.com/specscore/marketing/blob/main/branding/website/homepage-ia.md) (structure) and [`branding/website/homepage-copy.md`](https://github.com/specscore/marketing/blob/main/branding/website/homepage-copy.md) (literal text).

## Outstanding Questions

None at this time.

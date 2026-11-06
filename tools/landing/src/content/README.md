# Landing — content

Typed copy for pages that share one Astro renderer.

| Directory | Purpose |
|---|---|
| [`compare/`](compare/) | SpecScore vs other tools. One content object per page and locale, rendered by `CompareArticle.astro`, with a raw `.md` sibling emitted at build time. |
| [`roundup/`](roundup/) | The spec-driven development tools guide at `/spec-driven-development/tools/`. One content object per locale, rendered by `ToolsRoundup.astro`, with a raw `.md` sibling. |
| [`articles/`](articles/) | Informational articles at `/articles/`: acceptance criteria, EARS requirements, linting specs in CI, the feature spec template, and spec-driven development with Claude Code and Cursor. Each locale module holds them, rendered by `ArticlePage.astro` and `ArticlesIndex.astro`, with a raw `.md` sibling for each page. |

## Outstanding Questions

None at this time.

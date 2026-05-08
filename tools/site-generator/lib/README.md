# lib

Reusable build modules used by [`../build.js`](../build.js). Each module has a co-located `*.test.js` file run by `pnpm test`.

## Contents

| Module | Purpose |
|--------|---------|
| [load-config.js](load-config.js) | Loads `site-config.json` and builds derived lookup structures |
| [rewrite-links.js](rewrite-links.js) | Rewrites Markdown links from spec-relative paths to site URLs |
| [render-mermaid.js](render-mermaid.js) | Renders Mermaid code blocks to inline SVG using `@mermaid-js/mermaid-cli` |
| [render-page.js](render-page.js) | Renders Markdown to HTML (markdown-it) and injects it into the page template |
| [build-blog.js](build-blog.js) | Parses blog post frontmatter and builds the sorted blog index |
| [build-llms.js](build-llms.js) | Generates `llms.txt` and `llms-full.txt` for AI agent consumption |

## Outstanding Questions

None at this time.

# lib

Reusable build modules used by [`../build.js`](../build.js). Each module has a co-located `*.test.js` file run by `pnpm test`.

## Contents

| Module | Purpose |
|--------|---------|
| [load-config.js](load-config.js) | Loads `site-config.json` and builds derived lookup structures |
| [rewrite-links.js](rewrite-links.js) | Rewrites Markdown links from spec-relative paths to site URLs |
| [render-mermaid.js](render-mermaid.js) | Converts ` ```mermaid ` fences to `<pre class="mermaid">` blocks for client-side rendering by the Mermaid script (loaded conditionally via `render-page.js`) |
| [render-page.js](render-page.js) | Renders Markdown to HTML (markdown-it), injects it into the page template, and conditionally loads the Mermaid script when the page has diagrams |
| [build-blog.js](build-blog.js) | Parses blog post frontmatter and builds the sorted blog index |
| [build-llms.js](build-llms.js) | Generates `llms.txt` and `llms-full.txt` for AI agent consumption |

## Outstanding Questions

None at this time.

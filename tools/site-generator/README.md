# site-generator

Static site builder for [`https://specscore.md`](https://specscore.md). Reads the repo's Markdown (specs, docs, blog) plus [`site-config.json`](site-config.json) and writes the generated site into the repo root's `public/` directory, which is checked in and deployed by Firebase Hosting.

## Quick start

Run from this directory:

```bash
pnpm install        # first time only
pnpm test           # run unit tests for lib/*.js
pnpm build          # build the site into ../../public
pnpm clean          # remove ../../public
```

`pnpm` is pinned via the workflow's `packageManager` setting; see [`.github/workflows/site-ci.yml`](../../.github/workflows/site-ci.yml) for the CI version of this build.

## Layout

| Path | Description |
|------|-------------|
| [build.js](build.js) | Entry point — orchestrates config load, link rewriting, Mermaid rendering, page rendering, and `llms.txt` generation |
| [lib/](lib/README.md) | Reusable build modules with co-located `*.test.js` unit tests |
| [assets/](assets/README.md) | Static assets copied into the built site |
| [template.html](template.html) | Base HTML template that pages are injected into |
| [landing.html](landing.html) | Landing page template |
| [blog-index.html](blog-index.html) / [blog-post.html](blog-post.html) | Blog listing and post templates |
| [site-config.json](site-config.json) | Site configuration: nav, page mappings, derived lookups |
| [puppeteer-config.json](puppeteer-config.json) | Puppeteer cache config for the local Chrome used by Mermaid rendering |
| [package.json](package.json) | Scripts and dependencies (markdown-it, puppeteer, @mermaid-js/mermaid-cli) |

The `chrome/` and `node_modules/` directories are local install artifacts and are not committed.

## Outstanding Questions

None at this time.

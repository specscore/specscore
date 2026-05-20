import { defineConfig } from 'astro/config';

// Static output by default — no adapter needed for Cloudflare Pages.
// The output is plain static HTML/CSS/JS in `dist/`, which the deploy
// pipeline merges into the parent repo's `public/` folder.

export default defineConfig({
  site: 'https://specscore.md',
  // No `base` — this page is served from the site root.
  build: {
    // Inline tiny CSS — keeps the rendered HTML self-contained for the
    // dual-deploy (Firebase / Cloudflare Pages) flow described in the
    // parent repo's WEBSITE-STACK.md.
    inlineStylesheets: 'auto',
  },
});

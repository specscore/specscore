import { copyFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { collectDocsPageUrls, SITEMAP_LOCALES, withHreflang } from './src/lib/sitemap-pages.mjs';
import { injectStructuredData } from './src/lib/structured-data.mjs';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));

// Static output by default — no adapter needed for Cloudflare Pages.
// The output is plain static HTML/CSS/JS in `dist/`, which the deploy
// pipeline merges into the parent repo's `public/` folder.

export default defineConfig({
  site: 'https://specscore.md',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: SITEMAP_LOCALES,
      },
      customPages: collectDocsPageUrls(repoRoot),
      serialize: withHreflang,
      filter: (page) => !new URL(page).pathname.split('/').includes('README'),
    }),
    {
      name: 'sitemap-xml',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const out = fileURLToPath(dir);
          // @astrojs/sitemap writes sitemap-0.xml plus a sitemap index.
          // /sitemap.xml is the URL we publish in robots.txt.
          await copyFile(join(out, 'sitemap-0.xml'), join(out, 'sitemap.xml'));
        },
      },
    },
    {
      name: 'structured-data',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          await injectStructuredData(dir);
        },
      },
    },
  ],
  // No `base` — this page is served from the site root.
  build: {
    // Inline tiny CSS — keeps the rendered HTML self-contained for the
    // Cloudflare Pages deploy flow described in the parent repo's
    // WEBSITE-STACK.md.
    inlineStylesheets: 'auto',
  },
});

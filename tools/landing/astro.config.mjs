import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

const root = dirname(fileURLToPath(import.meta.url));
const emitScript = join(root, 'scripts/emit-compare-md.ts');

function emitCompareMarkdown(outDir) {
  const dest = outDir instanceof URL ? fileURLToPath(outDir) : String(outDir);
  const result = spawnSync(
    process.execPath,
    ['--experimental-strip-types', emitScript, dest],
    { cwd: root, stdio: 'inherit' },
  );
  if (result.status !== 0) {
    throw new Error('compare markdown emit failed');
  }
}

function compareMarkdown() {
  return {
    name: 'compare-markdown',
    hooks: {
      'astro:build:done': ({ dir }) => {
        emitCompareMarkdown(dir);
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use((req, res, next) => {
          const url = (req.url || '').split('?')[0];
          if (!/^\/(?:[a-z-]+\/)?vs\/[a-z0-9-]+\.md$/.test(url)) return next();
          const result = spawnSync(
            process.execPath,
            ['--experimental-strip-types', emitScript, '--print', url],
            { cwd: root, encoding: 'utf8' },
          );
          if (result.status !== 0 || !result.stdout) return next();
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          res.end(result.stdout);
        });
      },
    },
  };
}

// Static output by default — no adapter needed for Cloudflare Pages.
// The output is plain static HTML/CSS/JS in `dist/`, which the deploy
// pipeline merges into the parent repo's `public/` folder.

export default defineConfig({
  site: 'https://specscore.md',
  // No `base` — this page is served from the site root.
  integrations: [compareMarkdown()],
  build: {
    // Inline tiny CSS — keeps the rendered HTML self-contained for the
    // Cloudflare Pages deploy flow described in the parent repo's
    // WEBSITE-STACK.md.
    inlineStylesheets: 'auto',
  },
});

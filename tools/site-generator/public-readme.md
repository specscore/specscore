# `public/` — auto-generated build output

> **This directory is auto-generated. Do not edit files here.**
>
> Any change you make in `public/` will be overwritten on the next build,
> and `public/` itself is gitignored — your edit also won't be committed.

If you're an AI agent (or a human) looking to change something on the live
site, find the source file and edit that. The mapping is:

| You want to change… | Edit the source at… |
|---|---|
| The homepage (`index.html`) | [`../tools/landing/src/`](../tools/landing/) — Astro components in `src/components/*.astro` |
| Any docs page (`*.html` + `*.md` pair) | The matching markdown under [`../docs/`](../docs/), [`../blog/`](../blog/), or [`../spec/`](../spec/), referenced from [`../tools/site-generator/site-config.json`](../tools/site-generator/site-config.json) |
| Site stylesheet (`assets/style.css`) | [`../tools/site-generator/assets/style.css`](../tools/site-generator/assets/) |
| HTML chrome (header / footer / sidebar) | [`../tools/site-generator/template.html`](../tools/site-generator/template.html) and the sibling `landing.html`, `blog-*.html` templates |
| CLI installer endpoints (`install/get-cli{,.ps1}`) | Upstream at [`specscore/specscore-cli`](https://github.com/specscore/specscore-cli) — fetched at build time, not stored here |
| This README | [`../tools/site-generator/public-readme.md`](../tools/site-generator/public-readme.md) |

## Rebuild

```sh
# Full build (docs + landing + Cloudflare config) — what CF Pages runs:
sh tools/cf-build.sh

# Or build the two sub-projects separately:
pnpm --dir tools/site-generator build    # docs, blog, ideas, specs
pnpm --dir tools/landing build           # the homepage (Astro)
```

See [`../WEBSITE-STACK.md`](../WEBSITE-STACK.md) for the full pipeline and
the two-stack rationale.

## Not deployed

This file is excluded from the deployed site — [`../tools/cf-build.sh`](../tools/cf-build.sh)
removes it as the final step before Cloudflare Pages takes its publish-dir snapshot.

So it's only here for local-development clarity. Visiting
`https://specscore.md/README.md` will return 404.

# SpecScore — Project Conventions

## Instruction precedence

- Read [`AGENTS.md`](AGENTS.md) first and follow all of its instructions and rules.
- Treat `CLAUDE.md` as additional repository-specific guidance that complements `AGENTS.md`.

## Website architecture — two systems, both must be updated

The specscore.md website has **two separate rendering systems**. Any change to user-facing content on the home page or landing pages must touch both:

1. **Landing pages** (`tools/landing/`) — **Astro app with i18n. The `/` home page is an Astro page**, not the docs site. Landing page sections are Astro components in `tools/landing/src/components/`, with per-language variants suffixed by locale (e.g., `FinalCta.astro`, `FinalCtaRu.astro`, `FinalCtaEs.astro`). **7 languages**: En (base), Es, Ja, Ko, Pt-BR, Ru, Uk, Zh-CN. Pages are composed in `tools/landing/src/pages/` with locale subdirectories. Global styles live in `tools/landing/src/styles/global.css` — put shared styles there, not duplicated in each component.

2. **Docs site** (`tools/site-generator/`) — Node.js static builder. Docs pages are Markdown rendered via `build.js`. `tools/site-generator/landing.html` is the legacy/fallback home page for the docs build only. Output goes to `public/`.

**When editing landing page content**: update the Astro components in `tools/landing/src/components/` — all 8 variants (base + 7 translations). Also update `tools/site-generator/landing.html` if the docs site build uses it.

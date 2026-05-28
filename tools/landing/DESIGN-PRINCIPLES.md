# Website Design Principles

> Conventions and locked-in decisions for the specscore.md website. Read this before changing any component in `tools/landing/src/`.

This doc is for engineers and AI agents touching the **code** of the site. It captures:

- **Decisions already made** that should not be re-litigated without new evidence.
- **Code-level conventions** for how the Astro landing is structured.

It is **not** a brand spec. Visual identity (palette, hero composition, IA, page copy) lives in the marketing repo — see [Where else design lives](#where-else-design-lives) at the bottom.

---

## The frame

The specscore.md site has a deliberate editorial register: **paper, ink, hairlines, native-language labels.** Five colours total, no dark mode, no gradients, no rounded boxes, no decorative icons. The single graphical accent is the clef glyph (𝄞) in the wordmark. Everything that gets added competes with that quiet for attention — keep it earning its place.

The site has two stacks ([`WEBSITE-STACK.md`](../../WEBSITE-STACK.md)):

- **Astro landing** (`tools/landing/`) — owns `/` and only `/`.
- **Docs generator** (`tools/site-generator/`) — owns every other path.

These principles apply primarily to the Astro landing. Some (voice, links) apply to both.

---

## Locked-in decisions

These were debated and resolved. Don't re-open them without new information.

### 1. Native-language labels for languages — no flag emoji

Use `Español`, `日本語`, `Українська`. Never country flags. Reasons:

- Flags map to countries, not languages. Spanish, Portuguese, English, Chinese, Korean each have multiple candidate flags; none is neutral.
- Windows does not render flag emoji — visitors there see regional-indicator letter pairs in a box.
- Screen readers handle flag emoji unpredictably.
- Geopolitical edge cases (e.g., Russian-above-Ukrainian flag pairing) make some combinations actively harmful.

Full rationale at the top of [`src/lib/languages.ts`](src/lib/languages.ts).

### 2. Header is a dropdown, page-bottom is a tabs panel

Two surfaces, two different jobs:

- **Header** — compact dropdown. Header real estate is precious; switching languages is occasional. The trigger shows the current language; the 8 alternates are in a dropdown opened on hover/focus.
- **Page bottom** — full-width tabs panel, rendered by `BaseLayout` between `SiteFooter` and `PageFeedback`. Cream background, full-bleed hairline above, JetBrains Mono labels, green underline on active. The panel visually broadcasts that the site is internationalized — the signal the old header tabs used to provide — and sits as its own band, set apart from the columns above and the feedback strip below.

Both surfaces render their 8 `<a hreflang>` links in real DOM (see § 8). Don't fold the tabs back into `SiteFooter` columns — they were tried as a column and the panel reads better. Don't expand the header into tabs — the dropdown is intentional.

### 3. Hero GitHub line lives on its own row above the CTA buttons

The Hero CTAs (`Get AI skills for your agent`, `Install the CLI`) are tool-installation actions. The `Open-source on GitHub` link + star badge sits on its own line **above** the CTA buttons. Reasons:

- When the GitHub link sat *next to* "Install the CLI," it implied the open-source claim was about the CLI binary — not about the standard itself.
- Separating the rows reframes the page: this is an *open standard* (line 1) that ships with these tools (line 2).

The `<div class="hero__github">` element is intentional. Don't fold it back into `.hero__cta`.

### 4. Header describes the site's shape: `Specification · CLI · AI Skills · GitHub · [Lang ▾]`

The header should advertise *what the site offers*, not be a residual list of "places that aren't the homepage's pitch." Earlier this rule was the opposite ("header stays minimal — two items"); that was wrong and has been corrected. The Hero CTA is "do this now"; the header nav is "here's what exists." They do different jobs and are not redundant.

The four nav items (left → right = general → specific → external):

1. **Specification** *(singular, intentional)* — the canonical content (what SpecScore IS). Label promises a single confident thing ("the specification of SpecScore"); the destination is `/docs` (the welcoming hub with intro + role-based guides + links to the raw spec tree), not `/specifications` (the bare spec-tree index — kept available for power users via links from `/docs`). English-only URL for now.
2. **CLI** — the primary tool. Links to `/cli/` (locale-routed).
3. **AI Skills** — wrappers around the CLI for AI coding agents. Links to `/ai/` (locale-routed), the hub that lists all available Skills.
4. **GitHub** — open-source verification signal.

Then the **language dropdown** sits at the far right with the smallest visual weight, separated from the GitHub link by an extra `margin-left: 1rem` (vs the tighter `0.25rem` gap between regular nav links) so it reads as a distinct utility rather than a fifth nav item.

Don't:
- Use the plural "Specifications" in the nav label. The plural reads as "a catalog of documents to wade through"; the singular reads as "the spec." Locales with a singular/plural distinction (en, es, pt-br, ru, uk) all use the singular form. Locales whose nouns are mass-noun-ish (ja, zh-cn, ko) naturally don't carry the distinction.
- Point the Specification nav link at `/specifications`. It's the bare spec-tree index — fine destination for power users via internal links, wrong destination for a cold visitor clicking the header label. The header label should land them somewhere that *welcomes* them; `/docs` does that.
- Hard-code the Hero/FinalCta CTAs at a *leaf* like `/ai/specstudio-skills/`. Point them at the hub (`/ai/`) so the page auto-scales when more Skills ship.
- Mix product-area labels with marketing/category labels (e.g., adding "Pricing" or "Solutions"). The current four describe **technical surfaces** — keep that consistent.
- Rename "AI Skills" to "AI Plugins" without re-reading § 11 below — the products on `/ai/` are literally named "Skills" (SpecStudio Skills, CLI Skills), and "Skills" matches Anthropic's official term ("Agent Skills") plus broad cross-ecosystem usage (Alexa Skills, Watson Skills). "Plugin" appears in prose/title for SEO, but the product term is "Skills."
- Tie the `/ai/` page framing (title, h1, meta description) to a specific agent like "Claude Code." The page is the AI hub for *any* coding agent; community Skills for other agents may ship here later. Mention specific agents only in product cards where it's factually accurate.

### 5. No timeline claims about sibling projects

Don't write "specified with SpecScore from the ground up," "since day one," "since 2024," or similar for ecosystem projects in `Ecosystem.astro`. These claims are hard to verify and embarrassing to get wrong. State what the project *is*, not its history with us.

Wrong: "Go data-access layer specified with SpecScore from the ground up."
Right: "Go data-access layer specified with SpecScore."

### 6. Links to our own projects: no `rel="noopener"`, yes `target="_blank"`

Ecosystem cards (DALgo, inGitDB, SpecScore Studio) link out with `target="_blank"` only — no `rel="noopener"` or `rel="nofollow"`. We want to pass trust and link equity between sibling SpecScore-org projects.

Third-party external links keep the standard `rel="noopener"` for security.

---

## Code conventions

### 7. Per-locale variants, shared data and components

Each visible string lives in a per-locale Astro file: `Hero.astro` (base = English), `HeroEs.astro`, `HeroJa.astro`, etc. Eight files per section, eight sections, so a change to copy touches 8 files. Tradeoff accepted: explicit and grep-friendly beats a build-time string-injection layer.

**But:** data (locale list, locale detection, helpers) and **reusable components** (e.g., `FooterLanguages`) live in **one place** and are imported from both English and translated variants:

- `src/lib/languages.ts` — `langs` array, `localeFromPath`, `routeFromPath`, `localeHref`. Single source of truth for locales. Adding a 9th language: edit this file, add a `docsLabel` entry in `SiteHeader.astro`, add a `headings` entry in `FooterLanguages.astro`. Three small edits, not nine.
- `src/components/FooterLanguages.astro` — the 8-language footer column. All 8 `SiteFooter*.astro` variants render it as `<FooterLanguages currentLocale="XX" />`.

If you find yourself copy-pasting the same data or markup into 8 files, extract it.

### 8. Alternate-language links must be crawler-discoverable

The 8 `<a hreflang="…">` links must exist as real HTML in the DOM, not constructed by JS. CSS-hide is fine (the header dropdown does this), but Googlebot and friends rely on actual DOM links for `hreflang` discovery and crawl path entry.

Concretely: a "switch language" UI that fetches the list via JS, or that only renders the active link plus a fetch button, is broken for SEO. The pattern is `<ul><li><a hreflang lang>...</a></li></ul>`, always all 8 present.

### 9. Shared CSS lives in `src/styles/global.css`

When a class applies to **more than one** component (e.g., `.btn`, `.final-cta__*` used across all 8 FinalCta variants, `.site-footer__list` used across all 8 SiteFooter variants), the rule belongs in `global.css`.

Per-component `<style>` blocks are for **component-unique** rules only. Discovery: if you'd be copy-pasting the same CSS rule into 8 files, it's not a per-component style.

### 10. Component CSS uses BEM-ish naming

Block / element / modifier. Examples:

- `.hero` / `.hero__copy` / `.hero__github` / `.hero--narrow` (if it existed)
- `.final-cta` / `.final-cta__buttons` / `.final-cta__star`
- `.lang-switcher` / `.lang-switcher__menu` / `.lang-switcher__item.is-active`

This keeps selectors flat (one class deep), avoids specificity wars, and reads predictably. Don't introduce arbitrary nesting or utility classes without a reason.

---

## Voice and copy

### 11. Direct asks, no hedging

The site asks readers to do things (star the repo, install the CLI, read the docs). Make the ask in one sentence. State the outcome, not feelings about receiving it.

Wrong: "If you happen to find this useful and wouldn't mind, we'd really appreciate it if you could maybe give us a star…"
Right: "Star us on GitHub. It helps others find the project."

Marketing voice details: [`marketing/voice-and-tone.md`](https://github.com/specscore/marketing/blob/main/voice-and-tone.md) (canonical for prose; this principle is the engineering shorthand).

### 12. Don't repeat principles you already have receipts on

When in doubt about a wording, pattern, or visual choice, the **marketing repo wins** (see [Where else design lives](#where-else-design-lives)). Don't invent new copy locally; if you need to translate or extend something, check marketing first.

---

## When in doubt

| Question | Source of truth |
|---|---|
| What colour is X? | [marketing/branding/palette.md](https://github.com/specscore/marketing/blob/main/branding/palette.md) |
| What does the homepage say in section Y? | [marketing/branding/website/homepage-copy.md](https://github.com/specscore/marketing/blob/main/branding/website/homepage-copy.md) |
| What's the IA / section order? | [marketing/branding/website/homepage-ia.md](https://github.com/specscore/marketing/blob/main/branding/website/homepage-ia.md) |
| How do we phrase X? | [marketing/voice-and-tone.md](https://github.com/specscore/marketing/blob/main/voice-and-tone.md) |
| Why this stack? Why no Astro for docs? | [`WEBSITE-STACK.md`](../../WEBSITE-STACK.md) |
| How is the Astro sub-project structured? | [`tools/landing/README.md`](README.md) |
| **Why this code-level convention?** | **This file** |

---

## Where else design lives

- **Brand register** (palette, hero composition, IA, copy): [`specscore/marketing/branding/`](https://github.com/specscore/marketing/tree/main/branding)
- **Voice and tone** (prose): [`specscore/marketing/voice-and-tone.md`](https://github.com/specscore/marketing/blob/main/voice-and-tone.md)
- **Build / deploy stack** (why we don't use Starlight, hosting model): [`WEBSITE-STACK.md`](../../WEBSITE-STACK.md)
- **Astro sub-project structure**: [`tools/landing/README.md`](README.md)

If a decision belongs in marketing (visual/brand/copy), it goes there. If it's about how the *code* is shaped or what conventions the codebase follows, it goes here. Don't duplicate.

---

## Known debt

### CSS duplication across product pages — pending consolidation per § 9

Several CSS classes that govern shared visual primitives are currently duplicated across page files instead of living in `global.css` as § 9 requires. This is real tech debt: every visual tweak has to land in 8 or 16 places, and the duplication has already caused one specificity bug (the validator-green border override on `.plugin-card--primary` was silently beaten by per-page scoped rules until the rules were consolidated into `global.css`).

**Inventory of shared-but-duplicated CSS:**

| Class family | Where duplicated | Count |
|---|---|---|
| `.hero`, `.hero__inner`, `.hero__copy`, `.hero__headline`, `.hero__sub`, `.hero__cta`, `.hero__art` | 8 `/cli/` pages | ~8× |
| `.section-title`, `.section-intro`, `.section-intro code`, `.prose-p` | All `/cli/` + `/ai/` pages | ~16× |
| `.qs-tabs`, `.qs-tab`, `.qs-panel`, `.qs-more` (install tabs) | 8 `/cli/` pages | ~8× |
| `.features-section`, `.features-grid`, `.feature-card*` | 8 `/cli/` pages | ~8× |
| `.agent-links` | 8 `/cli/` pages | ~8× |
| `.final-cta`, `.final-cta__inner`, `.final-cta__title`, `.final-cta__buttons` (product-page variant — separate from the `FinalCta` landing component) | 8 `/cli/` pages | ~8× |
| `.page-footer`, `.page-footer__inner`, `.page-footer__col`, `.page-footer__brand`, `.page-footer__tagline`, `.page-footer__copyright`, `.page-footer__heading`, `.page-footer__list` | 8 `/cli/` + 8 `/ai/` pages | ~16× |
| `@keyframes` (`fade-in`, `hero-copy-in`, `hero-art-in`) | 8 `/cli/` pages each | ~24× combined |

Conservatively, **~80+ lines of CSS duplicated across ~16–24 files.**

**Three-pass plan, smallest risk first:**

1. **Pass 1 — `.page-footer*`** (highest duplication, lowest visual-risk).
   - Move all `.page-footer*` to `global.css`. Strip from 16 files (`/cli/` + `/ai/`).
   - Expected visual diff: zero.
2. **Pass 2 — Section primitives + product-page Final CTA.**
   - `.section-title`, `.section-intro`, `.prose-p`, product-page `.final-cta*` → `global.css`.
   - Watch for collision with the landing `FinalCta` component; consolidate naming if both can share one rule set.
   - Strip from ~16 files.
3. **Pass 3 — Hero shared shape + features grid + install tabs.**
   - `.hero` + variants → `global.css`. Per-page overrides stay scoped if a page legitimately differs.
   - `.features-*`, `.qs-*`, `.agent-links`, animation keyframes → `global.css`.
   - Strip from ~8 files.

**Why we haven't done it yet.** Each pass is a cross-cutting refactor that needs visual verification per page per locale; mixing it into in-flight feature commits makes regressions hard to spot. Schedule it as its own dedicated session with before/after screenshots per page.

**When you pick it up:** start with Pass 1. After it lands cleanly with no visual diff, the rest become incremental.

---

## Open questions

None at this time.

# Footer consolidation — design

**Date:** 2026-05-29
**Status:** Approved (brainstorm)
**Branch:** `refactor/footer-consolidation`

## Goal

Replace the duplicated, divergent footers across the landing site with a single
shared `SiteFooter` component (per-locale variants), retiring the inline
`page-footer` tech debt and unifying footer content site-wide.

## Problem

Two footer implementations exist, and the inline ones are inconsistent even with
each other:

- **Shared `SiteFooter`** (+7 locale variants) — used by `/` home, `/faq/`,
  `/ai/specstudio-skills/`. Columns: Brand · Product (Docs/Linter/Examples/Compare)
  · Learn · Community (GitHub/Contributing/License).
- **Inline `<footer class="page-footer">`** — hand-copied into **65** page files
  (`/ai/*`, `/cli/*`, `/vs/*`, `/validators/`, all locales). Columns vary:
  `/cli/` heads "SpecScore CLI" (Install/GitHub/Releases) + Ecosystem; `/vs/` uses
  "Product" (CLI/Install/GitHub) + Ecosystem; `/validators/` uses "SpecScore CLI"
  (Overview/Install/GitHub) + Ecosystem. Each carries its own `.page-footer*` CSS
  (DESIGN-PRINCIPLES "Known debt").

## Decisions

### Canonical footer content — `Brand · Product · Learn · Community`

- **Brand:** wordmark + 2-sentence tagline + copyright (unchanged).
- **Product:** Docs (`/docs`) · CLI (`/cli/`) · AI Skills (`/ai/`) · Compare (`/vs/`).
  (Mirrors the header's site-shape. Changes today's home-footer Product list.)
- **Learn:** Spec-Driven Development (`/spec-driven-development/`). Grows with future
  `/learn/*` guides.
- **Community:** GitHub · Contributing · License.
- **Dropped** (per the "drop Ecosystem" decision): standalone SpecStudio Skills
  (reached via AI Skills), **SpecScore Studio**, Releases, Install, and the redundant
  "SpecScore — the open standard" (wordmark already links home).

### Architecture

- The existing `SiteFooter` + 7 locale variants (`SiteFooterEs`, …) become **the**
  footer for every page.
- Each inline `<footer class="page-footer">` (65 files) is replaced with
  `<SiteFooter<Locale> />` (import + render), matching the locale of the page.
- The orphaned `.page-footer*` scoped CSS is **deleted** from those 65 files —
  fully retiring that "Known debt" entry (no move to `global.css` needed).
- Per-locale-variant convention (§7) preserved. SiteFooter scoped styles stay as-is.
- Composition is unchanged: the footer sits after `</main>` and before BaseLayout's
  appended language-tabs + PageFeedback (same slot the inline footer occupied).

### Migration

- Per page/locale: swap footer import+render, delete that file's `.page-footer*` CSS.
- Update the shared `SiteFooter` (8 variants) Product column to the canonical set.
- Guard: some pages (e.g. `*/ai/specstudio-skills/`) may already import `SiteFooter`
  *and* carry an inline `page-footer`; ensure each page ends with exactly **one**
  footer.

### Verification

- `pnpm build` clean.
- `grep -r 'page-footer' src/` → **zero** matches (markup and CSS gone).
- Every page renders its locale `SiteFooter` (exactly one footer per page).
- Visual spot-check: one page per type (`cli`, `ai`, `vs`, `validators`, `faq`) ×
  English + one RTL-free non-Latin locale (e.g. `ja`) + one Cyrillic (`ru`).

## Expected visible changes

`/cli/`, `/vs/`, `/validators/` (all locales) lose the Ecosystem column, gain Learn +
Community, and their Product links change. The home/faq Product list changes to the
canonical set. This is the intended unification.

## Out of scope

- Other duplicated CSS in DESIGN-PRINCIPLES "Known debt" (`.hero`, `.section-*`,
  `.features-*`, `.qs-*`, animations) — footers only.
- The locale **translation refinement** (native SDD term + native AI acronym across
  all 7 locales) — separate queued task on its own branch.
- Building `/learn/*` cluster pages.

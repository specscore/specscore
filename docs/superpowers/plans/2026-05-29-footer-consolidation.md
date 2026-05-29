# Footer Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every inline `<footer class="page-footer">` across the landing site with the shared per-locale `SiteFooter` component, retire the orphaned `.page-footer*` CSS, and unify footer content to one canonical column set.

**Architecture:** The existing `SiteFooter` + 7 locale variants become the only footer. Each page that currently inlines a footer imports and renders its matching `SiteFooter<Locale>` instead; the inline markup and its `.page-footer*` CSS are deleted. The canonical Product column is updated in all 8 variants. No new components; per-locale-variant convention (§7) preserved.

**Tech Stack:** Astro 5 (static), pnpm, plain CSS. No test framework — verification is `pnpm build` + `grep`.

---

## Source spec
`docs/superpowers/specs/2026-05-29-footer-consolidation-design.md` — read first.

## Conventions (DESIGN-PRINCIPLES.md)
- §7 per-locale variants; §9 shared CSS in global.css; §14 root-relative same-site links.
- `/docs`, `/docs/*` are the English-only docs site — they are NOT locale-prefixed (leave as `/docs`).
- All paths below are relative to `tools/landing/`. Build from `tools/landing/`: `pnpm build`.

## Locale → variant map
| path prefix | locale | SiteFooter variant |
|-------------|--------|--------------------|
| (none) | en | `SiteFooter` |
| `/es` | es | `SiteFooterEs` |
| `/pt-br` | pt-br | `SiteFooterPtBr` |
| `/ru` | ru | `SiteFooterRu` |
| `/uk` | uk | `SiteFooterUk` |
| `/ja` | ja | `SiteFooterJa` |
| `/zh-cn` | zh-cn | `SiteFooterZhCn` |
| `/ko` | ko | `SiteFooterKo` |

---

## Task 1: Update the canonical Product column in all 8 SiteFooter variants

**Files:** `src/components/SiteFooter.astro` + `SiteFooter{Es,PtBr,Ru,Uk,Ja,ZhCn,Ko}.astro`

Currently the Product column lists: Docs (`/docs`) · Linter (`/docs/cli`) · Examples (`/docs/examples`) · Compare (`/{prefix}/vs/`). Canonical target: **Docs · CLI · AI Skills · Compare**. So in each variant: **keep** the Docs `<li>` and the Compare `<li>`; **replace** the Linter and Examples `<li>`s with CLI and AI Skills.

- [ ] **Step 1: Edit each variant's Product column**

In each file, replace these two lines:
```html
        <li><a href="/docs/cli">{Linter-label}</a></li>
        <li><a href="/docs/examples">{Examples-label}</a></li>
```
with (substitute per the table below):
```html
        <li><a href="{CLI-href}">CLI</a></li>
        <li><a href="{AISkills-href}">{AISkills-label}</a></li>
```

| variant | CLI-href | AISkills-href | AISkills-label |
|---------|----------|---------------|----------------|
| SiteFooter | `/cli/` | `/ai/` | AI Skills |
| SiteFooterEs | `/es/cli/` | `/es/ai/` | Skills de IA |
| SiteFooterPtBr | `/pt-br/cli/` | `/pt-br/ai/` | Skills de IA |
| SiteFooterRu | `/ru/cli/` | `/ru/ai/` | AI-скилы |
| SiteFooterUk | `/uk/cli/` | `/uk/ai/` | AI-скіли |
| SiteFooterJa | `/ja/cli/` | `/ja/ai/` | AIスキル |
| SiteFooterZhCn | `/zh-cn/cli/` | `/zh-cn/ai/` | AI 技能 |
| SiteFooterKo | `/ko/cli/` | `/ko/ai/` | AI 스킬 |

(CLI label stays "CLI" in every locale per the header convention. AI Skills labels match SiteHeader's `aiSkillsLabel` map. Keep the Docs `<li>` href `/docs` unchanged; keep the Compare `<li>` unchanged.)

- [ ] **Step 2: Build**

Run: `pnpm build`
Expected: succeeds, 89 pages.

- [ ] **Step 3: Verify the canonical Product column rendered**

Run:
```bash
grep -q 'href="/cli/">CLI<' dist/index.html && grep -q 'href="/ai/">AI Skills<' dist/index.html && \
! grep -q 'href="/docs/cli"' dist/index.html && \
grep -q 'href="/ru/cli/">CLI<' dist/ru/index.html && echo PASS || echo FAIL
```
Expected: `PASS`

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteFooter*.astro
git commit -m "refactor(landing): unify SiteFooter Product column (Docs/CLI/AI Skills/Compare)"
```

---

## Task 2: Migrate all inline `page-footer` pages to the shared component

**Files:** every file matching `grep -rl 'class="page-footer"' src/pages/` (≈65 files: `ai/`, `ai/cli-skills/`, `ai/specstudio-skills/`, `cli/`, `cli/install/`, `vs/`, `vs/openspec/`, `validators/` — across en + 7 locales).

Process **one locale group at a time**, committing after each, in this order: en, es, pt-br, ru, uk, ja, zh-cn, ko. For en, the files have no path prefix; for a locale `XX`, they live under `src/pages/XX/...`.

### Per-file procedure (apply to each matching file)

1. **Determine the variant** from the path prefix (locale→variant map above).
2. **Ensure the correct import exists.** The file already imports `SiteHeader` at some relative depth, e.g. `import SiteHeader from '../../components/SiteHeader.astro';`. Add (or correct) an import of the locale variant at the **same depth**, e.g. `import SiteFooterRu from '../../components/SiteFooterRu.astro';`.
   - Note: `ai/specstudio-skills/` pages already import a `SiteFooter` (often the English one, and currently unused). Replace that import with the correct **locale** variant for that page, and remove any duplicate/unused footer import.
3. **Replace the inline footer markup.** Delete the entire block from `<footer class="page-footer">` through its matching `</footer>` and put the component render in its place, e.g. `<SiteFooterRu />`.
4. **Delete the `.page-footer*` CSS** from that file's `<style>` block (every rule whose selector starts with `.page-footer`). Leave all other styles untouched.
5. **Exactly one footer.** Confirm the file now renders exactly one `<SiteFooter<Locale> />` and has no remaining `page-footer` reference (markup or CSS).

### Steps

- [ ] **Step 1: Migrate the `en` group, then build + verify + commit**

After editing all en files (no prefix), run:
```bash
pnpm build
# en page-types now render the shared footer and no inline footer remains:
for p in ai cli vs validators; do grep -q 'site-footer__list' dist/$p/index.html && ! grep -q 'page-footer' dist/$p/index.html && echo "$p OK" || echo "$p FAIL"; done
```
Expected: all `OK`. Then:
```bash
git add -A && git commit -m "refactor(landing): use shared SiteFooter on English content pages"
```

- [ ] **Step 2: Migrate each locale group (es, pt-br, ru, uk, ja, zh-cn, ko)**

For each locale `XX` with variant `SiteFooterYY`: apply the per-file procedure to all `src/pages/XX/**` matching files, then:
```bash
pnpm build
for p in ai cli vs validators; do grep -q 'site-footer__list' dist/XX/$p/index.html && ! grep -q 'page-footer' dist/XX/$p/index.html && echo "XX/$p OK" || echo "XX/$p FAIL"; done
git add -A && git commit -m "refactor(landing): use shared SiteFooter on XX content pages"
```
Expected: all `OK` per locale before committing.

---

## Final verification (after all groups)

- [ ] **Zero `page-footer` anywhere in source:**
```bash
grep -rl 'page-footer' src/ ; echo "exit=$?"
```
Expected: no output, `exit=1` (grep found nothing).

- [ ] **Build clean & page count unchanged:**
```bash
pnpm build
```
Expected: succeeds, 89 pages (no pages lost).

- [ ] **Exactly one footer per migrated page** (spot-check):
```bash
for f in dist/cli/index.html dist/ru/vs/index.html dist/ja/validators/index.html dist/ai/specstudio-skills/index.html; do echo -n "$f site-footers="; grep -c 'class="site-footer"' "$f"; done
```
Expected: each prints `1`.

- [ ] **Visual spot-check** (`pnpm dev`): one page per type (`/cli/`, `/ai/`, `/vs/`, `/validators/`, `/faq/`) plus `/ru/cli/` and `/ja/vs/` — footer renders 4 columns (Brand · Product · Learn · Community), correct localized labels, language tabs below, no broken layout at ≤800px.

---

## Self-review notes (author)
- **Spec coverage:** canonical content (Product/Learn/Community) → Task 1 + the variants already carry Learn (from the pillar feature) and Community; inline→shared migration + CSS deletion → Task 2; "exactly one footer" guard (specstudio-skills dead import) → Task 2 procedure step 2/5 + final spot-check; zero-`page-footer` → final verification. Brand/tagline already shared (no change). Dropped Ecosystem/Studio/Releases/Install links → achieved by replacing inline footers wholesale with SiteFooter (which has none of them).
- **Type consistency:** variant names match the locale→variant map throughout; CLI/AI Skills hrefs are locale-prefixed; `/docs` left unprefixed per convention.
- **Out of scope (unchanged):** other "Known debt" CSS (`.hero`, `.section-*`, `.qs-*`, etc.); the translation refinement task; `/learn/*` pages.

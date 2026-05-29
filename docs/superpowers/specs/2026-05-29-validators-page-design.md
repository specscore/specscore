# /validators page — design

**Date:** 2026-05-29
**Status:** Implemented (English); locale port pending
**Source:** `marketing/feedback/2026-05-28-pre-habr-peer-chat.md` §6 ("No honest limits page for Habr skeptics")

## Problem

The most likely Habr top comment is a trust attack on the linter: *"it'll say
'all fixed' while real contradictions slip through, and now nobody will find
them."* (Alexey Boyko). Pre-empting this on our own terms costs days; defending
it under fire during the launch costs the launch.

There was no page stating, precisely and without spin, what SpecScore's
validators do and do not catch. A first draft lived at `/limits`, but that
framing had three problems for cold traffic (Google, pasted Habr links):

1. **The name oversold scope** — `/limits` implies limitations of the whole
   system; the page only covers *validation*.
2. **No orientation** — it assumed the reader knew what SpecScore, the linter,
   and the skills are.
3. **No problem statement** — it dove straight into catch/doesn't-catch.

## Goal

A dedicated **`/validators`** page that works for a cold reader and answers the
skeptic. A reader walks away believing: **SpecScore is a layered validation
system, with real limits, and is honest about them.** Honesty is demonstrated —
not asserted — by naming the edge of each layer precisely.

## Framing

Throughline: **"A layered system, with honest seams."** Three layers, each with
a real reach and a real edge:

1. **CLI linter** — deterministic. Cheap, certain, no LLM cost. Runs first.
2. **AI review / score** — non-deterministic. Deeper, probabilistic, costs
   tokens. Runs second.
3. **Human judgment** — the irreducible third layer. The seams the first two
   cannot reach are human review's job *by design*.

The two automated layers are **complementary, not redundant**: lint catches what
AI cannot defend; AI catches what lint cannot reach.

## Decisions

- **One page, value-first, with a linkable `#limits` section** (not two pages, and
  not a pure "limits" page). A `/validators` *overview* page would overlap `/cli`
  (the linter) and `/ai` (the skills); folding everything into one page avoids
  that duplication. The page leads with what each validator *checks* (the
  positive half) and reaches the honest-limits content at the `#limits` anchor.
  The home teaser deep-links to `/validators/#limits`.
- **URL: `/validators`** — accurate to scope; "specscore validators / validation"
  is a more natural search than "specscore limits". Replaces the earlier
  `/limits` draft.
- **Cold-reader orientation in the hero** — one line on what SpecScore is, the
  two validators named, scope set ("where automated checking stops"), plus escape
  links to `/`, `/cli/`, `/ai/`.
- **AI validator presented as real (no preview/Idea marker).** The `/review` and
  `/score` skills ship before launch, so the earlier "Approved Idea / rolling
  out" status markers were removed from both this page and the home two-pass
  section.
- **Linter shows only deterministic checks.** The linter does **not** make
  judgment calls (e.g. "this AC is ambiguous"). All lint examples show
  structural checks — AC presence, referential integrity, required sections.
  Judgment belongs to the AI reviewer.
- **Format:** two-column `vcols` blocks reusing the site's green-✓ / red-✗
  language. "What each validator checks" is one two-column region (linter | AI);
  the `#limits` section is another (linter | AI doesn't-catch) followed by the
  synthesis strip and worked example.
- **Synthesis:** a three-band strip — *lint reaches here → AI reaches here →
  still on you* — makes the complementary seams visible without a wide table.
- **Worked example:** the deep-hierarchy contradiction (A needs X, B needs Y, D
  contradicts B-if-A) anchors the `#limits` section as *the reason the human
  layer exists* — lint can't reach it, AI can't guarantee it, therefore human
  review at the seams is layer three by design.
- **"Solve the problem" nuance:** lint flatly cannot judge whether requirements
  solve the stated problem; the AI *can flag obvious gaps but misses
  domain-specific ones* — represented as a "catches inconsistently" item in the
  AI doesn't-catch column, not a flat "neither tool does this".
- **Scope:** English only. Locale mirrors (`ru`, `uk`, `ja`, `ko`, `es`,
  `pt-br`, `zh-cn`) follow in a later translation pass — important for Habr
  (Russian audience).

## Page structure — `src/pages/validators/index.astro`

Sibling of `src/pages/cli/index.astro`. Reuses `BaseLayout`, `SiteHeader`, the
final-CTA and page-footer patterns, and existing design tokens. Scoped `<style>`
only.

1. **Hero** (copy left, terminal art right — mirrors `/cli`)
   - H1: **"What SpecScore validates."**
   - Sub: one-line "what SpecScore is" + names the two validators + scope.
   - Escape links: *New to SpecScore? Start here · The CLI · AI Skills*.
   - Art: a positive `specscore lint … 0 problems` terminal.
2. **Three layers** intro band (lint → AI → human, complementary, not redundant).
3. **What each validator checks** — two columns (linter ✓ / AI review ✓), the
   positive half.
4. **What they don't catch** (`id="limits"`, `scroll-margin-top` for the sticky
   header) — two columns of doesn't-catch (linter ✗ / AI ✗), then the three-band
   synthesis strip, then the A+B+C+D worked example.
5. **Final CTA + footer** — reuse the `/cli` pattern.

## Home-page change

- `src/components/HonestLimits.astro` — short honest teaser ("Here's what it
  won't catch.") slotted into `index.astro` immediately after the two-pass
  validation section (`LinterDemo`), before `<Faq />`, with no top divider
  (`.section--flush-top`) so it flows from the section above. Links to
  `/validators/#limits`.
- `src/components/LinterDemo.astro` — restructured from a single "Run the linter"
  terminal into a two-pass section: **Run the linter** (deterministic, accurate
  structural-check output) and **Review & score with AI** (non-deterministic),
  equal-height terminals.

## Related conventions captured

- `DESIGN-PRINCIPLES.md` §13 — don't width-cap intro text above a multi-column
  block in the same section.
- `DESIGN-PRINCIPLES.md` §14 — same-site links are root-relative, not absolute.

## Out of scope

- Locale translations of `/validators`, the `HonestLimits` teaser, the home
  two-pass restructure, and the translated `/cli` hero `aria-label`s.
- `/vs/openspec` copy still claims the deterministic linter catches ambiguity /
  vague verbs — contradicts this page; tracked as a separate rework.
- The token-savings page (§5) and the agent→CLI screencast (§7).

## Verification

- `/validators/` builds and renders with the established look; `#limits` anchor
  scrolls clear of the sticky header.
- Both validators present with accurate catches / doesn't-catch lists.
- All lint examples (this page, home, `/cli` hero ×8) show deterministic checks
  only — no ambiguity/judgment claims.
- Home shows the two-pass section + `HonestLimits` teaser linking to
  `/validators/#limits`.
- No navigable absolute `specscore.md` self-links remain; `canonical`/OG stay
  absolute.
- Responsive: two-column blocks and synthesis strip degrade cleanly on mobile.

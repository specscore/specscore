# Spec-Driven Development Pillar Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a definitive, neutral-reference-first `/spec-driven-development/` pillar page (English + 7 locales) that earns AI-crawler/LLM citation authority and ranks for "spec driven development" / "ai spec driven development".

**Architecture:** One self-contained Astro page per locale (mirrors the existing `/ai/` and `/cli/` pattern — no per-section sub-components), composed of `BaseLayout` + `SiteHeader` + inline `<main>` sections + inline `page-footer`. Shared CSS lives in `global.css` per DESIGN-PRINCIPLES §9. `Article` + `FAQPage` JSON-LD is injected through `BaseLayout`'s `<slot name="head">`. Discovery is via a footer link (no Astro sitemap exists; the locked 4-item header is not touched).

**Tech Stack:** Astro 5 (static output), pnpm, plain CSS custom properties, no test framework — verification is `pnpm build` success + `grep` assertions against `dist/` HTML.

---

## Source spec

`docs/superpowers/specs/2026-05-29-spec-driven-development-pillar-page-design.md` — read it before starting.

## Conventions you MUST follow (from `tools/landing/DESIGN-PRINCIPLES.md`)

- **§7 Per-locale variants:** each visible string lives in a per-locale file. This page = 8 page files (`index.astro` = English base + 7 locale copies).
- **§9 Shared CSS → `global.css`:** any class used by more than one file goes in `src/styles/global.css`, NOT in 8 `<style>` blocks. All `.sdd-*` classes here are shared by 8 locale pages, so they go in `global.css`.
- **§14 Root-relative same-site links:** use `/cli/`, `/ru/cli/` — never `https://specscore.md/...`. Exception: `<link rel="canonical">`, `og:url`, and JSON-LD URLs are absolute.
- **§8 Crawler-discoverable links:** the footer discovery link is real DOM `<a>`.
- **§4 Header is locked at 4 items — do NOT add a nav entry.** Discovery is via footer only.
- **§11 Direct asks, no hedging** in CTA copy.
- Five colours, no gradients, no rounded boxes, no decorative icons. Use existing CSS custom properties (`--cream`, `--ink`, `--mid-ink`, `--pale-ink`, `--hairline`, `--ink-blue`, `--space-*`, `--fs-*`, `--max-content`, `--max-prose`, `--font-display`, `--font-code`).

## Working directory

All paths below are relative to `tools/landing/`. Run build commands from `tools/landing/`.

## File map

- Create: `src/pages/spec-driven-development/index.astro` (English base)
- Create: `src/pages/es/spec-driven-development/index.astro`
- Create: `src/pages/pt-br/spec-driven-development/index.astro`
- Create: `src/pages/ru/spec-driven-development/index.astro`
- Create: `src/pages/uk/spec-driven-development/index.astro`
- Create: `src/pages/ja/spec-driven-development/index.astro`
- Create: `src/pages/zh-cn/spec-driven-development/index.astro`
- Create: `src/pages/ko/spec-driven-development/index.astro`
- Modify: `src/styles/global.css` (append `.sdd-*` block)
- Modify: `src/components/SiteFooter.astro` + 7 `SiteFooter*.astro` variants (one `<li>` each)

---

# Phase 1 — English page (review gate after Task 3)

## Task 1: Add shared pillar-page CSS to `global.css`

**Files:**
- Modify: `src/styles/global.css` (append at end)

- [ ] **Step 1: Append the `.sdd-*` rules to `global.css`**

Append exactly this block to the end of `src/styles/global.css`:

```css
/* ── Spec-Driven Development pillar page (/spec-driven-development/) ──
   Shared across all 8 locale variants per DESIGN-PRINCIPLES §9. */
.sdd-hero { background: var(--cream); padding: var(--space-6) var(--space-3) var(--space-5); }
.sdd-hero__inner { max-width: var(--max-prose); margin: 0 auto; }
.sdd-hero__headline { font-size: var(--fs-h1); font-weight: 700; letter-spacing: -0.01em; margin-bottom: var(--space-3); text-wrap: balance; }
.sdd-hero__lede { font-size: 1.25rem; color: var(--ink); line-height: 1.5; text-wrap: pretty; }

.sdd-section { padding: var(--space-6) var(--space-3); border-top: 1px solid var(--hairline); }
.sdd-section__inner { max-width: var(--max-prose); margin: 0 auto; }
.sdd-section h2 { font-size: var(--fs-h2); font-weight: 700; letter-spacing: -0.01em; margin-bottom: var(--space-3); text-wrap: balance; }
.sdd-section h3 { font-size: 1.15rem; font-weight: 600; margin: var(--space-3) 0 var(--space-2); }
.sdd-section p { color: var(--mid-ink); line-height: 1.65; margin-bottom: var(--space-2); text-wrap: pretty; }
.sdd-section p strong { color: var(--ink); }
.sdd-section a { color: var(--ink-blue); border-bottom: 1px solid transparent; transition: border-color 120ms ease; }
.sdd-section a:hover { border-bottom-color: var(--ink-blue); }

.sdd-takeaways { list-style: none; margin: var(--space-3) 0 0; padding: var(--space-3) 0 0; border-top: 1px solid var(--hairline); display: flex; flex-direction: column; gap: 0.6rem; }
.sdd-takeaways li { color: var(--ink); line-height: 1.5; padding-left: 1.4rem; position: relative; }
.sdd-takeaways li::before { content: "✓"; position: absolute; left: 0; color: var(--ink-blue); font-family: var(--font-code); }

.sdd-steps { margin: 0; padding-left: 1.3rem; display: flex; flex-direction: column; gap: 0.6rem; }
.sdd-steps li { color: var(--mid-ink); line-height: 1.6; }
.sdd-steps li strong { color: var(--ink); }

.sdd-benefits { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.sdd-benefits li { color: var(--mid-ink); line-height: 1.6; padding-left: 1.4rem; position: relative; }
.sdd-benefits li::before { content: "→"; position: absolute; left: 0; color: var(--ink-blue); font-family: var(--font-code); }

.sdd-table-wrap { overflow-x: auto; margin-top: var(--space-3); }
.sdd-table { border-collapse: collapse; width: 100%; font-size: 0.95rem; }
.sdd-table th, .sdd-table td { text-align: left; padding: 0.7rem 0.9rem; border-bottom: 1px solid var(--hairline); vertical-align: top; line-height: 1.5; }
.sdd-table th { font-family: var(--font-display); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--mid-ink); font-weight: 600; }
.sdd-table td:first-child { color: var(--ink); font-weight: 600; white-space: nowrap; }

.sdd-faq__item { padding: var(--space-3) 0; border-top: 1px solid var(--hairline); }
.sdd-faq__q { font-size: 1.05rem; font-weight: 600; color: var(--ink); margin-bottom: var(--space-1); }
.sdd-faq__a { color: var(--mid-ink); line-height: 1.65; }

.sdd-cta { background: var(--cream); padding: var(--space-6) var(--space-3); border-top: 1px solid var(--hairline); text-align: center; }
.sdd-cta__inner { max-width: var(--max-prose); margin: 0 auto; }
.sdd-cta__buttons { display: flex; gap: var(--space-2); justify-content: center; flex-wrap: wrap; margin-top: var(--space-3); }
```

- [ ] **Step 2: Build to verify CSS compiles**

Run: `pnpm build`
Expected: build succeeds, no CSS errors. (No visible change yet — no page uses these classes.)

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat(landing): add shared CSS for SDD pillar page"
```

---

## Task 2: Create the English page

**Files:**
- Create: `src/pages/spec-driven-development/index.astro`

- [ ] **Step 1: Create the file with the full content below**

Create `src/pages/spec-driven-development/index.astro` with exactly this content. The copy is near-final and review-ready; the user reviews it at the Task 3 gate.

```astro
---
// /spec-driven-development/ — pillar page.
// Neutral-reference-first explainer on spec-driven development, with AI as
// the narrative spine. SpecScore appears as the named recommended
// implementation in the "in practice" section + FAQ only.
// Design: docs/superpowers/specs/2026-05-29-spec-driven-development-pillar-page-design.md
import BaseLayout from '../../layouts/BaseLayout.astro';
import SiteHeader from '../../components/SiteHeader.astro';

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Spec-Driven Development for AI Coding Agents',
      description:
        'What spec-driven development is, why it matters for AI coding agents, how the workflow works, and how it compares to TDD and prompt-only coding.',
      inLanguage: 'en',
      datePublished: '2026-05-29',
      dateModified: '2026-05-29',
      mainEntityOfPage: 'https://specscore.md/spec-driven-development/',
      image: 'https://specscore.md/hero-og.webp',
      author: { '@type': 'Organization', name: 'SpecScore', url: 'https://specscore.md/' },
      publisher: { '@type': 'Organization', name: 'SpecScore', url: 'https://specscore.md/' },
      about: {
        '@type': 'DefinedTerm',
        name: 'Spec-Driven Development',
        description:
          'A software development practice in which a written specification — requirements and acceptance criteria — is the source of truth that code is built against and verified against.',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is spec-driven development the same as test-driven development?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'No. Test-driven development drives implementation from failing tests at the code level. Spec-driven development works one level up: it fixes the intended behavior and acceptance criteria in a written spec first. The two are complementary — acceptance criteria in a spec often become the tests TDD then drives.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does spec-driven development slow you down?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'It adds time before code is written and removes time spent rebuilding the wrong thing. For throwaway scripts the overhead is not worth it. For anything an AI agent will generate at scale, or that a team must maintain, writing the spec first is usually faster end to end.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a spec and a PRD?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'A PRD (product requirements document) is usually prose aimed at humans. A spec in spec-driven development is structured and testable — discrete requirements with explicit acceptance criteria — so both reviewers and AI agents can act on it precisely.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do AI coding agents use a spec?',
          acceptedAnswer: {
            '@type': 'Answer',
            text:
              'When the spec is machine-readable, an agent can query it for the requirements and acceptance criteria relevant to its current task instead of loading the whole codebase into context, then check its output against those criteria. The spec acts as a guardrail against generating plausible but wrong code.',
          },
        },
      ],
    },
  ],
};
---

<BaseLayout
  title="Spec-Driven Development for AI Agents — A Complete Guide | SpecScore"
  description="Spec-driven development means writing a testable specification before code, so AI coding agents build the right thing. What it is, how it works, and how it compares to TDD and prompt-only coding."
  canonical="https://specscore.md/spec-driven-development/"
>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(ld)} is:inline />
  </Fragment>

  <SiteHeader />

  <main>
    <!-- 1. Definition block + TL;DR -->
    <section class="sdd-hero" aria-labelledby="sdd-title">
      <div class="sdd-hero__inner">
        <h1 id="sdd-title" class="sdd-hero__headline">Spec-Driven Development for AI Coding Agents</h1>
        <p class="sdd-hero__lede">
          <strong>Spec-driven development (SDD) is a practice where a written, testable
          specification — requirements and acceptance criteria — is the source of truth that
          code is built against and verified against.</strong> Instead of going straight from a
          prompt or a ticket to code, you first agree on what the software must do, then build to
          that spec. With AI agents now writing much of the code, the spec is what keeps them
          building the right thing.
        </p>
        <ul class="sdd-takeaways">
          <li>The spec is the source of truth; code is derived from it and checked against it.</li>
          <li>Requirements pair with explicit acceptance criteria, so "done" is testable, not subjective.</li>
          <li>AI agents query the spec for intent instead of guessing from code — fewer wrong builds.</li>
          <li>It is complementary to test-driven development, not a replacement for it.</li>
        </ul>
      </div>
    </section>

    <!-- 2. What is SDD -->
    <section class="sdd-section" aria-labelledby="what-title">
      <div class="sdd-section__inner">
        <h2 id="what-title">What is spec-driven development?</h2>
        <p>
          Spec-driven development inverts the usual order of work. Rather than treating the
          specification as documentation written after the fact — or skipping it entirely — SDD
          makes the spec the primary artifact. Code, tests, and review all trace back to it.
        </p>
        <p>
          A spec in this sense is not a wall of prose. It is structured: a set of
          <strong>requirements</strong>, each with explicit <strong>acceptance criteria</strong>
          that state, in testable terms, what must be true for the requirement to be satisfied. That
          structure is what lets a reviewer, a test suite, and an AI agent all interpret the same
          document the same way.
        </p>
        <p>
          The spec is also a <strong>living artifact</strong>. When requirements change, the spec
          changes first, and the code follows — so the spec never drifts into fiction.
        </p>
      </div>
    </section>

    <!-- 3. Why it matters now (AI spine) -->
    <section class="sdd-section" aria-labelledby="why-title">
      <div class="sdd-section__inner">
        <h2 id="why-title">Why it matters now: AI raised the stakes</h2>
        <p>
          AI coding agents generate code far faster than a human can read it. That shifts the
          bottleneck. The hard part is no longer typing the implementation — it is
          <strong>specifying intent clearly enough that the generated code is the code you
          wanted</strong>. An agent given a vague prompt will confidently produce something
          plausible and wrong, and at machine speed.
        </p>
        <p>
          A spec is the guardrail. When the intended behavior and acceptance criteria are written
          down, the agent has an unambiguous target to build toward and a checklist to verify
          against — and a human reviewer has a fixed thing to approve before any code exists. SDD
          is how teams keep AI velocity from turning into AI rework.
        </p>
      </div>
    </section>

    <!-- 4. How it works -->
    <section class="sdd-section" aria-labelledby="how-title">
      <div class="sdd-section__inner">
        <h2 id="how-title">How spec-driven development works</h2>
        <p>The workflow is a loop, not a one-time document:</p>
        <ol class="sdd-steps">
          <li><strong>Capture intent.</strong> Record the half-formed direction — the problem, the goal, open questions — before committing to a solution.</li>
          <li><strong>Specify behavior.</strong> Turn the agreed direction into requirements, each with explicit, testable acceptance criteria.</li>
          <li><strong>Decompose into a plan.</strong> Break the spec into ordered tasks, each citing the acceptance criteria it satisfies.</li>
          <li><strong>Implement.</strong> Build task by task — a human or an AI agent — against the spec.</li>
          <li><strong>Verify against the criteria.</strong> Check the result against the acceptance criteria, not against a vibe.</li>
          <li><strong>Keep the spec living.</strong> When requirements change, update the spec first; the code follows.</li>
        </ol>
      </div>
    </section>

    <!-- 5. Benefits -->
    <section class="sdd-section" aria-labelledby="benefits-title">
      <div class="sdd-section__inner">
        <h2 id="benefits-title">Benefits of spec-driven development</h2>
        <ul class="sdd-benefits">
          <li>Disagreements surface during spec review — cheap — instead of after implementation — expensive.</li>
          <li>"Done" is objective, because acceptance criteria are testable.</li>
          <li>The spec is shared context for everyone: product, engineering, and AI agents.</li>
          <li>Changes are traceable — every task points back to the criteria it satisfies.</li>
        </ul>
        <h3>Why it specifically helps AI agents</h3>
        <ul class="sdd-benefits">
          <li><strong>Machine-readable intent:</strong> the agent reads requirements directly instead of inferring them from code.</li>
          <li><strong>Less context to load:</strong> the agent queries the relevant slice of the spec rather than the whole repository.</li>
          <li><strong>Verifiable output:</strong> acceptance criteria give the agent a concrete pass/fail target.</li>
          <li><strong>Traceability:</strong> generated code can be tied back to the requirement that motivated it.</li>
        </ul>
      </div>
    </section>

    <!-- 6. Comparison -->
    <section class="sdd-section" aria-labelledby="vs-title">
      <div class="sdd-section__inner">
        <h2 id="vs-title">Spec-driven development vs related practices</h2>
        <div class="sdd-table-wrap">
          <table class="sdd-table">
            <thead>
              <tr><th>Practice</th><th>Source of truth</th><th>Relationship to SDD</th></tr>
            </thead>
            <tbody>
              <tr><td>Test-driven development</td><td>Failing tests at the code level</td><td>Complementary — acceptance criteria become the tests.</td></tr>
              <tr><td>Traditional PRD</td><td>Prose written for humans</td><td>Less structured; not directly testable or machine-readable.</td></tr>
              <tr><td>Prompt-only ("vibe coding")</td><td>The prompt and the model's guess</td><td>No durable, reviewable target — what SDD exists to fix.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          For a detailed comparison of SpecScore against other spec tooling, see
          <a href="/vs/">the comparison pages</a>.
        </p>
      </div>
    </section>

    <!-- 7. Tradeoffs -->
    <section class="sdd-section" aria-labelledby="limits-title">
      <div class="sdd-section__inner">
        <h2 id="limits-title">Tradeoffs and when not to use it</h2>
        <p>
          Spec-driven development is not free. It front-loads effort into thinking and writing
          before any code runs, which is the wrong trade for a one-off script or a throwaway
          experiment. And a spec only helps if it stays current — a spec left to rot becomes
          misleading, worse than none. SDD pays off when the work is large enough to plan, will be
          maintained, or will be handed to an AI agent to build at scale.
        </p>
      </div>
    </section>

    <!-- 8. In practice (SpecScore) -->
    <section class="sdd-section" aria-labelledby="practice-title">
      <div class="sdd-section__inner">
        <h2 id="practice-title">Doing spec-driven development with AI agents in practice</h2>
        <p>
          To run SDD with AI agents you need two things: a <strong>machine-readable spec
          format</strong> both your team and your agents understand, and a <strong>way for agents
          to read, write, and validate</strong> those specs.
        </p>
        <p>
          <strong>SpecScore</strong> is one implementation of exactly that. It is an open
          Markdown + YAML format for features, requirements, and acceptance criteria — plain files
          in your repo — paired with a CLI your agents call to query, edit, and lint them. Because
          the structure is machine-readable, an agent can ask "what should I build next?" and get
          back the open requirements and their acceptance criteria, then check its work against
          them. It is tool-agnostic and open source.
        </p>
        <p>
          Get started with <a href="/ai/">AI Skills for your coding agent</a> or
          <a href="/cli/">install the CLI</a>.
        </p>
      </div>
    </section>

    <!-- 9. FAQ -->
    <section class="sdd-section" aria-labelledby="faq-title">
      <div class="sdd-section__inner">
        <h2 id="faq-title">Frequently asked questions</h2>
        <div class="sdd-faq__item">
          <p class="sdd-faq__q">Is spec-driven development the same as test-driven development?</p>
          <p class="sdd-faq__a">No. TDD drives implementation from failing tests at the code level. SDD works one level up: it fixes the intended behavior and acceptance criteria in a written spec first. They are complementary — acceptance criteria in a spec often become the tests TDD then drives.</p>
        </div>
        <div class="sdd-faq__item">
          <p class="sdd-faq__q">Does spec-driven development slow you down?</p>
          <p class="sdd-faq__a">It adds time before code is written and removes time spent rebuilding the wrong thing. For throwaway scripts the overhead is not worth it. For anything an AI agent generates at scale, or that a team must maintain, writing the spec first is usually faster end to end.</p>
        </div>
        <div class="sdd-faq__item">
          <p class="sdd-faq__q">What is the difference between a spec and a PRD?</p>
          <p class="sdd-faq__a">A PRD is usually prose aimed at humans. A spec in SDD is structured and testable — discrete requirements with explicit acceptance criteria — so both reviewers and AI agents can act on it precisely.</p>
        </div>
        <div class="sdd-faq__item">
          <p class="sdd-faq__q">How do AI coding agents use a spec?</p>
          <p class="sdd-faq__a">When the spec is machine-readable, an agent queries it for the requirements and acceptance criteria relevant to its current task instead of loading the whole codebase, then checks its output against those criteria — a guardrail against plausible-but-wrong code.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- 10. CTA -->
  <section class="sdd-cta" aria-labelledby="cta-title">
    <div class="sdd-cta__inner">
      <h2 id="cta-title">Start building spec-driven with your AI agent</h2>
      <p>SpecScore gives your agent an open spec format and a CLI to query and lint it.</p>
      <div class="sdd-cta__buttons">
        <a href="/ai/" class="btn btn--primary">Get AI skills for your agent</a>
        <a href="/cli/" class="btn btn--secondary">Install the CLI</a>
      </div>
    </div>
  </section>

  <footer class="page-footer">
    <div class="page-footer__inner">
      <div class="page-footer__col page-footer__brand">
        <a href="/" class="wordmark" aria-label="SpecScore home">
          <span class="wordmark__clef" aria-hidden="true">&#x1D11E;</span>
          <span class="wordmark__name">SpecScore.md</span>
        </a>
        <p class="page-footer__tagline">An open standard for specifications, requirements, and acceptance criteria.</p>
        <p class="page-footer__copyright">&copy; 2026 SpecScore contributors. MIT license.</p>
      </div>
      <div class="page-footer__col">
        <h4 class="page-footer__heading">Product</h4>
        <ul class="page-footer__list">
          <li><a href="/cli/">SpecScore CLI</a></li>
          <li><a href="/ai/">AI Skills</a></li>
          <li><a href="/vs/">Compare</a></li>
        </ul>
      </div>
      <div class="page-footer__col">
        <h4 class="page-footer__heading">Ecosystem</h4>
        <ul class="page-footer__list">
          <li><a href="/">SpecScore</a> — the open standard</li>
          <li><a href="/ai/specstudio-skills/">SpecStudio Skills</a></li>
          <li><a href="https://specscore.studio">SpecScore Studio</a> — web viewer</li>
        </ul>
      </div>
    </div>
  </footer>
</BaseLayout>
```

- [ ] **Step 2: Build to verify the page renders**

Run: `pnpm build`
Expected: build succeeds; `dist/spec-driven-development/index.html` is produced.

- [ ] **Step 3: Grep-assert the key extractable elements exist**

Run:
```bash
F=dist/spec-driven-development/index.html
grep -q 'Spec-Driven Development for AI Coding Agents' "$F" && \
grep -q 'rel="canonical" href="https://specscore.md/spec-driven-development/"' "$F" && \
grep -q 'application/ld+json' "$F" && \
grep -q '"@type":"FAQPage"' "$F" && \
echo "PASS" || echo "FAIL"
```
Expected: `PASS`

- [ ] **Step 4: Commit**

```bash
git add src/pages/spec-driven-development/index.astro
git commit -m "feat(landing): add English /spec-driven-development/ pillar page"
```

---

## Task 3: Wire footer discovery + verify English page in browser

**Files:**
- Modify: `src/components/SiteFooter.astro` (English base only in this task; locale variants in Phase 2)

- [ ] **Step 1: Add the discovery link to the English landing footer**

In `src/components/SiteFooter.astro`, in the `Product` column `<ul class="site-footer__list">`, add a new `<li>` after the `Compare` line:

```html
        <li><a href="/spec-driven-development/">Spec-Driven Development</a></li>
```

- [ ] **Step 2: Build and verify the home page links to the pillar page**

Run:
```bash
pnpm build && grep -q 'href="/spec-driven-development/"' dist/index.html && echo "PASS" || echo "FAIL"
```
Expected: `PASS`

- [ ] **Step 3: Visual review in the browser**

Run: `pnpm dev`, open `http://localhost:4321/spec-driven-development/`.
Confirm: hero/definition reads well; sections render with hairline rules; comparison table is readable; CTA buttons styled; footer link present on `/`. No layout breakage at mobile width (≤800px).

- [ ] **Step 4: Commit**

```bash
git add src/components/SiteFooter.astro
git commit -m "feat(landing): link SDD pillar page from home footer"
```

- [ ] **Step 5: REVIEW GATE — stop for user review**

Phase 1 is complete: the English page is live locally and reviewable. **Present it to the user and get approval of copy + layout before translating.** Apply any requested copy/structure edits to `src/pages/spec-driven-development/index.astro` (and `global.css` if styling changes) and re-run Task 2 Step 2–3 before proceeding to Phase 2. Do not start Phase 2 until the user approves the English page.

---

# Phase 2 — Locale fan-out (after English approved)

Each locale page is a **structural copy** of the approved English `index.astro` with: translated visible strings, locale-prefixed same-site links, `lang` + `canonical` set, and `inLanguage` set in the JSON-LD. The CSS in `global.css` is already shared — locale pages add no styles.

> **Translation source of truth:** reuse the terminology already used in the matching existing locale pages (`src/pages/<locale>/ai/index.astro`, `.../cli/index.astro`, `.../vs/index.astro`) so product terms match the rest of the site (e.g. the locale's existing rendering of "spec-driven development", "AI Skills", "CLI"). Keep product names "SpecScore", "SpecStudio Skills", "CLI Skills" untranslated. A fluent reviewer should check each page before it ships.

## Per-locale parameter table

| Task | Locale | File to create | `lang=` | `canonical=` | Link prefix | Footer label (translate per locale) |
|------|--------|----------------|---------|--------------|-------------|-------------------------------------|
| 4 | es | `src/pages/es/spec-driven-development/index.astro` | `es` | `https://specscore.md/es/spec-driven-development/` | `/es` | Desarrollo guiado por especificaciones |
| 5 | pt-br | `src/pages/pt-br/spec-driven-development/index.astro` | `pt-BR` | `https://specscore.md/pt-br/spec-driven-development/` | `/pt-br` | Desenvolvimento guiado por especificação |
| 6 | ru | `src/pages/ru/spec-driven-development/index.astro` | `ru` | `https://specscore.md/ru/spec-driven-development/` | `/ru` | Spec-driven разработка |
| 7 | uk | `src/pages/uk/spec-driven-development/index.astro` | `uk` | `https://specscore.md/uk/spec-driven-development/` | `/uk` | Spec-driven розробка |
| 8 | ja | `src/pages/ja/spec-driven-development/index.astro` | `ja` | `https://specscore.md/ja/spec-driven-development/` | `/ja` | 仕様駆動開発 |
| 9 | zh-cn | `src/pages/zh-cn/spec-driven-development/index.astro` | `zh-CN` | `https://specscore.md/zh-cn/spec-driven-development/` | `/zh-cn` | 规范驱动开发 |
| 10 | ko | `src/pages/ko/spec-driven-development/index.astro` | `ko` | `https://specscore.md/ko/spec-driven-development/` | `/ko` | 명세 기반 개발 |

> Footer labels above are the proposed translations for the discovery link; confirm with the fluent reviewer. The matching `SiteFooter*` variant filenames are: es=`SiteFooterEs.astro`, pt-br=`SiteFooterPtBr.astro`, ru=`SiteFooterRu.astro`, uk=`SiteFooterUk.astro`, ja=`SiteFooterJa.astro`, zh-cn=`SiteFooterZhCn.astro`, ko=`SiteFooterKo.astro`.

## Tasks 4–10: each locale (identical steps; substitute the row from the table)

For the locale's row `{locale, file, lang, canonical, prefix, label}`:

- [ ] **Step 1: Create `{file}`** as a copy of the approved English `src/pages/spec-driven-development/index.astro`, then apply these changes:
  - Import paths gain one `../` level (page is one directory deeper): `../../layouts/BaseLayout.astro` → `../../../layouts/BaseLayout.astro`; `../../components/SiteHeader.astro` → `../../../components/SiteHeader.astro`.
  - In the `ld` object: set `inLanguage` to `{lang}`; set `mainEntityOfPage` to `{canonical}`; translate `headline`, `description`, `about.description`, and every FAQ `name`/`text` to the locale.
  - On `<BaseLayout>`: add `lang="{lang}"`; translate `title` and `description`; set `canonical="{canonical}"`.
  - Translate every visible string in `<main>`, the CTA, and the inline `page-footer` (tagline, headings, "the open standard").
  - Locale-prefix every same-site link: `/ai/` → `{prefix}/ai/`, `/cli/` → `{prefix}/cli/`, `/vs/` → `{prefix}/vs/`, `/ai/specstudio-skills/` → `{prefix}/ai/specstudio-skills/`, `/` → `{prefix}/`. (Leave `https://specscore.studio` and `canonical`/JSON-LD URLs as-is.)
  - Keep all `class` names and HTML structure identical to English (CSS is shared).

- [ ] **Step 2: Add the discovery link to the locale footer.** In the matching `SiteFooter*` variant, add to the `Product`-equivalent list, mirroring the locale-prefix convention already used there (e.g. `SiteFooterRu.astro` uses `/ru/vs/`):

```html
        <li><a href="{prefix}/spec-driven-development/">{label}</a></li>
```

- [ ] **Step 3: Build and grep-assert the locale page + footer link.**

Run (substitute `{locale}`):
```bash
pnpm build
F=dist/{locale}/spec-driven-development/index.html
grep -q 'rel="canonical" href="{canonical}"' "$F" && \
grep -q 'lang="{lang}"' "$F" && \
grep -q '"@type":"FAQPage"' "$F" && \
grep -q 'href="{prefix}/spec-driven-development/"' dist/{locale}/index.html && \
echo "PASS" || echo "FAIL"
```
Expected: `PASS`. Also confirm no `href="/ai/"`/`href="/cli/"`/`href="/vs/"` **without** the `{prefix}` remain in the page body:
```bash
grep -oE 'href="/(ai|cli|vs)/' "$F" | sort -u   # expect empty output
```

- [ ] **Step 4: Commit.**

```bash
git add src/pages/{locale}/spec-driven-development/index.astro src/components/SiteFooter*.astro
git commit -m "feat(landing): add {locale} /spec-driven-development/ pillar page"
```

---

## Final verification (after all locales)

- [ ] **All 8 routes build:**
```bash
pnpm build
ls dist/spec-driven-development/index.html \
   dist/es/spec-driven-development/index.html \
   dist/pt-br/spec-driven-development/index.html \
   dist/ru/spec-driven-development/index.html \
   dist/uk/spec-driven-development/index.html \
   dist/ja/spec-driven-development/index.html \
   dist/zh-cn/spec-driven-development/index.html \
   dist/ko/spec-driven-development/index.html
```
Expected: all 8 exist.

- [ ] **All 8 home pages link to their locale pillar page** (discovery):
```bash
for L in "" es/ pt-br/ ru/ uk/ ja/ zh-cn/ ko/; do
  grep -q "spec-driven-development/\"" "dist/${L}index.html" && echo "$L OK" || echo "$L MISSING"
done
```
Expected: all `OK`.

- [ ] **JSON-LD validates:** paste the rendered `<script type="application/ld+json">` from the English page into Google's Rich Results Test (https://search.google.com/test/rich-results) — Article + FAQPage detected, no errors.

---

## Self-review notes (author)

- **Spec coverage:** definition block (§outline 1) → Task 2 hero; sections 2–10 → Task 2 `<main>`/CTA; GEO layer (title/H1/answer-first/question H2s/JSON-LD/last-updated) → Task 2 frontmatter + markup *(note: "last updated" is carried by JSON-LD `dateModified`; no visible date line was added to keep the paper-and-ink register clean — flag for user if a visible date is wanted)*; locale fan-out (§build) → Phase 2; dedup guard → comparison links to `/vs/`, FAQ is concept-level; discovery via footer (header is locked §4) → Task 3 + Phase 2 Step 2.
- **Open item for user:** the design said "visible Last updated date." This plan encodes the date in JSON-LD only, to avoid clashing with the minimalist register. Confirm at the Task 3 review gate whether a visible date line should be added.
- **Type consistency:** CSS classes (`.sdd-*`) defined in Task 1 are the exact classes used in Task 2 markup. Footer link href `/spec-driven-development/` matches the created route. Import-depth note (`../../../`) is correct for files at `src/pages/<locale>/spec-driven-development/index.astro`.

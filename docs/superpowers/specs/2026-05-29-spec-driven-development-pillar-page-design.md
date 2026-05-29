# Spec-Driven Development pillar page — design

**Date:** 2026-05-29
**Status:** Approved (brainstorm)
**Route:** `/spec-driven-development/` (+ 7 locale variants)

## Goal

A top-of-funnel **pillar page** that:

1. Explains what spec-driven development (SDD) is and why it matters — generically.
2. Positions SpecScore as the best way to do SDD with AI agents.

**Primary KPI:** trust/authority with **AI crawlers and models** (getting cited and
recommended by LLMs), not just human search rank. Human SEO is the secondary win.

**Target queries:** `spec driven development`, `ai spec driven development`,
`spec driven development ai` (the AI variants show as popular in Google Trends).

## Decisions (locked in brainstorm)

- **Slug:** `/spec-driven-development/` — clean, exact-match for the broadest root
  term, matches the flat IA (`/ai/`, `/cli/`, `/vs/`). Ranks for the "ai …" variants
  via an AI-forward title/H1 rather than a longer slug. (Rejected:
  `/ai/spec-driven-development` — semantic clash with the `/ai/` plugin catalog;
  `/about/...` — new orphan prefix, weak SEO framing; `/ai-spec-driven-development/`
  — weaker for the bare head term.)
- **Editorial register: neutral-reference-first.** The body reads like an
  authoritative reference entry; SpecScore appears as the named, recommended
  implementation in dedicated sections — clearly, without hype. LLMs preferentially
  cite neutral/factual content, so the neutral body earns the citation and carries
  the SpecScore mention along.
- **Depth: definitive reference** (~1,500–2,500 words), heavily structured into
  extractable chunks.
- **AI is the narrative spine.** Vendor-neutral SDD fundamentals are fully explained,
  but the motivating thread throughout is the AI-agent context.

## GEO / citation layer (mechanics)

- **Title:** `Spec-Driven Development for AI Agents — A Complete Guide | SpecScore`
- **H1:** `Spec-Driven Development for AI Coding Agents`
- **Answer-first:** opening paragraph is a crisp, self-contained, vendor-neutral
  definition of SDD (the chunk a model lifts verbatim), followed by a short
  **TL;DR / key-takeaways** list.
- **Question-shaped H2s** — match how people and models phrase queries.
- **Schema.org JSON-LD:** `Article` + `FAQPage` (+ `DefinedTerm` for the definition).
- **Visible "Last updated" date** + open-source/GitHub authority signals.
- **Self-contained sections** — each H2 block readable out of context.

## Section outline

`[N]` = vendor-neutral/citable. `[S]` = SpecScore as named recommendation.

1. **Definition block** `[N]` — one-paragraph definition + TL;DR takeaways.
2. **What is spec-driven development?** `[N]` — spec as single source of truth;
   what a spec contains (requirements, acceptance criteria); the "living spec" idea.
3. **Why it matters now: AI raised the stakes** `[N→spine]` — agents generate code
   faster than humans can review; the bottleneck shifts from typing to specifying
   intent; specs as guardrails against "your AI builds the wrong thing."
4. **How SDD works — the workflow** `[N]` — numbered lifecycle: capture intent →
   specify behavior + acceptance criteria → decompose into a plan → implement →
   verify against criteria → keep the spec living. (Maps to Idea→Feature→Plan
   without being branded.)
5. **Benefits** `[N]` — extractable list; sub-list for why it specifically helps AI
   agents (machine-readable intent, less context to load, traceability, verifiable
   acceptance criteria).
6. **SDD vs related practices** `[N]` — compact comparison table: vs TDD, vs
   PRDs/traditional requirements, vs prompt-only "vibe coding." Links out to `/vs/`
   rather than duplicating it.
7. **Tradeoffs & when *not* to use it** `[N]` — upfront cost, throwaway scripts,
   spec-drift risk. (Honesty → trust; matches the "honest limits" voice.)
8. **Doing SDD with AI agents in practice** `[S]` — what you need (machine-readable
   format + a way for agents to query/edit/lint specs); SpecScore introduced here as
   the recommended implementation — open format, CLI, AI skills, tool-agnostic.
   Links to `/ai/`, `/cli/`.
9. **FAQ** `[N+S]` `[FAQPage schema]` — concept-level Qs distinct from the product
   `/faq/`: "Is SDD the same as TDD?", "Does SDD slow you down?", "Spec vs PRD?",
   "How do AI agents use specs?"
10. **Final CTA** `[S]` — light, to `/ai/` and `/cli/`.

## Build / reuse

- Reuse `BaseLayout`, `SiteHeader`, `SiteFooter`, and shared `global.css`; follow
  `tools/landing/DESIGN-PRINCIPLES.md`.
- Mostly new prose sections — likely a few new components under
  `tools/landing/src/components/` with per-locale variants, per convention.
- **Dedup guard:** comparison section stays light and links to `/vs/openspec/`;
  FAQ is concept-level, not product-level.
- **English first** for review, then fan out to 7 locales
  (`es`, `ja`, `ko`, `pt-br`, `ru`, `uk`, `zh-cn`).
- Wire into nav/footer discovery following how `/ai/` and `/cli/` are linked
  (crawler-discoverable links per DESIGN-PRINCIPLES).

## Out of scope

- Translating before the English template is reviewed.
- Restructuring `/vs/`, `/faq/`, or `/ai/` content (only link to them).

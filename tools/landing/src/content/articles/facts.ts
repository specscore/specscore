import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import type { PatternId } from './types.ts';

export const articleSlug = 'ears-requirements';

export const href = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  kiroVs: '/vs/kiro/',
  articles: '/articles/',
  article: '/articles/ears-requirements/',
  home: '/',
  validators: '/validators/',
  cli: '/cli/',
  cliInstall: '/cli/install/',
  ai: '/ai/',
  requirement: '/requirement-specification',
  acceptance: '/acceptance-criteria-specification',
  scenario: '/scenario-specification',
  feature: '/feature-specification',
  paper: 'https://doi.org/10.1109/RE.2009.9',
  mavin: 'https://alistairmavin.com/ears/',
  kiroFeature: 'https://kiro.dev/docs/specs/feature-specs/',
  kiroRequirements: 'https://kiro.dev/docs/specs/feature-specs/requirements-first/',
  kiro: 'https://kiro.dev/',
  requirementRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/requirement/README.md',
  acceptanceRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/acceptance-criteria/README.md',
  scenarioRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/scenario/README.md',
  featureRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/feature/README.md',
  dogfood: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml',
  formatRepo: 'https://github.com/specscore/specscore',
  cliRepo: 'https://github.com/specscore/specscore-cli',
} as const;

/** English EARS templates. The syntax itself is English on every locale. */
export const patternForm: Record<PatternId, string> = {
  ubiquitous: 'The <system name> shall <system response>',
  event: 'When <trigger>, the <system name> shall <system response>',
  state: 'While <precondition>, the <system name> shall <system response>',
  unwanted: 'If <trigger>, then the <system name> shall <system response>',
  optional: 'Where <feature is included>, the <system name> shall <system response>',
  complex: 'While <precondition>, when <trigger>, the <system name> shall <system response>',
};

/** Original illustrations of those templates, not quotations from the paper. */
export const patternExample: Record<PatternId, string> = {
  ubiquitous: 'The checkout system shall keep the order total equal to the sum of its line items.',
  event: 'When a shopper submits the checkout form with invalid data, the checkout system shall show a validation error next to the invalid field.',
  state: 'While the cart is empty, the checkout system shall keep the pay button disabled.',
  unwanted: 'If the submitted email is not a valid address, then the checkout system shall reject the form.',
  optional: 'Where the shop includes gift wrapping, the checkout system shall offer gift wrapping on the order review step.',
  complex: 'While the shopper is signed in, when the shopper submits a valid checkout form, the checkout system shall place the order.',
};

export const patternOrder: PatternId[] = ['ubiquitous', 'event', 'state', 'unwanted', 'optional', 'complex'];

/**
 * Feature README that `specscore spec lint` accepted with 0 violations.
 * Checked 2 November 2026 with specscore 0.55.1 and with 0.39.1,
 * together with the index, spec README, and specscore.yaml below.
 */
export const featureReadme = `---
format: https://specscore.md/feature-specification
status: Draft
---

# Feature: Checkout validation

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/example/checkout/spec/features/checkout?op=explore) | [Edit](https://specscore.studio/app/github.com/example/checkout/spec/features/checkout?op=edit) | [Ask question](https://specscore.studio/app/github.com/example/checkout/spec/features/checkout?op=ask) | [Request change](https://specscore.studio/app/github.com/example/checkout/spec/features/checkout?op=request-change) |

**Status:** Draft
**Source Ideas:** —

## Summary

The checkout form shows a validation error next to a field when the shopper submits invalid data, and it rejects an email that is not a valid address.

## Problem

A vague sentence such as "the form should handle bad input" does not say which event causes which response. Checkout needs those obligations written so a reviewer and a linter can point at them.

## Behavior

### Field validation

The checkout system checks the form when the shopper submits it.

#### REQ: show-field-error

When a shopper submits the checkout form with invalid data, the checkout system MUST show a validation error next to the invalid field.

#### REQ: reject-invalid-email

If the submitted email is not a valid address, then the checkout system MUST reject the form.

## Acceptance Criteria

### AC: invalid-submission

**Requirements:** checkout#req:show-field-error, checkout#req:reject-invalid-email

Submitting the checkout form with invalid data shows a validation error next to the invalid field, and an email that is not a valid address is rejected.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/feature-specification*
`;

export const featuresIndex = `---
format: https://specscore.md/features-index-specification
---

# Features

| Feature | Status | Description |
|---|---|---|
| [Checkout validation](checkout/README.md) | Draft | The checkout form shows a validation error next to a field when the shopper submits invalid data, and it rejects an email that is not a valid address. |

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/features-index-specification*
`;

export const specReadme = `# Checkout specification

## Open Questions

None at this time.
`;

export const repoConfig = `# SpecScore Repo Config Schema: https://specscore.md/repo-config

project:
  title: Checkout sample
  host: github.com
  org: example
  repo: checkout
`;

export function articleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/ears-requirements/');
}

export function articlesIndexHref(locale: LangCode): string {
  return localeHref(locale, '/articles/');
}

/** `/articles/ears-requirements/` → `/articles/ears-requirements.md`. */
export function articleMdHref(locale: LangCode): string {
  return articleHref(locale).replace(/\/$/, '.md');
}

/** `/articles/` → `/articles.md`. */
export function articlesIndexMdHref(locale: LangCode): string {
  return articlesIndexHref(locale).replace(/\/$/, '.md');
}

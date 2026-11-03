import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';

export const articleSlug = 'acceptance-criteria';

export const href = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  articles: '/articles/',
  article: '/articles/acceptance-criteria/',
  home: '/',
  validators: '/validators/',
  cli: '/cli/',
  cliInstall: '/cli/install/',
  ai: '/ai/',
  acceptance: '/acceptance-criteria-specification',
  feature: '/feature-specification',
  rehearse: '/rehearse',
  example: '/example-login',
  questions: '/asking-good-questions',
  gherkin: 'https://cucumber.io/docs/gherkin/reference/',
  bdd: 'https://cucumber.io/docs/bdd/',
  ears: 'https://alistairmavin.com/ears/',
  acceptanceRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/acceptance-criteria/README.md',
  scenarioRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/scenario/README.md',
  requirementRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/requirement/README.md',
  featureRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/feature/README.md',
  dogfood: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml',
  formatRepo: 'https://github.com/specscore/specscore',
  cliRepo: 'https://github.com/specscore/specscore-cli',
  acHeading: 'https://github.com/specscore/specscore-cli/blob/main/pkg/lint/ac_heading.go',
  planRules: 'https://github.com/specscore/specscore-cli/blob/main/pkg/lint/plan_rules.go',
} as const;

/** Landing routes that exist in every locale. Docs stay on the English URL. */
export const localizedPrefixes = [
  '/articles/',
  '/spec-driven-development/',
  '/cli/',
  '/ai/',
  '/validators/',
  '/vs/',
];

/**
 * Gherkin illustration. Keywords follow Cucumber's English reference.
 * This is not a SpecScore file.
 */
export const gwtExample = `Scenario: Reject an email that is not a valid address
  Given the shopper is on the checkout form
  When the shopper submits the email "not-an-email"
  Then the page shows "Enter a valid email address" beside the email field
  And the order is not placed
`;

/** Checklist illustration. One observable result per line. */
export const checklistExample = `- Submitting the email "not-an-email" shows "Enter a valid email address" beside the email field.
- The order is not placed.
`;

/**
 * Inline criterion from the acceptance criteria specification:
 * abstract prose, no Given/When/Then steps.
 */
export const inlineAc = `## Acceptance Criteria

### AC: invalid-email-rejected

**Requirements:** checkout#req:reject-invalid-email

An email that is not a valid address is rejected, and the order is not placed.
`;

/**
 * Thin criterion file the CLI parses from _acs/<slug>.ac.md.
 * Status, Verifies, and Applies-to are optional in the parser.
 */
export const thinAc = `# AC: invalid-email-rejected

**Status:** accepted
**Verifies:** checkout#req:reject-invalid-email

## Statement

An email that is not a valid address is rejected, and the order is not placed.
`;

/** Scenario file shape from the scenario specification. Keywords are uppercase. */
export const scenarioExample = `# Scenario: Reject an invalid email

**Validates:** [checkout#ac:invalid-email-rejected](../README.md#ac-invalid-email-rejected)

## Steps

GIVEN the shopper is on the checkout form
WHEN the shopper submits the email "not-an-email"
THEN the page shows "Enter a valid email address" beside the email field
AND the order is not placed
`;

/**
 * Rehearse shape from the Rehearse guide: a heading over a fenced command.
 * The printf stands in for the real checkout command, as that guide does.
 */
export const rehearseExample = `# Rehearse: Reject an invalid email

## Given a submitted email that is not a valid address
\`\`\`bash
printf 'email=not-an-email\\n' > form.txt
\`\`\`

## When the response is recorded
\`\`\`bash
printf 'Enter a valid email address\\n' > out.txt
\`\`\`

## Then the message is the invalid-email text
\`\`\`bash
grep -q 'Enter a valid email address' out.txt
\`\`\`
`;

export function articleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/acceptance-criteria/');
}

export function articlesIndexHref(locale: LangCode): string {
  return localeHref(locale, '/articles/');
}

/** `/articles/acceptance-criteria/` → `/articles/acceptance-criteria.md`. */
export function articleMdHref(locale: LangCode): string {
  return articleHref(locale).replace(/\/$/, '.md');
}

/** `/articles/` → `/articles.md`. */
export function articlesIndexMdHref(locale: LangCode): string {
  return articlesIndexHref(locale).replace(/\/$/, '.md');
}

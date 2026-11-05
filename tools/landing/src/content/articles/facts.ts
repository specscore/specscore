import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';
import type { PatternId } from './types.ts';

export const earsSlug = 'ears-requirements';
export const acceptanceSlug = 'acceptance-criteria';
export const lintSlug = 'lint-specs-in-ci';
export const templateSlug = 'feature-spec-template';

export const earsHref = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  kiroVs: '/vs/kiro/',
  articles: '/articles/',
  article: '/articles/ears-requirements/',
  acceptanceArticle: '/articles/acceptance-criteria/',
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

export function earsArticleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/ears-requirements/');
}

export function articlesIndexHref(locale: LangCode): string {
  return localeHref(locale, '/articles/');
}

/** `/articles/ears-requirements/` → `/articles/ears-requirements.md`. */
export function earsArticleMdHref(locale: LangCode): string {
  return earsArticleHref(locale).replace(/\/$/, '.md');
}

/** `/articles/` → `/articles.md`. */
export function articlesIndexMdHref(locale: LangCode): string {
  return articlesIndexHref(locale).replace(/\/$/, '.md');
}

export const acceptanceHref = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  articles: '/articles/',
  article: '/articles/acceptance-criteria/',
  earsArticle: '/articles/ears-requirements/',
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

export function acceptanceArticleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/acceptance-criteria/');
}

/** `/articles/acceptance-criteria/` → `/articles/acceptance-criteria.md`. */
export function acceptanceArticleMdHref(locale: LangCode): string {
  return acceptanceArticleHref(locale).replace(/\/$/, '.md');
}

export const lintHref = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  articles: '/articles/',
  article: '/articles/lint-specs-in-ci/',
  earsArticle: '/articles/ears-requirements/',
  acceptanceArticle: '/articles/acceptance-criteria/',
  home: '/',
  validators: '/validators/',
  cli: '/cli/',
  cliInstall: '/cli/install/',
  ai: '/ai/',
  acceptance: '/acceptance-criteria-specification',
  feature: '/feature-specification',
  formatRepo: 'https://github.com/specscore/specscore',
  cliRepo: 'https://github.com/specscore/specscore-cli',
  cliLicense: 'https://github.com/specscore/specscore-cli/blob/main/LICENSE',
  lintRules: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/docs/lint-rules.md',
  dogfood: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml',
  installScript: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/scripts/install.sh',
  acHeading: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/ac_heading.go',
  planRules: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/plan_rules.go',
  oqSection: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/oq_section.go',
  readmeExists: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/readme_exists.go',
  indexEntries: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/index_entries.go',
  specOutput: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/internal/cli/spec.go',
  specKitDocs: 'https://github.github.io/spec-kit/',
  specKitSdd: 'https://github.github.io/spec-kit/reference/agentic-sdd.html',
  openSpecCli: 'https://openspec.dev/docs/cli',
  openSpecRepo: 'https://github.com/Fission-AI/OpenSpec',
  kiroSpecs: 'https://kiro.dev/docs/specs/feature-specs/',
  bmadRepo: 'https://github.com/bmad-code-org/BMAD-METHOD',
  tmRepo: 'https://github.com/eyaltoledano/claude-task-master',
} as const;

/**
 * Install and lint steps from `.github/workflows/dogfood.yml`.
 * The workflow file also sets permissions and a concurrency group, and
 * comments on why the version pin is not `latest`. Those lines are omitted
 * here. The commands are the ones that file runs.
 */
export const dogfoodLintSteps = `name: Dogfood lint

on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@d23441a48e516b6c34aea4fa41551a30e30af803 # v6
      - name: Install specscore CLI (pinned)
        env:
          SPECSCORE_VERSION: v0.39.1
        run: |
          curl -fsSL https://specscore.md/install/get-cli | \\
            SPECSCORE_INSTALL_DIR="$HOME/.local/bin" sh
          echo "$HOME/.local/bin" >> "$GITHUB_PATH"
          specscore --version
      - name: Lint spec tree
        run: specscore spec lint
`;

/**
 * Text report captured from specscore 0.55.0 (v0.55.0 of specscore-cli)
 * on a feature whose Open Questions section was removed and whose index
 * omitted an empty child directory. The line shape is the formatter in
 * internal/cli/spec.go: file:line [severity] rule: message, then
 * "N violations found (N errors)". The same summary shape is in v0.39.1.
 * The process exit code is not a line of this report.
 */
export const lintFailureOutput = `features/apply-discount/README.md:0 [error] oq-section: Open Questions section not found
features/apply-discount/README.md:0 [error] index-entries: Child directory not listed in index: refunds
features/apply-discount/refunds:0 [error] readme-exists: README.md not found

3 violations found (3 errors)
`;

/** Clean text report. The command prints this and exits 0. */
export const lintCleanOutput = `0 violations found
`;

/**
 * Plan document filled for the checkout feature.
 * The section order, header fields, and `**Verifies:**` lines follow the
 * plan specification's published template. `format:` and `status:` follow
 * the artifact-frontmatter convention. This file was not part of the
 * 2 November 2026 lint run described on `featureReadme`.
 */
export const planReadme = `---
format: https://specscore.md/plan-specification
status: Draft
---

# Plan: Show checkout validation errors

**Status:** Draft
**Source Feature:** checkout
**Date:** 2026-11-05
**Owner:** @example
**Supersedes:** —

## Summary

This plan decomposes the checkout feature into the work that shows a field error and rejects an email that is not a valid address.

## Approach

Both tasks verify the same acceptance criterion, which bundles the two requirements. Nothing is deferred, so this plan has no Deferred AC Coverage section.

## Tasks

### Task 1: Show a validation error beside the invalid field

**Verifies:** checkout#ac:invalid-submission

When the shopper submits the checkout form with invalid data, show a validation error next to the invalid field.

### Task 2: Reject an email that is not a valid address

**Verifies:** checkout#ac:invalid-submission

If the submitted email is not a valid address, reject the form.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/plan-specification*
`;

/**
 * Task document for the first plan task.
 * Title and the Status, Depends on, and Model fields follow the task
 * specification's published example. `format:` and `status:` follow the
 * artifact-frontmatter convention. Not part of the 2 November 2026 lint run.
 */
export const taskReadme = `---
format: https://specscore.md/task-specification
status: queued
---

# Task: Show a validation error beside the invalid field

**Status:** queued
**Depends on:** none
**Model:** medium

## Acceptance Criteria

- Submitting the checkout form with invalid data shows a validation error next to the invalid field.

## Open Questions

None at this time.

---
*This document follows the https://specscore.md/task-specification*
`;

export const templateHref = {
  sdd: '/spec-driven-development/',
  tools: '/spec-driven-development/tools/',
  articles: '/articles/',
  article: '/articles/feature-spec-template/',
  earsArticle: '/articles/ears-requirements/',
  acceptanceArticle: '/articles/acceptance-criteria/',
  lintArticle: '/articles/lint-specs-in-ci/',
  home: '/',
  validators: '/validators/',
  cli: '/cli/',
  cliInstall: '/cli/install/',
  ai: '/ai/',
  cliSkills: '/ai/cli-skills/',
  specStudio: '/ai/specstudio-skills/',
  feature: '/feature-specification',
  acceptance: '/acceptance-criteria-specification',
  plan: '/plan-specification',
  task: '/task-specification',
  rehearse: '/rehearse',
  featureRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/feature/README.md',
  requirementRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/requirement/README.md',
  acceptanceRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/acceptance-criteria/README.md',
  scenarioRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/scenario/README.md',
  planRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/plan/README.md',
  taskRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/task/README.md',
  frontmatterRepo: 'https://github.com/specscore/specscore/blob/main/spec/features/artifact-frontmatter-convention/README.md',
  formatRepo: 'https://github.com/specscore/specscore',
  formatLicense: 'https://github.com/specscore/specscore/blob/main/LICENSE',
  cliRepo: 'https://github.com/specscore/specscore-cli',
  cliLicense: 'https://github.com/specscore/specscore-cli/blob/main/LICENSE',
  pluginRepo: 'https://github.com/specscore/ai-plugin-specscore',
  dogfood: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml',
  acHeading: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/ac_heading.go',
  planRules: 'https://github.com/specscore/specscore-cli/blob/v0.55.1/pkg/lint/plan_rules.go',
  specKitDocs: 'https://github.github.io/spec-kit/',
  openSpecCli: 'https://openspec.dev/docs/cli',
  openSpecRepo: 'https://github.com/Fission-AI/OpenSpec',
  tmRepo: 'https://github.com/eyaltoledano/claude-task-master',
} as const;

export function templateArticleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/feature-spec-template/');
}

/** `/articles/feature-spec-template/` → `/articles/feature-spec-template.md`. */
export function templateArticleMdHref(locale: LangCode): string {
  return templateArticleHref(locale).replace(/\/$/, '.md');
}

export function lintArticleHref(locale: LangCode): string {
  return localeHref(locale, '/articles/lint-specs-in-ci/');
}

/** `/articles/lint-specs-in-ci/` → `/articles/lint-specs-in-ci.md`. */
export function lintArticleMdHref(locale: LangCode): string {
  return lintArticleHref(locale).replace(/\/$/, '.md');
}

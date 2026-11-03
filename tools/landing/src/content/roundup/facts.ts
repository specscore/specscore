import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';

/** Tool order on the roundup. Slugs match /vs/<slug>/. */
export const toolOrder = [
  'spec-kit',
  'openspec',
  'kiro',
  'tessl',
  'bmad-method',
  'task-master-ai',
  'codespeak',
  'datarim',
  'plain-markdown',
  'specscore',
] as const;

export type ToolId = (typeof toolOrder)[number];

export const href = {
  sdd: '/spec-driven-development/',
  validators: '/validators/',
  cli: '/cli/',
  home: '/',
  specKitRepo: 'https://github.com/github/spec-kit',
  specKitLicense: 'https://github.com/github/spec-kit/blob/main/LICENSE',
  specKitDocs: 'https://github.github.io/spec-kit/',
  specKitSdd: 'https://github.github.io/spec-kit/reference/agentic-sdd.html',
  specKitUpgrade: 'https://github.github.io/spec-kit/upgrade.html',
  openSpecRepo: 'https://github.com/Fission-AI/OpenSpec',
  openSpecLicense: 'https://github.com/Fission-AI/OpenSpec/blob/main/LICENSE',
  openSpecReadme: 'https://github.com/Fission-AI/OpenSpec/blob/main/README.md',
  openSpecCli: 'https://openspec.dev/docs/cli',
  kiro: 'https://kiro.dev/',
  kiroSpecs: 'https://kiro.dev/docs/specs/feature-specs/',
  kiroLicense: 'https://kiro.dev/license/',
  tesslDocs: 'https://docs.tessl.io/',
  tesslTile: 'https://github.com/tesslio/spec-driven-development-tile',
  tesslTileLicense: 'https://github.com/tesslio/spec-driven-development-tile/blob/main/LICENSE',
  tesslTilePage: 'https://tessl.io/registry/tessl-labs/spec-driven-development',
  bmadRepo: 'https://github.com/bmad-code-org/BMAD-METHOD',
  bmadLicense: 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE',
  tmRepo: 'https://github.com/eyaltoledano/claude-task-master',
  tmLicense: 'https://github.com/eyaltoledano/claude-task-master/blob/main/LICENSE',
  tmDocs: 'https://tryhamster.com/docs/taskmaster',
  codespeak: 'https://codespeak.dev/',
  codespeakTerms: 'https://codespeak.dev/terms-of-service',
  datarimRepo: 'https://github.com/Arcanada-one/datarim',
  datarimLicense: 'https://github.com/Arcanada-one/datarim/blob/main/LICENSE',
  formatRepo: 'https://github.com/specscore/specscore',
  formatLicense: 'https://github.com/specscore/specscore/blob/main/LICENSE',
  cliRepo: 'https://github.com/specscore/specscore-cli',
  cliLicense: 'https://github.com/specscore/specscore-cli/blob/main/LICENSE',
  dogfood: 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml',
  score: 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md',
} as const;

export function roundupHref(locale: LangCode): string {
  return localeHref(locale, '/spec-driven-development/tools/');
}

/** `/spec-driven-development/tools/` → `/spec-driven-development/tools.md`. */
export function roundupMdHref(locale: LangCode): string {
  return roundupHref(locale).replace(/\/$/, '.md');
}

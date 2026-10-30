import type { LangCode } from '../../lib/languages.ts';
import { localeHref } from '../../lib/languages.ts';

export interface CatalogEntry {
  slug: string;
  name: string;
}

/** Every comparison, in the order used by /vs/ and the homepage band. */
export const catalog: CatalogEntry[] = [
  { slug: 'plain-markdown', name: 'Plain Markdown' },
  { slug: 'openspec', name: 'OpenSpec' },
  { slug: 'spec-kit', name: 'Spec Kit' },
  { slug: 'datarim', name: 'Datarim' },
  { slug: 'codespeak', name: 'CodeSpeak' },
  { slug: 'kiro', name: 'Kiro' },
  { slug: 'tessl', name: 'Tessl' },
  { slug: 'bmad-method', name: 'BMAD Method' },
  { slug: 'task-master-ai', name: 'Task Master AI' },
];

export function compareHref(locale: LangCode, slug: string): string {
  return localeHref(locale, `/vs/${slug}/`);
}

/** `/vs/kiro/` → `/vs/kiro.md`, `/de/vs/kiro/` → `/de/vs/kiro.md`. */
export function compareMdHref(locale: LangCode, slug: string): string {
  return compareHref(locale, slug).replace(/\/$/, '.md');
}

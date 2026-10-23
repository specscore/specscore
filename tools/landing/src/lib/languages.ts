// Single source of truth for the locales the site supports.
// Consumed by SiteHeader (dropdown switcher) and FooterLanguages
// (footer inventory). Add a locale here once; both surfaces update.
//
// Why labels and not flag emoji
// -----------------------------
// Flag emoji were considered and rejected — do not reintroduce them
// without rereading this rationale. See also: tools/landing/DESIGN-PRINCIPLES.md.
//
// 1. Flags ≠ languages. Spanish is spoken in 20+ countries (Spain or
//    Mexico flag?). Portuguese: Portugal or Brazil? Chinese: PRC or
//    Taiwan? Korean: which Korea? English: US/UK/Canada/Australia?
//    Russian: putting a Russian flag erases the millions of Russian
//    speakers outside Russia — and a Russian-flag-above-Ukrainian-flag
//    pairing is politically loaded in this decade.
// 2. OS rendering inconsistent. Windows does not render flag emoji at
//    all — visitors there see the regional-indicator letters in a box.
//    Cannot be fixed from CSS.
// 3. Accessibility. Screen readers announce flag emoji unpredictably
//    across NVDA/JAWS/VoiceOver; the language name reads cleanly.
//
// Native-language labels ("Español", "日本語", "Українська") do the
// entire job without the failure modes above.

export type LangCode =
  | 'en' | 'es' | 'de' | 'fr' | 'it' | 'pl' | 'pt-br' | 'ru' | 'tr' | 'uk' | 'ja' | 'zh-cn' | 'zh-tw' | 'ko';

export interface Lang {
  code: LangCode;
  label: string;       // Label in its own language.
  tag: string;         // BCP 47 tag for lang= and hreflang= attributes.
}

// Order: English first, then alphabetical by URL code.
export const langs: Lang[] = [
  { code: 'en',    label: 'English',        tag: 'en'    },
  { code: 'es',    label: 'Español',        tag: 'es'    },
  { code: 'de',    label: 'Deutsch',        tag: 'de'    },
  { code: 'fr',    label: 'Français',       tag: 'fr'    },
  { code: 'it',    label: 'Italiano',       tag: 'it'    },
  { code: 'pl',    label: 'Polski',         tag: 'pl'    },
  { code: 'pt-br', label: 'Português (BR)', tag: 'pt-BR' },
  { code: 'ru',    label: 'Русский',        tag: 'ru'    },
  { code: 'tr',    label: 'Türkçe',         tag: 'tr'    },
  { code: 'uk',    label: 'Українська',     tag: 'uk'    },
  { code: 'ja',    label: '日本語',          tag: 'ja'    },
  { code: 'zh-cn', label: '中文',            tag: 'zh-CN' },
  { code: 'zh-tw', label: '繁體中文',         tag: 'zh-TW' },
  { code: 'ko',    label: '한국어',           tag: 'ko'    },
];

// Detect the current locale from a URL pathname like "/ru/cli/install/".
export function localeFromPath(path: string): LangCode {
  if (path.startsWith('/pt-br')) return 'pt-br';
  if (path.startsWith('/zh-cn')) return 'zh-cn';
  if (path.startsWith('/zh-tw')) return 'zh-tw';
  if (path.startsWith('/es'))    return 'es';
  if (path.startsWith('/de'))    return 'de';
  if (path.startsWith('/fr'))    return 'fr';
  if (path.startsWith('/it'))    return 'it';
  if (path.startsWith('/pl'))    return 'pl';
  if (path.startsWith('/ru'))    return 'ru';
  if (path.startsWith('/tr'))    return 'tr';
  if (path.startsWith('/uk'))    return 'uk';
  if (path.startsWith('/ja'))    return 'ja';
  if (path.startsWith('/ko'))    return 'ko';
  return 'en';
}

// Strip the locale prefix from a pathname to get the route portion.
// e.g. "/es/vs/openspec/" → "/vs/openspec/", "/" → "/".
export function routeFromPath(path: string): string {
  return path.replace(/^\/(es|de|fr|it|pl|pt-br|ru|tr|uk|ja|zh-cn|zh-tw|ko)(\/|$)/, '/');
}

// Build a URL that switches the current route to a given locale.
// English is the default and lives at the root.
export function localeHref(code: LangCode, route: string = '/'): string {
  return code === 'en' ? route : `/${code}${route}`;
}

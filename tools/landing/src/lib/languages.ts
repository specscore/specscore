// Single source of truth for the locales the site supports.
// Consumed by SiteHeader (dropdown switcher) and FooterLanguages
// (footer inventory). Add a locale here once; both surfaces update.

export type LangCode =
  | 'en' | 'es' | 'pt-br' | 'ru' | 'uk' | 'ja' | 'zh-cn' | 'ko';

export interface Lang {
  code: LangCode;
  label: string;       // Label in its own language.
  tag: string;         // BCP 47 tag for lang= and hreflang= attributes.
}

// Order: English first, then alphabetical by URL code.
export const langs: Lang[] = [
  { code: 'en',    label: 'English',        tag: 'en'    },
  { code: 'es',    label: 'Español',        tag: 'es'    },
  { code: 'pt-br', label: 'Português (BR)', tag: 'pt-BR' },
  { code: 'ru',    label: 'Русский',        tag: 'ru'    },
  { code: 'uk',    label: 'Українська',     tag: 'uk'    },
  { code: 'ja',    label: '日本語',          tag: 'ja'    },
  { code: 'zh-cn', label: '中文',            tag: 'zh-CN' },
  { code: 'ko',    label: '한국어',           tag: 'ko'    },
];

// Detect the current locale from a URL pathname like "/ru/cli/install/".
export function localeFromPath(path: string): LangCode {
  if (path.startsWith('/ru'))    return 'ru';
  if (path.startsWith('/uk'))    return 'uk';
  if (path.startsWith('/es'))    return 'es';
  if (path.startsWith('/pt-br')) return 'pt-br';
  if (path.startsWith('/ja'))    return 'ja';
  if (path.startsWith('/zh-cn')) return 'zh-cn';
  if (path.startsWith('/ko'))    return 'ko';
  return 'en';
}

// Strip the locale prefix from a pathname to get the route portion.
// e.g. "/es/vs/openspec/" → "/vs/openspec/", "/" → "/".
export function routeFromPath(path: string): string {
  return path.replace(/^\/(es|pt-br|ru|uk|ja|zh-cn|ko)(\/|$)/, '/');
}

// Build a URL that switches the current route to a given locale.
// English is the default and lives at the root.
export function localeHref(code: LangCode, route: string = '/'): string {
  return code === 'en' ? route : `/${code}${route}`;
}

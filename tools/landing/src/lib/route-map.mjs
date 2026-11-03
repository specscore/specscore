// Locale codes and BCP 47 tags. Keep in lockstep with languages.ts.
// English is the default and lives at the site root.
export const langs = [
  { code: 'en', tag: 'en' },
  { code: 'es', tag: 'es' },
  { code: 'de', tag: 'de' },
  { code: 'fr', tag: 'fr' },
  { code: 'it', tag: 'it' },
  { code: 'pl', tag: 'pl' },
  { code: 'pt-br', tag: 'pt-BR' },
  { code: 'ru', tag: 'ru' },
  { code: 'tr', tag: 'tr' },
  { code: 'uk', tag: 'uk' },
  { code: 'ja', tag: 'ja' },
  { code: 'zh-cn', tag: 'zh-CN' },
  { code: 'zh-tw', tag: 'zh-TW' },
  { code: 'ko', tag: 'ko' },
];

const LOCALE_PREFIX = /^(es|de|fr|it|pl|pt-br|ru|tr|uk|ja|zh-cn|zh-tw|ko)$/;

export function normalizeRoute(route) {
  let value = route.startsWith('/') ? route : `/${route}`;
  if (!value.endsWith('/')) value += '/';
  return value;
}

export function routeFromPath(pathname) {
  const stripped = pathname.replace(/^\/(es|de|fr|it|pl|pt-br|ru|tr|uk|ja|zh-cn|zh-tw|ko)(\/|$)/, '/');
  return normalizeRoute(stripped);
}

export function localeHref(code, route = '/') {
  const normalized = normalizeRoute(route);
  return code === 'en' ? normalized : `/${code}${normalized}`;
}

/**
 * @param {string} file path containing /pages/
 * @returns {{ locale: string, route: string }}
 */
export function parsePageFile(file) {
  const norm = file.replace(/\\/g, '/');
  const marker = '/pages/';
  const at = norm.lastIndexOf(marker);
  let rel = at >= 0 ? norm.slice(at + marker.length) : norm;
  rel = rel.replace(/\.(astro|md)$/, '');
  if (rel.endsWith('/index')) rel = rel.slice(0, -'/index'.length);
  else if (rel === 'index') rel = '';
  const parts = rel.split('/').filter(Boolean);
  let locale = 'en';
  if (parts.length && LOCALE_PREFIX.test(parts[0])) {
    locale = parts.shift();
  }
  return { locale, route: normalizeRoute(`/${parts.join('/')}`) };
}

/**
 * @param {string[]} files
 * @returns {Map<string, Set<string>>}
 */
export function inventoryFromFiles(files) {
  const inventory = new Map();
  for (const file of files) {
    const { locale, route } = parsePageFile(file);
    if (!inventory.has(route)) inventory.set(route, new Set());
    inventory.get(route).add(locale);
  }
  return inventory;
}

export function localeHasRoute(inventory, code, route) {
  const set = inventory.get(normalizeRoute(route));
  if (!set) return true;
  return set.has(code);
}

export function alternatesForPath(inventory, pathname) {
  const route = routeFromPath(pathname);
  const set = inventory.get(route);
  const available = set ? langs.filter((lang) => set.has(lang.code)) : langs;
  const links = available.map((lang) => ({
    hreflang: lang.tag,
    href: `https://specscore.md${localeHref(lang.code, route)}`,
  }));
  const english = links.find((link) => link.hreflang === 'en');
  const fallback = english?.href ?? links[0]?.href;
  if (fallback) links.push({ hreflang: 'x-default', href: fallback });
  return links;
}

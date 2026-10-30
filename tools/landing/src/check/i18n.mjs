import { en } from './i18n/en.mjs';
import { overlays } from './i18n/overlays.mjs';

const LOCALES = ['es', 'de', 'fr', 'it', 'pl', 'pt-br', 'ru', 'tr', 'uk', 'ja', 'zh-cn', 'zh-tw', 'ko'];

function fill(locale) {
  const overlay = overlays[locale];
  if (!overlay) throw new Error(`missing locale ${locale}`);
  const out = {};
  for (const key of Object.keys(en)) {
    if (!(key in overlay)) throw new Error(`missing ${locale}.${key}`);
    out[key] = overlay[key];
  }
  return out;
}

export const messages = { en };
for (const locale of LOCALES) messages[locale] = fill(locale);

export function t(locale, key, params = {}) {
  const table = messages[locale] || messages.en;
  const value = table[key] ?? messages.en[key] ?? key;
  if (Array.isArray(value)) return value;
  return String(value).replace(/\{(\w+)\}/g, (_, name) => (params[name] == null ? '' : String(params[name])));
}

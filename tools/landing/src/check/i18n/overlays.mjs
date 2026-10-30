import { en } from './en.mjs';

const LOCALES = ['es', 'de', 'fr', 'it', 'pl', 'pt-br', 'ru', 'tr', 'uk', 'ja', 'zh-cn', 'zh-tw', 'ko'];

// Replaced by real translations before the page ships. The engine test
// asserts metaTitle differs from English so this clone cannot land.
export const overlays = Object.fromEntries(LOCALES.map((code) => [code, structuredClone(en)]));

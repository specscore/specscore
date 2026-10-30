import type { LangCode } from '../../lib/languages.ts';
import { toolOrder } from './facts.ts';
import type { RoundupPage } from './types.ts';
import { page as en } from './locales/en.ts';
import { page as es } from './locales/es.ts';
import { page as de } from './locales/de.ts';
import { page as fr } from './locales/fr.ts';
import { page as it } from './locales/it.ts';
import { page as pl } from './locales/pl.ts';
import { page as ptBr } from './locales/pt-br.ts';
import { page as ru } from './locales/ru.ts';
import { page as tr } from './locales/tr.ts';
import { page as uk } from './locales/uk.ts';
import { page as ja } from './locales/ja.ts';
import { page as zhCn } from './locales/zh-cn.ts';
import { page as zhTw } from './locales/zh-tw.ts';
import { page as ko } from './locales/ko.ts';

export const pages: Record<LangCode, RoundupPage> = {
  en, es, de, fr, it, pl, 'pt-br': ptBr, ru, tr, uk, ja, 'zh-cn': zhCn, 'zh-tw': zhTw, ko,
};

export function pageFor(locale: LangCode): RoundupPage {
  const page = pages[locale];
  if (!page) throw new Error(`Missing tools roundup for ${locale}`);
  for (const id of toolOrder) {
    if (!page.tools[id]) throw new Error(`Missing ${id} in ${locale} tools roundup`);
  }
  return page;
}

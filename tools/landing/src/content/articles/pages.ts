import type { LangCode } from '../../lib/languages.ts';
import { href } from './facts.ts';
import type { ArticleCopy, ArticleLocale, IndexCopy } from './types.ts';

import { locale as en } from './locales/en.ts';
import { locale as es } from './locales/es.ts';
import { locale as de } from './locales/de.ts';
import { locale as fr } from './locales/fr.ts';
import { locale as it } from './locales/it.ts';
import { locale as pl } from './locales/pl.ts';
import { locale as ptBr } from './locales/pt-br.ts';
import { locale as ru } from './locales/ru.ts';
import { locale as tr } from './locales/tr.ts';
import { locale as uk } from './locales/uk.ts';
import { locale as ja } from './locales/ja.ts';
import { locale as zhCn } from './locales/zh-cn.ts';
import { locale as zhTw } from './locales/zh-tw.ts';
import { locale as ko } from './locales/ko.ts';

const all: Record<LangCode, ArticleLocale> = {
  en,
  es,
  de,
  fr,
  it,
  pl,
  'pt-br': ptBr,
  ru,
  tr,
  uk,
  ja,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  ko,
};

export function articleLocale(code: LangCode): ArticleLocale {
  const found = all[code];
  if (!found) throw new Error(`Missing article copy for ${code}`);
  return found;
}

export function articleCopy(code: LangCode): ArticleCopy {
  return articleLocale(code).article;
}

export function indexCopy(code: LangCode): IndexCopy {
  return articleLocale(code).index;
}

export function sourcesFor(copy: ArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: href.gherkin, label: label.gherkin },
    { href: href.bdd, label: label.bdd },
    { href: href.ears, label: label.ears },
    { href: href.acceptance, label: label.acceptance },
    { href: href.acceptanceRepo, label: label.acceptanceRepo },
    { href: href.scenarioRepo, label: label.scenarioRepo },
    { href: href.requirementRepo, label: label.requirementRepo },
    { href: href.feature, label: label.feature },
    { href: href.rehearse, label: label.rehearse },
    { href: href.example, label: label.example },
    { href: href.questions, label: label.questions },
    { href: href.cliRepo, label: label.cli },
    { href: href.formatRepo, label: label.formatRepo },
    { href: href.dogfood, label: label.dogfood },
    { href: href.acHeading, label: label.acHeading },
    { href: href.planRules, label: label.planRules },
  ];
}

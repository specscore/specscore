import type { LangCode } from '../../lib/languages.ts';
import { href, patternExample, patternForm, patternOrder } from './facts.ts';
import type { ArticleCopy, ArticleLocale, IndexCopy, PatternId } from './types.ts';

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

export interface PatternView {
  id: PatternId;
  name: string;
  form: string;
  example: string;
  body: ArticleCopy['patternBody'][PatternId];
}

export function patternsFor(copy: ArticleCopy): PatternView[] {
  return patternOrder.map((id) => ({
    id,
    name: copy.patternName[id],
    form: patternForm[id],
    example: patternExample[id],
    body: copy.patternBody[id],
  }));
}

export function sourcesFor(copy: ArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: href.paper, label: label.paper },
    { href: href.mavin, label: label.mavin },
    { href: href.kiroFeature, label: label.kiroFeature },
    { href: href.kiroRequirements, label: label.kiroRequirements },
    { href: href.requirementRepo, label: label.requirement },
    { href: href.acceptanceRepo, label: label.acceptance },
    { href: href.scenarioRepo, label: label.scenario },
    { href: href.featureRepo, label: label.feature },
    { href: href.dogfood, label: label.dogfood },
    { href: href.cliRepo, label: label.cli },
    { href: href.formatRepo, label: label.formatRepo },
  ];
}

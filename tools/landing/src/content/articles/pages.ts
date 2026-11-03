import type { LangCode } from '../../lib/languages.ts';
import { acceptanceHref, earsHref, patternExample, patternForm, patternOrder } from './facts.ts';
import type {
  AcceptanceArticleCopy,
  ArticleLocale,
  EarsArticleCopy,
  IndexCopy,
  PatternId,
} from './types.ts';

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

export function earsCopy(code: LangCode): EarsArticleCopy {
  return articleLocale(code).ears;
}

export function acceptanceCopy(code: LangCode): AcceptanceArticleCopy {
  return articleLocale(code).acceptance;
}

export function indexCopy(code: LangCode): IndexCopy {
  return articleLocale(code).index;
}

export interface PatternView {
  id: PatternId;
  name: string;
  form: string;
  example: string;
  body: EarsArticleCopy['patternBody'][PatternId];
}

export function patternsFor(copy: EarsArticleCopy): PatternView[] {
  return patternOrder.map((id) => ({
    id,
    name: copy.patternName[id],
    form: patternForm[id],
    example: patternExample[id],
    body: copy.patternBody[id],
  }));
}

export function earsSourcesFor(copy: EarsArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: earsHref.paper, label: label.paper },
    { href: earsHref.mavin, label: label.mavin },
    { href: earsHref.kiroFeature, label: label.kiroFeature },
    { href: earsHref.kiroRequirements, label: label.kiroRequirements },
    { href: earsHref.requirementRepo, label: label.requirement },
    { href: earsHref.acceptanceRepo, label: label.acceptance },
    { href: earsHref.scenarioRepo, label: label.scenario },
    { href: earsHref.featureRepo, label: label.feature },
    { href: earsHref.dogfood, label: label.dogfood },
    { href: earsHref.cliRepo, label: label.cli },
    { href: earsHref.formatRepo, label: label.formatRepo },
  ];
}

export function acceptanceSourcesFor(copy: AcceptanceArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: acceptanceHref.gherkin, label: label.gherkin },
    { href: acceptanceHref.bdd, label: label.bdd },
    { href: acceptanceHref.ears, label: label.ears },
    { href: acceptanceHref.earsArticle, label: label.earsArticle },
    { href: acceptanceHref.acceptance, label: label.acceptance },
    { href: acceptanceHref.acceptanceRepo, label: label.acceptanceRepo },
    { href: acceptanceHref.scenarioRepo, label: label.scenarioRepo },
    { href: acceptanceHref.requirementRepo, label: label.requirementRepo },
    { href: acceptanceHref.feature, label: label.feature },
    { href: acceptanceHref.rehearse, label: label.rehearse },
    { href: acceptanceHref.example, label: label.example },
    { href: acceptanceHref.questions, label: label.questions },
    { href: acceptanceHref.cliRepo, label: label.cli },
    { href: acceptanceHref.formatRepo, label: label.formatRepo },
    { href: acceptanceHref.dogfood, label: label.dogfood },
    { href: acceptanceHref.acHeading, label: label.acHeading },
    { href: acceptanceHref.planRules, label: label.planRules },
  ];
}

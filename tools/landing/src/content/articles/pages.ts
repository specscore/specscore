import { deliveryCopy, deliveryRoute } from './delivery.ts';
import type { LangCode } from '../../lib/languages.ts';
import { acceptanceHref, agentsHref, earsHref, lintHref, manageHref, patternExample, patternForm, patternOrder, templateHref } from './facts.ts';
import type {
  AcceptanceArticleCopy,
  AgentsArticleCopy,
  ArticleLocale,
  EarsArticleCopy,
  IndexCopy,
  LintArticleCopy,
  ManageArticleCopy,
  PatternId,
  TemplateArticleCopy,
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
  const page = articleLocale(code).index;
  const delivery = deliveryCopy(code);
  return { ...page, articles: [...page.articles, { href: deliveryRoute, title: delivery.title, summary: delivery.description }] };
}

export function lintCopy(code: LangCode): LintArticleCopy {
  return articleLocale(code).lint;
}

export function templateCopy(code: LangCode): TemplateArticleCopy {
  return articleLocale(code).template;
}

export function agentsCopy(code: LangCode): AgentsArticleCopy {
  return articleLocale(code).agents;
}

export function manageCopy(code: LangCode): ManageArticleCopy {
  return articleLocale(code).manage;
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

export function lintSourcesFor(copy: LintArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: lintHref.cliRepo, label: label.cli },
    { href: lintHref.cliLicense, label: label.cliLicense },
    { href: lintHref.formatRepo, label: label.formatRepo },
    { href: lintHref.lintRules, label: label.lintRules },
    { href: lintHref.dogfood, label: label.dogfood },
    { href: lintHref.installScript, label: label.installScript },
    { href: lintHref.readmeExists, label: label.readmeExists },
    { href: lintHref.oqSection, label: label.oqSection },
    { href: lintHref.indexEntries, label: label.indexEntries },
    { href: lintHref.acHeading, label: label.acHeading },
    { href: lintHref.planRules, label: label.planRules },
    { href: lintHref.validators, label: label.validators },
    { href: lintHref.acceptanceArticle, label: label.acceptanceArticle },
    { href: lintHref.earsArticle, label: label.earsArticle },
    { href: lintHref.specKitDocs, label: label.specKitDocs },
    { href: lintHref.specKitSdd, label: label.specKitSdd },
    { href: lintHref.openSpecCli, label: label.openSpecCli },
    { href: lintHref.openSpecRepo, label: label.openSpecRepo },
    { href: lintHref.kiroSpecs, label: label.kiroSpecs },
    { href: lintHref.bmadRepo, label: label.bmadRepo },
    { href: lintHref.tmRepo, label: label.tmRepo },
    { href: lintHref.tools, label: label.tools },
  ];
}

export function templateSourcesFor(copy: TemplateArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: templateHref.feature, label: label.feature },
    { href: templateHref.featureRepo, label: label.featureRepo },
    { href: templateHref.requirementRepo, label: label.requirement },
    { href: templateHref.acceptance, label: label.acceptance },
    { href: templateHref.acceptanceRepo, label: label.acceptanceRepo },
    { href: templateHref.scenarioRepo, label: label.scenario },
    { href: templateHref.plan, label: label.plan },
    { href: templateHref.planRepo, label: label.planRepo },
    { href: templateHref.task, label: label.task },
    { href: templateHref.taskRepo, label: label.taskRepo },
    { href: templateHref.frontmatterRepo, label: label.frontmatter },
    { href: templateHref.formatRepo, label: label.formatRepo },
    { href: templateHref.formatLicense, label: label.formatLicense },
    { href: templateHref.cliRepo, label: label.cli },
    { href: templateHref.cliLicense, label: label.cliLicense },
    { href: templateHref.dogfood, label: label.dogfood },
    { href: templateHref.acHeading, label: label.acHeading },
    { href: templateHref.planRules, label: label.planRules },
    { href: templateHref.lintArticle, label: label.lintArticle },
    { href: templateHref.acceptanceArticle, label: label.acceptanceArticle },
    { href: templateHref.earsArticle, label: label.earsArticle },
    { href: templateHref.cliSkills, label: label.cliSkills },
    { href: templateHref.specStudio, label: label.specStudio },
    { href: templateHref.pluginRepo, label: label.pluginRepo },
    { href: templateHref.validators, label: label.validators },
    { href: templateHref.rehearse, label: label.rehearse },
    { href: templateHref.openSpecCli, label: label.openSpecCli },
    { href: templateHref.openSpecRepo, label: label.openSpecRepo },
    { href: templateHref.tmRepo, label: label.tmRepo },
    { href: templateHref.specKitDocs, label: label.specKitDocs },
    { href: templateHref.tools, label: label.tools },
  ];
}

export function agentsSourcesFor(copy: AgentsArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: agentsHref.claudeOverview, label: label.claudeOverview },
    { href: agentsHref.cursorRules, label: label.cursorRules },
    { href: agentsHref.agentSetup, label: label.agentSetup },
    { href: agentsHref.cliReadme, label: label.cliReadme },
    { href: agentsHref.cliRepo, label: label.cli },
    { href: agentsHref.cliLicense, label: label.cliLicense },
    { href: agentsHref.formatRepo, label: label.formatRepo },
    { href: agentsHref.formatLicense, label: label.formatLicense },
    { href: agentsHref.dogfood, label: label.dogfood },
    { href: agentsHref.pluginRepo, label: label.pluginRepo },
    { href: agentsHref.pluginLicense, label: label.pluginLicense },
    { href: agentsHref.pluginSkills, label: label.pluginSkills },
    { href: agentsHref.pluginReadme, label: label.pluginReadme },
    { href: agentsHref.studioRepo, label: label.studioRepo },
    { href: agentsHref.studioLicense, label: label.studioLicense },
    { href: agentsHref.studioReadme, label: label.studioReadme },
    { href: agentsHref.cliSkills, label: label.cliSkills },
    { href: agentsHref.specStudio, label: label.specStudio },
    { href: agentsHref.templateArticle, label: label.templateArticle },
    { href: agentsHref.lintArticle, label: label.lintArticle },
    { href: agentsHref.feature, label: label.feature },
    { href: agentsHref.acceptance, label: label.acceptance },
    { href: agentsHref.openSpecCli, label: label.openSpecCli },
    { href: agentsHref.openSpecRepo, label: label.openSpecRepo },
    { href: agentsHref.tmRepo, label: label.tmRepo },
    { href: agentsHref.specKitDocs, label: label.specKitDocs },
    { href: agentsHref.tools, label: label.tools },
  ];
}

export function manageSourcesFor(copy: ManageArticleCopy): { href: string; label: string }[] {
  const label = copy.sourceLabel;
  return [
    { href: manageHref.specTree, label: label.specTree },
    { href: manageHref.featureStatus, label: label.featureStatus },
    { href: manageHref.planSnapshots, label: label.planSnapshots },
    { href: manageHref.formatRepo, label: label.formatRepo },
    { href: manageHref.formatLicense, label: label.formatLicense },
    { href: manageHref.cliRepo, label: label.cli },
    { href: manageHref.cliLicense, label: label.cliLicense },
    { href: manageHref.specGo39, label: label.specGo39 },
    { href: manageHref.specGo55, label: label.specGo55 },
    { href: manageHref.lintRules39, label: label.lintRules39 },
    { href: manageHref.lintRules55, label: label.lintRules55 },
    { href: manageHref.dogfood, label: label.dogfood },
    { href: manageHref.validators, label: label.validators },
    { href: manageHref.lintArticle, label: label.lintArticle },
    { href: manageHref.earsArticle, label: label.earsArticle },
    { href: manageHref.acceptanceArticle, label: label.acceptanceArticle },
    { href: manageHref.templateArticle, label: label.templateArticle },
    { href: manageHref.feature, label: label.feature },
    { href: manageHref.plan, label: label.plan },
    { href: manageHref.specKitSdd, label: label.specKitSdd },
    { href: manageHref.openSpecCli, label: label.openSpecCli },
    { href: manageHref.openSpecRepo, label: label.openSpecRepo },
    { href: manageHref.tools, label: label.tools },
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

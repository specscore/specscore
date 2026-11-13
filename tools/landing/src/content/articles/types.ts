// Shared shape for /articles/ pages. Prose is a list of inline runs so
// links, code, and emphasis stay typed instead of raw HTML.

export type Inline =
  | string
  | { c: string }
  | { s: string }
  | { e: string }
  | { a: string; href: string; kind?: 'us' | 'them' };

export type Block = Inline[];

export type PatternId = 'ubiquitous' | 'event' | 'state' | 'unwanted' | 'optional' | 'complex';

export interface NamedBlock {
  title: string;
  body: Block;
}

export interface ExamplePair {
  title: string;
  bad: string;
  good: string;
  why: Block;
}

export interface EarsArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  originTitle: string;
  origin: Block[];
  patternsTitle: string;
  patternsIntro: Block[];
  patternName: Record<PatternId, string>;
  patternBody: Record<PatternId, Block>;
  exampleLabel: string;
  mistakesTitle: string;
  mistakes: { title: string; body: Block }[];
  kiroTitle: string;
  kiro: Block[];
  mapTitle: string;
  map: Block[];
  featureCaption: string;
  indexCaption: string;
  specReadmeCaption: string;
  configCaption: string;
  mapAfter: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    paper: string;
    mavin: string;
    kiroFeature: string;
    kiroRequirements: string;
    requirement: string;
    acceptance: string;
    scenario: string;
    feature: string;
    dogfood: string;
    cli: string;
    formatRepo: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface AcceptanceArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  whatTitle: string;
  what: Block[];
  verifiableTitle: string;
  verifiable: Block[];
  checks: NamedBlock[];
  formatsTitle: string;
  formatsIntro: Block[];
  gwtCaption: string;
  checklistCaption: string;
  formatsAfter: Block[];
  earsTitle: string;
  ears: Block[];
  examplesTitle: string;
  badLabel: string;
  goodLabel: string;
  pairs: ExamplePair[];
  specscoreTitle: string;
  specscore: Block[];
  inlineCaption: string;
  thinCaption: string;
  scenarioCaption: string;
  rehearseCaption: string;
  specscoreAfter: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    gherkin: string;
    bdd: string;
    ears: string;
    earsArticle: string;
    acceptance: string;
    acceptanceRepo: string;
    scenarioRepo: string;
    requirementRepo: string;
    feature: string;
    rehearse: string;
    example: string;
    questions: string;
    cli: string;
    formatRepo: string;
    dogfood: string;
    acHeading: string;
    planRules: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface LintArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  whatTitle: string;
  what: Block[];
  checksTitle: string;
  checksIntro: Block[];
  checks: NamedBlock[];
  ciTitle: string;
  ci: Block[];
  workflowCaption: string;
  outputCaption: string;
  cleanCaption: string;
  ciAfter: Block[];
  compareTitle: string;
  compare: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    cli: string;
    cliLicense: string;
    formatRepo: string;
    lintRules: string;
    dogfood: string;
    installScript: string;
    acHeading: string;
    planRules: string;
    oqSection: string;
    readmeExists: string;
    indexEntries: string;
    validators: string;
    acceptanceArticle: string;
    earsArticle: string;
    specKitDocs: string;
    specKitSdd: string;
    openSpecCli: string;
    openSpecRepo: string;
    kiroSpecs: string;
    bmadRepo: string;
    tmRepo: string;
    tools: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface TemplateArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  whatTitle: string;
  what: Block[];
  featureTitle: string;
  feature: Block[];
  featureCaption: string;
  indexCaption: string;
  specCaption: string;
  configCaption: string;
  featureAfter: Block[];
  traceTitle: string;
  traceIntro: Block[];
  trace: NamedBlock[];
  scenarioCaption: string;
  traceAfter: Block[];
  planTitle: string;
  plan: Block[];
  planCaption: string;
  taskCaption: string;
  planAfter: Block[];
  ciTitle: string;
  ci: Block[];
  claudeTitle: string;
  claude: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    feature: string;
    featureRepo: string;
    requirement: string;
    requirementRepo: string;
    acceptance: string;
    acceptanceRepo: string;
    scenario: string;
    scenarioRepo: string;
    plan: string;
    planRepo: string;
    task: string;
    taskRepo: string;
    frontmatter: string;
    formatRepo: string;
    formatLicense: string;
    cli: string;
    cliLicense: string;
    dogfood: string;
    planRules: string;
    acHeading: string;
    lintArticle: string;
    acceptanceArticle: string;
    earsArticle: string;
    cliSkills: string;
    specStudio: string;
    pluginRepo: string;
    validators: string;
    rehearse: string;
    openSpecCli: string;
    openSpecRepo: string;
    tmRepo: string;
    specKitDocs: string;
    tools: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface AgentsArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  splitTitle: string;
  split: Block[];
  setupTitle: string;
  setup: Block[];
  commandCaption: string;
  pathsCaption: string;
  setupAfter: Block[];
  loopTitle: string;
  loopIntro: Block[];
  steps: NamedBlock[];
  skillsTitle: string;
  skills: Block[];
  ciTitle: string;
  ci: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    claudeOverview: string;
    cursorRules: string;
    agentSetup: string;
    cliReadme: string;
    cli: string;
    cliLicense: string;
    formatRepo: string;
    formatLicense: string;
    dogfood: string;
    pluginRepo: string;
    pluginLicense: string;
    pluginSkills: string;
    pluginReadme: string;
    studioRepo: string;
    studioLicense: string;
    studioReadme: string;
    cliSkills: string;
    specStudio: string;
    templateArticle: string;
    lintArticle: string;
    feature: string;
    acceptance: string;
    openSpecCli: string;
    openSpecRepo: string;
    tmRepo: string;
    specKitDocs: string;
    tools: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface ManageArticleCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  updated: string;
  breadcrumb: string;
  hero: Block;
  storeTitle: string;
  store: Block[];
  versionTitle: string;
  version: Block[];
  reviewTitle: string;
  review: Block[];
  currentTitle: string;
  current: Block[];
  workflowCaption: string;
  currentAfter: Block[];
  compareTitle: string;
  compare: Block[];
  faqTitle: string;
  faqs: { q: string; a: Block }[];
  sourcesTitle: string;
  sourcesNote: string;
  sourceLabel: {
    specTree: string;
    featureStatus: string;
    planSnapshots: string;
    formatRepo: string;
    formatLicense: string;
    cli: string;
    cliLicense: string;
    specGo39: string;
    specGo55: string;
    lintRules39: string;
    lintRules55: string;
    dogfood: string;
    validators: string;
    lintArticle: string;
    earsArticle: string;
    acceptanceArticle: string;
    templateArticle: string;
    feature: string;
    plan: string;
    specKitSdd: string;
    openSpecCli: string;
    openSpecRepo: string;
    tools: string;
  };
  relatedTitle: string;
  related: { href: string; label: string }[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
}

export interface IndexArticle {
  href: string;
  title: string;
  summary: string;
}

export interface IndexCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hero: Block;
  listLabel: string;
  articles: IndexArticle[];
}

export interface ArticleLocale {
  ears: EarsArticleCopy;
  acceptance: AcceptanceArticleCopy;
  lint: LintArticleCopy;
  template: TemplateArticleCopy;
  agents: AgentsArticleCopy;
  manage: ManageArticleCopy;
  index: IndexCopy;
}

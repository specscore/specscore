// Shared shape for /articles/ pages. Prose is a list of inline runs so
// links, code, and emphasis stay typed instead of raw HTML.

export type Inline =
  | string
  | { c: string }
  | { s: string }
  | { e: string }
  | { a: string; href: string; kind?: 'us' | 'them' };

export type Block = Inline[];

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

export interface ArticleCopy {
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

export interface IndexCopy {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hero: Block;
  listLabel: string;
  articleTitle: string;
  articleSummary: string;
}

export interface ArticleLocale {
  article: ArticleCopy;
  index: IndexCopy;
}

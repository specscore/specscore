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

export interface ArticleCopy {
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

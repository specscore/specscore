// Shared shape for the spec-driven development tools roundup.
// Prose is a list of inline runs so links stay typed.

export type Inline =
  | string
  | { c: string }
  | { s: string }
  | { e: string }
  | { a: string; href: string; kind?: 'us' | 'them' };

export type Block = Inline[];

export interface ToolCopy {
  /** Visible name. The vs-page link is added by the renderer from `slug`. */
  name: string;
  what: Block;
  storage: Block;
  validation: Block;
  licence: Block;
  suits: Block;
  paragraphs: Block[];
}

export interface Source {
  href: string;
  label: string;
}

export interface RoundupPage {
  lang: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** First paragraph: definitions. Rendered as the hero lede. */
  hero: Block;
  /** Paragraphs immediately under the lede. */
  lede: Block[];
  breadcrumb: string;
  tableTitle: string;
  tableNote: string;
  tableLabel: string;
  colTool: string;
  colWhat: string;
  colStorage: string;
  colValidation: string;
  colLicence: string;
  colSuits: string;
  tools: Record<string, ToolCopy>;
  chooseTitle: string;
  choose: Block[];
  sourcesTitle: string;
  sourcesNote: string;
  sources: Source[];
  ctaTitle: string;
  ctaInstall: string;
  ctaSkills: string;
  ctaGithub: string;
  installHref: string;
  skillsHref: string;
}

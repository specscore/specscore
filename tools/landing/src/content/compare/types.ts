// Shared shape for /vs/ comparison pages. Prose is a list of inline
// runs so links, code, and emphasis stay typed instead of raw HTML.

export type Inline =
  | string
  | { c: string }
  | { s: string }
  | { e: string }
  | { a: string; href: string; kind?: 'us' | 'them' };

export type Block = Inline[];

export interface Card {
  title: string;
  body: Block;
  /** Show the real `specscore spec lint` sample under the card. */
  terminal?: boolean;
}

export interface TableRow {
  cap: string;
  them: Block;
  us: Block;
}

export interface Source {
  href: string;
  label: string;
}

export interface ComparePage {
  slug: string;
  competitor: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  hero: Block;
  shared: Block[];
  creditTitle: string;
  creditNote: Block;
  credits: Card[];
  tableNote: string;
  tableLabel: string;
  rows: TableRow[];
  diffs: Card[];
  whenThemTitle: string;
  whenThem: Block[];
  whenUs: Block[];
  bridgeTitle: string;
  bridge: Block[];
  sources: Source[];
}

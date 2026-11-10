import { localeHref, type LangCode } from '../../lib/languages.ts';
import { copy as en } from './locales/delivery/en.ts';
import { copy as es } from './locales/delivery/es.ts';
import { copy as de } from './locales/delivery/de.ts';
import { copy as fr } from './locales/delivery/fr.ts';
import { copy as it } from './locales/delivery/it.ts';
import { copy as pl } from './locales/delivery/pl.ts';
import { copy as pt_br } from './locales/delivery/pt-br.ts';
import { copy as ru } from './locales/delivery/ru.ts';
import { copy as tr } from './locales/delivery/tr.ts';
import { copy as uk } from './locales/delivery/uk.ts';
import { copy as ja } from './locales/delivery/ja.ts';
import { copy as zh_cn } from './locales/delivery/zh-cn.ts';
import { copy as zh_tw } from './locales/delivery/zh-tw.ts';
import { copy as ko } from './locales/delivery/ko.ts';

export interface DeliveryCopy {
  title: string;
  description: string;
  promoTitle: string;
  promoBody: string;
  readArticle: string;
  explore: string;
  breadcrumb: string;
  relatedTitle: string;
  relatedLink: string;
  intro: string;
  sections: { title: string; paragraphs: string[] }[];
  reviewTitle: string;
  reviewLines: string[];
  ctaTitle: string;
  ctaBody: string;
  mentorBody: string;
  mentorLink: string;
  disclosure: string;
}

const copies: Record<LangCode, DeliveryCopy> = {
  'en': en,
  'es': es,
  'de': de,
  'fr': fr,
  'it': it,
  'pl': pl,
  'pt-br': pt_br,
  'ru': ru,
  'tr': tr,
  'uk': uk,
  'ja': ja,
  'zh-cn': zh_cn,
  'zh-tw': zh_tw,
  'ko': ko
};
export const deliverySlug = 'weekly-delivery';
export const deliveryRoute = `/articles/${deliverySlug}/`;
export function deliveryCopy(locale: LangCode): DeliveryCopy { return copies[locale]; }

export function committedMeHref(locale: LangCode, placement: 'homepage_direct' | 'article_footer' | 'article_mentor'): string {
  const destination = locale === 'ru' ? 'ru' : 'en';
  const route = placement === 'article_mentor' ? 'become-a-mentor/' : 'for/builders/';
  const url = new URL(`https://committedme.com/${destination}/${route}`);
  url.search = new URLSearchParams({
    utm_source: 'specscore',
    utm_medium: 'ecosystem_referral',
    utm_campaign: 'committedme_cross_promotion',
    utm_content: placement,
  }).toString();
  return url.toString();
}

export function deliveryMarkdown(locale: LangCode): string {
  const copy = deliveryCopy(locale);
  return [
    `# ${copy.title}`, '',
    `Canonical: https://specscore.md${localeHref(locale, deliveryRoute)}`, '',
    copy.intro, '',
    ...copy.sections.flatMap((section) => [`## ${section.title}`, '', ...section.paragraphs.flatMap((paragraph) => [paragraph, ''])]),
    `## ${copy.reviewTitle}`, '', ...copy.reviewLines.map((line) => `- ${line}`), '',
    `## ${copy.ctaTitle}`, '', copy.ctaBody, '',
    `[${copy.explore}](${committedMeHref(locale, 'article_footer')})`, '',
    copy.mentorBody, '', `[${copy.mentorLink}](${committedMeHref(locale, 'article_mentor')})`, '',
    copy.disclosure, '',
    `## ${copy.relatedTitle}`, '',
    `[${copy.relatedLink}](https://specscore.md${localeHref(locale, '/articles/acceptance-criteria/')})`, '',
  ].join('\n');
}

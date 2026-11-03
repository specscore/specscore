import type { LangCode } from '../lib/languages.ts';

/** Visible "last updated" date for pages this change touches. */
export const CONTENT_UPDATED = '2026-10-30';

export const updatedSentence: Record<LangCode, string> = {
  en: 'Last updated: 30 October 2026',
  es: 'Última actualización: 30 de octubre de 2026',
  de: 'Zuletzt aktualisiert: 30. Oktober 2026',
  fr: 'Dernière mise à jour : 30 octobre 2026',
  it: 'Ultimo aggiornamento: 30 ottobre 2026',
  pl: 'Ostatnia aktualizacja: 30 października 2026',
  'pt-br': 'Última atualização: 30 de outubro de 2026',
  ru: 'Обновлено: 30 октября 2026 г.',
  tr: 'Son güncelleme: 30 Ekim 2026',
  uk: 'Оновлено: 30 жовтня 2026 р.',
  ja: '最終更新：2026年10月30日',
  'zh-cn': '最后更新：2026年10月30日',
  'zh-tw': '最後更新：2026年10月30日',
  ko: '마지막 업데이트: 2026년 10월 30일',
};

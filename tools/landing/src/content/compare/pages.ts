import type { LangCode } from '../../lib/languages.ts';
import type { ComparePage } from './types.ts';

import { kiro as kiro_en } from './locales/en/kiro.ts';
import { kiro as kiro_es } from './locales/es/kiro.ts';
import { kiro as kiro_de } from './locales/de/kiro.ts';
import { kiro as kiro_fr } from './locales/fr/kiro.ts';
import { kiro as kiro_it } from './locales/it/kiro.ts';
import { kiro as kiro_pl } from './locales/pl/kiro.ts';
import { kiro as kiro_pt_br } from './locales/pt-br/kiro.ts';
import { kiro as kiro_ru } from './locales/ru/kiro.ts';
import { kiro as kiro_tr } from './locales/tr/kiro.ts';
import { kiro as kiro_uk } from './locales/uk/kiro.ts';
import { kiro as kiro_ja } from './locales/ja/kiro.ts';
import { kiro as kiro_zh_cn } from './locales/zh-cn/kiro.ts';
import { kiro as kiro_zh_tw } from './locales/zh-tw/kiro.ts';
import { kiro as kiro_ko } from './locales/ko/kiro.ts';

import { tessl as tessl_en } from './locales/en/tessl.ts';
import { tessl as tessl_es } from './locales/es/tessl.ts';
import { tessl as tessl_de } from './locales/de/tessl.ts';
import { tessl as tessl_fr } from './locales/fr/tessl.ts';
import { tessl as tessl_it } from './locales/it/tessl.ts';
import { tessl as tessl_pl } from './locales/pl/tessl.ts';
import { tessl as tessl_pt_br } from './locales/pt-br/tessl.ts';
import { tessl as tessl_ru } from './locales/ru/tessl.ts';
import { tessl as tessl_tr } from './locales/tr/tessl.ts';
import { tessl as tessl_uk } from './locales/uk/tessl.ts';
import { tessl as tessl_ja } from './locales/ja/tessl.ts';
import { tessl as tessl_zh_cn } from './locales/zh-cn/tessl.ts';
import { tessl as tessl_zh_tw } from './locales/zh-tw/tessl.ts';
import { tessl as tessl_ko } from './locales/ko/tessl.ts';

import { bmadMethod as bmadMethod_en } from './locales/en/bmad.ts';
import { bmadMethod as bmadMethod_es } from './locales/es/bmad.ts';
import { bmadMethod as bmadMethod_de } from './locales/de/bmad.ts';
import { bmadMethod as bmadMethod_fr } from './locales/fr/bmad.ts';
import { bmadMethod as bmadMethod_it } from './locales/it/bmad.ts';
import { bmadMethod as bmadMethod_pl } from './locales/pl/bmad.ts';
import { bmadMethod as bmadMethod_pt_br } from './locales/pt-br/bmad.ts';
import { bmadMethod as bmadMethod_ru } from './locales/ru/bmad.ts';
import { bmadMethod as bmadMethod_tr } from './locales/tr/bmad.ts';
import { bmadMethod as bmadMethod_uk } from './locales/uk/bmad.ts';
import { bmadMethod as bmadMethod_ja } from './locales/ja/bmad.ts';
import { bmadMethod as bmadMethod_zh_cn } from './locales/zh-cn/bmad.ts';
import { bmadMethod as bmadMethod_zh_tw } from './locales/zh-tw/bmad.ts';
import { bmadMethod as bmadMethod_ko } from './locales/ko/bmad.ts';

import { taskMaster as taskMaster_en } from './locales/en/task-master.ts';
import { taskMaster as taskMaster_es } from './locales/es/task-master.ts';
import { taskMaster as taskMaster_de } from './locales/de/task-master.ts';
import { taskMaster as taskMaster_fr } from './locales/fr/task-master.ts';
import { taskMaster as taskMaster_it } from './locales/it/task-master.ts';
import { taskMaster as taskMaster_pl } from './locales/pl/task-master.ts';
import { taskMaster as taskMaster_pt_br } from './locales/pt-br/task-master.ts';
import { taskMaster as taskMaster_ru } from './locales/ru/task-master.ts';
import { taskMaster as taskMaster_tr } from './locales/tr/task-master.ts';
import { taskMaster as taskMaster_uk } from './locales/uk/task-master.ts';
import { taskMaster as taskMaster_ja } from './locales/ja/task-master.ts';
import { taskMaster as taskMaster_zh_cn } from './locales/zh-cn/task-master.ts';
import { taskMaster as taskMaster_zh_tw } from './locales/zh-tw/task-master.ts';
import { taskMaster as taskMaster_ko } from './locales/ko/task-master.ts';

function pack(entries: Record<LangCode, ComparePage>): Record<LangCode, ComparePage> {
  return entries;
}

export const pages: Record<string, Record<LangCode, ComparePage>> = {
  'kiro': pack({
    en: kiro_en,
    es: kiro_es,
    de: kiro_de,
    fr: kiro_fr,
    it: kiro_it,
    pl: kiro_pl,
    'pt-br': kiro_pt_br,
    ru: kiro_ru,
    tr: kiro_tr,
    uk: kiro_uk,
    ja: kiro_ja,
    'zh-cn': kiro_zh_cn,
    'zh-tw': kiro_zh_tw,
    ko: kiro_ko,
  }),
  'tessl': pack({
    en: tessl_en,
    es: tessl_es,
    de: tessl_de,
    fr: tessl_fr,
    it: tessl_it,
    pl: tessl_pl,
    'pt-br': tessl_pt_br,
    ru: tessl_ru,
    tr: tessl_tr,
    uk: tessl_uk,
    ja: tessl_ja,
    'zh-cn': tessl_zh_cn,
    'zh-tw': tessl_zh_tw,
    ko: tessl_ko,
  }),
  'bmad-method': pack({
    en: bmadMethod_en,
    es: bmadMethod_es,
    de: bmadMethod_de,
    fr: bmadMethod_fr,
    it: bmadMethod_it,
    pl: bmadMethod_pl,
    'pt-br': bmadMethod_pt_br,
    ru: bmadMethod_ru,
    tr: bmadMethod_tr,
    uk: bmadMethod_uk,
    ja: bmadMethod_ja,
    'zh-cn': bmadMethod_zh_cn,
    'zh-tw': bmadMethod_zh_tw,
    ko: bmadMethod_ko,
  }),
  'task-master-ai': pack({
    en: taskMaster_en,
    es: taskMaster_es,
    de: taskMaster_de,
    fr: taskMaster_fr,
    it: taskMaster_it,
    pl: taskMaster_pl,
    'pt-br': taskMaster_pt_br,
    ru: taskMaster_ru,
    tr: taskMaster_tr,
    uk: taskMaster_uk,
    ja: taskMaster_ja,
    'zh-cn': taskMaster_zh_cn,
    'zh-tw': taskMaster_zh_tw,
    ko: taskMaster_ko,
  }),
};

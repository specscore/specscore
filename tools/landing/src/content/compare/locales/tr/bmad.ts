import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const bmad = 'https://github.com/bmad-code-org/BMAD-METHOD';
const bmadLicense = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/LICENSE';
const workflow = 'https://github.com/bmad-code-org/BMAD-METHOD/blob/main/docs/reference/workflow-map.md';

export const bmadMethod: ComparePage = {
  slug: 'bmad-method',
  competitor: 'BMAD Method',
  metaTitle: 'BMAD Method alternatifi: SpecScore ve BMAD.',
  metaDescription:
    'SpecScore ve BMAD Method (Çevik Yapay Zeka Güdümlü Geliştirme için Atılım Yöntemi): çevik bir ajan iş akışı ile CI’da lint edilen bir spesifikasyon biçiminin karşılaştırması. 30 Ekim 2026’da kontrol edildi.',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Çevik Yapay Zeka Güdümlü Geliştirme için Atılım Yöntemi), çevik teslimatı yapay zeka ajanlarıyla yürütmenin ',
    { a: 'açık kaynak', href: bmad, kind: 'them' },
    ' bir yoludur: işi netleştirir, planlar, inşa eder ve denetler; kararlar yazıya dökülür. Bir ürün gereksinimleri belgesi (PRD), neyin kimin için yapılacağının düz yazı açıklamasıdır. Yöntemin iş akışı haritası önce bir PRD, sonra mimari ve hikâyeler üretir. ',
    { a: 'Spesifikasyon odaklı geliştirme', href: '/tr/spec-driven-development/' },
    ' (SDD), ikisinin de içinde durduğu daha geniş fikirdir — davranış koddan önce belirtilir. ',
    { a: 'SpecScore', href: '/tr/' },
    ', bu spesifikasyon için ',
    { a: 'açık kaynak', href: repo, kind: 'us' },
    ' bir biçimdir ve bir ',
    { a: 'komut satırı arayüzü', href: '/tr/cli/' },
    ' (CLI) ile gelir. ',
    { a: 'Sürekli entegrasyon', href: '/tr/validators/' },
    ' (CI) — önerilen her değişiklikte çalışan otomatik bir denetim — bir SpecScore dosyası yapısal olarak yanlış olduğunda düşebilir.',
  ],
  shared: [
    ['İkisi de, ajanın kodu yazarken ürünü icat etmesine izin vermez.'],
    ['İkisi de plan belgelerini depoda, işin yanında, Markdown olarak tutar.'],
    ['İkisi de, uygulama uzaklaşmadan önce bir insanın planı onaylamasını bekler.'],
  ],
  creditTitle: 'BMAD Method’un iyi yaptığı şeyler.',
  creditNote: [
    '30 Ekim 2026’da okunan proje README’si v6.12’yi kararlı sürüm, v7’yi main dalındaki bir önizleme olarak adlandırır. O README’deki v7 tarihi çoktan geçmişti. Satır adlarını bir anlık görüntü olarak alın.',
  ],
  credits: [
    {
      title: 'Kendini işin boyutuna uyduran bir yöntem',
      body: [
        'README, küçük değişikliklerin doğrudan yapım aşamasına gittiğini, daha büyük işin planlandığını söyler. ',
        { a: 'main üzerindeki iş akışı haritası', href: workflow, kind: 'them' },
        ' aşamaları yazar: bir PRD (',
        { c: 'PRD.md' },
        '), isteğe bağlı bir UX spesifikasyonu, karar kayıtları olan ',
        { c: 'architecture.md' },
        ', epik ve hikâye dosyaları, sonra bir sprint. Bu tek bir istem değil, çevik bir döngüdür.',
      ],
    },
    {
      title: 'Uygulamadan önce bir kapı',
      body: [
        'Aynı harita ',
        { c: 'bmad-check-implementation-readiness' },
        ' adımını listeler. Uygulamadan önce PASS, CONCERNS veya FAIL döner. v6 ürün yöneticisi ajanının bir validate-PRD adımı da vardır. Bunlar ajanın çalıştırdığı iş akışı kapılarıdır. Gelişigüzel bir Markdown ağacına yönelttiğiniz ayrı bir biçim linter’ı değildir.',
      ],
    },
    {
      title: 'Gerçekten yayımlanmıştır',
      body: [
        'Yöntem, genel bir depoda ',
        { a: 'MIT lisanslıdır', href: bmadLicense, kind: 'them' },
        '. README’deki kararlı kurulum ',
        { c: 'npx bmad-method install' },
        ' komutudur ve Node.js 20.12 veya daha yenisini, Python 3.10 veya daha yenisini ister. ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' sitesi yöntemin ücretsiz olduğunu söyler.',
      ],
    },
  ],
  tableNote: 'BMAD süreçtir. SpecScore, bir sürecin hedefleyebildiği eser biçimidir. Tablo bu rolleri karşılaştırır.',
  tableLabel: 'SpecScore ve BMAD Method özellik karşılaştırması',
  rows: [
    {
      cap: 'Birincil rol',
      them: ['Çevik yöntem: fikirden doğrulanmış koda ajanlar, beceriler ve iş akışları'],
      us: [{ s: 'Açık spesifikasyon biçimi + CLI' }],
    },
    {
      cap: 'Plan eserleri',
      them: ['PRD, UX spesifikasyonu, mimari, epikler ve hikâyeler, sprint durumu — 30 Ekim 2026’da okunan iş akışı haritasında'],
      us: ['Gereksinim kimlikleriyle, bir spec/ ağacında ', { s: 'fikirler, özellikler, planlar ve görevler' }],
    },
    {
      cap: 'İşi denetlemek',
      them: ['Ajanın çalıştırdığı hazırlık kapısı (PASS / CONCERNS / FAIL) ve bir validate-PRD iş akışı'],
      us: [
        'CI içinde belirlenimci ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        ' elle verilen bir yapay zeka notudur.',
      ],
    },
    {
      cap: 'Gereksinim kimlikleri',
      them: ['PRD ve epik dosyalarının içindeki hikâyeler ve işlevsel gereksinimler. SpecScore REQ: slug değildir.'],
      us: [{ s: 'REQ: slug' }, ' ve kabul kriteri kimlikleri'],
    },
    {
      cap: 'Çalışma zamanı',
      them: ['README’de anlatılan v6.12 kurucusu için Node.js ve Python'],
      us: ['Tek bir Go ikili dosyasının ötesinde ', { s: 'hiçbir şey gerekmez' }],
    },
    {
      cap: 'Lisans',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' biçim · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'Denetim bir komuttur, yöntemin içindeki bir adım değil',
      terminal: true,
      body: [
        'BMAD’ın hazırlık sonucu, kendi iş akışının içindeki bir karardır. SpecScore’un sonucu bir süreç çıkış kodudur. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' her pull request’te ',
        { c: 'specscore spec lint' },
        ' çalıştırır. ',
        { a: '/score', href: score, kind: 'us' },
        ' bir eseri, depoda yapılandırılmış gözden geçirenlerle notlar. Onu siz çağırırsınız. CI çağırmaz.',
      ],
    },
    {
      title: 'Biçim, başka bir yöntemi de aşar',
      body: [
        'BMAD’ın belgeleri kendi iş akışlarının biçimini taşır. BMAD’ı çalıştırmayı bırakırsanız Markdown durur, ama yöntemin dışında biçimi zorlayan bir şey kalmaz. Bir SpecScore ağacı sözleşmedir. BMAD dahil başka bir iş akışı onu yazabilir ve linter yine uygulanır.',
      ],
    },
    {
      title: 'Hikâyeler ve gereksinimler kimlikle bağlı kalır',
      body: [
        'BMAD hikâyeleri bağlamı ileri taşır; ajan ürünü yeniden kararlaştırmaz. SpecScore bağı mekanik kılar: bir plan görevi ',
        { c: 'REQ: slug' },
        ' anar, ',
        { c: 'specscore:' },
        ' işaretleri ile ',
        { c: 'Verifies:' },
        ' commit fragmanları kodu kritere geri yöneltir.',
      ],
    },
  ],
  whenThemTitle: 'BMAD Method’u şu durumlarda seçin…',
  whenThem: [
    ['Role özgü iş akışlarıyla ajanların yürüttüğü tam bir çevik döngü — PRD, mimari, hikâyeler, sprint — istediğinizde.'],
    ['Hazırlık kapısını ve yöntemin getirdiği ürün, mimari ve test bakış açılarının kurulunu istediğinizde.'],
    ['Bir ekibin nasıl istem yazacağını standartlaştırıyorsanız ve standart, yöntemin becerileriyse.'],
  ],
  whenUs: [
    ['O gün BMAD iş akışını kimse çalıştırmasa bile, bir başlık, bir bağlantı veya bir durum yanlış olduğunda spesifikasyonun CI’da düşmesi gerektiğinde.'],
    ['Yalnızca bir yöntemin hikâye dosyalarının içinde değil, araçlar arasında kararlı gereksinim kimlikleri gerektiğinde.'],
    ['Başka bir sürecin hedefleyebildiği ', { a: 'açık kaynak', href: repo, kind: 'us' }, ' bir biçim istediğinizde.'],
  ],
  bridgeTitle: 'Yöntem, biçimi yazabilir.',
  bridge: [
    [
      'BMAD “işi nasıl yürütürüz” sorusuna yanıt verir. SpecScore “sözleşme hangi dosyadır ve CI onun bozulmadığını nasıl bilir” sorusuna yanıt verir. Bir ekip konuşma için BMAD’ın PRD’sini ve hikâyelerini, lint edilmesi gereken gereksinimler için bir SpecScore özelliğini tutabilir.',
    ],
    [
      'Döngü için BMAD Method’u kullanın. Pull request’in denetlediği eser için SpecScore’u kullanın.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — MIT lisansı' },
    { href: workflow, label: 'BMAD iş akışı haritası (main, 30 Ekim 2026’da okundu)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI iş akışı' },
    { href: score, label: 'specstudio-skills — /score becerisi' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

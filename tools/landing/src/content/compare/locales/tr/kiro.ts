import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro alternatifi: SpecScore ve Kiro spesifikasyonları.',
  metaDescription:
    'SpecScore ve Kiro. Kiro, EARS gereksinimleri yazan, Amazon Web Services (AWS) ajanlı IDE’sidir. SpecScore, CI’ın lint edebildiği açık bir spesifikasyon biçimidir. 30 Ekim 2026’da kontrol edildi.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Spesifikasyon odaklı geliştirme', href: '/tr/spec-driven-development/' },
    ' (SDD), bir yapay zeka ajanı kodu yazmadan önce yazılımın ne yapması gerektiğini yazıya dökmek demektir. Amazon Web Services (AWS) ürünü ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', ajanlı bir geliştirme ortamıdır — bir editör, bir ',
    { a: 'komut satırı arayüzü', href: '/tr/cli/' },
    ' (CLI) ve bir web uygulaması — ve bir istemi Kiro spesifikasyonlarına çevirir: gereksinimler, bir tasarım ve görevler. Bu gereksinimler ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Gereksinim Sözdizimine Kolay Yaklaşım) kullanır. Cümleler “WHEN bir şey olduğunda, THE SYSTEM SHALL bir şey yapsın” biçimindedir. ',
    { a: 'SpecScore', href: '/tr/' },
    ', spesifikasyonun kendisi için ',
    { a: 'açık kaynak', href: repo, kind: 'us' },
    ' bir biçimdir ve dosyaları denetleyen bir CLI ile gelir. ',
    { a: 'Sürekli entegrasyon', href: '/tr/validators/' },
    ' (CI) — önerilen her değişiklikte çalışan otomatik bir denetim — biçimi bozan bir SpecScore spesifikasyonunu reddedebilir.',
  ],
  shared: [
    ['İkisi de, ajanın üretmesi gereken şeyin dayanağını bir sohbet dökümü değil, yazılmış bir spesifikasyon olarak görür.'],
    ['İkisi de bu spesifikasyonu projede Markdown olarak tutar; böylece kod gibi gözden geçirilebilir.'],
    ['İkisi de işi gereksinimlere, bir tasarıma ve görevlere böler. Kiro bu üç dosyayı üretir. SpecScore, oturum bittikten sonra da ekibin saklayabildiği bir biçimdir.'],
  ],
  creditTitle: 'Kiro’nun iyi yaptığı şeyler.',
  creditNote: [
    'Ürünü, 30 Ekim 2026’da okunan Kiro’nun kendi belgeleri anlatır. Özellik spesifikasyonu sayfası 4 Ağustos 2026’da güncellenmiş olarak işaretlenmişti.',
  ],
  credits: [
    {
      title: 'Sabit bir cümle biçimindeki gereksinimler',
      body: [
        'Kiro spesifikasyonları davranışı ',
        { c: 'requirements.md' },
        ' içine tek bir EARS kalıbıyla yazar: bir koşul geçerliyken WHEN, sistem bir şey yapmalıdır THE SYSTEM SHALL. Belgeler, geçersiz verili bir form örneği verir; sistem alanın yanında bir doğrulama hatası gösterir. Bu biçim, bulanık bir paragraftan daha kolay sınanır.',
      ],
    },
    {
      title: 'İstemden görevlere uzanan tam bir yol',
      body: [
        'Bir özellik spesifikasyonu gereksinimlerden, tasarımdan (',
        { c: 'design.md' },
        ') ve görevlerden (',
        { c: 'tasks.md' },
        ') geçer. Gereksinimlerden ya da bir tasarımdan başlanabilir. Quick Spec üçünü, arada bir onay durağı olmadan çalıştırır. Hata düzeltme spesifikasyonları ayrı bir yoldur. Belgeler, ',
        { c: 'tasks.md' },
        ' içindeki bağımlılık grafiğinden bağımsız görevlerin dalgalar halinde paralel çalıştırılmasını da anlatır.',
      ],
    },
    {
      title: 'Ürünün içindeki denetimler',
      body: [
        'IDE’de ve CLI’da kullanılabilen Analyze Requirements, tasarımdan önce tutarsızlıkları, belirsizliği, çatışan kısıtları ve boşlukları arar. Correctness — o EARS satırlarından türetilen özellik tabanlı testler — spesifikasyon yetenek tablosunda yalnızca IDE için listelenir; CLI, web veya mobil için değil.',
      ],
    },
  ],
  tableNote: 'Kiro, spesifikasyon taslağı çıkaran bir üründür. SpecScore, bir deponun denetleyebildiği biçimdir. Tablo bu rolleri karşılaştırır.',
  tableLabel: 'SpecScore ve Kiro özellik karşılaştırması',
  rows: [
    {
      cap: 'Birincil rol',
      them: ['Spesifikasyon taslağı çıkarıp görevleri uygulayan ajanlı IDE, CLI ve web uygulaması'],
      us: [{ s: 'Açık spesifikasyon biçimi + CLI' }],
    },
    {
      cap: 'Spesifikasyon dosyaları',
      them: [{ c: 'requirements.md' }, ' (veya ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: ['Markdown + YAML’dan oluşan bir ', { s: 'spec/ ağacı' }],
    },
    {
      cap: 'Gereksinim sözdizimi',
      them: ['EARS kalıbı: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Gereksinim kimlikleri' },
        ' (',
        { c: 'REQ: slug' },
        ') ve ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
        ' kabul kriterleri',
      ],
    },
    {
      cap: 'Spesifikasyonu denetlemek',
      them: ['IDE ve CLI’da Analyze Requirements. IDE’de özellik tabanlı testler. Kendi CI’ınız için bir biçim linter’ı olarak anlatılmaz.'],
      us: [
        'CI içinde ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        ' ayrı, elle çalıştırılan bir yapay zeka notudur.',
      ],
    },
    {
      cap: 'Nerede çalışır',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Bazı denetimler yalnızca IDE’dedir.'],
      us: [{ s: 'Herhangi bir depo' }, ' — tek bir Go ikili dosyası, Kiro hesabı gerekmez'],
    },
    {
      cap: 'Lisans',
      them: [
        { a: 'Kiro lisansı', href: 'https://kiro.dev/license/', kind: 'them' },
        ', IDE ve CLI’nın AWS Müşteri Sözleşmesi kapsamındaki AWS Content olduğunu söyler. Kiro Crew ayrı bir ',
        { a: 'genel depodur', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' biçim · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: 'Fiyat',
      them: [
        'Ücretsiz bir katman ve ücretli planlar vardır. Rakamlar değişir — 30 Ekim 2026’da okunan ',
        { a: 'Kiro fiyatlandırmasına', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ' bakın.',
      ],
      us: ['Biçim ve CLI için ', { s: 'ücret yoktur' }],
    },
  ],
  diffs: [
    {
      title: 'Biçim, tek başına CI’ı düşürür',
      terminal: true,
      body: [
        'Kiro’nun analizi Kiro’nun içinde çalışır. SpecScore’un denetimi bir komuttur. Bu deponun ',
        { a: 'dogfood iş akışı', href: dogfood, kind: 'us' },
        ' her pull request’te ve main üzerinde ',
        { c: 'specscore spec lint' },
        ' çalıştırır. Bozuk bir spesifikasyon, bozuk bir test gibi işi düşürür. ',
        { a: '/score', href: score, kind: 'us' },
        ' becerisi, yapay zeka gözden geçirenleriyle sözcükleri notlar. Bu geçiş elle yapılır ve yukarıdaki iş akışı onu çalıştırmaz.',
      ],
    },
    {
      title: 'Spesifikasyon tek bir IDE’ye bağlı değildir',
      body: [
        'Kiro spesifikasyonları Markdown’dır; ürün olmadan da okunabilir. Onları oluşturan ve yürüten iş akışı Kiro’nundur. Bir SpecScore ağacı, Claude Code, Cursor, Copilot veya hiç ajan olmadığında da aynı dosyalardır. CLI, lint için bir model çağırmaz.',
      ],
    },
    {
      title: 'Gereksinimlerin bir kimliği kalır',
      body: [
        'Kiro’nun belgeleri izlenebilirliği, bir gereksinimi uygulamaya kadar izlemek olarak anlatır. Yeniden yazmayı aşan kararlı bir kimlik anlatmaz. SpecScore bir gereksinimi ',
        { c: 'REQ: slug' },
        ' olarak adresler ve bir kabul kriterini kendi kimliğiyle adresler.',
      ],
    },
    {
      title: 'EARS ile Given/When/Then farklı sorulara yanıt verir',
      body: [
        'Kiro’nun belgelediği haliyle EARS, sistem davranışının tek cümlesidir. SpecScore kabul kriterleri, bir gereksinim kimliğine bağlı Given/When/Then senaryolarıdır. Düz yazıda bir EARS satırı yazılıp senaryo, linter’ın denetlediği SpecScore dosyasında tutulabilir.',
      ],
    },
  ],
  whenThemTitle: 'Kiro’yu şu durumlarda seçin…',
  whenThem: [
    ['Bir istemden gereksinim, tasarım ve görev taslağı çıkarıp sonra görevleri uygulayan bir AWS ajanlı IDE istediğinizde.'],
    ['EARS cümleleri ve IDE’de onlardan üretilen özellik tabanlı testler istediğinizde.'],
    ['Ekibiniz zaten Kiro’nun editörünü, CLI’sini veya web uygulamasını standart haline getiriyorsa.'],
  ],
  whenUs: [
    ['Ajan oturumu bittikten sonra spesifikasyonun, Kiro gerektirmeyen bir depoda CI içinde geçerli kalması gerektiğinde.'],
    ['Gereksinim kimlikleri, yaşam döngüsü durumu ve belirlenimci bir lint sonucu gerektiğinde.'],
    ['Biçimin ', { a: 'açık kaynak', href: repo, kind: 'us' }, ' olmasını ve denetleyicinin tek bir ikili dosya olmasını istediğinizde.'],
  ],
  bridgeTitle: 'Kiro taslak çıkarabilir. SpecScore kapı tutabilir.',
  bridge: [
    [
      'Buradaki hiçbir şey Kiro’nun editörünün yerine geçmez. Ekip istemleri Kiro’da yazıyorsa taslağı ona bırakın. Spesifikasyon gözden geçirilen bir dosya olarak kalacaksa o sözleşmeyi SpecScore ile yazın ve yapı bozulduğunda ',
      { c: 'specscore spec lint' },
      ' pull request’i düşürsün. İki dosya aynı depoda durabilir.',
    ],
    [
      'Oturum için Kiro’yu seçin. Bir CI işinin reddedebileceği eser için SpecScore’u seçin.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro belgeleri — Spesifikasyonlar' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro belgeleri — Özellik spesifikasyonları ve EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — Hakkında' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — Lisans' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Fiyatlandırma' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI iş akışı' },
    { href: score, label: 'specstudio-skills — /score becerisi' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

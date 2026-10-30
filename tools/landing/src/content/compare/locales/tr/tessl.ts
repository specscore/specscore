import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const tile = 'https://github.com/tesslio/spec-driven-development-tile';
const tilePage = 'https://tessl.io/registry/tessl-labs/spec-driven-development';
const essay = 'https://tessl.io/blog/from-code-centric-to-spec-centric';

export const tessl: ComparePage = {
  slug: 'tessl',
  competitor: 'Tessl',
  metaTitle: 'Tessl alternatifi: SpecScore ve kaynak olarak spesifikasyon.',
  metaDescription:
    'SpecScore ve Tessl. Tessl bir ajan becerileri platformudur; karosu ve 2025 denemesi spesifikasyonu kaynak sayar. SpecScore, taşınabilir bir biçimi CI’da lint eder. 30 Ekim 2026’da kontrol edildi.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Spesifikasyon odaklı geliştirme', href: '/tr/spec-driven-development/' },
    ' (SDD), amaçlanan davranışın spesifikasyonunun koddan önce yazılması demektir. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd), 30 Ekim 2026 itibarıyla bir ajan etkinleştirme platformudur: kodlama ajanlarının yüklediği beceriler, kurallar ve eklentiler için bir kayıt defteri ve kontrol düzlemi. “Kaynak olarak spesifikasyon”, Tessl’in ',
    { a: 'Haziran 2025 denemesindeki', href: essay, kind: 'them' },
    ' daha güçlü iddiadır: uzun ömürlü eser spesifikasyondur ve kod ondan türetilir. ',
    { a: 'SpecScore', href: '/tr/' },
    ', bu spesifikasyon için ',
    { a: 'açık kaynak', href: repo, kind: 'us' },
    ' bir dosya biçimidir ve bir ',
    { a: 'komut satırı arayüzü', href: '/tr/cli/' },
    ' (CLI) onu denetler. ',
    { a: 'Sürekli entegrasyon', href: '/tr/validators/' },
    ' (CI) — önerilen her değişiklikte çalışan otomatik bir denetim — bu depoda o denetimi çalıştırır.',
  ],
  shared: [
    ['İkisi de niyeti saklamak için bir istemin zayıf bir yer olduğunu söyler. Yazılmış bir spesifikasyon sohbetten uzun yaşamalıdır.'],
    ['İkisi de bir yapay zeka kodlama ajanının, kodu düzenlemeden önce spesifikasyonu okumasını bekler.'],
    ['İkisi de gereksinimlere test bağlayabilir; böylece “bitti” işaret edilebilen bir şey olur.'],
  ],
  creditTitle: 'Tessl’in iyi yaptığı şeyler.',
  creditNote: [
    'Tessl’in karıştırılması kolay iki yüzü vardır. Aşağıdaki notlar, 30 Ekim 2026’da okunan sayfalara göre onları ayrı tutar.',
  ],
  credits: [
    {
      title: 'Kaynak olarak spesifikasyon için açık bir sav',
      body: [
        'Simon Maple’ın 27 Haziran 2025 tarihli denemesi, bir ürün gereksinimleri belgesinin (PRD) — neyin yapılacağını insanlara anlatan düz yazının — genellikle bayatladığını, kodun ise tek doğruluk kaynağı haline geldiğini söyler. Denemenin alternatifi, değiştirdiğiniz şeyin spesifikasyon olması ve bir LLM’in ondan kod, test ve belgeleri üretmesidir. Bu bir slogan değil, gerçek bir duruştur.',
      ],
    },
    {
      title: 'Ajan bağlamı için bir platform',
      body: [
        { a: 'Tessl’in belgeleri', href: 'https://docs.tessl.io/', kind: 'them' },
        ' bir kayıt defterini, becerileri tarayıp puanlayan yönetişimi, değerlendirmeleri (evals) ve ajanlar arası gözlemlenebilirliği anlatır. Belgeler, becerilerin deponuzdaki yalın eserler olduğunu ve platformun Claude Code, Cursor, Copilot, Gemini ve başkalarıyla çalıştığını söyler. Oradaki puanlama bir beceriyi puanlamaktır, bir ürün spesifikasyonunu değil.',
      ],
    },
    {
      title: 'Kabuk denetimleri olan resmi bir spesifikasyon karosu',
      body: [
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' karosu (tile), ',
        { a: 'genel karo deposunda', href: tile, kind: 'them' },
        ' MIT lisanslıdır. Bir ajana görüşme yapmayı, ',
        { c: '.spec.md' },
        ' dosyaları yazmayı, onay beklemeyi, sonra uygulamayı öğretir. Kayıt defteri sayfası ',
        { c: 'scripts/validate-specs.sh' },
        ' ile ',
        { c: 'scripts/check-spec-links.sh' },
        ' betiklerini, frontmatter, ',
        { c: 'targets' },
        ' ve ',
        { c: '[@test]' },
        ' bağlantıları için listeler. Aynı sayfa, karoyu yönlendirici bağlam olarak tanımlar: özel komut yok, çerçeve yok.',
      ],
    },
  ],
  tableNote: '“Kaynak olarak spesifikasyon” Tessl’in denemesidir. Karo, bugünkü platformun üstündeki bir beceri paketidir. SpecScore, sürümlü bir linter’ı olan bir biçimdir.',
  tableLabel: 'SpecScore ve Tessl özellik karşılaştırması',
  rows: [
    {
      cap: 'Birincil rol',
      them: ['Ajan becerileri platformu, bir de spesifikasyon odaklı karo ve kaynak olarak spesifikasyon üzerine 2025 denemesi'],
      us: [{ s: 'Açık spesifikasyon biçimi + CLI' }],
    },
    {
      cap: 'Spesifikasyon nedir',
      them: ['Deneme: kodun kendisinden üretildiği uzun ömürlü kaynak. Karo: ajanın ona göre uyguladığı ve kodu sizde bırakan bir .spec.md.'],
      us: [{ s: 'Kodun yanındaki sözleşme' }, '. Lint kodu yeniden üretmez.'],
    },
    {
      cap: 'Spesifikasyonun biçimi',
      them: ['Karo: YAML frontmatter, targets globları ve test dosyalarına [@test] bağlantıları'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Spesifikasyonu denetlemek',
      them: ['O karoyu frontmatter ve bağlantıları için, karoyla birlikte gelen kabuk betikleri'],
      us: [
        'Bu deponun CI’ında, SpecScore biçimi üzerinde ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        ' elle verilen bir yapay zeka notudur.',
      ],
    },
    {
      cap: 'Lisans',
      them: [
        'Karo ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        ' lisanslıdır. Platform bir üründür. Belgeler, platformun kaynak kodunu yayımlamaz.',
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
        '30 Ekim 2026’da okunan ',
        { a: 'Tessl ana sayfası', href: 'https://tessl.io/', kind: 'them' },
        ', ücretsiz bir katmanı (bir çalışma alanında ayda 1,000 kredi) ve ücretli kurumsal planları anlatır.',
      ],
      us: ['Biçim ve CLI için ', { s: 'ücret yoktur' }],
    },
  ],
  diffs: [
    {
      title: 'Yayımlanmış bir biçim, karo betiği değil',
      terminal: true,
      body: [
        'Karonun kabuk betikleri, o karonun ajana yazdırdığı ',
        { c: '.spec.md' },
        ' dosyalarını denetler. SpecScore, bu sitede belgelenmiş bir biçimi denetler. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' sabitlenmiş bir ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' sürümünü kurar ve ',
        { c: 'specscore spec lint' },
        ' çalıştırır. ',
        { a: '/score', href: score, kind: 'us' },
        ' o iş değildir: yapay zeka gözden geçirenleri sorun bildirdiğinde sıfır dışında bir kodla çıkan, elle çalıştırılan bir beceridir.',
      ],
    },
    {
      title: 'Kod her iki durumda da sizde kalır — deneme daha ileri gider',
      body: [
        '2025 denemesi, kodun spesifikasyondan yeniden üretilmesi gerektiğini söyler. 30 Ekim 2026’da okunan sayfadaki karo, ajanın onaylanmış bir spesifikasyona göre uygulamasını anlatır ve kaynak ağacınızın yerine geçen bir derleyici tarif etmez. SpecScore kodu elinizden almaz. Spesifikasyon gözden geçirilen sözleşmedir; kod sizin kalır.',
      ],
    },
    {
      title: 'Gereksinimin kimliği',
      body: [
        'Karo bir gereksinimi ',
        { c: 'targets' },
        ' ve ',
        { c: '[@test]' },
        ' ile dosyalara yöneltir. SpecScore gereksinimi ',
        { c: 'REQ: slug' },
        ' diye adlandırır; böylece dosyalar taşındıktan sonra bir plan, bir görev ve bir commit fragmanı onu anabilir.',
      ],
    },
  ],
  whenThemTitle: 'Tessl’i şu durumlarda seçin…',
  whenThem: [
    ['Birçok ajan ve depo arasında paylaşılan beceriler için bir kayıt defteri, değerlendirmeler ve yönetişim gerektiğinde.'],
    ['Kaynak olarak spesifikasyon denemesinin iş akışını yönlendirici bir karo olarak istediğinizde: görüşme, bir .spec.md onayı, sonra uygulama.'],
    ['Tessl platformunu zaten satın alıyor veya deniyor ve o kayıt defterindeki spesifikasyon karosunu istiyorsanız.'],
  ],
  whenUs: [
    ['Tessl kurmayan depolar da dahil, spesifikasyon biçiminin kendisinin CI’da geçerli olması gerektiğinde.'],
    ['Gereksinim kimlikleri ve bir model çağırmayan bir linter istediğinizde.'],
    ['Biçimin, bir beceriler platformundan ayrı, Creative Commons lisansı altında ', { a: 'açık kaynak', href: repo, kind: 'us' }, ' olmasını istediğinizde.'],
  ],
  bridgeTitle: 'Kaynak olarak spesifikasyon ve lint edilebilen bir spesifikasyon.',
  bridge: [
    [
      'Bayat bir PRD’nin koda yenildiğini söyleyen Tessl denemesi haklıdır. Spesifikasyonun güvendiğiniz şey olarak kalmasının yolu, bir biçim denetimidir. SpecScore uygulamanızı spesifikasyondan üretmez. Yapı, bağlantılar veya durum yanlış olduğunda spesifikasyonun CI’da düşmesini sağlar.',
    ],
    [
      'Platformu ve karoyu istiyorsanız Tessl’i kullanın. Pull request’in kanıtlaması gereken şey git’teki eserse SpecScore’u kullanın.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl belgeleri — Tessl nedir?' },
    { href: 'https://tessl.io/', label: 'Tessl ana sayfası' },
    { href: essay, label: 'Tessl blogu — Yalnızca kod neden yetmez (27 Haziran 2025)' },
    { href: tilePage, label: 'Tessl kayıt defteri — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI iş akışı' },
    { href: score, label: 'specstudio-skills — /score becerisi' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

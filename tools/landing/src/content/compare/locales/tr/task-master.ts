import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';
const tm = 'https://github.com/eyaltoledano/claude-task-master';
const tmLicense = 'https://github.com/eyaltoledano/claude-task-master/blob/main/LICENSE';
const tmDocs = 'https://tryhamster.com/docs/taskmaster';

export const taskMaster: ComparePage = {
  slug: 'task-master-ai',
  competitor: 'Task Master AI',
  metaTitle: 'Task Master AI alternatifi: SpecScore ve Task Master.',
  metaDescription:
    'SpecScore ve Task Master AI. Task Master bir ürün gereksinimleri belgesini kodlama ajanları için görevlere ayırır. SpecScore, CI’ın lint edebildiği spesifikasyon biçimidir. 30 Ekim 2026’da kontrol edildi.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (',
    { c: 'task-master-ai' },
    ' paketi, Taskmaster olarak da anılır) yapay zeka kodlama ajanları için bir görev yöneticisidir. Bir ürün gereksinimleri belgesi (PRD), neyin yapılacağının düz yazı belgesidir. Task Master’ın README’si, birini ',
    { c: '.taskmaster/docs/prd.txt' },
    ' konumuna koyup görevlere ayrıştırmayı söyler. ',
    { a: 'Spesifikasyon odaklı geliştirme', href: '/tr/spec-driven-development/' },
    ' (SDD), davranışı koddan önce belirtme pratiğidir. ',
    { a: 'SpecScore', href: '/tr/' },
    ', bu spesifikasyon için ',
    { a: 'açık kaynak', href: repo, kind: 'us' },
    ' bir biçimdir ve onu denetleyen bir ',
    { a: 'komut satırı arayüzü', href: '/tr/cli/' },
    ' (CLI) ile gelir. ',
    { a: 'Sürekli entegrasyon', href: '/tr/validators/' },
    ' (CI) — önerilen her değişiklikte çalışan otomatik bir denetim — bu depoda o denetimi çalıştırır. Task Master, CI’ın lint edeceği bir spesifikasyon biçimi yayımlamaz.',
  ],
  shared: [
    ['İkisi de bir yapay zeka ajanının işin tamamını tek satırlık bir istemden icat etmemesi gerektiğini varsayar.'],
    ['İkisi de durumlarını depoda tutar; böylece sonraki oturum onu görebilir.'],
    ['İkisi de, projenin tamamını yeniden okumak yerine, ajana sırada ne yapacağını söyleyebilir.'],
  ],
  creditTitle: 'Task Master AI’nın iyi yaptığı şeyler.',
  creditNote: [
    'Aşağıdaki olgular, 30 Ekim 2026’da okunan proje README’si ile belge dizinindendir. O README’deki araç sayıları ve model listeleri sık değiştiği için burada yinelenmez.',
  ],
  credits: [
    {
      title: 'Bir PRD görev listesine dönüşür',
      body: [
        'README’nin yolu somuttur: ',
        { c: 'task-master parse-prd' },
        ' bir PRD okur ve görevler üretir. ',
        { c: 'task-master next' },
        ' sıradaki görevi gösterir. ',
        { c: 'task-master expand' },
        ' bir görevi böler. Etiketler işi akışlar arasında taşır. Ne inşa ettiğinizi zaten bildiğinizde yararlı bir katmandır.',
      ],
    },
    {
      title: 'Editörün içinde belirir',
      body: [
        'Önerilen kurulum, ',
        { c: 'npx -y task-master-ai' },
        ' ile bir Model Bağlam Protokolü (MCP) sunucusudur — editörün çağırdığı küçük bir program. Cursor için tek adımlı bir kurulum ve Claude Code için bir ',
        { c: 'claude mcp add' },
        ' satırı dahildir. Ajan bundan sonra görevleri ayrı bir pano olmadan ayrıştırır, listeler ve günceller.',
      ],
    },
    {
      title: 'Projeyi bağlam olarak kullanan araştırma',
      body: [
        { c: 'task-master research' },
        ', güncel projeyi bağlam kullanarak bir kütüphane veya bir geçiş hakkında modele sormanın yolu olarak belgelenmiştir. Birkaç model sağlayıcısı desteklenir. README, model çağıran komutların bir API anahtarı gerektirdiğini söyler; listelenen Claude Code veya Codex CLI yollarını kullanmadığınız sürece.',
      ],
    },
  ],
  tableNote: 'Task Master görevleri yönetir. SpecScore, o görevlerin anabildiği spesifikasyondur. Tablo bu rolleri karşılaştırır.',
  tableLabel: 'SpecScore ve Task Master AI özellik karşılaştırması',
  rows: [
    {
      cap: 'Birincil rol',
      them: ['Bir PRD’den ayrıştırılmış, yapay zeka kodlama ajanları için görev listesi'],
      us: [{ s: 'Açık spesifikasyon biçimi + CLI' }],
    },
    {
      cap: 'Girdi',
      them: ['Düz yazı PRD; .taskmaster/docs/prd.txt konumunda belgelenmiştir'],
      us: ['Zorunlu bölümleri olan ', { s: 'yapılandırılmış Markdown + YAML' }],
    },
    {
      cap: 'Elde ettiğiniz',
      them: ['Görevler, bağımlılıklar, etiketler ve bir “sıradaki görev” göstergesi'],
      us: ['Gereksinim kimliklerini anan ', { s: 'gereksinimler, kabul kriterleri, planlar ve görevler' }],
    },
    {
      cap: 'Spesifikasyonu denetlemek',
      them: ['PRD için belgelenmiş bir linter yoktur. Model serbest metni ayrıştırır.'],
      us: [
        'CI içinde ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        ' sözcüklerin elle verilen bir yapay zeka notudur.',
      ],
    },
    {
      cap: 'Çalışma zamanı',
      them: ['Node.js, genellikle MCP sunucusu üzerinden. README’ye göre model çağrıları bir sağlayıcı anahtarı ya da yerel bir Claude Code / Codex CLI ister.'],
      us: [{ s: 'Tek bir Go ikili dosyası' }, '. Lint bir model çağırmaz.'],
    },
    {
      cap: 'Lisans',
      them: [
        { a: 'Genel depo', href: tm, kind: 'them' },
        ', ',
        { a: 'MIT artı bir Commons Clause', href: tmLicense, kind: 'them' },
        ' lisanslıdır. README, onu kullanıp değiştirebileceğinizi, Task Master’ın kendisini satamayacağınızı veya barındırılan bir hizmet olarak sunamayacağınızı söyler.',
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
      title: 'Bir PRD, lint edilebilen bir spesifikasyon değildir',
      terminal: true,
      body: [
        'Task Master’ın niteliği PRD’nin ne kadar ayrıntılı olduğuna bağlıdır — README böyle söyler. O README’de, model ayrıştırmadan önce PRD’nin yapısını denetleyen bir şey yoktur. SpecScore, zorunlu bir bölümü eksik olan bir özelliği reddeder. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' her pull request’te ',
        { c: 'specscore spec lint' },
        ' çalıştırır. ',
        { a: '/score', href: score, kind: 'us' },
        ' becerisi, sözcükler üzerinde ikinci ve elle yapılan bir geçiştir. CI komutu değildir.',
      ],
    },
    {
      title: 'Görevler bir gereksinimi anabilir',
      body: [
        'Task Master görevlere sayısal kimlikler ve bağımlılıklar verir. SpecScore gereksinimlere kararlı kimlikler (',
        { c: 'REQ: slug' },
        ') verir. Bir plan görevi karşıladığı kriteri adlandırabilir ve bir commit fragmanı onu yeniden adlandırabilir. Görev listesi ile spesifikasyon, birbirinden habersiz iki belge olmaktan çıkar.',
      ],
    },
    {
      title: 'Lint bir API anahtarı istemez',
      body: [
        'Task Master’da bir PRD ayrıştırmak bir model çağırır. Bir SpecScore ağacını denetlemek çağırmaz. CLI, ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' deposundan bir Go ikili dosyasıdır; CI onu bir sağlayıcı hesabı olmadan çalıştırabilir.',
      ],
    },
  ],
  whenThemTitle: 'Task Master AI’yı şu durumlarda seçin…',
  whenThem: [
    ['Elinizde bir PRD vardır ve bir ajanın onu Cursor, Claude Code veya başka bir MCP istemcisinin içinde sıralı görevlere bölmesini istersiniz.'],
    ['Sıradaki görev, genişletme, etiketler ve araştırmayı editör komutları olarak istediğinizde.'],
    ['Yönettiğiniz şey görev panosudur, yeniden kullanılabilir bir spesifikasyon biçimi değil.'],
  ],
  whenUs: [
    ['Gereksinimlerin kendisi yapılandırılmış, kimliği olan ve biçimi bozduklarında CI tarafından reddedilen şeyler olmak zorundaysa.'],
    ['Spesifikasyonun iyi biçimlenmiş olup olmadığına karar veren yolda bir model çağrısı istemediğinizde.'],
    ['Biçimin CC BY 4.0 altında, Apache-2.0 bir CLI ile ', { a: 'açık kaynak', href: repo, kind: 'us' }, ' olmasını istediğinizde.'],
  ],
  bridgeTitle: 'Zaten lint edilen bir spesifikasyondan görevleri ayrıştırın.',
  bridge: [
    [
      'Task Master güçlü bir görev panosudur. Bir spesifikasyon dili değildir. Davranışı SpecScore ile yazın, CI’ın lint etmesine izin verin ve görev listesini ',
      { c: 'REQ: slug' },
      ' kimliklerine yöneltin. Yine de Task Master’ın editör araçlarını istiyorsanız, ona çoktan ',
      { c: 'specscore spec lint' },
      ' geçmiş bir spesifikasyondan ürettiğiniz bir PRD verin.',
    ],
    [
      'İşi sıralamak için Task Master AI’yı kullanın. İşin bir sözleşmesi olsun diye SpecScore’u kullanın.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT artı Commons Clause' },
    { href: tmDocs, label: 'Task Master belgeleri (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI iş akışı' },
    { href: score, label: 'specstudio-skills — /score becerisi' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

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
  metaTitle: 'Alternativa ao Tessl: SpecScore vs especificação como fonte.',
  metaDescription:
    'SpecScore vs Tessl. O Tessl é uma plataforma de skills para agentes; o tile e o ensaio de 2025 tratam a especificação como fonte. O SpecScore linta um formato portátil na CI. Verificado em 30 de outubro de 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Desenvolvimento baseado em especificações', href: '/pt-br/spec-driven-development/' },
    ' (SDD) significa que a especificação do comportamento pretendido é escrita antes do código. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) é, em 30 de outubro de 2026, uma plataforma de habilitação de agentes: um registro e um plano de controle para os skills, regras e plugins que os agentes de código carregam. “Especificação como fonte” é a afirmação mais forte no ',
    { a: 'ensaio de junho de 2025', href: essay, kind: 'them' },
    ' do Tessl: a especificação é o artefato duradouro, e o código é derivado dela. ',
    { a: 'SpecScore', href: '/pt-br/' },
    ' é um formato de arquivo ',
    { a: 'de código aberto', href: repo, kind: 'us' },
    ' para essa especificação, verificado por uma ',
    { a: 'interface de linha de comando', href: '/pt-br/cli/' },
    ' (CLI). A ',
    { a: 'integração contínua', href: '/pt-br/validators/' },
    ' (CI) — uma verificação automática de cada mudança proposta — executa essa verificação neste repositório.',
  ],
  shared: [
    ['Ambos dizem que um prompt é um lugar fraco para guardar a intenção. Uma especificação escrita deve sobreviver ao chat.'],
    ['Ambos esperam que um agente de código com IA leia a especificação antes de editar o código.'],
    ['Ambos podem ligar testes aos requisitos, então “pronto” é algo que dá para apontar.'],
  ],
  creditTitle: 'O que o Tessl faz bem.',
  creditNote: [
    'Duas superfícies diferentes do Tessl são fáceis de misturar. As notas abaixo as separam, a partir de páginas lidas em 30 de outubro de 2026.',
  ],
  credits: [
    {
      title: 'Um argumento claro para a especificação como fonte',
      body: [
        'O ensaio de Simon Maple de 27 de junho de 2025 diz que um documento de requisitos do produto (PRD) — prosa escrita para pessoas sobre o que construir — costuma ficar desatualizado, enquanto o código vira a única fonte da verdade. A alternativa do ensaio é que a especificação é o que você muda, e um LLM gera código, testes e documentação a partir dela. Isso é uma posição real, não um slogan.',
      ],
    },
    {
      title: 'Uma plataforma para o contexto do agente',
      body: [
        { a: 'A documentação do Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' descreve um registro, governança que analisa e pontua skills, avaliações e observabilidade entre agentes. A documentação diz que skills são artefatos simples no seu repositório e que a plataforma funciona com Claude Code, Cursor, Copilot, Gemini e outros. Pontuar ali significa pontuar um skill, não pontuar uma especificação de produto.',
      ],
    },
    {
      title: 'Um tile oficial orientado por especificação, com verificações em shell',
      body: [
        'O tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', sob licença MIT no ',
        { a: 'repositório público do tile', href: tile, kind: 'them' },
        ', ensina um agente a entrevistar, escrever arquivos ',
        { c: '.spec.md' },
        ', esperar aprovação e então implementar. A página do registro lista ',
        { c: 'scripts/validate-specs.sh' },
        ' e ',
        { c: 'scripts/check-spec-links.sh' },
        ' para frontmatter, ',
        { c: 'targets' },
        ' e links ',
        { c: '[@test]' },
        '. A mesma página diz que o tile é contexto de orientação: sem comandos especiais, sem framework.',
      ],
    },
  ],
  tableNote: '“Especificação como fonte” é o ensaio do Tessl. O tile é um pacote de skills sobre a plataforma de hoje. O SpecScore é um formato com um linter versionado.',
  tableLabel: 'Comparação de funcionalidades SpecScore vs Tessl',
  rows: [
    {
      cap: 'Papel principal',
      them: ['Plataforma de skills para agentes, mais um tile orientado por especificação e um ensaio de 2025 sobre especificação como fonte'],
      us: [{ s: 'Formato aberto de especificação + CLI' }],
    },
    {
      cap: 'O que a especificação é',
      them: ['Ensaio: a fonte duradoura da qual o código é gerado. Tile: um .spec.md contra o qual o agente implementa, e você fica com o código.'],
      us: [{ s: 'Um contrato ao lado do código' }, '. O lint não regenera o código.'],
    },
    {
      cap: 'Forma da especificação',
      them: ['Tile: frontmatter YAML, globs em targets e links [@test] para arquivos de teste'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Verificação da especificação',
      them: ['Scripts de shell entregues com o tile, para o frontmatter e os links desse tile'],
      us: [
        { s: 'specscore spec lint' },
        ' no formato SpecScore, na CI deste repositório. ',
        { c: '/score' },
        ' é uma nota de IA manual.',
      ],
    },
    {
      cap: 'Licença',
      them: [
        'O tile é ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. A plataforma é um produto. A documentação não publica o código da plataforma.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: 'Preço',
      them: [
        'A ',
        { a: 'página inicial do Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', lida em 30 de outubro de 2026, descreve um nível gratuito (1.000 créditos por mês em um espaço de trabalho) e planos empresariais pagos.',
      ],
      us: [{ s: 'Sem taxa' }, ' pelo formato nem pela CLI'],
    },
  ],
  diffs: [
    {
      title: 'Um formato publicado, não um script de tile',
      terminal: true,
      body: [
        'Os scripts de shell do tile verificam arquivos ',
        { c: '.spec.md' },
        ' que o tile pediu ao agente para escrever. O SpecScore verifica um formato documentado neste site. O ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' instala uma release fixada do ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' e executa ',
        { c: 'specscore spec lint' },
        '. O ',
        { a: '/score', href: score, kind: 'us' },
        ' não é esse job: é um skill manual que sai com código diferente de zero quando revisores de IA relatam problemas.',
      ],
    },
    {
      title: 'Você fica com o código nos dois casos — o ensaio vai além',
      body: [
        'O ensaio de 2025 diz que o código deve ser regenerado a partir da especificação. O tile, na página lida em 30 de outubro de 2026, faz o agente implementar contra uma especificação aprovada e não descreve um compilador que substitui a sua árvore de código. O SpecScore nunca tira o código de você. A especificação é o contrato revisado; o código continua seu.',
      ],
    },
    {
      title: 'Identidade do requisito',
      body: [
        'O tile aponta um requisito para arquivos com ',
        { c: 'targets' },
        ' e ',
        { c: '[@test]' },
        '. O SpecScore nomeia o requisito ',
        { c: 'REQ: slug' },
        ' para que um plano, uma tarefa e um trailer de commit possam citá-lo depois que os arquivos mudarem de lugar.',
      ],
    },
  ],
  whenThemTitle: 'Recorra ao Tessl quando…',
  whenThem: [
    ['Você precisa de um registro, avaliações e governança para skills compartilhados entre muitos agentes e repositórios.'],
    ['Você quer o fluxo do ensaio de especificação como fonte na forma de um tile de orientação: entrevistar, aprovar um .spec.md e então implementar.'],
    ['Você já paga pela plataforma Tessl, ou está experimentando, e quer o tile de especificação nesse registro.'],
  ],
  whenUs: [
    ['O próprio formato da especificação precisa ser válido na CI, inclusive em repositórios que não instalam o Tessl.'],
    ['Você quer ids de requisitos e um linter que não chama um modelo.'],
    ['Você quer o formato ', { a: 'de código aberto', href: repo, kind: 'us' }, ' sob uma licença Creative Commons, separado de uma plataforma de skills.'],
  ],
  bridgeTitle: 'Especificação como fonte, e uma especificação que dá para lintar.',
  bridge: [
    [
      'O ensaio do Tessl acerta quando diz que um PRD desatualizado perde para o código. Uma verificação de formato é o modo de a especificação continuar sendo aquilo em que você confia. O SpecScore não gera o seu aplicativo a partir da especificação. Ele faz a especificação falhar na CI quando a estrutura, os links ou o status estão errados.',
    ],
    [
      'Use o Tessl se você quer a plataforma e o tile. Use o SpecScore se o artefato no git é o que o pull request precisa provar.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Documentação do Tessl — o que é o Tessl?' },
    { href: 'https://tessl.io/', label: 'Página inicial do Tessl' },
    { href: essay, label: 'Blog do Tessl — por que só o código não basta (27 de junho de 2025)' },
    { href: tilePage, label: 'Registro do Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — workflow de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

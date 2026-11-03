import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Alternativa ao Kiro: SpecScore vs especificações Kiro.',
  metaDescription:
    'SpecScore vs Kiro. O Kiro é o IDE com agentes da AWS que escreve requisitos em EARS. O SpecScore é um formato aberto de especificação que a CI pode lintar. Verificado em 30 de outubro de 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Desenvolvimento baseado em especificações', href: '/pt-br/spec-driven-development/' },
    ' (SDD) significa escrever o que o software deve fazer antes de um agente de IA escrever o código. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', da Amazon Web Services (AWS), é um ambiente de desenvolvimento com agentes — um editor, uma ',
    { a: 'interface de linha de comando', href: '/pt-br/cli/' },
    ' (CLI) e um aplicativo web — que transforma um prompt em especificações Kiro: requisitos, um design e tarefas. Esses requisitos usam ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (abordagem fácil para a sintaxe de requisitos), frases no formato “WHEN algo acontece, THE SYSTEM SHALL fazer algo”. ',
    { a: 'SpecScore', href: '/pt-br/' },
    ' é um formato ',
    { a: 'de código aberto', href: repo, kind: 'us' },
    ' para a própria especificação, além de uma CLI que verifica os arquivos. ',
    { a: 'Integração contínua', href: '/pt-br/validators/' },
    ' (CI) — uma verificação automática de cada mudança proposta — pode rejeitar uma especificação SpecScore que quebre o formato.',
  ],
  shared: [
    ['Ambos tratam uma especificação escrita como aquilo a partir do qual o agente deve construir, e não como a transcrição de um chat.'],
    ['Ambos guardam essa especificação como Markdown no projeto, para que ela possa ser revisada como código.'],
    ['Ambos dividem o trabalho em requisitos, um design e tarefas. O Kiro gera esses três arquivos. O SpecScore é um formato que a equipe pode manter depois que a sessão termina.'],
  ],
  creditTitle: 'O que o Kiro faz bem.',
  creditNote: [
    'A própria documentação do Kiro, lida em 30 de outubro de 2026, descreve o produto. A página de especificação de funcionalidade estava marcada como atualizada em 4 de agosto de 2026.',
  ],
  credits: [
    {
      title: 'Requisitos num formato fixo de frase',
      body: [
        'As especificações Kiro colocam o comportamento em ',
        { c: 'requirements.md' },
        ' com um padrão EARS: WHEN uma condição vale, THE SYSTEM SHALL fazer uma coisa. A documentação dá o exemplo de um formulário com dados inválidos e do sistema mostrando um erro de validação ao lado do campo. Esse formato é mais fácil de testar do que um parágrafo vago.',
      ],
    },
    {
      title: 'Um caminho completo do prompt às tarefas',
      body: [
        'Uma especificação de funcionalidade passa por requisitos, design (',
        { c: 'design.md' },
        ') e tarefas (',
        { c: 'tasks.md' },
        '). Dá para começar pelos requisitos ou por um design. O Quick Spec executa os três sem uma parada de aprovação entre eles. As especificações Bugfix são um caminho separado. A documentação também descreve a execução de tarefas independentes em paralelo, em ondas, a partir do grafo de dependências em ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Verificações dentro do produto',
      body: [
        'O Analyze Requirements, disponível no IDE e na CLI, procura inconsistências, ambiguidade, restrições conflitantes e lacunas antes do design. Correctness — testes baseados em propriedades extraídos dessas linhas EARS — aparece só para o IDE, não para a CLI, web ou mobile, na tabela de capacidades das especificações.',
      ],
    },
  ],
  tableNote: 'O Kiro é um produto que rascunha especificações. O SpecScore é o formato que um repositório pode verificar. A tabela compara esses papéis.',
  tableLabel: 'Comparação de funcionalidades SpecScore vs Kiro',
  rows: [
    {
      cap: 'Papel principal',
      them: ['IDE com agentes, CLI e aplicativo web que rascunham especificações e implementam tarefas'],
      us: [{ s: 'Formato aberto de especificação + CLI' }],
    },
    {
      cap: 'Arquivos da especificação',
      them: [{ c: 'requirements.md' }, ' (ou ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Uma árvore spec/' }, ' de Markdown + YAML'],
    },
    {
      cap: 'Sintaxe dos requisitos',
      them: ['Padrão EARS: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Ids de requisitos' },
        ' (',
        { c: 'REQ: slug' },
        ') e critérios de aceitação ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Verificação da especificação',
      them: ['Analyze Requirements no IDE e na CLI. Testes baseados em propriedades no IDE. Não descrito como um linter de formato para a sua própria CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' na CI. ',
        { c: '/score' },
        ' é uma nota de IA separada e manual.',
      ],
    },
    {
      cap: 'Onde roda',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Algumas verificações são só no IDE.'],
      us: [{ s: 'Qualquer repositório' }, ' — um binário Go, sem conta Kiro'],
    },
    {
      cap: 'Licença',
      them: [
        'A ',
        { a: 'licença do Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' diz que o IDE e a CLI são conteúdo da AWS (AWS Content) sob o contrato de cliente da AWS (AWS Customer Agreement). O Kiro Crew é um ',
        { a: 'repositório público', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        ' separado.',
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
        'Um nível gratuito e planos pagos. Os números mudam — veja o ',
        { a: 'preço do Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', lido em 30 de outubro de 2026.',
      ],
      us: [{ s: 'Sem taxa' }, ' pelo formato nem pela CLI'],
    },
  ],
  diffs: [
    {
      title: 'O formato reprova na CI por conta própria',
      terminal: true,
      body: [
        'A análise do Kiro roda dentro do Kiro. A verificação do SpecScore é um comando. O ',
        { a: 'workflow dogfood', href: dogfood, kind: 'us' },
        ' deste repositório executa ',
        { c: 'specscore spec lint' },
        ' em cada pull request e na main. Uma especificação quebrada faz o job falhar do mesmo jeito que um teste quebrado. O skill ',
        { a: '/score', href: score, kind: 'us' },
        ' avalia a redação com revisores de IA; essa passagem é manual, e o workflow acima não a executa.',
      ],
    },
    {
      title: 'A especificação não está presa a um IDE',
      body: [
        'As especificações Kiro são Markdown, então dá para lê-las sem o produto. O workflow que as cria e executa é do Kiro. Uma árvore SpecScore são os mesmos arquivos para Claude Code, Cursor, Copilot ou nenhum agente — a CLI não chama um modelo para lintar.',
      ],
    },
    {
      title: 'Os requisitos guardam um id',
      body: [
        'A documentação do Kiro descreve a rastreabilidade como seguir um requisito pela implementação. Ela não descreve um id estável que sobreviva a uma reescrita. O SpecScore endereça um requisito como ',
        { c: 'REQ: slug' },
        ' e um critério de aceitação pelo id dele.',
      ],
    },
    {
      title: 'EARS e Given/When/Then respondem a perguntas diferentes',
      body: [
        'EARS, como o Kiro documenta, é uma frase de comportamento do sistema. Os critérios de aceitação do SpecScore são cenários Given/When/Then ligados a um id de requisito. Dá para escrever uma linha EARS em prosa e ainda guardar o cenário no arquivo SpecScore que o linter verifica.',
      ],
    },
  ],
  whenThemTitle: 'Recorra ao Kiro quando…',
  whenThem: [
    ['Você quer um IDE com agentes da AWS que rascunha requisitos, design e tarefas a partir de um prompt e depois implementa as tarefas.'],
    ['Você quer frases EARS e, no IDE, testes baseados em propriedades gerados a partir delas.'],
    ['Sua equipe já está padronizando no editor, na CLI ou no aplicativo web do Kiro.'],
  ],
  whenUs: [
    ['A especificação precisa continuar válida na CI depois que a sessão do agente termina, num repositório que não exige o Kiro.'],
    ['Você precisa de ids de requisitos, status de ciclo de vida e um resultado de lint determinístico.'],
    ['Você quer o formato ', { a: 'de código aberto', href: repo, kind: 'us' }, ' e o verificador como um único binário.'],
  ],
  bridgeTitle: 'O Kiro pode rascunhar. O SpecScore pode barrar.',
  bridge: [
    [
      'Nada aqui substitui o editor do Kiro. Se o Kiro é onde a equipe escreve prompts, deixe que ele rascunhe. Se a especificação precisa sobreviver como um arquivo revisado, escreva esse contrato no SpecScore e deixe o ',
      { c: 'specscore spec lint' },
      ' reprovar o pull request quando a estrutura quebrar. Os dois arquivos podem ficar no mesmo repositório.',
    ],
    [
      'Escolha o Kiro para a sessão. Escolha o SpecScore para o artefato que um job de CI pode recusar.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Documentação do Kiro — especificações' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Documentação do Kiro — especificações de funcionalidade e EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — sobre' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — licença' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — preços' },
    { href: dogfood, label: 'specscore/specscore — workflow de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

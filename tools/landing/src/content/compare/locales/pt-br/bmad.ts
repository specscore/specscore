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
  metaTitle: 'Alternativa ao BMAD Method: SpecScore vs BMAD.',
  metaDescription:
    'SpecScore vs o BMAD Method (método inovador para o desenvolvimento ágil orientado por IA): um fluxo ágil de agentes, contra um formato de especificação lintado na CI. Verificado em 30 de outubro de 2026.',
  h1: 'SpecScore vs o BMAD Method',
  hero: [
    'O ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (método inovador para o desenvolvimento ágil orientado por IA) é uma forma ',
    { a: 'de código aberto', href: bmad, kind: 'them' },
    ' de conduzir a entrega ágil com agentes de IA: esclarecer o trabalho, planejá-lo, construí-lo e verificá-lo, com as decisões escritas. Um documento de requisitos do produto (PRD) é a descrição em prosa do que construir e para quem; o mapa de workflow do método produz um, depois a arquitetura e as histórias. O ',
    { a: 'desenvolvimento baseado em especificações', href: '/pt-br/spec-driven-development/' },
    ' (SDD) é a ideia mais ampla em que os dois se situam — o comportamento é especificado antes do código. ',
    { a: 'SpecScore', href: '/pt-br/' },
    ' é um formato ',
    { a: 'de código aberto', href: repo, kind: 'us' },
    ' para essa especificação, mais uma ',
    { a: 'interface de linha de comando', href: '/pt-br/cli/' },
    ' (CLI). A ',
    { a: 'integração contínua', href: '/pt-br/validators/' },
    ' (CI) — uma verificação automática de cada mudança proposta — pode falhar quando um arquivo SpecScore está estruturalmente errado.',
  ],
  shared: [
    ['Ambos se recusam a deixar um agente inventar o produto enquanto escreve o código.'],
    ['Ambos guardam os documentos de planejamento no repositório, em Markdown, ao lado do trabalho.'],
    ['Ambos esperam que uma pessoa aprove o plano antes que a implementação siga sozinha.'],
  ],
  creditTitle: 'O que o BMAD Method faz bem.',
  creditNote: [
    'O README do projeto, lido em 30 de outubro de 2026, chama a v6.12 de release estável e a v7 de preview na branch main. A data da v7 nesse README já tinha passado. Trate os nomes das linhas como um instantâneo.',
  ],
  credits: [
    {
      title: 'Um método que se dimensiona',
      body: [
        'O README diz que mudanças pequenas vão direto para a construção, e o trabalho maior recebe planejamento. O ',
        { a: 'mapa de workflow na main', href: workflow, kind: 'them' },
        ' detalha as fases: um PRD (',
        { c: 'PRD.md' },
        '), uma spec de UX opcional, ',
        { c: 'architecture.md' },
        ' com registros de decisão, arquivos de épicos e histórias, e então um sprint. Isso é um ciclo ágil completo, não um único prompt.',
      ],
    },
    {
      title: 'Uma barreira antes da implementação',
      body: [
        'O mesmo mapa lista ',
        { c: 'bmad-check-implementation-readiness' },
        ', que devolve PASS, CONCERNS ou FAIL antes da implementação. O agente product-manager da v6 também tem um passo validate-PRD. Essas são barreiras de workflow que o agente executa. Não são um linter de formato separado que você aponta para uma árvore Markdown qualquer.',
      ],
    },
    {
      title: 'Ele está de fato publicado',
      body: [
        'O método está ',
        { a: 'sob licença MIT', href: bmadLicense, kind: 'them' },
        ' num repositório público. A instalação estável do README é ',
        { c: 'npx bmad-method install' },
        ', e ele pede Node.js 20.12 ou mais novo e Python 3.10 ou mais novo. O site ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' diz que o método é gratuito.',
      ],
    },
  ],
  tableNote: 'O BMAD é o processo. O SpecScore é o formato do artefato que um processo pode visar. A tabela compara esses papéis.',
  tableLabel: 'Comparação de funcionalidades SpecScore vs BMAD Method',
  rows: [
    {
      cap: 'Papel principal',
      them: ['Método ágil: agentes, skills e workflows da ideia ao código verificado'],
      us: [{ s: 'Formato aberto de especificação + CLI' }],
    },
    {
      cap: 'Artefatos de planejamento',
      them: ['PRD, spec de UX, arquitetura, épicos e histórias, status do sprint — no mapa de workflow lido em 30 de outubro de 2026'],
      us: [{ s: 'Ideias, funcionalidades, planos, tarefas' }, ' numa árvore spec/, com ids de requisitos'],
    },
    {
      cap: 'Verificação do trabalho',
      them: ['Barreira de prontidão (PASS / CONCERNS / FAIL) e um workflow validate-PRD, executados pelo agente'],
      us: [
        { s: 'specscore spec lint' },
        ' na CI, determinístico. ',
        { c: '/score' },
        ' é uma nota de IA manual.',
      ],
    },
    {
      cap: 'Ids de requisitos',
      them: ['Histórias e requisitos funcionais dentro do PRD e dos arquivos de épico. Não é o REQ: slug do SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' e ids de critérios de aceitação'],
    },
    {
      cap: 'Ambiente de execução',
      them: ['Node.js e Python para o instalador v6.12 descrito no README'],
      us: [{ s: 'Nada' }, ' além de um único binário Go'],
    },
    {
      cap: 'Licença',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' formato · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'A verificação é um comando, não um passo do método',
      terminal: true,
      body: [
        'O resultado de prontidão do BMAD é uma decisão dentro do workflow dele. O resultado do SpecScore é um código de saída de processo. O ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' executa ',
        { c: 'specscore spec lint' },
        ' em cada pull request. O ',
        { a: '/score', href: score, kind: 'us' },
        ' avalia um artefato com os revisores configurados no repositório; você o invoca. A CI não.',
      ],
    },
    {
      title: 'O formato sobrevive a um método diferente',
      body: [
        'Os documentos do BMAD são moldados pelos workflows dele. Se você parar de rodar o BMAD, ainda tem o Markdown, mas nada fora do método impõe a forma. Uma árvore SpecScore é o contrato. Outro workflow — inclusive o BMAD — pode escrevê-la, e o linter continua valendo.',
      ],
    },
    {
      title: 'Histórias e requisitos ficam ligados por id',
      body: [
        'As histórias do BMAD carregam o contexto adiante para o agente não decidir o produto de novo. O SpecScore torna o vínculo mecânico: uma tarefa do plano cita ',
        { c: 'REQ: slug' },
        ', e anotações ',
        { c: 'specscore:' },
        ' mais trailers de commit ',
        { c: 'Verifies:' },
        ' apontam o código de volta para o critério.',
      ],
    },
  ],
  whenThemTitle: 'Recorra ao BMAD Method quando…',
  whenThem: [
    ['Você quer um ciclo ágil completo — PRD, arquitetura, histórias, sprint — executado por agentes com workflows específicos de cada papel.'],
    ['Você quer a barreira de prontidão e o conjunto de perspectivas de produto, arquitetura e teste que o método traz.'],
    ['Você está padronizando como a equipe escreve prompts, e os skills do método são o padrão.'],
  ],
  whenUs: [
    ['A especificação precisa falhar na CI quando um título, um link ou um status está errado, mesmo que ninguém rode o workflow do BMAD naquele dia.'],
    ['Você precisa de ids de requisitos estáveis entre ferramentas, não só dentro dos arquivos de história de um método.'],
    ['Você quer um formato ', { a: 'de código aberto', href: repo, kind: 'us' }, ' que um processo diferente possa visar.'],
  ],
  bridgeTitle: 'O método pode escrever o formato.',
  bridge: [
    [
      'O BMAD responde “como tocamos o trabalho”. O SpecScore responde “qual arquivo é o contrato, e como a CI sabe que ele está intacto”. Uma equipe pode manter o PRD e as histórias do BMAD para a conversa, e manter uma funcionalidade SpecScore para os requisitos que precisam passar no lint.',
    ],
    [
      'Use o BMAD Method para o ciclo. Use o SpecScore para o artefato que o pull request verifica.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — licença MIT' },
    { href: workflow, label: 'Mapa de workflow do BMAD (main, lido em 30 de outubro de 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — workflow de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

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
  metaTitle: 'Alternativa ao Task Master AI: SpecScore vs Task Master.',
  metaDescription:
    'SpecScore vs Task Master AI. O Task Master transforma um documento de requisitos do produto em tarefas para agentes de código. O SpecScore é o formato de especificação que a CI pode lintar. Verificado em 30 de outubro de 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (o pacote ',
    { c: 'task-master-ai' },
    ', também chamado Taskmaster) é um gerenciador de tarefas para agentes de código com IA. Um documento de requisitos do produto (PRD) é um documento em prosa do que construir; o README do Task Master manda colocar um em ',
    { c: '.taskmaster/docs/prd.txt' },
    ' e transformá-lo em tarefas. O ',
    { a: 'desenvolvimento baseado em especificações', href: '/pt-br/spec-driven-development/' },
    ' (SDD) é a prática de especificar o comportamento antes do código. ',
    { a: 'SpecScore', href: '/pt-br/' },
    ' é um formato ',
    { a: 'de código aberto', href: repo, kind: 'us' },
    ' para essa especificação, mais uma ',
    { a: 'interface de linha de comando', href: '/pt-br/cli/' },
    ' (CLI) que a verifica. A ',
    { a: 'integração contínua', href: '/pt-br/validators/' },
    ' (CI) — uma verificação automática de cada mudança proposta — executa essa verificação neste repositório. O Task Master não publica um formato de especificação para a CI lintar.',
  ],
  shared: [
    ['Ambos partem de que um agente de IA não deve inventar o trabalho inteiro a partir de um prompt de uma linha.'],
    ['Ambos guardam o próprio estado no repositório para a sessão seguinte poder vê-lo.'],
    ['Ambos podem dizer ao agente o que fazer em seguida, em vez de reler o projeto inteiro.'],
  ],
  creditTitle: 'O que o Task Master AI faz bem.',
  creditNote: [
    'Os fatos abaixo vêm do README do projeto e do índice da documentação, lidos em 30 de outubro de 2026. Contagens de ferramentas e listas de modelos nesse README mudam com frequência, então não são repetidas aqui.',
  ],
  credits: [
    {
      title: 'Um PRD vira uma lista de tarefas',
      body: [
        'O caminho do README é concreto: ',
        { c: 'task-master parse-prd' },
        ' lê um PRD e gera tarefas. ',
        { c: 'task-master next' },
        ' aponta a próxima tarefa. ',
        { c: 'task-master expand' },
        ' quebra uma tarefa. Tags movem o trabalho entre fluxos. Essa é uma camada útil quando você já sabe o que está construindo.',
      ],
    },
    {
      title: 'Ele aparece dentro do editor',
      body: [
        'A instalação recomendada é um servidor Model Context Protocol (MCP) — um programa pequeno que o editor chama — via ',
        { c: 'npx -y task-master-ai' },
        ', incluindo uma instalação em um passo para o Cursor e uma linha ',
        { c: 'claude mcp add' },
        ' para o Claude Code. O agente então analisa, lista e atualiza tarefas sem um painel separado.',
      ],
    },
    {
      title: 'Pesquisa com o projeto no contexto',
      body: [
        { c: 'task-master research' },
        ' está documentado como um modo de perguntar a um modelo sobre uma biblioteca ou uma migração usando o projeto atual como contexto. Vários provedores de modelo são suportados. O README diz que comandos que chamam um modelo precisam de uma chave de API, a menos que você use os caminhos de Claude Code ou Codex CLI que ele lista.',
      ],
    },
  ],
  tableNote: 'O Task Master gerencia tarefas. O SpecScore é a especificação que essas tarefas podem citar. A tabela compara esses papéis.',
  tableLabel: 'Comparação de funcionalidades SpecScore vs Task Master AI',
  rows: [
    {
      cap: 'Papel principal',
      them: ['Lista de tarefas para agentes de código com IA, extraída de um PRD'],
      us: [{ s: 'Formato aberto de especificação + CLI' }],
    },
    {
      cap: 'Entrada',
      them: ['PRD em prosa, documentado em .taskmaster/docs/prd.txt'],
      us: [{ s: 'Markdown + YAML estruturado' }, ' com seções obrigatórias'],
    },
    {
      cap: 'O que você recebe',
      them: ['Tarefas, dependências, tags e um ponteiro de “próxima tarefa”'],
      us: [{ s: 'Requisitos, critérios de aceitação, planos e tarefas' }, ' que citam ids de requisitos'],
    },
    {
      cap: 'Verificação da especificação',
      them: ['Nenhum linter documentado para o PRD. O modelo analisa texto livre.'],
      us: [
        { s: 'specscore spec lint' },
        ' na CI. ',
        { c: '/score' },
        ' é uma nota de IA manual da redação.',
      ],
    },
    {
      cap: 'Ambiente de execução',
      them: ['Node.js, em geral pelo servidor MCP. Chamadas de modelo precisam de uma chave de provedor ou de um Claude Code / Codex CLI local, segundo o README.'],
      us: [{ s: 'Um binário Go' }, '. O lint não chama um modelo.'],
    },
    {
      cap: 'Licença',
      them: [
        'O ',
        { a: 'repositório público', href: tm, kind: 'them' },
        ' é ',
        { a: 'MIT mais uma Commons Clause', href: tmLicense, kind: 'them' },
        '. O README diz que você pode usar e modificar, e não pode vender o próprio Task Master nem oferecê-lo como um serviço hospedado.',
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
      title: 'Um PRD não é uma especificação que dá para lintar',
      terminal: true,
      body: [
        'A qualidade do Task Master depende de quão detalhado o PRD é — o README diz isso. Nada nesse README verifica a estrutura do PRD antes de o modelo analisá-lo. O SpecScore recusa uma funcionalidade a que falta uma seção obrigatória. O ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' executa ',
        { c: 'specscore spec lint' },
        ' em cada pull request. O skill ',
        { a: '/score', href: score, kind: 'us' },
        ' é uma segunda passagem, manual, pela redação. Não é o comando da CI.',
      ],
    },
    {
      title: 'Tarefas podem citar um requisito',
      body: [
        'O Task Master dá às tarefas ids numéricos e dependências. O SpecScore dá aos requisitos ids estáveis (',
        { c: 'REQ: slug' },
        '). Uma tarefa do plano pode nomear o critério que satisfaz, e um trailer de commit pode nomeá-lo de novo. A lista de tarefas e a especificação deixam de ser dois documentos sem relação.',
      ],
    },
    {
      title: 'O lint não precisa de uma chave de API',
      body: [
        'Analisar um PRD no Task Master chama um modelo. Verificar uma árvore SpecScore não. A CLI é um binário Go de ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', então a CI pode executá-la sem uma conta de provedor.',
      ],
    },
  ],
  whenThemTitle: 'Recorra ao Task Master AI quando…',
  whenThem: [
    ['Você já tem um PRD e quer que um agente o divida em tarefas ordenadas dentro do Cursor, do Claude Code ou de outro cliente MCP.'],
    ['Você quer next-task, expand, tags e pesquisa como comandos do editor.'],
    ['O que você está gerenciando é o quadro de tarefas, não um formato de especificação reutilizável.'],
  ],
  whenUs: [
    ['Os próprios requisitos precisam ser estruturados, identificáveis e rejeitados pela CI quando quebram o formato.'],
    ['Você não quer uma chamada de modelo no caminho que decide se a especificação está bem formada.'],
    ['Você quer o formato ', { a: 'de código aberto', href: repo, kind: 'us' }, ' sob CC BY 4.0, com uma CLI Apache-2.0.'],
  ],
  bridgeTitle: 'Extraia tarefas de uma especificação que já passa no lint.',
  bridge: [
    [
      'O Task Master é um quadro de tarefas forte. Não é uma linguagem de especificação. Escreva o comportamento no SpecScore, deixe a CI lintar, e aponte a lista de tarefas para ids ',
      { c: 'REQ: slug' },
      '. Se ainda quiser as ferramentas de editor do Task Master, alimente-o com um PRD gerado a partir de uma especificação que já passou em ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Use o Task Master AI para ordenar o trabalho. Use o SpecScore para o trabalho ter um contrato.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT mais Commons Clause' },
    { href: tmDocs, label: 'Documentação do Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — workflow de CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

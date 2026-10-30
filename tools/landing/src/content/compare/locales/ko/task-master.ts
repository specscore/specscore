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
  metaTitle: 'Task Master AI 대안: SpecScore와 Task Master.',
  metaDescription:
    'SpecScore와 Task Master AI. Task Master는 제품 요구사항 문서를 코딩 에이전트를 위한 작업으로 나눕니다. SpecScore는 CI가 검사할 수 있는 명세 형식입니다. 2026년 10월 30일에 확인.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    '(',
    { c: 'task-master-ai' },
    ' 패키지. Taskmaster라고도 합니다)는 AI 코딩 에이전트를 위한 작업 관리자입니다. 제품 요구사항 문서(PRD)는 무엇을 만들지 산문으로 쓴 문서입니다. Task Master의 README는 그것을 ',
    { c: '.taskmaster/docs/prd.txt' },
    '에 두고 작업으로 분해하라고 말합니다. ',
    { a: '명세 기반 개발', href: '/ko/spec-driven-development/' },
    '(SDD)은 코드보다 먼저 동작을 지정하는 실천입니다. ',
    { a: 'SpecScore', href: '/ko/' },
    '는 그 명세를 위한 ',
    { a: '오픈 소스', href: repo, kind: 'us' },
    ' 형식이며, 그것을 검사하는 ',
    { a: '명령줄 인터페이스', href: '/ko/cli/' },
    '(CLI)가 함께 있습니다. ',
    { a: '지속적 통합', href: '/ko/validators/' },
    '(CI), 곧 제안된 변경마다 도는 자동 검사가 이 저장소에서 그 검사를 실행합니다. Task Master는 CI가 검사할 명세 형식을 공개하지 않습니다.',
  ],
  shared: [
    ['둘 다, AI 에이전트가 한 줄 프롬프트에서 일 전체를 지어내서는 안 된다고 둡니다.'],
    ['둘 다, 다음 세션이 볼 수 있도록 상태를 저장소 안에 남깁니다.'],
    ['둘 다, 프로젝트 전체를 다시 읽는 대신, 에이전트에게 다음에 할 일을 알려 줄 수 있습니다.'],
  ],
  creditTitle: 'Task Master AI가 잘하는 것.',
  creditNote: [
    '아래 사실은 2026년 10월 30일에 읽은 프로젝트 README와 문서 색인을 따릅니다. 그 README의 도구 수와 모델 목록은 자주 바뀌므로 여기에 반복하지 않습니다.',
  ],
  credits: [
    {
      title: 'PRD가 작업 목록이 된다',
      body: [
        'README의 경로는 구체적입니다. ',
        { c: 'task-master parse-prd' },
        '가 PRD를 읽고 작업을 생성합니다. ',
        { c: 'task-master next' },
        '가 다음 작업을 가리킵니다. ',
        { c: 'task-master expand' },
        '가 작업을 나눕니다. 태그는 작업을 스트림 사이로 옮깁니다. 무엇을 만드는지 이미 알 때의 유용한 층입니다.',
      ],
    },
    {
      title: '편집기 안에 나타난다',
      body: [
        '권장 설치는 모델 컨텍스트 프로토콜(MCP) 서버, 곧 편집기가 호출하는 작은 프로그램을 ',
        { c: 'npx -y task-master-ai' },
        '로 두는 것입니다. Cursor를 위한 한 단계 설치와 Claude Code를 위한 ',
        { c: 'claude mcp add' },
        ' 줄이 포함됩니다. 에이전트는 별도의 대시보드 없이 작업을 분해하고, 나열하고, 갱신합니다.',
      ],
    },
    {
      title: '프로젝트를 맥락으로 한 조사',
      body: [
        { c: 'task-master research' },
        '는 현재 프로젝트를 맥락으로 라이브러리나 마이그레이션에 대해 모델에 묻는 방법으로 문서화되어 있습니다. 여러 모델 제공자가 지원됩니다. README는 모델을 호출하는 명령에는 API 키가 필요하다고 말합니다. 다만 거기에 적힌 Claude Code 또는 Codex CLI 경로를 쓰는 경우는 예외입니다.',
      ],
    },
  ],
  tableNote: 'Task Master는 작업을 관리합니다. SpecScore는 그 작업이 인용할 수 있는 명세입니다. 표는 그 역할을 비교합니다.',
  tableLabel: 'SpecScore와 Task Master AI 기능 비교',
  rows: [
    {
      cap: '주요 역할',
      them: ['PRD에서 분해된, AI 코딩 에이전트를 위한 작업 목록'],
      us: [{ s: '오픈 명세 형식 + CLI' }],
    },
    {
      cap: '입력',
      them: ['산문 PRD. 위치는 .taskmaster/docs/prd.txt로 문서화되어 있습니다'],
      us: ['필수 절이 있는 ', { s: '구조화된 Markdown + YAML' }],
    },
    {
      cap: '얻게 되는 것',
      them: ['작업, 의존성, 태그, 그리고 「다음 작업」 포인터'],
      us: ['요구사항 ID를 인용하는 ', { s: '요구사항, 인수 기준, 계획, 작업' }],
    },
    {
      cap: '명세 검사',
      them: ['PRD를 위한 문서화된 린터는 없습니다. 모델이 자유로운 글을 분해합니다.'],
      us: [
        'CI의 ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        '는 문장에 대한 수동 AI 채점입니다.',
      ],
    },
    {
      cap: '실행 환경',
      them: ['Node.js. 보통 MCP 서버를 통합니다. README에 따르면 모델 호출에는 제공자 키, 또는 로컬 Claude Code / Codex CLI가 필요합니다.'],
      us: [{ s: 'Go 바이너리 하나' }, '. Lint는 모델을 호출하지 않습니다.'],
    },
    {
      cap: '라이선스',
      them: [
        { a: '공개 저장소', href: tm, kind: 'them' },
        '는 ',
        { a: 'MIT에 Commons Clause를 더한 것', href: tmLicense, kind: 'them' },
        '입니다. README는 사용과 수정은 할 수 있고, Task Master 자체를 팔거나 호스팅 서비스로 제공할 수는 없다고 말합니다.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' 형식 · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'PRD는 검사할 수 있는 명세가 아니다',
      terminal: true,
      body: [
        'Task Master의 품질은 PRD가 얼마나 자세한지에 달려 있습니다. README가 그렇게 말합니다. 그 README 안에는 모델이 분해하기 전에 PRD의 구조를 검사하는 것이 없습니다. SpecScore는 필수 절이 빠진 기능을 거부합니다. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        '는 모든 풀 리퀘스트에서 ',
        { c: 'specscore spec lint' },
        '를 실행합니다. ',
        { a: '/score', href: score, kind: 'us' },
        ' 스킬은 문장에 대한 두 번째의 수동 통과입니다. CI 명령이 아닙니다.',
      ],
    },
    {
      title: '작업은 요구사항을 인용할 수 있다',
      body: [
        'Task Master는 작업에 숫자 ID와 의존성을 줍니다. SpecScore는 요구사항에 안정된 ID(',
        { c: 'REQ: slug' },
        ')를 줍니다. 계획의 작업은 그것이 만족시키는 기준을 이름 붙일 수 있고, 커밋 트레일러는 그것을 다시 이름 붙일 수 있습니다. 작업 목록과 명세는 서로 무관한 두 문서이기를 멈춥니다.',
      ],
    },
    {
      title: 'Lint에는 API 키가 필요 없다',
      body: [
        'Task Master에서 PRD를 분해하면 모델을 호출합니다. SpecScore 트리를 검사하는 것은 호출하지 않습니다. CLI는 ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        '의 Go 바이너리이므로, 제공자 계정 없이 CI가 실행할 수 있습니다.',
      ],
    },
  ],
  whenThemTitle: 'Task Master AI를 고르는 때는…',
  whenThem: [
    ['이미 PRD가 있고, Cursor, Claude Code, 또는 다른 MCP 클라이언트 안에서 에이전트가 그것을 순서가 있는 작업으로 나누기를 원할 때.'],
    ['다음 작업, 확장, 태그, 조사를 편집기 명령으로 원할 때.'],
    ['관리하는 것이 작업 보드이지, 다시 쓸 수 있는 명세 형식이 아닐 때.'],
  ],
  whenUs: [
    ['요구사항 자체가 구조를 갖고, 식별되며, 형식을 깨뜨리면 CI가 거부해야 할 때.'],
    ['명세가 잘 형성되었는지를 정하는 길에 모델 호출을 두고 싶지 않을 때.'],
    ['CC BY 4.0 형식과 Apache-2.0 CLI로 형식을 ', { a: '오픈 소스', href: repo, kind: 'us' }, '로 두고 싶을 때.'],
  ],
  bridgeTitle: '이미 검사를 통과한 명세에서 작업을 분해한다.',
  bridge: [
    [
      'Task Master는 강한 작업 보드입니다. 명세 언어는 아닙니다. 동작을 SpecScore로 쓰고, CI가 검사하게 한 다음, 작업 목록을 ',
      { c: 'REQ: slug' },
      ' ID로 향하게 하세요. 그래도 Task Master의 편집기 도구를 원하면, 이미 ',
      { c: 'specscore spec lint' },
      '를 통과한 명세에서 만든 PRD를 넘기세요.',
    ],
    [
      '일의 순서를 정하려면 Task Master AI를. 일에 계약을 두려면 SpecScore를.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT에 Commons Clause' },
    { href: tmDocs, label: 'Task Master 문서 (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI 워크플로' },
    { href: score, label: 'specstudio-skills — /score 스킬' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

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
  metaTitle: 'BMAD Method 대안: SpecScore와 BMAD.',
  metaDescription:
    'SpecScore와 BMAD Method(애자일 AI 주도 개발을 위한 돌파 방법). 에이전트의 애자일 작업 흐름과, CI에서 검사되는 명세 형식의 대비입니다. 2026년 10월 30일에 확인.',
  h1: 'SpecScore vs BMAD Method',
  hero: [
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    '(애자일 AI 주도 개발을 위한 돌파 방법)는 AI 에이전트로 애자일 전달을 진행하는 ',
    { a: '오픈 소스', href: bmad, kind: 'them' },
    ' 방식입니다. 일을 분명히 하고, 계획하고, 만들고, 검사하며, 결정을 글로 남깁니다. 제품 요구사항 문서(PRD)는 무엇을, 누구를 위해 만들지를 산문으로 설명한 것입니다. 이 방법의 워크플로 지도는 PRD를 만든 다음 아키텍처와 스토리를 만듭니다. ',
    { a: '명세 기반 개발', href: '/ko/spec-driven-development/' },
    '(SDD)은 둘이 함께 놓이는 더 넓은 생각입니다. 동작은 코드보다 먼저 지정됩니다. ',
    { a: 'SpecScore', href: '/ko/' },
    '는 그 명세를 위한 ',
    { a: '오픈 소스', href: repo, kind: 'us' },
    ' 형식이며, ',
    { a: '명령줄 인터페이스', href: '/ko/cli/' },
    '(CLI)가 함께 있습니다. ',
    { a: '지속적 통합', href: '/ko/validators/' },
    '(CI), 곧 제안된 변경마다 도는 자동 검사는, SpecScore 파일의 구조가 잘못되었을 때 실패할 수 있습니다.',
  ],
  shared: [
    ['둘 다, 코드를 쓰는 동안 에이전트가 제품을 지어내게 두지 않습니다.'],
    ['둘 다, 계획 문서를 저장소 안, 작업 옆의 Markdown으로 남깁니다.'],
    ['둘 다, 구현이 달려 나가기 전에 사람이 계획을 승인하기를 기대합니다.'],
  ],
  creditTitle: 'BMAD Method가 잘하는 것.',
  creditNote: [
    '2026년 10월 30일에 읽은 프로젝트 README는 v6.12를 안정 릴리스로, v7을 main 브랜치의 미리보기로 부릅니다. 그 README에 적힌 v7 날짜는 이미 지나 있었습니다. 줄의 이름은 한 시점의 기록으로 보세요.',
  ],
  credits: [
    {
      title: '크기에 맞추어 자신을 조절하는 방법',
      body: [
        'README는 작은 변경은 바로 빌드로 가고, 더 큰 일은 계획을 거친다고 말합니다. ',
        { a: 'main의 워크플로 지도', href: workflow, kind: 'them' },
        '는 단계를 적습니다. PRD(',
        { c: 'PRD.md' },
        '), 선택적인 UX 명세, 결정 기록이 있는 ',
        { c: 'architecture.md' },
        ', 에픽과 스토리 파일, 그다음 스프린트입니다. 하나의 프롬프트가 아니라 애자일의 한 바퀴입니다.',
      ],
    },
    {
      title: '구현 전의 관문',
      body: [
        '같은 지도는 ',
        { c: 'bmad-check-implementation-readiness' },
        '를 나열합니다. 구현 전에 PASS, CONCERNS, 또는 FAIL을 반환합니다. v6 제품 관리자 에이전트에도 validate-PRD 단계가 있습니다. 이것들은 에이전트가 실행하는 워크플로 관문입니다. 임의의 Markdown 트리에 겨누는 별도의 형식 린터가 아닙니다.',
      ],
    },
    {
      title: '실제로 공개되어 있다',
      body: [
        '이 방법은 공개 저장소에서 ',
        { a: 'MIT 라이선스', href: bmadLicense, kind: 'them' },
        '입니다. README의 안정 설치는 ',
        { c: 'npx bmad-method install' },
        '이며, Node.js 20.12 이상과 Python 3.10 이상을 요구합니다. 사이트 ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        '은 이 방법이 무료라고 말합니다.',
      ],
    },
  ],
  tableNote: 'BMAD는 과정입니다. SpecScore는 과정이 겨눌 수 있는 산출물 형식입니다. 표는 그 역할을 비교합니다.',
  tableLabel: 'SpecScore와 BMAD Method 기능 비교',
  rows: [
    {
      cap: '주요 역할',
      them: ['애자일 방법: 아이디어에서 검증된 코드까지의 에이전트, 스킬, 워크플로'],
      us: [{ s: '오픈 명세 형식 + CLI' }],
    },
    {
      cap: '계획 산출물',
      them: ['PRD, UX 명세, 아키텍처, 에픽과 스토리, 스프린트 상태 — 2026년 10월 30일에 읽은 워크플로 지도 기준'],
      us: ['요구사항 ID가 있는, spec/ 트리 안의 ', { s: '아이디어, 기능, 계획, 작업' }],
    },
    {
      cap: '작업 검사',
      them: ['에이전트가 실행하는 준비 관문(PASS / CONCERNS / FAIL)과 validate-PRD 워크플로'],
      us: [
        'CI에서 결정적인 ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        '는 수동 AI 채점입니다.',
      ],
    },
    {
      cap: '요구사항 ID',
      them: ['PRD와 에픽 파일 안의 스토리와 기능 요구사항. SpecScore의 REQ: slug가 아닙니다.'],
      us: [{ s: 'REQ: slug' }, '와 인수 기준 ID'],
    },
    {
      cap: '실행 환경',
      them: ['README가 설명하는 v6.12 설치기를 위한 Node.js와 Python'],
      us: ['단일 Go 바이너리 말고는 ', { s: '아무것도 필요 없습니다' }],
    },
    {
      cap: '라이선스',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
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
      title: '검사는 명령이지, 방법 안의 한 단계가 아니다',
      terminal: true,
      body: [
        'BMAD의 준비 결과는 그 워크플로 안의 판단입니다. SpecScore의 결과는 프로세스 종료 코드입니다. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        '는 모든 풀 리퀘스트에서 ',
        { c: 'specscore spec lint' },
        '를 실행합니다. ',
        { a: '/score', href: score, kind: 'us' },
        '는 저장소에 설정된 리뷰어로 산출물을 채점합니다. 호출하는 것은 사람입니다. CI는 호출하지 않습니다.',
      ],
    },
    {
      title: '형식은 다른 방법을 지나서도 남는다',
      body: [
        'BMAD의 문서는 그 워크플로가 모양을 만듭니다. BMAD 실행을 멈춰도 Markdown은 남지만, 방법 밖에서 모양을 강제하는 것은 없습니다. SpecScore 트리는 계약입니다. BMAD를 포함한 다른 워크플로가 그것을 써도 린터는 그대로 적용됩니다.',
      ],
    },
    {
      title: '스토리와 요구사항은 ID로 연결된 채 남는다',
      body: [
        'BMAD 스토리는 맥락을 앞으로 옮겨, 에이전트가 제품을 다시 결정하지 않게 합니다. SpecScore는 그 연결을 기계적으로 만듭니다. 계획의 작업은 ',
        { c: 'REQ: slug' },
        '를 인용하고, ',
        { c: 'specscore:' },
        ' 주석과 ',
        { c: 'Verifies:' },
        ' 커밋 트레일러가 코드를 기준 쪽으로 가리킵니다.',
      ],
    },
  ],
  whenThemTitle: 'BMAD Method를 고르는 때는…',
  whenThem: [
    ['역할별 워크플로를 가진 에이전트가 실행하는 PRD, 아키텍처, 스토리, 스프린트라는 애자일의 한 바퀴가 필요할 때.'],
    ['준비 관문과, 이 방법이 갖춘 제품, 아키텍처, 테스트 관점의 모임이 필요할 때.'],
    ['팀이 프롬프트하는 방식을 표준으로 맞추려 하고, 그 표준이 이 방법의 스킬일 때.'],
  ],
  whenUs: [
    ['그날 BMAD 워크플로를 아무도 실행하지 않아도, 제목, 링크, 상태가 잘못되면 명세가 CI에서 실패해야 할 때.'],
    ['한 방법의 스토리 파일 안이 아니라, 도구를 가로질러 안정된 요구사항 ID가 필요할 때.'],
    ['다른 과정이 겨눌 수 있는 ', { a: '오픈 소스', href: repo, kind: 'us' }, ' 형식을 원할 때.'],
  ],
  bridgeTitle: '방법이 형식을 쓸 수 있다.',
  bridge: [
    [
      'BMAD가 답하는 것은 「일을 어떻게 진행하는가」입니다. SpecScore가 답하는 것은 「계약인 파일은 무엇이며, CI는 그것이 온전한지 어떻게 아는가」입니다. 팀은 대화를 위해 BMAD의 PRD와 스토리를 남기고, 검사되어야 하는 요구사항을 위해 SpecScore 기능을 남길 수 있습니다.',
    ],
    [
      '한 바퀴에는 BMAD Method를. 풀 리퀘스트가 검사하는 산출물에는 SpecScore를.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — MIT 라이선스' },
    { href: workflow, label: 'BMAD 워크플로 지도 (main, 2026년 10월 30일에 읽음)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI 워크플로' },
    { href: score, label: 'specstudio-skills — /score 스킬' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

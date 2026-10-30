import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Kiro 대안: SpecScore와 Kiro 명세.',
  metaDescription:
    'SpecScore와 Kiro. Kiro는 Amazon Web Services(AWS)의 에이전트형 IDE로, EARS 요구사항을 작성합니다. SpecScore는 CI가 검사할 수 있는 오픈 명세 형식입니다. 2026년 10월 30일에 확인.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: '명세 기반 개발', href: '/ko/spec-driven-development/' },
    '(SDD)은 AI 에이전트가 코드를 쓰기 전에, 소프트웨어가 무엇을 해야 하는지를 글로 남겨 두는 것입니다. Amazon Web Services(AWS)의 ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    '는 에이전트형 개발 환경입니다. 편집기, ',
    { a: '명령줄 인터페이스', href: '/ko/cli/' },
    '(CLI), 웹 앱으로 이루어지며, 프롬프트를 Kiro 명세, 곧 요구사항, 설계, 작업으로 바꿉니다. 그 요구사항은 ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    '(요구사항 구문에 대한 쉬운 접근)을 씁니다. 「WHEN(무언가가 일어나면), THE SYSTEM SHALL(시스템은 무언가를 해야 한다)」 형태의 문장입니다. ',
    { a: 'SpecScore', href: '/ko/' },
    '는 명세 자체를 위한 ',
    { a: '오픈 소스', href: repo, kind: 'us' },
    ' 형식이며, 파일을 검사하는 CLI가 함께 있습니다. ',
    { a: '지속적 통합', href: '/ko/validators/' },
    '(CI), 곧 제안된 변경마다 도는 자동 검사는, 형식을 깨뜨린 SpecScore 명세를 거부할 수 있습니다.',
  ],
  shared: [
    ['둘 다, 에이전트가 만들어야 할 근거를 채팅 기록이 아니라 글로 된 명세에 둡니다.'],
    ['둘 다, 그 명세를 프로젝트 안의 Markdown으로 남기므로, 코드처럼 리뷰할 수 있습니다.'],
    ['둘 다, 일을 요구사항, 설계, 작업으로 나눕니다. Kiro는 그 세 파일을 생성합니다. SpecScore는 세션이 끝난 뒤에도 팀이 남겨 둘 수 있는 형식입니다.'],
  ],
  creditTitle: 'Kiro가 잘하는 것.',
  creditNote: [
    '제품 설명은 2026년 10월 30일에 읽은 Kiro 자신의 문서를 따릅니다. 기능 명세 페이지에는 2026년 8월 4일 업데이트라고 표시되어 있었습니다.',
  ],
  credits: [
    {
      title: '고정된 문장 형태의 요구사항',
      body: [
        'Kiro 명세는 동작을 ',
        { c: 'requirements.md' },
        '에 하나의 EARS 패턴으로 적습니다. 조건이 성립하는 WHEN, 시스템은 무언가를 해야 하는 THE SYSTEM SHALL. 문서의 예는, 잘못된 데이터가 있는 양식에서 시스템이 필드 옆에 검증 오류를 보여주는 것입니다. 이 형태는 모호한 문단보다 테스트하기 쉽습니다.',
      ],
    },
    {
      title: '프롬프트에서 작업까지 이어지는 경로',
      body: [
        '기능 명세는 요구사항, 설계(',
        { c: 'design.md' },
        '), 작업(',
        { c: 'tasks.md' },
        ')으로 진행합니다. 요구사항에서 시작할 수도, 설계에서 시작할 수도 있습니다. Quick Spec은 셋 사이에 승인으로 멈추지 않고 셋을 모두 진행합니다. 버그 수정 명세는 별도의 경로입니다. 문서는 ',
        { c: 'tasks.md' },
        '의 의존성 그래프를 바탕으로, 서로 독립적인 작업을 파동 단위로 병렬 실행하는 것도 설명합니다.',
      ],
    },
    {
      title: '제품 안의 검사',
      body: [
        'IDE와 CLI에서 쓸 수 있는 Analyze Requirements는 설계 전에 불일치, 모호함, 서로 충돌하는 제약, 빈틈을 찾습니다. Correctness, 곧 그 EARS 문장에서 끌어낸 속성 기반 테스트는, 명세 기능 표에서 IDE에만 있고 CLI, 웹, 모바일에는 없습니다.',
      ],
    },
  ],
  tableNote: 'Kiro는 명세 초안을 만드는 제품입니다. SpecScore는 저장소가 검사할 수 있는 형식입니다. 표는 그 역할을 비교합니다.',
  tableLabel: 'SpecScore와 Kiro 기능 비교',
  rows: [
    {
      cap: '주요 역할',
      them: ['명세 초안을 만들고 작업을 구현하는 에이전트형 IDE, CLI, 웹 앱'],
      us: [{ s: '오픈 명세 형식 + CLI' }],
    },
    {
      cap: '명세 파일',
      them: [{ c: 'requirements.md' }, '(또는 ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: ['Markdown과 YAML로 된 ', { s: 'spec/ 트리' }],
    },
    {
      cap: '요구사항 구문',
      them: ['EARS 패턴: WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: '요구사항 ID' },
        '(',
        { c: 'REQ: slug' },
        ')와 ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
        ' 인수 기준',
      ],
    },
    {
      cap: '명세 검사',
      them: ['IDE와 CLI의 Analyze Requirements. IDE의 속성 기반 테스트. 자체 CI를 위한 형식 린터로는 설명되어 있지 않습니다.'],
      us: [
        'CI의 ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        '는 별도의 수동 AI 채점입니다.',
      ],
    },
    {
      cap: '실행 위치',
      them: ['Kiro IDE, Kiro CLI, Kiro 웹. 일부 검사는 IDE 전용입니다.'],
      us: [{ s: '아무 저장소' }, ' — Go 바이너리 하나. Kiro 계정은 필요 없습니다'],
    },
    {
      cap: '라이선스',
      them: [
        { a: 'Kiro 라이선스', href: 'https://kiro.dev/license/', kind: 'them' },
        '는 IDE와 CLI가 AWS 고객 계약 아래의 AWS Content라고 말합니다. Kiro Crew는 별도의 ',
        { a: '공개 저장소', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        '입니다.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' 형식 · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' CLI',
      ],
    },
    {
      cap: '가격',
      them: [
        '무료 등급과 유료 요금제가 있습니다. 숫자는 움직입니다. 2026년 10월 30일에 읽은 ',
        { a: 'Kiro 요금', href: 'https://kiro.dev/pricing/', kind: 'them' },
        '을 보세요.',
      ],
      us: ['형식과 CLI에는 ', { s: '요금이 없습니다' }],
    },
  ],
  diffs: [
    {
      title: '형식은 그것만으로 CI를 실패시킨다',
      terminal: true,
      body: [
        'Kiro의 분석은 Kiro 안에서 돕니다. SpecScore의 검사는 하나의 명령입니다. 이 저장소의 ',
        { a: 'dogfood 워크플로', href: dogfood, kind: 'us' },
        '는 모든 풀 리퀘스트와 main에서 ',
        { c: 'specscore spec lint' },
        '를 실행합니다. 깨진 명세는 깨진 테스트처럼 작업을 실패시킵니다. ',
        { a: '/score', href: score, kind: 'us' },
        ' 스킬은 AI 리뷰어로 문장을 채점합니다. 그 통과는 수동이며, 위의 워크플로는 그것을 실행하지 않습니다.',
      ],
    },
    {
      title: '명세는 하나의 IDE에 묶이지 않는다',
      body: [
        'Kiro 명세는 Markdown이므로 제품 없이도 읽을 수 있습니다. 그것을 만들고 실행하는 워크플로는 Kiro의 것입니다. SpecScore 트리는 Claude Code, Cursor, Copilot, 또는 에이전트가 전혀 없는 경우에도 같은 파일입니다. CLI는 lint를 위해 모델을 호출하지 않습니다.',
      ],
    },
    {
      title: '요구사항에는 ID가 남는다',
      body: [
        'Kiro 문서는 추적성을, 요구사항을 구현까지 따라가는 것으로 설명합니다. 다시 써도 남는 안정된 ID는 설명하지 않습니다. SpecScore는 요구사항을 ',
        { c: 'REQ: slug' },
        '로 가리키고, 인수 기준은 그 자신의 ID로 가리킵니다.',
      ],
    },
    {
      title: 'EARS와 Given/When/Then은 다른 질문에 답한다',
      body: [
        'Kiro가 문서화한 EARS는 시스템 동작을 한 문장으로 적은 것입니다. SpecScore 인수 기준은 요구사항 ID에 묶인 Given/When/Then 시나리오입니다. 산문 안에 EARS 한 줄을 쓰고, 린터가 검사하는 SpecScore 파일에는 시나리오를 남겨 둘 수 있습니다.',
      ],
    },
  ],
  whenThemTitle: 'Kiro를 고르는 때는…',
  whenThem: [
    ['프롬프트에서 요구사항, 설계, 작업의 초안을 만들고 그 작업을 구현하는 AWS 에이전트형 IDE가 필요할 때.'],
    ['EARS 문장과, IDE에서는 그 문장에서 생성되는 속성 기반 테스트가 필요할 때.'],
    ['팀이 이미 Kiro 편집기, CLI, 또는 웹 앱으로 표준을 맞추고 있을 때.'],
  ],
  whenUs: [
    ['에이전트 세션이 끝난 뒤에도, Kiro가 필요 없는 저장소에서 명세가 CI 안에서 유효하게 남아야 할 때.'],
    ['요구사항 ID, 생애주기 상태, 결정적인 lint 결과가 필요할 때.'],
    ['형식을 ', { a: '오픈 소스', href: repo, kind: 'us' }, '로 두고, 검사기를 단일 바이너리로 두고 싶을 때.'],
  ],
  bridgeTitle: 'Kiro는 초안을 쓸 수 있다. SpecScore는 관문이 될 수 있다.',
  bridge: [
    [
      '여기의 내용은 Kiro 편집기를 대체하지 않습니다. 팀이 프롬프트하는 곳이 Kiro라면, 초안은 Kiro에 맡기세요. 명세가 리뷰되는 파일로 남아야 한다면, 그 계약을 SpecScore로 쓰고, 구조가 깨질 때 ',
      { c: 'specscore spec lint' },
      '가 풀 리퀘스트를 실패시키게 하세요. 두 파일은 같은 저장소에 둘 수 있습니다.',
    ],
    [
      '세션에는 Kiro를. CI 작업이 거부할 수 있는 산출물에는 SpecScore를.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Kiro 문서 — 명세' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Kiro 문서 — 기능 명세와 EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — 소개' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — 라이선스' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — 요금' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI 워크플로' },
    { href: score, label: 'specstudio-skills — /score 스킬' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

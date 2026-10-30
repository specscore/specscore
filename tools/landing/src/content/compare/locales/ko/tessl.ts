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
  metaTitle: 'Tessl 대안: SpecScore와 명세를 소스로.',
  metaDescription:
    'SpecScore와 Tessl. Tessl은 에이전트 스킬 플랫폼이며, 타일과 2025년 에세이는 명세를 소스로 다룹니다. SpecScore는 CI에서 옮길 수 있는 형식을 검사합니다. 2026년 10월 30일에 확인.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: '명세 기반 개발', href: '/ko/spec-driven-development/' },
    '(SDD)은 의도한 동작의 명세를 코드보다 먼저 쓰는 것입니다. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    '(Tessl AI Ltd)은 2026년 10월 30일 현재 에이전트 지원 플랫폼입니다. 코딩 에이전트가 불러오는 스킬, 규칙, 플러그인을 위한 레지스트리와 컨트롤 플레인입니다. 「명세를 소스로」는 Tessl의 ',
    { a: '2025년 6월 에세이', href: essay, kind: 'them' },
    '에 있는 더 강한 주장입니다. 오래 남는 산출물은 명세이고, 코드는 그로부터 나옵니다. ',
    { a: 'SpecScore', href: '/ko/' },
    '는 그 명세를 위한 ',
    { a: '오픈 소스', href: repo, kind: 'us' },
    ' 파일 형식이며, ',
    { a: '명령줄 인터페이스', href: '/ko/cli/' },
    '(CLI)가 검사합니다. ',
    { a: '지속적 통합', href: '/ko/validators/' },
    '(CI), 곧 제안된 변경마다 도는 자동 검사가 이 저장소에서 그 검사를 실행합니다.',
  ],
  shared: [
    ['둘 다, 의도를 남겨 두는 곳으로 프롬프트는 약하다고 말합니다. 글로 된 명세는 채팅보다 오래 남아야 합니다.'],
    ['둘 다, AI 코딩 에이전트가 코드를 고치기 전에 명세를 읽기를 기대합니다.'],
    ['둘 다, 요구사항에 테스트를 붙일 수 있으므로, 「완료」는 가리킬 수 있는 것이 됩니다.'],
  ],
  creditTitle: 'Tessl이 잘하는 것.',
  creditNote: [
    'Tessl에는 섞이기 쉬운 두 표면이 있습니다. 아래 메모는 2026년 10월 30일에 읽은 페이지를 바탕으로 둘을 구분해 둡니다.',
  ],
  credits: [
    {
      title: '명세를 소스로 삼는 분명한 논지',
      body: [
        'Simon Maple의 2025년 6월 27일 에세이는, 제품 요구사항 문서(PRD), 곧 무엇을 만들지 사람을 위해 쓴 산문은 대개 낡고, 코드만이 유일한 기준이 된다고 말합니다. 에세이의 대안은, 바꾸는 대상이 명세이고 LLM이 그로부터 코드, 테스트, 문서를 생성한다는 것입니다. 구호가 아니라 하나의 입장입니다.',
      ],
    },
    {
      title: '에이전트 맥락을 위한 플랫폼',
      body: [
        { a: 'Tessl 문서', href: 'https://docs.tessl.io/', kind: 'them' },
        '는 레지스트리, 스킬을 검사하고 점수를 매기는 거버넌스, 평가(evals), 에이전트 전반의 관측 가능성을 설명합니다. 문서는 스킬이 저장소 안의 평범한 산출물이고, 플랫폼이 Claude Code, Cursor, Copilot, Gemini 등과 함께 동작한다고 말합니다. 거기에서의 점수는 스킬의 점수이지, 제품 명세의 점수가 아닙니다.',
      ],
    },
    {
      title: '셸 검사가 있는 공식 명세 주도 타일',
      body: [
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ' 타일은 ',
        { a: '공개 타일 저장소', href: tile, kind: 'them' },
        '에서 MIT 라이선스입니다. 에이전트에게 인터뷰하고, ',
        { c: '.spec.md' },
        ' 파일을 쓰고, 승인을 기다린 다음 구현하도록 가르칩니다. 레지스트리 페이지는 ',
        { c: 'scripts/validate-specs.sh' },
        '와 ',
        { c: 'scripts/check-spec-links.sh' },
        '를 프론트매터, ',
        { c: 'targets' },
        ', ',
        { c: '[@test]' },
        ' 링크를 위해 나열합니다. 같은 페이지는 이 타일이 방향을 잡아 주는 맥락이며, 특별한 명령도 프레임워크도 없다고 말합니다.',
      ],
    },
  ],
  tableNote: '「명세를 소스로」는 Tessl의 에세이입니다. 타일은 오늘의 플랫폼 위에 놓인 스킬 묶음입니다. SpecScore는 버전이 있는 린터를 갖춘 형식입니다.',
  tableLabel: 'SpecScore와 Tessl 기능 비교',
  rows: [
    {
      cap: '주요 역할',
      them: ['에이전트 스킬 플랫폼에, 명세 주도 타일과 명세를 소스로 삼는 2025년 에세이가 더해진 것'],
      us: [{ s: '오픈 명세 형식 + CLI' }],
    },
    {
      cap: '명세란 무엇인가',
      them: ['에세이: 오래 남고, 코드가 그로부터 생성되는 소스. 타일: 에이전트가 구현의 기준으로 삼고, 코드는 남겨 두는 .spec.md.'],
      us: [{ s: '코드 곁의 계약' }, '. Lint는 코드를 다시 생성하지 않습니다.'],
    },
    {
      cap: '명세의 형태',
      them: ['타일: YAML 프론트매터, targets 글롭, 테스트 파일로의 [@test] 링크'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Given/When/Then', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: '명세 검사',
      them: ['그 타일의 프론트매터와 링크를 위한, 타일에 함께 제공되는 셸 스크립트'],
      us: [
        '이 저장소의 CI에서 SpecScore 형식에 대한 ',
        { s: 'specscore spec lint' },
        '. ',
        { c: '/score' },
        '는 수동 AI 채점입니다.',
      ],
    },
    {
      cap: '라이선스',
      them: [
        '타일은 ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '입니다. 플랫폼은 제품입니다. 문서는 플랫폼의 소스를 오픈 소스로 공개하지 않습니다.',
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
        '2026년 10월 30일에 읽은 ',
        { a: 'Tessl 홈페이지', href: 'https://tessl.io/', kind: 'them' },
        '는 무료 등급(워크스페이스 하나에서 월 1,000크레딧)과 유료 엔터프라이즈 요금제를 설명합니다.',
      ],
      us: ['형식과 CLI에는 ', { s: '요금이 없습니다' }],
    },
  ],
  diffs: [
    {
      title: '공개된 형식이지, 타일 스크립트가 아니다',
      terminal: true,
      body: [
        '타일의 셸 스크립트는 그 타일이 에이전트에게 쓰게 한 ',
        { c: '.spec.md' },
        ' 파일을 검사합니다. SpecScore가 검사하는 것은 이 사이트에 문서화된 형식입니다. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        '는 고정된 ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' 릴리스를 설치하고 ',
        { c: 'specscore spec lint' },
        '를 실행합니다. ',
        { a: '/score', href: score, kind: 'us' },
        '는 그 작업이 아닙니다. AI 리뷰어가 문제를 보고하면 0이 아닌 코드로 끝나는 수동 스킬입니다.',
      ],
    },
    {
      title: '어느 쪽이든 코드는 남는다. 에세이는 더 멀리 간다',
      body: [
        '2025년 에세이는 코드를 명세에서 다시 생성해야 한다고 말합니다. 2026년 10월 30일에 읽은 페이지의 타일은, 승인된 명세를 기준으로 에이전트가 구현한다고 하며, 소스 트리를 바꾸는 컴파일러는 설명하지 않습니다. SpecScore는 코드를 가져가지 않습니다. 명세는 리뷰되는 계약이고, 코드는 여러분의 것으로 남습니다.',
      ],
    },
    {
      title: '요구사항의 정체성',
      body: [
        '타일은 요구사항을 ',
        { c: 'targets' },
        '와 ',
        { c: '[@test]' },
        '로 파일에 향하게 합니다. SpecScore는 요구사항을 ',
        { c: 'REQ: slug' },
        '로 이름 붙이므로, 파일이 옮겨진 뒤에도 계획, 작업, 커밋 트레일러가 그것을 인용할 수 있습니다.',
      ],
    },
  ],
  whenThemTitle: 'Tessl을 고르는 때는…',
  whenThem: [
    ['여러 에이전트와 저장소에서 공유하는 스킬을 위해 레지스트리, 평가, 거버넌스가 필요할 때.'],
    ['명세를 소스로 삼는 에세이의 흐름을 방향을 잡아 주는 타일로 원할 때. 인터뷰하고, .spec.md를 승인한 다음 구현합니다.'],
    ['이미 Tessl 플랫폼을 결제했거나 시험 중이고, 그 레지스트리의 명세 타일을 원할 때.'],
  ],
  whenUs: [
    ['Tessl을 설치하지 않는 저장소를 포함해, 명세 형식 자체가 CI에서 유효해야 할 때.'],
    ['요구사항 ID와, 모델을 호출하지 않는 린터가 필요할 때.'],
    ['스킬 플랫폼과 별도로, 크리에이티브 커먼즈 라이선스 아래 형식을 ', { a: '오픈 소스', href: repo, kind: 'us' }, '로 두고 싶을 때.'],
  ],
  bridgeTitle: '명세를 소스로, 그리고 검사할 수 있는 명세를.',
  bridge: [
    [
      '낡은 PRD는 코드에 진다는 Tessl의 에세이는 맞습니다. 명세가 신뢰하는 대상으로 남는 방법이 형식 검사입니다. SpecScore는 명세에서 애플리케이션을 생성하지 않습니다. 구조, 링크, 상태가 잘못되었을 때 명세가 CI에서 실패하게 합니다.',
    ],
    [
      '플랫폼과 타일을 원하면 Tessl을. 풀 리퀘스트가 증명해야 하는 것이 git 안의 산출물이면 SpecScore를.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Tessl 문서 — Tessl이란?' },
    { href: 'https://tessl.io/', label: 'Tessl 홈페이지' },
    { href: essay, label: 'Tessl 블로그 — 코드만으로는 부족한 이유 (2025년 6월 27일)' },
    { href: tilePage, label: 'Tessl 레지스트리 — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — dogfood CI 워크플로' },
    { href: score, label: 'specstudio-skills — /score 스킬' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

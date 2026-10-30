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
  metaTitle: 'Alternative à Tessl : SpecScore et le spec as source.',
  metaDescription:
    'SpecScore face à Tessl. Tessl est une plateforme de skills pour agents ; son tile et l’essai de 2025 traitent la spécification comme source. SpecScore linte un format portable dans la CI. Vérifié le 30 octobre 2026.',
  h1: 'SpecScore vs Tessl',
  hero: [
    { a: 'Développement piloté par les spécifications', href: '/fr/spec-driven-development/' },
    ' (SDD) signifie que la spécification du comportement prévu est écrite avant le code. ',
    { a: 'Tessl', href: 'https://tessl.io/', kind: 'them' },
    ' (Tessl AI Ltd) est, au 30 octobre 2026, une plateforme d’habilitation des agents : un registre et un plan de contrôle pour les skills, règles et plugins que chargent les agents de programmation. « Spec as source » est l’affirmation la plus forte de l’',
    { a: 'essai de juin 2025', href: essay, kind: 'them' },
    ' de Tessl : la spécification est l’artefact durable, et le code en est dérivé. ',
    { a: 'SpecScore', href: '/fr/' },
    ' est un format de fichier ',
    { a: 'à code source ouvert', href: repo, kind: 'us' },
    ' pour cette spécification, vérifié par une ',
    { a: 'interface en ligne de commande', href: '/fr/cli/' },
    ' (CLI). L’',
    { a: 'intégration continue', href: '/fr/validators/' },
    ' (CI) — une vérification automatique à chaque changement proposé — exécute cette vérification dans ce dépôt.',
  ],
  shared: [
    ['Les deux disent qu’un prompt est un mauvais endroit pour garder l’intention. Une spécification écrite doit survivre à la conversation.'],
    ['Les deux attendent qu’un agent de programmation IA lise la spécification avant de modifier le code.'],
    ['Les deux peuvent attacher des tests aux exigences, de sorte que « terminé » soit quelque chose que l’on peut montrer.'],
  ],
  creditTitle: 'Ce que Tessl fait bien.',
  creditNote: [
    'Deux surfaces Tessl distinctes se confondent facilement. Les notes ci-dessous les séparent, d’après des pages lues le 30 octobre 2026.',
  ],
  credits: [
    {
      title: 'Un argument clair pour le spec as source',
      body: [
        'L’essai de Simon Maple du 27 juin 2025 dit qu’un document d’exigences produit (PRD) — de la prose écrite pour des personnes sur ce qu’il faut construire — se périme en général, tandis que le code devient la seule source de vérité. L’alternative de l’essai : la spécification est ce que vous changez, et un grand modèle de langage (LLM) en génère le code, les tests et la documentation. C’est une position réelle, pas un slogan.',
      ],
    },
    {
      title: 'Une plateforme pour le contexte de l’agent',
      body: [
        { a: 'La documentation de Tessl', href: 'https://docs.tessl.io/', kind: 'them' },
        ' décrit un registre, une gouvernance qui analyse et note les skills, des évaluations et de l’observabilité entre agents. La documentation dit que les skills sont de simples artefacts dans votre dépôt, et que la plateforme fonctionne avec Claude Code, Cursor, Copilot, Gemini et d’autres. Noter, ici, signifie noter une skill, pas noter une spécification de produit.',
      ],
    },
    {
      title: 'Un tile officiel de développement piloté par les spécifications, avec des vérifications shell',
      body: [
        'Le tile ',
        { a: 'tessl-labs/spec-driven-development', href: tilePage, kind: 'them' },
        ', sous licence MIT dans le ',
        { a: 'dépôt public du tile', href: tile, kind: 'them' },
        ', apprend à un agent à interroger, écrire des fichiers ',
        { c: '.spec.md' },
        ', attendre l’approbation, puis implémenter. La page du registre cite ',
        { c: 'scripts/validate-specs.sh' },
        ' et ',
        { c: 'scripts/check-spec-links.sh' },
        ' pour le frontmatter, ',
        { c: 'targets' },
        ' et les liens ',
        { c: '[@test]' },
        '. La même page dit que le tile est un contexte de pilotage : pas de commandes spéciales, pas de cadre logiciel.',
      ],
    },
  ],
  tableNote: '« Spec as source » est l’essai de Tessl. Le tile est un paquet de skills au-dessus de la plateforme actuelle. SpecScore est un format avec un linter versionné.',
  tableLabel: 'Comparaison des fonctionnalités SpecScore vs Tessl',
  rows: [
    {
      cap: 'Rôle principal',
      them: ['Plateforme de skills pour agents, plus un tile de développement piloté par les spécifications et un essai de 2025 sur le spec as source'],
      us: [{ s: 'Format de spécification ouvert + CLI' }],
    },
    {
      cap: 'Ce qu’est la spécification',
      them: ['Essai : la source durable à partir de laquelle le code est généré. Tile : un .spec.md contre lequel l’agent implémente, et vous gardez le code.'],
      us: [{ s: 'Un contrat à côté du code' }, '. Le lint ne régénère pas le code.'],
    },
    {
      cap: 'Forme de la spécification',
      them: ['Tile : frontmatter YAML, globs targets et liens [@test] vers des fichiers de test'],
      us: [
        { s: 'Markdown + YAML' },
        ', ',
        { c: 'REQ: slug' },
        ', ',
        { a: 'Étant donné/Quand/Alors', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Vérifier la spécification',
      them: ['Scripts shell livrés avec le tile, pour le frontmatter et les liens de ce tile'],
      us: [
        { s: 'specscore spec lint' },
        ' sur le format SpecScore, dans la CI de ce dépôt. ',
        { c: '/score' },
        ' est une note d’IA manuelle.',
      ],
    },
    {
      cap: 'Licence',
      them: [
        'Le tile est ',
        { a: 'MIT', href: `${tile}/blob/main/LICENSE`, kind: 'them' },
        '. La plateforme est un produit. La documentation ne publie pas le code source de la plateforme comme code ouvert.',
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' pour le format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' pour le CLI',
      ],
    },
    {
      cap: 'Prix',
      them: [
        'La ',
        { a: 'page d’accueil de Tessl', href: 'https://tessl.io/', kind: 'them' },
        ', lue le 30 octobre 2026, décrit un palier gratuit (1 000 crédits par mois sur un espace de travail) et des offres entreprise payantes.',
      ],
      us: [{ s: 'Sans frais' }, ' pour le format ni pour le CLI'],
    },
  ],
  diffs: [
    {
      title: 'Un format publié, pas un script du tile',
      terminal: true,
      body: [
        'Les scripts shell du tile vérifient les fichiers ',
        { c: '.spec.md' },
        ' que ce tile a demandé à l’agent d’écrire. SpecScore vérifie un format documenté sur ce site. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' installe une version épinglée de ',
        { a: 'specscore', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ' et exécute ',
        { c: 'specscore spec lint' },
        '. ',
        { a: '/score', href: score, kind: 'us' },
        ' n’est pas cette exécution : c’est une skill manuelle qui se termine avec un code non nul quand les relecteurs d’IA signalent des problèmes.',
      ],
    },
    {
      title: 'Vous gardez le code dans les deux cas — l’essai va plus loin',
      body: [
        'L’essai de 2025 dit que le code devrait être régénéré à partir de la spécification. Le tile, sur la page lue le 30 octobre 2026, fait implémenter l’agent contre une spécification approuvée et ne décrit pas de compilateur qui remplacerait votre arborescence source. SpecScore ne retire jamais le code. La spécification est le contrat relu ; le code reste le vôtre.',
      ],
    },
    {
      title: 'Identité de l’exigence',
      body: [
        'Le tile pointe une exigence vers des fichiers avec ',
        { c: 'targets' },
        ' et ',
        { c: '[@test]' },
        '. SpecScore nomme l’exigence ',
        { c: 'REQ: slug' },
        ' pour qu’un plan, une tâche et un trailer de commit puissent la citer après le déplacement des fichiers.',
      ],
    },
  ],
  whenThemTitle: 'Choisissez Tessl quand…',
  whenThem: [
    ['Vous avez besoin d’un registre, d’évaluations et d’une gouvernance pour des skills partagées entre de nombreux agents et dépôts.'],
    ['Vous voulez le déroulement de l’essai spec as source comme tile de pilotage : interroger, approuver un .spec.md, puis implémenter.'],
    ['Vous payez déjà la plateforme Tessl, ou vous l’essayez, et vous voulez son tile de spécification dans ce registre.'],
  ],
  whenUs: [
    ['Le format de spécification lui-même doit être valide dans la CI, y compris dans des dépôts qui n’installent pas Tessl.'],
    ['Vous voulez des identifiants d’exigences et un linter qui n’appelle pas de modèle.'],
    ['Vous voulez le format ', { a: 'à code source ouvert', href: repo, kind: 'us' }, ' sous une licence Creative Commons, distinct d’une plateforme de skills.'],
  ],
  bridgeTitle: 'Spec as source, et une spécification que l’on peut linter.',
  bridge: [
    [
      'L’essai de Tessl a raison : un PRD périmé perd face au code. Une vérification de format est ce qui permet à la spécification de rester ce en quoi vous avez confiance. SpecScore ne génère pas votre application à partir de la spécification. Il fait échouer la spécification dans la CI quand la structure, les liens ou le statut sont faux.',
    ],
    [
      'Utilisez Tessl si vous voulez la plateforme et le tile. Utilisez SpecScore si l’artefact dans git est ce que la pull request doit prouver.',
    ],
  ],
  sources: [
    { href: 'https://docs.tessl.io/', label: 'Documentation Tessl — Qu’est-ce que Tessl ?' },
    { href: 'https://tessl.io/', label: 'Page d’accueil de Tessl' },
    { href: essay, label: 'Blog Tessl — Why code alone isn’t enough (27 juin 2025)' },
    { href: tilePage, label: 'Registre Tessl — tessl-labs/spec-driven-development' },
    { href: tile, label: 'tesslio/spec-driven-development-tile' },
    { href: dogfood, label: 'specscore/specscore — flux CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

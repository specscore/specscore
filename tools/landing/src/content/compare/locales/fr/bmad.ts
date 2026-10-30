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
  metaTitle: 'Alternative à la BMAD Method : SpecScore face à BMAD.',
  metaDescription:
    'SpecScore face à la BMAD Method (Breakthrough Method for Agile AI-Driven Development) : un flux agile d’agents, face à un format de spécification linté dans la CI. Vérifié le 30 octobre 2026.',
  h1: 'SpecScore vs la BMAD Method',
  hero: [
    'La ',
    { a: 'BMAD Method', href: bmad, kind: 'them' },
    ' (Breakthrough Method for Agile AI-Driven Development) est une façon ',
    { a: 'à code source ouvert', href: bmad, kind: 'them' },
    ' de mener une livraison agile avec des agents d’IA : clarifier le travail, le planifier, le construire et le vérifier, avec les décisions écrites. Un document d’exigences produit (PRD) est la description en prose de ce qu’il faut construire et pour qui ; la carte de flux de la méthode en produit un, puis l’architecture et les stories. Le ',
    { a: 'développement piloté par les spécifications', href: '/fr/spec-driven-development/' },
    ' (SDD) est l’idée plus large dans laquelle les deux se placent — le comportement est spécifié avant le code. ',
    { a: 'SpecScore', href: '/fr/' },
    ' est un format ',
    { a: 'à code source ouvert', href: repo, kind: 'us' },
    ' pour cette spécification, plus une ',
    { a: 'interface en ligne de commande', href: '/fr/cli/' },
    ' (CLI). L’',
    { a: 'intégration continue', href: '/fr/validators/' },
    ' (CI) — une vérification automatique à chaque changement proposé — peut échouer quand un fichier SpecScore est structurellement faux.',
  ],
  shared: [
    ['Les deux refusent de laisser un agent inventer le produit pendant qu’il écrit le code.'],
    ['Les deux gardent les documents de planification dans le dépôt, en Markdown, à côté du travail.'],
    ['Les deux attendent qu’un humain approuve le plan avant que l’implémentation ne s’emballe.'],
  ],
  creditTitle: 'Ce que la BMAD Method fait bien.',
  creditNote: [
    'Le README du projet, lu le 30 octobre 2026, appelle v6.12 la version stable et v7 un aperçu sur la branche main. La date de v7 dans ce README était déjà passée. Traitez les noms de ligne comme un instantané.',
  ],
  credits: [
    {
      title: 'Une méthode qui se dimensionne elle-même',
      body: [
        'Le README dit que les petits changements vont droit à la construction, et que le travail plus large reçoit une planification. La ',
        { a: 'carte de flux sur main', href: workflow, kind: 'them' },
        ' détaille les phases : un PRD (',
        { c: 'PRD.md' },
        '), une spécification UX facultative, ',
        { c: 'architecture.md' },
        ' avec des enregistrements de décision, des fichiers d’epics et de stories, puis un sprint. C’est une boucle agile complète, pas un seul prompt.',
      ],
    },
    {
      title: 'Une barrière avant l’implémentation',
      body: [
        'La même carte cite ',
        { c: 'bmad-check-implementation-readiness' },
        ', qui renvoie PASS, CONCERNS ou FAIL avant l’implémentation. L’agent product-manager de v6 a aussi une étape validate-PRD. Ce sont des barrières de flux que l’agent exécute. Ce n’est pas un linter de format séparé que vous pointez sur un arbre Markdown quelconque.',
      ],
    },
    {
      title: 'Elle est vraiment publiée',
      body: [
        'La méthode est ',
        { a: 'sous licence MIT', href: bmadLicense, kind: 'them' },
        ' dans un dépôt public. L’installation stable du README est ',
        { c: 'npx bmad-method install' },
        ', et elle demande Node.js 20.12 ou plus récent et Python 3.10 ou plus récent. Le site ',
        { a: 'bmadcode.com', href: 'https://www.bmadcode.com/', kind: 'them' },
        ' dit que la méthode est gratuite.',
      ],
    },
  ],
  tableNote: 'BMAD est le processus. SpecScore est le format d’artefact qu’un processus peut viser. Le tableau compare ces rôles.',
  tableLabel: 'Comparaison des fonctionnalités SpecScore vs BMAD Method',
  rows: [
    {
      cap: 'Rôle principal',
      them: ['Méthode agile : agents, skills et flux de travail, de l’idée au code vérifié'],
      us: [{ s: 'Format de spécification ouvert + CLI' }],
    },
    {
      cap: 'Artefacts de planification',
      them: ['PRD, spécification UX, architecture, epics et stories, statut de sprint — sur la carte de flux lue le 30 octobre 2026'],
      us: [{ s: 'Idées, fonctionnalités, plans et tâches' }, ' dans une arborescence spec/, avec des identifiants d’exigences'],
    },
    {
      cap: 'Vérifier le travail',
      them: ['Barrière de préparation (PASS / CONCERNS / FAIL) et un flux validate-PRD, exécutés par l’agent'],
      us: [
        { s: 'specscore spec lint' },
        ' dans la CI, déterministe. ',
        { c: '/score' },
        ' est une note d’IA manuelle.',
      ],
    },
    {
      cap: 'Identifiants d’exigences',
      them: ['Stories et exigences fonctionnelles dans le PRD et les fichiers d’epics. Pas le REQ: slug de SpecScore.'],
      us: [{ s: 'REQ: slug' }, ' et identifiants de critères d’acceptation'],
    },
    {
      cap: 'Exécution',
      them: ['Node.js et Python pour l’installateur v6.12 décrit dans le README'],
      us: [{ s: 'Aucun' }, ' au-delà d’un seul binaire Go'],
    },
    {
      cap: 'Licence',
      them: [
        { a: 'MIT', href: bmadLicense, kind: 'them' },
        ', ',
        { a: 'bmad-code-org/BMAD-METHOD', href: bmad, kind: 'them' },
      ],
      us: [
        { a: 'CC BY 4.0', href: license, kind: 'us' },
        ' pour le format · ',
        { a: 'Apache-2.0', href: cliLicense, kind: 'us' },
        ' pour le CLI',
      ],
    },
  ],
  diffs: [
    {
      title: 'La vérification est une commande, pas une étape de la méthode',
      terminal: true,
      body: [
        'Le résultat de préparation de BMAD est une décision à l’intérieur de son flux. Le résultat de SpecScore est un code de sortie du processus. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' exécute ',
        { c: 'specscore spec lint' },
        ' sur chaque pull request. ',
        { a: '/score', href: score, kind: 'us' },
        ' note un artefact avec les relecteurs configurés dans le dépôt ; vous l’invoquez. La CI ne le fait pas.',
      ],
    },
    {
      title: 'Le format survit à une autre méthode',
      body: [
        'Les documents de BMAD prennent leur forme dans ses flux. Si vous cessez d’exécuter BMAD, vous avez encore le Markdown, mais rien en dehors de la méthode n’impose la forme. Une arborescence SpecScore est le contrat. Un autre flux — y compris BMAD — peut l’écrire, et le linter s’applique toujours.',
      ],
    },
    {
      title: 'Stories et exigences restent liées par identifiant',
      body: [
        'Les stories BMAD portent le contexte pour que l’agent ne redécide pas le produit. SpecScore rend le lien mécanique : une tâche de plan cite ',
        { c: 'REQ: slug' },
        ', et les annotations ',
        { c: 'specscore:' },
        ' plus les trailers de commit ',
        { c: 'Verifies:' },
        ' renvoient le code vers le critère.',
      ],
    },
  ],
  whenThemTitle: 'Choisissez la BMAD Method quand…',
  whenThem: [
    ['Vous voulez une boucle agile complète — PRD, architecture, stories, sprint — exécutée par des agents avec des flux selon le rôle.'],
    ['Vous voulez la barrière de préparation et le groupe de points de vue produit, architecture et test que la méthode fournit.'],
    ['Vous standardisez la façon dont une équipe écrit ses prompts, et les skills de la méthode sont le standard.'],
  ],
  whenUs: [
    ['La spécification doit échouer dans la CI quand un titre, un lien ou un statut est faux, même si personne n’exécute le flux BMAD ce jour-là.'],
    ['Vous avez besoin d’identifiants d’exigences stables d’un outil à l’autre, pas seulement dans les fichiers de stories d’une méthode.'],
    ['Vous voulez un format ', { a: 'à code source ouvert', href: repo, kind: 'us' }, ' qu’un autre processus peut viser.'],
  ],
  bridgeTitle: 'La méthode peut écrire le format.',
  bridge: [
    [
      'BMAD répond à « comment menons-nous le travail ». SpecScore répond à « quel fichier est le contrat, et comment la CI sait-elle qu’il est intact ». Une équipe peut garder le PRD et les stories de BMAD pour la conversation, et une fonctionnalité SpecScore pour les exigences qui doivent passer le lint.',
    ],
    [
      'Utilisez la BMAD Method pour la boucle. Utilisez SpecScore pour l’artefact que la pull request vérifie.',
    ],
  ],
  sources: [
    { href: bmad, label: 'bmad-code-org/BMAD-METHOD' },
    { href: bmadLicense, label: 'BMAD-METHOD — licence MIT' },
    { href: workflow, label: 'Carte de flux BMAD (main, lue le 30 octobre 2026)' },
    { href: 'https://www.bmadcode.com/', label: 'bmadcode.com' },
    { href: dogfood, label: 'specscore/specscore — flux CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

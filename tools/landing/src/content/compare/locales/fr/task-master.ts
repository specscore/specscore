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
  metaTitle: 'Alternative à Task Master AI : SpecScore face à Task Master.',
  metaDescription:
    'SpecScore face à Task Master AI. Task Master découpe un document d’exigences produit en tâches pour des agents de programmation. SpecScore est le format de spécification que la CI peut linter. Vérifié le 30 octobre 2026.',
  h1: 'SpecScore vs Task Master AI',
  hero: [
    { a: 'Task Master AI', href: tm, kind: 'them' },
    ' (le paquet ',
    { c: 'task-master-ai' },
    ', aussi appelé Taskmaster) est un gestionnaire de tâches pour agents de programmation IA. Un document d’exigences produit (PRD) est un document en prose de ce qu’il faut construire ; le README de Task Master dit d’en placer un dans ',
    { c: '.taskmaster/docs/prd.txt' },
    ' et de l’analyser pour en tirer des tâches. Le ',
    { a: 'développement piloté par les spécifications', href: '/fr/spec-driven-development/' },
    ' (SDD) est la pratique qui consiste à spécifier le comportement avant le code. ',
    { a: 'SpecScore', href: '/fr/' },
    ' est un format ',
    { a: 'à code source ouvert', href: repo, kind: 'us' },
    ' pour cette spécification, plus une ',
    { a: 'interface en ligne de commande', href: '/fr/cli/' },
    ' (CLI) qui la vérifie. L’',
    { a: 'intégration continue', href: '/fr/validators/' },
    ' (CI) — une vérification automatique à chaque changement proposé — exécute cette vérification dans ce dépôt. Task Master ne publie pas de format de spécification que la CI puisse linter.',
  ],
  shared: [
    ['Les deux partent de l’idée qu’un agent d’IA ne devrait pas inventer tout le travail à partir d’un prompt d’une ligne.'],
    ['Les deux gardent leur état dans le dépôt pour que la session suivante puisse le voir.'],
    ['Les deux peuvent dire à un agent quoi faire ensuite, au lieu de relire tout le projet.'],
  ],
  creditTitle: 'Ce que Task Master AI fait bien.',
  creditNote: [
    'Les faits ci-dessous viennent du README du projet et de l’index de la documentation, lus le 30 octobre 2026. Les décomptes d’outils et les listes de modèles de ce README changent souvent, ils ne sont donc pas répétés ici.',
  ],
  credits: [
    {
      title: 'Un PRD devient une liste de tâches',
      body: [
        'Le chemin du README est concret : ',
        { c: 'task-master parse-prd' },
        ' lit un PRD et génère des tâches. ',
        { c: 'task-master next' },
        ' désigne la tâche suivante. ',
        { c: 'task-master expand' },
        ' décompose une tâche. Les étiquettes déplacent le travail entre des flux. C’est une couche utile une fois que vous savez déjà ce que vous construisez.',
      ],
    },
    {
      title: 'Il apparaît dans l’éditeur',
      body: [
        'L’installation recommandée est un serveur Model Context Protocol (MCP) — un petit programme que l’éditeur appelle — via ',
        { c: 'npx -y task-master-ai' },
        ', y compris une installation en une étape pour Cursor et une ligne ',
        { c: 'claude mcp add' },
        ' pour Claude Code. L’agent analyse, liste et met à jour les tâches ensuite, sans tableau de bord séparé.',
      ],
    },
    {
      title: 'Une recherche avec le projet comme contexte',
      body: [
        { c: 'task-master research' },
        ' est documenté comme un moyen de questionner un modèle sur une bibliothèque ou une migration en utilisant le projet actuel comme contexte. Plusieurs fournisseurs de modèles sont pris en charge. Le README dit que les commandes qui appellent un modèle ont besoin d’une clé d’API, sauf si vous utilisez les chemins Claude Code ou Codex CLI qu’il énumère.',
      ],
    },
  ],
  tableNote: 'Task Master gère des tâches. SpecScore est la spécification que ces tâches peuvent citer. Le tableau compare ces rôles.',
  tableLabel: 'Comparaison des fonctionnalités SpecScore vs Task Master AI',
  rows: [
    {
      cap: 'Rôle principal',
      them: ['Liste de tâches pour agents de programmation IA, obtenue en analysant un PRD'],
      us: [{ s: 'Format de spécification ouvert + CLI' }],
    },
    {
      cap: 'Entrée',
      them: ['PRD en prose, documenté dans .taskmaster/docs/prd.txt'],
      us: [{ s: 'Markdown + YAML structurés' }, ' avec des sections obligatoires'],
    },
    {
      cap: 'Ce que vous obtenez',
      them: ['Des tâches, des dépendances, des étiquettes et un pointeur vers la « tâche suivante »'],
      us: [{ s: 'Exigences, critères d’acceptation, plans et tâches' }, ' qui citent des identifiants d’exigences'],
    },
    {
      cap: 'Vérifier la spécification',
      them: ['Pas de linter documenté pour le PRD. Le modèle analyse du texte libre.'],
      us: [
        { s: 'specscore spec lint' },
        ' dans la CI. ',
        { c: '/score' },
        ' est une note d’IA manuelle du libellé.',
      ],
    },
    {
      cap: 'Exécution',
      them: ['Node.js, en général via le serveur MCP. Les appels au modèle ont besoin d’une clé de fournisseur ou d’un Claude Code / Codex CLI local, d’après le README.'],
      us: [{ s: 'Un seul binaire Go' }, '. Le lint n’appelle pas de modèle.'],
    },
    {
      cap: 'Licence',
      them: [
        'Le ',
        { a: 'dépôt public', href: tm, kind: 'them' },
        ' est sous ',
        { a: 'MIT plus une Commons Clause', href: tmLicense, kind: 'them' },
        '. Le README dit que vous pouvez l’utiliser et le modifier, et que vous ne pouvez pas vendre Task Master lui-même ni l’offrir comme service hébergé.',
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
      title: 'Un PRD n’est pas une spécification lintable',
      terminal: true,
      body: [
        'La qualité de Task Master dépend du niveau de détail du PRD — le README le dit. Rien dans ce README ne vérifie la structure du PRD avant que le modèle ne l’analyse. SpecScore refuse une fonctionnalité à laquelle il manque une section obligatoire. ',
        { a: 'dogfood.yml', href: dogfood, kind: 'us' },
        ' exécute ',
        { c: 'specscore spec lint' },
        ' sur chaque pull request. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' est une seconde passe, manuelle, sur le libellé. Ce n’est pas la commande de CI.',
      ],
    },
    {
      title: 'Les tâches peuvent citer une exigence',
      body: [
        'Task Master donne aux tâches des identifiants numériques et des dépendances. SpecScore donne aux exigences des identifiants stables (',
        { c: 'REQ: slug' },
        '). Une tâche de plan peut nommer le critère qu’elle satisfait, et un trailer de commit peut le nommer à nouveau. La liste de tâches et la spécification cessent d’être deux documents sans lien.',
      ],
    },
    {
      title: 'Le lint n’a pas besoin d’une clé d’API',
      body: [
        'Analyser un PRD dans Task Master appelle un modèle. Vérifier une arborescence SpecScore, non. Le CLI est un binaire Go issu de ',
        { a: 'specscore/specscore-cli', href: 'https://github.com/specscore/specscore-cli', kind: 'us' },
        ', la CI peut donc l’exécuter sans compte fournisseur.',
      ],
    },
  ],
  whenThemTitle: 'Choisissez Task Master AI quand…',
  whenThem: [
    ['Vous avez déjà un PRD et vous voulez qu’un agent le découpe en tâches ordonnées dans Cursor, Claude Code ou un autre client MCP.'],
    ['Vous voulez next-task, expand, les étiquettes et la recherche comme commandes de l’éditeur.'],
    ['Ce que vous gérez est le tableau de tâches, pas un format de spécification réutilisable.'],
  ],
  whenUs: [
    ['Les exigences elles-mêmes doivent être structurées, identifiables, et rejetées par la CI quand elles rompent le format.'],
    ['Vous ne voulez pas d’appel à un modèle sur le chemin qui décide si la spécification est bien formée.'],
    ['Vous voulez le format ', { a: 'à code source ouvert', href: repo, kind: 'us' }, ' sous CC BY 4.0, avec un CLI Apache-2.0.'],
  ],
  bridgeTitle: 'Découpez les tâches à partir d’une spécification qui linte déjà.',
  bridge: [
    [
      'Task Master est un solide tableau de tâches. Ce n’est pas un langage de spécification. Écrivez le comportement dans SpecScore, laissez la CI le linter, et pointez la liste de tâches vers des identifiants ',
      { c: 'REQ: slug' },
      '. Si vous voulez quand même les outils d’éditeur de Task Master, donnez-lui un PRD que vous avez produit à partir d’une spécification ayant déjà passé ',
      { c: 'specscore spec lint' },
      '.',
    ],
    [
      'Utilisez Task Master AI pour ordonner le travail. Utilisez SpecScore pour que le travail ait un contrat.',
    ],
  ],
  sources: [
    { href: tm, label: 'eyaltoledano/claude-task-master' },
    { href: tmLicense, label: 'Task Master — MIT plus Commons Clause' },
    { href: tmDocs, label: 'Documentation Task Master (tryhamster.com)' },
    { href: dogfood, label: 'specscore/specscore — flux CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

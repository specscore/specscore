import type { ComparePage } from '../../types.ts';

const repo = 'https://github.com/specscore/specscore';
const license = 'https://github.com/specscore/specscore/blob/main/LICENSE';
const cliLicense = 'https://github.com/specscore/specscore-cli/blob/main/LICENSE';
const dogfood = 'https://github.com/specscore/specscore/blob/main/.github/workflows/dogfood.yml';
const score = 'https://github.com/specscore/specstudio-skills/blob/main/skills/score/SKILL.md';

export const kiro: ComparePage = {
  slug: 'kiro',
  competitor: 'Kiro',
  metaTitle: 'Alternative à Kiro : SpecScore face aux Kiro specs.',
  metaDescription:
    'SpecScore face à Kiro. Kiro est l’IDE agentique d’AWS qui écrit des exigences EARS. SpecScore est un format de spécification ouvert que votre CI peut linter. Vérifié le 30 octobre 2026.',
  h1: 'SpecScore vs Kiro',
  hero: [
    { a: 'Développement piloté par les spécifications', href: '/fr/spec-driven-development/' },
    ' (SDD) signifie écrire ce que le logiciel doit faire avant qu’un agent d’IA n’écrive le code. ',
    { a: 'Kiro', href: 'https://kiro.dev/', kind: 'them' },
    ', d’Amazon Web Services (AWS), est un environnement de développement agentique — un éditeur, une ',
    { a: 'interface en ligne de commande', href: '/fr/cli/' },
    ' (CLI) et une application web — qui transforme un prompt en Kiro specs : exigences, une conception et des tâches. Ces exigences utilisent ',
    { a: 'EARS', href: 'https://kiro.dev/docs/specs/feature-specs/', kind: 'them' },
    ' (Easy Approach to Requirements Syntax), des phrases de la forme « WHEN quelque chose se produit, THE SYSTEM SHALL faire quelque chose ». ',
    { a: 'SpecScore', href: '/fr/' },
    ' est un format ',
    { a: 'à code source ouvert', href: repo, kind: 'us' },
    ' pour la spécification elle-même, plus un CLI qui vérifie les fichiers. L’',
    { a: 'intégration continue', href: '/fr/validators/' },
    ' (CI) — une vérification automatique à chaque changement proposé — peut rejeter une spécification SpecScore qui rompt le format.',
  ],
  shared: [
    ['Les deux traitent une spécification écrite comme ce à partir de quoi un agent doit construire, et non comme la transcription d’une conversation.'],
    ['Les deux conservent cette spécification en Markdown dans le projet, afin qu’elle se relise comme du code.'],
    ['Les deux découpent le travail en exigences, une conception et des tâches. Kiro génère ces trois fichiers. SpecScore est un format qu’une équipe peut garder après la fin de la session.'],
  ],
  creditTitle: 'Ce que Kiro fait bien.',
  creditNote: [
    'La documentation propre de Kiro, lue le 30 octobre 2026, décrit le produit. La page des spécifications de fonctionnalité était marquée comme mise à jour le 4 août 2026.',
  ],
  credits: [
    {
      title: 'Des exigences dans une forme de phrase fixe',
      body: [
        'Les Kiro specs placent le comportement dans ',
        { c: 'requirements.md' },
        ' selon un motif EARS : WHEN une condition est vraie, THE SYSTEM SHALL faire une chose. La documentation donne l’exemple d’un formulaire avec des données invalides, et le système affiche une erreur de validation à côté du champ. Cette forme est plus facile à tester qu’un paragraphe vague.',
      ],
    },
    {
      title: 'Un chemin complet du prompt aux tâches',
      body: [
        'Une spécification de fonctionnalité passe par les exigences, la conception (',
        { c: 'design.md' },
        ') et les tâches (',
        { c: 'tasks.md' },
        '). Vous pouvez partir des exigences ou d’une conception. Quick Spec exécute les trois sans arrêt d’approbation entre elles. Les Bugfix specs sont un chemin distinct. La documentation décrit aussi l’exécution de tâches indépendantes en parallèle, par vagues, à partir du graphe de dépendances dans ',
        { c: 'tasks.md' },
        '.',
      ],
    },
    {
      title: 'Des vérifications dans le produit',
      body: [
        'Analyze Requirements, disponible dans l’IDE et le CLI, cherche les incohérences, l’ambiguïté, les contraintes en conflit et les manques avant la conception. Correctness — des tests basés sur les propriétés, tirés de ces lignes EARS — est indiqué pour l’IDE seulement, pas pour le CLI, le web ou le mobile, dans le tableau de capacités des specs.',
      ],
    },
  ],
  tableNote: 'Kiro est un produit qui rédige des spécifications. SpecScore est le format qu’un dépôt peut vérifier. Le tableau compare ces rôles.',
  tableLabel: 'Comparaison des fonctionnalités SpecScore vs Kiro',
  rows: [
    {
      cap: 'Rôle principal',
      them: ['IDE agentique, CLI et application web qui rédigent des spécifications et mettent en œuvre les tâches'],
      us: [{ s: 'Format de spécification ouvert + CLI' }],
    },
    {
      cap: 'Fichiers de spécification',
      them: [{ c: 'requirements.md' }, ' (ou ', { c: 'bugfix.md' }, '), ', { c: 'design.md' }, ', ', { c: 'tasks.md' }],
      us: [{ s: 'Une arborescence spec/' }, ' en Markdown + YAML'],
    },
    {
      cap: 'Syntaxe des exigences',
      them: ['Motif EARS : WHEN … THE SYSTEM SHALL …'],
      us: [
        { s: 'Identifiants d’exigences' },
        ' (',
        { c: 'REQ: slug' },
        ') et critères d’acceptation ',
        { a: 'Étant donné/Quand/Alors', href: '/acceptance-criteria-specification' },
      ],
    },
    {
      cap: 'Vérifier la spécification',
      them: ['Analyze Requirements dans l’IDE et le CLI. Tests basés sur les propriétés dans l’IDE. Non décrit comme un linter de format pour votre propre CI.'],
      us: [
        { s: 'specscore spec lint' },
        ' dans la CI. ',
        { c: '/score' },
        ' est une note d’IA distincte et manuelle.',
      ],
    },
    {
      cap: 'Où cela s’exécute',
      them: ['Kiro IDE, Kiro CLI, Kiro web. Certaines vérifications n’existent que dans l’IDE.'],
      us: [{ s: 'N’importe quel dépôt' }, ' — un binaire Go, sans compte Kiro'],
    },
    {
      cap: 'Licence',
      them: [
        'La ',
        { a: 'licence Kiro', href: 'https://kiro.dev/license/', kind: 'them' },
        ' dit que l’IDE et le CLI sont de l’AWS Content sous l’AWS Customer Agreement. Kiro Crew est un ',
        { a: 'dépôt public', href: 'https://github.com/kirodotdev/KiroCrew', kind: 'them' },
        ' distinct.',
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
        'Un palier gratuit et des offres payantes. Les chiffres bougent — voir les ',
        { a: 'tarifs Kiro', href: 'https://kiro.dev/pricing/', kind: 'them' },
        ', lus le 30 octobre 2026.',
      ],
      us: [{ s: 'Sans frais' }, ' pour le format ni pour le CLI'],
    },
  ],
  diffs: [
    {
      title: 'Le format fait échouer la CI de lui-même',
      terminal: true,
      body: [
        'L’analyse de Kiro s’exécute dans Kiro. La vérification de SpecScore est une commande. Le ',
        { a: 'flux dogfood', href: dogfood, kind: 'us' },
        ' de ce dépôt exécute ',
        { c: 'specscore spec lint' },
        ' sur chaque pull request et sur main. Une spécification cassée fait échouer l’exécution comme le ferait un test cassé. La skill ',
        { a: '/score', href: score, kind: 'us' },
        ' note le libellé avec des relecteurs d’IA ; cette passe est manuelle, et le flux ci-dessus ne l’exécute pas.',
      ],
    },
    {
      title: 'La spécification n’est pas liée à un seul IDE',
      body: [
        'Les Kiro specs sont du Markdown, vous pouvez donc les lire sans le produit. Le flux qui les crée et les exécute est celui de Kiro. Une arborescence SpecScore, ce sont les mêmes fichiers pour Claude Code, Cursor, Copilot ou aucun agent — le CLI n’appelle pas de modèle pour linter.',
      ],
    },
    {
      title: 'Les exigences gardent un identifiant',
      body: [
        'La documentation de Kiro décrit la traçabilité comme le suivi d’une exigence à travers l’implémentation. Elle ne décrit pas d’identifiant stable qui survive à une réécriture. SpecScore désigne une exigence par ',
        { c: 'REQ: slug' },
        ' et un critère d’acceptation par son propre identifiant.',
      ],
    },
    {
      title: 'EARS et Étant donné/Quand/Alors répondent à des questions différentes',
      body: [
        'EARS, tel que Kiro le documente, est une phrase de comportement du système. Les critères d’acceptation SpecScore sont des scénarios Étant donné/Quand/Alors liés à un identifiant d’exigence. Vous pouvez écrire une ligne EARS dans la prose et garder quand même le scénario dans le fichier SpecScore que le linter vérifie.',
      ],
    },
  ],
  whenThemTitle: 'Choisissez Kiro quand…',
  whenThem: [
    ['Vous voulez un IDE agentique AWS qui rédige exigences, conception et tâches à partir d’un prompt, puis met les tâches en œuvre.'],
    ['Vous voulez des phrases EARS et, dans l’IDE, des tests basés sur les propriétés générés à partir d’elles.'],
    ['Votre équipe se standardise déjà sur l’éditeur, le CLI ou l’application web de Kiro.'],
  ],
  whenUs: [
    ['La spécification doit rester valide dans la CI après la fin de la session de l’agent, dans un dépôt qui n’exige pas Kiro.'],
    ['Vous avez besoin d’identifiants d’exigences, d’un statut de cycle de vie et d’un résultat de lint déterministe.'],
    ['Vous voulez le format ', { a: 'à code source ouvert', href: repo, kind: 'us' }, ' et un vérificateur qui soit un seul binaire.'],
  ],
  bridgeTitle: 'Kiro peut rédiger. SpecScore peut servir de barrière.',
  bridge: [
    [
      'Rien ici ne remplace l’éditeur de Kiro. Si Kiro est l’endroit où l’équipe écrit le prompt, laissez-le rédiger. Si la spécification doit survivre comme fichier relu, écrivez ce contrat dans SpecScore et laissez ',
      { c: 'specscore spec lint' },
      ' faire échouer la pull request quand la structure casse. Les deux fichiers peuvent cohabiter dans le même dépôt.',
    ],
    [
      'Choisissez Kiro pour la session. Choisissez SpecScore pour l’artefact qu’une exécution de CI peut refuser.',
    ],
  ],
  sources: [
    { href: 'https://kiro.dev/docs/specs/', label: 'Documentation Kiro — Specs' },
    { href: 'https://kiro.dev/docs/specs/feature-specs/', label: 'Documentation Kiro — spécifications de fonctionnalité et EARS' },
    { href: 'https://kiro.dev/about/', label: 'Kiro — À propos' },
    { href: 'https://kiro.dev/license/', label: 'Kiro — Licence' },
    { href: 'https://kiro.dev/pricing/', label: 'Kiro — Tarifs' },
    { href: dogfood, label: 'specscore/specscore — flux CI dogfood' },
    { href: score, label: 'specstudio-skills — skill /score' },
    { href: license, label: 'specscore/specscore — CC BY 4.0' },
    { href: cliLicense, label: 'specscore/specscore-cli — Apache-2.0' },
  ],
};

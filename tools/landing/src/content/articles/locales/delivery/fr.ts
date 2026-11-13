import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Votre projet est spécifié. Que terminerez-vous cette semaine ?',
  description: 'Transformez une spécification en engagement hebdomadaire : choisissez un résultat utilisateur, réservez du temps et examinez les preuves.',
  promoTitle: 'Définissez la réussite. Puis faites-lui une place.',
  promoBody: 'SpecScore définit ce que signifie « terminé ». Un engagement hebdomadaire aide à choisir la suite. Reliez les deux par une courte revue des résultats.',
  readArticle: 'Choisir votre prochain résultat terminé', explore: 'Découvrir CommittedMe (en anglais)', breadcrumb: 'Articles',
  relatedTitle: 'Rendre le résultat vérifiable', relatedLink: 'Écrire des critères d’acceptation vérifiables',
  intro: 'Une spécification peut être complète alors que le projet n’avance pas. Les exigences sont claires, l’agent a un plan et la liste des tâches s’allonge. Il manque peut-être une décision plus petite : quel résultat utile terminerez-vous cette semaine, et que laisserez-vous de côté pour y parvenir ? Cette revue se pratique avec un collègue, un mentor ou un carnet.',
  sections: [
    { title: 'Choisissez un résultat utilisateur, pas un tas de tâches', paragraphs: [
      'Partez d’un critère d’acceptation et préparez une courte démonstration. Pour un import CSV, « implémenter l’analyseur » décrit du travail. « Une personne importe un fichier valide, voit les données et obtient une erreur utile pour une ligne invalide » décrit un résultat vérifiable. Gardez le cas d’erreur : le supprimer pour respecter une date modifie votre engagement.',
      'SpecScore organise exigences et critères d’acceptation dans des fichiers lisibles par votre équipe et vos agents. Référencez-les dans la note hebdomadaire. La spécification reste la définition du comportement correct ; la note en choisit une partie réalisable. Inutile de recopier la spécification ou d’ajouter un outil de gestion de projet.'
    ] },
    { title: 'Prévoyez selon votre véritable agenda', paragraphs: [
      'Notez vos plages de travail concentré réellement disponibles, revue et intégration comprises. Deux soirées ne représentent pas cinq journées. Réservez du temps pour tester le parcours complet et résoudre un imprévu. Si le résultat ne tient pas, choisissez un parcours cohérent plus petit avant de commencer.',
      'Listez les dépendances hors de votre contrôle. « En attente d’un accès à la production » exige un responsable et une échéance de décision. Si l’accès manque encore mercredi, décidez si une démonstration locale est utile. Nommez honnêtement le résultat : une démo locale ne prouve pas que la production est prête. Ne redéfinissez pas discrètement la réussite vendredi.'
    ] },
    { title: 'Cadrez le travail des agents ; gardez la décision', paragraphs: [
      'Un agent peut produire plusieurs implémentations pendant que vous cherchez encore le problème important. Achever davantage de sous-tâches peut donc laisser l’objectif intact. Donnez à chaque tâche un critère précis, un périmètre autorisé et des preuves à rapporter. Une personne doit rester responsable de l’acceptation du parcours utilisateur complet.',
      'Lorsqu’une idée apparaît, notez-la sans la lancer automatiquement. Demandez quel engagement elle remplacerait. Vous pouvez essayer de ne laisser qu’un résultat à la fois en attente de votre revue finale. C’est une expérience de concentration, pas une règle universelle ; adaptez-la si elle ralentit le travail utile.'
    ] },
    { title: 'Examinez les preuves avant le récit', paragraphs: [
      'Pendant la revue, ouvrez d’abord le résultat réel : l’import qui fonctionne, le test d’entrée invalide ou la documentation publiée. Suivez le même parcours qu’un utilisateur, puis comparez-le au critère choisi. Le nombre de commits, les heures et les comptes rendus assurés des agents donnent du contexte, pas une preuve d’acceptation.',
      'Distinguez ce qui est implémenté, testé et utilisable dans l’environnement prévu. Demandez à la personne qui relit de trouver une façon de faire échouer le résultat. Ne partagez que le nécessaire : un exemple synthétique ou une démonstration expurgée suffit souvent. Rendre compte de ses engagements ne nécessite ni données clients, ni secrets, ni dépôt privé.'
    ] },
    { title: 'Un engagement manqué appelle une nouvelle décision', paragraphs: [
      'Si la démonstration échoue, écrivez l’explication utile la plus courte : dépendance inconnue, périmètre excessif, temps interrompu ou hypothèse erronée. Ne transformez pas une mauvaise estimation en jugement sur votre caractère. Choisissez une réponse concrète : réduire la prochaine étape, résoudre la dépendance, changer d’approche ou arrêter volontairement le projet.',
      'Ne reportez pas le même engagement inchangé par habitude. Convenez du prochain résultat observable et de la date de revue. Après quelques cycles, comparez estimations et résultats terminés. Le suivi sert à mieux décider, pas à protéger une série de réussites.'
    ] }
  ],
  reviewTitle: 'Une revue hebdomadaire en cinq lignes',
  reviewLines: ['Résultat : que pourra faire un utilisateur à la date de revue ?', 'Preuve : quel critère et quelle démonstration le confirmeront ?', 'Temps : quand vais-je construire, tester et relire ?', 'Limite : que vais-je reporter, et quelle dépendance exige une décision ?', 'Revue : qui examinera le résultat, quand, et quelle décision suivra ?'],
  ctaTitle: 'Donnez un regard humain à vos décisions',
  ctaBody: 'Utilisez cette note avec une personne qui vous demandera ce qui s’est passé et vous aidera à examiner le prochain choix. CommittedMe se concentre sur le mentorat humain et le suivi des engagements. Sa page pour développeurs et fondateurs présente cette approche. Gardez la spécification dans votre dépôt et apportez un objectif que vous pouvez discuter sans dévoiler de travail confidentiel.',
  mentorBody: "Vous enseignez déjà le développement sur YouTube, TikTok, Instagram ou un blog ? Expliquer des compromis et des tests peut révéler vos propres hypothèses. Les questions des autres peuvent vous aider à continuer d’apprendre tout en les faisant progresser. Si cet échange vous intéresse, découvrez le rôle de mentor.",
  mentorLink: "Découvrir le rôle de mentor (en anglais)",
  disclosure: 'CommittedMe est un autre produit de notre écosystème. Cet article décrit une pratique de revue ; il ne suppose aucune intégration avec SpecScore.'
};

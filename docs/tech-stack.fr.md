# Les technologies de SpecScore

Une pile technologique réunit les outils qui servent à construire et exploiter un produit. SpecScore est un format ouvert Markdown et YAML pour les spécifications logicielles ; ce site les rend accessibles aux personnes et aux outils.

## Ce site web

Un petit générateur Node.js produit la documentation en HTML et une version Markdown aux octets stables pour chaque page. Astro construit la page d’accueil et ses traductions. Les ressources statiques sont servies par Cloudflare Workers. Le générateur maison laisse le Markdown brut accessible aux agents et aux outils en ligne de commande.

## Le produit

Le [format SpecScore](https://github.com/specscore/specscore) conserve fonctions, exigences, plans et critères d’acceptation dans des fichiers versionnés ; sa spécification et sa documentation sont sous [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). La [CLI de référence](https://github.com/specscore/specscore-cli), distincte, vérifie et parcourt ces fichiers sous [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Nos outils ici

Nous utilisons la CLI SpecScore pour vérifier l’arbre de spécifications de ce dépôt. Le générateur du site sert les mêmes sources Markdown en HTML et en fichiers bruts, pour les lecteurs comme pour les agents.

## Projets liés

[Synchestra](https://synchestra.io/) utilise le format pour coordonner des agents. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) et [CodeGrapher](https://codegrapher.dev/) sont des projets liés.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

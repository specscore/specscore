# Le tecnologie dietro SpecScore

Uno stack tecnologico è l’insieme degli strumenti usati per costruire e gestire un prodotto. SpecScore è un formato aperto Markdown e YAML per le specifiche software; questo sito le rende leggibili da persone e strumenti.

## Questo sito

Un piccolo generatore Node.js produce la documentazione in HTML e una copia Markdown dai byte stabili per ogni pagina. Astro costruisce la home page e le sue traduzioni. Le risorse statiche sono servite da Cloudflare Workers. Il generatore mantiene il Markdown originale accessibile ad agenti e strumenti da riga di comando.

## Il prodotto

Il [formato SpecScore](https://github.com/specscore/specscore) conserva funzionalità, requisiti, piani e criteri di accettazione come file versionati; specifica e documentazione usano [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). La [CLI di riferimento](https://github.com/specscore/specscore-cli), separata, controlla e naviga quei file con licenza [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## I nostri strumenti qui

Usiamo la CLI SpecScore per controllare l’albero delle specifiche di questo repository. Il generatore del sito serve lo stesso Markdown come HTML e come file originale, utile sia ai lettori sia agli agenti.

## Progetti correlati

[Synchestra](https://synchestra.io/) usa il formato per coordinare le attività degli agenti. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) e [CodeGrapher](https://codegrapher.dev/) sono progetti correlati.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

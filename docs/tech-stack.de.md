# Die Technik hinter SpecScore

Ein Tech-Stack ist die Sammlung von Werkzeugen, mit denen ein Produkt gebaut und betrieben wird. SpecScore ist ein offenes Markdown- und YAML-Format für Software-Spezifikationen; diese Website macht sie für Menschen und Werkzeuge zugänglich.

## Diese Website

Ein kleiner Node.js-Generator erstellt aus der Dokumentation HTML und eine bytegleiche Markdown-Datei für jede Seite. Astro baut die Startseite und ihre Übersetzungen. Cloudflare Workers stellt die statischen Dateien bereit. Der eigene Generator hält das ursprüngliche Markdown für Agenten und Kommandozeilenwerkzeuge direkt erreichbar.

## Das Produkt

Das [SpecScore-Format](https://github.com/specscore/specscore) speichert Features, Anforderungen, Pläne und Akzeptanzkriterien als versionierte Dateien; Spezifikation und Dokumentation stehen unter [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). Die separate [Referenz-CLI](https://github.com/specscore/specscore-cli) prüft und durchsucht diese Dateien unter [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Unsere Werkzeuge hier

Wir prüfen den Spezifikationsbaum dieses Repositorys mit der SpecScore-CLI. Der Website-Generator stellt dieselben Markdown-Quellen als HTML und als Rohdateien bereit, damit sowohl Leser als auch Agenten damit arbeiten können.

## Verwandte Projekte

[Synchestra](https://synchestra.io/) nutzt das Format zur Koordination von Agenten. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) und [CodeGrapher](https://codegrapher.dev/) gehören zum verwandten Ökosystem.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

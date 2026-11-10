# Технологии SpecScore

Технологический стек — это набор инструментов, с помощью которых создают и запускают продукт. SpecScore — открытый формат Markdown и YAML для спецификаций ПО; этот сайт делает их доступными людям и инструментам.

## Этот сайт

Небольшой генератор на Node.js выпускает документацию в HTML и побайтово стабильную копию Markdown для каждой страницы. Astro собирает главную страницу и её переводы. Статические файлы обслуживает Cloudflare Workers. Собственный генератор оставляет исходный Markdown доступным агентам и утилитам командной строки.

## Продукт

[Формат SpecScore](https://github.com/specscore/specscore) хранит функции, требования, планы и критерии приёмки в версионируемых файлах; спецификация и документация распространяются по [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). Отдельная [эталонная CLI](https://github.com/specscore/specscore-cli) проверяет и просматривает эти файлы по лицензии [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Наши инструменты здесь

Мы используем CLI SpecScore для проверки дерева спецификаций этого репозитория. Генератор сайта отдаёт тот же Markdown как HTML и как исходные файлы — для читателей и агентов.

## Связанные проекты

[Synchestra](https://synchestra.io/) использует формат для координации задач агентов. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) и [CodeGrapher](https://codegrapher.dev/) — связанные проекты.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

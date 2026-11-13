# Технології SpecScore

Технологічний стек — це набір інструментів для створення й роботи продукту. SpecScore — відкритий формат Markdown і YAML для специфікацій програмного забезпечення; цей сайт робить їх доступними людям та інструментам.

## Цей сайт

Невеликий генератор на Node.js створює HTML-документацію та побайтово стабільну копію Markdown для кожної сторінки. Astro збирає головну сторінку та її переклади. Статичні файли обслуговує Cloudflare Workers. Власний генератор залишає вихідний Markdown доступним агентам і засобам командного рядка.

## Продукт

[Формат SpecScore](https://github.com/specscore/specscore) зберігає функції, вимоги, плани та критерії прийняття у версійованих файлах; специфікація й документація мають ліцензію [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). Окремий [еталонний CLI](https://github.com/specscore/specscore-cli) перевіряє й переглядає ці файли за ліцензією [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Наші інструменти тут

Ми використовуємо CLI SpecScore для перевірки дерева специфікацій цього репозиторію. Генератор сайту віддає той самий Markdown як HTML і як вихідні файли — для читачів та агентів.

## Пов’язані проєкти

[Synchestra](https://synchestra.io/) використовує формат для координації завдань агентів. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) і [CodeGrapher](https://codegrapher.dev/) — пов’язані проєкти.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

# The technology behind SpecScore

A tech stack is the set of tools used to build and run a product. SpecScore is an open Markdown and YAML format for software specifications, with a website that makes those specifications readable to people and tools.

## This website

A small Node.js generator renders the documentation as HTML and publishes a byte-stable Markdown twin for each page. Astro builds the homepage and its localized landing pages. Cloudflare Workers static assets serve the assembled site. The custom generator keeps raw Markdown directly available to agents and command-line tools.

## The product

The [SpecScore format](https://github.com/specscore/specscore) stores features, requirements, plans, and acceptance criteria as versioned files; its specification and documentation use [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). The separate [reference CLI](https://github.com/specscore/specscore-cli) lints and navigates those files and uses [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Our tools used here

We use the SpecScore CLI on this repository to check its own specification tree. The website generator serves the same Markdown source as HTML and as raw files, so the format is useful both to readers and to the agents working with it.

## Related projects

[Synchestra](https://synchestra.io/) uses the format to coordinate agent tasks. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/), and [CodeGrapher](https://codegrapher.dev/) are related projects in this ecosystem.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

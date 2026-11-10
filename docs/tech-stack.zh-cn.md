# SpecScore 的技术栈

技术栈是构建和运行产品所用工具的集合。SpecScore 是用于软件规格的开放 Markdown 和 YAML 格式；本站将这些规格以便于人和工具阅读的方式发布。

## 这个网站

一个小型 Node.js 生成器为每页生成 HTML 和字节稳定的 Markdown 副本。Astro 构建首页及其多语言版本，Cloudflare Workers 静态资源服务负责发布。自定义生成器让代理和命令行工具能够直接读取原始 Markdown。

## 产品

[SpecScore 格式](https://github.com/specscore/specscore)把功能、需求、计划和验收标准保存在可版本化的文件中；规格与文档使用 [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE) 许可。独立的[参考 CLI](https://github.com/specscore/specscore-cli)负责检查和浏览这些文件，使用 [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE) 许可。

## 这里使用的自有工具

我们使用 SpecScore CLI 检查这个仓库自身的规格目录。网站生成器同时提供 HTML 和原始 Markdown，让读者与代理都能使用同一份内容。

## 相关项目

[Synchestra](https://synchestra.io/) 使用该格式协调代理任务。[DataTug](https://datatug.app/)、[MeaningGraph](https://meaninggraph.io/) 和 [CodeGrapher](https://codegrapher.dev/) 是相关项目。

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

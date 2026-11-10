# SpecScore を支える技術

技術スタックとは、製品の開発と運用に使うツールの組み合わせです。SpecScore はソフトウェア仕様を記述するためのオープンな Markdown と YAML の形式で、このサイトは仕様を人にもツールにも読める形で公開します。

## このウェブサイト

小さな Node.js ジェネレーターが文書の HTML と、各ページのバイト列が安定した Markdown 版を作ります。Astro はトップページと翻訳版をビルドし、Cloudflare Workers の静的アセットがサイトを配信します。独自のジェネレーターにより、エージェントやコマンドラインツールは元の Markdown に直接アクセスできます。

## 製品

[SpecScore 形式](https://github.com/specscore/specscore)は機能、要件、計画、受け入れ基準をバージョン管理できるファイルに保存します。仕様と文書は [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE) です。別の[公式 CLI](https://github.com/specscore/specscore-cli)はそれらのファイルを検証・参照し、[Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE) で公開されています。

## ここで使う自社ツール

このリポジトリの仕様ツリーは SpecScore CLI で検証しています。サイトのジェネレーターは同じ Markdown ソースを HTML と元のファイルとして配信し、読者とエージェントの双方が利用できます。

## 関連プロジェクト

[Synchestra](https://synchestra.io/) はこの形式を使ってエージェントのタスクを調整します。[DataTug](https://datatug.app/)、[MeaningGraph](https://meaninggraph.io/)、[CodeGrapher](https://codegrapher.dev/) も関連プロジェクトです。

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

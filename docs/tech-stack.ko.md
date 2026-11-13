# SpecScore를 만드는 기술

기술 스택은 제품을 만들고 운영하는 데 쓰는 도구의 모음입니다. SpecScore는 소프트웨어 명세를 위한 개방형 Markdown 및 YAML 형식이며, 이 사이트는 사람과 도구가 명세를 읽을 수 있도록 제공합니다.

## 이 웹사이트

작은 Node.js 생성기가 문서를 HTML과 바이트가 안정적인 Markdown 원본으로 함께 만듭니다. Astro는 첫 화면과 번역 페이지를 빌드하고 Cloudflare Workers의 정적 자산 서비스가 사이트를 제공합니다. 자체 생성기 덕분에 에이전트와 명령줄 도구가 원본 Markdown에 바로 접근할 수 있습니다.

## 제품

[SpecScore 형식](https://github.com/specscore/specscore)은 기능, 요구 사항, 계획, 인수 기준을 버전 관리되는 파일에 저장합니다. 명세와 문서는 [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE)이며, 별도의 [참조 CLI](https://github.com/specscore/specscore-cli)는 파일을 검사하고 탐색하며 [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE)으로 공개됩니다.

## 여기서 쓰는 자체 도구

이 저장소의 명세 트리는 SpecScore CLI로 검사합니다. 사이트 생성기는 같은 Markdown 소스를 HTML과 원본 파일로 제공하므로 독자와 에이전트가 모두 활용할 수 있습니다.

## 관련 프로젝트

[Synchestra](https://synchestra.io/)는 이 형식으로 에이전트 작업을 조율합니다. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/), [CodeGrapher](https://codegrapher.dev/)도 관련 프로젝트입니다.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

# SpecScore 的技術架構

技術架構是建置與運作產品所用工具的組合。SpecScore 是用於軟體規格的開放 Markdown 與 YAML 格式；本站以方便人與工具閱讀的形式發布這些規格。

## 這個網站

小型 Node.js 產生器為每個頁面建立 HTML 與位元組穩定的 Markdown 副本。Astro 建置首頁及其多語版本，Cloudflare Workers 靜態資源提供服務。自訂產生器讓代理與命令列工具能直接讀取原始 Markdown。

## 產品

[SpecScore 格式](https://github.com/specscore/specscore)將功能、需求、計畫與驗收標準儲存在可版本管理的檔案中；規格和文件使用 [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE) 授權。獨立的[參考 CLI](https://github.com/specscore/specscore-cli)檢查並瀏覽這些檔案，使用 [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE) 授權。

## 這裡使用的自家工具

我們使用 SpecScore CLI 檢查此儲存庫自身的規格目錄。網站產生器同時提供 HTML 和原始 Markdown，讓讀者與代理共用相同內容。

## 相關專案

[Synchestra](https://synchestra.io/) 使用此格式協調代理任務。[DataTug](https://datatug.app/)、[MeaningGraph](https://meaninggraph.io/) 和 [CodeGrapher](https://codegrapher.dev/) 是相關專案。

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

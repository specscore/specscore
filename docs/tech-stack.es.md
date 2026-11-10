# La tecnología detrás de SpecScore

Una pila tecnológica es el conjunto de herramientas con que se construye y ejecuta un producto. SpecScore es un formato abierto de Markdown y YAML para especificaciones de software, con un sitio que las presenta a personas y herramientas.

## Este sitio web

Un generador pequeño en Node.js publica la documentación en HTML junto con una copia Markdown de bytes estables para cada página. Astro construye la página principal y sus versiones localizadas. Los recursos estáticos de Cloudflare Workers sirven el sitio. El generador propio mantiene el Markdown disponible directamente para agentes y herramientas de línea de comandos.

## El producto

El [formato SpecScore](https://github.com/specscore/specscore) guarda funciones, requisitos, planes y criterios de aceptación como archivos versionados; sus especificaciones y documentación usan [CC BY 4.0](https://github.com/specscore/specscore/blob/main/LICENSE). La [CLI de referencia](https://github.com/specscore/specscore-cli) valida y recorre esos archivos y usa [Apache-2.0](https://github.com/specscore/specscore-cli/blob/main/LICENSE).

## Nuestras herramientas aquí

Usamos la CLI de SpecScore para comprobar el propio árbol de especificaciones de este repositorio. El generador sirve el mismo Markdown como HTML y como archivo original, útil tanto para lectores como para agentes.

## Proyectos relacionados

[Synchestra](https://synchestra.io/) usa el formato para coordinar tareas de agentes. [DataTug](https://datatug.app/), [MeaningGraph](https://meaninggraph.io/) y [CodeGrapher](https://codegrapher.dev/) son proyectos relacionados.

[English](https://specscore.md/about/tech-stack/) · [Español](https://specscore.md/es/about/tech-stack/) · [Deutsch](https://specscore.md/de/about/tech-stack/) · [Français](https://specscore.md/fr/about/tech-stack/) · [Italiano](https://specscore.md/it/about/tech-stack/) · [Polski](https://specscore.md/pl/about/tech-stack/) · [Português](https://specscore.md/pt-br/about/tech-stack/) · [Русский](https://specscore.md/ru/about/tech-stack/) · [Türkçe](https://specscore.md/tr/about/tech-stack/) · [Українська](https://specscore.md/uk/about/tech-stack/) · [日本語](https://specscore.md/ja/about/tech-stack/) · [简体中文](https://specscore.md/zh-cn/about/tech-stack/) · [繁體中文](https://specscore.md/zh-tw/about/tech-stack/) · [한국어](https://specscore.md/ko/about/tech-stack/)

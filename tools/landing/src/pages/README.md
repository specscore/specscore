# Landing — pages

Astro file-based routes. One file per route.

| File | Route | Purpose |
|---|---|---|
| `index.astro` | `/` | The SpecScore homepage. Imports all section components in IA order and renders them inside `BaseLayout`. |
| `articles/index.astro` | `/articles/` | Index of informational articles. |
| `articles/acceptance-criteria/index.astro` | `/articles/acceptance-criteria/` | How to write acceptance criteria an AI agent can verify. |
| `articles/ears-requirements/index.astro` | `/articles/ears-requirements/` | EARS requirements syntax. |

Locale copies of those routes live in the locale directories (`es/`, `de/`, and the rest). Product pages, comparisons, and the spec-driven development guide are Astro routes in this tree as well.

The docs site (`tools/site-generator/`) still serves `/docs/`, the specification pages, and the blog.

## Outstanding Questions

None at this time.

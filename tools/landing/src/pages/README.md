# Landing — pages

Astro file-based routes. One file per route.

| File | Route | Purpose |
|---|---|---|
| `index.astro` | `/` | The SpecScore homepage. Imports all section components in IA order and renders them inside `BaseLayout`. |

This sub-project owns only the root route (`/`). Every other path on `specscore.md` is served by the docs site (`tools/site-generator/`).

## Outstanding Questions

None at this time.

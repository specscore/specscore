# Landing — build scripts

Node scripts run by the Astro config. They are not shipped to the browser.

| File | Purpose |
|---|---|
| `emit-compare-md.ts` | Writes the raw Markdown companion for each comparison page into the Astro output directory, and can print one file for the dev server. |
| `emit-roundup-md.ts` | Writes the raw Markdown companion for the tools roundup. |
| `emit-articles-md.ts` | Writes the raw Markdown companion for `/articles/`, `/articles/acceptance-criteria/`, and `/articles/ears-requirements/`. |

`check-delivery-campaign.mjs` verifies the generated weekly-delivery journey in every supported locale after `pnpm build`: homepage and index links, referral parameters, Markdown parity, canonical/OG metadata, structured data, sitemap, and reciprocal language alternates.

## Outstanding Questions

None at this time.

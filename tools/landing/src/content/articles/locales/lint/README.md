# Lint article copy

One module per locale for `/articles/lint-specs-in-ci/`. The parent locale module imports it and passes it through `ArticleLocale`. English facts stay in `en.ts`. Format samples, rule ids, and the workflow excerpt stay in `facts.ts`, in English, because they are the CLI’s text.

| File | Locale |
|---|---|
| `es.ts` | Spanish |
| `de.ts` | German |
| `fr.ts` | French |
| `it.ts` | Italian |
| `pl.ts` | Polish |
| `pt-br.ts` | Brazilian Portuguese |
| `ru.ts` | Russian |
| `tr.ts` | Turkish |
| `uk.ts` | Ukrainian |
| `ja.ts` | Japanese |
| `zh-cn.ts` | Simplified Chinese |
| `zh-tw.ts` | Traditional Chinese |
| `ko.ts` | Korean |

## Outstanding Questions

None at this time.

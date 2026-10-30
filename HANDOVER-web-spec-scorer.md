# Handover: web spec scorer (shelved)

This branch keeps an unfinished in-browser spec checker. It is not wired into the site, and it should not be opened as a pull request.

## Why it was shelved

People already have AI agents. A website that scores a paste is the wrong product. SpecScore should ship a free AI skill that does this scoring and restructuring inside the agent the person already uses, instead of a web tool.

## Plan

A free, no-signup page on the Astro site (`tools/landing`), published with the rest of specscore.md (Cloudflare). Chosen slug: `/check/`. `/score` was rejected because that name is already the AI `/score` skill.

The page would accept any spec, not only SpecScore:

- Auto-detect the format and say what was detected. The user can override it.
- Formats: OpenSpec (proposal.md, specs/ deltas, ADDED/MODIFIED/REMOVED/RENAMED Requirements, Scenario blocks), GitHub Spec Kit (spec.md / plan.md / tasks.md, constitution), Kiro (requirements.md in EARS, design.md, tasks.md), BMAD (PRD / architecture / stories under `_bmad-output`), Task Master (`.taskmaster/tasks/tasks.json` and a PRD), EARS requirements, generic PRD / RFC / user stories, plain Markdown, and SpecScore.
- Score every format on the same generic quality rubric (scope and goals, testable acceptance criteria, unambiguous requirements, defined terms, non-functional requirements, edge cases, traceability, size and structure).
- Where the text is SpecScore, also run the real `specscore spec lint` rules and label those findings as SpecScore rules, separate from the generic heuristics and from format-convention checks.
- “Improve it with SpecScore”: map sections into a SpecScore tree (including splitting a long doc into several files), emit a copyable/downloadable skeleton, and show a lint result only when that skeleton was actually passed through the real linter.
- Client-side only. No paid LLM. Privacy line: runs in the browser, nothing uploaded.
- Share link and badge carry the format and the counts, not the spec text.
- SEO, FAQ + FAQPage schema, WebApplication/SoftwareApplication JSON-LD (`isAccessibleForFree`, price 0), sitemap, `llms.txt`, nav and home CTA, links from the spec-driven development guide and the tools roundup. UI strings in all 14 locales.
- Lazy-load the lint engine.

## What has been done

The lint engine is the real CLI package, not a rewrite of the rules.

- `tools/webcheck/` is a small Go program. `main.go` calls `github.com/specscore/specscore-cli/pkg/lint` at **v0.39.1**, the same pin as `SPECSCORE_VERSION` in `.github/workflows/dogfood.yml`.
- `tools/webcheck/build.sh` cross-compiles that program with `GOOS=wasip1 GOARCH=wasm` to `tools/landing/public/check/specscore-lint.wasm` (about 8.7 MB). That wasm file is gitignored by `tools/landing/.gitignore` (`public/*`). Rebuild it with `sh tools/webcheck/build.sh` (Go 1.27+).
- `tools/landing/package.json` depends on `@bjorn3/browser_wasi_shim` `^0.4.2`.
- `tools/landing/src/check/browser-lint.mjs` loads the wasm, builds an in-memory filesystem, and runs lint. Pass `--catalog` mode via `runLintWasm(wasm, [], { catalog: true })` to dump the rule registry. WASI debug logging is off (`{ debug: false }`); the shim turns logging on if that option is omitted.
- `detect.mjs` scores format signals. Conventions were taken from public docs and repos (OpenSpec README, Spec Kit templates, Kiro feature-spec page, BMAD planning-path page, Task Master README and `tasks.json` shape, EARS WHEN/IF/WHILE/WHERE … SHALL).
- `quality.mjs` is the eight-check generic rubric. Those ids are `quality/*` and `origin: 'generic'`. They are not SpecScore rules.
- `conventions.mjs` adds format checks (`origin: 'convention'`). They do not change the numeric quality score.
- `restructure.mjs` builds `spec/features/<slug>/README.md`, `spec/features/README.md`, and `spec/README.md` from the paste. Acceptance criteria are converted from OpenSpec scenarios, EARS, Given/When/Then, `FR-` lines, user stories, and Task Master `testStrategy`. Vague lines are quoted and listed under Open Questions. `placeForLint` drops a SpecScore paste into the path the linter expects and can hide findings on the generated index files.
- `score.mjs` ties detection, quality, conventions, the skeleton, and an optional `lint` function together.
- `examples.mjs` has a short fixture for each format, including a deliberately bad SpecScore feature and a bad OpenSpec delta.
- `share.mjs` builds a URL hash (`v`, `fmt`, `q`, `e`, `w` only) and a shields.io badge markdown string. `zip.mjs` writes an uncompressed zip of the skeleton.
- `jsonld.mjs` builds WebApplication + SoftwareApplication, FAQPage, and BreadcrumbList JSON-LD. Nothing on the site calls it yet.
- `i18n/en.mjs` is the English string catalog (217 keys, including six FAQ entries).
- Locale modules with real translations exist and are **not imported**: `es.mjs`, `de.mjs`, `fr.mjs`, `it.mjs`, `pl.mjs`, `pt-br.mjs`, `uk.mjs`, `ja.mjs`, `zh-cn.mjs`. `i18n/overlays.mjs` still `structuredClone`s English for all 13 non-English locales. `i18n.mjs` reads those clones. There is no `ru.mjs`, `tr.mjs`, `zh-tw.mjs`, or `ko.mjs`.

`tools/landing/src/check/engine.test.mjs` was run with Node’s test runner (the landing `pnpm test` script does **not** include this file yet). On the last run, these passed:

- Each example is detected as its own format.
- A vague PRD scores below the Spec Kit example on the generic rubric.
- The share hash and badge do not contain spec text.
- OpenSpec text is not failed for a missing SpecScore “Open Questions” section. A delta without SHALL/scenarios gets convention findings.
- The OpenSpec skeleton contains `### AC:` headings, `## Open Questions`, and the scenario wording, plus `spec/features/README.md`.
- The zip round-trips through Python’s `zipfile`.
- The Go module pin matches `dogfood.yml`.
- Wasm lint of the bad SpecScore fixture reports real rules `oq-section` and `ac-heading-format`, only on `features/pasted/README.md`. The catalog reports `specscore-cli` v0.39.1 and includes `oq-section`.
- Wasm lint of the generated OpenSpec skeleton returns **no failing violations**. The number is that lint result, not a guess.
- `jsonLd()` sets `isAccessibleForFree: true` and `offers.price` of `'0'`.

The test named “every locale has the English message keys” was not part of that green run. It asserts that non-English `metaTitle` differs from English. That assertion fails while `overlays.mjs` clones English.

## What has not been done

- No `/check/` route. There is no Astro page, no `CheckerPage`, and no client script that mounts the form.
- Nothing in the header, hero, spec-driven development guide, or tools roundup links to the checker.
- `llms.txt`, the sitemap, and CI are unchanged. `tools/cf-build.sh` does not build the wasm. `site-ci.yml` does not install Go.
- `package.json` `"test"` is still `node --test src/lib/*.test.mjs`.
- The 14-locale UI is not finished. Translated modules listed above are unused. Russian, Turkish, Traditional Chinese, and Korean files were never written. `overlays.mjs` still serves English everywhere.
- No browser pass. The wasm path was proven from Node tests only.
- No share-link UI, checklist button, or download button. The functions exist; the page does not.
- Long sections are named in a `rec-split` recommendation. The download is still one parent feature plus the two index files, so the tree stays lint-clean. Child feature files are not generated.
- `tools/landing/src/check/` has no `README.md`. This repo’s rule is that every directory has one, with an Open Questions section. `tools/webcheck/README.md` does.
- No pull request. Do not open one for this work.

## How to run what exists

From a machine with Go 1.27+ and the landing dependencies installed:

```sh
sh tools/webcheck/build.sh
cd tools/landing
node --test src/check/engine.test.mjs
```

Expect the locale `metaTitle` assertion to fail until `overlays.mjs` stops cloning English.

If this scoring and restructuring is picked up again, build it as an agent skill, not as `/check/`.

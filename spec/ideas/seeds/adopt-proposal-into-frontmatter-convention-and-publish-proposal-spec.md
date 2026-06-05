---
type: sidekick-seed
slug: adopt-proposal-into-frontmatter-convention-and-publish-proposal-spec
captured_at: 2026-06-05T21:08:42Z
captured_by: specstudio:verify
captured_during: spec/features/new-artefact-template-gallery/README.md
trigger: explicit
status: queued
synchestra_task: null
---
# Adopt `proposal` into the frontmatter convention's status-concept-by-type, and publish a /proposal-specification page

## Where this came up

While bringing the `/new/*` gallery templates into the Approved [`artifact-frontmatter-convention`](../../features/artifact-frontmatter-convention/README.md) shape, `proposal` was treated as **status-bearing** (it has a body `**Status:**`, so it got a `status:` frontmatter mirror) — but that's ahead of the rest of the system in two ways.

## The two gaps

1. **Not in the classification.** The convention's `status-concept-by-type` lists Idea, Feature, Plan, Task, Decision, sidekick-seed — `proposal` is absent. Recommend amending it to add `proposal`.
2. **No spec page.** There is no published `https://specscore.md/proposal-specification` (unlike the other types). The gallery template's `format:` URL is therefore pattern-derived and resolves to nothing, and `new/proposal.md` has no footer line.

## Sketch

- Amend `status-concept-by-type` to include `proposal` (status-bearing).
- Author + publish `/proposal-specification` (site-config + source) so the `format:` URL resolves and a footer can be added per `footer-format-mirror`.
- Then add the matching footer to `new/proposal.md`.

## Pushback

Is `proposal` a first-class artefact type or a CLI-internal change-request shape? If the latter, a public spec page may not be warranted — decide before publishing. Keep consistent with `issue` (has a spec page + native frontmatter `status:` but is also absent from `status-concept-by-type`).

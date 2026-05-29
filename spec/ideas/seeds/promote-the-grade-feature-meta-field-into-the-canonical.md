---
type: sidekick-seed
slug: promote-the-grade-feature-meta-field-into-the-canonical
captured_at: 2026-05-29T09:16:00Z
captured_by: user
captured_during: null
trigger: explicit
status: queued
synchestra_task: null
---
# Promote the Grade Feature meta field into the canonical SpecScore schema

Arose in `specstudio-skills` while implementing the reviewer-gates grade work: producers now record a gate's grade as a `**Grade:** <letter>` body-metadata line on the approved artifact (REQ `grade-recording`). That line is currently only *lint-tolerated* locally — it is not part of the canonical SpecScore Feature specification.

This seed proposes making `**Grade:**` a first-class, schema-blessed body-metadata field in the canonical SpecScore Feature spec (https://specscore.md/feature-specification), so grade recording is uniform across repos rather than repo-local convention. Consider: allowed values (A–F), placement (after `**Supersedes:**`), optionality (absent until first approval), and whether `specscore spec lint` should validate it.

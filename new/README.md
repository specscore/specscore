# Artifact Templates

Canonical scaffolding templates for SpecScore artifacts, published to the website at
`https://specscore.md/new/<type>.md`.

These files are the live source of truth for the `specscore … new` scaffolders: the
CLI fetches the template from the published gallery at create-time and falls back to
an embedded copy when offline. Fixing a template here ships to all users on the next
site deploy — no CLI release required. See the
[CLI Template Runtime-Fetch feature](../spec/features/cli-template-runtime-fetch/README.md)
and the [New-Artefact Template Gallery feature](../spec/features/new-artefact-template-gallery/README.md).

| Template | Scaffolded by |
|---|---|
| [idea.md](idea.md) | `specscore idea new` |
| [feature.md](feature.md) | `specscore feature new` |
| [plan.md](plan.md) | `specscore plan new` |
| [task.md](task.md) | `specscore task new` |
| [decision.md](decision.md) | decision scaffolding |
| [issue.md](issue.md) | issue scaffolding |
| [proposal.md](proposal.md) | proposal scaffolding |
| [lesson.md](lesson.md) | `specscore lesson new` |

Machine-readable contracts are published alongside the Markdown templates:

| Schema | Purpose |
|---|---|
| [lesson-occurrence.schema.json](lesson-occurrence.schema.json) | Append-only, bounded Lesson occurrence records |
| [cli-capability-delivery.schema.json](cli-capability-delivery.schema.json) | CLI runtime/help/AI-skill/test traceability manifests |

Schemas are contracts consumed by validators and other tooling; they are not
scaffold templates.

Edit templates here only in lockstep with the owning feature's spec — the template
shape is part of the artifact contract that `specscore spec lint` enforces.

## Open Questions

None at this time.

# Lessons: durable process improvement

A SpecScore Lesson records a process rule that should prevent a known class of failure. It is not an incident log and it is not a task. Start with the shortest truthful rule, record every later manifestation as an append-only occurrence, and make the rule binding only when a deterministic check proves it.

## The two levels

`spec/lessons/<slug>/README.md` is the compact canonical Lesson: the rule, process gap, recurrence tracking, and evidence required for enforcement. `occurrences/<uuid>.json` holds one bounded observation at a time. This separation keeps the rule readable and prevents concurrent reports from editing the same file.

Use `spec/lessons/README.md` to find the current rule. Counts and last-occurrence dates are derived from child JSON; do not edit them as source data.

## The enforcement ladder

- **Recorded:** a real gap and candidate lesson exist.
- **Stated:** the rule is visible in guidance.
- **Enforced:** deterministic control, verification, and stable evidence are present. Only this level binds.
- **Withdrawn** and **Superseded:** retain history without claiming the rule remains active.

## Safe occurrence context

Occurrences may record generic repository, Git, worktree, and execution context. Keep every value bounded and factual. Omit unavailable values, redact secrets and personal information, and link to durable evidence instead of copying logs, prompts, or diffs.

## Migrating older files

The older single-file form `spec/lessons/<slug>.md` is accepted only during migration. Move it to `spec/lessons/<slug>/README.md`, record its original path and revision in `Legacy Provenance`, and create occurrence JSON only for safely representable history. Never invent history to fill a recurrence count.

## Open Questions

None at this time.

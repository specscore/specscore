# Feature: Publication Policy Config

> [SpecScore.**Studio**](https://specscore.studio): | [Explore](https://specscore.studio/app/github.com/specscore/specscore/spec/features/publication-policy-config?op=explore) | [Edit](https://specscore.studio/app/github.com/specscore/specscore/spec/features/publication-policy-config?op=edit) | [Ask question](https://specscore.studio/app/github.com/specscore/specscore/spec/features/publication-policy-config?op=ask) | [Request change](https://specscore.studio/app/github.com/specscore/specscore/spec/features/publication-policy-config?op=request-change) |

**Status:** Draft
**Date:** 2026-06-01
**Owner:** alex
**Source Ideas:** —
**Supersedes:** —

## Summary

Defines durable project and user configuration for SpecScore publication policy: ordered action lists, event and command scopes, branch safety, precedence, and validation rules. This Feature owns the schema consumed by SpecStudio skills and the `specscore` CLI; it intentionally does not define conversational prompts or perform git operations.

## Problem

SpecScore projects need a standard way to express how generated or edited artifacts should be published: left unstaged, staged, committed, or pushed. Without a shared schema, each skill or tool will invent its own flags and prose, making it impossible for a user to set one preference that applies consistently across artifact lifecycle events.

The schema also needs to preserve safety. Push policy must be branch-aware, project-level branch denials must constrain personal automation preferences, and commit/push actions must be represented as explicit steps rather than overloaded booleans.

## Behavior

### Config Locations

#### REQ: project-config-location

Project-level publication policy MUST live under a top-level `publication:` key in repo-root `specscore.yaml`. The key is optional; absence means no project-level publication policy is configured.

#### REQ: user-config-location

User-level publication policy MUST use the same schema shape as project-level policy and live in the canonical SpecScore user config file. The exact path is owned by the SpecScore user-config contract; until that contract is finalized, consumers MUST treat the path as an implementation detail surfaced by the `specscore` CLI.

### Policy Shape

#### REQ: action-list

A publication policy value MUST resolve to an ordered `actions:` list. The MVP action enum is exactly:

- `stage`
- `commit`
- `push`

An omitted or empty action list means "just edit." `commit` requires `stage`; `push` requires both `stage` and `commit`. Config containing `commit` without `stage`, or `push` without both prerequisites, MUST be rejected or normalized by an explicit CLI mutation command before persistence.

#### REQ: shorthand-normalization

The schema MAY accept user-facing shorthands (`just-edit`, `stage`, `commit`, `commit-and-push`) only as CLI input conveniences. Durable config MUST be written in canonical `actions:` form so readers have one shape to parse.

#### REQ: event-policy

The `publication.events` map MAY define policies keyed by artifact lifecycle event names such as `idea.drafted`, `idea.approved`, `feature.specified`, and `feature.approved`. Event policy is the preferred durable target because it follows artifact lifecycle rather than a specific producer implementation.

#### REQ: command-policy

The `publication.commands` map MAY define command defaults and command-scoped event or milestone overrides. Command names SHOULD use the same bare command names used by other SpecScore config blocks, such as `ideate`, `specify`, `plan`, `implement`, `verify`, and `recap`.

#### REQ: branch-policy

Publication config MAY include a `push` block with `allow_branches:` and `deny_branches:` pattern lists. Patterns are git branch-name globs using `*` as a segment wildcard. A branch matching any deny pattern MUST be refused even if it also matches an allow pattern.

### Precedence and Safety

#### REQ: config-precedence

When user and project config both exist, project config is more specific for project-scoped defaults, while user config supplies personal defaults. The complete effective-policy precedence across runtime scopes is owned by consuming tools, but schema validation MUST preserve all fields needed by task, session, command, event, project, and user resolution.

#### REQ: safety-constraints-monotonic

Branch denial rules are safety constraints. A user-level or session-level action list MUST NOT weaken a project-level branch denial. Consumers MUST be able to distinguish action preference from safety constraint when resolving policy.

#### REQ: unknown-fields-preserved

SpecScore tooling that reads and writes `specscore.yaml` or user config MUST preserve unknown fields under `publication:` unless a CLI command is explicitly replacing that subtree. This preserves forward compatibility for new actions and policy scopes.

## Acceptance Criteria

### AC: project-publication-block-valid (verifies REQ: project-config-location, REQ: action-list)

**Given** `specscore.yaml` contains `publication.events.idea.approved.actions: [stage, commit]`,
**When** config validation runs,
**Then** the config is accepted and the event policy can be read by consumers.

### AC: durable-config-uses-actions-list (verifies REQ: action-list, REQ: shorthand-normalization)

**Given** a user chooses the shorthand workflow `commit-and-push`,
**When** the CLI persists that preference,
**Then** the durable config stores `actions: [stage, commit, push]` rather than `commit-and-push`.

### AC: invalid-sequence-rejected (verifies REQ: action-list)

**Given** publication config contains `actions: [push]`,
**When** config validation runs,
**Then** validation fails because `push` requires `stage` and `commit`.

### AC: event-policy-supported (verifies REQ: event-policy)

**Given** project config maps `idea.drafted` to `[stage]` and `idea.approved` to `[stage, commit, push]`,
**When** a consumer resolves policy for those events,
**Then** the draft event resolves to stage-only and the approval event resolves to stage, commit, and push.

### AC: command-policy-supported (verifies REQ: command-policy)

**Given** project config defines `publication.commands.implement.events.feature.approved.actions: [stage, commit]`,
**When** a consumer resolves policy for `feature.approved` inside `implement`,
**Then** the command-scoped event policy is available to override a broader event policy.

### AC: branch-deny-wins (verifies REQ: branch-policy, REQ: safety-constraints-monotonic)

**Given** branch policy allows `feature/*` and denies `main`,
**When** a consumer checks whether push is allowed on `main`,
**Then** push is refused even if an action policy includes `push`.

### AC: unknown-publication-fields-preserved (verifies REQ: unknown-fields-preserved)

**Given** `publication:` contains an unknown future field,
**When** a SpecScore tool updates an unrelated config key,
**Then** the unknown publication field remains unchanged.

## Open Questions

- What is the canonical user config file path? This should be settled in the broader user-config contract, not invented here.
- Should branch glob syntax match gitignore-style patterns, shell globs, or a smaller custom subset? Lean: a documented small subset with `*`.
- Should project config be able to require a minimum publication behavior, such as "must commit on approval," or only constrain unsafe behavior? Lean: constrain unsafe behavior only in MVP.

---
*This document follows the https://specscore.md/feature-specification*

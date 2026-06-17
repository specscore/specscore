---
kind: entity
id: idea
singular: Idea
plural: Ideas
description: A pre-spec, lintable one-pager that captures a problem, a recommended direction, an MVP scope, and the dealbreaker assumptions.
properties:
  - name: id
    data_type: string
    description: The Idea's slug — the filename stem at `spec/ideas/<slug>.md` (or `spec/ideas/archived/<slug>.md`).
    checks:
      required: true
      min_length: 1
      max_length: 128
      pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$"
  - name: status
    data_type: string
    description: Idea lifecycle stage.
    checks:
      required: true
      enum:
        - Draft
        - In Review
        - Approved
        - Specifying
        - Specified
        - Implementing
        - Implemented
        - Rejected
        - Stale
  - name: archived
    data_type: boolean
    description: Archival flag — the orthogonal archival axis (never a status). True when the Idea is filed out of active view; the Idea retains its real terminal status.
    checks:
      required: false
  - name: archive_note
    data_type: string
    description: Optional free-form note tied to the archive action (not to a status).
    checks:
      required: false
  - name: owner
    ref: ./email.property.md
  - name: promotes_to
    data_type: array
    description: Features authored from this Idea. Managed state — populated by tooling from each Feature's `**Source Ideas:**`.
    checks:
      required: false
      items:
        data_type: ref
        checks:
          entity_ref: ../feature/feature.entity.md
format: https://specscore.md/entity-specification
---

# Entity: Idea

## Description

The Idea entity is the typed shape of a SpecScore [Idea](README.md) —
the pre-spec one-pager that answers "should we?" before a
[Feature](../feature/feature.entity.md) answers "what?".

The `owner` field reuses the sibling
[email property](email.property.md) to demonstrate property reuse from
the [Property feature](../property/README.md). The `promotes_to` field
is **managed state**: tooling derives it from each Feature's
`**Source Ideas:**` field — Idea authors MUST NOT edit it directly.

Co-located with the [idea Feature](README.md) alongside the existing
[user entity fixture](user.entity.md), which models an Idea's author.

## Properties

<!-- managed-by: specscore lint --fix -->
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | The Idea's slug — the filename stem at `spec/ideas/<slug>.md` (or `spec/ideas/archived/<slug>.md`). |
| `status` | string | yes | Idea lifecycle stage. |
| `archived` | boolean | no | Archival flag — the orthogonal archival axis (never a status). True when the Idea is filed out of active view; the Idea retains its real terminal status. |
| `archive_note` | string | no | Optional free-form note tied to the archive action (not to a status). |
| `owner` | string *(via [email](email.property.md))* | yes | An RFC 5322 email address used to identify the human or service owner of a SpecScore artifact. |
| `promotes_to` | array | no | Features authored from this Idea. Managed state — populated by tooling from each Feature's `**Source Ideas:**`. |
<!-- end-managed -->

## Referenced by

<!-- managed-by: specscore lint --fix -->
- _No references yet._
<!-- end-managed -->

---
*This document follows the https://specscore.md/entity-specification*

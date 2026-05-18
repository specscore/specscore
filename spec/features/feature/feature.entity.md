---
kind: entity
id: feature
singular: Feature
plural: Features
description: A single SpecScore feature — the directory under spec/features/ that describes one product capability.
properties:
  - name: id
    data_type: string
    description: The feature's canonical id — its path relative to spec/features/ (e.g., `billing/payments`).
    checks:
      required: true
      min_length: 1
      max_length: 128
      pattern: "^[a-z0-9]+(?:[-/][a-z0-9]+)*$"
  - name: title
    data_type: string
    description: Human-readable title rendered after the `Feature:` prefix.
    checks:
      required: true
      min_length: 1
      max_length: 120
      trim: true
  - name: status
    data_type: string
    description: Spec maturity.
    checks:
      required: true
      enum:
        - Draft
        - Under Review
        - Approved
        - Implementing
        - Stable
        - Deprecated
  - name: summary
    data_type: string
    description: One-to-three-sentence purpose statement.
    checks:
      required: true
      min_length: 1
      max_length: 1000
  - name: source_ideas
    data_type: array
    description: Ideas this Feature promotes. Many-to-many.
    checks:
      required: false
      items:
        data_type: ref
        checks:
          entity_ref: ../idea/idea.entity.md
  - name: dependencies
    data_type: array
    description: Other Features this Feature depends on.
    checks:
      required: false
      items:
        data_type: ref
        checks:
          entity_ref: ./feature.entity.md
---

# Entity: Feature

## Description

The Feature entity is the typed shape of a SpecScore [Feature](README.md) —
the directory under `spec/features/` that defines one product capability.
The `id` is the directory's path relative to `spec/features/` (e.g.
`billing/payments`); the `status` follows the Feature lifecycle defined
in the Feature spec.

A Feature is the **"what"** layer of SpecScore. It is downstream of one
or more [Idea entities](../idea/idea.entity.md) (via `source_ideas`) and
upstream of one or more [Plan entities](../plan/plan.entity.md) that
break the work into [Task entities](../task/task.entity.md).

This entity is co-located with the Feature spec it describes to test the
co-location convention from the
[Entity feature](../entity/README.md#req-entity-location).

## Properties

<!-- managed-by: specscore lint --fix -->
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | The feature's canonical id — its path relative to spec/features/ (e.g., `billing/payments`). |
| `title` | string | yes | Human-readable title rendered after the `Feature:` prefix. |
| `status` | string | yes | Spec maturity. |
| `summary` | string | yes | One-to-three-sentence purpose statement. |
| `source_ideas` | array | no | Ideas this Feature promotes. Many-to-many. |
| `dependencies` | array | no | Other Features this Feature depends on. |
<!-- end-managed -->

## Referenced by

<!-- managed-by: specscore lint --fix -->
- _No references yet._
<!-- end-managed -->

---
*This document follows the https://specscore.md/entity-specification*

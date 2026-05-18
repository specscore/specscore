---
kind: entity
id: plan
singular: Plan
plural: Plans
description: A composite task — a task with subtasks — that bridges Feature specifications to executable work.
properties:
  - name: id
    data_type: string
    description: The plan's slug — the directory name under `spec/plans/`.
    checks:
      required: true
      min_length: 1
      max_length: 128
      pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$"
  - name: status
    data_type: string
    description: Plan preparation stage. Plans do not carry execution statuses (`completed`, `failed`) — those live on tasks.
    checks:
      required: true
      enum:
        - draft
        - in_review
        - approved
  - name: features
    data_type: array
    description: Features this Plan affects.
    checks:
      required: true
      min_length: 1
      items:
        data_type: ref
        checks:
          entity_ref: ../feature/feature.entity.md
  - name: tasks
    data_type: array
    description: Subtasks that make up this Plan. Empty list means the Plan is a leaf Task.
    checks:
      required: false
      items:
        data_type: ref
        checks:
          entity_ref: ../task/task.entity.md
---

# Entity: Plan

## Description

The Plan entity is the typed shape of a SpecScore
[Plan](README.md) — the **how** layer that decomposes one or more
[Feature entities](../feature/feature.entity.md) into ordered
[Task entities](../task/task.entity.md).

A Plan is a composite Task; structurally, the two share their core
shape. The distinction is whether `tasks` is empty (leaf Task) or
non-empty (Plan). See the Plan spec's
[unified plan/task model](README.md#plan-and-task-model) for the full
recursive definition.

## Properties

<!-- managed-by: specscore lint --fix -->
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | The plan's slug — the directory name under `spec/plans/`. |
| `status` | string | yes | Plan preparation stage. Plans do not carry execution statuses (`completed`, `failed`) — those live on tasks. |
| `features` | array | yes | Features this Plan affects. |
| `tasks` | array | no | Subtasks that make up this Plan. Empty list means the Plan is a leaf Task. |
<!-- end-managed -->

## Referenced by

<!-- managed-by: specscore lint --fix -->
- _No references yet._
<!-- end-managed -->

---
*This document follows the https://specscore.md/entity-specification*

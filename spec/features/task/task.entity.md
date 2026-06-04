---
kind: entity
id: task
singular: Task
plural: Tasks
description: The atomic unit of work in SpecScore — a leaf node an agent or human picks up and completes.
properties:
  - name: id
    data_type: string
    description: The task's slug — the directory name within its enclosing Plan.
    checks:
      required: true
      min_length: 1
      max_length: 128
      pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$"
  - name: title
    data_type: string
    description: Human-readable title rendered after the `Task:` prefix.
    checks:
      required: true
      min_length: 1
      max_length: 120
      trim: true
  - name: status
    data_type: string
    description: Task lifecycle stage.
    checks:
      required: true
      enum:
        - planning
        - queued
        - in_progress
        - blocked
        - complete
        - failed
        - aborted
  - name: depends_on
    data_type: array
    description: Other Tasks that must reach `complete` before this Task may transition from `queued` to `in_progress`. Required on tasks within non-terminal plans (the value is `none` when there are no dependencies); lint enforces. Grandfathered (optional) for tasks in terminal-status plans once those statuses exist.
    checks:
      required: false
      items:
        data_type: ref
        checks:
          entity_ref: ./task.entity.md
  - name: model
    data_type: string
    description: Capability tier the Task runs on when executed in isolation — one of small, medium, large, inherit. `inherit` runs on the ambient/session model. Required on tasks within non-terminal plans; lint enforces. Grandfathered for terminal-status plans once those statuses exist.
    checks:
      required: false
      enum:
        - small
        - medium
        - large
        - inherit
  - name: model_override
    data_type: string
    description: Optional exact, opaque model identifier; when present it takes precedence over `model` for this Task. Opaque to SpecScore — consumers interpret it.
    checks:
      required: false
---

# Entity: Task

## Description

The Task entity is the typed shape of a SpecScore [Task](README.md) —
the leaf-node work item that an agent or human actually picks up.

A Task with subtasks is, by structure, a [Plan](../plan/plan.entity.md);
the same recursive shape spans specification and execution. Tasks
ultimately trace back to one or more
[Feature entities](../feature/feature.entity.md) through their enclosing
Plan's `features` list.

## Properties

<!-- managed-by: specscore lint --fix -->
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | The task's slug — the directory name within its enclosing Plan. |
| `title` | string | yes | Human-readable title rendered after the `Task:` prefix. |
| `status` | string | yes | Task lifecycle stage. |
| `depends_on` | array | no | Other Tasks that must reach `complete` before this Task may transition from `queued` to `in_progress`. Required on tasks within non-terminal plans (the value is `none` when there are no dependencies); lint enforces. Grandfathered (optional) for tasks in terminal-status plans once those statuses exist. |
| `model` | string | no | Capability tier the Task runs on when executed in isolation — one of small, medium, large, inherit. `inherit` runs on the ambient/session model. Required on tasks within non-terminal plans; lint enforces. Grandfathered for terminal-status plans once those statuses exist. |
| `model_override` | string | no | Optional exact, opaque model identifier; when present it takes precedence over `model` for this Task. Opaque to SpecScore — consumers interpret it. |
<!-- end-managed -->

## Referenced by

<!-- managed-by: specscore lint --fix -->
- _No references yet._
<!-- end-managed -->

---
*This document follows the https://specscore.md/entity-specification*

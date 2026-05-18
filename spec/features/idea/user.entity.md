---
kind: entity
id: user
singular: User
plural: Users
description: The human or service identity that owns a SpecScore artifact (the value of an Idea's, Feature's, or Plan's Owner-equivalent field).
properties:
  - name: id
    data_type: string
    description: Stable identifier. Free-form in MVP — typically a GitHub handle, an email local-part, or a service account name.
    checks:
      required: true
      min_length: 1
      max_length: 64
      pattern: "^[a-zA-Z0-9_\\-.@]+$"
  - name: email
    ref: ./email.property.md
  - name: display_name
    data_type: string
    description: Human-readable name shown in indexes and rendered docs. Falls back to `id` when absent.
    checks:
      required: false
      max_length: 80
      trim: true
  - name: created_at
    data_type: datetime
    description: When this owner first appeared as the author of a SpecScore artifact.
    checks:
      required: false
---

# Entity: User

## Description

The User entity is the smoke-test fixture for the
[entity Feature](../entity/README.md). It models the human or service
identity that appears in the `**Owner:**` line of every Idea, Feature,
and Plan in a SpecScore repository.

The `id` field is deliberately permissive in MVP — SpecScore does not
own an authentication system, so a User is whatever string the
authoring tool stamped on the artifact (a GitHub handle, an email
local-part, a service account name). The `email` field is a `ref:` to
the sibling [email property](email.property.md), demonstrating the
Property-reuse mechanism. `display_name` and `created_at` are inline
property definitions, demonstrating the inline-or-reference choice.

This fixture is co-located with the [idea Feature](README.md) because
an Idea's `**Owner:**` is semantically a User. Real consumer repos may
move it as they adopt their own placement convention.

## Properties

<!-- managed-by: specscore lint --fix -->
| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | yes | Stable identifier. Free-form in MVP — typically a GitHub handle, an email local-part, or a service account name. |
| `email` | string *(via [email](email.property.md))* | yes | An RFC 5322 email address used to identify the human or service owner of a SpecScore artifact. |
| `display_name` | string | no | Human-readable name shown in indexes and rendered docs. Falls back to `id` when absent. |
| `created_at` | datetime | no | When this owner first appeared as the author of a SpecScore artifact. |
<!-- end-managed -->

## Referenced by

<!-- managed-by: specscore lint --fix -->
- _No references yet._
<!-- end-managed -->

---
*This document follows the https://specscore.md/entity-specification*

---
kind: property
id: email
data_type: string
description: An RFC 5322 email address used to identify the human or service owner of a SpecScore artifact.
checks:
  required: true
  max_length: 320
  pattern: "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
  trim: true
  lowercase: true
---

# Property: email

## Description

A normalised email address. Stored lowercased and trimmed; the `pattern`
check is intentionally permissive — strict RFC 5322 validation belongs
in the application layer, not in the spec-level shape contract.

This property is the smoke-test fixture for the
[property Feature](../property/README.md). It is co-located with the
[idea Feature](README.md) because an Idea's `**Owner:**` field is
semantically a user's email address — the most defensible home for
this fixture in the absence of a `shared/` convention. Real consumer
repos are free to relocate the property file as they adopt their own
placement convention; see the
[entity Feature's Open Questions](../entity/README.md#open-questions)
for the open repo-wide discussion.

## Referenced by

<!-- managed-by: specscore lint --fix -->
- Entity: [idea](idea.entity.md)
- Entity: [user](user.entity.md)
<!-- end-managed -->

---
*This document follows the https://specscore.md/property-specification*

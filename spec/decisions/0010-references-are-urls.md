---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: References Are URLs

**Status:** Approved
**Date:** 2026-07-08
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** references, linkage, modelspec, source-references, syntax
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

Decision [0007](0007-modelspec-reference-resolution.md) defined
`modelspec://<module>.<Name>[@{host}/{org}/{repo}]`. That syntax breaks under
standard URL parsers: everything between `//` and the first `/` is the RFC 3986
*authority* component, which is defined case-insensitive — a normalizer may fold
`modelspec://vault.Vault` to `modelspec://vault.vault`, silently corrupting a
case-significant concept name. The `@` form is accidentally worse: parsers read
the concept as *userinfo* and the host as the authority. Concept names belong in
the URL *path*, which is case-sensitive by definition.

The Stable [source-references](../features/source-references/README.md) feature
has the same defect in one production: its canonical committed form is already a
URL (`https://specscore.org/{host}/{org}/{repo}/{resolved_path}`), but the
cross-repo authoring shorthand `specscore:{reference}@{host}/{org}/{repo}` is not
decomposable by standard libraries.

The owner directed a family-wide alignment on proper URLs while the migration
surface is near zero: both consumer pilots use only local two-segment
`modelspec://` references, and no `@`-suffixed reference of either scheme has
ever been committed.

## Decision

This decision **amends the reference grammar of decision 0007 and the cross-repo
shorthand of the source-references feature**. The resolution ladder, the
no-implicit-network rule, and everything else in 0007 are unchanged.

### Family rule

Any SpecScore-family reference scheme written with `//` MUST honor RFC 3986
authority semantics: the authority is the repository host, the path starts with
`{org}/{repo}` followed by the resource reference, and an **empty authority means
the current repository**. Opaque single-colon forms (`specscore:{reference}`)
remain valid URIs and are unaffected.

### ModelSpec references

```text
modelspec:///<module>.<Name>                          # current repository
modelspec://{host}/{org}/{repo}/<module>.<Name>       # another repository
```

The **last path segment** is the concept reference; every segment between the
authority and it is the repository path. This keeps the grammar stable under
nested repository paths (e.g. subgroup hosting). The former `@{host}/{org}/{repo}`
suffix is removed.

### Source references

The same-repo authoring shorthand is unchanged (`specscore:feature/cli/task/claim`
— an opaque URI, terse by design, auto-expanded before commit). The cross-repo
shorthand becomes:

```text
specscore://{host}/{org}/{repo}/{reference}
```

replacing `specscore:{reference}@{host}/{org}/{repo}`. The canonical committed
form is untouched — and the scheme form is deliberately a pure prefix swap away
from it: `specscore://github.com/acme/orchestrator/spec/features/agent-skills`
↔ `https://specscore.org/github.com/acme/orchestrator/spec/features/agent-skills`.
Scheme form, canonical URL, and Studio URL are three projections of one address.

### Version pinning and fragments

- `?ref=<git-ref>` MAY be appended to any family reference (scheme or canonical
  form) to pin a branch, tag, or commit — `ref` being git's own term. The pin is
  advisory syntax in v0.2: it does not change the resolution ladder, and a
  resolver that cannot honor a pin MUST say so rather than silently resolving
  elsewhere. No network fetch is implied.
- The fragment (`#`) is RESERVED for intra-resource addressing. It already means
  Markdown heading anchors on spec documents (`#req:` requirement IDs), and is
  held for future intra-concept addressing on model references (properties, enum
  values). It MUST NOT be used for version pinning.

### Legacy forms and `--fix`

Both legacy productions are mechanically detectable and MUST be lint **errors**
carrying the exact rewrite:

- `modelspec://x.Y` (authority present, empty path) → `modelspec:///x.Y`
- `specscore:{ref}@{host}/{org}/{repo}` → `specscore://{host}/{org}/{repo}/{ref}`

Lint `--fix` MUST apply these rewrites. These are the first fixers with specified
semantics in the graph rule family.

## Rationale

A scheme written with `//` promises URL semantics; delivering them is what makes
every standard library, Studio, and future tool a free parser instead of a custom
one. The alternative — documenting "do not parse our URIs with URL parsers" — is
the kind of caveat that outlives its authors. The break is taken now precisely
because it is free: two pilots, all-local references, and a specified fixer.

## Declined Alternatives

### Keep the `@{host}/{org}/{repo}` suffix family-wide

The suffix was chosen by 0007 to match source-references. But the principled line
runs elsewhere: opaque schemes may use compact conventions; `//` schemes must
honor the authority grammar they invoke. The suffix survives nowhere it would be
misparsed — the deferred Phase 6 cross-repo *graph* references are bare strings,
not URIs, and may still adopt it.

### Fragment for version pinning (`#feature-1`)

Has npm/docker precedent, but the fragment already carries meaning on spec
documents (heading anchors) and is the natural future slot for intra-concept
addressing. `?ref=` round-trips through every parser and reuses git vocabulary.

### Accept legacy forms with a deprecation warning

Rejected: pre-v1 with two migratable pilots is the one moment a clean break costs
nothing. A warning that lingers becomes a second supported syntax.

## Consequences at Decision Time

- Decision 0007's grammar section is amended as above; its resolution ladder,
  diagnostics, and `dependsOn` accounting are unchanged.
- The source-references feature drops REQ `cross-repo-suffix` in favour of the
  authority form; its canonical-URL and auto-expansion requirements are unchanged.
- The CLI resolver/linter parses the URL forms, flags legacy forms with rewrites,
  and implements the `--fix` rewriters.
- Both consumer pilots migrate their `modelspec://` references to the
  triple-slash form.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec
- source-references
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

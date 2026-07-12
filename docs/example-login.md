# Explained by example: a login feature

SpecScore has a lot of artifact kinds — Ideas, Features, Decisions, Change Requests, Acceptance Criteria, and the Rehearse evidence that proves them. Read about each on its own and it can be hard to see how they *connect*. So this page follows one coherent feature — a login page — from a rough idea all the way to shipped, verified software, and shows every artifact kind it passes through along the way.

The story is simple. A product needs a login page: users should sign in with email and password, or with a third-party account (Google, Facebook). We'll watch that idea become a nested feature tree, get a hard call pinned down as a decision, receive a proposed change, sprout thin acceptance criteria, and finally get proven for real by Rehearse.

Everything below is an **illustrative** worked example. The file paths (`spec/ideas/…`, `spec/features/auth/login/…`) are shown to make the shapes concrete — no such tree has to exist in your repo. The *formats*, though, are accurate to the real specifications, which each section links to.

## 1. It starts as an Idea

Before there's a feature, there's an [Idea](/ideas/workflow) — a one-page `spec/ideas/<slug>.md` file capturing a problem and a recommended direction, with a lifecycle status of its own. Our login idea has been reviewed and approved, and work is underway:

`spec/ideas/auth-sign-in.md`

```markdown
---
format: https://specscore.md/idea-specification
status: Approved
---

# Idea: Email/password and OAuth sign-in

**Status:** Approved
**Date:** 2026-05-02
**Owner:** Ada Lovelace

## Problem Statement

New users have no way to authenticate. We need a sign-in page that
supports email + password against our own credential store, plus
third-party sign-in with Google and Facebook so people can start
without creating yet another password.

## Recommended Direction

Ship a single login screen with an email/password form and OAuth
buttons for Google and Facebook. Session state is a hardened cookie.
Promote this idea into an `auth/login` feature tree once approved.
```

### A draft sidekick idea

Ideas don't all move at the same speed. Alongside the approved one, the team has jotted down a companion idea for a *future* direction — passwordless sign-in with passkeys / WebAuthn — that nobody has committed to yet. It stays in `Draft`:

`spec/ideas/passwordless-sign-in.md`

```markdown
---
format: https://specscore.md/idea-specification
status: Draft
---

# Idea: Passwordless sign-in (passkeys / WebAuthn)

**Status:** Draft
**Date:** 2026-05-06
**Owner:** Ada Lovelace

## Problem Statement

Passwords are a support and security burden. Passkeys (WebAuthn) let
users sign in with a device credential — no shared secret to leak.

## Recommended Direction

Explore adding a WebAuthn flow next to email/password once the base
login feature is stable. Not scheduled; capturing the direction now
so it isn't lost.
```

The point: **ideas can be companions in different lifecycle states.** `auth-sign-in` is `Approved` and being implemented; `passwordless-sign-in` is a `Draft` sketch of where things might go. Only a promoted idea becomes a Feature — the draft sidekick waits its turn.

## 2. It promotes into a nested Features tree

Once approved, the idea is promoted into a [Feature](/feature-specification). A Feature isn't a single file — it's a **directory with a `README.md`**, and features **nest**: sub-features are sub-directories, each with their own `README.md`. The login feature has an email/password sub-feature and an OAuth sub-feature, and OAuth itself nests one level deeper into Google and Facebook:

```
spec/features/auth/login/
  README.md                    ← the login feature (its ## Contents lists sub-features)
  email-password/README.md     ← sub-feature
  oauth/README.md              ← sub-feature (itself nests)
    google/README.md           ← sub-sub-feature
    facebook/README.md         ← sub-sub-feature
  _acs/                        ← thin acceptance criteria (shared)
  _tests/                      ← Rehearse scenarios + _checks/
```

A parent feature lists its children in a `## Contents` table, so the tree is navigable from the top. Here's that section in the login `README.md`:

```markdown
## Contents

| Child | Description |
|---|---|
| [email-password](email-password/README.md) | Email + password against the local credential store |
| [oauth](oauth/README.md) | Third-party sign-in via the OAuth 2.0 authorization-code flow |
```

Note the two underscore directories, `_acs/` and `_tests/`. **They are not sub-features** — the leading underscore marks them as supporting material (shared acceptance criteria and Rehearse scenarios), and they're excluded from the `## Contents` table. The `oauth/README.md` would carry its own `## Contents` listing `google` and `facebook`, and so the tree navigates all the way down.

## 3. A hard call is recorded as a Decision

Somewhere in building OAuth, the team hits a fork with real consequences and picks a side. That choice gets pinned down as a [Decision](/decision-specification) — an Architecture Decision Record — so nobody re-litigates it six months later or quietly does the opposite. Decisions live in `spec/decisions/NNNN-<slug>.md`:

`spec/decisions/0001-oauth-authorization-code-flow.md`

```markdown
---
format: https://specscore.md/decision-specification
status: Approved
---

# Decision: OAuth uses the authorization-code flow

**Status:** Approved
**Date:** 2026-05-14
**Tags:** auth, oauth, security

## Context

The OAuth 2.0 implicit flow returns the access token directly in the
browser redirect, where it's exposed to scripts and the URL/history.
For a web app that's an unnecessary token-leak surface.

## Decision

Use the authorization-code flow with PKCE for both Google and
Facebook. The browser only ever handles a short-lived code; the token
exchange happens server-side. No tokens in the browser.
```

A Decision is durable and immutable once accepted — if the call changes later, you write a new Decision that supersedes it, you don't rewrite this one.

## 4. A change arrives as a Change Request

Time passes, the login feature reaches `Stable`, and someone proposes an improvement: session cookies should add `SameSite=Lax` to blunt CSRF. In SpecScore, a change to a stable feature doesn't get scribbled inline — a stable feature must not carry speculative content. Instead the change is a **proposal**, expressed as a change-request *Idea* and surfaced from the feature's `## Proposals` index.

First, the change-request idea (still `Draft` — it's a proposal, not yet accepted):

`spec/ideas/session-cookie-samesite-lax.md`

```markdown
---
format: https://specscore.md/idea-specification
status: Draft
---

# Idea: Require SameSite=Lax on the session cookie

**Status:** Draft
**Date:** 2026-06-20
**Owner:** Grace Hopper

## Problem Statement

The session cookie is HttpOnly and Secure but sets no SameSite
attribute, leaving a CSRF surface on cross-site requests.

## Recommended Direction

Add `SameSite=Lax` to the session cookie. Proposed against the stable
`auth/login` feature; incorporate into its spec if accepted.
```

Then the login feature `README.md` links it from a `## Proposals` section, so anyone reading the feature sees the pending change without it polluting the normative spec:

```markdown
## Proposals

| Proposal | Status | Summary |
|---|---|---|
| [session-cookie-samesite-lax](../../ideas/session-cookie-samesite-lax.md) | Draft | Require SameSite=Lax on the session cookie |
```

The proposal is **non-normative until accepted**. When the team agrees, the change is incorporated into the feature `README.md` (and its acceptance criteria), and the change-request idea transitions to `Implemented`. Until then, the stable spec stays clean and the idea holds the speculation.

## 5. The criteria are thin ACs

What must actually be *true* about login is captured as thin [Acceptance Criteria](/acceptance-criteria-specification) — one small file each, intent only, no test machinery. They live in the feature's `_acs/` directory as `<slug>.ac.md`:

`spec/features/auth/login/_acs/session-hardened.ac.md`

```markdown
# AC: session-hardened

**Status:** accepted

## Statement

After any successful sign-in, the session cookie is HttpOnly and Secure.
```

Each `.ac.md` is the single source of truth for one criterion. Running `specscore rehearse acs spec/features/auth/login` reads all the `_acs/` files and generates the feature's `## Acceptance Criteria` summary table — a read-model a person can skim in one glance and an agent can absorb in one shot, without opening every file.

## 6. The proof is Rehearse

A stated criterion is a promise. [Rehearse](/rehearse) makes it a *proven* promise by running it for real — the executable scenarios, reusable checks, and nested suites that turn `session-hardened` from a sentence into evidence live in the feature's `_tests/` directory.

That page walks the very same login example, in its **"Explained by example: testing a login page"** section. In short: the `session-hardened` AC above is proven by a reusable check invoked with `**Use:**` across the email, Google, and Facebook flows — written once, reused everywhere — and success versus failure (e.g. an OAuth denial) reads as a nested suite branching from one shared setup. Rather than repeat it here, see [Rehearse — in plain language](/rehearse).

## The thread

One feature, the whole model, nothing hand-wavy:

- **Idea** (`auth-sign-in`, Approved) — plus a **draft sibling** (`passwordless-sign-in`) showing ideas can be companions in different lifecycle states.
- **Promoted into a nested Features tree** — `auth/login` with `email-password` and `oauth`, and `oauth` nesting down to `google` and `facebook`; `_acs/` and `_tests/` are supporting, not sub-features.
- **A Decision pins a hard call** — authorization-code flow with PKCE, not implicit; recorded once, immutable.
- **A Change Request proposes an evolution** — `SameSite=Lax` as a change-request idea, surfaced from the feature's `## Proposals`, non-normative until accepted.
- **Thin ACs state what must be true** — `session-hardened` as a one-file criterion, its summary generated, not hand-maintained.
- **Rehearse proves them for real** — the same criterion, run as an executable check across every sign-in method.

Idea → Features → Decision → Change Request → Acceptance Criteria → Rehearse. That's the full SpecScore artifact model, following one login feature the whole way.

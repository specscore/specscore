# Rehearse — in plain language

> The mental model for Rehearse, SpecScore's acceptance-evidence layer. See also [Rehearse vs. Established Testing Frameworks](/rehearse-vs-testing-frameworks) and where Rehearse sits in the [ecosystem](/ecosystem). The runnable spec and code live in the [`specscore-cli`](https://github.com/specscore/specscore-cli) repository.

## What it is

**Rehearse is a tool that proves software actually does what its documentation promises.**

Think of a play. Before opening night, actors do a *dress rehearsal* — they run through the whole thing for real to check it works, not just read the script and assume. Rehearse is that dress rehearsal, but for a command-line program: it takes the promises written about a feature and actually *runs* them to see if they hold.

It's the "prove it" half of SpecScore: don't just *write down* what your software should do — *prove* it does.

Everything on this page is shipped and working today in `specscore-cli` — real executable scenarios, reusable checks, thin acceptance criteria, and a self-hosted CI corpus. Rehearse is still in active **pre-v1** development, so expect the format to keep firming up before a stable release.

## Explained by example: testing a login page

> For where this login test comes from — the Idea, the nested feature tree, the decision and the change request behind it — see [Explained by example: a login feature](/example-login).

Your app has a login page. Users sign in three ways — email/password, Google, Facebook. Different flows, but after ANY successful sign-in the same things must be true: a hardened session cookie, a redirect to the dashboard. And each method must handle failure. How do you test that — for real — without copy-pasting the checks into every flow?

Rehearse answers that in four moves, and each move is a real feature you can run today.

### Act 1 — A scenario is real commands. No glue, no mocks.

Start with email sign-in. Given/When/Then, but the steps are actual commands that run:

~~~markdown
# Rehearse: Email sign-in

## Given a registered user
```bash
echo 'email=ada@example.com&password=s3cr3t' > form.txt
```

## When the form is POSTed to the sign-in endpoint
```bash
printf 'HTTP/1.1 302 Found\r\nLocation: /dashboard\r\nSet-Cookie: session=abc; HttpOnly; Secure\r\n\r\n' > out.txt
```

## Then the response redirects
```bash
grep -q '302 Found' out.txt || exit 1
```
~~~

No step-definition layer, no mock server — the description *is* the test. (Real project: swap the `printf` for a real `curl` against the running app.)

### Act 2 — Write the check once. Reuse it across every method.

The post-auth verification — "the session cookie is hardened" — is IDENTICAL for email, Google, and Facebook. So write it once, as a reusable **check**:

~~~markdown
# Check: session-hardened
**Params:** response_file

```bash
grep -qi '^set-cookie: session=' {{response_file}} || { echo "no session cookie"; exit 1; }
grep -i  '^set-cookie: session=' {{response_file}} | grep -qi 'HttpOnly' || { echo "cookie not HttpOnly"; exit 1; }
```
~~~

Then invoke it from any scenario with one line — the SAME line in the email, Google, and Facebook flows:

~~~markdown
## Then the session is hardened
**Use:** [session-hardened](./_checks/session-hardened.check.md) with response_file=out.txt
~~~

Three sign-in methods, one check. Tighten the rule (also require `Secure`) and every method stays honest — you edit one file, not three. No copy-paste.

### Act 3 — Branch success and failure from one shared setup.

Google sign-in can succeed or be denied. Both start from the same account. Express that as a **nested suite** — one `## Given`, multiple `### When` branches (describe/context/it):

~~~markdown
## Given a Google identity mapped to a user
```bash
echo 'sub=10432' > identity.txt
```

### When the OAuth callback succeeds
```bash
printf 'HTTP/1.1 302 Found\r\nLocation: /dashboard\r\nSet-Cookie: session=g0og; HttpOnly; Secure\r\n\r\n' > out.txt
```
#### Then the session is hardened
**Use:** [session-hardened](./_checks/session-hardened.check.md) with response_file=out.txt

### When the user denies consent
```bash
printf 'HTTP/1.1 302 Found\r\nLocation: /login?error=access_denied\r\n\r\n' > out.txt
```
#### Then no session is issued and the user returns to login
```bash
grep -qi '^set-cookie: session=' out.txt && exit 1
grep -qi '^Location: /login' out.txt || exit 1
```
~~~

That one file runs as **two independent cases** — `google-sign-in.md › When the OAuth callback succeeds` and `… › When the user denies consent` — each in its own sandbox, sharing the setup. The success branch even reuses the check from Act 2. (Note the success branch reuses the `**Use:**` check; the denial branch has its own outcome.)

### Act 4 — The criteria are thin, and their summary is generated.

The things that must be true — "session hardened," "redirected to dashboard" — are **thin acceptance criteria**: one file each, intent only, no test machinery.

~~~markdown
# AC: session-hardened
**Status:** accepted

## Statement
After any successful sign-in, the session cookie is HttpOnly and Secure.
~~~

Run `specscore rehearse acs spec/features/auth/login` and it generates the feature's `## Acceptance Criteria` summary table from the `_acs/` files — every criterion's intent readable in one glance (a person skims it; an agent reads it in one shot, no per-file lookups), while each `.ac.md` stays the single source of truth.

> One login page, three methods, success and failure — and the shared verification is written once, the branches read like behaviour, the criteria are one glance away, and every line runs for real. That's Rehearse.

## How it works

The four Acts above are the whole model. Here is the mechanism underneath them.

The promises live as **acceptance criteria** — the thin `_acs/<slug>.ac.md` files from Act 4. Each captures intent only, no test machinery. `specscore rehearse acs` reads them and generates a `## Acceptance Criteria` summary in the feature, a read-model you can skim without opening every file. The intent lives in one place; the summary is derived, never hand-maintained.

Each scenario is a Markdown file that mixes human-readable description with real commands, exactly like the sign-in files above. When you run `specscore rehearse run <files>`, for each scenario it:

1. Makes a fresh, throwaway working folder, so scenarios can't contaminate each other — that's why the Google success and denial branches don't step on each other.
2. Runs the steps **in order**, top to bottom. The first step that fails stops the scenario; the rest are marked "skipped."
3. Checks any `### Assert: file …` conditions — does a file exist / not exist / contain some text / have certain permissions? Paths can use wildcards: `*.json` (one folder), `**/*.o` (any depth), `*.{o,a}` (multiple extensions).
4. Reports each scenario as **pass** or **fail** — as a readable summary or as machine JSON.

A few touches under the hood:

- **Steps can pass data forward.** An early step captures a value (say, an ID); a later step reuses it via `{{name}}` placeholders — a "context bag" shared within one scenario. It's the same `{{name}}` substitution the `session-hardened` check uses for its `response_file` param.
- **It speaks several languages.** Steps aren't only `bash`; there are also `sql`, `dtql`, `hurl` (HTTP), and `graphql` blocks — so the sign-in POST could be a real `hurl` request instead of a `printf`.
- **Checks are reusable, not copy-pasted.** That's Act 2: a common verification is written once as a parameterized *check*, then invoked from any scenario with `**Use:** [label](url) with name=value`. Fix the check in one place and every scenario that uses it stays honest.
- **Nested branches are first-class.** That's Act 3: one `## Given` setup with multiple `### When` / `#### Then` branches runs as several independent cases sharing the setup.
- **It's honest about missing tools.** If a scenario needs a program that isn't installed, Rehearse *skips* it with a warning rather than pretending it failed.
- **`rehearse new` writes the first draft for you.** Point it at an acceptance criterion and it scaffolds a scenario pre-filled with that criterion's Given/When/Then text, so a human just fills in the commands.
- **Negative tests are first-class.** Some scenarios exist to prove the tool *rejects* bad input — like the "user denies consent" branch. Marking one `**Expect:** fail` tells Rehearse "this is supposed to fail," so it counts as a pass when it correctly fails.
- **It's self-hosting.** Rehearse's own features are tested by Rehearse scenarios. It eats its own cooking.

Results can be exported (`--report-out`) and fed back into SpecScore as "verified-behavior" facts — so the spec system *knows*, with evidence, which promises are currently proven.

## What it does *not* do — and why

- **It's not a unit-test framework.** It works at the "does the whole program behave correctly" level, because its job is to verify [acceptance criteria](/acceptance-criteria-specification) (user-facing promises). Unit tests cover the small internal pieces.
- **It doesn't mock or fake anything.** It runs the *real* commands against the *real* filesystem. A fake rigged to succeed proves nothing — real execution is the whole value.
- **It doesn't run scenarios in parallel.** They run one at a time, in order. That trades speed for determinism — the same result every time, which matters for a proof.
- **It doesn't push, deploy, or touch anything permanent.** Each scenario is sandboxed in a temp folder that's deleted afterward.
- **It keeps pattern-matching simple on purpose.** Globs support wildcards, recursion, and `{a,b}` alternatives, but not exclusions or numeric ranges — "clear and predictable," not "maximally clever."
- **Parsing and running are kept separate.** Reading a scenario file never executes anything; a different part runs it.

## Why it exists at all

Documentation drifts. Someone writes "after any successful sign-in the session cookie is HttpOnly and Secure," the code changes six months later, and now the docs are a comfortable lie nobody notices.

Rehearse closes that gap by making the promise *executable*. The acceptance criterion and the test that checks it are linked (`**Verifies:**`) and stored right next to each other. Run Rehearse and you get an honest, current answer to "does this still actually work?" — backed by real commands, not vibes.

In short: **Rehearse keeps a project's claims and its reality in sync, by continuously running the claims for real.**

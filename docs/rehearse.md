# Rehearse — in plain language

> The mental model for Rehearse, SpecScore's acceptance-evidence layer. See also [Rehearse vs. Established Testing Frameworks](/rehearse-vs-testing-frameworks) and where Rehearse sits in the [ecosystem](/ecosystem). The runnable spec and code live in the [`specscore-cli`](https://github.com/specscore/specscore-cli) repository.

## What it is

**Rehearse is a tool that proves software actually does what its documentation promises.**

Think of a play. Before opening night, actors do a *dress rehearsal* — they run through the whole thing for real to check it works, not just read the script and assume. Rehearse is that dress rehearsal, but for a command-line program: it takes the promises written about a feature and actually *runs* them to see if they hold.

It's the "prove it" half of SpecScore: don't just *write down* what your software should do — *prove* it does.

Everything on this page is shipped and working today in `specscore-cli` — real executable scenarios, reusable checks, thin acceptance criteria, and a self-hosted CI corpus. Rehearse is still in active **pre-v1** development, so expect the format to keep firming up before a stable release.

## How it works

The promises live as **acceptance criteria** — small Given/When/Then statements in plain English, like:

> *Given a config file, when the tool runs, then it exits 0 and writes `output.json`.*

Each criterion is a *thin* file (`_acs/<slug>.ac.md`) that captures intent only — no test machinery. `specscore rehearse acs` reads them and generates a `## Acceptance Criteria` summary in the feature, a read-model you can skim without opening every file. The intent lives in one place; the summary is derived, never hand-maintained.

Rehearse turns each of those into an executable **scenario**: a Markdown file that mixes human-readable description with real commands. A scenario looks roughly like this:

~~~markdown
**Verifies:** myapp#ac:writes-output      ← which promise this checks

```bash
myapp run --config demo.yaml              ← a real command that actually runs
```

### Assert: file `output.json` exists      ← a check on the result
~~~

When you run `specscore rehearse run <files>`, for each scenario it:

1. Makes a fresh, throwaway working folder, so scenarios can't contaminate each other.
2. Runs the steps **in order**, top to bottom. The first step that fails stops the scenario; the rest are marked "skipped."
3. Checks any `### Assert: file …` conditions — does a file exist / not exist / contain some text / have certain permissions? Paths can use wildcards: `*.json` (one folder), `**/*.o` (any depth), `*.{o,a}` (multiple extensions).
4. Reports each scenario as **pass** or **fail** — as a readable summary or as machine JSON.

A few touches under the hood:

- **Steps can pass data forward.** An early step captures a value (say, an ID); a later step reuses it via `{{name}}` placeholders — a "context bag" shared within one scenario.
- **It speaks several languages.** Steps aren't only `bash`; there are also `sql`, `dtql`, `hurl` (HTTP), and `graphql` blocks.
- **Checks are reusable, not copy-pasted.** A common verification — "the server is healthy," "this record exists" — is written once as a parameterized *check*, then invoked from any scenario with `**Use:** [label](url) with name=value`. Fix the check in one place and every scenario that uses it stays honest.
- **It's honest about missing tools.** If a scenario needs a program that isn't installed, Rehearse *skips* it with a warning rather than pretending it failed.
- **`rehearse new` writes the first draft for you.** Point it at an acceptance criterion and it scaffolds a scenario pre-filled with that criterion's Given/When/Then text, so a human just fills in the commands.
- **Negative tests are first-class.** Some scenarios exist to prove the tool *rejects* bad input. Marking one `**Expect:** fail` tells Rehearse "this is supposed to fail," so it counts as a pass when it correctly fails.
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

Documentation drifts. Someone writes "the tool exits 0 and writes `output.json`," the code changes six months later, and now the docs are a comfortable lie nobody notices.

Rehearse closes that gap by making the promise *executable*. The acceptance criterion and the test that checks it are linked (`**Verifies:**`) and stored right next to each other. Run Rehearse and you get an honest, current answer to "does this still actually work?" — backed by real commands, not vibes.

In short: **Rehearse keeps a project's claims and its reality in sync, by continuously running the claims for real.**

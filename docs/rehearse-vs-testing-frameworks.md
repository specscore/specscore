# Rehearse vs. Established Testing Frameworks

> A companion to [Rehearse — in plain language](/rehearse). If that page explains *what* Rehearse is, this one answers the fair, skeptical question: **why not just use pytest, `go test`, Jest, or Cucumber?**

The honest starting point: **Rehearse is not competing with unit-test frameworks.** Those are white-box tools that test functions inside a codebase. Rehearse is an *acceptance-evidence layer*. Its real neighbour is **Cucumber/Gherkin-style BDD plus an integration harness** — and that's the comparison worth making.

## The thesis in one sentence

Traditional frameworks answer *"does this code work?"* and organize tests around **functions in the codebase**. Rehearse answers *"is this written promise currently backed by real evidence?"* and organizes around **acceptance criteria in the spec**. That inversion — spec-centric, not code-centric — is the whole bet.

## Where it genuinely differs

**1. No glue code (the sharpest difference vs Cucumber).** In Cucumber you write Gherkin *and* "step definitions" — regex-to-code bindings that translate "When I run the tool" into an actual action. That glue layer is real work and it rots. In Rehearse the scenario *is* the executable steps: a fenced ` ```bash ` block runs the real command directly. Prose plus real commands, nothing in between. When a check *does* recur, you don't reach for a shared code binding — you write a **reusable check** once and invoke it inline with `**Use:** [label](url) with name=value`. It's parameterized reuse without a step-definition layer to maintain.

**2. Traceability and evidence are first-class, not bolted on.** Each scenario declares `**Verifies:** feature#ac:slug` — a machine-checkable link to a specific acceptance criterion. Those criteria are *thin*: each is a small `_acs/<slug>.ac.md` file that states intent only, and `specscore rehearse acs` generates a `## Acceptance Criteria` summary from them as a read-model. Results export as structured JSON with provenance (git commit, timestamps) and are ingested into SpecScore's fact store as *verified-behavior* facts. So you can ask "*which promises are currently proven, and how recently?*" across the whole product. A normal test suite gives you red/green; it does not maintain a queryable, freshness-aware map from written requirement → proof.

**3. Language-agnostic, black-box.** One scenario can mix `bash` + SQL + HTTP (via hurl) + GraphQL against the *real running product*, regardless of what it is written in. It tests the thing a user or operator actually touches. pytest tests Python; `go test` tests Go; Rehearse does not care what the system is built from.

**4. Human- and agent-native.** Scenarios are Markdown — readable by a product owner, writable (and scaffoldable via `rehearse new`) by an AI agent, and colocated with the spec under `_tests/`. Low ceremony compared to a Cucumber project or a bespoke integration harness.

## Where it does *not* win — be clear-eyed

- **It is not a unit-test replacement.** It is black-box and coarse-grained. You still want `go test`/pytest for internal logic, fast feedback, edge-case coverage, and mocking. SpecScore itself does exactly this: Go unit tests for the pieces, Rehearse for the acceptance layer. They are complementary, not substitutes.
- **Maturity gap.** pytest/JUnit/Jest have decades of ecosystem — fixtures, rich matchers, parametrization, watch mode, IDE integration, coverage tooling. The capabilities described here — real scenarios, reusable checks, thin ACs, evidence export — are shipped and working in `specscore-cli` today, but Rehearse is in active **pre-v1** development: young, deliberately minimal (exit codes + file assertions + arbitrary shell), and still firming up its format.
- **Slower, serial, no mocking — by design.** It runs real commands one at a time for determinism. That is the point (evidence must be reproducible), but it is not where you go for a 5,000-case fast suite.
- **Assertion richness is basic** compared to a framework's matchers — you fall back to shell logic for anything complex.

## A side-by-side

| | Unit frameworks (pytest, `go test`, Jest) | BDD (Cucumber/Gherkin) | **Rehearse** |
|---|---|---|---|
| Level | white-box, functions | acceptance, black-box | acceptance, black-box |
| Organized around | test functions | features/scenarios | **acceptance criteria in the spec** |
| Glue between prose and action | n/a | step definitions (code) | **none — steps are real commands** |
| Language coupling | tied to the language under test | tied to the binding language | **language-agnostic** |
| Output | pass/fail | pass/fail | **pass/fail + verified-behavior facts with provenance** |
| Mocking / isolation | yes | usually | **no, by design (real execution)** |
| Speed / parallelism | fast, parallel | moderate | **serial, deterministic** |

## When to reach for it — and when not

**Use Rehearse** when the valuable question is *"is this documented behavior still true against the real system, and can I prove it to a reviewer or an agent?"* — CLI tools, APIs, multi-step operator workflows, and anywhere spec-to-evidence traceability matters (audits, AI agents reasoning over what is verified).

**Keep your existing frameworks** for everything below that line — unit logic, fast inner-loop testing, component isolation, exhaustive edge cases.

## Bottom line

If you already run Cucumber *plus* a homegrown traceability and reporting layer, Rehearse is largely "that, integrated, without the step-definition glue, and feeding a knowledge system." If you just need to test functions, it offers nothing that pytest does not already do better — and it is honest about that. Rehearse earns its place at the **acceptance-evidence** seam, not the unit-test seam, and it is designed to sit *alongside* your existing tests, not replace them.

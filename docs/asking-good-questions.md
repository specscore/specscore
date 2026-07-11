# Asking Good Questions for Good Specs

A specification is only as good as the questions that produced it. The hard part of writing a [Feature](/feature-specification) isn't the Given/When/Then syntax — it's knowing what to ask so the criteria end up **complete, unambiguous, and verifiable**. Every question you skip becomes an assumption someone else silently codes, and every vague answer becomes a bug you find later.

This guide is for anyone turning a fuzzy request into a spec — business analysts, product owners, architects, and AI agents alike. It complements the [Idea workflow](/ideas/workflow) (where questions begin) and the [Acceptance Criteria](/acceptance-criteria-specification) format (where good answers land).

## Why questions come first

Requirements arrive underspecified. "Let users export their data," "make it faster," "add notifications" — each hides a dozen decisions. You can resolve those decisions cheaply now, by asking, or expensively later, through rework. Good questioning is the highest-leverage moment in the whole lifecycle: it costs minutes and saves days.

A spec written without questions isn't a spec — it's a guess with formatting.

## What a good question does

A good question does at least one of these:

- **Forces a decision.** Not "any thoughts on the format?" but "CSV or JSON — and if both, which is the default?"
- **Surfaces a hidden assumption.** "You said 'the user' — one user, or can an admin export on someone's behalf?"
- **Draws a boundary.** "Is scheduling exports in scope, or only on-demand for now?"
- **Makes a requirement testable.** "How would we *know* it worked?" — the answer is your acceptance criterion.

If a question does none of these, it's small talk. Cut it.

## The spec-shaped question checklist

Walk these categories in roughly this order. Each maps to a part of the resulting spec.

1. **Purpose & value** — Who is this for? What pain does it remove? Why now? What happens if we *don't* build it? → *feeds the Summary and Problem.*
2. **Scope & boundaries** — What is explicitly **not** included? Where does this feature end and the next begin? → *feeds Not Doing / Out of Scope.*
3. **Actors & triggers** — Who or what initiates the behavior? What must be true before it can happen (preconditions)?
4. **Behavior & rules** — Walk the happy path first, then the rules that govern it. "Always? Or only when…?"
5. **Inputs & outputs** — What goes in and comes out — shapes, formats, limits, defaults?
6. **Failure & edge cases** — What can go wrong, and what should happen then? Probe the boundaries: empty, zero, one, many, huge, duplicate, concurrent, malformed, unauthorized.
7. **Observability & acceptance** — How will we verify each behavior? Every requirement must be *observable*. → *feeds the Acceptance Criteria, later proven by [Rehearse](/ecosystem).*
8. **Non-functionals** — Performance, security, compatibility, accessibility, internationalization — but only the ones that genuinely matter here. Don't ritualistically ask all of them.
9. **Assumptions & unknowns** — State the assumptions you're making out loud. Convert anything still undecided into an explicit Open Question rather than a silent choice.

You won't ask everything in every session. The checklist is a net, not a script — its job is to make sure nothing important falls through.

## Techniques that sharpen questions

- **Prefer decisions over opinions.** Offer concrete options with a recommendation: "I'd default to JSON because it round-trips cleanly — object or agree?" A menu gets a decision; "what do you think?" gets a shrug.
- **Turn adjectives into numbers.** "Fast," "large," "soon," "secure" are not requirements. Ask until they become "under 200 ms at p95," "up to 10,000 rows," "within one business day." An unmeasurable adjective is an unverifiable criterion.
- **Ask "how would we know?" of everything.** For each requirement, the answer to that question *is* the acceptance criterion. If there's no answer, the requirement isn't real yet.
- **Apply the stranger test.** If you can't explain the feature simply to someone with no context, you don't understand it well enough to spec it — the place you get vague is the place to ask more.
- **Research before you ask.** Don't ask what the code, the existing specs, or the docs already answer — that wastes the stakeholder's trust. Ask only what is genuinely undecided.
- **One decision per question.** Compound questions ("what format, where does it save, and who can access it?") produce muddy, partial answers. Split them.
- **Reconcile contradictions on the spot.** When an answer conflicts with the existing code, a prior answer, or another stakeholder, stop and resolve it. Don't paper over the seam and hope.
- **Don't silently pick.** If a question can't be answered now, record it as an Open Question. A quietly-assumed default is a landmine; a written unknown is a to-do.

## From answers to a SpecScore spec

Good answers slot directly into the [Feature](/feature-specification) structure:

| What you asked about | Where the answer lands |
|---|---|
| Purpose, pain, value | **Summary** and **Problem** |
| What's *not* included | **Not Doing / Out of Scope** |
| Behavior and rules | **Behavior** (with numbered requirements) |
| "How would we know?" | **Acceptance Criteria** (Given/When/Then), later verified by Rehearse |
| Decisions and their rationale | **Autonomous Decisions**, or a [Decision](/decision-specification) (ADR) when weighty |
| Still-undecided | **Open Questions** |

If an answer has nowhere to go in the spec, either the spec is missing a section or the answer wasn't a requirement. Both are worth noticing.

## Question smells (anti-patterns)

- **Leading questions** that presume the answer: "We'll paginate at 50, right?" — you've made the decision and disguised it as a question.
- **Yes/no questions for open design space:** "Should it be configurable?" invites a reflexive "sure" that commits you to unbounded work. Ask *what* should be configurable, and why.
- **Compound questions** that bundle five decisions into one blurry answer.
- **Asking for permission instead of a decision:** "Is it okay if…?" Frame the trade-off and let the stakeholder choose with eyes open.
- **Solutioneering too early:** debating the database before anyone has said what the feature must *do*.
- **Accepting comfort words:** "make it robust / scalable / intuitive." These feel like requirements and specify nothing. Operationalize them or drop them.

## A worked example

**The vague ask:** "Let users export their data."

**Sharp questions that turn it into a spec:**

1. Which data — everything the user can see, or a defined subset? *(scope)*
2. What format, and if several, what's the default? *(inputs/outputs)*
3. On-demand only, or scheduled/recurring too? *(scope boundary — likely Not Doing for v1)*
4. Who may trigger it — the user only, or an admin on their behalf? *(actors)*
5. How large can an export get, and what happens at the limit — stream, paginate, refuse? *(edge cases + non-functional)*
6. Where does the result go — download, email, a link? Does it expire? *(behavior)*
7. What must *not* leak — other users' data, secrets, soft-deleted rows? *(security)*
8. How will we verify a correct export? *(acceptance)*

**One resulting acceptance criterion:**

> **Given** a signed-in user with 3 records, **when** they request a JSON export, **then** the response is a file containing exactly those 3 records and no other user's data, and the command exits 0.

That criterion is observable — you could write a Rehearse scenario for it today. That's the sign the question behind it was a good one.

## The test of a good spec

Read the finished spec back and check:

- **Every criterion is verifiable** — you could, in principle, write a Rehearse scenario for it. If you can't, it's a wish, not a criterion.
- **No adjective stands where a number belongs.**
- **Scope boundaries are explicit** — a reader knows what's *not* being built.
- **Assumptions are surfaced and unknowns are listed**, not buried.
- **A stranger could tell you what "done" means** from the spec alone.

When all five hold, the questioning did its job — and the spec is one worth building from.

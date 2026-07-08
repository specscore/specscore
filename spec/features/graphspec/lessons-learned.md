# Lessons Learned — Phase 1 Architecture Review

Architectural learning from the Phase 1 review (2026-07). This is deliberately not a
list of decisions — those live in [decisions.md](decisions.md) and the repository
Decision artifacts. This document records what the review *taught us* about designing
the language, so future contributors do not have to re-derive it.

## Assumptions That Proved Correct

- **The core question split.** "What does this object look like?" (ModelSpec) versus
  "How do domain concepts relate and interact?" (GraphSpec) survived every stress
  test applied to it. It mirrors long-lived boundaries elsewhere (JSON Schema vs
  OpenAPI, SQL DDL vs a context map, DDD tactical vs strategic design), which is good
  evidence it is a real seam and not an invented one.
- **Bootstrap epistemics.** Preserving rationale, alternatives, and open questions
  alongside the scaffold — and refusing to self-host early — made the review
  dramatically more effective. The review could see *why* things were shaped as they
  were, not just what they were.
- **Markdown + YAML frontmatter, one concept per file.** Git-friendly (small diffs,
  per-concept history), AI-friendly (one file ≈ one retrievable context unit), and
  reviewable in pull requests. No pressure emerged to change the medium.
- **Events as facts, commands as intent.** Rejecting a single `raisedBy` field and
  refusing a mandatory command→event contract both held up; the review only tightened
  *where* the link is authored, not whether it is optional.
- **ModuleSpec over ExtensionSpec.** Keeping the module concept consumer-neutral was
  validated the moment the public/private boundary was enforced (see mistakes below).

## Assumptions That Proved Incorrect

- **"Independence means the languages ignore each other."** The written record said
  GraphSpec was "intentionally outside" ModelSpec's architecture. That over-corrected:
  independence is a statement about *dependency direction* (the arrow never points
  out of ModelSpec), not about acquaintance. Mutual ignorance actively caused harm —
  it forced GraphSpec examples to embed structure.
- **"GraphSpec needs its own structural kinds."** EntitySpec-with-fields,
  ValueObjectSpec, and EnumSpec all looked necessary until the boundary question was
  asked concept by concept. All structure moved to ModelSpec; GraphSpec kept only
  semantics.
- **"A unified cross-repo linking system exists to build on."** Six documents cited
  it as load-bearing; no such spec existed. The closest prior art was
  `source-references` (a code-annotation format). The lesson generalized: a mechanism
  cited in a normative document must exist or be explicitly marked as deferred.
- **"Ownership needs to be declared."** `owner:` fields plus hand-written `Owns`
  lists plus directory placement stated one fact three ways. Placement alone is
  sufficient, is already maintained by `git mv`, and cannot drift.

## Important Discoveries

- **Structural duplication is a gravity, not an accident.** Within days of existing,
  the bootstrap's TimeWindow value object had grown a `properties:` block and Booking
  had a `fields:` block — nobody decided this; the containers existed, so structure
  flowed into them. Language design is incentive design: the only reliable way to
  keep content out of a slot is for the slot not to exist.
- **The kind-admission test.** The durable output of the ValueObjectSpec/EnumSpec
  debate was not the removal itself but the rule behind it: *a concept earns a
  GraphSpec kind iff it participates in a graph-native semantic (relationship
  endpoint, command/event subject, ownership boundary, lifecycle) not derivable from
  ModelSpec.* Every future kind candidate (Workflow, Policy, Projection…) now has a
  gate to pass instead of a debate to restart.
- **The rendered graph is not the authored language.** Consumers legitimately want
  value objects in diagrams and "who uses X?" answers. Those are *derived* views over
  ModelSpec references — presentation-level nodes never required language-level kinds.
  Conflating the two was the root error behind the seven-kind design.
- **Dependency-direction bugs show up first in relationships.** The first consumer
  bootstrap had a core module owning a membership relationship targeting an
  extension-owned entity — a core→extension inversion invisible until relationship
  ownership was examined. The fix (owner's `dependsOn` closure must cover both
  endpoints) turned an architecture review finding into a lintable rule.
- **Bidirectional hand-maintained links always drift.** Commands listed
  `possibleEvents` while events listed command triggers — two authored copies of one
  fact. The general principle: author every link in exactly one place and derive the
  reverse.
- **Naming inconsistencies are a symptom, not a style issue.** Three ID casing
  conventions and a suffix-exception for entity files both traced back to unresolved
  architecture (stored-vs-computed qualification; a lint-glob collision with a legacy
  Doc-Kind). When naming won't settle, look for the unresolved decision underneath.

## Design Principles Reinforced

- **Explicit over clever** — the boundary test ("shape change → ModelSpec;
  responsibility change → GraphSpec") is a one-sentence rule anyone can apply.
- **Extensible but not abstract by default** — now enforced by the admission rule
  rather than by taste.
- **Examples may expose weaknesses** — the consumer bootstrap was used as a stress
  test and duly exposed the three biggest flaws (structural drift, ownership
  triplication, dependency inversion). Phase 2 should be run the same way.
- **Rationale is first-class** — the review's quality depended directly on
  BOOTSTRAP.md, alternatives-considered, and open-questions having been maintained.
- New principles added as a result: **Structure lives in ModelSpec** and **One
  authored direction per link** ([principles.md](principles.md)).

## Architectural Mistakes To Avoid

- **Do not let normative documents cite unspecified mechanisms.** If a spec depends
  on something that doesn't exist yet, say "deferred" explicitly.
- **Do not put speculation in frontmatter.** `targetOptions: [ …, future.Resource ]`
  encoded an unresolved design question as a machine-readable field that any
  reference validator must reject. Speculation belongs in prose and open questions.
- **Do not state one fact in two places.** Ownership (three places) and command↔event
  links (two places) both drifted or would have. Derive, don't duplicate.
- **Do not name or link private consumers from the public standard.** SpecScore,
  GraphSpec, and ModelSpec are public; consumer product names and repositories leaked
  into language examples, ADRs, and CLI acceptance criteria and had to be swept out.
  Normative examples use the neutral domain (`reservations`, `catalog`, `directory`,
  `identity`, `scheduling`); consumer specifics are referred to generically ("the
  first consumer bootstrap") when cited as evidence.
- **Do not specify broad tooling surfaces ahead of the language.** ~20 CLI
  subcommands including four overlapping validation verbs were specified against a
  language with no stable ID syntax; every language change threatened a wide contract
  surface. Specs were restaged (v0.2: `new`, `lint`, `list`, `refs`; rest Later).
- **Do not deviate from the neutral example domain in language docs.** One consistent
  running example keeps documents mutually reinforcing and grep-able.

## Advice For Future Phases

- **Treat the first consumer pilot as a falsification exercise.** Its success criterion is
  weaknesses found per artifact authored, not graph size. Model the hard parts
  (Resource, Availability, membership) rather than the easy ones, and write down
  every point where the language felt wrong — that list is the real deliverable.
- **Author the ModelSpec model first for at least one entity, and last for another.**
  The `model:` reference is optional by design; the pilot should test both workflows
  (structure-first and semantics-first) to confirm the optionality is right.
- **Apply the admission rule ruthlessly.** The pilot will surface tempting new kinds
  (Availability, Policy, Resource-as-union). Each must demonstrate a graph-native
  semantic not derivable from ModelSpec before it becomes anything more than an open
  question.
- **Keep the public/private boundary mechanical.** Language changes land in the
  public repos with neutral examples; the pilot graph and its product names stay in
  the consumer repository. If a pilot finding needs to be cited publicly, genericize
  it.
- **Let lint follow the pilot, not precede it.** Phase 3's rule set should encode
  what Phase 2 actually validated, resisting the urge to lint speculative rules.
- **Re-run the lifecycle-states question with data.** The states-on-entity vs
  ModelSpec-enum split is the decision most likely to need revision once real
  lifecycles (booking status, membership status) are modelled.

## Open Questions

None at this time — open architectural questions live in
[open-questions.md](open-questions.md).

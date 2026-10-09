---
format: https://specscore.md/decision-specification
status: In Review
---

# Decision: Records Kind Segment, Collection And Recordset Segments Removed

**Status:** In Review
**Date:** 2026-10-09
**Owner:** alexander.trakhimenok@gmail.com
**Tags:** modelspec, references, namespaces, records, reserved-names
**Source Idea:** graphspec
**Supersedes:** —
**Superseded By:** —

## Context

[Decision 0011](0011-addressable-model-concepts.md) gave model references an optional
kind segment, `modelspec:///<module>.<kind>.<Name>`, with five tokens: `entities`,
`components`, `enums`, `collections` and `recordsets`. It reserved the five as concept
names. It gave collections and recordsets name scopes of their own, addressable in the
three-segment form only.

The tokens name ModelSpec's kinds, and ModelSpec has changed its kinds. On 8 October
2026 its owner, who is also the owner of decision 0011, answered decisions D2, D3 and
D13 of the conceptual design proposal written for
[ModelSpec issue 21](https://github.com/specscore/modelspec/issues/21). ModelSpec
records the answers as three decisions:

| ModelSpec decision | What it changes |
|---|---|
| [0018](https://github.com/specscore/modelspec/blob/main/spec/decisions/0018-entity-becomes-record.md) | `entity` is renamed `record`, called a record type in prose. |
| [0019](https://github.com/specscore/modelspec/blob/main/spec/decisions/0019-collection-and-recordset-removed-three-words-reserved.md) | `collection` and `recordset` are removed. `projection`, `index` and `migration` are reserved words with no content. |
| [0022](https://github.com/specscore/modelspec/blob/main/spec/decisions/0022-prose-now-format-change-on-the-owners-word.md) | The rename is staged: readers accept both spellings first, and the earlier spelling becomes an error last, with an approval of its own. |

Decisions 0018 and 0019 have been in force for ModelSpec's grammar since 9 October
2026; each says so in its observed consequences. That makes part of decision 0011
untrue. A model can declare no collection and no recordset, so nothing answers to
those two kind segments. And `entities` names a kind by a word ModelSpec has left.

The `specscore` CLI follows the change from its release v0.55.0 of 9 October 2026
([specscore/specscore-cli#222](https://github.com/specscore/specscore-cli/pull/222)).
Its specification says that decision 0011 predates the change and that "the decision
that succeeds it is not yet recorded". This file is that record. In the proposal's
order the CLI change belongs to Phase 3, "The neighbours follow", which lists
"SpecScore's graph lint" among the readers that learn both spellings first.

What the owner was asked about SpecScore is narrow. The card for D2 says: "This
supersedes part of decision 0014 and of SpecScore decision 0011". The 0014 it names is
ModelSpec's decision of that number, not this file. The proposal's table
of affected surfaces lists, for SpecScore and GraphSpec, "The reserved kind word
entities in SpecScore decision 0011", with the treatment "Read both". Its hand-off
says: "SpecScore decision 0011 needs a successor for the kind word." The same proposal
lists, under the heading "What I am not asking you to decide", "Any change to
GraphSpec". No card put SpecScore's reference syntax to the owner. The token
`records`, the standing of `entities`, the end of two kind segments and the list of
reserved names were worked out by the proposal's author and by the session that
changed the CLI. The Decision section keeps the owner's answers apart from them.

Named unknowns:

- Which names stay reserved once the transition ends. Six are reserved today. Whether
  `entities`, `collections` and `recordsets` are released when they no longer name a
  kind is not decided here. ModelSpec lists the same question as open in its
  `spec/hcl-authoring.md` and says the list follows this decision, so neither record
  settles it.
- Whether making `entities` an error as a kind segment is covered by the approval that
  ModelSpec decision 0022 requires for the earlier spelling in model files, or needs
  one of its own.
- Whether a reference that spells `entities` is reported, and whether
  `graph lint --fix` rewrites it. The proposal names a rewrite rule. None exists.

## Decision

Decision 0011 is succeeded in part. A model reference names a record type with the
kind segment `records`, still reads `entities` as the same thing, and has no kind
segment for a collection or a recordset.

### What the owner decided

Three answers of 8 October 2026, quoted from the proposal. The card for D2 names
decision 0011, as the Context says. No card and no answer states a kind token.

D2, as the proposal words it:

> Rename ModelSpec's entity to record, called a record type in prose: the block, the
> reference setting and the JSON key. Addresses do not change.

The owner's answer: "Approve record". The proposal notes that this card was edited
after the answer: where it now says "setting", the wording he approved said
"attribute".

D3:

> a. Remove collection and recordset from ModelSpec. b. Make projection, index and
> migration reserved words with no content.

The owner's answer: "part a, Remove both; part b, Reserve all three". The card says
where the need behind decision 0011 goes: "After the change such a specification names
the record type, and the recordset once a database exists."

D13:

> Correct the prose now. Start the format change only after you tell me the launch is
> done. Read both spellings until the last registered model is pinned anew; making
> the old spelling an error then needs its own approval.

The owner's answer: "Approve".

### What follows for model references

Recorder's note, not the owner's words. Everything in this subsection is a consequence
drawn by the proposal's author and by the session that changed the CLI. The owner has
not ruled on it.

```text
modelspec:///<module>.<Name>             # two-segment: record type | component | enum
modelspec:///<module>.<kind>.<Name>      # three-segment, explicit kind
```

- `<kind>` is one of `records`, `components` and `enums`.
- `entities` is read as the earlier spelling of `records`. `<module>.entities.<Name>`
  and `<module>.records.<Name>` address the same record type.
- No kind segment exists for a collection or a recordset. `<module>.collections.<Name>`
  and `<module>.recordsets.<Name>` are not references, because no model can declare
  what they would address.
- Six names are reserved and cannot name a concept: `records`, `entities`,
  `components`, `enums`, `collections` and `recordsets`.
- `entities` stays readable for as long as ModelSpec's earlier spelling is readable in
  a model file. It becomes an error in the last step of the order that ModelSpec
  decision 0022 sets, with the approval that step requires.

The proposal supports the first two points only in part. It names the kind word
`entities` as the thing that changes and gives the treatment "Read both". It never
writes the token `records`. The CLI change chose it; it is the plural of the new
keyword, and ModelSpec's JSON key has the same name. The proposal does not mention the
kind segments `collections` and `recordsets` in its row for SpecScore. Of the address
built for them it says only that it "has no user outside tests". It does not say which
names stay reserved. It does not say that the kind segment follows ModelSpec's last
step. That reading applies the owner's answer to D13, which is about spellings in a
model, to a reference.

Before and after, in a module `catalog` with a record type `Asset` and an enum
`AssetCategory`. Both columns were checked against a release: v0.54.2 for the first,
v0.55.0 for the second.

| Reference | Under decision 0011 | Now |
|---|---|---|
| `modelspec:///catalog.Asset` | Resolves in the shared namespace. | Unchanged. |
| `modelspec:///catalog.entities.Asset` | Resolves. | Resolves, as the earlier spelling. No notice. |
| `modelspec:///catalog.records.Asset` | Error: unknown kind segment. | Resolves. |
| `modelspec:///catalog.enums.AssetCategory` | Resolves. | Unchanged. |
| `modelspec:///catalog.collections.assets` | Resolves to a collection. | Error: unknown kind segment. |
| `modelspec:///catalog.recordsets.asset_summary` | Resolves to a recordset. | Error: unknown kind segment. |

### Decision 0011, sentence by sentence

The sentences of its Decision section, in order.

| Decision 0011 says | Standing |
|---|---|
| Modules live in the bare-ID namespace. | Stands. |
| Owned artifacts live in the per-module qualified namespace, and a module node never occupies a qualified-ID slot. | Stands. The entity in its example is a graph entity. GraphSpec's kind `entity` is not renamed. |
| The two-segment form resolves against one flat namespace per module, formed by entities, components and enums. | Stands. ModelSpec now calls the first of the three a record type. |
| An optional kind segment extends the form. | Stands. |
| The two-segment and three-segment forms, the first two lines of its example. | Stand. |
| `modelspec:///vault.collections.vaults` and `modelspec:///vault.recordsets.vault_summary`, the last two lines of its example. | Succeeded. Neither is a reference now. |
| `<kind>` is one of `entities`, `components`, `enums`, `collections` and `recordsets`. | Succeeded. The tokens are `records`, `components` and `enums`, and `entities` is read as `records`. The tokens stay plural. |
| These five tokens are reserved as concept names. | Succeeded as to the list: six names are reserved. The rule that a kind token cannot name a concept stands. |
| Collections and recordsets get their own name scopes and are addressable only in the three-segment form. | Succeeded. ModelSpec has neither construct, so there is no scope and no address. |
| The two-segment form stays safe because it resolves only in the shared namespace. | Stands. |
| Graph-to-graph references stay two-segment. | Stands. |
| HCL is untouched: the attribute name is the kind selector. | Stands. Its example is now spelled `record = "identity.Team"`, and `entity =` is still read (ModelSpec decision 0018). |

Outside that section, the context and the four declined alternatives of decision 0011
stand. So does its rationale, at the cost of six reserved words where it counted five.
Three of its predicted consequences have changed. The resolver does not index
collections and recordsets. ModelSpec documents no name scopes for them, and lists six
reserved names. And a feature specification has no reference to a collection or a
recordset: it names the record type it reads, by the two-segment form.

### Decided, implemented, and not yet

| What | Standing | Since |
|---|---|---|
| ModelSpec renames `entity` to `record`, removes `collection` and `recordset`, and stages the rename. | Decided by the owner. | 8 October 2026. In force in ModelSpec's grammar from 9 October 2026, with its reference CLI version 0.2.0. |
| This decision. | Recorded. Its status is in the header above. | — |
| The kind segment `records` resolves. | Implemented. | `specscore` CLI release v0.55.0. |
| The kind segment `entities` resolves as `records`. | Implemented. Not an error and not reported. | Unchanged in v0.55.0. |
| The kind segments `collections` and `recordsets`. | An error, under the rule `graph-model-ref-resolves`. | v0.55.0. |
| A concept named `records`. | An error, under the rule `graph-model-reserved-name`. | v0.55.0. The other five names were reserved before it. |
| A model file that declares `collection`, `recordset`, `column`, `projection`, `index` or `migration`. | An error, under `graph-model-ref-resolves`. The removal is not staged. | v0.55.0. |
| A model file in the earlier spelling: `entity`, `property`, `entity =`. | Read in full. One notice a file, under the advisory rule `graph-model-deprecated-spelling`, which never fails a run. | v0.55.0. |
| The kind segment `entities` as an error. | Not in force. This record places it in ModelSpec's last step. The owner has not ruled on it, and nothing implements it. | — |
| A notice for a reference that spells `entities`, and a `--fix` rule that rewrites it. | Not implemented. | — |
| The final list of reserved names. | Not decided. | — |

### How the succession is recorded

This file's `Supersedes` field is empty. Naming decision 0011 there would archive it
whole, and most of it stands. Decision 0011 stays approved and unedited, and carries a
dated entry in its observed consequences that points here.

## Rationale

Recorder's reasoning, built on decision 0011's own. That decision put the kind segment
where kinds are structural facts, which is in ModelSpec. So the tokens are ModelSpec's
kinds, and they follow when ModelSpec renames one kind and removes two. A token for a
kind that ModelSpec does not have would be a rule of SpecScore's own making, and
[decision 0003](0003-one-structural-language.md) leaves structure to ModelSpec.

The rename is read in both spellings because that is the treatment the proposal gives
SpecScore, and because it costs one more accepted word. The two removed kind segments
get no such period. A model that declares a collection or a recordset is refused, so a
reference with either segment could resolve to nothing.

All six names stay reserved until a decision releases one. Releasing a reserved name
later breaks no model. Reserving a free name later could.

## Declined Alternatives

None of these was put to the owner as a choice about SpecScore's syntax. Each names
who weighed it.

### Name decision 0011 in the Supersedes field

The format's own way to record a successor. Declined by the recorder: it moves
decision 0011 to the archive as a whole, and its two graph namespaces, its shared
namespace and its two rules about where the kind segment does not go are still in
force. ModelSpec met the same case and recorded each succession as a dated entry in
the succeeded decision.

### Keep entities as the only token for a record type

No reference would change. Declined by the proposal, which lists the kind word among
the things the rename reaches and names decision 0011 on the card for D2. The
recorder's reason: a reference would name a record type by a word that ModelSpec has
left and that GraphSpec uses for a different thing.

### Replace entities with records in one step

One token, and no earlier spelling to retire later. Declined by the proposal: its
treatment for SpecScore is "Read both", and the owner approved a staged rename in
which readers accept both spellings before anything becomes an error.

### Keep collections and recordsets as deprecated kind segments

A reference written under decision 0011 would keep parsing. Declined in the CLI
change: a model that declares either construct is refused, so such a reference could
never resolve. The proposal says the address form built for them "has no user outside
tests".

## Consequences at Decision Time

- A tree that holds `<module>.collections.<Name>` or `<module>.recordsets.<Name>`
  fails `specscore graph lint` from release v0.55.0. The proposal found no use of that
  form outside tests.
- A reference that spells `entities` keeps resolving, and nothing tells its author to
  change it until a notice or a rewrite rule exists.
- A feature specification that says what it reads names a record type. The lint for
  such references in feature specifications is still future work, as decision 0011
  said.
- The CLI's specification can cite this decision where it says the successor is not
  yet recorded. That sentence is in another repository.
- ModelSpec's open question about the reserved names stays open. This record states
  the list for the transition and not the final one.
- Diagnostics of release v0.55.0 still call a record type an entity, as in "is an
  entity, not an enum".
- This repository has no graph module and no model file, so no artifact here changes.
  Its GraphSpec glossary and decision log state the tokens as they are now.

## Observed Consequences

None observed yet.

## Affected Features

- graphspec
- modelspec-validation

---
*This document follows the https://specscore.md/decision-specification*

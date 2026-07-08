# GraphSpec Policy Layer — Design Exploration

Discussion draft feeding a future decision (not itself normative). Escalated by the
Family Identity pilot (findings FA5/FA6 in the backstage
`spec/graph/family-pilot-notes.md`), whose prose rules are this exploration's
requirements corpus. Related open question: "A home for policy" in
[open-questions.md](open-questions.md).

## The problem, shown in today's artifacts

The `familycard.share-identity` command carries these rules **in prose only**
(Description + Failure Cases):

| # | Rule (as written today) | What kind of rule it is |
|---|---|---|
| R1 | A share of a ward's identity requires a `granted` consent whose guardianship covers that subject | conditional requirement across 3 entities |
| R2 | A granted Consent over a revoked Guardianship is void | cross-entity lifecycle dependency |
| R3 | Revoking a consent cascade-revokes the shares issued under it | lifecycle propagation |
| R4 | A share's scope must fit within its consent's scope | value ordering between enum values |
| R5 | Only the guardianship's guardian may grant consent | actor qualification (FA6) |
| R6 | Guardianship state `expired` is reachable only when `type = temporary` | state × data constraint |

Today the CLI validates every *reference* in the graph but none of these *rules*:
delete the `consent` entity and R1's prose silently dangles; rename the `granted`
lifecycle state and R2 refers to a state that no longer exists; an implementer or
AI agent reads six rules with no identity, no inventory, and no way to trace a test
back to the rule it verifies.

## What machine-readability would buy (use cases)

- **UC1 — dangling-rule lint**: a rule mentioning `familycard.consent` or state
  `granted` breaks loudly when the entity or state changes.
- **UC2 — rule identity & traceability**: each rule gets an addressable id
  (`familycard.policies/guardian-consent-required`), so commits can carry
  `Verifies:` trailers and `specscore verify` can report per-rule coverage.
- **UC3 — permission matrix**: "which commands is a `guardian` allowed to
  perform, over what?" becomes a query, not an audit.
- **UC4 — agent guidance**: an implementing agent receives the rule set as
  structured input instead of mining Failure Cases prose.
- **UC5 — runtime guard codegen** *(far future)*: generate precondition checks.
- **UC6 — documentation**: rendered per-entity "rules that govern me" sections.

## Tier 1 — structured prose: a `rules:` block

Rules stay sentences, but gain identity and declared references:

```yaml
# familycard/entities/identity-share.md
rules:
  - id: ward-share-needs-consent          # R1
    refs: [familycard.consent, familius.guardianship, contactius.contact]
    text: >
      A share whose subject is a ward requires a granted consent whose
      guardianship's ward is the subject.
  - id: scope-within-consent              # R4
    refs: [familycard.consent]
    text: A share's scope must fit within its consent's scope.
```

**Lint can check:** ids are kebab-case and unique; every `refs` entry resolves
(UC1); nothing else. **It cannot check** that the sentence means anything.
**Buys:** UC1, UC2, most of UC4/UC6. **Costs:** one optional key; zero new
language semantics. The honest tier: it never pretends the machine understands
the rule.

## Tier 2 — an expression language

```yaml
rules:
  - id: ward-share-needs-consent
    when: "subject.isWard"
    require: "consent.status == 'granted' && consent.guardianship.ward == subject"
```

Looks precise; is a trap at this layer. The CLI cannot *evaluate* these (there is
no instance data at spec time), so validation is only parsing — precision theatre.
Someone must own the grammar, semantics, versioning, and an evaluator in every
consumer. History's verdict on spec-level constraint languages (OCL) is that they
rot unexecuted. **Position: not until a runtime consumer exists — and then adopt
an existing language (e.g. CEL), never invent one.**

## Tier 3 — policy as a graph kind

A sixth kind with its own collection (`policies/`), whose clauses are built from a
**small typed vocabulary whose operands are only things the graph already knows** —
entities, commands, lifecycle states, enum values, roles, actors. No expressions.

```yaml
# familycard/policies/guardian-consent-required.md   (R1 + R5 together)
kind: policy
id: guardian-consent-required
applies:
  command: familycard.share-identity
when:                                  # condition on the command's inputs
  input: subject
  is-role: {relationship: familius.household-member, role: child}
requires:
  - entity: familycard.consent
    in-state: granted
  - actor-is: {entity: familius.guardianship, model-role: guardian}   # R5
summary: Sharing a ward's identity requires the guardian's granted consent.
```

```yaml
# familycard/policies/consent-void-on-revocation.md   (R2 + R3)
kind: policy
id: consent-void-on-revocation
applies:
  entity: familycard.consent
invariant:
  - when-referenced: {entity: familius.guardianship, in-state: revoked}
    then: {self-state: revoked}
```

**Lint can now check real things:** `share-identity` exists; `subject` is one of
its inputs; `granted` ∈ `consent.lifecycle.states`; `revoked` ∈ both lifecycles;
`guardian` is a property of the Guardianship model; `child` is a role the
`household-member` relationship's metadata enum actually carries. Renaming a
state breaks the policy loudly — UC1 through UC4 fully, UC5's input ready.

**The honest limit, shown by R4:** "scope `school` fits within scope `full`" is an
*ordering between enum values* — knowledge the graph does not have and should not
acquire. R4 stays a Tier-1 text rule forever, or the ordering becomes model data.
A good clause vocabulary knows what it cannot say.

**FA6 lands here for free:** actor qualification is the `actor-is` clause on a
policy that `applies` to a command — CommandSpec's `actors:` stays the simple
type list it is today.

## Recommendation

1. **Now (v0.2-compatible):** Tier 1 `rules:` blocks — optional key on entity /
   relationship / command artifacts; lint = id shape + refs resolve. The family
   pilot's six rules migrate immediately and get identity.
2. **v0.3 target:** Tier 3 `policy` kind, its clause vocabulary grown bottom-up
   from the corpus (start with `applies`, `in-state`, `actor-is`,
   `when-referenced/then`; add clause forms only when a second pilot needs them).
   Prerequisite it usefully forces: lifecycle states and enum values become
   addressable — the intra-concept fragment syntax decision 0010 reserved.
3. **Never by default:** Tier 2 expressions; revisit only with a runtime
   consumer, and then via CEL, not an invented language.

## Questions to settle before a decision

1. **Vocabulary of the word "policy"** — `policy` vs `rule` vs `invariant` as the
   kind name (policies read as imposed-on-top; invariants as intrinsic; one kind
   or two?).
2. **Ownership & placement** — Tier-1 rules live on the artifact they constrain;
   Tier-3 policies live in a module's `policies/`. Does a policy's owning module
   follow the same downstream-ownership rule as relationships? (It should.)
3. **Migration** — do Tier-1 `rules:` blocks survive Tier 3 (small rules stay
   local, cross-cutting ones promote — mirroring the relationship→association-
   object rule), or is Tier 1 a temporary bridge?
4. **Addressability prerequisite** — green-light designing state/enum-value
   fragments (`modelspec:///familius.GuardianshipType#temporary`,
   `familius.guardianship#state:revoked`) as part of this, or defer?

## Open Questions

Tracked in the questions section above until a decision is drafted.

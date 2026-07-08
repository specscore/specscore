# GraphSpec Design Principles

## Domain First

GraphSpec describes the domain vocabulary before implementation, API, UI, or test details.

## Graph Is Canonical

The domain graph should be the canonical source for nouns, relationships, and lifecycle language used by downstream specs.

## Markdown First

Markdown is the primary authoring format. YAML provides structured data for tools.

## Human and Machine Readable

A GraphSpec artifact should be understandable in a pull request and parseable by tooling.

## Explicit Over Clever

Prefer clear fields, examples, and rationale over compact abstractions that require interpretation.

## Extensible but Not Abstract by Default

The bootstrap should leave extension points, but should not invent abstractions before real examples demand them.

## Independent Core

GraphSpec should not depend on FeatureSpec. FeatureSpec and other SpecScore family members may reference GraphSpec.

## Rationale Is First-Class

Open questions, alternatives, rejected options, and modelling uncertainty are part of the design record.

## Examples May Expose Weaknesses

Consumer examples should document GraphSpec improvement opportunities instead of working around weak parts of the language.


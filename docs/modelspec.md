# ModelSpec Support

ModelSpec is an independent open specification language for application data models.

SpecScore validates ModelSpec but does not own its semantics.

## What SpecScore Should Support

- linting
- structural validation
- semantic checking
- located diagnostics
- repository-wide checks when configured

Future CLI support should reuse existing command conventions:

```text
specscore lint
specscore lint modelspec
specscore validate
```

Existing `specscore spec lint` workflows should remain compatible while command
aliases and ModelSpec-specific validation mature.

## Boundaries

ModelSpec is not a sub-language of GraphSpec.

GraphSpec describes connected domain models. ModelSpec describes application data
models, storage-neutral schemas, projections, and migration metadata.

OpenVaultDB consumes ModelSpec directly. It may use SpecScore validation in
development or CI, but it depends on ModelSpec rather than SpecScore.

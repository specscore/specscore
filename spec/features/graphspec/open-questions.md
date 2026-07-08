# Open Questions

## Specification Kinds

- Should PropertySpec remain a first-class specification kind?
- Should properties instead become intrinsic parts of EntitySpec and ValueObjectSpec?
- Should RelationshipSpec remain first-class?
- Should WorkflowSpec exist?
- Should PolicySpec exist?
- Should ProjectionSpec exist?
- Should ModuleSpec own relationships as well as entities, commands, and events?

## Commands and Events

- Should commands reference events?
- Should events reference commands?
- Should command-event links be examples, possible triggers, or normative contracts?
- How should events from integrations, timers, external systems, and automation be represented?

## Ownership and Modules

- How should cross-module ownership be represented?
- Should ModuleSpec describe runtime instances or only architectural modules?
- Can a relationship be owned by one module while referencing entities owned by other modules?
- How should shared modules and core modules avoid becoming dependency sinks?
- How should distributed `graph/` roots across module repos be indexed and resolved?
- Should GraphSpec add any link metadata beyond the unified SpecScore cross-repo linking system?
- If version constraints are needed, should they live entirely in the unified SpecScore linkage model?

## Modelling Semantics

- Should inheritance be represented?
- Should composition be represented?
- Should mixins exist?
- How should lifecycle/state machines be represented?
- How should invariants and constraints be expressed?
- How should permissions integrate with GraphSpec?
- How should deprecation be represented?

## Enums and Value Objects

- Should EnumSpec remain independent?
- Should enums become specialised ValueObjectSpec?
- How should externally governed enumerations be represented?

## Tooling and Generation

- Should GraphSpec eventually evolve into a DSL?
- Should GraphSpec generate TypeSpec?
- Should GraphSpec generate OpenAPI?
- Should GraphSpec generate diagrams?
- What validation levels should exist?
- What should be linted before the language is stable?

## Self-Hosting

- Should GraphSpec eventually become self-hosting?
- At what maturity should GraphSpec stop being defined using FeatureSpec and begin defining itself?

## Sneat-Derived Questions

- Is a Space member best represented as a RelationshipSpec, a role assignment, an association object, or a specialised entity?
- Is a bookable Resource an Assetus Asset, a Contact, a union of several entity types, or a Bookius abstraction?
- Should Availability belong to Calendarius, Assetus, Bookius, or be split between calendar capacity and booking rules?
- How should a core relationship reference a Contact owned by Contactius without creating an unwanted core-to-extension dependency?

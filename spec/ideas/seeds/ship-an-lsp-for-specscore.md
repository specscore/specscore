---
type: sidekick-seed
captured_by: user
status: queued
---
# Ship an LSP for SpecScore

## What it would do

A Language Server Protocol implementation for SpecScore Markdown+YAML: hover-docs on keywords (`feature`, `requirement`, `acceptance-criteria`, `scenario`), autocomplete for frontmatter fields and reference IDs (R1, AC-2), inline diagnostics that match `specscore lint` output, go-to-definition for cross-references.

## Why it could be valuable

- **Native authoring feel.** Devs trust LSP feedback for code; an LSP for SpecScore gives the same loop while writing a Feature/Requirement/AC.
- **Errors at typing time.** Lint failures surface inline instead of after a CLI run — shorter iteration loop.
- **Discoverability.** Hover-docs let newcomers learn the format without leaving the editor.
- **Positioning.** Strengthens the "Lint your specs like you lint your code" message — editor experience parity with real linters.
- **Standalone-protocol story.** Third-party adopters get an editor experience that doesn't depend on Synchestra-ecosystem tooling.

## Open questions for consilium

- Single-editor (VS Code) first, or generic LSP server from day one?
- Extend the existing Go CLI with an LSP mode, or ship a Node/TS LSP?
- Solo-builder ROI: worth it now, or wait until there's a second contributor?
- Cheaper interim: would a tree-sitter grammar + linter watch mode deliver most of the value for a fraction of the cost?

## Context

Captured while drafting the specscore.md landing page IA in `synchestra-marketing`. The hero subhead originally promised "with a linter, an LSP, and the editor integrations you'd expect"; the LSP promise was dropped because no LSP ships today and the solo builder has no clear path to ship one yet. This seed preserves the idea for later consilium review.

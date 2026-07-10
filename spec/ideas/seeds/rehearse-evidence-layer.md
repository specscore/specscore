---
captured_by: user
status: queued
---
# Rehearse repositioned: AC-bound scenario format + thin runner in specscore-cli (specscore rehearse run), declarative http/sql/file check blocks (Hurl-embed for HTTP), emitting verified-behavior evidence to Studio — not a standalone test runner

Founder question 2026-07-10: Rehearse imagined as markdown scripting for deterministic testing, stuck as AI-verification format, lagging; interested in Postman-like deterministic HTTP direction.

Assessment (Claude, same day): the runner competes with mature tools (why it stalled); the unique value is the BINDING — scenario = executable form of <feature>#ac:<slug>, colocated in _tests/. Validated accidentally by the Studio Phase-0 build: 11 agent-authored executable scenarios with Verifies: frontmatter + bash blocks, all passing (specscore-cli spec/features/cli/studio/index/_tests/).

Direction: (1) fold runner into specscore-cli as `specscore rehearse run` (fixes distribution + the synchestra-io module-path orphanhood); (2) add declarative check blocks: http (embed Hurl syntax, delegate to hurl binary when present — do NOT build an HTTP client), later sql/file asserts; bash stays the escape hatch; captures/variables for Postman-style chaining; (3) per-AC pass/fail reports become verified-behavior class facts in Studio's evidence ladder — Rehearse = the acceptance-evidence producer of the stack. Standalone value modest (Hurl exists); stack value high (completes spec→impl→proof→evidence loop).

// Format signals taken from public docs and repos read for this page.
// OpenSpec README (Fission-AI/OpenSpec): proposal.md, specs/, design.md,
// tasks.md, "## ADDED Requirements", "### Requirement:", "#### Scenario:",
// **WHEN** / **THEN** / SHALL.
// Spec Kit templates (github/spec-kit): spec-template.md (User Scenarios &
// Testing, FR-###, Given/When/Then, Edge Cases, Success Criteria),
// tasks-template.md (`- [ ] T001`), constitution-template.md
// ("# … Constitution", Core Principles, Governance).
// Kiro feature specs (kiro.dev/docs/specs/feature-specs/, 4 Aug 2026):
// requirements.md, design.md, tasks.md, WHEN … THE SYSTEM SHALL.
// BMAD planning path (docs.bmad-method.org/plan/choose-a-planning-path/):
// `_bmad-output`, `prd-*.md`, `brief-*.md`, `architecture-*.md`,
// `tickets.toml`, and the bmad-prd / bmad-architecture / bmad-product-brief skills.
// Task Master (eyaltoledano/claude-task-master): `.taskmaster/docs/prd.txt`,
// `.taskmaster/tasks/tasks.json`, fields id/title/description/status/
// dependencies/testStrategy. The published tasks.json nests tasks under a tag.
// EARS: WHEN/IF/WHILE/WHERE … SHALL, as published on the Kiro page and in
// the Easy Approach to Requirements Syntax.

export const FORMAT_IDS = [
  'specscore',
  'openspec',
  'spec-kit',
  'kiro',
  'bmad',
  'task-master',
  'ears',
  'prd',
  'rfc',
  'user-stories',
  'markdown',
];

const EARS_LINE = /^(?:while|when|if|where)\b[\s\S]{0,400}\bshall\b/i;

function joined(files) {
  return files.map((file) => file.text || '').join('\n');
}

function paths(files) {
  return files.map((file) => (file.path || '').replace(/\\/g, '/').toLowerCase());
}

function count(text, re) {
  const flags = re.flags.includes('g') ? re.flags : `${re.flags}g`;
  const copy = new RegExp(re.source, flags);
  return (text.match(copy) || []).length;
}

function taskArrays(value, out = []) {
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value.tasks)) out.push(value.tasks);
  if (Array.isArray(value)) {
    for (const item of value) taskArrays(item, out);
    return out;
  }
  for (const child of Object.values(value)) taskArrays(child, out);
  return out;
}

function looksLikeTasks(tasks) {
  return tasks.some((task) => task && typeof task === 'object' && 'title' in task && ('testStrategy' in task || 'dependencies' in task || 'status' in task));
}

/**
 * @param {{ path?: string, text: string }[]} files
 */
export function detectFormat(files) {
  const text = joined(files);
  const names = paths(files);
  const scores = Object.fromEntries(FORMAT_IDS.filter((id) => id !== 'markdown').map((id) => [id, 0]));
  const signals = [];

  const add = (id, points, signal) => {
    scores[id] += points;
    if (signal) signals.push({ format: id, signal });
  };

  if (/^format:\s*https:\/\/specscore\.md\//m.test(text)) add('specscore', 6, 'format: https://specscore.md/');
  if (/## Open Questions/.test(text)) add('specscore', 2, '## Open Questions');
  if (/^### AC: /m.test(text)) add('specscore', 3, '### AC:');
  if (/\*This document follows the https:\/\/specscore\.md\//.test(text)) add('specscore', 3, 'adherence footer');
  if (/\*\*Source Ideas:\*\*/.test(text)) add('specscore', 2, '**Source Ideas:**');
  if (names.some((name) => /spec\/features\/.+\/readme\.md$/.test(name))) add('specscore', 2, 'spec/features/**/README.md');

  if (/^## (ADDED|MODIFIED|REMOVED|RENAMED) Requirements/m.test(text)) add('openspec', 5, '## ADDED/MODIFIED/REMOVED/RENAMED Requirements');
  if (/^### Requirement:/m.test(text)) add('openspec', 2, '### Requirement:');
  if (/^#### Scenario:/m.test(text)) add('openspec', 2, '#### Scenario:');
  if (/\*\*WHEN\*\*/.test(text) && /\*\*THEN\*\*/.test(text)) add('openspec', 2, '**WHEN** / **THEN**');
  if (names.some((name) => name.includes('openspec/'))) add('openspec', 2, 'openspec/');
  if (names.some((name) => name.endsWith('/proposal.md') || name === 'proposal.md')) add('openspec', 2, 'proposal.md');
  if (/^## Why/m.test(text) && /^## What Changes/m.test(text)) add('openspec', 2, '## Why + ## What Changes');

  if (/^## User Scenarios\s*&\s*Testing/m.test(text)) add('spec-kit', 5, '## User Scenarios & Testing');
  if (/\*\*FR-\d+/.test(text)) add('spec-kit', 2, '**FR-###**');
  if (/\*\*Feature Branch\*\*/.test(text)) add('spec-kit', 2, '**Feature Branch**');
  if (/^- \[[ xX]\] T\d+/m.test(text)) add('spec-kit', 3, '- [ ] T###');
  if (/\/speckit[.-]/i.test(text)) add('spec-kit', 3, '/speckit');
  if (names.some((name) => name.endsWith('/constitution.md') || name === 'constitution.md')
    || (/Constitution/.test(text) && /## Core Principles/.test(text) && /## Governance/.test(text))) {
    add('spec-kit', 4, 'Constitution / Core Principles / Governance');
  }
  if (names.some((name) => /(^|\/)specs\/\d{3}-/.test(name))) add('spec-kit', 2, 'specs/NNN-feature/');

  const earsLines = text.split('\n');
  let earsHits = 0;
  for (let i = 0; i < earsLines.length; i += 1) {
    const line = earsLines[i].trim();
    const pair = `${line} ${earsLines[i + 1] || ''}`.trim();
    if (EARS_LINE.test(line) || EARS_LINE.test(pair)) earsHits += 1;
  }
  const hasRequirementsMd = names.some((name) => name.endsWith('/requirements.md') || name === 'requirements.md');
  if (hasRequirementsMd) add('kiro', 3, 'requirements.md');
  if (earsHits > 0 && (hasRequirementsMd || /^### Requirement\b/m.test(text))) add('kiro', 3, 'WHEN … THE SYSTEM SHALL');
  if (names.some((name) => name.endsWith('/design.md')) && names.some((name) => name.endsWith('/tasks.md'))) {
    add('kiro', 2, 'design.md + tasks.md');
  }

  if (earsHits >= 2) add('ears', Math.min(4, earsHits), 'EARS WHEN/IF/WHILE/WHERE … SHALL');
  else if (earsHits === 1 && !hasRequirementsMd) add('ears', 2, 'EARS sentence');

  if (names.some((name) => name.includes('_bmad-output'))) add('bmad', 4, '_bmad-output/');
  if (names.some((name) => /(^|\/)(prd|brief|architecture)-[^/]+\.md$/.test(name) || name.endsWith('/tickets.toml'))) {
    add('bmad', 3, 'prd-/brief-/architecture- or tickets.toml');
  }
  if (/\bbmad-(prd|architecture|product-brief|agent-po|ux)\b/.test(text)) add('bmad', 4, 'bmad-* skill name');

  let taskMaster = false;
  for (const file of files) {
    const name = (file.path || '').toLowerCase();
    if (!name.endsWith('.json') && !text.trim().startsWith('{')) continue;
    try {
      const parsed = JSON.parse(file.text);
      if (taskArrays(parsed).some(looksLikeTasks)) taskMaster = true;
    } catch {
      /* not JSON */
    }
  }
  if (taskMaster) add('task-master', 6, 'tasks.json fields (testStrategy / dependencies)');
  if (names.some((name) => name.includes('.taskmaster/'))) add('task-master', 3, '.taskmaster/');
  if (/task-master parse-prd/.test(text)) add('task-master', 2, 'task-master parse-prd');

  const storyHits = count(text, /^as an?\b.+\bi want\b/im);
  if (storyHits >= 2 && scores['spec-kit'] < 5) add('user-stories', 4, 'As a … I want …');

  if ((/^## Abstract/m.test(text) && (/^## Motivation/m.test(text) || /^## Specification/m.test(text)))
    || /^Request for Comments:\s*\d+/m.test(text)) {
    add('rfc', 5, 'RFC abstract / motivation');
  }

  const prdName = names.some((name) => /(^|\/)prd[^/]*\.(md|txt)$/.test(name))
    || /^#\s+.*\bPRD\b/m.test(text)
    || /product requirements document/i.test(text);
  if (prdName && scores.bmad < 4 && scores['task-master'] < 6) add('prd', 4, 'PRD title or filename');
  if (/^## (Goals|Objectives|Non-Goals|Problem)\b/m.test(text) && scores.prd > 0) add('prd', 1, 'Goals / Problem section');

  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const [topId, topScore] = ranked[0];
  const second = ranked[1][1];
  let format = topId;
  let confidence = 'medium';
  if (topScore < 3) {
    format = 'markdown';
    confidence = 'low';
  } else if (topScore >= 5 && topScore - second >= 2) {
    confidence = 'high';
  }
  return {
    format,
    confidence,
    scores,
    signals: signals.filter((item) => item.format === format || format === 'markdown'),
  };
}

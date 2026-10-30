// Format-convention checks. Cited from the same public sources as detect.mjs.
// They do not change the universal quality score.

function finding(partial) {
  return { origin: 'convention', status: 'warn', line: null, file: null, params: {}, ...partial };
}

function has(text, re) {
  return re.test(text);
}

/**
 * @param {string} format
 * @param {{ path?: string, text: string }[]} files
 */
export function conventionFindings(format, files) {
  const text = files.map((file) => file.text || '').join('\n');
  const names = files.map((file) => (file.path || '').replace(/\\/g, '/'));
  const lower = names.map((name) => name.toLowerCase());
  const out = [];

  if (format === 'openspec') {
    const delta = has(text, /^## (ADDED|MODIFIED|REMOVED|RENAMED) Requirements/m);
    const proposal = has(text, /^## Why/m) && has(text, /^## What Changes/m);
    if (delta) {
      if (!has(text, /^### Requirement:/m)) out.push(finding({ id: 'openspec/requirement', key: 'os-requirement', fixKey: 'os-requirement-fix' }));
      else out.push(finding({ id: 'openspec/requirement', status: 'pass', key: 'os-requirement-pass' }));
      if (!has(text, /\bSHALL\b/)) out.push(finding({ id: 'openspec/shall', key: 'os-shall', fixKey: 'os-shall-fix' }));
      else out.push(finding({ id: 'openspec/shall', status: 'pass', key: 'os-shall-pass' }));
      if (!has(text, /^#### Scenario:/m)) out.push(finding({ id: 'openspec/scenario', key: 'os-scenario', fixKey: 'os-scenario-fix' }));
      else if (!(/\*\*WHEN\*\*/.test(text) && /\*\*THEN\*\*/.test(text))) out.push(finding({ id: 'openspec/when', key: 'os-when', fixKey: 'os-when-fix' }));
      else out.push(finding({ id: 'openspec/scenario', status: 'pass', key: 'os-scenario-pass' }));
    }
    if (proposal || lower.some((name) => name.endsWith('proposal.md'))) {
      for (const section of ['Why', 'What Changes', 'Impact']) {
        if (!has(text, new RegExp(`^## ${section}$`, 'm'))) {
          out.push(finding({ id: `openspec/proposal-${section}`, key: 'os-proposal-missing', params: { section }, fixKey: 'os-proposal-fix' }));
        }
      }
      if (has(text, /^## Why$/m) && has(text, /^## What Changes$/m) && has(text, /^## Impact$/m)) {
        out.push(finding({ id: 'openspec/proposal', status: 'pass', key: 'os-proposal-pass' }));
      }
    }
    if (!delta && !proposal) {
      out.push(finding({ id: 'openspec/shape', key: 'os-shape', fixKey: 'os-shape-fix' }));
    }
    const companions = ['proposal.md', 'design.md', 'tasks.md'];
    const missing = companions.filter((name) => !lower.some((path) => path.endsWith(`/${name}`) || path === name));
    if (files.length === 1 && missing.length) {
      out.push(finding({ id: 'openspec/files', status: 'info', key: 'os-files', params: { files: missing.join(', ') } }));
    }
  }

  if (format === 'spec-kit') {
    const spec = has(text, /^## User Scenarios\s*&\s*Testing/m) || lower.some((name) => name.endsWith('/spec.md') || name === 'spec.md');
    if (spec) {
      if (!has(text, /Acceptance Scenarios|\*\*Given\*\*|\*\*When\*\*|\*\*Then\*\*/)) {
        out.push(finding({ id: 'speckit/scenarios', key: 'sk-scenarios', fixKey: 'sk-scenarios-fix' }));
      } else out.push(finding({ id: 'speckit/scenarios', status: 'pass', key: 'sk-scenarios-pass' }));
      if (!has(text, /\*\*FR-\d+/)) out.push(finding({ id: 'speckit/fr', key: 'sk-fr', fixKey: 'sk-fr-fix' }));
      else out.push(finding({ id: 'speckit/fr', status: 'pass', key: 'sk-fr-pass' }));
      if (!has(text, /^### Edge Cases/m)) out.push(finding({ id: 'speckit/edge', key: 'sk-edge', fixKey: 'sk-edge-fix' }));
      else out.push(finding({ id: 'speckit/edge', status: 'pass', key: 'sk-edge-pass' }));
      if (!has(text, /\*\*SC-\d+/)) out.push(finding({ id: 'speckit/sc', key: 'sk-sc', fixKey: 'sk-sc-fix' }));
      else out.push(finding({ id: 'speckit/sc', status: 'pass', key: 'sk-sc-pass' }));
      if (/NEEDS CLARIFICATION/.test(text)) out.push(finding({ id: 'speckit/clarify', key: 'sk-clarify', fixKey: 'sk-clarify-fix' }));
    }
    if (has(text, /^- \[[ xX]\] T\d+/m)) out.push(finding({ id: 'speckit/tasks', status: 'pass', key: 'sk-tasks-pass' }));
    if (files.length === 1) {
      out.push(finding({ id: 'speckit/set', status: 'info', key: 'sk-set' }));
    }
  }

  if (format === 'kiro') {
    const ears = text.split('\n').some((line) => /^(when|if|while|where)\b[\s\S]{0,400}\bshall\b/i.test(line.trim()));
    if (!ears) out.push(finding({ id: 'kiro/ears', key: 'kiro-ears', fixKey: 'kiro-ears-fix' }));
    else out.push(finding({ id: 'kiro/ears', status: 'pass', key: 'kiro-ears-pass' }));
    const hasDesign = lower.some((name) => name.endsWith('/design.md') || name === 'design.md');
    const hasTasks = lower.some((name) => name.endsWith('/tasks.md') || name === 'tasks.md');
    if (!hasDesign || !hasTasks) out.push(finding({ id: 'kiro/trio', status: 'info', key: 'kiro-trio' }));
    else out.push(finding({ id: 'kiro/trio', status: 'pass', key: 'kiro-trio-pass' }));
  }

  if (format === 'bmad') {
    const intent = /out of scope|must not change|what should be true|non-goals|won’t change|will not change/i.test(text);
    if (!intent) out.push(finding({ id: 'bmad/intent', key: 'bmad-intent', fixKey: 'bmad-intent-fix' }));
    else out.push(finding({ id: 'bmad/intent', status: 'pass', key: 'bmad-intent-pass' }));
  }

  if (format === 'task-master') {
    let tasks = [];
    for (const file of files) {
      try {
        const parsed = JSON.parse(file.text);
        const walk = (value) => {
          if (!value || typeof value !== 'object') return;
          if (Array.isArray(value.tasks)) tasks = tasks.concat(value.tasks);
          for (const child of Object.values(value)) if (child && typeof child === 'object') walk(child);
        };
        walk(parsed);
      } catch {
        /* prose PRD */
      }
    }
    if (tasks.length) {
      const missingStrategy = tasks.filter((task) => !task.testStrategy);
      if (missingStrategy.length) {
        out.push(finding({
          id: 'taskmaster/test',
          key: 'tm-test',
          fixKey: 'tm-test-fix',
          params: { count: missingStrategy.length, title: String(missingStrategy[0].title || missingStrategy[0].id || '') },
        }));
      } else out.push(finding({ id: 'taskmaster/test', status: 'pass', key: 'tm-test-pass' }));
      const ids = new Set(tasks.map((task) => task.id));
      const dangling = tasks.some((task) => (task.dependencies || []).some((dep) => !ids.has(dep)));
      if (dangling) out.push(finding({ id: 'taskmaster/deps', key: 'tm-deps', fixKey: 'tm-deps-fix' }));
      else out.push(finding({ id: 'taskmaster/deps', status: 'pass', key: 'tm-deps-pass' }));
    }
    if (!lower.some((name) => name.endsWith('prd.txt') || name.endsWith('prd.md'))) {
      out.push(finding({ id: 'taskmaster/prd', status: 'info', key: 'tm-prd' }));
    }
  }

  if (format === 'ears') {
    const lines = text.split('\n').filter((line) => /^(when|if|while|where)\b[\s\S]{0,400}\bshall\b/i.test(line.trim()));
    if (lines.length < 2) out.push(finding({ id: 'ears/count', key: 'ears-count', fixKey: 'ears-fix' }));
    else out.push(finding({ id: 'ears/count', status: 'pass', key: 'ears-pass', params: { count: lines.length } }));
  }

  if (format === 'prd') {
    if (!/out of scope|non-goals|not in scope/i.test(text)) out.push(finding({ id: 'prd/scope', key: 'prd-scope', fixKey: 'prd-scope-fix' }));
    else out.push(finding({ id: 'prd/scope', status: 'pass', key: 'prd-scope-pass' }));
  }

  if (format === 'rfc') {
    for (const section of ['Abstract', 'Motivation']) {
      if (!has(text, new RegExp(`^## ${section}\\b`, 'm'))) out.push(finding({ id: `rfc/${section}`, key: 'rfc-section', params: { section } }));
    }
  }

  if (format === 'user-stories') {
    const stories = text.split('\n').filter((line) => /^as an?\b.+\bi want\b/i.test(line.trim()));
    const withSoThat = stories.filter((line) => /\bso that\b/i.test(line));
    if (stories.length && withSoThat.length < stories.length) {
      out.push(finding({ id: 'stories/so-that', key: 'stories-so', fixKey: 'stories-fix', params: { count: stories.length - withSoThat.length } }));
    } else if (stories.length) out.push(finding({ id: 'stories/so-that', status: 'pass', key: 'stories-pass' }));
  }

  if (format === 'specscore') {
    if (!/## Open Questions/.test(text)) out.push(finding({ id: 'specscore/oq', key: 'ss-oq', fixKey: 'ss-oq-fix' }));
    if (!/^### AC: [a-z0-9]+(?:-[a-z0-9]+)*$/m.test(text)) out.push(finding({ id: 'specscore/ac', key: 'ss-ac', fixKey: 'ss-ac-fix' }));
    out.push(finding({ id: 'specscore/lint-note', status: 'info', key: 'ss-lint-note' }));
  }

  return out;
}

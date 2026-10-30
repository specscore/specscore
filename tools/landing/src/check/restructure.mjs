// Deterministic SpecScore skeleton. No model calls.
// Section mapping follows the feature specification: a feature README states
// the problem and testable acceptance criteria; design notes stay quoted
// under Behavior rather than being turned into an unlinted plan.

const SLUG_MAX = 48;

export function slugify(value) {
  const slug = String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, SLUG_MAX)
    .replace(/-+$/g, '');
  return slug || 'pasted-spec';
}

function titleFrom(files) {
  for (const file of files) {
    const heading = (file.text || '').split('\n').find((line) => /^#\s+\S/.test(line));
    if (heading) return heading.replace(/^#\s+/, '').replace(/^Feature:\s*/i, '').trim();
  }
  const name = (files[0]?.path || 'pasted-spec').split('/').pop().replace(/\.(md|txt|json)$/i, '');
  return name.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function firstParagraph(section) {
  const lines = section.split('\n').map((line) => line.trim()).filter(Boolean);
  const para = lines.find((line) => !line.startsWith('#') && !line.startsWith('|') && !line.startsWith('-'));
  return (para || lines[0] || '').replace(/\|/g, '/').replace(/\s+/g, ' ').slice(0, 180);
}

function sectionsOf(text) {
  const lines = text.split('\n');
  const sections = [];
  let current = { heading: '', level: 0, body: [] };
  for (const line of lines) {
    const match = /^(#{1,3})\s+(.+)$/.exec(line);
    if (match) {
      sections.push(current);
      current = { heading: match[2].trim(), level: match[1].length, body: [] };
    } else {
      current.body.push(line);
    }
  }
  sections.push(current);
  return sections.map((section) => ({ ...section, text: section.body.join('\n').trim() }));
}

function acId(seed, used) {
  let id = slugify(seed).replace(/^-+/, '') || 'criterion';
  if (!/^[a-z0-9]/.test(id)) id = `ac-${id}`;
  let unique = id;
  let n = 2;
  while (used.has(unique)) {
    unique = `${id}-${n}`;
    n += 1;
  }
  used.add(unique);
  return unique;
}

function quote(text) {
  return text.replace(/\s+/g, ' ').trim().slice(0, 280);
}

function acBlock(id, body) {
  return `### AC: ${id}\n\n${body.trim()}\n`;
}

function fromEars(line, used, file, lineNo, questions) {
  const match = /^(when|if|while|where)\s+([\s\S]+?)\s+(?:the\s+.+?\s+)?shall\s+([\s\S]+)$/i.exec(line.trim());
  if (!match) return null;
  const id = acId(match[2], used);
  const body = [
    'Given the precondition stated in the source,',
    `When ${match[2].replace(/\.$/, '')},`,
    `Then the system shall ${match[3].replace(/\.$/, '')}.`,
  ].join('\n');
  return { id, body, file, line: lineNo, kind: 'ears' };
}

function fromScenario(heading, lines, used) {
  const when = lines.find((line) => /\*\*WHEN\*\*/i.test(line));
  const then = lines.find((line) => /\*\*THEN\*\*/i.test(line));
  if (!when || !then) return null;
  const whenText = when.replace(/^-\s*/, '').replace(/\*\*WHEN\*\*/i, '').trim();
  const thenText = then.replace(/^-\s*/, '').replace(/\*\*THEN\*\*/i, '').trim();
  const id = acId(heading || whenText, used);
  return {
    id,
    kind: 'scenario',
    body: `Given the scenario "${heading || id}",\nWhen ${whenText.replace(/\.$/, '')},\nThen ${thenText.replace(/\.$/, '')}.`,
  };
}

function fromStory(line, used) {
  const match = /^as an?\s+(.+?),?\s+i want\s+(.+?)(?:,\s*so that\s+(.+))?$/i.exec(line.trim());
  if (!match) return null;
  const id = acId(match[2], used);
  const then = match[3] ? match[3].replace(/\.$/, '') : 'the source did not say why this matters';
  const vague = !match[3];
  return {
    id,
    kind: vague ? 'vague' : 'story',
    vague,
    body: `Given I am a ${match[1].replace(/\.$/, '')},\nWhen I ${match[2].replace(/\.$/, '')},\nThen ${then}.`,
  };
}

function fromGwt(text, used) {
  const given = /\*\*Given\*\*\s*([^,*]+)/i.exec(text);
  const when = /\*\*When\*\*\s*([^,*]+)/i.exec(text);
  const then = /\*\*Then\*\*\s*([^,*]+)/i.exec(text);
  if (!when || !then) return null;
  const id = acId(when[1], used);
  return {
    id,
    kind: 'gwt',
    body: `Given ${given ? given[1].trim() : 'the initial state'},\nWhen ${when[1].trim()},\nThen ${then[1].trim()}.`,
  };
}

function collectAcs(files) {
  const used = new Set();
  const acs = [];
  const questions = [];
  for (const file of files) {
    if ((file.path || '').toLowerCase().endsWith('.json')) {
      try {
        const parsed = JSON.parse(file.text);
        const tasks = [];
        const walk = (value) => {
          if (!value || typeof value !== 'object') return;
          if (Array.isArray(value.tasks)) tasks.push(...value.tasks);
          for (const child of Object.values(value)) if (child && typeof child === 'object') walk(child);
        };
        walk(parsed);
        for (const task of tasks) {
          const id = acId(task.title || `task-${task.id}`, used);
          if (task.testStrategy) {
            acs.push({
              id,
              kind: 'task',
              body: `Given task ${task.id} (${quote(task.title || '')}),\nWhen the work in the task is finished,\nThen ${quote(task.testStrategy)}.`,
            });
          } else {
            questions.push(`Task “${quote(task.title || String(task.id))}” has no testStrategy, so it is not an acceptance criterion yet.`);
          }
        }
      } catch {
        /* not tasks.json */
      }
      continue;
    }
    const lines = (file.text || '').split('\n');
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const scenario = /^#### Scenario:\s*(.*)$/.exec(line);
      if (scenario) {
        const block = [];
        for (let j = i + 1; j < lines.length && !/^#{1,4}\s/.test(lines[j]); j += 1) block.push(lines[j]);
        const built = fromScenario(scenario[1].trim(), block, used);
        if (built) acs.push(built);
        continue;
      }
      const gwt = fromGwt(line, used);
      if (gwt) {
        acs.push(gwt);
        continue;
      }
      const next = lines[i + 1] || '';
      const earsSource = /\bshall\b/i.test(line) ? line : `${line} ${next}`;
      const ears = fromEars(earsSource, used, file.path, i + 1, questions);
      if (ears) {
        acs.push(ears);
        if (!/\bshall\b/i.test(line)) i += 1;
        continue;
      }
      const story = fromStory(line, used);
      if (story) {
        acs.push(story);
        if (story.vague) questions.push(`AC ${story.id} is missing the “so that” outcome from the source story.`);
        continue;
      }
      const fr = /^-\s+\*\*(FR-\d+)\*\*:\s*(.+)$/.exec(line.trim());
      if (fr) {
        const id = acId(fr[1].toLowerCase(), used);
        const needs = /NEEDS CLARIFICATION|TBD|TODO/i.test(fr[2]);
        acs.push({
          id,
          kind: needs ? 'vague' : 'fr',
          vague: needs,
          body: needs
            ? `Given the context of ${fr[1]},\nWhen the unspecified condition occurs,\nThen the outcome is still unspecified.\n\nSource:\n\n> ${quote(fr[2])}`
            : `Given the system is in the state ${fr[1]} assumes,\nWhen the actor exercises ${fr[1]},\nThen ${quote(fr[2]).replace(/\.$/, '')}.`,
        });
        if (needs) questions.push(`${fr[1]} is marked as needing clarification. Rewrite it before treating ${id} as testable.`);
      }
    }
  }
  return { acs, questions };
}

function roleFor(heading) {
  const name = heading.toLowerCase();
  if (/open question|unresolved|tbd|to do/.test(name)) return 'questions';
  if (/requirement|acceptance|scenario|user stor|criteria|ears/.test(name)) return 'acceptance';
  if (/design|architect|implement|task|plan|technical/.test(name)) return 'behavior';
  if (/problem|why|background|motivation|goal|objective|scope|non-goal|impact/.test(name)) return 'problem';
  if (/summary|overview|abstract|what changes/.test(name)) return 'summary';
  return 'behavior';
}

function featureReadme({ title, summary, problem, behavior, acs, questions }) {
  const acText = acs.length
    ? acs.map((ac) => acBlock(ac.id, ac.body)).join('\n')
    : `${acBlock('source-has-no-testable-criterion', 'Given the pasted specification,\nWhen a reviewer looks for a testable acceptance criterion,\nThen the outcome is still unspecified.\n\nThe source did not contain a Given/When/Then, EARS, SHALL scenario, or task test strategy.')}\n`;
  const questionText = questions.length ? questions.map((item) => `- ${item}`).join('\n') : 'None at this time.';
  const behaviorText = behavior.trim()
    ? behavior.trim()
    : 'No separate design or task section was found in the source. Behavior beyond the acceptance criteria is not invented here.';
  return `---
format: https://specscore.md/feature-specification
status: draft
---

# Feature: ${title}

**Status:** draft
**Source Ideas:** —

## Summary

${summary}

## Problem

${problem}

## Behavior

${behaviorText}

## Acceptance Criteria

${acText}
## Open Questions

${questionText}

*This document follows the https://specscore.md/feature-specification*
`;
}

function indexes(slug, title, summary) {
  const safeSummary = summary.replace(/\|/g, '/');
  return [
    {
      path: 'spec/features/README.md',
      text: `---
format: https://specscore.md/features-index-specification
---

# Features

## Index

| Feature | Status | Description |
| --- | --- | --- |
| [${title}](${slug}/README.md) | draft | ${safeSummary} |

## Open Questions

None at this time.

*This document follows the https://specscore.md/features-index-specification*
`,
    },
    {
      path: 'spec/README.md',
      text: `# Spec

Pasted material, restructured into a SpecScore feature tree by the in-browser checker.

## Open Questions

None at this time.
`,
    },
  ];
}

/**
 * @param {{ path?: string, text: string }[]} files
 */
export function restructure(files) {
  const title = titleFrom(files).replace(/[\[\]]/g, '').slice(0, 80) || 'Pasted spec';
  const slug = slugify(title);
  const all = files.flatMap((file) => sectionsOf(file.text || ''));
  const buckets = { summary: [], problem: [], behavior: [], acceptance: [], questions: [] };
  const mappings = [];
  for (const section of all) {
    if (!section.heading && !section.text) continue;
    const role = section.heading ? roleFor(section.heading) : 'summary';
    const body = [section.heading ? `Source section: ${section.heading}` : '', section.text].filter(Boolean).join('\n\n');
    if (role !== 'acceptance' && role !== 'questions') buckets[role].push(body);
    mappings.push({
      from: section.heading || '(preamble)',
      to: `spec/features/${slug}/README.md`,
      role,
    });
  }
  const { acs, questions } = collectAcs(files);
  for (const section of all) {
    if (roleFor(section.heading) === 'questions' && section.text) questions.push(section.text.replace(/\s+/g, ' ').trim());
  }
  const summary = firstParagraph(buckets.summary.join('\n\n') || buckets.problem.join('\n\n') || title) || title;
  const problem = buckets.problem.join('\n\n').trim() || summary;
  const behavior = buckets.behavior.join('\n\n').trim();
  const readme = featureReadme({ title, summary, problem, behavior, acs, questions });
  const tree = [
    { path: `spec/features/${slug}/README.md`, text: readme },
    ...indexes(slug, title, summary),
  ];
  const recommendations = [
    { key: 'rec-tree', params: { slug } },
    { key: 'rec-ac', params: { count: acs.length } },
  ];
  if (questions.length) recommendations.push({ key: 'rec-oq', params: { count: questions.length } });
  if (behavior) recommendations.push({ key: 'rec-behavior' });
  const long = all.filter((section) => section.text.length > 1200);
  if (long.length >= 3) {
    recommendations.push({
      key: 'rec-split',
      params: { files: long.map((section) => `spec/features/${slug}/${slugify(section.heading)}/README.md`).join(', ') },
    });
  }
  return { slug, title, files: tree, mappings, recommendations, featurePath: `spec/features/${slug}/README.md` };
}

/**
 * Place the user's own bytes where specscore spec lint expects them.
 * Generated index files are marked so the UI can hide them.
 */
export function placeForLint(files) {
  const normalized = files.map((file) => ({
    path: (file.path || 'pasted.md').replace(/\\/g, '/').replace(/^\.\//, ''),
    text: file.text || '',
  }));
  const hasSpec = normalized.some((file) => /(^|\/)spec\//.test(file.path));
  if (normalized.length > 1 && hasSpec) {
    return {
      files: normalized.map((file) => {
        const at = file.path.indexOf('spec/');
        return { path: at >= 0 ? file.path.slice(at) : `spec/pasted/${file.path.split('/').pop()}`, text: file.text };
      }),
      keep: null,
    };
  }
  const text = normalized.map((file) => file.text).join('\n\n');
  const formatUrl = (text.match(/^format:\s*(\S+)/m) || [])[1] || '';
  let path = 'spec/features/pasted/README.md';
  let keep = 'features/pasted/README.md';
  let extra = indexes('pasted', 'Pasted', 'Pasted specification.');
  if (formatUrl.includes('idea-specification')) {
    path = 'spec/ideas/pasted.md';
    keep = 'ideas/pasted.md';
    extra = [];
  } else if (formatUrl.includes('decision-specification')) {
    path = 'spec/decisions/0001-pasted.md';
    keep = 'decisions/0001-pasted.md';
    extra = [];
  }
  return {
    files: [{ path, text }, ...extra],
    keep: (violation) => violation.file === keep,
  };
}

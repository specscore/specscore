import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const lessonTemplateUrl = new URL('../../../new/lesson.md', import.meta.url);
const occurrenceSchemaUrl = new URL('../../../new/lesson-occurrence.schema.json', import.meta.url);

function occurrenceValidator(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  ajv.addKeyword({ keyword: 'x-specscore-filename-matches', schemaType: 'string' });
  ajv.addKeyword({ keyword: 'x-specscore-requires-format-assertion', schemaType: 'array' });
  ajv.addKeyword({ keyword: 'x-specscore-content-policy', schemaType: 'object' });
  addFormats(ajv);
  return ajv.compile(schema);
}

function contentPolicyViolations(schema, value, path = '$') {
  const policy = schema['x-specscore-content-policy'];
  const forbiddenNames = new Set(policy.forbidden_property_names.map(name => name.toLowerCase()));
  const forbiddenPatterns = policy.forbidden_value_patterns.map(pattern => new RegExp(pattern));
  const violations = [];

  if (typeof value === 'string') {
    if (forbiddenPatterns.some(pattern => pattern.test(value))) {
      violations.push(`${path} contains a forbidden value`);
    }
    return violations;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => violations.push(...contentPolicyViolations(schema, item, `${path}[${index}]`)));
    return violations;
  }
  if (value && typeof value === 'object') {
    for (const [name, item] of Object.entries(value)) {
      if (forbiddenNames.has(name.toLowerCase())) {
        violations.push(`${path}.${name} is a forbidden property name`);
      }
      violations.push(...contentPolicyViolations(schema, item, `${path}.${name}`));
    }
  }
  return violations;
}

function validatesOccurrence(schema, occurrence) {
  const validate = occurrenceValidator(schema);
  return validate(occurrence) && contentPolicyViolations(schema, occurrence).length === 0;
}

function validOccurrence() {
  return {
    schema_version: 1,
    id: '018f8e3e-7a4b-4c1d-8e2f-0123456789ab',
    occurred_at: '2026-08-10T12:34:56.123Z',
    summary: 'A target merge remained only in the local clone.',
    context: {
      repository: 'github.com/acme/widget',
      git: { commit: '0123456789abcdef0123456789abcdef01234567', branch: 'codex/widget' },
      worktree: { path_hint: '.worktrees/widget', id: 'run-123' },
      execution: { kind: 'interactive', id: 'run-123' },
    },
    evidence: { kind: 'path', ref: 'artifacts/verification.txt' },
    redactions: [],
  };
}

describe('lesson template and occurrence schema', () => {
  it('publishes a directory-form Lesson scaffold that points to the occurrence schema', async () => {
    const template = await readFile(lessonTemplateUrl, 'utf8');

    assert.match(template, /^format: https:\/\/specscore\.md\/lesson-specification$/m);
    assert.match(template, /^status: Recorded$/m);
    assert.match(template, /^\*\*Status:\*\* Recorded$/m);
    assert.match(template, /^- \*\*Occurrence store:\*\* `occurrences\/`$/m);
    assert.match(template, /^- \*\*Occurrence schema:\*\* `https:\/\/specscore\.md\/new\/lesson-occurrence\.schema\.json`$/m);
    assert.match(template, /\*This document follows the https:\/\/specscore\.md\/lesson-specification\*/);
  });

  it('defines a strict, versioned occurrence schema', async () => {
    const schema = JSON.parse(await readFile(occurrenceSchemaUrl, 'utf8'));

    assert.equal(schema.$id, 'https://specscore.md/new/lesson-occurrence.schema.json');
    assert.equal(schema['x-specscore-filename-matches'], 'id');
    assert.equal(
      schema['x-specscore-content-policy'].scanner,
      'Apply forbidden_property_names and forbidden_value_patterns to every property name and string value before write and validation; run any configured repository secret scanner as an additional check.',
    );
    assert.equal(schema.additionalProperties, false);
    assert.deepEqual(schema.required, [
      'schema_version', 'id', 'occurred_at', 'summary', 'context', 'evidence', 'redactions',
    ]);
    assert.equal(schema.properties.schema_version.const, 1);
    assert.match(schema.properties.id.pattern, /-4\[0-9a-f\]/);
    assert.equal(schema.properties.context.maxProperties, 20);
    assert.equal(schema.properties.context.additionalProperties.$ref, '#/$defs/contextValue');
    assert.equal(schema.$defs.contextValue.anyOf[4].maxItems, 20);
    assert.equal(schema.$defs.contextValue.anyOf[5].maxProperties, 20);
    assert.equal(schema.$defs.evidence.additionalProperties, false);
    assert.ok(schema['x-specscore-content-policy'].forbidden_property_names.includes('original_prompt'));
    assert.ok(schema['x-specscore-content-policy'].forbidden_value_patterns.some(pattern => pattern.includes('@')));
    assert.deepEqual(
      schema.$defs.safeValue.allOf.map(rule => rule.not.pattern),
      schema['x-specscore-content-policy'].forbidden_value_patterns,
    );
    assert.equal(schema.$defs.repoRelativePath.type, 'string');
  });

  it('accepts opaque context and preserves unknown scalar, array, and nested values', async () => {
    const schema = JSON.parse(await readFile(occurrenceSchemaUrl, 'utf8'));
    const validate = occurrenceValidator(schema);
    const valid = validOccurrence();

    valid.context = {
      run: '42',
      files: ['x.go'],
      nested: { retry: true, attempt: 2, metadata: [null, { source: 'manual' }] },
    };
    assert.equal(validate(valid), true, JSON.stringify(validate.errors));
    assert.equal(validatesOccurrence(schema, valid), true);
    assert.deepEqual(valid.context, {
      run: '42',
      files: ['x.go'],
      nested: { retry: true, attempt: 2, metadata: [null, { source: 'manual' }] },
    });
  });

  it('rejects unsafe or ambiguous occurrences and context values', async () => {
    const schema = JSON.parse(await readFile(occurrenceSchemaUrl, 'utf8'));
    const valid = validOccurrence();

    const mutations = [
      occurrence => { occurrence.occurred_at = 'not-a-dateZ'; },
      occurrence => { occurrence.occurred_at = '2026-02-31T12:34:56Z'; },
      occurrence => { occurrence.summary = 'Authorization: Bearer abcdef'; },
      occurrence => { occurrence.summary = 'AUTHORIZATION: Bearer abcdef'; },
      occurrence => { occurrence.summary = 'TOKEN: abcdef'; },
      occurrence => { occurrence.summary = 'PASSWORD=abcdef'; },
      occurrence => { occurrence.summary = 'Contact owner@example.com'; },
      occurrence => { occurrence.context.git.branch = 'line one\nline two'; },
      occurrence => { occurrence.context.worktree.path_hint = '../outside'; },
      occurrence => { occurrence.context.worktree.path_hint = 'C:/outside'; },
      occurrence => { occurrence.context.worktree.path_hint = 'safe\\..\\outside'; },
      occurrence => { occurrence.context.git = { unexpected: true }; },
      occurrence => { occurrence.context = { nested: { agent_prompt: 'private input' } }; },
      occurrence => { occurrence.context = { nested: ['safe', 'line one\nline two'] }; },
      occurrence => { occurrence.context = { nested: { secret: 'not a credential' } }; },
      occurrence => { occurrence.context = { nested: { token_value: 'TOKEN: abcdef' } }; },
      occurrence => { occurrence.original_prompt = 'copy of a private prompt'; },
    ];
    for (const mutate of mutations) {
      const occurrence = structuredClone(valid);
      mutate(occurrence);
      assert.equal(validatesOccurrence(schema, occurrence), false, `unexpectedly accepted ${JSON.stringify(occurrence)}`);
    }

    assert.notEqual('different-id.json', `${valid.id}.json`, 'filename/id matching is an external invariant');
  });
});

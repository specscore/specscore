import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const lessonTemplateUrl = new URL('../../../new/lesson.md', import.meta.url);
const occurrenceSchemaUrl = new URL('../../../new/lesson-occurrence.schema.json', import.meta.url);

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
    assert.equal(schema.properties.context.additionalProperties, false);
    assert.equal(schema.$defs.evidence.additionalProperties, false);
    assert.ok(schema['x-specscore-content-policy'].forbidden_property_names.includes('original_prompt'));
    assert.ok(schema['x-specscore-content-policy'].forbidden_value_patterns.some(pattern => pattern.includes('@')));
    assert.equal(schema.$defs.repoRelativePath.type, 'string');
  });
});

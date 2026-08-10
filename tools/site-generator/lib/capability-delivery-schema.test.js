import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const schemaUrl = new URL('../../../new/cli-capability-delivery.schema.json', import.meta.url);

describe('CLI capability delivery schema', () => {
  it('defines strict traceability for all four delivery surfaces', async () => {
    const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));
    const capability = schema.$defs.capability;

    assert.equal(schema.$id, 'https://specscore.md/new/cli-capability-delivery.schema.json');
    assert.equal(schema.additionalProperties, false);
    assert.deepEqual(schema.required, ['$schema', 'schema_version', 'binary', 'capabilities']);
    assert.equal(
      schema.properties.$schema.const,
      'https://specscore.md/new/cli-capability-delivery.schema.json',
    );
    assert.equal(schema.properties.schema_version.const, 1);
    assert.equal(capability.additionalProperties, false);
    assert.deepEqual(capability.properties.surfaces.required, [
      'runtime', 'help', 'ai_skill', 'tests',
    ]);
    assert.deepEqual(schema.$defs.status.enum, ['Full', 'Partial', 'Planned', 'Absent']);
    assert.equal(schema.$defs.repoPath.type, 'string');
    assert.deepEqual(schema.$defs.testEvidence.properties.kind.enum, [
      'unit', 'integration', 'conformance', 'e2e',
    ]);
  });

  it('requires evidence for usable surfaces and forbids it for planned or absent ones', async () => {
    const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));

    for (const surface of ['runtimeSurface', 'helpSurface', 'skillSurface', 'testSurface']) {
      assert.ok(schema.$defs[surface].allOf.some(rule => rule.$ref?.includes('nonFullLimitation')));
    }
    assert.equal(schema.$defs.noEvidenceWhenUnusable.then.properties.commands.maxItems, 0);
    assert.equal(schema.$defs.noAnchorsWhenUnusable.then.properties.anchors.maxItems, 0);
    assert.equal(schema.$defs.noSkillsWhenUnusable.then.properties.skills.maxItems, 0);
    assert.equal(schema.$defs.noReferencesWhenUnusable.then.properties.references.maxItems, 0);
  });
});

import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import Ajv2020 from 'ajv/dist/2020.js';

const schemaUrl = new URL('../../../new/cli-capability-delivery.schema.json', import.meta.url);

function manifestValidator(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  for (const keyword of ['x-specscore-unique-key', 'x-specscore-sorted-by', 'x-specscore-id-prefix']) {
    ajv.addKeyword({ keyword, schemaType: 'string' });
  }
  return ajv.compile(schema);
}

function fullCapability() {
  return {
    id: 'wb.worktree.abort',
    feature_refs: ['spec/features/worktree-abort/README.md'],
    since: null,
    surfaces: {
      runtime: {
        status: 'Full',
        commands: [{ path: 'worktree abort', flags: ['--apply'], modes: ['direct'] }],
        limitation: null,
      },
      help: {
        status: 'Full',
        anchors: [{ command: 'wb worktree abort --help', contains: ['--apply', '--disposition'] }],
        limitation: null,
      },
      ai_skill: {
        status: 'Full',
        skills: [{
          path: 'ai/skills/wb-worktrees/SKILL.md',
          marker: 'wb.worktree.abort',
          examples: ['wb worktree abort --disposition handoff'],
        }],
        limitation: null,
      },
      tests: {
        status: 'Full',
        references: [{
          path: 'internal/worktrees/abort_test.go',
          name: 'TestAbortSealsBeforeCleanup',
          kind: 'integration',
        }],
        limitation: null,
      },
    },
    notes: null,
  };
}

function manifest(capability = fullCapability()) {
  return {
    $schema: 'https://specscore.md/new/cli-capability-delivery.schema.json',
    schema_version: 1,
    binary: 'wb',
    capabilities: [capability],
  };
}

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

  it('validates real manifests and rejects cross-surface false claims', async () => {
    const schema = JSON.parse(await readFile(schemaUrl, 'utf8'));
    const validate = manifestValidator(schema);
    const valid = manifest();

    assert.equal(validate(valid), true, JSON.stringify(validate.errors));

    const planned = fullCapability();
    for (const [surface, evidence] of [
      ['runtime', 'commands'], ['help', 'anchors'], ['ai_skill', 'skills'], ['tests', 'references'],
    ]) {
      planned.surfaces[surface] = { status: 'Planned', [evidence]: [], limitation: 'Not implemented.' };
    }
    assert.equal(validate(manifest(planned)), true, JSON.stringify(validate.errors));

    const advertisedBeforeRuntime = structuredClone(planned);
    advertisedBeforeRuntime.surfaces.help = fullCapability().surfaces.help;
    advertisedBeforeRuntime.surfaces.ai_skill = fullCapability().surfaces.ai_skill;
    assert.equal(validate(manifest(advertisedBeforeRuntime)), false);

    const usableEvidenceOnPlanned = structuredClone(planned);
    usableEvidenceOnPlanned.surfaces.help.anchors.push({ command: 'wb planned --help', contains: ['planned'] });
    assert.equal(validate(manifest(usableEvidenceOnPlanned)), false);

    const traversal = structuredClone(valid);
    traversal.capabilities[0].surfaces.ai_skill.skills[0].path = '../private/SKILL.md';
    assert.equal(validate(traversal), false);

    const unknown = structuredClone(valid);
    unknown.capabilities[0].overall = 'Full';
    assert.equal(validate(unknown), false);
  });
});

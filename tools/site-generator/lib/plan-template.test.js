import { readFile } from 'node:fs/promises';
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const planTemplateUrl = new URL('../../../new/plan.md', import.meta.url);

describe('plan template', () => {
  it('seeds plan creation with distinct, valid inline task IDs', async () => {
    const template = await readFile(planTemplateUrl, 'utf8');
    const taskIds = [...template.matchAll(/^### Task \d+:.*\n\n\*\*Id:\*\* (.+)$/gm)]
      .map(([, id]) => id);

    assert.deepEqual(taskIds, ['task-1', 'task-2']);
    assert.equal(new Set(taskIds).size, taskIds.length);
    for (const id of taskIds) {
      assert.match(id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }

    assert.match(template, /^# Plan: <Plan Name>$/m);
    assert.match(template, /^\*\*Source Feature:\*\* <feature-slug>$/m);
    for (const section of ['Summary', 'Approach', 'Tasks', 'Open Questions']) {
      assert.match(template, new RegExp(`^## ${section}$`, 'm'));
    }
  });
});

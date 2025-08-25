import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

let el = null;

suite(`mc-drawer`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-drawer open><span>Test</span></mc-drawer>`, {
      modules: ['../../../dist/packages/mds-components-core-drawer/index.js'],
    });
  });

  test('is rendered', async () => {
    assert.exists(el);
  });
});

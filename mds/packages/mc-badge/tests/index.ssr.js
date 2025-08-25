import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = '9';
let el = null;

suite(`mc-badge`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-badge .label="${label}"></mc-badge>`, {
      modules: ['../../../dist/packages/mds-components-core-badge/index.js'],
    });
  });

  test('label is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.mc-badge').innerText, label);
  });
});

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'Click here!!';
let el = null;

suite(`mc-tag`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-tag .label="${label}"></mc-tag>`, {
      modules: ['../../../dist/packages/mds-components-core-tag/index.js'],
    });
  });

  test('label is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.mc-tag').innerText, label);
  });
});

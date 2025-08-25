import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'Test!!';
let el = null;

suite(`mc-label`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-label .label="${label}"></mc-label>`, {
      modules: ['../../../dist/packages/mds-components-core-label/index.js'],
    });
  });

  test('renders', async () => {
    assert.equal(el.shadowRoot.querySelector('.mc-label').innerText, label);
  });
});

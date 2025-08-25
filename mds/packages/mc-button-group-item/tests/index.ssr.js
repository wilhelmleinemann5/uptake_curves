import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'Click here!!';
let el = null;

suite(`mc-button-group-item`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-button-group-item .label="${label}"></mc-button-group-item>`, {
      modules: ['../../../dist/packages/mds-components-core-button-group-item/index.js'],
    });
  });

  test('label is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.label').innerText, label);
  });
});

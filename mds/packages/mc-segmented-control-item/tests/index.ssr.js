import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'Click here!!';
let el = null;

suite(`mc-segmented-control-item`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-segmented-control-item .label="${label}"></mc-segmented-control-item>`, {
      modules: ['../../../dist/packages/mds-components-core-segmented-control-item/index.js'],
    });
  });

  test('label is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.label').innerText, label);
  });
});

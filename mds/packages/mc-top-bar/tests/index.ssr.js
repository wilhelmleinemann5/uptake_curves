import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const product = 'MDS';
let el = null;

suite(`mc-top-bar`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-top-bar product="MDS"></mc-top-bar>`, {
      modules: ['../../../dist/packages/mds-components-core-top-bar/index.js'],
    });
  });

  test('product is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.product').innerText, product);
  });
});

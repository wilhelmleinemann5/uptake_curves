import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const myprop = 'Click here!!';
let el = null;

suite(`mc-component`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-component .myprop="${myprop}"></mc-component>`, {
      modules: ['../../../dist/packages/mds-components-core-%%component%%/index.js'],
    });
  });

  test('myprop is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('.myprop').innerText, myprop);
  });
});

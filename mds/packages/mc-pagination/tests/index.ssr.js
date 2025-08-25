import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

let el = null;
const prevLabel = 'Previous';

suite(`mc-pagination`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-pagination></mc-pagination>`, {
      modules: ['../../../dist/packages/mds-components-core-pagination/index.js'],
    });
  });
  test('previous button is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('#pagination-button-0').getAttribute('label'), prevLabel);
  });
});

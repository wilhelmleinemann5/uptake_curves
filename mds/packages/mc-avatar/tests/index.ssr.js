import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const info = 'this is an info text';
let el = null;

suite(`mc-avatar`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-avatar .info="${info}"></mc-avatar>`, {
      modules: ['../../../dist/packages/mds-components-core-avatar/index.js'],
    });
  });

  test('info is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('#avatar-info').innerText, info);
  });
});

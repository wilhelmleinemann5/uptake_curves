import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const icon = 'heart';
const label = 'Click here!!';
let el = null;

suite(`mc-button`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-button .label="${label}" .icon="${icon}"></mc-button>`, {
      modules: ['../../../dist/packages/mds-components-core-button/index.js'],
    });
  });

  test('label is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('button').innerText, label);
  });

  test('icon is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('mc-icon').getAttribute('icon'), icon);
  });
});

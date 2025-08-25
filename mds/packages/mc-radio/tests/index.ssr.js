import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'Do you agree?';
let el;

suite(`mc-radio`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-radio .label="${label}"></mc-radio>`, {
      modules: ['../../../dist/packages/mds-components-core-radio/index.js'],
    });
  });

  test('label is rendered server-side', () => {
    assert.equal(el.shadowRoot.querySelector('label').innerText, label);
  });
});

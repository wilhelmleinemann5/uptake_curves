import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const label = 'label';

let el = null;

suite(`mc-switch`, () => {
  setup(async () => {
    el = await ssrFixture(html` <mc-switch .label="${label}"></mc-switch>`, {
      modules: ['../../../dist/packages/mds-components-core-switch/index.js'],
    });
  });

  test('label is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('label').innerText.trim(), label);
  });
  test('switch button is rendered', () => {
    expect(el.shadowRoot.querySelector('button[role=switch]')).to.exist;
  });
});

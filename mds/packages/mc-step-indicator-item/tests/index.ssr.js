import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

const label = 'ssr test';
let el = null;

suite('mc-step-indicator-item', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-step-indicator-item .label="${label}"></mc-step-indicator-item>`, {
      modules: ['../../../dist/packages/mds-components-core-step-indicator-item/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('label is rendered when label passed as attribute', () => {
    const labelSlot = el.shadowRoot.querySelector('.label');

    expect(labelSlot.innerText).to.include(label);
  });
});

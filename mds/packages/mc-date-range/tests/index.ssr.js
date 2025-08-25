import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-date-range`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-date-range></mc-date-range>`, {
      modules: ['../../../dist/packages/mds-components-core-date-range/index.js'],
    });
  });

  test('Date Range is rendered', async () => {
    expect(el.shadowRoot.querySelector('mc-input-date')).to.exist;
  });
});

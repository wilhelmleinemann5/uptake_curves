import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-input-date`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-input-date></mc-input-date>`, {
      modules: ['../../../dist/packages/mds-components-core-input-date/index.js'],
    });
  });

  test('inupt is rendered', () => {
    expect(el.shadowRoot.querySelector('input')).to.exist;
  });
});

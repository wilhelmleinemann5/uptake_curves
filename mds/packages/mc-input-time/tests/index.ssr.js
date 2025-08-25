import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-input-time`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-input-time></mc-input-time>`, {
      modules: ['../../../dist/packages/mds-components-core-input-time/index.js'],
    });
  });

  test('inupt is rendered', () => {
    expect(el.shadowRoot.querySelector('input')).to.exist;
  });
});

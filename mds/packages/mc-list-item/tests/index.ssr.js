import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-list-item`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-list-item>Test</mc-list-item>`, {
      modules: ['../../../dist/packages/mds-components-core-list-item/index.js'],
    });
  });

  test('renders', async () => {
    expect(el.shadowRoot.querySelector('.mc-list-item')).to.exist;
  });
});

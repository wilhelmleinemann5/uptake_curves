import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-side-bar`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-side-bar>Test</mc-side-bar>`, {
      modules: ['../../../dist/packages/mds-components-core-side-bar/index.js'],
    });
  });

  test('side-bar is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-side-bar')).to.exist;
  });
});

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

const icon = 'star';
let el = null;

suite(`mc-icon`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-icon .icon="${icon}"></mc-icon>`, {
      modules: ['../../../dist/packages/mds-components-core-icon/index.js'],
    });
  });

  test('icon is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-icon')).to.exist;
  });
});

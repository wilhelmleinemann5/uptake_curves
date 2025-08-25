import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-list`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-list>
        <mc-list-item>One</mc-list-item>
        <mc-list-item>Two</mc-list-item>
      </mc-list>`,
      {
        modules: ['../../../dist/packages/mds-components-core-list/index.js'],
      },
    );
  });

  test('list is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-list')).to.exist;
  });
});

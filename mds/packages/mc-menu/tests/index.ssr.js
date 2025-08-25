import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-menu`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-menu>
          <mc-list></mc-list>
            <mc-list-item>One</mc-list-item>
            <mc-list-item>Two</mc-list-item>
          <mc-list>
      </mc-menu>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-menu/index.js',
          '../../../dist/packages/mds-components-core-list/index.js',
        ],
      },
    );
  });

  test('menu is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-menu')).to.exist;
  });
});

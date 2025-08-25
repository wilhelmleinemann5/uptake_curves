import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-button-group`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-button-group>
        <mc-button-group-item>One</mc-button-group-item>
        <mc-button-group-item>Two</mc-button-group-item>
      </mc-button-group>`,
      {
        modules: ['../../../dist/packages/mds-components-core-button-group/index.js'],
      },
    );
  });

  test('button-group is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-list')).to.exist;
  });
});

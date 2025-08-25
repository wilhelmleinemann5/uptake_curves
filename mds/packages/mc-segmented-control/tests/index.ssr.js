import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-segmented-control`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-segmented-control>
        <mc-segmented-control-item>One</mc-segmented-control-item>
        <mc-segmented-control-item>Two</mc-segmented-control-item>
      </mc-segmented-control>`,
      {
        modules: ['../../../dist/packages/mds-components-core-segmented-control/index.js'],
      },
    );
  });

  test('segmented-control is rendered', async () => {
    expect(el.shadowRoot.querySelector('.mc-list')).to.exist;
  });
});

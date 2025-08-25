import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-popover', () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-popover open
        ><mc-button slot="trigger">trigger</mc-button>
        <p id="content">content</p></mc-popover
      >`,
      {
        modules: ['../../../dist/packages/mds-components-core-popover/index.js'],
      },
    );
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('content is rendered', () => {
    expect(el.shadowRoot.querySelector('.content')).to.exist;
  });
});

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite(`mc-tooltip`, () => {
  setup(async () => {
    el = await ssrFixture(
      html` <mc-tooltip>
        <mc-button slot="trigger" label="Tooltip with interactive content"></mc-button>
        <div>
          <span>Content focusable using keyboard</span>
          <mc-button label="Clickable & Focusable"></mc-button>
        </div>
      </mc-tooltip>`,
      {
        modules: ['../../../dist/packages/mds-components-core-tooltip/index.js'],
      },
    );
  });

  test('content is rendered', () => {
    const tooltip = el.shadowRoot.querySelector('.mc-tooltip');
    expect(tooltip.querySelector('.content')).to.exist;
  });
});

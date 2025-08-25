import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

const labels = ['label1', 'label2', 'label3'];

let el = null;

suite(`mc-step-indicator`, () => {
  setup(async () => {
    el = await ssrFixture(html` <mc-step-indicator id="step-indicator" .labels="${labels}"> </mc-step-indicator>`, {
      modules: ['../../../dist/packages/mds-components-core-step-indicator/index.js'],
    });
  });

  test('labels are rendered', () => {
    const renderedLabels = Array.from(el.shadowRoot.querySelectorAll('mc-step-indicator-item')).map((el) =>
      el.getAttribute('label'),
    );

    expect(renderedLabels).to.include.members([...labels]);
  });
});

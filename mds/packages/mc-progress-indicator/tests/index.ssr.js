import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

let el = null;
const label = 'Loading';

suite(`mc-progress-indicator`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-progress-indicator></mc-progress-indicator>`, {
      modules: ['../../../dist/packages/mds-components-core-progress-indicator/index.js'],
    });
  });

  test('renders a progress indicator', async () => {
    assert.equal(el.shadowRoot.querySelector('.label').innerText, label);
  });
});

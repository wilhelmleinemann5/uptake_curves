import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

let el = null;

suite(`mc-theme-switch`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-theme-switch></mc-theme-switch>`, {
      modules: ['../../../dist/packages/mds-components-core-theme-switch/index.js'],
    });
  });

  test('inner button has the correct label', async () => {
    assert.equal(el.shadowRoot.querySelector('mc-button').getAttribute('aria-label'), 'Switch to dark theme');
  });
});

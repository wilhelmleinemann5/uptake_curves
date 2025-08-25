import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const testLegend = 'Test Input Group';
let el = null;

suite(`mc-input-group`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-input-group .legend="${testLegend}"></mc-input-group>`, {
      modules: ['../../../dist/packages/mds-components-core-input-group/index.js'],
    });
  });

  test('mc-input-group is rendered', async () => {
    assert.isNotNull(el, 'mc-input-group element should exist');
    assert.equal(el.tagName.toLowerCase(), 'mc-input-group', 'Element should be mc-input-group');
  });

  test('input group container is rendered', async () => {
    const container = el.shadowRoot.querySelector('[data-cy="mc-input-group-container"]');
    assert.isNotNull(container, 'Input group container should exist');
    assert.isTrue(container.classList.contains('mc-input-group'), 'Container should have mc-input-group class');
  });
});

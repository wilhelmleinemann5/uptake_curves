import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const label = 'Loading ...';
let el;

suite(`mc-loading-indicator`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-loading-indicator .label="${label}"></mc-loading-indicator>`, {
      modules: ['../../../dist/packages/mds-components-core-loading-indicator/index.js'],
    });
  });

  test('label is rendered server-side', () => {
    assert.equal(el.shadowRoot.querySelector('.label').innerText, label);
  });

  test('hiddenlabel sets up classes to hide the label', async () => {
    el = await ssrFixture(html`<mc-loading-indicator .label="${label}" hiddenlabel></mc-loading-indicator>`, {
      modules: ['../../../dist/packages/mds-components-core-loading-indicator/index.js'],
    });

    expect(el.shadowRoot.querySelector('.label')).not.to.exist;
  });
});

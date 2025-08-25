import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const label = 'ssr test';
let el = null;

suite('mc-text-and-icon', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-text-and-icon .label="${label}"></mc-text-and-icon>`, {
      modules: ['../../../dist/packages/mds-components-core-text-and-icon/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('label is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('.mc-text-and-icon').innerText, label);
  });
});

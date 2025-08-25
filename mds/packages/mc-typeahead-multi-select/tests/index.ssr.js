import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const label = 'ssr test';
let el = null;

suite('mc-typeahead-multi-select', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-typeahead-multi-select .label="${label}"></mc-typeahead-multi-select>`, {
      modules: ['../../../dist/packages/mds-components-core-typeahead-multi-select/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('label is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('.mc-typeahead').innerText, label);
  });
});

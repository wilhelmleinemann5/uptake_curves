import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const data = [
  {
    id: 1,
    name: 'Madrid Maersk',
    built: 2017,
  },
  {
    id: 2,
    name: 'Mary Maersk',
    built: 2013,
  },
];
let el = null;

suite('mc-table', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-table .data="${data}"></mc-table>`, {
      modules: ['../../../dist/packages/mds-components-core-table/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('data is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('.mds-table tr td:nth-child(3)').innerText, 'Mary Maersk');
  });
});

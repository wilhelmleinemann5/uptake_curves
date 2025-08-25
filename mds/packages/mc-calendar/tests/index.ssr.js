import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const testDate = new Date();
const year = testDate.getFullYear();
const month = testDate.toLocaleString('default', { month: 'long' });
const monthName = `${month} ${year}`;
let el = null;

suite(`mc-calendar`, () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-calendar></mc-calendar>`, {
      modules: ['../../../dist/packages/mds-components-core-calendar/index.js'],
    });
  });

  test('month name and year is rendered', async () => {
    assert.equal(el.shadowRoot.querySelector('[data-cy="month-name"]').getAttribute('label'), monthName);
  });
});

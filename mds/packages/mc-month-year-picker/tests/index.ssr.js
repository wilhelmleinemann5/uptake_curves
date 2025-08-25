import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-month-year-picker', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-month-year-picker></mc-month-year-picker>`, {
      modules: ['../../../dist/packages/mds-components-core-month-year-picker/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });
});

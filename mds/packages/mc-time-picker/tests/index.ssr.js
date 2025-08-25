import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-time-picker', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-time-picker></mc-time-picker>`, {
      modules: ['../../../dist/packages/mds-components-core-time-picker/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });
});

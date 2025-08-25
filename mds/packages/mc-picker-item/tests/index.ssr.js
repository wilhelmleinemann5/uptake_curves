import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-picker-item', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-picker-item></mc-picker-item>`, {
      modules: [
        '../../../dist/packages/mds-components-core-picker-item/index.js',
        '../../../dist/packages/mds-components-core-list-item/index.js',
      ],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });
});

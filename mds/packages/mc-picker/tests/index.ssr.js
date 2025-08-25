import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-picker', () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-picker>
        <mc-picker-item value="1" label="1"></mc-picker-item>
        <mc-picker-item value="2" label="2"></mc-picker-item>
        <mc-picker-item value="3" label="3"></mc-picker-item>
        <mc-picker-item value="4" label="4"></mc-picker-item>
        <mc-picker-item value="5" label="5"></mc-picker-item>
        <mc-picker-item value="6" label="6"></mc-picker-item>
        <mc-picker-item value="7" label="7"></mc-picker-item>
        <mc-picker-item value="8" label="8"></mc-picker-item>
        <mc-picker-item value="9" label="9"></mc-picker-item>
        <mc-picker-item value="10" label="10"></mc-picker-item>
      </mc-picker>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-picker/index.js',
          '../../../dist/packages/mds-components-core-list/index.js',
          '../../../dist/packages/mds-components-core-picker-item/index.js',
        ],
      },
    );
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });
});

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

const label = 'Select item';
let el = null;

suite('mc-multi-select', () => {
  setup(async () => {
    el = await ssrFixture(
      html` <mc-multi-select .label="${label}">
        <mc-list>
          <mc-option value="1">One</mc-option>
          <mc-option value="2">Two</mc-option>
          <mc-option value="3">Three</mc-option>
        </mc-list>
      </mc-multi-select>`,
      {
        modules: ['../../../dist/packages/mds-components-core-multi-select/index.js'],
      },
    );
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });
});

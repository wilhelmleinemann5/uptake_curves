import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

let el = null;

suite('mc-file-upload', () => {
  setup(async () => {
    el = await ssrFixture(html`<mc-file-upload></mc-file-upload>`, {
      modules: ['../../../dist/packages/mds-components-core-file-upload/index.js'],
    });
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('internal markups are rendered', () => {
    expect(el.shadowRoot.querySelector('.mc-file-upload')).to.exist;
  });
});

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect } from '@esm-bundle/chai';

const body = 'ssr test';
let el = null;

suite('mc-toast', () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-toast open
        ><mc-button slot="trigger">trigger</mc-button> <mc-notification body="${body}"></mc-notification
      ></mc-toast>`,
      {
        modules: ['../../../dist/packages/mds-components-core-toast/index.js'],
      },
    );
  });

  test('component is rendered', () => {
    expect(el).to.exist;
  });

  test('content is rendered', () => {
    expect(el.shadowRoot.querySelector('.content')).to.exist;
  });
});

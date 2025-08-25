import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const image = 'https://via.placeholder.com/350x150';
const heading = 'heading';
const subheading = 'sub heading';
const body = 'body';
const footer = 'footer';
const href = 'https://designsystem.maersk.com';

let el = null;

suite(`mc-card`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-card
        .image="${image}"
        .heading="${heading}"
        .subheading="${subheading}"
        .body="${body}"
        .footer="${footer}"
        .href="${href}"
      ></mc-card>`,
      {
        modules: ['../../../dist/packages/mds-components-core-card/index.js'],
      },
    );
  });

  test('content is rendered', () => {
    assert.equal(el.shadowRoot.querySelectorAll('.image-inner')[1].style.backgroundImage, `url("${image}")`);
    assert.equal(el.shadowRoot.querySelector('.heading').innerText, heading);
    assert.equal(el.shadowRoot.querySelector('.sub-heading').innerText, subheading);
    assert.equal(el.shadowRoot.querySelector('.body slot').innerText, body);
    assert.equal(el.shadowRoot.querySelector('.footer').innerText, footer);
  });
});

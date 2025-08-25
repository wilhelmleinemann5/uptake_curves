import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const body = `Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.`;
const heading = 'Registration form';
let el;

suite(`mc-modal`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-modal .heading="${heading}">
        <p>${body}</p>
        <button slot="primaryAction" appearance="primary" dialogaction="ok">OK</button>
        <button slot="secondaryAction" appearance="neutral" dialogaction="cancel">Cancel</button>
      </mc-modal>`,
      {
        modules: ['../../../dist/packages/mds-components-core-modal/index.js'],
      },
    );
  });

  test('heading is rendered server-side', () => {
    assert.equal(el.shadowRoot.querySelector('h1').innerText, heading);
  });

  test('body is rendered server-side', () => {
    assert.equal(el.querySelector('p').innerText, body);
  });

  test('primary action is rendered server-side', () => {
    expect(el.querySelector('button[slot="primaryAction"]')).to.exist;
  });

  test('secondary action is rendered server-side', () => {
    expect(el.querySelector('button[slot="secondaryAction"]')).to.exist;
  });
});

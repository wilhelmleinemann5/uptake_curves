import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert, expect } from '@esm-bundle/chai';

const body = `Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.`;
const heading = 'Registration form';
const appearance = 'success';
let el;

suite(`mc-notification`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-notification .heading="${heading}" .appearance="${appearance}">
        <p>${body}</p>
      </mc-notification>`,
      {
        modules: ['../../../dist/packages/mds-components-core-notification/index.js'],
      },
    );
  });

  test('heading is rendered server-side', () => {
    assert.equal(el.shadowRoot.querySelector('.heading').innerText, heading);
  });

  test('appearance is rendered server-side', () => {
    expect(el.shadowRoot.querySelector('.success')).to.exist;
  });

  test('body is rendered server-side', () => {
    expect(el.querySelector('p').innerText).to.contain(body);
  });
});

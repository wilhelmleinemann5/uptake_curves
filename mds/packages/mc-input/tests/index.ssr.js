import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect, assert } from '@esm-bundle/chai';

const icon = 'heart';
const label = 'Click here!!';
const hint = 'Enter your address';
const suffix = '$';
const mask = '000 000';
const inputModulePath = '../../../dist/packages/mds-components-core-input/index.js';
let el = null;

suite(`mc-input`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-input .label="${label}" .icon="${icon}" .hint="${hint}" .suffix="${suffix}"></mc-input>`,
      {
        modules: [inputModulePath],
      },
    );
  });

  test('icon is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('mc-icon').getAttribute('icon'), icon);
  });

  test('suffix is rendered', () => {
    expect(el.shadowRoot.querySelector('.affix.type-suffix').innerText).to.contain(suffix);
  });

  test('hiddenlabel sets up classes to hide the label', async () => {
    el = await ssrFixture(html`<mc-input .label="${label}" hiddenlabel></mc-input>`, {
      modules: [inputModulePath],
    });

    expect(el.shadowRoot.querySelector('mc-label[hiddenlabel]')).to.exist;
  });

  test('mask is assigned', async () => {
    //mask value formatting happens on the client side as it needs the element reference. This test is to ensure the mask is assigned and is not breaking SSR.
    const maskEl = await ssrFixture(html`<mc-input .label="${label}" mask="${mask}"></mc-input>`, {
      modules: [inputModulePath],
    });

    expect(maskEl.getAttribute('mask')).to.equal(mask);
  });
});

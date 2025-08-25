import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { expect, assert } from '@esm-bundle/chai';

const label = 'Click here!!';
const hint = 'Enter your address';
const placeholder = 'Pick up a number from the list';
const options = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
];
const mcSelectModulePath = '../../../dist/packages/mds-components-core-select-native/index.js';
let el = null;

suite(`mc-select-native`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-select-native
        .label="${label}"
        .placeholder="${placeholder}"
        .hint="${hint}"
        .options="${options}"
      ></mc-select-native>`,
      {
        modules: [mcSelectModulePath],
      },
    );
  });

  test('label is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('mc-label').innerText, label);
  });

  test('hint is rendered', () => {
    expect(el.shadowRoot.querySelector('slot[name="hint"]').innerText).to.contain(hint);
  });

  test('placeholder is rendered', () => {
    expect(el.shadowRoot.querySelector('option:first-child').innerText).to.contain(placeholder);
  });

  test('hiddenlabel sets up classes to hide the label', async () => {
    el = await ssrFixture(html`<mc-select-native .label="${label}" hiddenlabel></mc-select-native>`, {
      modules: [mcSelectModulePath],
    });

    expect(el.shadowRoot.querySelector('mc-label').attributes.getNamedItem('hiddenlabel')).to.exist;
  });
});

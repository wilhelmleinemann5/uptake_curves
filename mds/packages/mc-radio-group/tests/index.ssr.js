import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const legend = "What's your favourite fruit?";
const hint = 'Can be anything';
const errormessage = 'Remember to choose a fruit!';
let el = null;

suite(`mc-radio-group`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-radio-group .legend="${legend}" .hint="${hint}" .errormessage="${errormessage}">
        <mc-radio name="fruits" value="Apple" label="Apple" checked></mc-radio>
        <mc-radio name="fruits" value="Orange" label="Orange"></mc-radio>
        <mc-radio name="fruits" value="Banana" label="Banana"></mc-radio>
        <mc-radio name="fruits" value="Lemon" label="Lemon"></mc-radio>
      </mc-radio-group>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-radio-group/index.js',
          '../../../dist/packages/mds-components-core-radio/index.js',
        ],
      },
    );
  });

  test('legend is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('legend').innerText, legend);
  });

  test('hint is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('slot[name="hint"]').innerText, hint);
  });
});

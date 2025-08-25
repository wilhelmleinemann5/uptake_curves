import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const legend = "What's your favourite fruit?";
const hint = 'Can be anything';
const errormessage = 'Remember to choose a fruit!';
let el = null;

suite(`mc-checkbox-group`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-checkbox-group .legend="${legend}" .hint="${hint}" .errormessage="${errormessage}">
        <mc-checkbox name="fruits" value="Apple" label="Apple" checked></mc-checkbox>
        <mc-checkbox name="fruits" value="Orange" label="Orange"></mc-checkbox>
        <mc-checkbox name="fruits" value="Banana" label="Banana"></mc-checkbox>
        <mc-checkbox name="fruits" value="Lemon" label="Lemon"></mc-checkbox>
      </mc-checkbox-group>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-checkbox-group/index.js',
          '../../../dist/packages/mds-components-core-checkbox/index.js',
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

import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const legend = 'legend';
const hint = 'hint';
let el = null;

suite(`mc-switch-group`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-switch-group .legend="${legend}" .hint="${hint}">
        <mc-switch name="fruits" value="Apple" label="Apple" checked="true"></mc-switch>
        <mc-switch name="fruits" value="Orange" label="Orange"></mc-switch>
        <mc-switch name="fruits" value="Banana" label="Banana"></mc-switch>
        <mc-switch name="fruits" value="Lemon" label="Lemon"></mc-switch>
      </mc-switch-group>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-switch-group/index.js',
          '../../../dist/packages/mds-components-core-switch/index.js',
        ],
      },
    );
  });

  test('all switches are rendered', () => {
    assert.equal(
      el.shadowRoot
        .querySelector('div.slot > slot')
        .assignedElements()
        .filter((e) => typeof e === 'object').length,
      4,
    );
  });
  test('legend is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('legend').innerText, legend);
  });
  test('hint is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('slot[name=hint]').innerText, hint);
  });
});

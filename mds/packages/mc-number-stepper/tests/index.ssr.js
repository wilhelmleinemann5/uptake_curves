import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const hint = 'this is a hint';
const label = 'this is a label';
const placeholder = 'this is a placeholder';
const errormessage = 'this is an errormessage';
let el = null;

suite(`mc-number-stepper`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-number-stepper
        name="comment"
        .hint="${hint}"
        .label="${label}"
        .placeholder="${placeholder}"
        .errormessage="${errormessage}"
        invalid
      ></mc-number-stepper>`,
      {
        modules: ['../../../dist/packages/mds-components-core-number-stepper/index.js'],
      },
    );
  });
  test('placeholder is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('input').getAttribute('placeholder'), placeholder);
  });
});

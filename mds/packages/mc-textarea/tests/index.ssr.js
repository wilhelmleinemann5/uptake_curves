import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const hint = 'this is a hint';
const label = 'this is a label';
const placeholder = 'this is a placeholder';
const errormessage = 'this is an errormessage';
let el = null;

suite(`mc-textarea`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-textarea
        name="comment"
        .hint="${hint}"
        .label="${label}"
        .placeholder="${placeholder}"
        .errormessage="${errormessage}"
        invalid
      ></mc-textarea>`,
      {
        modules: ['../../../dist/packages/mds-components-core-textarea/index.js'],
      },
    );
  });
  test('placeholder is rendered', () => {
    assert.equal(el.shadowRoot.querySelector('textarea').getAttribute('placeholder'), placeholder);
  });
});

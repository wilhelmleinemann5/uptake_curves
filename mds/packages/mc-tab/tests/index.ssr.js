import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

const label = 'label';
const prefix = 'pre';
const suffix = 'suf';
let el = null;
let tabs = null;
let tabButton = null;

suite(`mc-tab`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-tab-bar
        ><mc-tab slot="tab" .label="${label}" icon="info-circle">
          <div slot="prefix">${prefix}</div>
          <div slot="suffix">${suffix}</div>
        </mc-tab>
        <div slot="panel"></div>
      </mc-tab-bar>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-tab-bar/index.js',
          '../../../dist/packages/mds-components-core-tab/index.js',
        ],
      },
    );

    tabs = el.shadowRoot.querySelector('slot[name=tab]').assignedElements();
    tabButton = tabs[0].shadowRoot.querySelector('mc-button');
  });

  test('tab is rendered', () => {
    assert.equal(tabs.length, 1);
  });
  test('label is rendered', () => {
    assert.equal(tabButton.innerText, label);
  });
  test('prefix is rendered', () => {
    assert.equal(tabButton.querySelector('slot[name=prefix]').assignedElements()[0].innerText, prefix);
  });
  test('suffix is rendered', () => {
    assert.equal(tabButton.querySelector('slot[name=suffix]').assignedElements()[0].innerText, suffix);
  });
});

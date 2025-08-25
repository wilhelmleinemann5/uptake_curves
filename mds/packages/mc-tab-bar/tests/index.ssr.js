import { ssrFixture } from '@lit-labs/testing/fixtures.js';
import { html } from 'lit';
import { assert } from '@esm-bundle/chai';

let el = null;

suite(`mc-tab-bar`, () => {
  setup(async () => {
    el = await ssrFixture(
      html`<mc-tab-bar>
        <!-- tab 0: -->
        <mc-tab slot="tab" label="Info" icon="info-circle"></mc-tab>
        <div slot="panel">Info page with lots of information about us.</div>
        <!-- tab 1: -->
        <mc-tab slot="tab" label="Work" icon="globe"></mc-tab>
        <div slot="panel">Work page that showcases our work.</div>
        <!-- tab 2: -->
        <mc-tab slot="tab" label="Hobby" icon="heart"></mc-tab>
        <div slot="panel">Hobby page that shows our interests.</div>
        <!-- tab 3: -->
        <mc-tab slot="tab" label="Contact" icon="envelope"></mc-tab>
        <div slot="panel">Contact page that shows our contacts.</div>
        <!-- tab 4: -->
        <mc-tab slot="tab" label="Address" icon="warehouse"></mc-tab>
        <div slot="panel">Address page that shows our addresses.</div>
      </mc-tab-bar>`,
      {
        modules: [
          '../../../dist/packages/mds-components-core-tab-bar/index.js',
          '../../../dist/packages/mds-components-core-tab/index.js',
        ],
      },
    );
  });

  test('all tabs are rendered', () => {
    assert.equal(el.shadowRoot.querySelector('slot[name=tab]').assignedElements().length, 5);
  });
  test('all panels are rendered', () => {
    assert.equal(el.shadowRoot.querySelector('slot[name=panel]').assignedElements().length, 5);
  });
});

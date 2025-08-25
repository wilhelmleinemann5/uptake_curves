import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Menu/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const listItems = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
      { value: 3, label: 'Three' },
      { value: 4, label: 'Four' },
      { value: 5, label: 'Five' },
    ];
    let currentElementIndex = null;
    const menuItemClick = (event) => {
      const output = document.getElementById('selected-item');
      if (output) {
        currentElementIndex = event.detail.item.value;
        output.innerHTML = `${event.detail.item.label} - ${currentElementIndex}`;
        const items = document.querySelectorAll('mc-list-item');
        items.forEach((item) => {
          item.selected = item.value === currentElementIndex;
        });
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story">
        <p id="selected-item">&nbsp;</p>
        <mc-menu position="bottom-left">
          <mc-button
            slot="trigger"
            icon="bars-horizontal"
            hiddenlabel
            label="menu"
            variant="outlined"
            appearance="neutral"
          ></mc-button>
          <mc-list @listchange=${menuItemClick}>
            ${listItems.map((item) => html`<mc-list-item value=${item.value} label=${item.label}></mc-list-item>`)}
          </mc-list>
        </mc-menu>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const GettingClickedItem: StoryObj = {};

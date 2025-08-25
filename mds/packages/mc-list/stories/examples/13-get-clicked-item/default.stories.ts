import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/List/List/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const getSelectedOnListChange = (event) => {
      const outputSelectedEvent = document.getElementById('selected-item-onlistchange');
      outputSelectedEvent.innerHTML = `Selected list item: ${event.detail.item.value}`;
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story">
        <mc-list @listchange="${getSelectedOnListChange}">
          <mc-list-item value="1">
            Apple
            <span slot="sublabel">Fruit</span>
          </mc-list-item>
          <mc-list-item value="2">
            Apricot
            <span slot="sublabel">Fruit</span>
          </mc-list-item>
          <mc-list-item value="3">
            Artichoke
            <span slot="sublabel">Vegetable</span>
          </mc-list-item>
        </mc-list>
      </div>
      <p id="selected-item-onlistchange"></p>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const GetClickedItem: StoryObj = {};

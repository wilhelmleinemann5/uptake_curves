import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcListItem } from '@maersk-global/mds-components-core-list-item/src/lib/types';

const meta: Meta = {
  title: 'Components/Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const removeLastOption = () => {
      const mcMultiSelect = document.querySelector('mc-multi-select');
      if (mcMultiSelect && mcMultiSelect.lastElementChild) {
        mcMultiSelect.lastElementChild.remove();
      }
    };
    const addLastOption = () => {
      const mcMultiSelect = document.querySelector('mc-multi-select');
      const option = document.createElement('mc-option');
      const item = Math.random().toString(36).slice(2);
      (option as IMcListItem).value = item;
      (option as IMcListItem).label = item;
      if (mcMultiSelect) {
        mcMultiSelect.append(option as string);
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="max-width: 700px">
        <div style="display: flex; gap: 8px; align-items: flex-end;">
          <mc-multi-select label="Select item">
            <mc-option value="1">One</mc-option>
            <mc-option value="2">Two</mc-option>
            <mc-option value="3">Three</mc-option>
            <mc-option value="a">A</mc-option>
            <mc-option value="b">B</mc-option>
            <mc-option value="c">C</mc-option>
          </mc-multi-select>
          <mc-button @click=${removeLastOption}>Remove last option</mc-button>
          <mc-button @click=${addLastOption}>Add last option</mc-button>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const WithDynamicOptions: StoryObj = {};

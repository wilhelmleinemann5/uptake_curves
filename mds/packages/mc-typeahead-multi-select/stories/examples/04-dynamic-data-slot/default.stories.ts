import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { apiService } from '../api-service';

const meta: Meta = {
  title: 'Components/Typeahead Multi Select/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const renderData = () => {
      return apiService.options
        ? [...apiService.options].map((item) => {
            const option = document.createElement('mc-option');
            option.value = item.value;
            option.sublabel = item.sublabel;
            (option as unknown as Element).innerHTML = `<i>${item.label}</i>`;
            return option;
          })
        : null;
    };
    const setData = async (event) => {
      const mcTypeahead = document.querySelectorAll('mc-typeahead-multi-select');
      if (mcTypeahead) {
        for (const typeahead of mcTypeahead) {
          (typeahead as unknown as Element).innerHTML = '';
          typeahead.loading = true;
          await apiService.search(event.target.value);
          const results = renderData();
          if (results) {
            results.map((item) => (typeahead as unknown as Element).appendChild(item as Node));
            typeahead.loading = false;
          }
        }
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="width: 400px;">
        <mc-typeahead-multi-select
          name="typeahead"
          multiple
          label="City (multi selection)"
          placeholder="Type min 3 characters to select multiple cities"
          minchars="3"
          clearbutton
          disablefilter
          @search="${(event) => {
            setData(event);
          }}"
        ></mc-typeahead-multi-select>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DynamicDataAsSlot: StoryObj = {};

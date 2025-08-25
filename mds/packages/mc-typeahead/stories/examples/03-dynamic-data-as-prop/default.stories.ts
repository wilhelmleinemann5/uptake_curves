import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { apiService } from '../api-service';
import { IMcTypeahead } from '../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Typeahead/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const setData = async (event) => {
      const mcTypeahead: IMcTypeahead[] = document.querySelectorAll('mc-typeahead') as unknown as IMcTypeahead[];
      if (mcTypeahead) {
        for (const typeahead of mcTypeahead) {
          typeahead.loading = true;
          await apiService.search(event.target.value);
          typeahead.data = apiService.options ? [...apiService.options] : [];
          typeahead.loading = false;
        }
      }
    };
    const logOptionSelected = (event) => {
      const optionSelectedOutput = document.querySelector('#selectedOption');
      if (optionSelectedOutput) {
        optionSelectedOutput.textContent = `Selected option: ${JSON.stringify(event.detail)}`;
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-typeahead
        name="typeahead"
        label="City (single selection)"
        clearbutton
        placeholder="Type min 3 characters"
        minchars="3"
        disablefilter
        @search="${(event) => {
          setData(event);
        }}"
        @optionselected=${(event) => {
          logOptionSelected(event);
        }}
      ></mc-typeahead>
      <p id="selectedOption"></p>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DynamicDataAsProp: StoryObj = {};

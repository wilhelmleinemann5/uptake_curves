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
    const setData = async (event) => {
      const mcTypeahead = document.querySelectorAll('mc-typeahead-multi-select');
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
      <div style="width: 400px;">
        <mc-typeahead-multi-select
          name="typeahead"
          label="City (multi selection)"
          clearbutton
          placeholder="Type min 3 characters to select multiple cities"
          minchars="3"
          disablefilter
          @search="${(event) => {
            setData(event);
          }}"
          @optionselected=${(event) => {
            logOptionSelected(event);
          }}
        ></mc-typeahead-multi-select>
        <p id="selectedOption"></p>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DynamicDataAsProp: StoryObj = {};

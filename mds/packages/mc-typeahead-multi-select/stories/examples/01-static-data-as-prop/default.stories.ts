import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import icons from '@maersk-global/icons/metadata/metadata.json';

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
          .data="${icons.map((icon) => ({
            label: icon.name,
            value: icon.name,
            icon: icon.name,
            sublabel: icon.tags.join(', '),
          }))}"
          label="Icon (multi selection)"
          clearbutton
          placeholder="Start typing icon name or category"
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
export const StaticDataAsProp: StoryObj = {};

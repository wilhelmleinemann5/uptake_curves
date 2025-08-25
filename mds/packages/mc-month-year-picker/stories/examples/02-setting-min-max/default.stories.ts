import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import '@maersk-global/mds-components-core-button';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Month Year Picker/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const setMinMax = (value) => {
      const picker = document.querySelector('mc-month-year-picker');
      if (picker) {
        picker.min = value.min;
        picker.max = value.max;
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story" style="display: flex; flex-direction: column; gap: 1rem;">
        <mc-button
          variant="outlined"
          appearance="neutral"
          @click="${() => setMinMax({ min: { month: 'March', year: 2010 }, max: { month: 'September', year: 2025 } })}"
          label="Set min max as string"
        ></mc-button>
        <mc-button
          variant="outlined"
          appearance="neutral"
          @click="${() => setMinMax({ min: { month: 1, year: 2022 }, max: { month: 4, year: 2025 } })}"
          label="Set min max as number"
        ></mc-button>
        <mc-month-year-picker></mc-month-year-picker>
        <span>Scroll after click to see the effect</span>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SettingMinMax: StoryObj = {};

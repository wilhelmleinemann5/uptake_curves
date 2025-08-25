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
    const setValue = (value) => {
      const picker = document.querySelector('mc-month-year-picker');
      if (picker) {
        picker.value = value;
      }
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div class="story">
        <mc-button
          variant="outlined"
          appearance="neutral"
          @click="${() => setValue({ month: 'January', year: 2023 })}"
          label="set month as string - January"
        ></mc-button>
        <mc-button
          variant="outlined"
          appearance="neutral"
          @click="${() => setValue({ month: 11, year: 2023 })}"
          label="set month as number - 11(December)"
        ></mc-button>
        <mc-month-year-picker></mc-month-year-picker>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SettingValue: StoryObj = {};

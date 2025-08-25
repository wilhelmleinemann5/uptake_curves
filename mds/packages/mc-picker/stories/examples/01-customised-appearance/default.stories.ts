import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';

import '../../../src/index';

const meta: Meta = {
  title: 'Components/Picker/Group/Examples',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-picker::part(container) {
          background-color: #40ab35;
        }
      </style>
      <mc-picker>
        <mc-picker-item value="1" label="Apple"></mc-picker-item>
        <mc-picker-item value="2" label="Orange"></mc-picker-item>
        <mc-picker-item value="3" label="Banana"></mc-picker-item>
        <mc-picker-item value="4" label="Apricot"></mc-picker-item>
        <mc-picker-item value="5" label="Kiwi"></mc-picker-item>
        <mc-picker-item value="6" label="Passion fruit"></mc-picker-item>
        <mc-picker-item value="7" label="Dragon fruit"></mc-picker-item>
        <mc-picker-item value="8" label="Plum"></mc-picker-item>
        <mc-picker-item value="9" label="Avocado"></mc-picker-item>
      </mc-picker>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};

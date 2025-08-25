import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Picker/Item/Examples',
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
        mc-picker-item::part(button) {
          color: #40ab35;
        }
        mc-picker-item::part(icon) {
          fill: #40ab35;
        }
      </style>
      <mc-picker-item icon="apple" label="Apple"> </mc-picker-item>
      ${renderCodePreview(preview, context)} `,
};
export default meta;
export const CustomisedAppearance: StoryObj = {};

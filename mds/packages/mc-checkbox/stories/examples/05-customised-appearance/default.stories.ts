import type { Args, StoryContext } from '@storybook/types';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Checkbox/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <style>
        mc-checkbox::part(label-container) {
          align-items: center;
          flex-direction: column;
        }
        mc-checkbox::part(label) {
          color: #328529;
        }
        mc-checkbox[checked]::part(checkmark) {
          background-color: #328529;
        }
      </style>
      <mc-checkbox label="Label text"></mc-checkbox>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};

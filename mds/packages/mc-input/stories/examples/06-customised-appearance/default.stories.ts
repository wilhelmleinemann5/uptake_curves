import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/Input/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}<style>
        .input-container {
          width: 150px;
        }
        mc-input::part(label-container) {
          display: flex;
          justify-content: flex-end;
        }
        mc-input::part(label) {
          color: #000000;
        }
        mc-input::part(field) {
          background-color: #f7f7f7;
        }
        mc-input::part(input) {
          color: #000000;
          background-color: #f7f7f7;
        }
        mc-input::part(icon) {
          fill: #000000;
        }
      </style>
      <div class="input-container">
        <mc-input label="Label text" icon="info-circle"></mc-input>
      </div>
      ${renderCodePreview(preview, context)}`,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};

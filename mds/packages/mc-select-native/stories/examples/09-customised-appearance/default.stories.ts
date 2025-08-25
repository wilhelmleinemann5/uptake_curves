import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const options = [1, 2, 3, 4, 5, 6];
const meta: Meta = {
  title: 'Components/Select Native/Examples',
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
        .input-container {
          width: 200px;
        }
        mc-select-native::part(label-container) {
          display: flex;
          justify-content: flex-end;
        }
        mc-select-native::part(label) {
          color: #000000;
        }
      </style>
      <div class="input-container">
        <mc-select-native label="Label text" .options=${options}></mc-select-native>
      </div>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};

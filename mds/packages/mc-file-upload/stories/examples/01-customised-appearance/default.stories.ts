import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';

const meta: Meta = {
  title: 'Components/File Upload/Examples',
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
        .mc-file-upload_default::part(button) {
          color: #40ab35;
        }
        .mc-file-upload_drag-drop::part(drag-drop-area) {
          opacity: 0.5;
          pointer-events: none;
        }
      </style>
      <mc-file-upload class="mc-file-upload_default"></mc-file-upload>
      <br />
      <mc-file-upload class="mc-file-upload_drag-drop" variant="drag-drop"></mc-file-upload>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const CustomisedAppearance: StoryObj = {};

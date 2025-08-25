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
  render: (args: Args, context: StoryContext) => html`${unsafeHTML(generateThemeSelector())}
    <style>
      .mc-file-upload_drag-drop::part(drag-drop-area) {
        opacity: 0.5;
        pointer-events: none;
      }
    </style>
    <mc-file-upload variant="drag-drop" label="Choose a file">
      <span slot="intermediate"><mc-notification appearance="info" heading="Testing the banner" body="test"></<mc-notification></span>
    </mc-file-upload>
     ${renderCodePreview(preview, context)}
  `,
};

export default meta;
export const IntermediateAsASlot: StoryObj = {};

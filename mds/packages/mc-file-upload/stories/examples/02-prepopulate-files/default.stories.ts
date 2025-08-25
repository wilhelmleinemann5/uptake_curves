import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcFileUpload } from '../../../src/lib/types';

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
  render: (args: Args, context: StoryContext) => {
    document.addEventListener('DOMContentLoaded', () => {
      const fileUpload: IMcFileUpload = document.querySelector('mc-file-upload') as unknown as IMcFileUpload;
      const file = new File([''], 'example.txt', { type: 'text/plain' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileUpload) {
        fileUpload.files = dataTransfer.files;
      }
    });
    return html`${unsafeHTML(generateThemeSelector())} <mc-file-upload></mc-file-upload>${renderCodePreview(
        preview,
        context,
      )} `;
  },
};

export default meta;
export const PrepopulateFiles: StoryObj = {};

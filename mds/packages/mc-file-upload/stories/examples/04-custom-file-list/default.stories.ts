import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcFileUpload } from '../../../src/lib/types';
import { IMcTable } from '@maersk-global/mds-components-core-table/src/lib/types';

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
      const mcFileUpload = document.querySelector('mc-file-upload') as HTMLElement & IMcFileUpload;
      const mcTable = document.getElementById('file-upload') as HTMLElement & IMcTable;
      const data: IMcFileUpload[] = [];

      mcFileUpload.addEventListener('input', (event) => {
        for (const file of (event as CustomEvent).detail) {
          data.push(file);
        }
        if (mcTable) {
          mcTable.hidden = false;
          mcTable.data = data;
          mcTable.columns = [
            { id: 'name', label: 'Name' },
            { id: 'type', label: 'Type' },
            { id: 'lastModifiedDate', label: 'Last Modified' },
            { id: 'size', label: 'size', tabularFigures: true, align: 'right' },
          ];
        }
      });
    });
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-file-upload hiddenfilelist multiple> </mc-file-upload>
      <mc-table hidden id="file-upload"></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const CustomFileList: StoryObj = {};

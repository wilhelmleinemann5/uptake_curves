import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import { IMcFileUpload, FileStatus, FileUploadState } from '../../../src/lib/types';

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
      const fileUploadComponent: IMcFileUpload = document.querySelector('mc-file-upload') as unknown as IMcFileUpload;
      const files = [
        new File(['file1'], 'file1.txt', { type: 'text/plain' }),
        new File(['file2'], 'file2.txt', { type: 'text/plain' }),
        new File(['file3'], 'file3.txt', { type: 'text/plain' }),
        new File(['file4'], 'file4.txt', { type: 'text/plain' }),
      ];
      const dataTransfer = new DataTransfer();
      files.forEach((file) => {
        dataTransfer.items.add(file);
      });
      fileUploadComponent.files = dataTransfer.files;
      const statuses: FileUploadState[] = ['loading', 'success', 'error', 'error'];
      let filesStatus: FileStatus[] = files.map((file, index) => {
        return {
          fileName: file.name,
          status: statuses[index],
          hint: statuses[index] === 'loading' ? 'Scanning for viruses ...' : '',
          errorMessage: statuses[index] === 'error' ? 'The file size is too big!' : '',
        };
      });
      filesStatus[3].hint = 'File size: 10MB';
      fileUploadComponent.filesstatus = filesStatus;
      (fileUploadComponent as unknown as HTMLElement).addEventListener('change', (event) => {
        const filesUpdated: File[] = Array.from((event as CustomEvent).detail);
        filesUpdated.forEach((fileUpdated: File) => {
          filesStatus.push({
            fileName: fileUpdated.name,
            status: 'loading',
            hint: 'File uploading to server ...',
            errorMessage: '',
          });
        });
        (document.querySelector('mc-file-upload') as unknown as IMcFileUpload).filesstatus = filesStatus;
        setTimeout(() => {
          filesStatus = filesStatus.map((file) => {
            if (file.status === 'loading') {
              return {
                fileName: file.fileName,
                status: 'success',
                hint: 'File uploaded successfully',
                errorMessage: '',
              };
            }
            return file;
          });
          (document.querySelector('mc-file-upload') as unknown as IMcFileUpload).filesstatus = filesStatus;
        }, 2000);
      });
    });
    return html`${unsafeHTML(generateThemeSelector())}
      <mc-file-upload :multiple="true">
        <span slot="file-url-1">
          <a href="https://maersk.com" target="_blank">file2.txt</a>
        </span>
      </mc-file-upload>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const FilesStatuses: StoryObj = {};

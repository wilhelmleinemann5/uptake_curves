import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import data from './data.json';
import columns from './columns';

const meta: Meta = {
  title: 'Components/Pagination/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const paginationChange = (e) => {
      const table: HTMLElement | null = document.getElementById('table');
      table?.setAttribute('currentpage', e.detail);
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; ">
        <mc-table
          id="table"
          .columns=${columns}
          .data=${data}
          datakey="id"
          style="width: 100%;"
          currentpage="1"
          recordsperpage="3"
        ></mc-table>
        <mc-pagination totalpages="3" @pagechange="${paginationChange}"></mc-pagination>
      </div>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const PaginatedDataTable: StoryObj = {};

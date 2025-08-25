import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { generateData } from './dataset';
import '@maersk-global/mds-components-core-tooltip';
import '@maersk-global/mds-components-core-button';
import { TableColumn } from '../../../../src/lib/types';
import { McTable } from '../../../../src';

const meta: Meta = {
  title: 'Components/Table/Examples/99-Advanced',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let visibleRows: Record<string, unknown>[] = [];
    let table: McTable | null = null;

    setTimeout(() => {
      table = document.querySelector('mc-table');
      if (!table) return;
      table.innerHTML = '';
      const pagination = document.querySelector('mc-pagination');
      if (pagination && table) {
        pagination.totalpages = table.getPageCount();
      }
      visibleRows = table.getVisibleRows();
      visibleRows.forEach((row) => {
        if (!table) return;
        table.innerHTML += `
          <mc-tooltip slot="${row.id}_activeAlgo">
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>Info about the data</span>
          </mc-tooltip>
        `;
      });
    }, 100);

    const defaultColumns: TableColumn[] = [
      { id: 'id', label: 'Id' },
      { id: 'activeAlgo', label: '', sortDisabled: true, align: 'right' },
      { id: 'product', label: 'Product' },
      { id: 'trade', label: 'Trade' },
      { id: 'weekNumber', label: 'Week number' },
      { id: 'active', label: 'Price Source', sortDisabled: true, width: '125px' },
      { id: 'updatedWhen', label: 'Updated Date (UTC)' },
    ];

    const paginationChangeTable = (e: CustomEvent) => {
      table = document.querySelector('mc-table');
      if (!table) return;
      table.innerHTML = '';
      visibleRows = e.detail;
      visibleRows.forEach((row) => {
        if (!table) return;
        table.innerHTML += `
          <mc-tooltip slot="${row.id}_activeAlgo">
            <mc-icon slot="trigger" icon="info-circle"></mc-icon>
            <span>Info about the data</span>
          </mc-tooltip>
        `;
      });
    };

    const paginationChange = (e: CustomEvent) => {
      table = document.querySelector('mc-table');
      if (!table) return;
      table.currentpage = e.detail;
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table
        select
        .columns=${defaultColumns}
        .data=${generateData()}
        @pagechange="${paginationChangeTable}"
        recordsperpage="10"
        currentpage="1"
        height="350px"
        resetscrollonpagechange
      ></mc-table>
      <div style="padding-top: 1rem;">
        <mc-pagination @pagechange="${paginationChange}"></mc-pagination>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const BigDatasetPagination = {};

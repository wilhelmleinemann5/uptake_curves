import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import data from '../../../data';
import { TableColumn } from '../../../../src/lib/types';

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
    const nameColumn: TableColumn = {
      id: 'name',
      label: 'Name',
    };

    const builtColumn: TableColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      nowrap: true,
    };

    const getQuoteColumn: TableColumn = {
      id: 'getQuote',
      label: '',
      nowrap: true,
      sortDisabled: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn, getQuoteColumn];

    const paginationChange = (e: CustomEvent) => {
      const table = document.querySelector('mc-table');
      if (table) {
        table.currentpage = e.detail;
      }
    };

    const onRowSelectionChange = (event: CustomEvent) => {
      const preElement = document.querySelector('#table-pre');
      if (preElement) {
        preElement.innerHTML = 'Selected items: ' + JSON.stringify(event.detail, null, 2);
      }
    };

    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        const table = document.querySelector('mc-table');
        const pagination = document.querySelector('mc-pagination');
        if (pagination && table) {
          pagination.totalpages = table.getPageCount();
        }
      }, 0);
    });

    return html`${unsafeHTML(generateThemeSelector())}
      <div>
        <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; ">
          <mc-table
            select
            .columns=${defaultColumns as TableColumn[]}
            .data=${data}
            style="width: 100%;"
            currentpage="1"
            recordsperpage="5"
            @selectchange="${onRowSelectionChange}"
          ></mc-table>
          <mc-pagination @pagechange="${paginationChange}"></mc-pagination>
          <pre id="table-pre" style="align-self: flex-start;">Selected items: []</pre>
        </div>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Pagination = {};

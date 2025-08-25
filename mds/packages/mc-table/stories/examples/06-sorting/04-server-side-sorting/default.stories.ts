import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../../src/index';
import data from '../../../data';
import { TableColumn } from '../../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Table/Examples/06-Sorting',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
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
      noWrap: true,
      sortDisabled: true,
    };

    const getQuoteColumn: TableColumn = {
      id: 'getQuote',
      label: '',
      noWrap: true,
      sortDisabled: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn, getQuoteColumn];

    const sortArrayByProperty = (
      data: Record<string, string | number | boolean>[],
      property: string,
      order: 'ascending' | 'descending' = 'ascending',
    ) => {
      return data.sort((a, b) => {
        if (typeof a[property] === 'number' && typeof b[property] === 'number') {
          // For numerical properties
          return order === 'ascending'
            ? Number(a[property]) - Number(b[property])
            : Number(b[property]) - Number(a[property]);
        } else {
          // For string properties
          let comparison = 0;
          if (a[property] > b[property]) {
            comparison = 1;
          } else if (a[property] < b[property]) {
            comparison = -1;
          }
          return order === 'ascending' ? comparison : comparison * -1;
        }
      });
    };

    const handleTableSorted = ({ detail: { column, direction } }: CustomEvent) => {
      const sortedData = sortArrayByProperty(data, column, direction);
      const table = document.querySelector('mc-table');
      if (table) {
        table.data = [...sortedData];
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table
        .data=${data}
        .columns=${defaultColumns}
        sortmanual
        sortdefaultdirection="ascending"
        @sortchange="${handleTableSorted}"
      ></mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const ServerSideSorting: StoryObj = {};

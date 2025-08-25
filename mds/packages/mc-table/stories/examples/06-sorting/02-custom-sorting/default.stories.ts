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
      sortDisabled: true,
    };

    const builtColumn: TableColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };

    const lastUpdateColumn: TableColumn = {
      id: 'lastUpdate',
      label: 'Updated',
      sorter: 'datetime',
    };

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      nowrap: true,
      sorter: (a, b) => a[0].localeCompare(b[0]),
    };

    const getQuoteColumn: TableColumn = {
      id: 'getQuote',
      label: '',
      nowrap: true,
      sortDisabled: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, lastUpdateColumn, statusColumn, getQuoteColumn];

    const getFill = (status: string) => {
      switch (status) {
        case 'On schedule':
          return 'green';
        case 'Delayed':
          return 'red';
        case 'Stalled':
          return 'yellow';
        default:
          return 'gray';
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data} .columns=${defaultColumns}>
        ${data.map(
          (row) => html`
            <div slot="${row.id}_status">
              <svg height="50" width="50">
                <circle cx="25" cy="25" r="5" fill=${getFill(row.status)} />
              </svg>
            </div>
            <div slot="${row.id}_getQuote"><mc-button>Get Quote</mc-button></div>
          `,
        )}
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const CustomSorting: StoryObj = {};

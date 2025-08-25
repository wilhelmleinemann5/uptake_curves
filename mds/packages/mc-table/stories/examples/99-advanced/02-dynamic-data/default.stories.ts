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

    const capacityColumn: TableColumn = {
      id: 'capacity',
      label: 'Capacity (t)',
      dataType: { type: 'number' },
    };

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      noWrap: true,
    };

    const lastPortColumn: TableColumn = {
      id: 'lastPort',
      label: 'Last Port',
      noWrap: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, capacityColumn, statusColumn, lastPortColumn];

    const toggleData = () => {
      const mcTable = document.querySelector('mc-table');
      const randomIndex1 = Math.floor(Math.random() * defaultColumns.length);
      let randomIndex2 = Math.floor(Math.random() * defaultColumns.length);
      while (randomIndex2 === randomIndex1) {
        randomIndex2 = Math.floor(Math.random() * defaultColumns.length);
      }
      if (mcTable?.columns) {
        mcTable.columns = [defaultColumns[randomIndex1], defaultColumns[randomIndex2]];
      }
    };

    const addRow = () => {
      const mcTable = document.querySelector('mc-table');
      if (mcTable === null) return;
      const tableData: Record<string, unknown>[] = mcTable.data || [];
      mcTable.data = [
        ...tableData,
        {
          name: `New ship ${mcTable?.data?.length || 0 + 1}`,
          built: 2021,
          capacity: 1000,
          status: 'Active',
          lastPort: 'Rotterdam',
        },
      ];
    };

    return html`${unsafeHTML(generateThemeSelector())} <mc-table .data=${data} .columns=${defaultColumns}></mc-table>
      <br />
      <mc-button @click=${toggleData}>Get random columns in table</mc-button>&nbsp;&nbsp;&nbsp;<mc-button
        @click=${addRow}
        >Add extra row</mc-button
      >
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DynamicData = {};

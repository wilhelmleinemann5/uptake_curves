import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { renderExpandableTableBanner } from '../../../notification';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../../src/index';
import data from '../../../data';
import { when } from 'lit/directives/when.js';
import { TableColumn } from '../../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Table/Examples/08-Expansion',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
  },
  render: (args: Args, context: StoryContext) => {
    const columns: TableColumn[] = [
      { id: 'name', label: 'Name' },
      { id: 'built', label: 'Built (year)', tabularFigures: true, align: 'right' },
      { id: 'status', label: 'Status', noWrap: true },
    ];

    const secondDataSet = [
      { id: 1, name: 'Madrid Maersk 2', built: '2017', length: 399 },
      { id: 2, name: 'Mary Maersk 2', built: '2013', length: 399 },
      { id: 3, name: 'Gerner Maersk 2', built: '2008', length: 367 },
      { id: 4, name: 'Emma Maersk 2', built: '2006', length: 398 },
      { id: 5, name: 'Johannes Maersk 2', built: '2001', length: 216 },
      { id: 6, name: 'Svendborg Maersk 2', built: '1998', length: 347 },
    ];

    const thirdDataSet = [
      { id: 1, name: 'Madrid Maersk 3', built: '2017', length: 399 },
      { id: 2, name: 'Mary Maersk 3', built: '2013', length: 399 },
      { id: 3, name: 'Gerner Maersk 3', built: '2008', length: 367 },
      { id: 4, name: 'Emma Maersk 3', built: '2006', length: 398 },
      { id: 5, name: 'Johannes Maersk 3', built: '2001', length: 216 },
      { id: 6, name: 'Svendborg Maersk 3', built: '2001', length: 216 },
    ];

    const dataSet = {
      '1': data,
      '2': secondDataSet,
      '3': thirdDataSet,
    };

    const getDataForExpandedTable = (row: Record<string, string | number | boolean>) => {
      return dataSet[row.id.toString()];
    };

    const onRowExpansionChange = (event: CustomEvent) => {
      const preElement = document.querySelector('#table-pre');
      if (preElement) {
        preElement.innerHTML = 'Expanded items: ' + JSON.stringify(event.detail, null, 2);
      }
    };

    return html`${unsafeHTML(generateThemeSelector())} ${renderExpandableTableBanner()}
      <mc-table .data=${data} .columns=${columns} expand sortdisabled @expandchange=${onRowExpansionChange}>
        ${data.map(
          (row) => html`
            ${when(
              dataSet[row.id],
              () => html`
                <mc-table
                  .data=${getDataForExpandedTable(row)}
                  .columns=${columns}
                  .slot=${`${row.id}_expanded`}
                ></mc-table>
              `,
            )}
          `,
        )}
      </mc-table>
      <div id="table-pre">Expanded items: []</div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const NestedTables: StoryObj = {};

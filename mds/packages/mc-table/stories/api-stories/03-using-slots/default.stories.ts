import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../src/lib/index';
import data from '../../data';
import { TableColumn } from '../../../src/lib/types';
import { preview } from './code-examples';
import '@maersk-global/community-ui-code-preview';

const meta: Meta = {
  title: 'Components/Table/Documentation API',
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

    const lengthColumn: TableColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };

    const getQuoteColumn: TableColumn = {
      id: 'status',
      label: 'Status',
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, lengthColumn, getQuoteColumn];
    return html`${unsafeHTML(generateThemeSelector())}
      <p>
        This example demonstrates using the table's slot functionality to customise each data cell to use your own
        mark-up or components.
      </p>
      <br />
      <mc-table .data=${data} .columns=${defaultColumns as TableColumn[]}>
        ${data.map((row) => html`<div slot="${row.id}_status"><i>${row.status}</i></div>`)}
      </mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const UsingSlots: StoryObj = {};

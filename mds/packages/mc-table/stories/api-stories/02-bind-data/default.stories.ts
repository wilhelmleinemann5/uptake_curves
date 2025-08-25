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

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, lengthColumn];
    return html`${unsafeHTML(generateThemeSelector())}
      <p>
        This example demonstrates how to bind data to the table and how to provide custom columns configurations to
        change how the data is rendered in the table. <br />Click on the 'Code Preview' tab in the side panel and choose
        a JS framework to see the code example.<br />See
        <a href="/?path=/story/components-table--column-options">Column options</a> for more information on column
        options.
      </p>
      <br />
      <mc-table .data=${data} .columns=${defaultColumns}></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;

export const BindingDataAndColumns: StoryObj = {};

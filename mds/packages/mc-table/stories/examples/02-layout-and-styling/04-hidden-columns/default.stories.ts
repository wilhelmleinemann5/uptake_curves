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
  title: 'Components/Table/Examples/02-Layout & Styling',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const nameColumn = {
      id: 'name',
      label: 'Name',
    };
    const typeColumn = {
      id: 'type',
      label: 'Type',
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };
    const speedColumn = {
      id: 'speed',
      label: 'Speed',
    };
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
    };
    const defaultColumns = [nameColumn, typeColumn, builtColumn, speedColumn, lengthColumn];
    const columnIds = defaultColumns.map((col) => col.id);

    const onOptionSelected = (evt: CustomEvent<{ value: string[] }>) => {
      const table = document.querySelector('mc-table');
      if (table) {
        table.hidecolumns = evt.detail.map((el) => el.value);
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .multi-select-wrapper {
          margin-bottom: 12px;
          max-width: 400px;
        }
      </style>
      <div class="multi-select-wrapper">
        <mc-multi-select
          label="Hidden columns"
          placeholder="Choose columns to hide"
          @optionselected="${onOptionSelected}"
        >
          ${columnIds.map((col) => html`<mc-option value="${col}">${col}</mc-option>`)}
        </mc-multi-select>
      </div>
      <mc-table .data=${data} .columns=${defaultColumns as TableColumn[]}></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const HiddenColumns: StoryObj = {};

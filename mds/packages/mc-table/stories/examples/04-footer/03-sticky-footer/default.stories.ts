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
import { getDataForColumn } from '../../../../src/lib/utils';

const meta: Meta = {
  title: 'Components/Table/Examples/04-Footer',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
  },
  render: (args: Args, context: StoryContext) => {
    const nameColumn = {
      id: 'name',
      label: 'Name',
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };
    const capacityColumn = {
      id: 'capacity',
      label: 'Capacity (TEU)',
      dataType: { type: 'number' },
    };
    const defaultColumns = [nameColumn, builtColumn, lengthColumn, capacityColumn] as TableColumn[];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table footer footersticky height="200px" .data=${data} .columns=${defaultColumns}>
        <div slot="name_footer">Totals:</div>
        <div slot="length_footer">
          ${getDataForColumn(data, 'length')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
        <div slot="capacity_footer">
          ${getDataForColumn(data, 'capacity')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const StickyFooter: StoryObj = {};

import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../../src/index';
import data from './data.json';
import { TableColumn } from '../../../../src/lib/types';
import { getDataForColumn } from '../../../../src/lib/utils';
import { format } from '@maersk-global/mds-components-utils';

const meta: Meta = {
  title: 'Components/Table/Examples/05-Data Formatting',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
  },
  render: (args: Args, context: StoryContext) => {
    const defaultColumns: TableColumn[] = [
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'built',
        label: 'Built',
        tabularFigures: true,
        align: 'right',
      },
      {
        id: 'latitude',
        label: 'Latitude (to 3dp)',
        dataType: { type: 'number', options: { maximumFractionDigits: 3 } },
      },
      {
        id: 'longitude',
        label: 'Longitude (to 4dp)',
        dataType: {
          type: 'number',
          formatter: (value: number) => `${Number(value).toFixed(4)}°`,
        },
      },
      {
        id: 'price',
        label: 'Price (DKK)',
        dataType: {
          type: 'number',
          options: { style: 'currency', currency: 'DKK' },
        },
      },
    ];

    const sum = (numbers: number[]) => numbers.reduce((acc, val) => acc + val, 0);

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table footer .data=${data} .columns=${defaultColumns}>
        <span slot="1_latitude">
          slot using format fn: ${format(data.find((row) => row.id === 1)?.latitude || 0, { type: 'number' })}
        </span>
        <span slot="1_price">
          slot using format fn:
          ${format(data.find((row) => row.id === 1)?.price || 0, { type: 'number', options: { currency: 'DKK' } })}
        </span>
        <div slot="price_footer">
          Sum: ${format(sum(getDataForColumn(data, 'price')), { type: 'number', options: { currency: 'DKK' } })}
        </div>
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const NumberFormatting: StoryObj = {};

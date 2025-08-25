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
    const defaultColumns = [nameColumn, builtColumn, lengthColumn, capacityColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table footer .data=${data} .columns=${defaultColumns as TableColumn[]}>
        <div slot="name_footer">Footer for <i>id: name</i></div>
        <div slot="length_footer">
          Sum:
          ${getDataForColumn(data, 'length')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
        <div slot="capacity_footer">
          Sum:
          ${getDataForColumn(data, 'capacity')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const FooterExample: StoryObj = {};

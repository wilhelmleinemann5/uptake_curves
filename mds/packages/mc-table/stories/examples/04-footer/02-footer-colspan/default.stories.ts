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
      footerColspan: 3,
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };
    const statusColumn = {
      id: 'status',
      label: 'Status',
    };
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
    };
    const capacityColumn = {
      id: 'capacity',
      label: 'Capacity (TEU)',
      dataType: { type: 'number' },
    };
    const defaultColumns = [nameColumn, builtColumn, statusColumn, lengthColumn, capacityColumn] as TableColumn[];

    return html`${unsafeHTML(generateThemeSelector())}
      <div style="margin-bottom: 2rem;">
        <mc-notification appearance="info" heading="Full width colspan with select or expand">
          By default table will render "placeholder" footers for the select and expand columns. You can disable them by
          setting the "disableplaceholderfooters" attribute to true. When the "disableplaceholderfooters" attribute is
          set to true, table will add extra colspan to the first footer with "footerColspan" property. Please take a
          look at the second table in this example for details.
        </mc-notification>
      </div>
      <mc-table
        caption="Default table with footer"
        select
        expand
        verticallinestyle="solid"
        footer
        .data=${data}
        .columns=${defaultColumns}
      >
        <div slot="name_footer">Total:</div>
        <div slot="1_expanded">Expanded content</div>
        <div slot="capacity_footer">
          ${getDataForColumn(data, 'capacity')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
        <div slot="length_footer">
          ${getDataForColumn(data, 'length')
            .reduce((acc, val) => acc + val, 0)
            .toLocaleString()}
        </div>
      </mc-table>
      <div style="margin-top: 2rem;">
        <mc-table
          caption="Table with disabled placeholder footers"
          select
          expand
          disableplaceholderfooters
          verticallinestyle="solid"
          footer
          .data=${data}
          .columns=${defaultColumns}
        >
          <div slot="name_footer">Total:</div>
          <div slot="1_expanded">Expanded content</div>
          <div slot="capacity_footer">
            ${getDataForColumn(data, 'capacity')
              .reduce((acc, val) => acc + val, 0)
              .toLocaleString()}
          </div>
          <div slot="length_footer">
            ${getDataForColumn(data, 'length')
              .reduce((acc, val) => acc + val, 0)
              .toLocaleString()}
          </div>
        </mc-table>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const FooterColspan: StoryObj = {};

import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-notification';
import '../../../../src/index';
import { TableColumn } from '../../../../src/lib/types';

const data = [
  {
    id: 1,
    category: 'Service details',
    electronic: 'Allows surrender of the Bill of Lading to the carrier.',
    transfer: 'Allows transfer of the title ownership to another party.',
  },
  {
    id: 2,
    category: 'Key difference',
    electronic:
      'Enables the consignee to start the cargo release process without the need to deal with a Bill of Lading.',
    transfer:
      'When transferred to a consignee then the B/L can be printed online or collected from the Maersk local office to start the cargo release process.',
  },
  {
    id: 3,
    category: 'Fulfilment of request',
    electronic: 'Surrender complete within 30 seconds of placing the request in most cases.',
    transfer: 'Transfer complete within 30 seconds of placing the request in most cases.',
  },
  {
    id: 4,
    category: 'Invoice availability',
    electronic: 'Invoice ready within 20 mins in most cases and can take up to max 12 hours.',
    transfer: 'Invoice ready within 20 mins in most cases and can take up to max 12 hours.',
  },
];

const meta: Meta = {
  title: 'Components/Table/Examples/10-Spans',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const categoryColumn = {
      id: 'category',
      label: '',
    };
    const electronicColumn = {
      id: 'electronic',
      label: 'Electronic cargo release / Telex release',
    };
    const transferColumn = {
      id: 'transfer',
      label: 'Transfer Bill of Lading',
    };

    const defaultColumns: TableColumn[] = [categoryColumn, electronicColumn, transferColumn];

    const spans = [{ cellDataKey: '4_electronic', colspan: 2 }];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-notification
        class="story-notification"
        heading="How to apply the cell spans"
        variant="info"
        style="margin-bottom: 1rem"
      >
        The cellDataKey is constructed by combining the row's datakey value and column id:
        <code>{dataKeyValue}_{columnId}</code><br />
        For example, if a row has id=2 (using default datakey="id"), then "2_name" refers to the cell in the row where
        id=2 and the "name" column.<br />
        You can customize which property to use by setting the datakey prop on mc-table.
      </mc-notification>
      <mc-table
        sortdisabled
        .data=${data}
        .columns=${defaultColumns}
        .spans=${spans}
        verticallinestyle="solid"
      ></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const CellRowAndColSpan: StoryObj = {};

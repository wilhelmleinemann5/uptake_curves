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
  title: 'Components/Table/Examples/09-Custom Styles',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    let table: HTMLElement | null = null;

    setTimeout(() => {
      table = document.querySelector('mc-table');
    }, 100);

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

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      noWrap: true,
    };

    const acceptColumn: TableColumn = {
      id: 'accept',
      label: '',
      sortDisabled: true,
    };

    const acceptedIds: string[] = [];

    const onAcceptClick = (row: Record<string, string | number | boolean>) => {
      acceptedIds.push(row.id.toString());
      const customStyles = `
        .mds-table ${acceptedIds.map((id) => `.row-${id}`).join(',')} td {
          background-color: var(--mds_brand_appearance_success_weak_background-color);
        }
      `;
      if (table) {
        table.setAttribute('customstyles', customStyles);
      }
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn, acceptColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <div style="margin-bottom: 1rem;">
        <mc-notification appearance="info">
          Click on the "accept" button and move the cursor to see the custom styles applied to the table.<br />
          You can accept multiple rows.
        </mc-notification>
      </div>
      <mc-table .columns=${defaultColumns as TableColumn[]} .data=${data} style="width: 100%;">
        ${data.map(
          (row) => html`<mc-button slot="${row.id}_accept" @click="${() => onAcceptClick(row)}">Accept</mc-button>`,
        )} </mc-table
      >${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const BasedOnEvents = {};

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
  title: 'Components/Table/Examples/99-Advanced',
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
    const speedColumn = {
      id: 'speed',
      label: 'Speed',
      dataType: { type: 'number' },
    };

    const favouriteColumn = {
      id: 'favourite',
      label: '',
      width: '50px',
      sortDisabled: true,
      rowClickDisabled: true,
    };
    const defaultColumns = [nameColumn, builtColumn, speedColumn, favouriteColumn];

    const customstyles = `
      .mds-table {
        tr{
          cursor: pointer;
        }
      }
    `;

    const handleTableRowclick = (event: CustomEvent) => {
      const rowData = event.detail.rowData;
      const modal = document.querySelector('mc-modal');
      const modalContent = document.getElementById('modal-content');
      if (!modalContent) return;
      modalContent.innerHTML = `
        <div class="mds mds-content">
          <ul>
        ${Object.entries(rowData)
          .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
          .join('')}
          </ul>
        </div>
      `;
      if (modal) {
        modal.open = true;
      }
    };

    const saveToFavourites = (row: unknown) => {
      alert(`Row saved to favourites: ${JSON.stringify(row)}`);
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-notification heading="Disable default row click event" type="info">
        <p>
          To disable the default <code>rowclick</code> event, set the <code>rowClickDisabled</code> property to
          <code>true</code> on the column. This will prevent the default <code>rowclick</code> event from being
          dispatched and you can add your own event listeners to the column. For more details, take a look at the code
          example below.
        </p>
      </mc-notification>
      <mc-table
        .customstyles=${customstyles}
        @rowclick="${handleTableRowclick}"
        .data=${data}
        .columns=${defaultColumns as TableColumn[]}
      >
        ${data.map(
          (row) =>
            html` <mc-button icon="star" hiddenlabel @click=${() => saveToFavourites(row)} slot="${row.id}_favourite"
              >Edit</mc-button
            >`,
        )}
      </mc-table>
      <mc-modal heading="More information about the clicked row">
        <div id="modal-content"></div>
        <mc-button slot="primaryAction" dialogaction="close">Close</mc-button>
      </mc-modal>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DisableRowClickEvent: StoryObj = {};

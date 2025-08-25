import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TableColumn } from '../../../../src/lib/types';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import data from '../../../data';

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
    const columns: TableColumn[] = [
      { id: 'name', label: 'Name' },
      { id: 'status', label: 'Status' },
      { id: 'lastPort', label: 'Last Port', align: 'right' },
    ];

    const onRowMouseEnter = (e: CustomEvent) => {
      const rowId = e.detail.id;
      const actions = document.querySelector(`.actions-${rowId}`) as HTMLElement;
      if (actions) actions.style.display = 'flex';

      // Hide the original cell content
      const cell = document.querySelector(`[slot="${rowId}_lastPort"] .content`) as HTMLElement;
      if (cell) cell.style.display = 'none';
    };

    const onRowMouseLeave = (e: CustomEvent) => {
      const rowId = e.detail.id;
      const actions = document.querySelector(`.actions-${rowId}`) as HTMLElement;
      if (actions) actions.style.display = 'none';

      // Display back the original cell content
      const cell = document.querySelector(`[slot="${rowId}_lastPort"] .content`) as HTMLElement;
      if (cell) cell.style.display = 'block';
    };
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .actions {
          display: none;
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          align-items: center;
          justify-content: center;
          padding: 0 16px;
        }
      </style>
      <mc-table
        .data=${data}
        .columns=${columns}
        @rowmouseenter="${onRowMouseEnter}"
        @rowmouseleave="${onRowMouseLeave}"
      >
        ${data.map(
          (row) => html`
            <div slot="${row.id}_lastPort">
              <div class="content">${row.lastPort}</div>
              <div class="actions actions-${row.id}">
                <mc-button fit="small" icon="eye" @click="${() => alert('You viewed your content')}">View</mc-button>
              </div>
            </div>
          `,
        )} </mc-table
      >${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const RenderContentOnHover: StoryObj = {};

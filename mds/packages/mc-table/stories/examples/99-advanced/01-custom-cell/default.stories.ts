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
      {
        id: 'name',
        label: 'Name',
      },
      {
        id: 'status',
        label: 'Status',
      },
      {
        id: 'getQuote',
        label: '',
        sortDisabled: true,
      },
    ];

    const getFill = (status: string) => {
      switch (status) {
        case 'On schedule':
          return 'green';
        case 'Delayed':
          return 'red';
        case 'Stalled':
          return 'yellow';
        default:
          return 'gray';
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data} .columns=${columns}>
        ${data.map(
          (row) => html`
            <div slot="${row.id}_status">
              <svg height="50" width="50">
                <circle cx="25" cy="25" r="5" fill=${getFill(row.status)} />
              </svg>
            </div>
            <div slot="${row.id}_getQuote"><mc-button>Get Quote</mc-button></div>
          `,
        )}
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const CustomContent = {};

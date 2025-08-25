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
    ];

    const onStatusChanged = (e: Event, row: Record<string, unknown>, data: Record<string, unknown>[]) => {
      const updatedData = data.map((item) =>
        item.id === row.id ? { ...item, status: (e.target as HTMLInputElement).value } : item,
      );
      data = [...updatedData];
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <div style="margin-bottom: 16px;">
        <mc-notification appearance="info" icon="info-circle">
          This is just an example of what is possible in the table component using slots. For real world scenarios, we
          recommend making more UI/UX research.
        </mc-notification>
      </div>
      <mc-table .data=${data} .columns=${columns}>
        ${data.map(
          (row) => html`
            <div slot="${row.id}_status">
              <mc-input
                label="change data"
                hiddenlabel
                .value="${row.status}"
                @input="${(e) => onStatusChanged(e, row, data)}"
              ></mc-input>
            </div>
          `,
        )}
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const EditableCells = {};

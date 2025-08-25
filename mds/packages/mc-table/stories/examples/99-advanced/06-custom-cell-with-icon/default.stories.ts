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
        id: 'speed',
        label: 'Speed',
      },
    ];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data} .columns=${columns}>
        ${data.map(
          (row) => html`
            <td style="display: flex; flex-direction: column;" slot="${row.id}_name">
              <div>${row.name}</div>
              <div style="display: flex;" class="mds-neutral--weak__text-color mds-text--small-normal">
                <mc-icon icon="vessel-front"></mc-icon>${row.type}
              </div>
            </td>
          `,
        )}
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const CustomContentWithIcon = {};

import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { TableColumn, TableTemplateResult } from '../../../src/lib/types';
import data from '../../data';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import '@maersk-global/mds-components-core-icon';
import '@maersk-global/mds-components-core-tag';
import '@maersk-global/mds-components-core-tooltip';

const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
    cellTemplate: (details): TableTemplateResult => {
      return details.html` <div class="mds-text--medium-bold">${details.rowData.name}</div>
        <div class="mds-table__subtext">${details.rowData.type}</div>`;
    },
  },
  {
    id: 'status',
    label: 'Status',
    noWrap: true,
    headerTemplate: (details): TableTemplateResult => {
      return details.html`
          <mc-tooltip position="top-center">
            <span class="mds-text--medium-bold" slot="trigger">${details.column.label}</span>
            <span>Shows the current status of the vessel:</span>
            <ul class="mds-list mds-list--unordered mds-mt-100">
              <li>On schedule - Vessel is on time</li>
              <li>Delayed - Minor delay reported</li>
              <li>Stalled - Major delay reported</li>
            </ul>
        </div>
      `;
    },
    cellTemplate: (details): TableTemplateResult => {
      let appearance;
      switch (details.value) {
        case 'On schedule':
          appearance = 'success';
          break;
        case 'Delayed':
          appearance = 'warning';
          break;
        case 'Stalled':
          appearance = 'error';
          break;
        default:
          appearance = 'default';
          break;
      }
      return details.html`<mc-tag appearance="${appearance}">${details.value}</mc-tag>`;
    },
  },
  {
    id: 'lastPort',
    label: 'Last port',
    sortDisabled: true,
    noWrap: true,
    cellTemplate: (details): TableTemplateResult => {
      return details.html`<a href="https://www.google.com/maps/place/${details.value}" target="_blank" class="mds-link--external">${details.value}</a>`;
    },
  },
  {
    id: 'position',
    label: 'Position',
    sortDisabled: true,
    noWrap: true,
    cellTemplate: (details): TableTemplateResult => {
      return details.html`<mc-button label="Click me!" icon="pin" appearance="neutral" variant="outlined" fit="small" @click="${function () {
        alert(`You clicked "Click me!" for ${details.rowData.name}!`);
      }}"></mc-button>`;
    },
  },
  {
    id: 'capacity',
    label: 'Capacity (TEU)',
    cellTemplate: (details): TableTemplateResult => {
      return details.html`<mc-tooltip position="top-center"><div slot="trigger">Hover to see more</div><span>${details.value} TEU</span></mc-tooltip>`;
    },
  },
];

const meta: Meta = {
  title: 'Components/Table/Examples/11-Custom Renderers',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) =>
    html`${unsafeHTML(generateThemeSelector())}
      <mc-notification heading="Limitations">
        <p>
          The <code>headerTemplate</code> and <code>cellTemplate</code> are recommended to use only with HTML or MDS
          components. Custom framework components may not render correctly or cause unexpected behavior/errors. If you
          need to use custom framework components, refer to the
          <a href="?path=/story/components-table-examples-99-advanced--custom-content">slots example</a>.
        </p>
      </mc-notification>
      <mc-table .data=${data} .columns=${columns} fit="medium"></mc-table>
      ${renderCodePreview(preview, context)} `,
};

export default meta;
export const HeaderAndCellTemplates: StoryObj = {};

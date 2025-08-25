import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import { renderExpandableTableBanner } from '../../../notification';
import '../../../../src/index';
import data from '../../../data';
import { TableColumn } from '../../../../src/lib/types';

const meta: Meta = {
  title: 'Components/Table/Examples/08-Expansion',
  parameters: {
    slots: { disabled: true },
    cssParts: { disabled: true },
    a11y: { disabled: true },
    actions: { disabled: true },
    controls: { disabled: true },
  },
  render: (args: Args, context: StoryContext) => {
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
      nowrap: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn];

    const onRowExpansionChange = (event: CustomEvent) => {
      const preElement = document.querySelector('#table-pre');
      if (preElement) {
        preElement.innerHTML = 'Expanded items: ' + JSON.stringify(event.detail, null, 2);
      }
    };

    return html`${unsafeHTML(generateThemeSelector())} ${renderExpandableTableBanner()}
      <mc-table
        expand
        select
        sortdisabled
        .columns=${defaultColumns}
        .data=${data}
        style="width: 100%;"
        @expandchange="${onRowExpansionChange}"
      >
        <div slot="1_expanded">Row with datakey="1" expanded content(datakey looks at "id" by default)</div>
        <div slot="7_expanded">Row with datakey="2" expanded content(datakey looks at "id" by default)</div>
      </mc-table>
      <pre id="table-pre">Expanded items: []</pre>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const RowExpansion: StoryObj = {};

import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import data from './data';
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

    const capacityColumn: TableColumn = {
      id: 'capacity',
      label: 'Capacity (t)',
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, capacityColumn];

    const onRowSelectionChange = (event: CustomEvent) => {
      const preElement = document.querySelector('#table-pre');
      if (preElement) {
        preElement.innerHTML = 'Selected items: ' + JSON.stringify(event.detail, null, 2);
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table
        .data=${data}
        .columns=${defaultColumns as TableColumn[]}
        datakey="myuid"
        select
        @selectchange="${onRowSelectionChange}"
      ></mc-table>
      <pre id="table-pre">Selected items: </pre>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const CustomDataKey = {};

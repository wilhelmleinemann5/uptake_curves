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
  title: 'Components/Table/Examples/07-Selection',
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
      noWrap: true,
    };

    const getQuoteColumn: TableColumn = {
      id: 'getQuote',
      label: '',
      noWrap: true,
      sortDisabled: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn, getQuoteColumn];

    const onRowSelectionChange = (event: CustomEvent) => {
      const preElement = document.querySelector('#table-pre');
      if (preElement) {
        preElement.innerHTML = 'Selected items: ' + JSON.stringify(event.detail, null, 2);
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table select .columns=${defaultColumns} .data=${data} @selectchange="${onRowSelectionChange}"></mc-table>
      <pre id="table-pre">Selected items: []</pre>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const RowSelector: StoryObj = {};

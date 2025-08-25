import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../../src/index';
import { dataWithSelectDisabled, Vessel } from '../../../data';
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

    const shouldDisableRowSelection = (row: Vessel) => {
      return row.status === 'On schedule';
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-notification heading="How to disable row selection">
        <p>You can disable selection on a desired row in two ways:</p>
        <br />
        - By setting the <code>selectrowdisabled</code> property to a function that returns <code>true</code> for the
        desired row.<br />
        - By setting the <code>selectDisabled</code> property to <code>true</code> in your data objects.<br /><br />
        Please look at the code examples below for more details.
      </mc-notification>
      <mc-table
        .selectrowdisabled=${shouldDisableRowSelection}
        select
        .columns=${defaultColumns}
        .data=${dataWithSelectDisabled}
        @selectchange="${onRowSelectionChange}"
      ></mc-table>
      <pre id="table-pre">Selected items: []</pre>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const RowSelectorDisableParticularRow: StoryObj = {};

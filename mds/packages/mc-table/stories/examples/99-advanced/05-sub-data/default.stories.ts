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
    const nameColumn: TableColumn = {
      id: 'name',
      label: 'Name',
      subDataLabel: 'Vessel type',
      subDataKey: 'type',
    };

    const builtColumn: TableColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };

    const lengthColumn: TableColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      subDataKey: 'position',
      sortDisabled: true,
    };

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, lengthColumn, statusColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data} .columns=${defaultColumns}></mc-table> ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SubData = {};

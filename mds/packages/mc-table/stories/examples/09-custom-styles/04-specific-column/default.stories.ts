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
  title: 'Components/Table/Examples/09-Custom Styles',
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

    const statusColumn: TableColumn = {
      id: 'status',
      label: 'Status',
      noWrap: true,
    };

    const styles = `
      .mds-table tr td:nth-child(2) {
         background-color: var(--mds_brand_appearance_success_weak_background-color);
      }
    `;

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .columns=${defaultColumns as TableColumn[]} .data=${data} .customstyles=${styles} style="width: 100%;">
      </mc-table
      >${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const SpecificColumnStyles = {};

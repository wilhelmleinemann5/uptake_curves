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
      .mds-table .row-4 td {
         background-color: var(--mds_brand_appearance_success_weak_background-color);
      }
    `;

    const defaultColumns: TableColumn[] = [nameColumn, builtColumn, statusColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        code {
          font-style: italic;
        }
      </style>
      <div style="margin-bottom: 1rem;">
        <mc-notification heading="How it works" appearance="info">
          Every row on mc-table has a class following a pattern: <code>row-row[datakey]</code> (i.e. row-4).<br />
          <code>Datakey</code> is set to <code>id</code> by default.<br />
          You can use this class to apply custom styles to a specific row by utilizing the
          <code>customstyles</code> attribute.
        </mc-notification>
      </div>
      <mc-table
        .columns=${defaultColumns as TableColumn[]}
        .data=${data}
        .customstyles=${styles}
        style="width: 100%;"
      ></mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const SpecificRowStyles = {}; // Naming it according to the Story tag name

import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { html } from 'lit';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import data from '../../data';
import { TableColumn } from '../../../src/lib/types';
import { renderExperimentalBanner } from '@maersk-global/mds-dev-utils';


const meta: Meta = {
  title: 'Experiments/Table/Truncation',
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
      truncate: true,
    };

    const lastCountryColumn: TableColumn = {
      id: 'lastCountry',
      label: 'Last country',
    };

    const positionColumn: TableColumn = {
      id: 'position',
      label: 'Position',
    };

    const defaultColumns: TableColumn[] = [nameColumn, lastCountryColumn, positionColumn];

    return html`${unsafeHTML(generateThemeSelector())}
          ${renderExperimentalBanner()}

      <mc-table .data=${data} .columns=${defaultColumns}></mc-table>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const Truncation: StoryObj = {};

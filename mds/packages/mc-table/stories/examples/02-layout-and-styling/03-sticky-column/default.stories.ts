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
  title: 'Components/Table/Examples/02-Layout & Styling',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const nameColumn = {
      id: 'name',
      label: 'Name',
      sticky: 'left',
      width: '120px',
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
      width: '10%',
    };
    const typeColumn = {
      id: 'type',
      label: 'Type',
      sticky: 'right',
    };
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
    };
    const speedColumn = {
      id: 'speed',
      label: 'Speed',
    };
    const capacityColumn = {
      id: 'capacity',
      label: 'Capacity (TEU)',
    };

    const defaultColumns = [nameColumn, builtColumn, typeColumn, lengthColumn, speedColumn, capacityColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <div style="width:540px;">
        <mc-table footer select selectsticky .data=${data} .columns=${defaultColumns as TableColumn[]}>
          <div slot="name_footer">Footer for <i>id: name</i></div>
          <div slot="length_footer">footer for length</div>
          <div slot="1_expanded">test</div>
        </mc-table>
      </div>
      ${renderCodePreview(preview, context)} `;
  },
};

export default meta;
export const StickyColumn: StoryObj = {};

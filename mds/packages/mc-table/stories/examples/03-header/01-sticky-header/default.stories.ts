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
  title: 'Components/Table/Examples/03-Header',
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
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      tabularFigures: true,
      align: 'right',
    };
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };
    const defaultColumns = [nameColumn, builtColumn, lengthColumn];

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table headersticky height="200px" .data=${data} .columns=${defaultColumns as TableColumn[]}></mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const StickyHeader: StoryObj = {};

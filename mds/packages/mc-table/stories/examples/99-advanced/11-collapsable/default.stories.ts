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
  title: 'Components/Table/Examples/99-Advanced',
  parameters: {
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    const actionsColumn = {
      id: 'actions',
      label: '',
      sortDisabled: true,
    };
    const nameColumn = {
      id: 'name',
      label: 'Name',
    };
    const builtColumn = {
      id: 'built',
      label: 'Built (year)',
      sortDisabled: true,
      tabularFigures: true,
      align: 'right',
    };
    const speedColumn = {
      id: 'speed',
      label: 'Speed',
      dataType: { type: 'number' },
    };
    const defaultColumns = [actionsColumn, nameColumn, builtColumn, speedColumn];

    let isExpanded = false;
    let mcTable;
    let expandIcon;
    const originalData = [...data];

    setTimeout(() => {
      mcTable = document.querySelector('mc-table');
      expandIcon = document.querySelector('#expandIcon');
      mcTable.data = [];
    }, 0);

    function toggleTableExpansion() {
      isExpanded = !isExpanded;
      expandIcon.icon = isExpanded ? 'chevron-up' : 'chevron-down';
      mcTable.data = isExpanded ? originalData : [];
    }

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .columns=${defaultColumns as TableColumn[]}>
        <div slot="actions_header">
          <mc-icon
            id="expandIcon"
            icon="${isExpanded ? 'chevron-up' : 'chevron-down'}"
            style="cursor: pointer;"
            @click="${toggleTableExpansion}"
          ></mc-icon>
        </div>
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const Collapsable: StoryObj = {};

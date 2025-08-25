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
    const lengthColumn = {
      id: 'length',
      label: 'Length (m)',
      dataType: { type: 'number' },
    };
    const defaultColumns = [nameColumn, lengthColumn];

    const applyFilter = (event: CustomEvent<string[]>) => {
      const mcTable = document.querySelector('mc-table');
      if (event.detail.length > 0) {
        const targetParentNode = (event.target as Element)?.parentNode?.parentNode;
        if (targetParentNode && targetParentNode.firstElementChild) {
          targetParentNode.firstElementChild.icon = 'funnel-solid';
        }
        if (mcTable) {
          mcTable.data = data.filter((item) => {
            let retval = false;
            if (event.detail.indexOf('small') > -1) {
              retval = item.length < 200;
            }
            if (event.detail.indexOf('medium') > -1 && !retval) {
              retval = item.length > 200 && item.length < 301;
            }
            if (event.detail.indexOf('large') > -1 && !retval) {
              retval = item.length > 300;
            }
            return retval;
          });
        }
      } else {
        const targetParentNode = (event.target as Element)?.parentNode?.parentNode;
        if (targetParentNode && targetParentNode.firstElementChild) {
          targetParentNode.firstElementChild.icon = 'funnel';
        }
        if (mcTable) {
          mcTable.data = data;
        }
      }
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <mc-table .data=${data} .columns=${defaultColumns as TableColumn[]}>
        <div slot="length_header" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
          <span>Filter With Checkbox Group</span>
          <mc-popover position="bottom-right" trigger="click" @click="${(e: Event) => e.stopPropagation()}">
            <mc-button
              appearance="neutral"
              fit="small"
              hiddenlabel
              icon="funnel-solid"
              label="Show menu"
              padding="compact"
              slot="trigger"
              variant="plain"
            ></mc-button>
            <div style="padding: 16px 12px;">
              <mc-checkbox-group legend="Containers" orientation="vertical" hiddenlegend @change="${applyFilter}">
                <mc-checkbox checked label="Large (> 300m)" value="large"></mc-checkbox>
                <mc-checkbox checked label="Medium (200m - 300m)" value="medium"></mc-checkbox>
                <mc-checkbox checked label="Small (< 200m)" value="small"></mc-checkbox>
              </mc-checkbox-group>
            </div>
          </mc-popover>
        </div>
      </mc-table>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const HeaderWithFilterAction: StoryObj = {};

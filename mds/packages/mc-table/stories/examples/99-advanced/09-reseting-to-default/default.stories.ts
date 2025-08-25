import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import data from '../../../data';
import '@maersk-global/mds-components-core-notification';

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
    const columns = [
      { id: 'name', label: 'Name' },
      { id: 'status', label: 'Status' },
      { id: 'lastPort', label: 'Last Port' },
    ];

    const resetSelection = () => {
      const table = document.querySelector('mc-table');
      table?.resetRowSelection();
    };

    const resetSorting = () => {
      const table = document.querySelector('mc-table');
      table?.resetSorting();
    };

    return html`${unsafeHTML(generateThemeSelector())}
      <div style="margin-bottom: 1rem;">
        <mc-notification
          heading="Need more resets?"
          body="If you need more programmatic resets, please let us know. We are happy to help."
        ></mc-notification>
      </div>
      <mc-table select .data=${data} .columns=${columns} .selected=${[data[0]]}></mc-table>
      <div style="margin-top: 1rem; display: flex; gap: 1rem;">
        <mc-button @click="${resetSelection}">reset selection</mc-button>
        <mc-button @click="${resetSorting}">reset sorting</mc-button>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const ResetingToDefault: StoryObj = {};

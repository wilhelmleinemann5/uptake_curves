import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview, generateThemeSelector } from '@maersk-global/mds-dev-utils';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Meta, StoryObj } from '@storybook/web-components';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '../../../src/index';
import data from './data.json';
import columns from './columns';

const meta: Meta = {
  title: 'Components/Loading Indicator/Examples',
  parameters: {
    preview,
    slots: { disable: true },
    cssParts: { disable: true },
    a11y: { disable: true },
    actions: { disable: true },
    controls: { disable: true },
  },
  render: (args: Args, context: StoryContext) => {
    function fetchData() {
      setTimeout(() => {
        const table = document.querySelector('mc-table');
        const loadingIndicator = document.querySelector('mc-loading-indicator');
        const button = document.querySelector('mc-button');
        if (table) {
          table.data = [];
        }
        if (loadingIndicator) {
          loadingIndicator.classList.remove('hidden');
        }
        if (button) {
          (button as unknown as HTMLElement).classList.add('hidden');
        }
        setTimeout(() => {
          if (table) {
            table.data = data;
          }
          if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
          }
          if (button) {
            (button as unknown as HTMLElement).classList.remove('hidden');
          }
        }, 500);
      }, 0);
    }
    fetchData();
    return html`${unsafeHTML(generateThemeSelector())}
      <style>
        .hidden {
          display: none;
        }
        .container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      </style>
      <div class="container">
        <mc-table .columns=${columns} .data="${[]}" datakey="id"></mc-table>
        <mc-loading-indicator label="Fetching data..."></mc-loading-indicator>
        <mc-button class="hidden" @click="${fetchData}">Fetch data</mc-button>
      </div>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const DataFetchingIndicator: StoryObj = {};

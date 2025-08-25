import type { Args, StoryContext } from '@storybook/types';
import { renderCodePreview } from '@maersk-global/mds-dev-utils';
import { Meta } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { generateThemeSelector } from '@maersk-global/mds-dev-utils';
import '../../../../src/index';
import { preview } from './code-preview';
import '@maersk-global/community-ui-code-preview';
import '@maersk-global/mds-components-core-loading-indicator';
import { generateData } from './dataset';
import { TableColumn } from '../../../../src/lib/types';
import { McTable } from '../../../../src';

interface DataRow {
  id: number;
  product: string;
  trade: string;
  weekNumber: number;
  active: boolean;
  updatedWhen: string;
  activeAlgo?: string; // Optional for expanded slot
}

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
    let currentPage = 1;
    let dataSetSize = 200;
    let allData = generateData(dataSetSize);
    let displayedData: DataRow[] = [];
    const pageSize = 50;
    const threshold = 2200;
    let table: McTable | null = null;
    let isLoading = false;

    // Load initial batch of data
    const loadMoreData = () => {
      if (isLoading) return;
      isLoading = true;
      showLoadingIndicator();

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;

      setTimeout(() => {
        const newBatch = allData.slice(startIndex, endIndex);
        displayedData = [...displayedData, ...newBatch]; // Only add once!

        if (table) {
          table.data = displayedData;
          addExpandedSlots(newBatch);
        }

        currentPage++;
        isLoading = false;
        hideLoadingIndicator();
      }, 500);
    };

    const addExpandedSlots = (newRows: DataRow[]) => {
      if (!table) return;

      newRows.forEach((row) => {
        const expandedSlot = document.createElement('div');
        expandedSlot.setAttribute('slot', `${row.id}_expanded`);
        expandedSlot.innerHTML = `
          Expanded content for ${row.product} (ID: ${row.id})
          <br />
          Trade: ${row.trade}
          <br />
          Week: ${row.weekNumber}
          <br />
          Updated: ${row.updatedWhen}
        `;

        if (!table) return;
        table.appendChild(expandedSlot);
      });
    };

    const setupLazyLoading = () => {
      const scrollHandler = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = window.innerHeight || document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight - threshold && !isLoading) {
          const hasMoreData = displayedData.length < allData.length;
          if (hasMoreData) {
            loadMoreData();
          }
        }
      };

      window.addEventListener('scroll', scrollHandler, { passive: true });
      return () => window.removeEventListener('scroll', scrollHandler);
    };

    const showLoadingIndicator = () => {
      const indicator = document.getElementById('loading-indicator');
      if (indicator) {
        indicator.style.display = 'block';
      }
    };

    const hideLoadingIndicator = () => {
      const indicator = document.getElementById('loading-indicator');
      if (indicator) {
        indicator.style.display = 'none';
      }
    };

    const setDataSetSize = (e: Event) => {
      const input = e.target as HTMLInputElement;
      dataSetSize = parseInt(input.value, 10);
    };

    setTimeout(() => {
      table = document.querySelector('mc-table');
      if (table) {
        loadMoreData();
        setupLazyLoading();
      }
    }, 1000);

    const defaultColumns: TableColumn[] = [
      { id: 'id', label: 'Id' },
      { id: 'activeAlgo', label: '', sortDisabled: true, align: 'right' },
      { id: 'product', label: 'Product' },
      { id: 'trade', label: 'Trade' },
      { id: 'weekNumber', label: 'Week number' },
      { id: 'active', label: 'Price Source', sortDisabled: true, width: '125px' },
      { id: 'updatedWhen', label: 'Updated Date (UTC)' },
    ];

    return html` ${unsafeHTML(generateThemeSelector())}
      <div style="width: 400px; display: flex; justify-content: space-between; align-items: end;">
        <mc-input label="Data set size" .value="${dataSetSize}" @input=${(e) => setDataSetSize(e)}></mc-input>
        <mc-button
          label="Update data set"
          @click=${() => {
            allData = generateData(dataSetSize);
          }}
        ></mc-button>
      </div>

      <mc-table expand .columns=${defaultColumns} .data=${[]}></mc-table>
      <mc-loading-indicator id="loading-indicator" label="Loading data..."></mc-loading-indicator>
      ${renderCodePreview(preview, context)}`;
  },
};

export default meta;
export const BigDatasetLazyLoading = {};

export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import '@maersk-global/mds-components-core-loading-indicator';
import { generateData } from './dataset.js';
import { columns } from 'columns.js';

let currentPage = 1;
let dataSetSize = 200;
let allData = generateData(dataSetSize);
let displayedData: any[] = [];
const pageSize = 50;
const threshold = 2200;
let table: McTable | null = null;
let isLoading = false;

window.addEventListener("DOMContentLoaded", (event) => {
  table = document.querySelector('mc-table');
  table.columns = columns;
  if (table) {
    loadMoreData();
    setupLazyLoading();
  }
});

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

const addExpandedSlots = (newRows: any[]) => {
  if (!table) return;

  newRows.forEach((row) => {
    const expandedSlot = document.createElement('div');
    expandedSlot.setAttribute('slot', \`\${row.id}_expanded\`);
    expandedSlot.innerHTML = \`
      Expanded content for \${row.product} (ID: \${row.id})
      <br />
      Trade: \${row.trade}
      <br />
      Week: \${row.weekNumber}
      <br />
      Updated: \${row.updatedWhen}
    \`;

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

// HTML
<mc-table expand></mc-table>
<mc-loading-indicator id="loading-indicator" label="Loading data..."></mc-loading-indicator>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
export const columns: Array<TableColumn> = [
  {id: 'id', label: 'Id', align: 'center'},
  {id: 'activeAlgo', label: '', sortDisabled: true, align: 'right'},
  {id: 'product', label: 'Product', align: 'center'},
  {id: 'trade', label: 'Trade', align: 'center'},
  {id: 'weekNumber', label: 'Week number', align: 'center'},
  {id: 'active', label: 'Price Source', sortDisabled: true, width: '125px', align: 'center'},
  {id: 'updatedWhen', label: 'Updated Date (UTC)', align: 'center'},
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'dataset.js',
    template: `export const generateData = (rows) => {
  const data = [];

  for (let i = 0; i < rows; i++) {
    const id = i + 1; // Unique ID for each record
    const product = generateRandomString();
    const trade = generateRandomString().toUpperCase();
    const weekNumber = generateRandomNumber(202300, 202400);
    const active = generateRandomBoolean();
    const updatedWhen = generateRandomDate().toISOString();

    data.push({
      id,
      product,
      trade,
      weekNumber,
      active,
      updatedWhen,
    });
  }

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomBoolean() {
    return Math.random() < 0.5;
  }

  function generateRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  return data;
};`,
    language: 'json',
    copy: true,
  },
];

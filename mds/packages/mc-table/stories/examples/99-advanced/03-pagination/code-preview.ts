import data from '../../../data';
export const preview = [
  {
    label: 'JavaScript/CSS/HTML',
    template: `// JavaScript
import '@maersk-global/mds-components-core/mc-table';
import data from 'data.json';
import columns from 'columns.js';

window.addEventListener("DOMContentLoaded", (event) => {
  const table = document.querySelector('mc-table');
  table.data = data;
  table.columns = columns;
  table.addEventListener('selectchange', rowSelectionChange);
  const pagination = document.querySelector('mc-pagination');
  pagination.totalpages = table.getPageCount()
});

const paginationChange = (e) => {
  const table = document.querySelector('mc-table');
  table.currentpage = e.detail;
}

const rowSelectionChange = (event) => {
  const preElement = document.querySelector('#table-pre');
  preElement.innerHTML = 'Selected items: ' + JSON.stringify(event.detail, null, 2);
}
// HTML
  <div style="display: flex; flex-direction: column; gap: 16px; align-items: center; ">
    <mc-table
      style="width: 100%;"
      currentpage="1"
      recordsperpage="3"
      select
    ></mc-table>
    <mc-pagination @pagechange="paginationChange"></mc-pagination>
    <pre id="table-pre">Selected items: []</pre>
  </div>`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'columns.js',
    template: `
import type { TableColumn } from '@maersk-global/mds-components-core/mc-table/types';
const columns: Array<TableColumn> = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'built',
    label: 'Built (year)',
    tabularFigures: true,
    align: 'right',
  },
  {
    id: 'status',
    label: 'Status',
    nowrap: true,
    sortDisabled: true,
  },
  {
    id: 'getQuote',
    label: '',
    nowrap: true,
    sortDisabled: true,
  }
];`,
    language: 'javascript',
    copy: true,
  },
  {
    label: 'data.json',
    template: `${JSON.stringify(data, null, '\t')}`,
    language: 'json',
    copy: true,
  },
];
